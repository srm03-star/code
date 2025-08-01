import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Shield, 
  MapPin, 
  Users, 
  Clock, 
  Globe,
  Star,
  CheckCircle
} from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const stats = [
  { icon: MapPin, label: 'Cities Covered', value: '500+', description: 'Major Indian cities' },
  { icon: Users, label: 'Lives Protected', value: '2M+', description: 'People using VIGYAAN' },
  { icon: Clock, label: 'Response Time', value: '<2min', description: 'Average alert delivery' },
  { icon: Shield, label: 'Accuracy Rate', value: '94%', description: 'Risk prediction accuracy' }
];

const sdgGoals = [
  { number: 3, title: 'Good Health', description: 'Protecting health infrastructure' },
  { number: 11, title: 'Sustainable Cities', description: 'Making cities disaster-ready' },
  { number: 13, title: 'Climate Action', description: 'Real-time climate alerts' }
];

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="VIGYAAN Disaster Management" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8 text-white">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Star className="h-3 w-3 mr-1" />
                Powered by Official Indian Data
              </Badge>
              <Badge className="bg-safe-zone/20 text-white border-safe-zone/30 backdrop-blur-sm">
                <Globe className="h-3 w-3 mr-1" />
                SDG Aligned
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                VIGYAAN
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                Vulnerability Indicator for Geospatial Yield, Alerts And Networks
              </p>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                Empowering citizens and authorities with real-time disaster risk mapping and 
                evacuation planning using official Indian geoscience data. Built for resilience, 
                designed for everyone.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                className="group"
              >
                Explore Risk Map
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Watch Demo
              </Button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {[
                { icon: Shield, text: 'Real-time Alerts' },
                { icon: MapPin, text: 'Smart Routing' },
                { icon: Globe, text: 'Offline Ready' },
                { icon: CheckCircle, text: 'Free & Open' }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-3 text-white/90">
                    <IconComponent className="h-5 w-5 text-white" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Stats and SDG Cards */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 smooth-transition group">
                    <CardContent className="p-4 text-center">
                      <IconComponent className="h-6 w-6 mx-auto mb-2 text-white group-hover:scale-110 smooth-transition" />
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm font-medium mb-1">{stat.label}</div>
                      <div className="text-xs text-white/70">{stat.description}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* SDG Goals */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  UN SDG Impact
                </h3>
                <div className="space-y-3">
                  {sdgGoals.map((goal, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 smooth-transition">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold">
                        {goal.number}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{goal.title}</div>
                        <div className="text-xs text-white/70">{goal.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Powered By</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {['React + Vite', 'Leaflet.js', 'IMD Data', 'OpenStreetMap', 'GSI Data', 'NRSC Data'].map((tech, index) => (
                    <Badge key={index} variant="outline" className="border-white/30 text-white bg-white/5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-3 h-3 bg-primary-glow/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-safe-zone/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};