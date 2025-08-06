import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Award, 
  Download, 
  Share2, 
  Calendar, 
  Trophy,
  Medal,
  Star,
  CheckCircle,
  Clock,
  BookOpen,
  Target
} from "lucide-react";

const Certificates = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  const earnedCertificates = [
    {
      id: 1,
      title: "Mathematics Grade 9 Completion",
      subject: "Mathematics",
      type: "completion",
      date: "2024-01-15",
      score: 88,
      description: "Successfully completed all Grade 9 Mathematics curriculum requirements",
      skills: ["Algebra", "Geometry", "Statistics"],
      institution: "Ethiopian Ministry of Education",
      verificationId: "ETH-MATH-9-2024-001"
    },
    {
      id: 2,
      title: "Physics Excellence Award",
      subject: "Physics",
      type: "excellence",
      date: "2024-02-01",
      score: 95,
      description: "Demonstrated exceptional understanding of physics concepts",
      skills: ["Mechanics", "Thermodynamics", "Waves"],
      institution: "Ethiopian Ministry of Education",
      verificationId: "ETH-PHYS-EXC-2024-001"
    },
    {
      id: 3,
      title: "English Proficiency Certificate",
      subject: "English",
      type: "proficiency",
      date: "2024-01-28",
      score: 91,
      description: "Achieved advanced level proficiency in English language",
      skills: ["Grammar", "Writing", "Reading Comprehension"],
      institution: "Ethiopian Ministry of Education",
      verificationId: "ETH-ENG-PROF-2024-001"
    }
  ];

  const inProgressCertificates = [
    {
      id: 4,
      title: "Chemistry Grade 10 Completion",
      subject: "Chemistry",
      type: "completion",
      progress: 75,
      description: "Working towards Grade 10 Chemistry completion",
      estimatedCompletion: "2024-03-15",
      requiredScore: 80
    },
    {
      id: 5,
      title: "Biology Excellence Award",
      subject: "Biology",
      type: "excellence",
      progress: 60,
      description: "Pursuing excellence in biological sciences",
      estimatedCompletion: "2024-04-01",
      requiredScore: 90
    }
  ];

  const getCertificateIcon = (type: string) => {
    switch (type) {
      case 'excellence':
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 'proficiency':
        return <Star className="h-8 w-8 text-blue-500" />;
      default:
        return <Award className="h-8 w-8 text-purple-500" />;
    }
  };

  const getCertificateColor = (type: string) => {
    switch (type) {
      case 'excellence':
        return 'border-yellow-200 bg-yellow-50/50';
      case 'proficiency':
        return 'border-blue-200 bg-blue-50/50';
      default:
        return 'border-purple-200 bg-purple-50/50';
    }
  };

  const downloadCertificate = (certificate: any) => {
    // In a real app, this would generate and download a PDF certificate
    console.log('Downloading certificate:', certificate.title);
  };

  const shareCertificate = (certificate: any) => {
    if (navigator.share) {
      navigator.share({
        title: certificate.title,
        text: `I've earned a certificate in ${certificate.subject}!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`I've earned a certificate: ${certificate.title} - ${window.location.href}`);
    }
  };

  if (selectedCertificate) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation
          user={user}
          onLogin={() => navigate('/auth')}
          onLogout={() => navigate('/')}
        />

        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <Button 
            onClick={() => setSelectedCertificate(null)}
            variant="outline"
            className="mb-6"
          >
            ← Back to Certificates
          </Button>

          {/* Certificate Preview */}
          <Card className={`${getCertificateColor(selectedCertificate.type)} mb-8`}>
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                {getCertificateIcon(selectedCertificate.type)}
              </div>
              
              <h1 className="text-4xl font-bold mb-4 text-primary">
                Certificate of {selectedCertificate.type === 'excellence' ? 'Excellence' : 
                              selectedCertificate.type === 'proficiency' ? 'Proficiency' : 'Completion'}
              </h1>
              
              <p className="text-xl mb-8">This certifies that</p>
              
              <h2 className="text-3xl font-bold mb-8 text-foreground">
                {user?.name || 'Student Name'}
              </h2>
              
              <p className="text-lg mb-4">has successfully {
                selectedCertificate.type === 'excellence' ? 'demonstrated excellence in' :
                selectedCertificate.type === 'proficiency' ? 'achieved proficiency in' :
                'completed the curriculum for'
              }</p>
              
              <h3 className="text-2xl font-semibold mb-8 text-primary">
                {selectedCertificate.title}
              </h3>
              
              <div className="flex justify-center items-center space-x-8 mb-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Score Achieved</p>
                  <p className="text-2xl font-bold text-primary">{selectedCertificate.score}%</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Date Earned</p>
                  <p className="text-lg font-semibold">
                    {new Date(selectedCertificate.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <p className="text-sm text-muted-foreground mb-2">Issued by</p>
                <p className="font-semibold">{selectedCertificate.institution}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Verification ID: {selectedCertificate.verificationId}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Details */}
          <Card>
            <CardHeader>
              <CardTitle>Certificate Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground">{selectedCertificate.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Skills Demonstrated</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCertificate.skills.map((skill: string) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button onClick={() => downloadCertificate(selectedCertificate)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={() => shareCertificate(selectedCertificate)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => navigate('/auth')}
        onLogout={() => navigate('/')}
      />

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">
            Digital <span className="bg-gradient-hero bg-clip-text text-transparent">Certificates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Celebrate your learning achievements with verified digital certificates that showcase your skills and knowledge
          </p>
        </div>

        <Tabs defaultValue="earned" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="earned">Earned ({earnedCertificates.length})</TabsTrigger>
            <TabsTrigger value="progress">In Progress ({inProgressCertificates.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="earned" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earnedCertificates.map((cert) => (
                <Card 
                  key={cert.id} 
                  className={`hover:shadow-lg transition-all cursor-pointer ${getCertificateColor(cert.type)}`}
                  onClick={() => setSelectedCertificate(cert)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/80 p-3 rounded-full">
                          {getCertificateIcon(cert.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg line-clamp-2">{cert.title}</CardTitle>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(cert.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <Badge variant="outline" className="w-fit">
                      {cert.subject}
                    </Badge>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{cert.score}%</span>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadCertificate(cert);
                        }}
                        className="flex-1"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          shareCertificate(cert);
                        }}
                        className="flex-1"
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {inProgressCertificates.map((cert) => (
                <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-muted p-3 rounded-full">
                          <Medal className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{cert.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{cert.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline">In Progress</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <Badge variant="outline">{cert.subject}</Badge>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{cert.progress}%</span>
                      </div>
                      <Progress value={cert.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Est. completion: {new Date(cert.estimatedCompletion).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4" />
                        <span>Target: {cert.requiredScore}%</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate('/practice')}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Certificates;