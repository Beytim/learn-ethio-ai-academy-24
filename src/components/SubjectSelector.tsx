import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  Globe, 
  BookOpen, 
  Atom, 
  Languages,
  Users,
  Palette,
  Music,
  Trophy,
  Clock
} from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  nameAmharic: string;
  icon: React.ReactNode;
  color: string;
  grade: number;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
}

const ethiopianSubjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    nameAmharic: 'ሂሳብ',
    icon: <Calculator className="h-6 w-6" />,
    color: 'bg-blue-500',
    grade: 9,
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    difficulty: 'Intermediate',
    estimatedTime: '4-6 hours/week'
  },
  {
    id: 'physics',
    name: 'Physics',
    nameAmharic: 'ፊዚክስ',
    icon: <Atom className="h-6 w-6" />,
    color: 'bg-purple-500',
    grade: 9,
    progress: 45,
    totalLessons: 20,
    completedLessons: 9,
    difficulty: 'Advanced',
    estimatedTime: '5-7 hours/week'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    nameAmharic: 'ኬሚስትሪ',
    icon: <Atom className="h-6 w-6" />,
    color: 'bg-green-500',
    grade: 9,
    progress: 30,
    totalLessons: 18,
    completedLessons: 5,
    difficulty: 'Intermediate',
    estimatedTime: '4-5 hours/week'
  },
  {
    id: 'biology',
    name: 'Biology',
    nameAmharic: 'ባዮሎጂ',
    icon: <Globe className="h-6 w-6" />,
    color: 'bg-emerald-500',
    grade: 9,
    progress: 80,
    totalLessons: 22,
    completedLessons: 18,
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours/week'
  },
  {
    id: 'english',
    name: 'English',
    nameAmharic: 'እንግሊዝኛ',
    icon: <Languages className="h-6 w-6" />,
    color: 'bg-red-500',
    grade: 9,
    progress: 70,
    totalLessons: 26,
    completedLessons: 18,
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours/week'
  },
  {
    id: 'amharic',
    name: 'Amharic',
    nameAmharic: 'አማርኛ',
    icon: <BookOpen className="h-6 w-6" />,
    color: 'bg-yellow-500',
    grade: 9,
    progress: 85,
    totalLessons: 20,
    completedLessons: 17,
    difficulty: 'Beginner',
    estimatedTime: '2-3 hours/week'
  },
  {
    id: 'geography',
    name: 'Geography',
    nameAmharic: 'ጂኦግራፊ',
    icon: <Globe className="h-6 w-6" />,
    color: 'bg-orange-500',
    grade: 9,
    progress: 55,
    totalLessons: 16,
    completedLessons: 9,
    difficulty: 'Beginner',
    estimatedTime: '2-3 hours/week'
  },
  {
    id: 'history',
    name: 'History',
    nameAmharic: 'ታሪክ',
    icon: <Users className="h-6 w-6" />,
    color: 'bg-indigo-500',
    grade: 9,
    progress: 40,
    totalLessons: 14,
    completedLessons: 6,
    difficulty: 'Beginner',
    estimatedTime: '2-3 hours/week'
  }
];

interface SubjectSelectorProps {
  onSubjectSelect: (subject: Subject) => void;
}

export function SubjectSelector({ onSubjectSelect }: SubjectSelectorProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalProgress = Math.round(
    ethiopianSubjects.reduce((acc, subject) => acc + subject.progress, 0) / ethiopianSubjects.length
  );

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Grade 9 Progress</h3>
              <p className="text-sm text-muted-foreground">Overall completion across all subjects</p>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-primary">{totalProgress}%</span>
            </div>
          </div>
          <Progress value={totalProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ethiopianSubjects.map((subject) => (
          <Card 
            key={subject.id} 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-primary/40"
            onClick={() => onSubjectSelect(subject)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${subject.color} text-white`}>
                  {subject.icon}
                </div>
                <Badge className={getDifficultyColor(subject.difficulty)}>
                  {subject.difficulty}
                </Badge>
              </div>
              <div>
                <CardTitle className="text-lg">{subject.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{subject.nameAmharic}</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{subject.completedLessons}/{subject.totalLessons} lessons</span>
                  <span>{subject.totalLessons - subject.completedLessons} remaining</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{subject.estimatedTime}</span>
              </div>

              <Button 
                className="w-full" 
                onClick={(e) => {
                  e.stopPropagation();
                  onSubjectSelect(subject);
                }}
              >
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {ethiopianSubjects.length}
            </div>
            <div className="text-sm text-muted-foreground">Subjects</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {ethiopianSubjects.reduce((acc, s) => acc + s.totalLessons, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Lessons</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {ethiopianSubjects.reduce((acc, s) => acc + s.completedLessons, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {ethiopianSubjects.reduce((acc, s) => acc + (s.totalLessons - s.completedLessons), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Remaining</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}