import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Timer, 
  Target, 
  CheckCircle, 
  XCircle, 
  Brain, 
  Zap,
  TrendingUp,
  Award,
  RotateCcw
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  points: number;
}

interface AssessmentResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

interface InteractiveAssessmentProps {
  subject: string;
  topic: string;
  grade: number;
  onComplete: (result: AssessmentResult) => void;
  onClose: () => void;
}

export function InteractiveAssessment({
  subject,
  topic,
  grade,
  onComplete,
  onClose
}: InteractiveAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Ethiopian curriculum-aligned questions
  const questions: Question[] = [
    {
      id: "sets_1",
      question: "In Ethiopian Grade 9 Mathematics, if A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, what is A ∪ B?",
      options: [
        "{1, 2, 3, 4, 5, 6}",
        "{3, 4}",
        "{1, 2, 5, 6}",
        "{1, 2, 3, 4, 3, 4, 5, 6}"
      ],
      correctAnswer: 0,
      explanation: "The union (∪) of two sets contains all elements that are in either set A or set B (or both). Since A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, the union A ∪ B = {1, 2, 3, 4, 5, 6}. Note that repeated elements (3 and 4) are only listed once in the result.",
      difficulty: 'easy',
      topic: 'Set Operations',
      points: 10
    },
    {
      id: "sets_2",
      question: "If set C represents students who like Mathematics and set D represents students who like Physics, what does C ∩ D represent?",
      options: [
        "Students who like either Mathematics or Physics",
        "Students who like both Mathematics and Physics",
        "Students who like only Mathematics",
        "Students who like only Physics"
      ],
      correctAnswer: 1,
      explanation: "The intersection (∩) of two sets contains only the elements that are common to both sets. So C ∩ D represents students who like both Mathematics and Physics.",
      difficulty: 'medium',
      topic: 'Set Theory Applications',
      points: 15
    },
    {
      id: "sets_3",
      question: "In a class of 30 Ethiopian students, 18 study Amharic, 15 study English, and 8 study both languages. How many students study neither language?",
      options: [
        "5 students",
        "7 students",
        "3 students",
        "2 students"
      ],
      correctAnswer: 0,
      explanation: "Using the principle of inclusion-exclusion: |A ∪ E| = |A| + |E| - |A ∩ E| = 18 + 15 - 8 = 25. So 25 students study at least one language. Therefore, 30 - 25 = 5 students study neither language.",
      difficulty: 'hard',
      topic: 'Venn Diagrams',
      points: 20
    },
    {
      id: "sets_4",
      question: "Which of the following is the correct set-builder notation for the set {2, 4, 6, 8, 10}?",
      options: [
        "{x | x is an even number, 1 ≤ x ≤ 10}",
        "{x | x is an even number, 2 ≤ x ≤ 10}",
        "{x | x is an odd number, 1 ≤ x ≤ 10}",
        "{x | x is a prime number, 1 ≤ x ≤ 10}"
      ],
      correctAnswer: 1,
      explanation: "Set-builder notation describes the properties that elements must satisfy. The set {2, 4, 6, 8, 10} contains even numbers from 2 to 10, so the correct notation is {x | x is an even number, 2 ≤ x ≤ 10}.",
      difficulty: 'medium',
      topic: 'Set Notation',
      points: 15
    },
    {
      id: "sets_5",
      question: "If A = {a, b, c}, what is the cardinality of the power set P(A)?",
      options: [
        "3",
        "6",
        "8",
        "9"
      ],
      correctAnswer: 2,
      explanation: "The power set P(A) contains all possible subsets of A. For a set with n elements, the power set has 2^n elements. Since A has 3 elements, P(A) has 2³ = 8 elements: ∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}.",
      difficulty: 'hard',
      topic: 'Power Sets',
      points: 20
    }
  ];

  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null));
    
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (showExplanation) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(answers[currentQuestionIndex + 1]);
        setShowExplanation(false);
      } else {
        completeAssessment();
      }
    } else {
      setShowExplanation(true);
    }
  };

  const completeAssessment = () => {
    const correctAnswers = answers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    const totalPoints = questions.reduce((total, q) => total + q.points, 0);
    const earnedPoints = answers.reduce((total, answer, index) => {
      return total + (answer === questions[index].correctAnswer ? questions[index].points : 0);
    }, 0);

    const score = Math.round((earnedPoints / totalPoints) * 100);

    // Analyze strengths and weaknesses
    const topicPerformance: { [key: string]: { correct: number; total: number } } = {};
    questions.forEach((q, index) => {
      if (!topicPerformance[q.topic]) {
        topicPerformance[q.topic] = { correct: 0, total: 0 };
      }
      topicPerformance[q.topic].total++;
      if (answers[index] === q.correctAnswer) {
        topicPerformance[q.topic].correct++;
      }
    });

    const strengths = Object.entries(topicPerformance)
      .filter(([_, perf]) => perf.correct / perf.total >= 0.8)
      .map(([topic]) => topic);

    const weaknesses = Object.entries(topicPerformance)
      .filter(([_, perf]) => perf.correct / perf.total < 0.6)
      .map(([topic]) => topic);

    const recommendations = [];
    if (score >= 90) {
      recommendations.push("Excellent work! You're ready for advanced topics in set theory.");
      recommendations.push("Consider exploring complex set operations and real-world applications.");
    } else if (score >= 70) {
      recommendations.push("Good understanding! Focus on practicing more challenging problems.");
      recommendations.push("Review the topics where you made mistakes.");
    } else {
      recommendations.push("Keep practicing! Review the basic concepts of set theory.");
      recommendations.push("Work through more examples with step-by-step explanations.");
    }

    const assessmentResult: AssessmentResult = {
      score,
      totalQuestions: questions.length,
      correctAnswers,
      timeSpent,
      strengths,
      weaknesses,
      recommendations
    };

    setResult(assessmentResult);
    setIsCompleted(true);
    onComplete(assessmentResult);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: 'Excellent', variant: 'default' as const };
    if (score >= 80) return { label: 'Very Good', variant: 'secondary' as const };
    if (score >= 70) return { label: 'Good', variant: 'outline' as const };
    if (score >= 60) return { label: 'Fair', variant: 'outline' as const };
    return { label: 'Needs Improvement', variant: 'destructive' as const };
  };

  if (isCompleted && result) {
    const scoreBadge = getScoreBadge(result.score);
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center bg-gradient-primary text-primary-foreground">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 mr-3" />
            <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary-foreground/10 rounded-lg p-3">
              <div className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}%
              </div>
              <div className="text-sm opacity-90">Final Score</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-3">
              <div className="text-3xl font-bold">{result.correctAnswers}/{result.totalQuestions}</div>
              <div className="text-sm opacity-90">Correct</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-3">
              <div className="text-3xl font-bold">{formatTime(result.timeSpent)}</div>
              <div className="text-sm opacity-90">Time</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-3">
              <Badge variant={scoreBadge.variant} className="text-sm">
                {scoreBadge.label}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {result.strengths.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-success" />
                Your Strengths
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.strengths.map((strength, index) => (
                  <Badge key={index} variant="secondary" className="bg-success/10 text-success">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {result.weaknesses.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-warning" />
                Areas for Improvement
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.weaknesses.map((weakness, index) => (
                  <Badge key={index} variant="outline" className="border-warning text-warning">
                    {weakness}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-primary" />
              Recommendations
            </h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <Zap className="h-4 w-4 mr-2 mt-0.5 text-accent" />
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-3 pt-4 border-t">
            <Button onClick={() => window.location.reload()} className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Assessment
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Interactive Assessment</CardTitle>
            <p className="text-sm opacity-90">Grade {grade} {subject} - {topic}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Timer className="h-4 w-4" />
              <span className="text-sm">{formatTime(timeSpent)}</span>
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
              {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
        </div>
        <Progress value={progress} className="h-2 mt-3 bg-primary-foreground/20" />
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Question {currentQuestionIndex + 1}</h2>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <Badge variant="outline" className="text-xs">
                  {currentQuestion.difficulty}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {currentQuestion.points} pts
                </Badge>
              </div>
            </div>
            <p className="text-base mb-6 leading-relaxed">{currentQuestion.question}</p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className={`w-full justify-start text-left h-auto p-4 ${
                  showExplanation
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-success/10 border-success text-success'
                      : selectedAnswer === index && index !== currentQuestion.correctAnswer
                      ? 'bg-destructive/10 border-destructive text-destructive'
                      : ''
                    : ''
                }`}
                onClick={() => !showExplanation && handleAnswerSelect(index)}
                disabled={showExplanation}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                  {showExplanation && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="h-4 w-4 ml-auto text-success" />
                  )}
                  {showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-4 w-4 ml-auto text-destructive" />
                  )}
                </div>
              </Button>
            ))}
          </div>

          {showExplanation && (
            <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Exit Assessment
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={selectedAnswer === null && !showExplanation}
            >
              {showExplanation 
                ? currentQuestionIndex === questions.length - 1 
                  ? 'Finish Assessment' 
                  : 'Next Question'
                : 'Submit Answer'
              }
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}