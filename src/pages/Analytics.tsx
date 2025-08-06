import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target, 
  Calendar,
  BookOpen,
  Award,
  Brain,
  Zap,
  Trophy,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Analytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("week");

  const performanceData = {
    totalStudyTime: "24h 32m",
    averageAccuracy: 85,
    problemsSolved: 127,
    streakDays: 7,
    weakAreas: ["Quadratic Equations", "Chemical Bonding"],
    strongAreas: ["Linear Algebra", "Newton's Laws"],
    recentProgress: 12
  };

  const subjectPerformance = [
    { subject: "Mathematics", score: 88, progress: 75, color: "bg-blue-500" },
    { subject: "Physics", score: 82, progress: 60, color: "bg-green-500" },
    { subject: "Chemistry", score: 79, progress: 55, color: "bg-purple-500" },
    { subject: "Biology", score: 91, progress: 85, color: "bg-orange-500" },
    { subject: "English", score: 86, progress: 70, color: "bg-red-500" },
  ];

  const weeklyProgress = [
    { day: "Mon", hours: 3.5, accuracy: 82 },
    { day: "Tue", hours: 2.8, accuracy: 88 },
    { day: "Wed", hours: 4.2, accuracy: 90 },
    { day: "Thu", hours: 3.1, accuracy: 85 },
    { day: "Fri", hours: 2.9, accuracy: 87 },
    { day: "Sat", hours: 5.1, accuracy: 92 },
    { day: "Sun", hours: 4.4, accuracy: 89 },
  ];

  const achievements = [
    { id: 1, title: "Math Master", description: "Completed 100 math problems", earned: true, date: "2024-01-15" },
    { id: 2, title: "Study Streak", description: "7 days consecutive study", earned: true, date: "2024-01-20" },
    { id: 3, title: "Perfect Score", description: "Got 100% on a quiz", earned: true, date: "2024-01-18" },
    { id: 4, title: "Science Explorer", description: "Complete all physics lessons", earned: false, progress: 75 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => navigate('/auth')}
        onLogout={() => navigate('/')}
      />

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">
            Learning <span className="bg-gradient-hero bg-clip-text text-transparent">Analytics</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deep insights into your learning journey with AI-powered analytics and personalized recommendations
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold">Performance Overview</h2>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Awards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/20 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{performanceData.totalStudyTime}</p>
                      <p className="text-sm text-muted-foreground">Total Study Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500/20 p-3 rounded-full">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{performanceData.averageAccuracy}%</p>
                      <p className="text-sm text-muted-foreground">Average Accuracy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-500/20 p-3 rounded-full">
                      <Brain className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{performanceData.problemsSolved}</p>
                      <p className="text-sm text-muted-foreground">Problems Solved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-500/20 p-3 rounded-full">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{performanceData.streakDays}</p>
                      <p className="text-sm text-muted-foreground">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Weekly Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((day) => (
                    <div key={day.day} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Study Hours</span>
                          <span className="text-sm font-medium">{day.hours}h</span>
                        </div>
                        <Progress value={(day.hours / 6) * 100} className="h-2" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Accuracy</span>
                          <span className="text-sm font-medium">{day.accuracy}%</span>
                        </div>
                        <Progress value={day.accuracy} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectPerformance.map((subject) => (
                <Card key={subject.subject} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{subject.subject}</span>
                      <Badge className={`${subject.color} text-white`}>
                        {subject.score}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Course Progress</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average Score</span>
                        <span>{subject.score}%</span>
                      </div>
                      <Progress value={subject.score} className="h-2" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Strong Areas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {performanceData.strongAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">{area}</span>
                      <div className="ml-auto">
                        <Badge className="bg-green-500 text-white">Strong</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-600">
                    <AlertCircle className="h-5 w-5" />
                    <span>Areas for Improvement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {performanceData.weakAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium">{area}</span>
                      <div className="ml-auto">
                        <Button size="sm" variant="outline">
                          Practice
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`hover:shadow-lg transition-shadow ${
                  achievement.earned ? 'border-yellow-200 bg-yellow-50/50' : 'border-muted'
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-full ${
                          achievement.earned ? 'bg-yellow-100' : 'bg-muted'
                        }`}>
                          {achievement.earned ? (
                            <Trophy className="h-6 w-6 text-yellow-600" />
                          ) : (
                            <Award className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.earned ? (
                        <Badge className="bg-yellow-500 text-white">Earned</Badge>
                      ) : (
                        <Badge variant="outline">In Progress</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {achievement.earned ? (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Earned on {new Date(achievement.date!).toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;