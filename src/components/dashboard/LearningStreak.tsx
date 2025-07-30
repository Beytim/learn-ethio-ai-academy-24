import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Flame, Calendar, Star, Award, Target } from 'lucide-react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

const mockStreakData: StreakData = {
  currentStreak: 7,
  longestStreak: 12,
  weeklyGoal: 5,
  weeklyProgress: 4,
  achievements: [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: 'star',
      earned: true,
      earnedDate: '2024-01-01'
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Study for 7 days straight',
      icon: 'flame',
      earned: true,
      earnedDate: '2024-01-07'
    },
    {
      id: '3',
      title: 'Math Master',
      description: 'Complete all Grade 9 Math units',
      icon: 'award',
      earned: false
    },
    {
      id: '4',
      title: 'Perfect Score',
      description: 'Get 100% on 5 quizzes',
      icon: 'target',
      earned: false
    }
  ]
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const currentWeekProgress = [true, true, true, true, false, false, false]; // Example progress

export function LearningStreak() {
  const { currentStreak, longestStreak, weeklyGoal, weeklyProgress, achievements } = mockStreakData;
  const progressPercentage = (weeklyProgress / weeklyGoal) * 100;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'star': return <Star className="h-6 w-6" />;
      case 'flame': return <Flame className="h-6 w-6" />;
      case 'award': return <Award className="h-6 w-6" />;
      case 'target': return <Target className="h-6 w-6" />;
      default: return <Star className="h-6 w-6" />;
    }
  };

  return (
    <div className="grid gap-6">
      {/* Streak Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-3xl font-bold text-orange-500">{currentStreak}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
              <Flame className="h-12 w-12 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
                <p className="text-3xl font-bold text-blue-500">{longestStreak}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
              <Award className="h-12 w-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Goal</p>
                <p className="text-3xl font-bold text-green-500">{weeklyProgress}/{weeklyGoal}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
              <Target className="h-12 w-12 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Weekly Goal Progress</span>
              <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            
            <div className="grid grid-cols-7 gap-2 mt-4">
              {weekDays.map((day, index) => (
                <div key={day} className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">{day}</p>
                  <div 
                    className={`h-8 w-8 mx-auto rounded-full border-2 flex items-center justify-center ${
                      currentWeekProgress[index] 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-muted bg-muted/50'
                    }`}
                  >
                    {currentWeekProgress[index] && <Flame className="h-4 w-4" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  achievement.earned 
                    ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <div className={`${achievement.earned ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {getIcon(achievement.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    {achievement.earned && <Badge variant="secondary" className="text-xs">Earned</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.earned && achievement.earnedDate && (
                    <p className="text-xs text-green-600 mt-1">
                      Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}