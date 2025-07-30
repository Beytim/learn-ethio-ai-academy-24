import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Clock, Calendar, BookOpen, AlertCircle, CheckCircle2, Plus } from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'lesson' | 'quiz' | 'assignment' | 'study-session';
  priority: 'high' | 'medium' | 'low';
  enabled: boolean;
  completed: boolean;
}

const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Mathematics Quiz',
    description: 'Algebra and Geometry review',
    time: '2:00 PM Today',
    type: 'quiz',
    priority: 'high',
    enabled: true,
    completed: false
  },
  {
    id: '2',
    title: 'Chemistry Lesson',
    description: 'Chemical Reactions and Equations',
    time: '4:30 PM Today',
    type: 'lesson',
    priority: 'medium',
    enabled: true,
    completed: false
  }
];

export function StudyReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, enabled: !reminder.enabled }
        : reminder
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <AlertCircle className="h-4 w-4" />;
      case 'assignment': return <Calendar className="h-4 w-4" />;
      case 'study-session': return <Clock className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Study Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1 text-primary">
                    {getTypeIcon(reminder.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{reminder.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{reminder.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{reminder.time}</span>
                    </div>
                  </div>
                </div>
                <Switch
                  checked={reminder.enabled}
                  onCheckedChange={() => toggleReminder(reminder.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}