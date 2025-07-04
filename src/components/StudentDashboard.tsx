
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Award, Clock, Play, Bot } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { QuickActions } from "./dashboard/QuickActions";
import { StudyReminders } from "./dashboard/StudyReminders";
import { PerformanceChart } from "./dashboard/PerformanceChart";
import { LearningStreak } from "./dashboard/LearningStreak";

interface StudentDashboardProps {
  onStartLesson: (subject: string, grade: number) => void;
  onOpenAITutor: () => void;
}

export function StudentDashboard({ onStartLesson, onOpenAITutor }: StudentDashboardProps) {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  const subjects = [
    { name: "Mathematics", icon: "📊", progress: 75, totalLessons: 45, completedLessons: 34 },
    { name: "Physics", icon: "⚡", progress: 60, totalLessons: 40, completedLessons: 24 },
    { name: "Chemistry", icon: "🧪", progress: 45, totalLessons: 35, completedLessons: 16 },
    { name: "Biology", icon: "🧬", progress: 80, totalLessons: 38, completedLessons: 30 },
    { name: "English", icon: "📚", progress: 90, totalLessons: 42, completedLessons: 38 },
    { name: "Geography", icon: "🌍", progress: 55, totalLessons: 32, completedLessons: 18 }
  ];

  const recentActivities = [
    { subject: "Mathematics", lesson: "Sets and Relations", score: 92, time: "2 hours ago" },
    { subject: "Physics", lesson: "Motion and Forces", score: 88, time: "1 day ago" },
    { subject: "Chemistry", lesson: "Atomic Structure", score: 85, time: "2 days ago" },
    { subject: "Mathematics", lesson: "Number Systems", score: 95, time: "3 days ago" }
  ];

  const achievements = [
    { title: "Quiz Master", description: "Completed 50 quizzes", icon: "🏆", earned: true },
    { title: "Math Genius", description: "100% in 5 consecutive math tests", icon: "🧮", earned: true },
    { title: "Study Streak", description: "7 days in a row", icon: "🔥", earned: true },
    { title: "Perfect Score", description: "Get 100% on any quiz", icon: "⭐", earned: false },
    { title: "Speed Learner", description: "Complete 10 lessons in a week", icon: "⚡", earned: false },
    { title: "Helper", description: "Help 5 classmates", icon: "🤝", earned: false }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <Card className="bg-gradient-hero text-primary-foreground shadow-strong">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
                <p className="text-primary-foreground/80 text-lg">Ready to continue your learning journey?</p>
              </div>
              
              <div className="flex space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold">{user?.progress?.completedLessons || 12}</div>
                  <div className="text-primary-foreground/70">Lessons Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user?.progress?.avgScore || 85}%</div>
                  <div className="text-primary-foreground/70">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user?.progress?.totalQuizzes || 8}</div>
                  <div className="text-primary-foreground/70">Quizzes Taken</div>
                </div>
              </div>
            </div>

            <div className="text-right space-y-4">
              <Avatar className="h-20 w-20 border-4 border-primary-foreground/20 ml-auto">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary-foreground text-primary text-2xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button 
                onClick={onOpenAITutor}
                variant="secondary" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Bot className="h-4 w-4 mr-2" />
                Ask AI Tutor
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Quick Actions & Streak */}
        <div className="lg:col-span-1 space-y-6">
          <QuickActions 
            onStartLesson={onStartLesson} 
            onOpenAITutor={onOpenAITutor}
            userGrade={user?.grade || 7}
          />
          <LearningStreak />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subject Progress */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Subject Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {subjects.map((subject, index) => (
                  <Card 
                    key={index} 
                    className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-medium ${
                      selectedSubject === subject.name ? 'ring-2 ring-primary shadow-medium' : ''
                    }`}
                    onClick={() => setSelectedSubject(subject.name)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{subject.icon}</span>
                          <div>
                            <h3 className="font-semibold">{subject.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {subject.completedLessons}/{subject.totalLessons} lessons
                            </p>
                          </div>
                        </div>
                        <Badge variant={subject.progress >= 70 ? "default" : "secondary"}>
                          {subject.progress}%
                        </Badge>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartLesson(subject.name, user?.grade || 7);
                        }}
                      >
                        <Play className="h-3 w-3 mr-2" />
                        Continue
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{activity.lesson}</div>
                      <div className="text-sm text-muted-foreground">{activity.subject}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant={activity.score >= 80 ? "default" : "secondary"}>
                        {activity.score}%
                      </Badge>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <PerformanceChart />
          <StudyReminders />
          
          {/* Achievements */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg text-center space-y-1 ${
                      achievement.earned 
                        ? 'bg-gradient-primary text-primary-foreground shadow-soft' 
                        : 'bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="text-xs font-medium">{achievement.title}</div>
                    <div className="text-xs opacity-75">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
