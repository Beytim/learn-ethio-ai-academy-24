
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Award, Download, Share2, Calendar } from "lucide-react";

const Certificates = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const certificates = [
    {
      id: 1,
      title: "Mathematics Grade 9 Completion",
      subject: "Mathematics",
      date: "2024-01-15",
      status: "earned"
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      subject: "Physics",
      date: "2024-02-01",
      status: "in_progress"
    }
  ];

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
              <span className="bg-gradient-hero bg-clip-text text-transparent">Certificates</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Celebrate your learning achievements with digital certificates
            </p>
          </div>

          <div className="grid gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{cert.title}</CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(cert.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      className={cert.status === 'earned' ? 'bg-green-500' : 'bg-yellow-500'}
                    >
                      {cert.status === 'earned' ? 'Earned' : 'In Progress'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{cert.subject}</Badge>
                    {cert.status === 'earned' && (
                      <div className="flex space-x-2 ml-auto">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
