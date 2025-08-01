import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Activity, 
  MapPin, 
  Navigation, 
  Hospital, 
  GraduationCap,
  Bus,
  CloudRain,
  Zap,
  Shield
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RiskZone {
  id: string;
  type: 'flood' | 'earthquake' | 'rainfall';
  center: [number, number];
  radius: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

interface Infrastructure {
  id: string;
  type: 'hospital' | 'school' | 'transport';
  name: string;
  position: [number, number];
  capacity?: number;
  status: 'operational' | 'limited' | 'closed';
}

// Sample data for Indian cities (Delhi region)
const sampleRiskZones: RiskZone[] = [
  {
    id: '1',
    type: 'flood',
    center: [28.6139, 77.2090],
    radius: 5000,
    severity: 'high',
    description: 'Yamuna River flood zone - High risk during monsoon'
  },
  {
    id: '2',
    type: 'earthquake',
    center: [28.7041, 77.1025],
    radius: 8000,
    severity: 'medium',
    description: 'Seismic zone IV - Moderate earthquake risk'
  },
  {
    id: '3',
    type: 'rainfall',
    center: [28.5355, 77.3910],
    radius: 6000,
    severity: 'high',
    description: 'Heavy rainfall alert - 150mm+ expected'
  }
];

const sampleInfrastructure: Infrastructure[] = [
  {
    id: '1',
    type: 'hospital',
    name: 'AIIMS Delhi',
    position: [28.5672, 77.2100],
    capacity: 2500,
    status: 'operational'
  },
  {
    id: '2',
    type: 'school',
    name: 'DPS RK Puram',
    position: [28.5700, 77.1800],
    capacity: 3000,
    status: 'operational'
  },
  {
    id: '3',
    type: 'transport',
    name: 'New Delhi Railway Station',
    position: [28.6430, 77.2194],
    status: 'operational'
  }
];

const getRiskColor = (type: string, severity: string) => {
  const colors = {
    flood: {
      low: 'hsl(200, 85%, 75%)',
      medium: 'hsl(200, 85%, 55%)',
      high: 'hsl(200, 85%, 35%)'
    },
    earthquake: {
      low: 'hsl(0, 75%, 75%)',
      medium: 'hsl(0, 75%, 65%)',
      high: 'hsl(0, 75%, 55%)'
    },
    rainfall: {
      low: 'hsl(220, 60%, 75%)',
      medium: 'hsl(220, 60%, 60%)',
      high: 'hsl(220, 60%, 45%)'
    }
  };
  return colors[type as keyof typeof colors]?.[severity as keyof (typeof colors)[keyof typeof colors]] || '#666';
};

const getInfrastructureIcon = (type: string) => {
  switch (type) {
    case 'hospital':
      return Hospital;
    case 'school':
      return GraduationCap;
    case 'transport':
      return Bus;
    default:
      return MapPin;
  }
};

interface MapControllerProps {
  onLocationUpdate: (lat: number, lng: number) => void;
}

const MapController: React.FC<MapControllerProps> = ({ onLocationUpdate }) => {
  const map = useMap();

  useEffect(() => {
    const handleLocationFound = (e: L.LocationEvent) => {
      onLocationUpdate(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, 13);
    };

    map.on('locationfound', handleLocationFound);
    return () => {
      map.off('locationfound', handleLocationFound);
    };
  }, [map, onLocationUpdate]);

  const locateUser = () => {
    map.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true
    });
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] space-y-2">
      <Button
        variant="map"
        size="icon"
        onClick={locateUser}
        className="bg-white/90 backdrop-blur-sm"
      >
        <Navigation className="h-4 w-4" />
      </Button>
    </div>
  );
};

export const DisasterMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [activeLayer, setActiveLayer] = useState<string>('all');
  const [riskScore, setRiskScore] = useState<number>(0);
  
  // Default to Delhi coordinates
  const defaultCenter: [number, number] = [28.6139, 77.2090];

  const handleLocationUpdate = (lat: number, lng: number) => {
    setUserLocation([lat, lng]);
    // Calculate risk score based on proximity to risk zones
    let score = 0;
    sampleRiskZones.forEach(zone => {
      const distance = Math.sqrt(
        Math.pow(lat - zone.center[0], 2) + Math.pow(lng - zone.center[1], 2)
      );
      if (distance < 0.05) { // Rough proximity check
        score += zone.severity === 'high' ? 30 : zone.severity === 'medium' ? 20 : 10;
      }
    });
    setRiskScore(Math.min(score, 100));
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'High Risk', color: 'destructive', icon: AlertTriangle };
    if (score >= 40) return { level: 'Medium Risk', color: 'warning', icon: Activity };
    return { level: 'Low Risk', color: 'safe', icon: Shield };
  };

  const currentRisk = getRiskLevel(riskScore);
  const RiskIcon = currentRisk.icon;

  return (
    <div className="relative h-full w-full">
      {/* Risk Score Display */}
      <div className="absolute top-4 left-4 z-[1000]">
        <Card className="w-64 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <RiskIcon className="h-4 w-4" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Location</span>
                <Badge variant={currentRisk.color as any} className="text-xs">
                  {currentRisk.level}
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${riskScore}%`,
                    backgroundColor: riskScore >= 70 ? 'hsl(var(--destructive))' : 
                                   riskScore >= 40 ? 'hsl(var(--warning))' : 
                                   'hsl(var(--safe-zone))'
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Score: {riskScore}/100
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Layer Controls */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Map Layers</h3>
              <div className="space-y-1">
                {['all', 'flood', 'earthquake', 'rainfall', 'infrastructure'].map((layer) => (
                  <Button
                    key={layer}
                    variant={activeLayer === layer ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveLayer(layer)}
                    className="w-full justify-start text-xs"
                  >
                    {layer === 'flood' && <CloudRain className="h-3 w-3 mr-2" />}
                    {layer === 'earthquake' && <Zap className="h-3 w-3 mr-2" />}
                    {layer === 'rainfall' && <CloudRain className="h-3 w-3 mr-2" />}
                    {layer === 'infrastructure' && <Hospital className="h-3 w-3 mr-2" />}
                    {layer.charAt(0).toUpperCase() + layer.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Alert */}
      {riskScore >= 70 && (
        <div className="absolute top-20 left-4 right-4 z-[1000]">
          <Alert className="bg-destructive/10 border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-destructive font-medium">
              High risk area detected! Consider evacuation routes and safety measures.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Map Container */}
      <MapContainer
        center={defaultCenter}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController onLocationUpdate={handleLocationUpdate} />

        {/* Risk Zones */}
        {(activeLayer === 'all' || sampleRiskZones.some(zone => activeLayer === zone.type)) && 
          sampleRiskZones
            .filter(zone => activeLayer === 'all' || activeLayer === zone.type)
            .map((zone) => (
              <Circle
                key={zone.id}
                center={zone.center}
                radius={zone.radius}
                pathOptions={{
                  color: getRiskColor(zone.type, zone.severity),
                  fillColor: getRiskColor(zone.type, zone.severity),
                  fillOpacity: 0.3,
                  weight: 2
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-sm mb-1">
                      {zone.type.charAt(0).toUpperCase() + zone.type.slice(1)} Risk Zone
                    </h3>
                    <Badge variant={zone.severity === 'high' ? 'destructive' : zone.severity === 'medium' ? 'secondary' : 'default'} className="text-xs mb-2">
                      {zone.severity.charAt(0).toUpperCase() + zone.severity.slice(1)} Risk
                    </Badge>
                    <p className="text-xs text-muted-foreground">{zone.description}</p>
                  </div>
                </Popup>
              </Circle>
            ))
        }

        {/* Infrastructure */}
        {(activeLayer === 'all' || activeLayer === 'infrastructure') &&
          sampleInfrastructure.map((item) => (
            <Marker key={item.id} position={item.position}>
              <Popup>
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    {React.createElement(getInfrastructureIcon(item.type), { className: "h-4 w-4" })}
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                  </div>
                  <Badge variant={item.status === 'operational' ? 'default' : 'secondary'} className="text-xs mb-2">
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                  {item.capacity && (
                    <p className="text-xs text-muted-foreground">
                      Capacity: {item.capacity.toLocaleString()}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))
        }

        {/* User Location */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1">Your Location</h3>
                <p className="text-xs text-muted-foreground">
                  Risk Score: {riskScore}/100
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default DisasterMap;