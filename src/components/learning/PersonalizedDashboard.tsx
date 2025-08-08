import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Clock,
  Zap,
  Star,
  Trophy,
  Calendar,
  ArrowRight,
  PlayCircle,
  PenTool,
  CheckCircle
} from "lucide-react";

interface LearningActivity {
  id: string;
  type: 'lesson' | 'practice' | 'quiz' | 'video';
  title: string;
  subject: string;
  progress: number;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  energyCost: number;
}

interface PersonalizedDashboardProps {
  userName: string;
  level: number;
  xp: number;
  energy: number;
  streak: number;
  onActivitySelect: (activity: LearningActivity) => void;
}

export function PersonalizedDashboard({ 
  userName, 
  level, 
  xp, 
  energy, 
  streak, 
  onActivitySelect 
}: PersonalizedDashboardProps) {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const recommendedActivities: LearningActivity[] = [
    {
      id: 'math-fractions',
      type: 'lesson',
      title: 'Introduction to Fractions',
      subject: 'Mathematics',
      progress: 0,
      timeSpent: 0,
      difficulty: 'medium',
      xpReward: 50,
      energyCost: 15
    },
    {
      id: 'english-reading',
      type: 'practice',
      title: 'Reading Comprehension',
      subject: 'English',
      progress: 30,
      timeSpent: 12,
      difficulty: 'easy',
      xpReward: 30,
      energyCost: 10
    },
    {
      id: 'science-plants',
      type: 'video',
      title: 'How Plants Grow',
      subject: 'Science',
      progress: 0,
      timeSpent: 0,
      difficulty: 'easy',
      xpReward: 25,
      energyCost: 8
    },
    {
      id: 'math-quiz',
      type: 'quiz',
      title: 'Multiplication Tables Quiz',
      subject: 'Mathematics',
      progress: 0,
      timeSpent: 0,
      difficulty: 'medium',
      xpReward: 40,
      energyCost: 12
    }
  ];

  const todaysGoals = [
    { id: 'lessons', target: 3, completed: 1, label: 'Complete Lessons' },
    { id: 'minutes', target: 60, completed: 25, label: 'Study Minutes' },
    { id: 'streak', target: 1, completed: 1, label: 'Maintain Streak' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson': return BookOpen;
      case 'practice': return PenTool;
      case 'quiz': return Target;
      case 'video': return PlayCircle;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <div>
          <h1 className="text-3xl font-bold">
            {getGreeting()}, {userName}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 mx-auto mb-1 text-primary" />
              <div className="text-xl font-bold">Level {level}</div>
              <div className="text-xs text-muted-foreground">{xp} XP</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 mx-auto mb-1 text-warning" />
              <div className="text-xl font-bold">{energy}/100</div>
              <div className="text-xs text-muted-foreground">Energy</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 mx-auto mb-1 text-success" />
              <div className="text-xl font-bold">{streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 mx-auto mb-1 text-accent" />
              <div className="text-xl font-bold">5</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Today's Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Today's Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {todaysGoals.map((goal) => {
            const percentage = Math.min((goal.completed / goal.target) * 100, 100);
            const isComplete = goal.completed >= goal.target;
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isComplete && <CheckCircle className="h-4 w-4 text-success" />}
                    <span className="font-medium">{goal.label}</span>
                  </div>
                  <Badge variant={isComplete ? "default" : "outline"}>
                    {goal.completed}/{goal.target}
                  </Badge>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recommended For You */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recommended For You
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendedActivities.map((activity) => {
            const IconComponent = getActivityIcon(activity.type);
            const canAfford = energy >= activity.energyCost;
            
            return (
              <Card 
                key={activity.id}
                className={`transition-all duration-200 cursor-pointer border ${
                  canAfford ? 'hover:shadow-medium' : 'opacity-60'
                }`}
                onClick={() => canAfford && onActivitySelect(activity)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <span>{activity.subject}</span>
                          <Badge 
                            variant="outline" 
                            className={getDifficultyColor(activity.difficulty)}
                          >
                            {activity.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right text-sm">
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          <span>{activity.energyCost}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>{activity.xpReward}</span>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm"
                        disabled={!canAfford}
                      >
                        {activity.progress > 0 ? 'Continue' : 'Start'}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                  
                  {activity.progress > 0 && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{activity.progress}%</span>
                      </div>
                      <Progress value={activity.progress} className="h-1" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-medium transition-shadow">
          <CardContent className="p-6 text-center space-y-2">
            <Target className="h-8 w-8 mx-auto text-primary" />
            <h3 className="font-semibold">Practice Mode</h3>
            <p className="text-sm text-muted-foreground">
              Quick practice sessions
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-medium transition-shadow">
          <CardContent className="p-6 text-center space-y-2">
            <PlayCircle className="h-8 w-8 mx-auto text-success" />
            <h3 className="font-semibold">Video Lessons</h3>
            <p className="text-sm text-muted-foreground">
              Interactive video content
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-medium transition-shadow">
          <CardContent className="p-6 text-center space-y-2">
            <Trophy className="h-8 w-8 mx-auto text-warning" />
            <h3 className="font-semibold">Mastery Map</h3>
            <p className="text-sm text-muted-foreground">
              Track your progress
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}