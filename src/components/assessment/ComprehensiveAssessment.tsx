import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Award,
  RotateCcw,
  BookOpen,
  Calculator,
  Lightbulb,
  TrendingUp,
  Brain
} from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay' | 'calculation';
  question: string;
  questionAmharic: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  explanationAmharic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  topic: string;
  estimatedTime: number;
  hints?: string[];
}

interface AssessmentResults {
  score: number;
  totalPoints: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

interface ComprehensiveAssessmentProps {
  subjectId: string;
  unitId?: string;
  lessonId?: string;
  assessmentType: 'diagnostic' | 'formative' | 'summative' | 'practice';
  onComplete: (results: AssessmentResults) => void;
  onClose: () => void;
}

const sampleQuestions: Question[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    question: 'What is the solution to the equation 2x + 5 = 13?',
    questionAmharic: '2x + 5 = 13 የሚለው እኩልታ መፍትሄ ምንድን ነው?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctAnswer: 'x = 4',
    explanation: 'To solve 2x + 5 = 13, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4',
    explanationAmharic: '2x + 5 = 13 ን ለመፍታት ከሁለቱም ጎኖች 5 ን መቀነስ: 2x = 8፣ ከዚያም በ2 መካፈል: x = 4',
    difficulty: 'medium',
    points: 10,
    topic: 'Linear Equations',
    estimatedTime: 120,
    hints: ['Start by isolating the variable term', 'What operation cancels addition?']
  },
  {
    id: 'q2',
    type: 'true-false',
    question: 'The square root of 16 is 4.',
    questionAmharic: 'የ16 ካሬ ሥር 4 ነው።',
    correctAnswer: 'true',
    explanation: '√16 = 4 because 4² = 16',
    explanationAmharic: '√16 = 4 ምክንያቱም 4² = 16',
    difficulty: 'easy',
    points: 5,
    topic: 'Square Roots',
    estimatedTime: 60
  },
  {
    id: 'q3',
    type: 'calculation',
    question: 'Calculate the area of a rectangle with length 8 cm and width 6 cm.',
    questionAmharic: 'ርዝመቱ 8 ሴ.ሜ እና ስፋቱ 6 ሴ.ሜ የሆነ አራት ማዕዘን ስፋት ያስሉ።',
    correctAnswer: 48,
    explanation: 'Area of rectangle = length × width = 8 × 6 = 48 cm²',
    explanationAmharic: 'የአራት ማዕዘን ስፋት = ርዝመት × ስፋት = 8 × 6 = 48 ሴ.ሜ²',
    difficulty: 'easy',
    points: 8,
    topic: 'Geometry',
    estimatedTime: 90
  }
];

export function ComprehensiveAssessment({ 
  subjectId, 
  unitId, 
  lessonId, 
  assessmentType, 
  onComplete, 
  onClose 
}: ComprehensiveAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [startTime] = useState(Date.now());

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === sampleQuestions.length - 1;
  const hasAnswered = answers[currentQuestion?.id] !== undefined;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const calculateResults = (): AssessmentResults => {
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    const topicPerformance: Record<string, { correct: number; total: number }> = {};

    sampleQuestions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      const isCorrect = question.type === 'true-false' 
        ? userAnswer === question.correctAnswer
        : userAnswer === question.correctAnswer;

      if (isCorrect) {
        correctAnswers++;
        earnedPoints += question.points;
      }

      // Track topic performance
      if (!topicPerformance[question.topic]) {
        topicPerformance[question.topic] = { correct: 0, total: 0 };
      }
      topicPerformance[question.topic].total++;
      if (isCorrect) topicPerformance[question.topic].correct++;
    });

    const percentage = Math.round((earnedPoints / totalPoints) * 100);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    // Determine strengths and weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    Object.entries(topicPerformance).forEach(([topic, performance]) => {
      const accuracy = performance.correct / performance.total;
      if (accuracy >= 0.8) {
        strengths.push(topic);
      } else if (accuracy < 0.6) {
        weaknesses.push(topic);
      }
    });

    // Generate recommendations
    const recommendations: string[] = [];
    if (percentage >= 90) {
      recommendations.push('Excellent work! Consider advancing to more challenging topics.');
    } else if (percentage >= 70) {
      recommendations.push('Good performance! Review areas of weakness for improvement.');
    } else {
      recommendations.push('Focus on fundamental concepts and practice more problems.');
    }

    weaknesses.forEach(topic => {
      recommendations.push(`Review ${topic} concepts and practice additional problems.`);
    });

    return {
      score: earnedPoints,
      totalPoints,
      percentage,
      correctAnswers,
      totalQuestions: sampleQuestions.length,
      timeSpent,
      strengths,
      weaknesses,
      recommendations
    };
  };

  const handleSubmit = () => {
    const assessmentResults = calculateResults();
    setResults(assessmentResults);
    setIsSubmitted(true);
    onComplete(assessmentResults);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'true-false':
        return (
          <RadioGroup
            value={answers[currentQuestion.id]?.toString() || ''}
            onValueChange={(value) => handleAnswerChange(value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="true" />
              <Label htmlFor="true" className="cursor-pointer">True / እውነት</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="false" />
              <Label htmlFor="false" className="cursor-pointer">False / ሐሰት</Label>
            </div>
          </RadioGroup>
        );

      case 'short-answer':
      case 'calculation':
        return (
          <Textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Enter your answer here..."
            className="min-h-[100px]"
          />
        );

      case 'essay':
        return (
          <Textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Write your detailed answer here..."
            className="min-h-[200px]"
          />
        );

      default:
        return null;
    }
  };

  if (isSubmitted && results) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {results.percentage}%
                </div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {results.correctAnswers}/{results.totalQuestions}
                </div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatTime(results.timeSpent)}
                </div>
                <div className="text-sm text-muted-foreground">Time Spent</div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            {results.strengths.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {results.strengths.map((strength, index) => (
                      <Badge key={index} variant="secondary" className="mr-2">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Areas for Improvement */}
            {results.weaknesses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <AlertCircle className="h-5 w-5" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {results.weaknesses.map((weakness, index) => (
                      <Badge key={index} variant="outline" className="mr-2">
                        {weakness}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.reload()}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Assessment
            </Button>
            <Button variant="outline" onClick={onClose}>
              <BookOpen className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Assessment Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6" />
                {assessmentType.charAt(0).toUpperCase() + assessmentType.slice(1)} Assessment
              </CardTitle>
              <p className="text-muted-foreground">
                Question {currentQuestionIndex + 1} of {sampleQuestions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeRemaining)}</span>
              </div>
              <Badge variant={timeRemaining < 300 ? 'destructive' : 'secondary'}>
                {timeRemaining < 300 ? 'Hurry Up!' : 'Time Remaining'}
              </Badge>
            </div>
          </div>
          <Progress 
            value={((currentQuestionIndex + 1) / sampleQuestions.length) * 100} 
            className="h-2"
          />
        </CardHeader>
      </Card>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{currentQuestion?.difficulty}</Badge>
                <Badge variant="secondary">{currentQuestion?.topic}</Badge>
                <span className="text-sm text-muted-foreground">
                  {currentQuestion?.points} points
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{currentQuestion?.question}</h3>
              <p className="text-muted-foreground">{currentQuestion?.questionAmharic}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderQuestion()}

          {/* Hints */}
          {currentQuestion?.hints && (
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                  Hints
                </h4>
                <ul className="text-sm space-y-1">
                  {currentQuestion.hints.map((hint, index) => (
                    <li key={index} className="text-blue-700">• {hint}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Explanation (shown after answering) */}
          {showExplanation && hasAnswered && (
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Explanation
                </h4>
                <p className="text-sm mb-2">{currentQuestion.explanation}</p>
                <p className="text-sm text-muted-foreground">{currentQuestion.explanationAmharic}</p>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {hasAnswered && !showExplanation && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowExplanation(true)}
                >
                  Show Explanation
                </Button>
              )}
              
              <Button 
                onClick={handleNext}
                disabled={!hasAnswered}
              >
                {isLastQuestion ? 'Submit Assessment' : 'Next Question'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}