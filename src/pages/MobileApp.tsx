
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Smartphone, Download, Wifi, Zap } from "lucide-react";

const MobileApp = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => navigate('/auth')}
        onLogout={() => navigate('/')}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Mobile <span className="bg-gradient-hero bg-clip-text text-transparent">App</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Take your learning everywhere with our mobile app
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <span>PWA Ready</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Install as a Progressive Web App for native-like experience
                </p>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Install App
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wifi className="h-5 w-5" />
                  <span>Offline Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Download content for offline studying
                </p>
                <Badge variant="outline">Coming Soon</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Fast & Responsive</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Optimized for mobile devices and tablets
                </p>
                <Badge className="bg-green-500">Available Now</Badge>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mobile Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">✓ Current Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Responsive design for all devices</li>
                    <li>• Touch-friendly interface</li>
                    <li>• Fast loading times</li>
                    <li>• Cross-platform compatibility</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">🔄 Coming Soon</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Offline mode</li>
                    <li>• Push notifications</li>
                    <li>• Native app store versions</li>
                    <li>• Enhanced mobile features</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
