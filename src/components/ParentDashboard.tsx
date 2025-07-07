
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  User,
  TrendingUp,
  Clock,
  Award,
  BookOpen,
  MessageCircle,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  Bell
} from "lucide-react";

export function ParentDashboard() {
  const children = [
    {
      name: "Sarah Johnson",
      grade: "Grade 10",
      avatar: "SJ",
      overallProgress: 78,
      weeklyHours: 12,
      completedLessons: 24,
      upcomingTests: 2
    },
    {
      name: "Mike Johnson",
      grade: "Grade 8",
      avatar: "MJ",
      overallProgress: 65,
      weeklyHours: 8,
      completedLessons: 18,
      upcomingTests: 1
    }
  ];

  const recentActivities = [
    { child: "Sarah", activity: "Completed Chemistry Test", score: "92%", time: "2 hours ago", status: "excellent" },
    { child: "Mike", activity: "Started Algebra Chapter 3", progress: "25%", time: "4 hours ago", status: "progress" },
    { child: "Sarah", activity: "Missed Physics lesson", time: "1 day ago", status: "warning" },
    { child: "Mike", activity: "Achievement: Problem Solver", time: "2 days ago", status: "achievement" }
  ];

  const alerts = [
    { child: "Sarah", message: "Physics test scheduled for tomorrow", type: "info" },
    { child: "Mike", message: "Low performance in Mathematics", type: "warning" }
  ];

  return (
    <div className="space-y-6">
      {/* Children Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        {children.map((child, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  {child.avatar}
                </div>
                <div>
                  <CardTitle className="text-lg">{child.name}</CardTitle>
                  <p className="text-muted-foreground">{child.grade}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{child.overallProgress}%</p>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{child.weeklyHours}h</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Progress</span>
                  <span>{child.overallProgress}%</span>
                </div>
                <Progress value={child.overallProgress} className="h-2" />
              </div>

              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {child.completedLessons} lessons completed
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {child.upcomingTests} tests upcoming
                </span>
              </div>

              <Button className="w-full" variant="outline">
                View Detailed Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 border rounded-lg">
                    <div className={`p-2 rounded-full mt-1 ${
                      activity.status === 'excellent' ? 'bg-green-100' :
                      activity.status === 'progress' ? 'bg-blue-100' :
                      activity.status === 'warning' ? 'bg-yellow-100' : 'bg-purple-100'
                    }`}>
                      {activity.status === 'excellent' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.status === 'progress' && <TrendingUp className="h-4 w-4 text-blue-600" />}
                      {activity.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                      {activity.status === 'achievement' && <Award className="h-4 w-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {activity.child}
                        </Badge>
                      </div>
                      <p className="font-medium">{activity.activity}</p>
                      {activity.score && (
                        <p className="text-sm text-green-600 font-medium">Score: {activity.score}</p>
                      )}
                      {activity.progress && (
                        <p className="text-sm text-blue-600">Progress: {activity.progress}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' : 'border-blue-200 bg-blue-50'
                }`}>
                  <div className="flex items-start space-x-2">
                    {alert.type === 'warning' ? 
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" /> :
                      <Bell className="h-4 w-4 text-blue-600 mt-0.5" />
                    }
                    <div>
                      <Badge variant="outline" className="text-xs mb-1">
                        {alert.child}
                      </Badge>
                      <p className="text-sm">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Progress Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Teachers
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Set Goals
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {children.map((child, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {child.avatar}
                  </div>
                  <span>{child.name}</span>
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mathematics</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Physics</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Chemistry</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
