import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Trophy, Target, Clock } from 'lucide-react';

interface PerformanceData {
  date: string;
  score: number;
  timeSpent: number;
  completedLessons: number;
}

const mockPerformanceData: PerformanceData[] = [
  { date: '2024-01-01', score: 75, timeSpent: 45, completedLessons: 2 },
  { date: '2024-01-02', score: 82, timeSpent: 60, completedLessons: 3 },
  { date: '2024-01-03', score: 78, timeSpent: 40, completedLessons: 2 },
  { date: '2024-01-04', score: 88, timeSpent: 70, completedLessons: 4 },
  { date: '2024-01-05', score: 85, timeSpent: 55, completedLessons: 3 },
  { date: '2024-01-06', score: 92, timeSpent: 80, completedLessons: 5 },
  { date: '2024-01-07', score: 90, timeSpent: 65, completedLessons: 4 },
];

export function PerformanceChart() {
  const averageScore = Math.round(
    mockPerformanceData.reduce((sum, data) => sum + data.score, 0) / mockPerformanceData.length
  );
  
  const totalTimeSpent = mockPerformanceData.reduce((sum, data) => sum + data.timeSpent, 0);
  const totalLessons = mockPerformanceData.reduce((sum, data) => sum + data.completedLessons, 0);

  return (
    <div className="grid gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-primary">{averageScore}%</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-secondary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time Studied</p>
                <p className="text-2xl font-bold text-secondary">{totalTimeSpent}h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
                <p className="text-2xl font-bold text-accent">{totalLessons}</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Improvement</p>
                <p className="text-2xl font-bold text-destructive">+15%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-muted-foreground"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-semibold">{new Date(label).toLocaleDateString()}</p>
                          <p className="text-primary">Score: {payload[0].value}%</p>
                          <p className="text-secondary">Time: {payload[1]?.value}min</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="timeSpent" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Study Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Study Time Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-muted-foreground"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis className="text-muted-foreground" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="timeSpent" 
                  stroke="hsl(var(--accent))" 
                  fill="hsl(var(--accent) / 0.3)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}