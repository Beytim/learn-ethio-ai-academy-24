import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, Crown, Medal, TrendingUp, Users, Zap, 
  Calendar, Star, Target, BookOpen, Clock
} from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  rank: number;
  streak: number;
  lessonsCompleted: number;
  region: string;
  school?: string;
  weeklyChange: number;
  isCurrentUser?: boolean;
}

const globalLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Meron Tadesse',
    avatar: '/avatars/meron.jpg',
    points: 2850,
    rank: 1,
    streak: 28,
    lessonsCompleted: 142,
    region: 'Addis Ababa',
    school: 'International Community School',
    weeklyChange: 2,
    isCurrentUser: false
  },
  {
    id: '2',
    name: 'Dawit Kebede',
    points: 2720,
    rank: 2,
    streak: 21,
    lessonsCompleted: 128,
    region: 'Bahir Dar',
    school: 'Bahir Dar University Secondary School',
    weeklyChange: 1,
    isCurrentUser: false
  },
  {
    id: '3',
    name: 'Hanan Ahmed',
    points: 2680,
    rank: 3,
    streak: 19,
    lessonsCompleted: 135,
    region: 'Dire Dawa',
    school: 'Dire Dawa Preparatory School',
    weeklyChange: -1,
    isCurrentUser: false
  },
  {
    id: '4',
    name: 'You',
    points: 2450,
    rank: 4,
    streak: 15,
    lessonsCompleted: 118,
    region: 'Addis Ababa',
    school: 'Addis Ababa University Secondary School',
    weeklyChange: 3,
    isCurrentUser: true
  },
  {
    id: '5',
    name: 'Tigist Wolde',
    points: 2380,
    rank: 5,
    streak: 12,
    lessonsCompleted: 115,
    region: 'Mekelle',
    school: 'Mekelle High School',
    weeklyChange: 0,
    isCurrentUser: false
  }
];

const weeklyLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'You',
    points: 420,
    rank: 1,
    streak: 7,
    lessonsCompleted: 12,
    region: 'Addis Ababa',
    weeklyChange: 5,
    isCurrentUser: true
  },
  {
    id: '2',
    name: 'Kalkidan Tesfaye',
    points: 385,
    rank: 2,
    streak: 6,
    lessonsCompleted: 11,
    region: 'Hawassa',
    weeklyChange: 2,
    isCurrentUser: false
  },
  {
    id: '3',
    name: 'Samuel Girma',
    points: 360,
    rank: 3,
    streak: 5,
    lessonsCompleted: 10,
    region: 'Jimma',
    weeklyChange: -1,
    isCurrentUser: false
  }
];

const schoolLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'You',
    points: 2450,
    rank: 1,
    streak: 15,
    lessonsCompleted: 118,
    region: 'Addis Ababa',
    school: 'Addis Ababa University Secondary School',
    weeklyChange: 0,
    isCurrentUser: true
  },
  {
    id: '2',
    name: 'Bethlehem Yohannes',
    points: 2380,
    rank: 2,
    streak: 12,
    lessonsCompleted: 115,
    region: 'Addis Ababa',
    school: 'Addis Ababa University Secondary School',
    weeklyChange: 1,
    isCurrentUser: false
  },
  {
    id: '3',
    name: 'Yonas Bekele',
    points: 2290,
    rank: 3,
    streak: 18,
    lessonsCompleted: 108,
    region: 'Addis Ababa',
    school: 'Addis Ababa University Secondary School',
    weeklyChange: -1,
    isCurrentUser: false
  }
];

export function LeaderboardSystem() {
  const [selectedTab, setSelectedTab] = useState('global');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-gradient-to-r from-primary/20 to-primary/40';
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    return <TrendingUp className="h-4 w-4 text-gray-400" />;
  };

  const getCurrentLeaderboard = () => {
    switch (selectedTab) {
      case 'weekly': return weeklyLeaderboard;
      case 'school': return schoolLeaderboard;
      default: return globalLeaderboard;
    }
  };

  const currentUser = getCurrentLeaderboard().find(entry => entry.isCurrentUser);

  return (
    <div className="space-y-6">
      {/* User Stats Card */}
      {currentUser && (
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span>Your Ranking</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  {getRankIcon(currentUser.rank)}
                </div>
                <p className="text-sm text-muted-foreground">Rank</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{currentUser.points}</p>
                <p className="text-sm text-muted-foreground">Points</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{currentUser.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{currentUser.lessonsCompleted}</p>
                <p className="text-sm text-muted-foreground">Lessons</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="global" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Global</span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Weekly</span>
          </TabsTrigger>
          <TabsTrigger value="school" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>School</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {selectedTab === 'global' && 'Global Leaderboard'}
                  {selectedTab === 'weekly' && 'This Week\'s Top Performers'}
                  {selectedTab === 'school' && 'School Leaderboard'}
                </span>
                <Badge variant="outline">
                  {getCurrentLeaderboard().length} Students
                </Badge>
              </CardTitle>
              <CardDescription>
                {selectedTab === 'global' && 'Top students from across Ethiopia'}
                {selectedTab === 'weekly' && 'Most active learners this week'}
                {selectedTab === 'school' && 'Top performers in your school'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {getCurrentLeaderboard().map((entry, index) => (
                  <div 
                    key={entry.id}
                    className={`flex items-center space-x-4 p-4 hover:bg-muted/50 transition-colors ${
                      entry.isCurrentUser ? 'bg-primary/5 border-l-4 border-primary' : ''
                    }`}
                  >
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(entry.rank)}
                    </div>

                    {/* Avatar and Name */}
                    <div className="flex items-center space-x-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={entry.avatar} alt={entry.name} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {entry.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className={`font-semibold ${entry.isCurrentUser ? 'text-primary' : ''}`}>
                          {entry.name}
                          {entry.isCurrentUser && (
                            <Badge variant="secondary" className="ml-2 text-xs">You</Badge>
                          )}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{entry.region}</span>
                          {entry.school && (
                            <>
                              <span>•</span>
                              <span>{entry.school}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-primary">{entry.points}</p>
                        <p className="text-muted-foreground">Points</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center space-x-1">
                          <Zap className="h-4 w-4 text-orange-500" />
                          <span className="font-bold">{entry.streak}</span>
                        </div>
                        <p className="text-muted-foreground">Streak</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-4 w-4 text-green-500" />
                          <span className="font-bold">{entry.lessonsCompleted}</span>
                        </div>
                        <p className="text-muted-foreground">Lessons</p>
                      </div>
                    </div>

                    {/* Weekly Change */}
                    <div className="flex items-center space-x-1">
                      {getChangeIcon(entry.weeklyChange)}
                      <span className={`text-sm font-medium ${
                        entry.weeklyChange > 0 ? 'text-green-500' : 
                        entry.weeklyChange < 0 ? 'text-red-500' : 'text-gray-400'
                      }`}>
                        {Math.abs(entry.weeklyChange)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Achievement Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-yellow-500/5 to-yellow-500/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-semibold">Weekly Champion</p>
                <p className="text-sm text-muted-foreground">
                  {weeklyLeaderboard[0]?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {weeklyLeaderboard[0]?.points} points this week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 text-orange-500" />
              <div>
                <p className="font-semibold">Longest Streak</p>
                <p className="text-sm text-muted-foreground">
                  {globalLeaderboard.sort((a, b) => b.streak - a.streak)[0]?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {globalLeaderboard.sort((a, b) => b.streak - a.streak)[0]?.streak} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-semibold">Most Lessons</p>
                <p className="text-sm text-muted-foreground">
                  {globalLeaderboard.sort((a, b) => b.lessonsCompleted - a.lessonsCompleted)[0]?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {globalLeaderboard.sort((a, b) => b.lessonsCompleted - a.lessonsCompleted)[0]?.lessonsCompleted} completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}