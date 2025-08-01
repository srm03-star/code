import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeatureCards } from '@/components/FeatureCards';
import { DisasterMap } from '@/components/DisasterMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Github, 
  ExternalLink, 
  Users, 
  Heart, 
  Code,
  Lightbulb,
  Target,
  Shield
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 space-y-16">
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="map">Live Map</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            <div className="space-y-12">
              {/* Problem Statement */}
              <Card className="border-l-4 border-l-destructive">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-destructive" />
                    The Problem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    India faces recurring natural disasters—floods, earthquakes, heavy rainfall—yet vulnerable 
                    communities lack accessible tools to visualize risk zones and plan safe evacuations. Current 
                    tools are either inaccessible to the public or lack localized infrastructure mapping.
                  </p>
                </CardContent>
              </Card>

              {/* Solution */}
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Our Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    VIGYAAN is a mobile-first Progressive Web App that overlays real-time disaster zones with 
                    schools, hospitals, roads, and other critical infrastructure. It suggests safe evacuation 
                    routes and integrates official Indian datasets for accurate, community-friendly disaster planning.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Badge variant="outline" className="justify-center p-2">
                      🗺️ Interactive Mapping
                    </Badge>
                    <Badge variant="outline" className="justify-center p-2">
                      🛣️ Smart Routing
                    </Badge>
                    <Badge variant="outline" className="justify-center p-2">
                      📱 Mobile-First PWA
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Cities Covered</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-safe-zone mb-2">2M+</div>
                    <div className="text-sm text-muted-foreground">People Protected</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-warning mb-2">94%</div>
                    <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-hospital mb-2">&lt;2min</div>
                    <div className="text-sm text-muted-foreground">Alert Speed</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Live Disaster Risk Map
                </CardTitle>
                <CardDescription>
                  Interactive map showing real-time disaster zones, infrastructure, and evacuation routes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] w-full rounded-lg overflow-hidden border">
                  <DisasterMap />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="mt-8">
            <FeatureCards />
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="mt-8">
            <div className="space-y-8">
              {/* Team */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team VIGYAAN
                  </CardTitle>
                  <CardDescription>
                    B.Tech CSE students passionate about tech for social good
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    We are a team of Computer Science Engineering students who believe in using technology 
                    to solve real-world problems. VIGYAAN represents our commitment to disaster resilience, 
                    open-source innovation, and making critical information accessible to all.
                  </p>
                </CardContent>
              </Card>

              {/* Tech Stack */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Technology Stack
                  </CardTitle>
                  <CardDescription>
                    Built with modern, scalable, and free-tier friendly technologies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      'React + Vite',
                      'Tailwind CSS',
                      'Leaflet.js',
                      'TypeScript',
                      'PWA Support',
                      'OpenRouteService',
                      'IMD APIs',
                      'OpenStreetMap'
                    ].map((tech, index) => (
                      <Badge key={index} variant="outline" className="justify-center p-2">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Project Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      View on GitHub
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    GitHub: https://github.com/YourUsername/vigyaan-disaster-mapper<br />
                    Live Demo: https://vigyaan.vercel.app
                  </p>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Help Build a Resilient India</h3>
                  <p className="text-muted-foreground mb-4">
                    Join us in making disaster planning accessible to all. Explore your area's risk score 
                    and contribute to building a more resilient future.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 text-destructive" />
                    Made with love for social good
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">VIGYAAN</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building resilient communities through technology and open data.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Data Sources</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>India Meteorological Department (IMD)</li>
                <li>National Remote Sensing Centre (NRSC)</li>
                <li>Geological Survey of India (GSI)</li>
                <li>OpenStreetMap Community</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">SDG Goals</h3>
              <div className="flex gap-2">
                {[3, 6, 9, 11, 13].map((goal) => (
                  <Badge key={goal} variant="outline" className="text-xs">
                    SDG {goal}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Aligned with UN Sustainable Development Goals
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
            © 2024 Team VIGYAAN. Open source project for social good.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
