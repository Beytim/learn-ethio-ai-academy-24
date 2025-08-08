import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  Target,
  Book,
  Calendar,
  Users,
  Flame,
  Award,
  Medal,
  Gem
} from "lucide-react";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'learning' | 'streak' | 'achievement' | 'special';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgeSystemProps {
  badges: BadgeData[];
  totalXP: number;
  streak: number;
}

export function BadgeSystem({ badges, totalXP, streak }: BadgeSystemProps) {
  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-amber-600';
      case 'silver': return 'text-slate-400';
      case 'gold': return 'text-yellow-500';
      case 'platinum': return 'text-purple-500';
      default: return 'text-muted-foreground';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-slate-300';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400';
      default: return 'border-border';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return Book;
      case 'streak': return Flame;
      case 'achievement': return Trophy;
      case 'special': return Crown;
      default: return Award;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-warning" />
            <div className="text-2xl font-bold">{earnedBadges.length}</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{totalXP.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 mx-auto mb-2 text-destructive" />
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Earned Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="h-5 w-5" />
            Earned Badges ({earnedBadges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedBadges.map((badge) => {
              const IconComponent = badge.icon;
              const CategoryIcon = getCategoryIcon(badge.category);
              
              return (
                <Card 
                  key={badge.id}
                  className={`relative overflow-hidden border-2 ${getRarityBorder(badge.rarity)} bg-gradient-to-br from-card to-accent/5`}
                >
                  <CardContent className="p-4 text-center space-y-2">
                    <div className="relative">
                      <IconComponent className={`h-8 w-8 mx-auto ${getTierColor(badge.tier)}`} />
                      <CategoryIcon className="h-3 w-3 absolute -top-1 -right-1 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{badge.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {badge.description}
                      </div>
                    </div>
                    <div className="flex justify-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {badge.tier}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {badge.rarity}
                      </Badge>
                    </div>
                    {badge.earnedDate && (
                      <div className="text-xs text-muted-foreground">
                        {new Date(badge.earnedDate).toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {earnedBadges.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No badges earned yet. Keep learning to unlock your first badge!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Towards Next Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Progress Towards Next Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableBadges
              .filter(badge => badge.progress !== undefined)
              .slice(0, 4)
              .map((badge) => {
                const IconComponent = badge.icon;
                const progressPercentage = badge.maxProgress 
                  ? (badge.progress! / badge.maxProgress) * 100 
                  : 0;
                
                return (
                  <div key={badge.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`h-5 w-5 ${getTierColor(badge.tier)}`} />
                        <div>
                          <div className="font-medium">{badge.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {badge.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {badge.progress}/{badge.maxProgress}
                      </div>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Badge Categories */}
      <div className="grid md:grid-cols-2 gap-4">
        {['learning', 'streak', 'achievement', 'special'].map((category) => {
          const categoryBadges = badges.filter(badge => badge.category === category);
          const earnedInCategory = categoryBadges.filter(badge => badge.earned).length;
          const CategoryIcon = getCategoryIcon(category);
          
          return (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CategoryIcon className="h-5 w-5" />
                  {category.charAt(0).toUpperCase() + category.slice(1)} Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{earnedInCategory}/{categoryBadges.length}</span>
                  </div>
                  <Progress 
                    value={(earnedInCategory / categoryBadges.length) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}