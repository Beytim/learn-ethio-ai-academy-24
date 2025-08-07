import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AuthModal } from "@/components/AuthModal";
import { MasteryMap } from "@/components/mastery/MasteryMap";
import { KhanStyleExercise } from "@/components/practice/KhanStyleExercise";
import { InteractiveVideoPlayer } from "@/components/video/InteractiveVideoPlayer";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  BookOpen,
  Play,
  FileText,
  Trophy,
  Target,
  Clock,
  Star
} from "lucide-react";

const MasteryLearning = () => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('map'); // 'map', 'skill', 'exercise', 'video'
  const [selectedSkill, setSelectedSkill] = useState(null);

  const sampleExercises = [
    {
      id: '1',
      type: 'multiple-choice' as const,
      question: 'What is 15 × 8?',
      options: ['120', '125', '130', '115'],
      correctAnswer: '120',
      explanation: 'To multiply 15 × 8, you can break it down: (10 × 8) + (5 × 8) = 80 + 40 = 120',
      hint: 'Try breaking 15 into 10 + 5 and multiply each part by 8',
      difficulty: 'medium' as const,
      category: 'Multiplication'
    },
    {
      id: '2',
      type: 'fill-in-blank' as const,
      question: 'Complete the pattern: 2, 4, 8, 16, ___',
      correctAnswer: '32',
      explanation: 'This is a pattern where each number is doubled. 16 × 2 = 32',
      hint: 'Look at how each number relates to the previous one',
      difficulty: 'easy' as const,
      category: 'Patterns'
    }
  ];

  const sampleVideoLesson = {
    id: 'video-1',
    title: 'Introduction to Multiplication',
    description: 'Learn the fundamentals of multiplication with visual examples',
    duration: 300,
    thumbnailUrl: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=400&q=80',
    videoUrl: '/placeholder-video.mp4',
    transcript: 'Today we will learn about multiplication. Multiplication is repeated addition...',
    notes: [
      { id: '1', timestamp: 30, note: 'Multiplication as repeated addition' },
      { id: '2', timestamp: 90, note: 'Visual representation with arrays' }
    ],
    quizzes: [
      {
        timestamp: 120,
        question: 'What does 3 × 4 mean?',
        options: ['3 + 4', '3 added 4 times', '4 - 3', '3 × 3 × 3 × 3'],
        correctAnswer: 1,
        explanation: 'Multiplication means adding a number to itself multiple times'
      }
    ],
    chapters: [
      { title: 'Introduction', timestamp: 0 },
      { title: 'Visual Examples', timestamp: 60 },
      { title: 'Practice Problems', timestamp: 180 }
    ]
  };

  const handleSkillSelect = (skill: any) => {
    setSelectedSkill(skill);
    setCurrentView('skill');
  };

  const handleStartExercise = () => {
    setCurrentView('exercise');
  };

  const handleWatchVideo = () => {
    setCurrentView('video');
  };

  const handleExerciseComplete = (score: number, streak: number) => {
    console.log(`Exercise completed! Score: ${score}, Streak: ${streak}`);
    setCurrentView('skill');
  };

  const handleBackToMap = () => {
    setCurrentView('map');
    setSelectedSkill(null);
  };

  const handleBackToSkill = () => {
    setCurrentView('skill');
  };

  // Skill Detail View
  if (currentView === 'skill' && selectedSkill) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation
          user={user}
          onLogin={() => setIsAuthModalOpen(true)}
          onLogout={() => logout()}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Button variant="ghost" onClick={handleBackToMap}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Mastery Map
            </Button>

            <div className="text-center space-y-4">
              <Badge className={`text-lg px-4 py-2 ${
                selectedSkill.status === 'mastered' ? 'bg-success text-success-foreground' :
                selectedSkill.status === 'in-progress' ? 'bg-warning text-warning-foreground' :
                'bg-primary text-primary-foreground'
              }`}>
                {selectedSkill.status === 'mastered' ? 'Mastered' :
                 selectedSkill.status === 'in-progress' ? 'In Progress' : 'Ready to Learn'}
              </Badge>
              
              <h1 className="text-4xl font-bold">{selectedSkill.title}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {selectedSkill.description}
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="practice">Practice</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Learning Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedSkill.skills.map((skill: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        Time & Rewards
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Estimated Time:</span>
                        <span className="font-medium">{selectedSkill.estimatedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>XP Reward:</span>
                        <span className="font-medium flex items-center">
                          <Star className="h-4 w-4 mr-1 text-warning" />
                          {selectedSkill.xpReward}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Progress:</span>
                        <span className="font-medium">{selectedSkill.progress}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Button size="lg" onClick={handleStartExercise} className="h-16">
                    <BookOpen className="h-6 w-6 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Start Practice</div>
                      <div className="text-sm opacity-90">Interactive exercises</div>
                    </div>
                  </Button>

                  <Button size="lg" variant="outline" onClick={handleWatchVideo} className="h-16">
                    <Play className="h-6 w-6 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Watch Videos</div>
                      <div className="text-sm opacity-90">Learn with examples</div>
                    </div>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="practice">
                <Card>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-semibold mb-2">Ready to Practice?</h3>
                    <p className="text-muted-foreground mb-6">
                      Complete exercises to master this skill and unlock new content.
                    </p>
                    <Button size="lg" onClick={handleStartExercise}>
                      Start Exercise Session
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="videos">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Play className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-semibold mb-2">Video Lessons</h3>
                    <p className="text-muted-foreground mb-6">
                      Watch interactive video lessons with embedded quizzes and note-taking.
                    </p>
                    <Button size="lg" onClick={handleWatchVideo}>
                      Watch Introduction Video
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <Trophy className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <h3 className="text-2xl font-semibold">Progress Tracking</h3>
                      <p className="text-muted-foreground">
                        Monitor your mastery level and see detailed analytics.
                      </p>
                    </div>
                    {/* Add progress visualization here */}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    );
  }

  // Exercise View
  if (currentView === 'exercise') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation
          user={user}
          onLogin={() => setIsAuthModalOpen(true)}
          onLogout={() => logout()}
        />
        
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={handleBackToSkill} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Skill
          </Button>

          <KhanStyleExercise
            exercises={sampleExercises}
            onComplete={handleExerciseComplete}
            onHintUsed={() => console.log('Hint used')}
          />
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    );
  }

  // Video View
  if (currentView === 'video') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation
          user={user}
          onLogin={() => setIsAuthModalOpen(true)}
          onLogout={() => logout()}
        />
        
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={handleBackToSkill} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Skill
          </Button>

          <div className="max-w-4xl mx-auto">
            <InteractiveVideoPlayer
              lesson={sampleVideoLesson}
              onProgress={(progress) => console.log('Video progress:', progress)}
              onComplete={() => console.log('Video completed')}
            />
          </div>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    );
  }

  // Default Map View
  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={() => logout()}
      />
      
      <div className="container mx-auto px-4 py-8">
        <MasteryMap
          subject="Mathematics"
          grade={8}
          onSkillSelect={handleSkillSelect}
        />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default MasteryLearning;