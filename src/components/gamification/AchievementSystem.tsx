import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, Star, Target, Zap, BookOpen, Clock, Users, 
  Award, Flame, Crown, Medal, Gift, Lock
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'learning' | 'social' | 'streak' | 'mastery';
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
  requirement: number;
  progress: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

const achievements: Achievement[] = [
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: BookOpen,
    category: 'learning',
    difficulty: 'bronze',
    points: 10,
    requirement: 1,
    progress: 1,
    unlocked: true,
    unlockedAt: new Date()
  },
  {
    id: 'week_streak',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: Flame,
    category: 'streak',
    difficulty: 'silver',
    points: 50,
    requirement: 7,
    progress: 5,
    unlocked: false
  },
  {
    id: 'perfect_quiz',
    title: 'Perfectionist',
    description: 'Score 100% on 5 quizzes',
    icon: Target,
    category: 'mastery',
    difficulty: 'gold',
    points: 100,
    requirement: 5,
    progress: 3,
    unlocked: false
  },
  {
    id: 'social_helper',
    title: 'Community Helper',
    description: 'Help 10 students in discussions',
    icon: Users,
    category: 'social',
    difficulty: 'silver',
    points: 75,
    requirement: 10,
    progress: 7,
    unlocked: false
  },
  {
    id: 'speed_learner',
    title: 'Speed Demon',
    description: 'Complete 3 lessons in one day',
    icon: Zap,
    category: 'learning',
    difficulty: 'bronze',
    points: 25,
    requirement: 3,
    progress: 2,
    unlocked: false
  },
  {
    id: 'champion',
    title: 'Ethiopian Champion',
    description: 'Master all subjects in Ethiopian curriculum',
    icon: Crown,
    category: 'mastery',
    difficulty: 'platinum',
    points: 500,
    requirement: 12,
    progress: 8,
    unlocked: false
  }
];

export function AchievementSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [totalPoints, setTotalPoints] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(0);

  useEffect(() => {
    const points = achievements
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + a.points, 0);
    setTotalPoints(points);
    setUnlockedCount(achievements.filter(a => a.unlocked).length);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'bronze': return 'bg-amber-600';
      case 'silver': return 'bg-slate-400';
      case 'gold': return 'bg-yellow-500';
      case 'platinum': return 'bg-purple-600';
      default: return 'bg-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return BookOpen;
      case 'social': return Users;
      case 'streak': return Flame;
      case 'mastery': return Trophy;
      default: return Star;
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{unlockedCount}</p>
                <p className="text-sm text-muted-foreground">Achievements Unlocked</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/5 to-yellow-500/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPoints}</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round((unlockedCount / achievements.length) * 100)}%</p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="streak">Streak</TabsTrigger>
          <TabsTrigger value="mastery">Mastery</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement) => {
              const IconComponent = achievement.icon;
              const CategoryIcon = getCategoryIcon(achievement.category);
              const progressPercentage = Math.min((achievement.progress / achievement.requirement) * 100, 100);

              return (
                <Card 
                  key={achievement.id} 
                  className={`transition-all duration-300 hover:shadow-lg ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20' 
                      : 'opacity-75'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${achievement.unlocked ? 'bg-primary/20' : 'bg-muted'}`}>
                          {achievement.unlocked ? (
                            <IconComponent className="h-6 w-6 text-primary" />
                          ) : (
                            <Lock className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <span>{achievement.title}</span>
                            {achievement.unlocked && (
                              <Award className="h-4 w-4 text-yellow-500" />
                            )}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="secondary" 
                              className={`${getDifficultyColor(achievement.difficulty)} text-white text-xs`}
                            >
                              {achievement.difficulty.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <CategoryIcon className="h-3 w-3 mr-1" />
                              {achievement.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{achievement.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="mb-4">
                      {achievement.description}
                    </CardDescription>
                    
                    {!achievement.unlocked && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress} / {achievement.requirement}</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                    )}
                    
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="text-xs text-muted-foreground">
                        Unlocked on {achievement.unlockedAt.toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Next Achievement */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-primary" />
            <span>Next Achievement</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            const nextAchievement = achievements
              .filter(a => !a.unlocked)
              .sort((a, b) => (a.progress / a.requirement) - (b.progress / b.requirement))[0];
            
            if (!nextAchievement) {
              return <p className="text-muted-foreground">All achievements unlocked! 🎉</p>;
            }

            const IconComponent = nextAchievement.icon;
            const progressPercentage = (nextAchievement.progress / nextAchievement.requirement) * 100;

            return (
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{nextAchievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{nextAchievement.description}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{nextAchievement.progress} / {nextAchievement.requirement}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </div>
                <Badge className={`${getDifficultyColor(nextAchievement.difficulty)} text-white`}>
                  +{nextAchievement.points} pts
                </Badge>
              </div>
            );
          })()}
        </CardContent>
      </Card>
    </div>
  );
}