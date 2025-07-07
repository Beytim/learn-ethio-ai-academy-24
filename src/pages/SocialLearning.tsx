
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Users, MessageCircle, BookOpen, Trophy } from "lucide-react";

const SocialLearning = () => {
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
              Social <span className="bg-gradient-hero bg-clip-text text-transparent">Learning</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect, collaborate, and learn together with fellow students
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Discussion Forums</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Join subject-specific discussions and get help from the community
                </p>
                <Button className="w-full">Browse Forums</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Study Groups</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Form or join study groups with students in your grade
                </p>
                <Button className="w-full">Find Groups</Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Badge variant="outline" className="text-sm">
              Coming Soon - More social features in development
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLearning;
