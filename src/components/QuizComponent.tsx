import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Clock, Award } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizComponentProps {
  title: string;
  subject: string;
  topic: string;
  onComplete?: (score: number, totalQuestions: number) => void;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'What is a set in mathematics?',
    options: [
      'A collection of distinct objects',
      'A mathematical equation',
      'A type of number',
      'A geometric shape'
    ],
    correctAnswer: 0,
    explanation: 'A set is a collection of distinct objects, considered as an object in its own right.',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: 'If A = {1, 2, 3} and B = {3, 4, 5}, what is A ∪ B?',
    options: [
      '{3}',
      '{1, 2, 3, 4, 5}',
      '{1, 2, 4, 5}',
      '{1, 2, 3, 3, 4, 5}'
    ],
    correctAnswer: 1,
    explanation: 'The union A ∪ B contains all elements that are in either A or B, without repetition.',
    difficulty: 'medium'
  },
  {
    id: '3',
    question: 'If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, what is A ∩ B?',
    options: [
      '{1, 2, 5, 6}',
      '{1, 2, 3, 4, 5, 6}',
      '{3, 4}',
      'Empty set'
    ],
    correctAnswer: 2,
    explanation: 'The intersection A ∩ B contains only elements that are in both A and B.',
    difficulty: 'medium'
  },
  {
    id: '4',
    question: 'Which of the following represents the empty set?',
    options: [
      '{0}',
      '{}',
      '{∅}',
      'Both {} and ∅'
    ],
    correctAnswer: 3,
    explanation: 'The empty set can be written as {} or ∅. Note that {0} contains the element 0, so it\'s not empty.',
    difficulty: 'hard'
  }
];

export function QuizComponent({ title, subject, topic, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizStarted, showResults]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === sampleQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    onComplete?.(score, sampleQuestions.length);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'hard': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  if (!quizStarted) {
    return (
      <Card className="max-w-2xl mx-auto shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <div className="flex justify-center space-x-2">
            <Badge variant="secondary">{subject}</Badge>
            <Badge variant="outline">{topic}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-gradient-primary p-4 rounded-xl w-fit mx-auto">
              <Award className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Quiz Instructions</h3>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• {sampleQuestions.length} multiple choice questions</li>
                <li>• 5 minutes time limit</li>
                <li>• You can review and change answers before submitting</li>
                <li>• Passing score: 70%</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={() => setQuizStarted(true)}
              className="bg-gradient-primary hover:shadow-medium transition-all duration-300 px-8"
            >
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === sampleQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / sampleQuestions.length) * 100);

    return (
      <Card className="max-w-2xl mx-auto shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`text-6xl font-bold ${getScoreColor(score, sampleQuestions.length)}`}>
              {percentage}%
            </div>
            <div className="text-lg">
              You scored {score} out of {sampleQuestions.length} questions correctly
            </div>
            
            {percentage >= 70 ? (
              <Alert className="bg-success/10 border-success/20">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="text-success">
                  Congratulations! You passed the quiz.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-destructive/10 border-destructive/20">
                <XCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">
                  Keep studying! You need 70% to pass.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Review Your Answers:</h3>
            {sampleQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <Card key={question.id} className={`p-4 ${isCorrect ? 'border-success/50' : 'border-destructive/50'}`}>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{question.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your answer: {question.options[userAnswer]} 
                          {!isCorrect && (
                            <span className="text-destructive ml-2">
                              (Correct: {question.options[question.correctAnswer]})
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={() => window.location.reload()} variant="outline">
              Retake Quiz
            </Button>
            <Button className="bg-gradient-primary">
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  return (
    <Card className="max-w-2xl mx-auto shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">Question {currentQuestion + 1} of {sampleQuestions.length}</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className={`${getDifficultyColor(question.difficulty)} text-white`}>
                {question.difficulty}
              </Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                className="w-full text-left justify-start h-auto p-4 hover:shadow-soft transition-all duration-300"
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {currentQuestion === sampleQuestions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                className="bg-gradient-primary"
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}