import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Bell, 
  User, 
  MapPin, 
  Shield, 
  Smartphone 
} from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-gradient">VIGYAAN</h1>
                <p className="text-xs text-muted-foreground">
                  Vulnerability Indicator for Geospatial Yield, Alerts And Networks
                </p>
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline" className="text-xs">
                Delhi, India
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-safe-zone" />
              <Badge variant="outline" className="text-xs">
                PWA Ready
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};