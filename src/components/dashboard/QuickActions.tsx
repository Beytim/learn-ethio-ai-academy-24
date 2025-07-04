
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, BookOpen, Brain, Calendar, Trophy, Target } from "lucide-react";

interface QuickActionsProps {
  onStartLesson: (subject: string, grade: number) => void;
  onOpenAITutor: () => void;
  userGrade: number;
}

export function QuickActions({ onStartLesson, onOpenAITutor, userGrade }: QuickActionsProps) {
  const quickActions = [
    {
      title: "Start Math Lesson",
      description: "Continue with Sets and Relations",
      icon: Play,
      color: "bg-blue-500",
      action: () => onStartLesson("Mathematics", userGrade),
    },
    {
      title: "Ask AI Tutor",
      description: "Get help with any topic",
      icon: Brain,
      color: "bg-purple-500",
      action: onOpenAITutor,
    },
    {
      title: "Practice Quiz",
      description: "Test your knowledge",
      icon: Trophy,
      color: "bg-green-500",
      action: () => console.log("Quiz started"),
    },
    {
      title: "Study Planner",
      description: "Plan your study schedule",
      icon: Calendar,
      color: "bg-orange-500",
      action: () => console.log("Study planner opened"),
    },
  ];

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-medium transition-all duration-300"
              onClick={action.action}
            >
              <div className={`p-2 rounded-full ${action.color} text-white`}>
                <action.icon className="h-4 w-4" />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
