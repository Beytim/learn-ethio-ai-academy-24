
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Download, Wifi, WifiOff, HardDrive } from "lucide-react";

const OfflineMode = () => {
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
              Offline <span className="bg-gradient-hero bg-clip-text text-transparent">Mode</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Download lessons and study materials for offline access
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Download Manager</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Select and download lessons for offline study
                </p>
                <Button className="w-full">Start Download</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HardDrive className="h-5 w-5" />
                  <span>Storage Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage your offline content and storage space
                </p>
                <Button className="w-full" variant="outline">Manage Storage</Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Badge variant="outline" className="text-sm">
              Offline functionality coming soon
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineMode;
