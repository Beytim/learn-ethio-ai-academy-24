import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Clock, 
  Target, 
  CheckCircle, 
  XCircle,
  Star,
  Zap,
  Brain,
  BarChart3
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'drag-drop' | 'matching' | 'fill-blank';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface InteractiveAssessmentProps {
  title: string;
  subject: string;
  topic: string;
  questions: Question[];
  onComplete: (score: number, totalPoints: number) => void;
  onClose: () => void;
}

export function InteractiveAssessment({ 
  title, 
  subject, 
  topic, 
  questions, 
  onComplete, 
  onClose 
}: InteractiveAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    let finalScore = 0;
    questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (Array.isArray(question.correctAnswer)) {
        if (JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer)) {
          finalScore += question.points;
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          finalScore += question.points;
        }
      }
    });
    
    setScore(finalScore);
    setIsCompleted(true);
    onComplete(finalScore, totalPoints);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left border rounded-lg transition-colors hover:bg-muted ${
                  answers[currentQuestion.id] === option 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion.id] === option 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : 'border-border'
                  }`}>
                    {answers[currentQuestion.id] === option && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'drag-drop':
        return (
          <div className="space-y-4">
            <div className="p-4 border-2 border-dashed border-border rounded-lg min-h-[100px] flex items-center justify-center">
              {answers[currentQuestion.id] ? (
                <div className="bg-primary/10 px-4 py-2 rounded-lg">
                  {answers[currentQuestion.id]}
                </div>
              ) : (
                <span className="text-muted-foreground">Drop answer here</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="p-3 border rounded-lg hover:bg-muted transition-colors"
                  disabled={answers[currentQuestion.id] === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isCompleted) {
    const percentage = Math.round((score / totalPoints) * 100);
    const performance = percentage >= 80 ? 'excellent' : percentage >= 60 ? 'good' : 'needs-improvement';

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Assessment Complete!</CardTitle>
          <p className="text-muted-foreground">
            Great job completing the {title} assessment
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {score}/{totalPoints}
            </div>
            <div className="text-2xl font-semibold mb-2">
              {percentage}%
            </div>
            <Badge 
              variant={performance === 'excellent' ? 'default' : performance === 'good' ? 'secondary' : 'destructive'}
              className="text-sm"
            >
              {performance === 'excellent' && '🌟 Excellent'}
              {performance === 'good' && '👍 Good Job'}
              {performance === 'needs-improvement' && '📚 Keep Learning'}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {questions.filter(q => answers[q.id] === q.correctAnswer).length}
              </div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {questions.filter(q => answers[q.id] && answers[q.id] !== q.correctAnswer).length}
              </div>
              <div className="text-sm text-muted-foreground">Wrong</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {formatTime(timeElapsed)}
              </div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
          </div>

          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Easy Questions</span>
                  <span>
                    {questions.filter(q => q.difficulty === 'easy' && answers[q.id] === q.correctAnswer).length}/
                    {questions.filter(q => q.difficulty === 'easy').length}
                  </span>
                </div>
                <Progress 
                  value={(questions.filter(q => q.difficulty === 'easy' && answers[q.id] === q.correctAnswer).length / 
                         questions.filter(q => q.difficulty === 'easy').length) * 100} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Medium Questions</span>
                  <span>
                    {questions.filter(q => q.difficulty === 'medium' && answers[q.id] === q.correctAnswer).length}/
                    {questions.filter(q => q.difficulty === 'medium').length}
                  </span>
                </div>
                <Progress 
                  value={(questions.filter(q => q.difficulty === 'medium' && answers[q.id] === q.correctAnswer).length / 
                         questions.filter(q => q.difficulty === 'medium').length) * 100} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hard Questions</span>
                  <span>
                    {questions.filter(q => q.difficulty === 'hard' && answers[q.id] === q.correctAnswer).length}/
                    {questions.filter(q => q.difficulty === 'hard').length}
                  </span>
                </div>
                <Progress 
                  value={(questions.filter(q => q.difficulty === 'hard' && answers[q.id] === q.correctAnswer).length / 
                         questions.filter(q => q.difficulty === 'hard').length) * 100} 
                  className="h-2" 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="review" className="space-y-3">
              {questions.map((question, index) => {
                const isCorrect = answers[question.id] === question.correctAnswer;
                return (
                  <div key={question.id} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">Question {index + 1}</span>
                      <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{question.question}</p>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Your answer: </span>
                      <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {answers[question.id] || 'Not answered'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="text-sm mt-1">
                        <span className="text-muted-foreground">Correct answer: </span>
                        <span className="text-green-600">{question.correctAnswer}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 justify-center">
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button variant="outline" onClick={onClose}>
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {title}
              </CardTitle>
              <p className="text-muted-foreground">{subject} • {topic}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <Badge variant="secondary">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getDifficultyColor(currentQuestion?.difficulty || 'easy')}>
                {currentQuestion?.difficulty}
              </Badge>
              <Badge variant="secondary">
                {currentQuestion?.points} points
              </Badge>
            </div>
            <Target className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">{currentQuestion?.question}</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderQuestion()}
          
          <div className="flex justify-between">
            <Button 
              variant="outline"
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!answers[currentQuestion?.id]}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}