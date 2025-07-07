
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  TrendingUp,
  Calendar,
  MessageCircle,
  FileText,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye
} from "lucide-react";

export function TeacherDashboard() {
  const recentActivities = [
    { type: "assignment", title: "Algebra Test graded", time: "2 hours ago", status: "completed" },
    { type: "message", title: "New question from John D.", time: "4 hours ago", status: "pending" },
    { type: "content", title: "Chemistry lesson updated", time: "1 day ago", status: "completed" },
    { type: "student", title: "5 new student enrollments", time: "2 days ago", status: "info" }
  ];

  const classes = [
    { name: "Grade 9 Mathematics", students: 28, progress: 75, nextClass: "Today 2:00 PM" },
    { name: "Grade 10 Physics", students: 24, progress: 68, nextClass: "Tomorrow 10:00 AM" },
    { name: "Grade 11 Chemistry", students: 22, progress: 82, nextClass: "Tomorrow 2:00 PM" }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">74</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Active Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Avg. Performance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Classes */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Classes</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {classes.map((cls, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{cls.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {cls.students} students • Next: {cls.nextClass}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Course Progress</span>
                      <span>{cls.progress}%</span>
                    </div>
                    <Progress value={cls.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Grade Submissions
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Students
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Class
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-100' :
                  activity.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'assignment' && <FileText className="h-4 w-4" />}
                  {activity.type === 'message' && <MessageCircle className="h-4 w-4" />}
                  {activity.type === 'content' && <BookOpen className="h-4 w-4" />}
                  {activity.type === 'student' && <Users className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant={
                  activity.status === 'completed' ? 'default' :
                  activity.status === 'pending' ? 'secondary' : 'outline'
                }>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
