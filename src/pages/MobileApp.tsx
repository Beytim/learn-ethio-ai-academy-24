
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Smartphone, 
  Download, 
  Share2, 
  Bell, 
  Wifi, 
  Zap,
  Star,
  Play,
  QrCode,
  Chrome,
  Apple,
  Monitor
} from "lucide-react";

const MobileApp = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<'phone' | 'tablet'>('phone');

  const installPWA = () => {
    // PWA installation logic would go here
    console.log("Installing PWA...");
  };

  const shareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Beytim Academy',
        text: 'Check out this amazing learning platform!',
        url: window.location.origin,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => navigate('/auth')}
        onLogout={() => navigate('/')}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Mobile <span className="bg-gradient-hero bg-clip-text text-transparent">App</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Learn anywhere, anytime with our mobile app
            </p>
            <Badge className="mb-8">Progressive Web App (PWA)</Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* App Preview */}
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="flex space-x-2">
                  <Button
                    variant={selectedDevice === 'phone' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDevice('phone')}
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Phone
                  </Button>
                  <Button
                    variant={selectedDevice === 'tablet' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDevice('tablet')}
                  >
                    <Monitor className="h-4 w-4 mr-2" />
                    Tablet
                  </Button>
                </div>
              </div>

              <div className="relative mx-auto" style={{ 
                width: selectedDevice === 'phone' ? '300px' : '400px',
                height: selectedDevice === 'phone' ? '600px' : '500px'
              }}>
                <div className={`
                  bg-gray-900 rounded-3xl p-2 shadow-2xl
                  ${selectedDevice === 'phone' ? 'w-full h-full' : 'w-full h-full rounded-2xl'}
                `}>
                  <div className="bg-white rounded-2xl w-full h-full overflow-hidden">
                    {/* Mock app interface */}
                    <div className="bg-gradient-hero p-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">Beytim Academy</h3>
                        <Bell className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                          <div>
                            <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
                            <div className="h-2 bg-gray-200 rounded w-16"></div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-100 rounded-lg p-3 h-16"></div>
                        <div className="bg-purple-100 rounded-lg p-3 h-16"></div>
                        <div className="bg-orange-100 rounded-lg p-3 h-16"></div>
                        <div className="bg-pink-100 rounded-lg p-3 h-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features and Download */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Mobile Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Wifi className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Offline Learning</h4>
                      <p className="text-sm text-muted-foreground">Download lessons and study offline</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Bell className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">Never miss study reminders</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Native Experience</h4>
                      <p className="text-sm text-muted-foreground">App-like performance in your browser</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <QrCode className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Easy Installation</h4>
                      <p className="text-sm text-muted-foreground">Install directly from your browser</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Install the App</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Get the full mobile experience by installing our Progressive Web App (PWA).
                  </p>
                  
                  <div className="space-y-3">
                    <Button onClick={installPWA} className="w-full bg-gradient-primary">
                      <Download className="h-4 w-4 mr-2" />
                      Install App
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1" onClick={shareApp}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <QrCode className="h-4 w-4 mr-2" />
                        QR Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Browser Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-2">
                      <Chrome className="h-8 w-8 mx-auto text-blue-500" />
                      <div className="text-sm font-medium">Chrome</div>
                      <Badge variant="outline" className="text-xs">Supported</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="h-8 w-8 mx-auto bg-orange-500 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded"></div>
                      </div>
                      <div className="text-sm font-medium">Firefox</div>
                      <Badge variant="outline" className="text-xs">Supported</Badge>
                    </div>
                    <div className="space-y-2">
                      <Apple className="h-8 w-8 mx-auto text-gray-600" />
                      <div className="text-sm font-medium">Safari</div>
                      <Badge variant="outline" className="text-xs">Supported</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Installation Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Installation Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Chrome className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Chrome/Edge</h3>
                  <p className="text-sm text-muted-foreground">
                    Look for the install button in the address bar or click "Install App" button above.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Apple className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Safari (iOS)</h3>
                  <p className="text-sm text-muted-foreground">
                    Tap the share button and select "Add to Home Screen" to install.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Android</h3>
                  <p className="text-sm text-muted-foreground">
                    Tap the menu button and select "Add to Home screen" or "Install app".
                  </p>
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
