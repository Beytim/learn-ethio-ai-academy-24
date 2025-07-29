import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { SmartAITutor } from "@/components/enhanced/SmartAITutor";
import { InteractiveAssessment } from "@/components/enhanced/InteractiveAssessment";
import { 
  Play, 
  Pause,
  CheckCircle,
  Clock,
  FileText,
  Video,
  BookOpenCheck,
  Target,
  ArrowLeft,
  MessageSquare,
  Brain,
  Download,
  Volume2,
  RotateCcw,
  Zap,
  Award
} from "lucide-react";

interface Lecture {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  duration: number;
  completed: boolean;
  description: string;
}

interface LectureViewerProps {
  lecture: Lecture;
  onBack: () => void;
  onComplete: () => void;
  onOpenAITutor: () => void;
}

export function LectureViewer({ lecture, onBack, onComplete, onOpenAITutor }: LectureViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(lecture.completed ? 100 : 0);
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [showSmartTutor, setShowSmartTutor] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);

  const getLectureIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5" />;
      case 'reading': return <FileText className="h-5 w-5" />;
      case 'exercise': return <BookOpenCheck className="h-5 w-5" />;
      case 'quiz': return <Target className="h-5 w-5" />;
      default: return <Play className="h-5 w-5" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'video': return 'default';
      case 'reading': return 'secondary';
      case 'exercise': return 'outline';
      case 'quiz': return 'destructive';
      default: return 'outline';
    }
  };

  const getContent = () => {
    switch (lecture.type) {
      case 'video':
        return (
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  {isPlaying ? 
                    <Pause className="h-8 w-8 text-primary" /> : 
                    <Play className="h-8 w-8 text-primary" />
                  }
                </div>
                <p className="text-sm text-muted-foreground">Video content placeholder</p>
                <Button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  variant={isPlaying ? "outline" : "default"}
                >
                  {isPlaying ? "Pause" : "Play"} Video
                </Button>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 bg-background/80 rounded-lg p-3 space-y-2">
                <Progress value={progress} className="h-1" />
                <div className="flex items-center justify-between text-xs">
                  <span>{Math.floor(progress * lecture.duration / 100)} min</span>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <span>{lecture.duration} min</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'reading':
        return (
          <div className="prose prose-sm max-w-none space-y-6">
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">📖 Reading Material</h3>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  This is where the reading content would be displayed. In the Ethiopian curriculum, 
                  this could include textbook excerpts, supplementary materials, or specially designed 
                  reading content aligned with the specific learning objectives.
                </p>
                <p>
                  For example, if this is a mathematics lesson on real numbers, the reading might include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Definitions and explanations of rational and irrational numbers</li>
                  <li>Examples from everyday Ethiopian contexts</li>
                  <li>Historical background on number systems</li>
                  <li>Visual representations and diagrams</li>
                </ul>
                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg">
                  <p className="font-medium">💡 Key Insight</p>
                  <p>Real numbers include all the numbers you can think of: counting numbers, fractions, decimals, and even numbers like π and √2.</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'exercise':
        return (
          <div className="space-y-6">
            <div className="bg-accent/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BookOpenCheck className="h-5 w-5 mr-2" />
                Practice Exercises
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Exercise 1: Classify the Numbers</h4>
                  <p className="text-sm text-muted-foreground">
                    Determine whether each number is rational or irrational:
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="p-3 bg-background rounded border">a) 3/4</div>
                      <div className="p-3 bg-background rounded border">b) √16</div>
                      <div className="p-3 bg-background rounded border">c) π</div>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 bg-background rounded border">d) 0.333...</div>
                      <div className="p-3 bg-background rounded border">e) √7</div>
                      <div className="p-3 bg-background rounded border">f) -5</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Exercise 2: Number Line</h4>
                  <p className="text-sm text-muted-foreground">
                    Place the following numbers on a number line: -2, 0, 1.5, π, 4
                  </p>
                  <div className="h-16 bg-muted rounded flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Interactive number line would be here</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="bg-destructive/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Knowledge Check Quiz
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Question 1 of 3</h4>
                  <p className="text-sm">Which of the following is an irrational number?</p>
                  <div className="space-y-2">
                    {['A) 1/3', 'B) 0.25', 'C) √2', 'D) -7'].map((option, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        className="w-full justify-start h-auto p-3 text-left"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Question 1 of 3
                  </div>
                  <Button>Next Question</Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Content type not supported</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Lessons
              </Button>
              <div className="flex items-center space-x-2">
                {getLectureIcon(lecture.type)}
                <h1 className="text-xl font-semibold">{lecture.title}</h1>
                <Badge variant={getBadgeVariant(lecture.type)}>
                  {lecture.type}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setShowSmartTutor(true)}>
                <Brain className="h-4 w-4 mr-2" />
                Smart AI Tutor
              </Button>
              <Button variant="outline" onClick={() => setShowAssessment(true)}>
                <Award className="h-4 w-4 mr-2" />
                Take Assessment
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowNotes(!showNotes)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Notes
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" />
                <span>{lecture.duration} min</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{lecture.title}</span>
                  {lecture.completed && (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                </CardTitle>
                <p className="text-muted-foreground">{lecture.description}</p>
              </CardHeader>
              <CardContent>
                {getContent()}
              </CardContent>
            </Card>

            {/* Completion Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">Ready to continue?</h3>
                    <p className="text-sm text-muted-foreground">
                      Mark this lecture as complete to track your progress
                    </p>
                  </div>
                  <Button 
                    onClick={onComplete}
                    disabled={lecture.completed}
                    variant={lecture.completed ? "outline" : "default"}
                  >
                    {lecture.completed ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      "Mark Complete"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notes Panel */}
            {showNotes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📝 My Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Take notes while learning..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Save Notes
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowSmartTutor(true)}>
                  <Brain className="h-4 w-4 mr-2" />
                  Smart AI Tutor
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowAssessment(true)}>
                  <Zap className="h-4 w-4 mr-2" />
                  Interactive Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resources
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discussion Forum
                </Button>
              </CardContent>
            </Card>

            {/* Learning Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💡 Learning Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <p className="font-medium">For this {lecture.type}:</p>
                  {lecture.type === 'video' && (
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Take notes of key concepts</li>
                      <li>• Pause to think about examples</li>
                      <li>• Replay sections if needed</li>
                    </ul>
                  )}
                  {lecture.type === 'reading' && (
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Read slowly and carefully</li>
                      <li>• Highlight important terms</li>
                      <li>• Summarize each section</li>
                    </ul>
                  )}
                  {lecture.type === 'exercise' && (
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Try solving before looking at hints</li>
                      <li>• Check your work carefully</li>
                      <li>• Ask for help if stuck</li>
                    </ul>
                  )}
                  {lecture.type === 'quiz' && (
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Read each question carefully</li>
                      <li>• Eliminate wrong answers first</li>
                      <li>• Review incorrect answers</li>
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced AI Tutor Modal */}
      {showSmartTutor && (
        <SmartAITutor
          isOpen={showSmartTutor}
          onClose={() => setShowSmartTutor(false)}
          subject="Mathematics"
          topic="Set Theory"
          grade={9}
          studentId="student_001"
        />
      )}

      {/* Interactive Assessment Modal */}
      {showAssessment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <InteractiveAssessment
            subject="Mathematics"
            topic="Set Theory"
            grade={9}
            onComplete={(result) => {
              setAssessmentResult(result);
              setShowAssessment(false);
            }}
            onClose={() => setShowAssessment(false)}
          />
        </div>
      )}
    </div>
  );
}