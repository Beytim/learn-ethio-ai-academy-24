import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar as CalendarIcon,
  Clock,
  Target,
  BookOpen,
  CheckCircle,
  Plus,
  AlertCircle,
  TrendingUp,
  RotateCcw,
  Bell,
  Award,
  Zap
} from 'lucide-react';

interface StudyTask {
  id: string;
  title: string;
  subject: string;
  type: 'lesson' | 'practice' | 'quiz' | 'review' | 'project';
  dueDate: Date;
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  progress: number;
  description?: string;
}

interface StudyGoal {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'exam';
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  subjects: string[];
  completed: boolean;
}

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  productivity: number;
  notes?: string;
}

const mockTasks: StudyTask[] = [
  {
    id: 't1',
    title: 'Complete Algebra Unit 3',
    subject: 'Mathematics',
    type: 'lesson',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    estimatedTime: 120,
    difficulty: 'medium',
    priority: 'high',
    completed: false,
    progress: 60,
    description: 'Finish all lessons in linear equations and inequalities'
  },
  {
    id: 't2',
    title: 'Physics Quiz - Motion',
    subject: 'Physics',
    type: 'quiz',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    estimatedTime: 45,
    difficulty: 'hard',
    priority: 'high',
    completed: false,
    progress: 0,
    description: 'Prepare for kinematics and dynamics quiz'
  },
  {
    id: 't3',
    title: 'Review Chemical Bonding',
    subject: 'Chemistry',
    type: 'review',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    estimatedTime: 90,
    difficulty: 'medium',
    priority: 'medium',
    completed: true,
    progress: 100
  }
];

const mockGoals: StudyGoal[] = [
  {
    id: 'g1',
    title: 'Daily Study Streak',
    description: 'Study for at least 2 hours every day',
    type: 'daily',
    target: 2,
    current: 1.5,
    unit: 'hours',
    deadline: new Date(),
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    completed: false
  },
  {
    id: 'g2',
    title: 'Weekly Math Practice',
    description: 'Complete 50 math problems this week',
    type: 'weekly',
    target: 50,
    current: 32,
    unit: 'problems',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    subjects: ['Mathematics'],
    completed: false
  },
  {
    id: 'g3',
    title: 'Monthly Reading Goal',
    description: 'Read 5 science articles this month',
    type: 'monthly',
    target: 5,
    current: 5,
    unit: 'articles',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    subjects: ['Physics', 'Chemistry', 'Biology'],
    completed: true
  }
];

const mockSessions: StudySession[] = [
  {
    id: 's1',
    subject: 'Mathematics',
    topic: 'Linear Equations',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 30 * 60 * 1000),
    duration: 90,
    productivity: 85
  },
  {
    id: 's2',
    subject: 'Physics',
    topic: 'Newton\'s Laws',
    startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
    duration: 60,
    productivity: 90
  }
];

interface SmartStudyPlannerProps {
  currentUser: {
    id: string;
    name: string;
    grade: number;
    subjects: string[];
  };
}

export function SmartStudyPlanner({ currentUser }: SmartStudyPlannerProps) {
  const [activeTab, setActiveTab] = useState<'tasks' | 'goals' | 'calendar' | 'analytics'>('tasks');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState(mockTasks);
  const [goals, setGoals] = useState(mockGoals);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'quiz': return <Award className="h-4 w-4" />;
      case 'review': return <RotateCcw className="h-4 w-4" />;
      case 'project': return <TrendingUp className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, progress: task.completed ? 0 : 100 }
        : task
    ));
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const renderTasks = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
        <Button onClick={() => setShowAddTask(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => {
          const daysUntilDue = getDaysUntilDue(task.dueDate);
          const isOverdue = daysUntilDue < 0;
          const isDueSoon = daysUntilDue <= 1 && !isOverdue;

          return (
            <Card key={task.id} className={`${task.completed ? 'opacity-60' : ''} ${isOverdue ? 'border-red-200' : isDueSoon ? 'border-yellow-200' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTaskComplete(task.id)}
                    className="mt-1"
                  >
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                    )}
                  </Button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h4>
                      <Badge variant="outline">{task.subject}</Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>

                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        {getTypeIcon(task.type)}
                        <span className="text-sm capitalize">{task.type}</span>
                      </div>
                      <Badge className={getDifficultyColor(task.difficulty)}>
                        {task.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{task.estimatedTime} min</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />
                        <span>
                          {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : 
                           isDueSoon ? 'Due tomorrow' : 
                           daysUntilDue === 0 ? 'Due today' : 
                           `Due in ${daysUntilDue} days`}
                        </span>
                      </div>
                    </div>

                    {!task.completed && task.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                    )}
                  </div>

                  {(isOverdue || isDueSoon) && (
                    <AlertCircle className={`h-5 w-5 ${isOverdue ? 'text-red-500' : 'text-yellow-500'}`} />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Study Goals</h3>
        <Button onClick={() => setShowAddGoal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="grid gap-4">
        {goals.map((goal) => {
          const progressPercentage = Math.min((goal.current / goal.target) * 100, 100);
          const isCompleted = goal.completed || progressPercentage >= 100;

          return (
            <Card key={goal.id} className={isCompleted ? 'border-green-200 bg-green-50/50' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{goal.title}</h4>
                      <Badge variant="outline" className="capitalize">{goal.type}</Badge>
                      {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(progressPercentage)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {goal.current}/{goal.target} {goal.unit}
                    </div>
                  </div>
                </div>

                <Progress value={progressPercentage} className="h-3 mb-3" />

                <div className="flex items-center justify-between text-sm">
                  <div className="flex flex-wrap gap-1">
                    {goal.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CalendarIcon className="h-3 w-3" />
                    <span>{goal.deadline.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Study Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Tasks for {selectedDate?.toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks
                .filter(task => task.dueDate.toDateString() === selectedDate?.toDateString())
                .map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">{task.subject}</div>
                    </div>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </div>
                ))}
              {tasks.filter(task => task.dueDate.toDateString() === selectedDate?.toDateString()).length === 0 && (
                <p className="text-muted-foreground text-center py-4">No tasks scheduled for this day</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Study Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {tasks.filter(t => t.completed).length}
            </div>
            <div className="text-sm text-muted-foreground">Tasks Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {goals.filter(g => g.completed).length}
            </div>
            <div className="text-sm text-muted-foreground">Goals Achieved</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {mockSessions.reduce((acc, s) => acc + s.duration, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Minutes Studied</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.round(mockSessions.reduce((acc, s) => acc + s.productivity, 0) / mockSessions.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Productivity</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Study Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Study Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <div className="font-medium">{session.subject}</div>
                    <div className="text-sm text-muted-foreground">{session.topic}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{session.duration} min</div>
                  <div className="text-sm text-muted-foreground">{session.productivity}% productive</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6" />
            Smart Study Planner
          </CardTitle>
          <p className="text-muted-foreground">
            AI-powered study planning to optimize your learning journey
          </p>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 bg-muted p-1 rounded-lg w-fit">
        {[
          { id: 'tasks', label: 'Tasks', icon: CheckCircle },
          { id: 'goals', label: 'Goals', icon: Target },
          { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center gap-2"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'tasks' && renderTasks()}
      {activeTab === 'goals' && renderGoals()}
      {activeTab === 'calendar' && renderCalendar()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
}