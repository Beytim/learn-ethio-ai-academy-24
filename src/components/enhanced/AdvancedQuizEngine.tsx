import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Clock, CheckCircle, XCircle, Star, Lightbulb, Target, 
  Brain, Timer, Award, TrendingUp, RefreshCw, SkipForward
} from "lucide-react";

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'multiple-select' | 'true-false' | 'short-answer' | 'matching';
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
  question: string;
  options?: string[];
  correctAnswers: string[] | number[];
  explanation: string;
  points: number;
  timeLimit: number; // in seconds
  hints?: string[];
}

interface QuizSession {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
  difficulty: 'mixed' | 'easy' | 'medium' | 'hard';
  subject: string;
}

const sampleQuiz: QuizSession = {
  id: 'math-algebra-basics',
  title: 'Algebra Fundamentals',
  description: 'Test your understanding of basic algebraic concepts and operations',
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      difficulty: 'easy',
      subject: 'Mathematics',
      topic: 'Algebra',
      question: 'What is the value of x in the equation: 2x + 5 = 13?',
      options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
      correctAnswers: [1],
      explanation: 'To solve 2x + 5 = 13, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4.',
      points: 10,
      timeLimit: 60,
      hints: ['Isolate the variable by doing the same operation to both sides', 'First subtract 5 from both sides']
    },
    {
      id: 'q2',
      type: 'multiple-select',
      difficulty: 'medium',
      subject: 'Mathematics',
      topic: 'Algebra',
      question: 'Which of the following are equivalent to 3(x + 2)? (Select all that apply)',
      options: ['3x + 6', '3x + 2', 'x + 6', '3x + 3x + 6', '3(x) + 3(2)'],
      correctAnswers: [0, 4],
      explanation: 'Using the distributive property: 3(x + 2) = 3x + 6, which is also 3(x) + 3(2).',
      points: 15,
      timeLimit: 90,
      hints: ['Use the distributive property: a(b + c) = ab + ac']
    },
    {
      id: 'q3',
      type: 'true-false',
      difficulty: 'easy',
      subject: 'Mathematics',
      topic: 'Algebra',
      question: 'The equation y = 2x + 3 represents a linear function.',
      options: ['True', 'False'],
      correctAnswers: [0],
      explanation: 'Yes, y = 2x + 3 is in the form y = mx + b, which is the standard form of a linear function.',
      points: 8,
      timeLimit: 30
    },
    {
      id: 'q4',
      type: 'short-answer',
      difficulty: 'medium',
      subject: 'Mathematics',
      topic: 'Algebra',
      question: 'Simplify the expression: 2x² + 3x - x² + 5x',
      correctAnswers: ['x² + 8x', 'x^2 + 8x'],
      explanation: 'Combine like terms: 2x² - x² = x² and 3x + 5x = 8x, so the answer is x² + 8x.',
      points: 12,
      timeLimit: 120,
      hints: ['Group the like terms together', 'x² terms: 2x² - x²', 'x terms: 3x + 5x']
    },
    {
      id: 'q5',
      type: 'multiple-choice',
      difficulty: 'hard',
      subject: 'Mathematics',
      topic: 'Algebra',
      question: 'If f(x) = 2x - 1 and g(x) = x + 3, what is f(g(2))?',
      options: ['7', '8', '9', '10'],
      correctAnswers: [2],
      explanation: 'First find g(2) = 2 + 3 = 5, then f(5) = 2(5) - 1 = 10 - 1 = 9.',
      points: 20,
      timeLimit: 150,
      hints: ['First evaluate the inner function g(2)', 'Then use that result as input for f(x)']
    }
  ],
  timeLimit: 600, // 10 minutes
  passingScore: 70,
  difficulty: 'mixed',
  subject: 'Mathematics'
};

export function AdvancedQuizEngine() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(sampleQuiz.timeLimit);
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<any>(null);

  const currentQuestion = sampleQuiz.questions[currentQuestionIndex];

  // Timer effects
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted, timeRemaining]);

  useEffect(() => {
    if (quizStarted && !quizCompleted && currentQuestion) {
      setQuestionTimeRemaining(currentQuestion.timeLimit);
      const timer = setInterval(() => {
        setQuestionTimeRemaining(prev => {
          if (prev <= 1) {
            handleNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, quizStarted, quizCompleted]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setQuestionTimeRemaining(currentQuestion.timeLimit);
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowHint(false);
      setHintIndex(0);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowHint(false);
      setHintIndex(0);
    }
  };

  const handleSkipQuestion = () => {
    handleNextQuestion();
  };

  const handleShowHint = () => {
    if (currentQuestion.hints && hintIndex < currentQuestion.hints.length) {
      setShowHint(true);
      setHintIndex(prev => prev + 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    let totalScore = 0;
    let correctAnswers = 0;

    const questionResults = sampleQuiz.questions.map(question => {
      const userAnswer = answers[question.id];
      let isCorrect = false;

      if (question.type === 'multiple-choice' || question.type === 'true-false') {
        isCorrect = (question.correctAnswers as number[]).includes(userAnswer);
      } else if (question.type === 'multiple-select') {
        const correctSet = new Set(question.correctAnswers.map(String));
        const userSet = new Set((userAnswer || []).map(String));
        isCorrect = correctSet.size === userSet.size && 
                   [...correctSet].every(x => userSet.has(x));
      } else if (question.type === 'short-answer') {
        isCorrect = (question.correctAnswers as string[]).some(correct => 
          userAnswer?.toLowerCase().trim() === correct.toLowerCase().trim()
        );
      }

      if (isCorrect) {
        totalScore += question.points;
        correctAnswers++;
      }

      return {
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswers: question.correctAnswers,
        isCorrect,
        points: isCorrect ? question.points : 0,
        explanation: question.explanation
      };
    });

    const maxScore = sampleQuiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((totalScore / maxScore) * 100);

    setResults({
      totalScore,
      maxScore,
      percentage,
      correctAnswers,
      totalQuestions: sampleQuiz.questions.length,
      passed: percentage >= sampleQuiz.passingScore,
      timeUsed: sampleQuiz.timeLimit - timeRemaining,
      questionResults
    });

    setScore(totalScore);
    setQuizCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const answer = answers[currentQuestion.id];

    switch (currentQuestion.type) {
      case 'multiple-choice':
      case 'true-false':
        return (
          <RadioGroup 
            value={answer?.toString() || ''} 
            onValueChange={(value) => handleAnswerChange(currentQuestion.id, parseInt(value))}
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'multiple-select':
        return (
          <div className="space-y-2">
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`option-${index}`}
                  checked={answer?.includes(index) || false}
                  onCheckedChange={(checked) => {
                    const currentAnswers = answer || [];
                    if (checked) {
                      handleAnswerChange(currentQuestion.id, [...currentAnswers, index]);
                    } else {
                      handleAnswerChange(currentQuestion.id, currentAnswers.filter((a: number) => a !== index));
                    }
                  }}
                />
                <Label htmlFor={`option-${index}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </div>
        );

      case 'short-answer':
        return (
          <Textarea
            value={answer || ''}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[100px]"
          />
        );

      default:
        return null;
    }
  };

  if (!quizStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span>{sampleQuiz.title}</span>
          </CardTitle>
          <CardDescription>{sampleQuiz.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quiz Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <Target className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-semibold">{sampleQuiz.questions.length}</p>
              <p className="text-sm text-muted-foreground">Questions</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Timer className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-semibold">{formatTime(sampleQuiz.timeLimit)}</p>
              <p className="text-sm text-muted-foreground">Time Limit</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Award className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-semibold">{sampleQuiz.passingScore}%</p>
              <p className="text-sm text-muted-foreground">Passing Score</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Star className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-semibold">{sampleQuiz.difficulty}</p>
              <p className="text-sm text-muted-foreground">Difficulty</p>
            </div>
          </div>

          {/* Question Preview */}
          <div className="space-y-2">
            <h4 className="font-semibold">Question Types:</h4>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(sampleQuiz.questions.map(q => q.type))).map(type => (
                <Badge key={type} variant="outline">
                  {type.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={handleStartQuiz} className="w-full" size="lg">
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted && results) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {results.passed ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
            <span>Quiz Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Results Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`text-center p-4 rounded-lg ${results.passed ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className={`text-3xl font-bold ${results.passed ? 'text-green-600' : 'text-red-600'}`}>
                {results.percentage}%
              </p>
              <p className="text-sm text-muted-foreground">Final Score</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{results.correctAnswers}/{results.totalQuestions}</p>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{results.totalScore}</p>
              <p className="text-sm text-muted-foreground">Points Earned</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{formatTime(results.timeUsed)}</p>
              <p className="text-sm text-muted-foreground">Time Used</p>
            </div>
          </div>

          {/* Status Alert */}
          <Alert className={results.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            <AlertDescription className={results.passed ? 'text-green-700' : 'text-red-700'}>
              {results.passed 
                ? `Congratulations! You passed with ${results.percentage}%` 
                : `You scored ${results.percentage}%. You need ${sampleQuiz.passingScore}% to pass.`
              }
            </AlertDescription>
          </Alert>

          {/* Question-by-Question Results */}
          <div className="space-y-4">
            <h4 className="font-semibold">Detailed Results:</h4>
            {results.questionResults.map((result: any, index: number) => (
              <Card key={result.questionId} className={`${result.isCorrect ? 'border-green-200' : 'border-red-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Question {index + 1}</span>
                      {result.isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <Badge variant={result.isCorrect ? 'default' : 'destructive'}>
                      {result.points}/{sampleQuiz.questions[index].points} pts
                    </Badge>
                  </div>
                  <p className="mb-2">{result.question}</p>
                  <div className="text-sm text-muted-foreground mb-2">
                    <strong>Your answer:</strong> {result.userAnswer?.toString() || 'No answer'}
                  </div>
                  {!result.isCorrect && (
                    <div className="text-sm text-muted-foreground mb-2">
                      <strong>Correct answer:</strong> {result.correctAnswers.join(', ')}
                    </div>
                  )}
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>{result.explanation}</AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button onClick={() => window.location.reload()} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
            <Button variant="outline" className="flex-1">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>Question {currentQuestionIndex + 1} of {sampleQuiz.questions.length}</span>
              <Badge className={`${getDifficultyColor(currentQuestion.difficulty)} text-white`}>
                {currentQuestion.difficulty}
              </Badge>
            </CardTitle>
            <CardDescription>{currentQuestion.subject} • {currentQuestion.topic}</CardDescription>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Timer className="h-4 w-4" />
              <span>{formatTime(questionTimeRemaining)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeRemaining)} total</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <Progress value={((currentQuestionIndex + 1) / sampleQuiz.questions.length) * 100} className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
          <div className="mb-4">
            <Badge variant="outline">{currentQuestion.points} points</Badge>
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-4">
          {renderQuestion()}
        </div>

        {/* Hint Section */}
        {currentQuestion.hints && currentQuestion.hints.length > 0 && (
          <div className="space-y-2">
            {!showHint ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShowHint}
                disabled={hintIndex >= currentQuestion.hints.length}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Get Hint ({hintIndex}/{currentQuestion.hints.length})
              </Button>
            ) : (
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Hint:</strong> {currentQuestion.hints[hintIndex - 1]}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSkipQuestion}
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Skip
            </Button>
          </div>

          <Button 
            onClick={currentQuestionIndex === sampleQuiz.questions.length - 1 ? handleSubmitQuiz : handleNextQuestion}
            disabled={!answers[currentQuestion.id]}
          >
            {currentQuestionIndex === sampleQuiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}