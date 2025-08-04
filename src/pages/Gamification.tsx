import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AchievementSystem } from "@/components/gamification/AchievementSystem";
import { LeaderboardSystem } from "@/components/gamification/LeaderboardSystem";
import { AdvancedQuizEngine } from "@/components/enhanced/AdvancedQuizEngine";
import { Trophy, Target, Users, Brain, Star, Award } from "lucide-react";

export default function Gamification() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = () => {
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navigation user={user} onLogin={handleLogin} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Gamified Learning Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock achievements, compete with peers, and track your learning progress in an engaging, 
            game-like environment designed for Ethiopian students.
          </p>
        </div>

        <Tabs defaultValue="quiz" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="quiz" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Smart Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Challenges</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quiz" className="space-y-6">
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <span>Advanced Quiz Engine</span>
                </CardTitle>
                <CardDescription>
                  Take adaptive quizzes with multiple question types, hints, and detailed explanations
                </CardDescription>
              </CardHeader>
            </Card>
            <AdvancedQuizEngine />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-gradient-to-r from-yellow-500/5 to-orange-500/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                  <span>Achievement System</span>
                </CardTitle>
                <CardDescription>
                  Track your learning milestones and unlock badges as you progress through your studies
                </CardDescription>
              </CardHeader>
            </Card>
            <AchievementSystem />
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-gradient-to-r from-green-500/5 to-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-green-600" />
                  <span>Leaderboard & Competition</span>
                </CardTitle>
                <CardDescription>
                  See how you rank against other students in Ethiopia and compete in weekly challenges
                </CardDescription>
              </CardHeader>
            </Card>
            <LeaderboardSystem />
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-500/5 to-pink-500/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-purple-600" />
                  <span>Learning Challenges</span>
                </CardTitle>
                <CardDescription>
                  Participate in weekly and monthly challenges to boost your learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Weekly Challenge */}
                  <Card className="border-dashed border-2 border-primary/30 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span>Weekly Challenge</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-2">Math Marathon</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Complete 15 math exercises this week to earn bonus points!
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>8/15</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '53%' }}></div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">3 days left</span>
                        <span className="text-sm font-semibold text-primary">+100 pts</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Monthly Challenge */}
                  <Card className="border-dashed border-2 border-orange-500/30 hover:border-orange-500/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Award className="h-5 w-5 text-orange-500" />
                        <span>Monthly Challenge</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-2">Science Explorer</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Master 3 different science topics this month!
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>2/3</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">18 days left</span>
                        <span className="text-sm font-semibold text-orange-500">+500 pts</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Subject Challenge */}
                  <Card className="border-dashed border-2 border-green-500/30 hover:border-green-500/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Target className="h-5 w-5 text-green-500" />
                        <span>Subject Mastery</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-2">Ethiopian History Master</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Score 90%+ on 5 Ethiopian history quizzes
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>3/5</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">No time limit</span>
                        <span className="text-sm font-semibold text-green-500">+300 pts</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}