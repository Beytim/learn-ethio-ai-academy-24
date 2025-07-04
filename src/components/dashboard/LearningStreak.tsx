
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Calendar, Target } from "lucide-react";

export function LearningStreak() {
  const streakData = {
    current: 7,
    longest: 14,
    thisWeek: 5,
    target: 10,
  };

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const currentWeekActivity = [true, true, true, true, true, false, false];

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span>Learning Streak</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{streakData.current}</div>
            <div className="text-xs text-muted-foreground">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{streakData.longest}</div>
            <div className="text-xs text-muted-foreground">Longest Streak</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">This Week</span>
            <span className="font-medium">{streakData.thisWeek}/{streakData.target} days</span>
          </div>
          
          <div className="flex justify-between">
            {weekDays.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                <div className="text-xs text-muted-foreground">{day}</div>
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    currentWeekActivity[index] 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-muted'
                  }`}
                >
                  {currentWeekActivity[index] && <Flame className="h-3 w-3" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">
              Keep it up! 2 more days to reach your weekly goal.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
