
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Brain, Target, Clock, CheckCircle, BookOpen } from "lucide-react";

const Practice = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [currentProblem, setCurrentProblem] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  const subjects = [
    { id: "mathematics", name: "Mathematics", icon: "📐" },
    { id: "physics", name: "Physics", icon: "⚛️" },
    { id: "chemistry", name: "Chemistry", icon: "🧪" },
    { id: "biology", name: "Biology", icon: "🧬" },
    { id: "english", name: "English", icon: "📚" },
    { id: "history", name: "History", icon: "🏛️" }
  ];

  const difficulties = [
    { id: "easy", name: "Easy", color: "bg-green-500" },
    { id: "medium", name: "Medium", color: "bg-yellow-500" },
    { id: "hard", name: "Hard", color: "bg-red-500" }
  ];

  const sampleProblems = {
    mathematics: {
      easy: {
        question: "What is 15 + 27?",
        answer: "42",
        explanation: "Adding 15 and 27: 15 + 27 = 42"
      },
      medium: {
        question: "Solve for x: 3x + 7 = 22",
        answer: "5",
        explanation: "3x + 7 = 22, so 3x = 15, therefore x = 5"
      },
      hard: {
        question: "Find the derivative of f(x) = x³ - 4x² + 6x - 1",
        answer: "3x² - 8x + 6",
        explanation: "Using the power rule: f'(x) = 3x² - 8x + 6"
      }
    }
  };

  const generateProblem = () => {
    if (!selectedSubject || !selectedDifficulty) return;
    
    const problem = sampleProblems[selectedSubject]?.[selectedDifficulty] || {
      question: `Sample ${selectedDifficulty} ${selectedSubject} problem`,
      answer: "Sample answer",
      explanation: "This is a sample explanation."
    };
    
    setCurrentProblem(problem);
    setUserAnswer("");
    setShowResult(false);
  };

  const checkAnswer = () => {
    setShowResult(true);
  };

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
              Practice <span className="bg-gradient-hero bg-clip-text text-transparent">Problems</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Challenge yourself with AI-generated practice problems tailored to your level
            </p>
          </div>

          {/* Problem Generator */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Problem Generator</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.icon} {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty.id} value={difficulty.id}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${difficulty.color}`}></div>
                            <span>{difficulty.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    onClick={generateProblem}
                    disabled={!selectedSubject || !selectedDifficulty}
                    className="w-full bg-gradient-primary"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Generate Problem
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Problem */}
          {currentProblem && (
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Current Problem</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{selectedSubject}</Badge>
                    <Badge className={difficulties.find(d => d.id === selectedDifficulty)?.color}>
                      {selectedDifficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Question:</h3>
                    <p className="text-lg">{currentProblem.question}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Answer:</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="flex-1 px-3 py-2 border border-border rounded-md"
                        placeholder="Enter your answer..."
                      />
                      <Button onClick={checkAnswer} disabled={!userAnswer}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Check Answer
                      </Button>
                    </div>
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${
                        userAnswer.toLowerCase().trim() === currentProblem.answer.toLowerCase().trim()
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className={`h-5 w-5 ${
                            userAnswer.toLowerCase().trim() === currentProblem.answer.toLowerCase().trim()
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`} />
                          <span className="font-medium">
                            {userAnswer.toLowerCase().trim() === currentProblem.answer.toLowerCase().trim()
                              ? 'Correct!'
                              : 'Incorrect'}
                          </span>
                        </div>
                        <p><strong>Correct Answer:</strong> {currentProblem.answer}</p>
                        <p><strong>Explanation:</strong> {currentProblem.explanation}</p>
                      </div>

                      <Button onClick={generateProblem} className="w-full">
                        <Target className="h-4 w-4 mr-2" />
                        Generate New Problem
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-sm text-muted-foreground">Problems Solved</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-success/10 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">85%</p>
                    <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-warning/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2.3m</p>
                    <p className="text-sm text-muted-foreground">Avg. Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
