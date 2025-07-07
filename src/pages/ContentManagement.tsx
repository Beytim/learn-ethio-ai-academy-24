
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, Video, Image, Settings } from "lucide-react";

const ContentManagement = () => {
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Content <span className="bg-gradient-hero bg-clip-text text-transparent">Management</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create and manage educational content for your students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-medium transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Create Lesson</h3>
                <p className="text-sm text-muted-foreground">Add new text-based lessons</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-medium transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-success/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Video className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-semibold mb-2">Upload Video</h3>
                <p className="text-sm text-muted-foreground">Add video lessons</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-medium transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-warning/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image className="h-8 w-8 text-warning" />
                </div>
                <h3 className="font-semibold mb-2">Media Library</h3>
                <p className="text-sm text-muted-foreground">Manage images and files</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-medium transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-info/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Settings className="h-8 w-8 text-info" />
                </div>
                <h3 className="font-semibold mb-2">Settings</h3>
                <p className="text-sm text-muted-foreground">Configure content options</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Content</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Content
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Content management tools are being developed. 
                  Soon you'll be able to create, edit, and publish educational content.
                </p>
                <Badge variant="outline" className="mt-4">
                  Coming Soon
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
