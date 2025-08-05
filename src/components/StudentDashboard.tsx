
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
    <div className="container mx-auto px-6 py-12 max-w-7xl space-y-12">
      {/* Welcome Section - Enhanced spacing and layout */}
      <Card className="bg-gradient-hero text-primary-foreground shadow-strong overflow-hidden">
        <CardContent className="p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-6 flex-1">
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-primary-foreground/80 text-xl">
                  Ready to continue your learning journey?
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-8 lg:gap-12">
                <div className="text-center space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold">
                    {user?.progress?.completedLessons || 12}
                  </div>
                  <div className="text-primary-foreground/70 text-sm lg:text-base">
                    Lessons Completed
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold">
                    {user?.progress?.avgScore || 85}%
                  </div>
                  <div className="text-primary-foreground/70 text-sm lg:text-base">
                    Average Score
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold">
                    {user?.progress?.totalQuizzes || 8}
                  </div>
                  <div className="text-primary-foreground/70 text-sm lg:text-base">
                    Quizzes Taken
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end space-y-6">
              <Avatar className="h-24 w-24 lg:h-28 lg:w-28 border-4 border-primary-foreground/20">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary-foreground text-primary text-3xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button 
                onClick={onOpenAITutor}
                variant="secondary" 
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3"
              >
                <Bot className="h-5 w-5 mr-3" />
                Ask AI Tutor
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid xl:grid-cols-12 gap-8">
        {/* Left Sidebar - Quick Actions & Streak */}
        <div className="xl:col-span-3 space-y-8">
          <QuickActions />
          <LearningStreak />
        </div>

        {/* Main Content - Enhanced spacing */}
        <div className="xl:col-span-6 space-y-8">
          {/* Subject Progress */}
          <Card className="shadow-medium">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <BookOpen className="h-6 w-6" />
                <span>Subject Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {subjects.map((subject, index) => (
                  <Card 
                    key={index} 
                    className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                      selectedSubject === subject.name ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : ''
                    }`}
                    onClick={() => setSelectedSubject(subject.name)}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-3xl">{subject.icon}</span>
                          <div>
                            <h3 className="font-semibold text-lg">{subject.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {subject.completedLessons}/{subject.totalLessons} lessons
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant={subject.progress >= 70 ? "default" : "secondary"}
                          className="text-sm px-3 py-1"
                        >
                          {subject.progress}%
                        </Badge>
                      </div>
                      <Progress value={subject.progress} className="h-3" />
                      <Button 
                        size="default"
                        className="w-full h-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartLesson(subject.name, user?.grade || 7);
                        }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-medium">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Clock className="h-6 w-6" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                    <div className="space-y-2">
                      <div className="font-medium text-lg">{activity.lesson}</div>
                      <div className="text-sm text-muted-foreground">{activity.subject}</div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge 
                        variant={activity.score >= 80 ? "default" : "secondary"}
                        className="text-sm px-3 py-1"
                      >
                        {activity.score}%
                      </Badge>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Performance & Achievements */}
        <div className="xl:col-span-3 space-y-8">
          <PerformanceChart />
          <StudyReminders />
          
          {/* Achievements */}
          <Card className="shadow-medium">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Award className="h-6 w-6" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      achievement.earned 
                        ? 'bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-medium' 
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-base">{achievement.title}</div>
                        <div className="text-sm opacity-75">{achievement.description}</div>
                      </div>
                    </div>
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
