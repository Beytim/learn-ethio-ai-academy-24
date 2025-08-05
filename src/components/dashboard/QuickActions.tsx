import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  BookOpen, 
  PenTool, 
  MessageCircle, 
  Calendar, 
  Target,
  Clock,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  variant: 'default' | 'secondary' | 'outline';
  badge?: string;
}

interface RecentActivity {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'practice';
  progress: number;
  timeAgo: string;
  subject: string;
}

const mockRecentActivities: RecentActivity[] = [
  {
    id: '1',
    title: 'Algebraic Expressions',
    type: 'lesson',
    progress: 75,
    timeAgo: '2 hours ago',
    subject: 'Mathematics'
  },
  {
    id: '2',
    title: 'Chemical Bonding Quiz',
    type: 'quiz',
    progress: 100,
    timeAgo: '1 day ago',
    subject: 'Chemistry'
  },
  {
    id: '3',
    title: 'Essay Writing Practice',
    type: 'practice',
    progress: 60,
    timeAgo: '2 days ago',
    subject: 'English'
  }
];

export function QuickActions() {
  const navigate = useNavigate();

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Continue Learning',
      description: 'Resume your last lesson',
      icon: <Play className="h-5 w-5" />,
      action: () => navigate('/lessons'),
      variant: 'default',
      badge: 'In Progress'
    },
    {
      id: '2',
      title: 'Practice Test',
      description: 'Take a quick assessment',
      icon: <PenTool className="h-5 w-5" />,
      action: () => navigate('/practice-tests'),
      variant: 'secondary'
    },
    {
      id: '3',
      title: 'Ask AI Tutor',
      description: 'Get help with any topic',
      icon: <MessageCircle className="h-5 w-5" />,
      action: () => {
        // Open AI chat modal or navigate to chat
        console.log('Opening AI tutor chat');
      },
      variant: 'outline',
      badge: 'New'
    },
    {
      id: '4',
      title: 'Study Planner',
      description: 'Plan your study schedule',
      icon: <Calendar className="h-5 w-5" />,
      action: () => navigate('/study-planner'),
      variant: 'outline'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <PenTool className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'text-blue-600';
      case 'quiz': return 'text-green-600';
      case 'practice': return 'text-orange-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="grid gap-8">
      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">
            <TrendingUp className="h-6 w-6" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-1 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                onClick={action.action}
                className="h-auto p-5 justify-start flex-col items-start space-y-3 relative hover:scale-[1.02] transition-all duration-300"
              >
                {action.badge && (
                  <Badge variant="secondary" className="absolute top-3 right-3 text-xs">
                    {action.badge}
                  </Badge>
                )}
                <div className="flex items-center gap-3 w-full">
                  {action.icon}
                  <span className="font-semibold text-base">{action.title}</span>
                </div>
                <p className="text-sm text-muted-foreground text-left leading-relaxed">
                  {action.description}
                </p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Clock className="h-6 w-6" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-4">
            {mockRecentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 hover:shadow-sm transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/lessons')}
              >
                <div className="flex items-center gap-4">
                  <div className={`${getActivityColor(activity.type)} p-2 rounded-lg bg-muted/50`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-base">{activity.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{activity.subject}</span>
                      <span>•</span>
                      <span>{activity.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right min-w-0 flex-shrink-0">
                  <p className="text-base font-medium">{activity.progress}%</p>
                  <div className="w-24 mt-2">
                    <Progress value={activity.progress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Goals */}
      <Card>
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Target className="h-6 w-6" />
            Today's Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="text-base font-medium">Complete 2 lessons</span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={50} className="flex-1 h-3" />
                <span className="text-sm text-muted-foreground font-medium">1/2</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <PenTool className="h-5 w-5 text-green-600" />
                <span className="text-base font-medium">Take 1 practice test</span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={0} className="flex-1 h-3" />
                <span className="text-sm text-muted-foreground font-medium">0/1</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <span className="text-base font-medium">Study for 1 hour</span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={75} className="flex-1 h-3" />
                <span className="text-sm text-muted-foreground font-medium">45min</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study Groups */}
      <Card>
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Users className="h-6 w-6" />
            Study Groups
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <h4 className="font-semibold text-base">Grade 9 Mathematics</h4>
                <p className="text-sm text-muted-foreground">12 members • Next session in 2h</p>
              </div>
              <Button variant="outline" size="default">
                Join
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <h4 className="font-semibold text-base">Chemistry Study Circle</h4>
                <p className="text-sm text-muted-foreground">8 members • Active now</p>
              </div>
              <Button variant="outline" size="default">
                Join
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}