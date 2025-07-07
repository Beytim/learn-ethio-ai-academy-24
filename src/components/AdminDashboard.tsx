
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  TrendingUp,
  Server,
  Shield,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Database,
  Activity,
  UserCheck,
  FileText,
  Zap
} from "lucide-react";

export function AdminDashboard() {
  const systemStats = [
    { label: "Total Users", value: "12,453", change: "+5.2%", trend: "up" },
    { label: "Active Courses", value: "247", change: "+12", trend: "up" },
    { label: "Content Items", value: "3,891", change: "+45", trend: "up" },
    { label: "System Load", value: "73%", change: "-2%", trend: "down" }
  ];

  const recentActivities = [
    { type: "user", message: "125 new user registrations", time: "2 hours ago", status: "info" },
    { type: "content", message: "15 new lessons published", time: "4 hours ago", status: "success" },
    { type: "system", message: "Database backup completed", time: "6 hours ago", status: "success" },
    { type: "alert", message: "High server load detected", time: "8 hours ago", status: "warning" }
  ];

  const alerts = [
    { type: "warning", message: "Server CPU usage above 80%", priority: "high" },
    { type: "info", message: "Scheduled maintenance in 2 days", priority: "medium" },
    { type: "error", message: "Payment gateway timeout", priority: "high" }
  ];

  const topPerformers = [
    { name: "Dr. Sarah Wilson", role: "Physics Teacher", rating: 4.9, students: 234 },
    { name: "Prof. John Smith", role: "Mathematics Teacher", rating: 4.8, students: 198 },
    { name: "Ms. Emily Davis", role: "Chemistry Teacher", rating: 4.7, students: 156 }
  ];

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 mr-1 ${
                    stat.trend === 'down' ? 'rotate-180' : ''
                  }`} />
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>System Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="flex items-center">
                      <Server className="h-4 w-4 mr-2" />
                      Server Performance
                    </span>
                    <span>73%</span>
                  </div>
                  <Progress value={73} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      Database Usage
                    </span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      API Response Time
                    </span>
                    <span>120ms</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Active Users
                    </span>
                    <span>2,341</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent System Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-100' :
                      activity.status === 'warning' ? 'bg-yellow-100' :
                      activity.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'user' && <Users className="h-4 w-4" />}
                      {activity.type === 'content' && <BookOpen className="h-4 w-4" />}
                      {activity.type === 'system' && <Server className="h-4 w-4" />}
                      {activity.type === 'alert' && <AlertTriangle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant={
                      activity.status === 'success' ? 'default' :
                      activity.status === 'warning' ? 'secondary' : 
                      activity.status === 'error' ? 'destructive' : 'outline'
                    }>
                      {activity.status}
                    </Badge>
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
                <AlertTriangle className="h-5 w-5" />
                <span>System Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  alert.priority === 'high' && alert.type === 'error' ? 'border-red-200 bg-red-50' :
                  alert.priority === 'high' && alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  'border-blue-200 bg-blue-50'
                }`}>
                  <div className="flex items-start space-x-2">
                    {alert.type === 'error' ? 
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" /> :
                      alert.type === 'warning' ?
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" /> :
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                    }
                    <div>
                      <Badge variant="outline" className="text-xs mb-1">
                        {alert.priority}
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
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                User Management
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Content Moderation
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics Dashboard
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Security Center
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center space-x-3 p-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {performer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{performer.name}</p>
                    <p className="text-xs text-muted-foreground">{performer.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-xs">
                      ⭐ {performer.rating}
                    </div>
                    <p className="text-xs text-muted-foreground">{performer.students} students</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
