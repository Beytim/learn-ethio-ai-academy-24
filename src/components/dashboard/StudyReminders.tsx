
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Bell, CheckCircle, AlertCircle } from "lucide-react";

export function StudyReminders() {
  const reminders = [
    {
      title: "Physics Assignment Due",
      subject: "Physics",
      time: "Tomorrow 3:00 PM",
      priority: "high",
      type: "assignment",
    },
    {
      title: "Math Quiz Review",
      subject: "Mathematics",
      time: "Today 6:00 PM",
      priority: "medium",
      type: "study",
    },
    {
      title: "Chemistry Lab Report",
      subject: "Chemistry",
      time: "Friday 9:00 AM",
      priority: "low",
      type: "assignment",
    },
    {
      title: "Biology Chapter Reading",
      subject: "Biology",
      time: "This Weekend",
      priority: "medium",
      type: "study",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'assignment' ? AlertCircle : Clock;
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Study Reminders</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {reminders.map((reminder, index) => {
          const TypeIcon = getTypeIcon(reminder.type);
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded-full ${getPriorityColor(reminder.priority)}`}>
                  <TypeIcon className="h-3 w-3 text-white" />
                </div>
                <div>
                  <div className="font-medium text-sm">{reminder.title}</div>
                  <div className="text-xs text-muted-foreground">{reminder.subject} • {reminder.time}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {reminder.priority}
                </Badge>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <CheckCircle className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
