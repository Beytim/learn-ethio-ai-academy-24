
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Volume2, Maximize, BookOpen, Clock, CheckCircle2 } from "lucide-react";

const VideoLessons = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState("");

  const videoLessons = [
    {
      id: 1,
      title: "Introduction to Algebra",
      subject: "Mathematics",
      grade: 9,
      duration: "15:30",
      thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=400&q=80",
      description: "Learn the fundamentals of algebraic expressions and basic operations",
      completed: true,
      progress: 100
    },
    {
      id: 2,
      title: "Linear Equations",
      subject: "Mathematics", 
      grade: 9,
      duration: "22:45",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80",
      description: "Solving linear equations step by step with practical examples",
      completed: false,
      progress: 65
    },
    {
      id: 3,
      title: "Newton's Laws of Motion",
      subject: "Physics",
      grade: 10,
      duration: "18:20",
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=400&q=80",
      description: "Understanding the three fundamental laws that govern motion",
      completed: false,
      progress: 0
    },
    {
      id: 4,
      title: "Chemical Bonding",
      subject: "Chemistry",
      grade: 10,
      duration: "25:15",
      thumbnail: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?auto=format&fit=crop&w=400&q=80",
      description: "Explore ionic and covalent bonds and molecular structures",
      completed: false,
      progress: 30
    }
  ];

  const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "English"];
  const [selectedSubject, setSelectedSubject] = useState("All");

  const filteredVideos = selectedSubject === "All" 
    ? videoLessons 
    : videoLessons.filter(video => video.subject === selectedSubject);

  const playVideo = (video: any) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const saveNotes = () => {
    console.log("Notes saved:", notes);
    // In a real app, this would save to a backend
  };

  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation
          user={user}
          onLogin={() => navigate('/auth')}
          onLogout={() => navigate('/')}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Video Player */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                      <img 
                        src={selectedVideo.thumbnail} 
                        alt={selectedVideo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="lg"
                          onClick={togglePlayPause}
                          className="rounded-full w-16 h-16 bg-primary/80 hover:bg-primary"
                        >
                          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Video Controls */}
                    <div className="p-4 bg-card">
                      <div className="flex items-center space-x-4">
                        <Button size="sm" variant="outline" onClick={togglePlayPause}>
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Progress value={progress} className="flex-1" />
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(progress * parseInt(selectedVideo.duration) / 100 / 60)}:
                          {Math.floor(progress * parseInt(selectedVideo.duration) / 100 % 60).toString().padStart(2, '0')} / {selectedVideo.duration}
                        </span>
                        <Button size="sm" variant="outline">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="mb-2">{selectedVideo.title}</CardTitle>
                        <p className="text-muted-foreground">{selectedVideo.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{selectedVideo.subject}</Badge>
                        <Badge>Grade {selectedVideo.grade}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{selectedVideo.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{selectedVideo.progress}% completed</span>
                      </div>
                    </div>
                    <Progress value={selectedVideo.progress} className="mt-3" />
                  </CardContent>
                </Card>

                {/* Notes Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>My Notes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Take notes while watching the video..."
                      className="w-full h-24 p-3 border border-border rounded-md resize-none"
                    />
                    <Button onClick={saveNotes} className="mt-3" size="sm">
                      Save Notes
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Lesson List */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {videoLessons.map((video) => (
                      <div
                        key={video.id}
                        onClick={() => playVideo(video)}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedVideo.id === video.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-16 h-12 object-cover rounded"
                            />
                            {video.completed && (
                              <div className="absolute -top-1 -right-1">
                                <CheckCircle2 className="h-4 w-4 text-green-500 bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{video.title}</h4>
                            <p className="text-xs text-muted-foreground">{video.duration}</p>
                            <Progress value={video.progress} className="mt-1 h-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => setSelectedVideo(null)}
                  variant="outline" 
                  className="w-full"
                >
                  Back to All Videos
                </Button>
              </div>
            </div>
          </div>
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Video <span className="bg-gradient-hero bg-clip-text text-transparent">Lessons</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn with high-quality video content from expert instructors
            </p>
          </div>

          {/* Subject Filter */}
          <div className="flex items-center space-x-2 mb-8 overflow-x-auto">
            {subjects.map((subject) => (
              <Button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                variant={selectedSubject === subject ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {subject}
              </Button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="hover:shadow-medium transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    onClick={() => playVideo(video)}
                    size="sm"
                    className="absolute inset-0 w-full h-full bg-black/50 hover:bg-black/60 rounded-none"
                  >
                    <Play className="h-8 w-8 text-white" />
                  </Button>
                  {video.completed && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="h-6 w-6 text-green-500 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{video.subject}</Badge>
                        <span className="text-muted-foreground">Grade {video.grade}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{video.progress}%</span>
                      </div>
                      <Progress value={video.progress} className="h-2" />
                    </div>
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

export default VideoLessons;
