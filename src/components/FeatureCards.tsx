import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Route, 
  AlertTriangle, 
  Smartphone, 
  Database, 
  Globe,
  Hospital,
  School,
  Bus,
  CloudRain,
  Zap,
  Shield
} from 'lucide-react';

const features = [
  {
    id: 1,
    icon: MapPin,
    title: 'Real-time Risk Mapping',
    description: 'Interactive maps showing flood zones, earthquake risks, and severe weather alerts using official IMD and NRSC data.',
    badge: 'Live Data',
    color: 'primary'
  },
  {
    id: 2,
    icon: Route,
    title: 'Smart Evacuation Routes',
    description: 'AI-powered route recommendations to nearest safe zones, hospitals, and evacuation centers using OpenRouteService.',
    badge: 'AI Powered',
    color: 'safe-zone'
  },
  {
    id: 3,
    icon: Hospital,
    title: 'Infrastructure Mapping',
    description: 'Real-time status of hospitals, schools, roads, and emergency services with capacity and availability data.',
    badge: 'Critical Info',
    color: 'hospital'
  },
  {
    id: 4,
    icon: Smartphone,
    title: 'Progressive Web App',
    description: 'Works offline, installable on mobile devices, and provides push notifications for emergency alerts.',
    badge: 'Offline Ready',
    color: 'accent'
  },
  {
    id: 5,
    icon: Database,
    title: 'Open Data Sources',
    description: 'Built on trusted Indian datasets from IMD, GSI, NRSC, and OpenStreetMap for transparency and accuracy.',
    badge: 'Verified',
    color: 'secondary'
  },
  {
    id: 6,
    icon: AlertTriangle,
    title: 'Risk Scoring System',
    description: 'Transparent risk assessment algorithm providing real-time vulnerability scores for any location in India.',
    badge: 'Predictive',
    color: 'warning'
  }
];

const infrastructureTypes = [
  { icon: Hospital, label: 'Hospitals', count: '2,500+', color: 'hospital' },
  { icon: School, label: 'Schools', count: '5,200+', color: 'school' },
  { icon: Bus, label: 'Transport', count: '1,800+', color: 'transport' },
  { icon: Shield, label: 'Safe Zones', count: '850+', color: 'safe-zone' }
];

const riskTypes = [
  { icon: CloudRain, label: 'Flood Zones', count: '420+', severity: 'High' },
  { icon: Zap, label: 'Earthquake Risk', count: '180+', severity: 'Medium' },
  { icon: AlertTriangle, label: 'Weather Alerts', count: '95+', severity: 'Active' }
];

export const FeatureCards: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Card key={feature.id} className="group hover:shadow-lg smooth-transition border-border/50 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 smooth-transition">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary smooth-transition">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed mb-4">
                  {feature.description}
                </CardDescription>
                <Button variant="ghost" size="sm" className="group-hover:bg-primary/10 smooth-transition">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Infrastructure Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Hospital className="h-5 w-5 text-primary" />
              Infrastructure Coverage
            </CardTitle>
            <CardDescription>
              Critical infrastructure mapped across India for emergency response
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {infrastructureTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-background">
                      <IconComponent className="h-4 w-4" style={{ color: `hsl(var(--${type.color}))` }} />
                    </div>
                    <span className="font-medium">{type.label}</span>
                  </div>
                  <Badge variant="outline">{type.count}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Risk Monitoring
            </CardTitle>
            <CardDescription>
              Active monitoring of natural disaster risks across the country
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskTypes.map((risk, index) => {
              const IconComponent = risk.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-background">
                      <IconComponent className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <span className="font-medium block">{risk.label}</span>
                      <span className="text-xs text-muted-foreground">{risk.count} monitored</span>
                    </div>
                  </div>
                  <Badge 
                    variant={risk.severity === 'High' ? 'destructive' : risk.severity === 'Medium' ? 'secondary' : 'default'}
                    className="text-xs"
                  >
                    {risk.severity}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};