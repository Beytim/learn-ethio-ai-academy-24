import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  RotateCcw,
  Star,
  Target,
  ArrowRight,
  Clock
} from "lucide-react";

interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-in-blank' | 'drag-drop';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface KhanStyleExerciseProps {
  exercises: Exercise[];
  onComplete: (score: number, streak: number) => void;
  onHintUsed: () => void;
}

export function KhanStyleExercise({ exercises, onComplete, onHintUsed }: KhanStyleExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [usedHints, setUsedHints] = useState<string[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex + 1) / exercises.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleSubmit = () => {
    const correct = userAnswer.toLowerCase().trim() === currentExercise.correctAnswer.toString().toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setShowResult(false);
      setShowHint(false);
      setStartTime(Date.now());
    } else {
      onComplete(score, streak);
    }
  };

  const handleHint = () => {
    setShowHint(true);
    setUsedHints([...usedHints, currentExercise.id]);
    onHintUsed();
  };

  const handleTryAgain = () => {
    setShowResult(false);
    setUserAnswer('');
    setShowHint(false);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className={getDifficultyColor(currentExercise.difficulty)}>
              {currentExercise.difficulty.toUpperCase()}
            </Badge>
            <Badge variant="secondary">{currentExercise.category}</Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeSpent)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span>{streak} streak</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentIndex + 1} of {exercises.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Exercise Card */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {currentExercise.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Answer Input */}
          {currentExercise.type === 'multiple-choice' && currentExercise.options ? (
            <div className="grid gap-3">
              {currentExercise.options.map((option, index) => (
                <Button
                  key={index}
                  variant={userAnswer === option ? "default" : "outline"}
                  className="text-left justify-start h-auto p-4"
                  onClick={() => setUserAnswer(option)}
                  disabled={showResult}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Enter your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={showResult}
                className="text-lg p-4"
                onKeyPress={(e) => e.key === 'Enter' && !showResult && userAnswer && handleSubmit()}
              />
            </div>
          )}

          {/* Hint */}
          {showHint && currentExercise.hint && (
            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-accent">Hint</p>
                    <p className="text-sm">{currentExercise.hint}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result */}
          {showResult && (
            <Card className={`border-2 ${isCorrect ? 'bg-success/10 border-success/20' : 'bg-destructive/10 border-destructive/20'}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-success mt-0.5" />
                  ) : (
                    <XCircle className="h-6 w-6 text-destructive mt-0.5" />
                  )}
                  <div className="flex-1 space-y-2">
                    <p className="font-medium">
                      {isCorrect ? 'Correct!' : 'Not quite right'}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm">
                        The correct answer is: <strong>{currentExercise.correctAnswer}</strong>
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {currentExercise.explanation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <div className="space-x-2">
              {!showHint && currentExercise.hint && !showResult && (
                <Button variant="outline" onClick={handleHint}>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Hint
                </Button>
              )}
              {showResult && !isCorrect && (
                <Button variant="outline" onClick={handleTryAgain}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              )}
            </div>
            
            <div className="space-x-2">
              {!showResult && (
                <Button 
                  onClick={handleSubmit}
                  disabled={!userAnswer}
                  className="min-w-[100px]"
                >
                  Check
                </Button>
              )}
              {showResult && (
                <Button onClick={handleNext} className="min-w-[100px]">
                  {currentIndex < exercises.length - 1 ? (
                    <>Next <ArrowRight className="h-4 w-4 ml-2" /></>
                  ) : (
                    'Complete'
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Display */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{streak}</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{exercises.length - currentIndex - 1}</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
            </div>
            {streak >= 3 && (
              <div className="flex items-center space-x-1 text-warning">
                <Star className="h-5 w-5" />
                <span className="font-medium">On Fire!</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}