import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnergySystem } from "@/components/gamification/EnergySystem";
import { BadgeSystem } from "@/components/gamification/BadgeSystem";
import { SkillTree } from "@/components/gamification/SkillTree";
import { AchievementSystem } from "@/components/gamification/AchievementSystem";
import { LeaderboardSystem } from "@/components/gamification/LeaderboardSystem";
import { PersonalizedDashboard } from "@/components/learning/PersonalizedDashboard";
import { AdvancedQuizEngine } from "@/components/enhanced/AdvancedQuizEngine";
import { 
  Trophy, 
  Target, 
  Users, 
  Brain, 
  Star, 
  Award,
  Zap,
  Crown,
  TrendingUp,
  BookOpen
} from "lucide-react";

export default function Gamification() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userEnergy, setUserEnergy] = useState(75);
  const [userLevel, setUserLevel] = useState(8);
  const [userXP, setUserXP] = useState(2450);
  const [userStreak, setUserStreak] = useState(5);

  const handleLogin = () => {
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Sample badge data
  const sampleBadges = [
    {
      id: 'first-lesson',
      name: 'First Steps',
      description: 'Complete your first lesson',
      icon: BookOpen,
      category: 'learning' as const,
      tier: 'bronze' as const,
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'common' as const
    },
    {
      id: 'streak-7',
      name: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: Star,
      category: 'streak' as const,
      tier: 'silver' as const,
      earned: false,
      progress: 5,
      maxProgress: 7,
      rarity: 'rare' as const
    },
    {
      id: 'math-master',
      name: 'Math Master',
      description: 'Complete 50 math exercises',
      icon: Target,
      category: 'achievement' as const,
      tier: 'gold' as const,
      earned: false,
      progress: 23,
      maxProgress: 50,
      rarity: 'epic' as const
    },
    {
      id: 'perfect-score',
      name: 'Perfect Score',
      description: 'Get 100% on 10 consecutive quizzes',
      icon: Crown,
      category: 'special' as const,
      tier: 'platinum' as const,
      earned: false,
      progress: 3,
      maxProgress: 10,
      rarity: 'legendary' as const
    }
  ];

  const handleActivitySelect = (activity: any) => {
    console.log('Selected activity:', activity);
    // Navigate to activity or show activity modal
  };

  const handleSkillSelect = (skill: any) => {
    console.log('Selected skill:', skill);
    // Navigate to skill practice
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navigation user={user} onLogin={handleLogin} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10 text-primary" />
            Learning Adventures
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Level up your learning with Khan Academy-style gamification for Ethiopian students
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="energy" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden md:inline">Energy</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden md:inline">Badges</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden md:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden md:inline">Achievements</span>
            </TabsTrigger>
          </TabsList>

          {/* Personalized Dashboard */}
          <TabsContent value="dashboard">
            <PersonalizedDashboard
              userName={user?.email?.split('@')[0] || "Student"}
              level={userLevel}
              xp={userXP}
              energy={userEnergy}
              streak={userStreak}
              onActivitySelect={handleActivitySelect}
            />
          </TabsContent>

          {/* Energy System */}
          <TabsContent value="energy">
            <div className="max-w-lg mx-auto">
              <EnergySystem
                currentEnergy={userEnergy}
                maxEnergy={100}
                onEnergyChange={setUserEnergy}
              />
            </div>
          </TabsContent>

          {/* Badge System */}
          <TabsContent value="badges">
            <BadgeSystem
              badges={sampleBadges}
              totalXP={userXP}
              streak={userStreak}
            />
          </TabsContent>

          {/* Skill Tree */}
          <TabsContent value="skills">
            <SkillTree
              subject="Mathematics"
              userLevel={userLevel}
              userEnergy={userEnergy}
              onSkillSelect={handleSkillSelect}
            />
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements">
            <AchievementSystem />
          </TabsContent>

          {/* Leaderboard */}
          <TabsContent value="leaderboard">
            <LeaderboardSystem />
          </TabsContent>

          {/* Quick Stats Footer */}
          <div className="mt-8">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Your Learning Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="space-y-2">
                    <Star className="h-8 w-8 mx-auto text-primary" />
                    <div className="text-2xl font-bold">{userXP.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total XP</div>
                  </div>
                  <div className="space-y-2">
                    <Zap className="h-8 w-8 mx-auto text-warning" />
                    <div className="text-2xl font-bold">{userEnergy}/100</div>
                    <div className="text-sm text-muted-foreground">Energy</div>
                  </div>
                  <div className="space-y-2">
                    <Trophy className="h-8 w-8 mx-auto text-success" />
                    <div className="text-2xl font-bold">{userStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="space-y-2">
                    <Crown className="h-8 w-8 mx-auto text-accent" />
                    <div className="text-2xl font-bold">Level {userLevel}</div>
                    <div className="text-sm text-muted-foreground">Current Level</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </main>
    </div>
  );
}