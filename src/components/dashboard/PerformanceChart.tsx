
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function PerformanceChart() {
  const weeklyData = [
    { day: 'Mon', score: 85, lessons: 2 },
    { day: 'Tue', score: 92, lessons: 3 },
    { day: 'Wed', score: 78, lessons: 1 },
    { day: 'Thu', score: 95, lessons: 4 },
    { day: 'Fri', score: 88, lessons: 2 },
    { day: 'Sat', score: 90, lessons: 3 },
    { day: 'Sun', score: 87, lessons: 1 },
  ];

  const maxScore = Math.max(...weeklyData.map(d => d.score));

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Weekly Performance</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average Score</span>
            <span className="font-medium">87%</span>
          </div>
          
          <div className="space-y-2">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 text-xs text-muted-foreground">{data.day}</div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                      style={{ width: `${(data.score / maxScore) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs font-medium w-8">{data.score}%</div>
                </div>
                <div className="text-xs text-muted-foreground w-8">
                  {data.lessons}L
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>16 lessons completed this week</span>
              <span className="text-green-500">↗ +12% from last week</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
