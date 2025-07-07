
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle, Award, Play, RotateCcw } from "lucide-react";

const PracticeTests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const tests = [
    {
      id: 1,
      title: "Mathematics Grade 9 - Algebra Basics",
      duration: 30,
      questions: 15,
      difficulty: "Medium",
      subject: "Mathematics",
      description: "Test your understanding of algebraic expressions and equations"
    },
    {
      id: 2,
      title: "Physics Grade 10 - Motion and Forces",
      duration: 45,
      questions: 20,
      difficulty: "Hard",
      subject: "Physics",
      description: "Comprehensive test on Newton's laws and kinematics"
    },
    {
      id: 3,
      title: "English Grade 8 - Grammar Fundamentals",
      duration: 25,
      questions: 12,
      difficulty: "Easy",
      subject: "English",
      description: "Basic grammar rules and sentence structure"
    }
  ];

  const sampleQuestions = [
    {
      question: "What is the solution to the equation 2x + 5 = 13?",
      options: ["x = 4", "x = 6", "x = 8", "x = 9"],
      correct: 0
    },
    {
      question: "Which of the following is a quadratic equation?",
      options: ["2x + 3 = 0", "x² + 5x + 6 = 0", "3x = 12", "x + y = 10"],
      correct: 1
    },
    {
      question: "What is the value of x in the expression 3x - 7 = 14?",
      options: ["x = 5", "x = 7", "x = 9", "x = 11"],
      correct: 1
    }
  ];

  useEffect(() => {
    if (selectedTest && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            completeTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedTest, timeRemaining]);

  const startTest = (test: any) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(test.duration * 60);
    setTestCompleted(false);
    setScore(0);
  };

  const selectAnswer = (questionIndex: number, answerIndex: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeTest = () => {
    let correctAnswers = 0;
    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      if (sampleQuestions[parseInt(questionIndex)]?.correct === parseInt(answerIndex)) {
        correctAnswers++;
      }
    });
    setScore((correctAnswers / sampleQuestions.length) * 100);
    setTestCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTest = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(0);
    setTestCompleted(false);
    setScore(0);
  };

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation
          user={user}
          onLogin={() => navigate('/auth')}
          onLogout={() => navigate('/')}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <span>Test Completed!</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-6xl font-bold text-primary">{Math.round(score)}%</div>
                <div className="space-y-2">
                  <p className="text-lg">Your Score: {Math.round(score)}%</p>
                  <p className="text-muted-foreground">
                    You answered {Object.keys(answers).length} out of {sampleQuestions.length} questions
                  </p>
                </div>
                <div className="flex space-x-4 justify-center">
                  <Button onClick={resetTest} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Take Another Test
                  </Button>
                  <Button onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (selectedTest) {
    const currentQ = sampleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        <Navigation
          user={user}
          onLogin={() => navigate('/auth')}
          onLogout={() => navigate('/')}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Test Header */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{selectedTest.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      Question {currentQuestion + 1} of {sampleQuestions.length}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
                    </div>
                    <Button onClick={completeTest} variant="outline" size="sm">
                      Submit Test
                    </Button>
                  </div>
                </div>
                <Progress value={progress} className="mt-3" />
              </CardContent>
            </Card>

            {/* Question */}
            <Card>
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg">{currentQ.question}</p>
                
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectAnswer(currentQuestion, index.toString())}
                      className={`w-full p-4 text-left border rounded-lg transition-colors ${
                        answers[currentQuestion] === index.toString()
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          answers[currentQuestion] === index.toString()
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`} />
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button 
                    onClick={previousQuestion} 
                    disabled={currentQuestion === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={nextQuestion}
                    disabled={currentQuestion === sampleQuestions.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Practice <span className="bg-gradient-hero bg-clip-text text-transparent">Tests</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Take timed practice tests to assess your knowledge and improve your performance
            </p>
          </div>

          {/* Test Selection */}
          <div className="grid gap-6">
            {tests.map((test) => (
              <Card key={test.id} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="mb-2">{test.title}</CardTitle>
                      <p className="text-muted-foreground">{test.description}</p>
                    </div>
                    <Badge variant="outline">{test.subject}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{test.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>{test.questions} questions</span>
                      </div>
                      <Badge className={`${
                        test.difficulty === 'Easy' ? 'bg-green-500' :
                        test.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {test.difficulty}
                      </Badge>
                    </div>
                    <Button onClick={() => startTest(test)}>
                      <Play className="h-4 w-4 mr-2" />
                      Start Test
                    </Button>
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

export default PracticeTests;
