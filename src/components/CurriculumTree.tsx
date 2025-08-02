import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronRight, 
  ChevronDown, 
  PlayCircle, 
  CheckCircle, 
  Lock,
  Clock,
  BookOpen,
  Award,
  Target
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  titleAmharic: string;
  duration: number;
  type: 'video' | 'exercise' | 'quiz' | 'reading';
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  locked: boolean;
  score?: number;
}

interface Unit {
  id: string;
  title: string;
  titleAmharic: string;
  description: string;
  lessons: Lesson[];
  progress: number;
  estimatedTime: number;
  prerequisite?: string;
}

interface CurriculumTreeProps {
  subjectId: string;
  subjectName: string;
  subjectNameAmharic: string;
  onLessonSelect: (lesson: Lesson, unit: Unit) => void;
}

const mathUnits: Unit[] = [
  {
    id: 'algebra-basics',
    title: 'Algebraic Expressions',
    titleAmharic: 'የአልጄብራ መግለጫዎች',
    description: 'Learn the fundamentals of algebraic expressions and operations',
    progress: 85,
    estimatedTime: 240,
    lessons: [
      {
        id: 'intro-algebra',
        title: 'Introduction to Algebra',
        titleAmharic: 'የአልጄብራ መግቢያ',
        duration: 25,
        type: 'video',
        difficulty: 'easy',
        completed: true,
        locked: false,
        score: 95
      },
      {
        id: 'variables-constants',
        title: 'Variables and Constants',
        titleAmharic: 'ተለዋዋጮች እና ቋሚዎች',
        duration: 30,
        type: 'video',
        difficulty: 'easy',
        completed: true,
        locked: false,
        score: 88
      },
      {
        id: 'simplifying-expressions',
        title: 'Simplifying Expressions',
        titleAmharic: 'መግለጫዎችን ማቅለል',
        duration: 35,
        type: 'exercise',
        difficulty: 'medium',
        completed: true,
        locked: false,
        score: 92
      },
      {
        id: 'algebra-quiz-1',
        title: 'Algebra Basics Quiz',
        titleAmharic: 'የአልጄብራ መሰረታዊ ጥያቄዎች',
        duration: 20,
        type: 'quiz',
        difficulty: 'medium',
        completed: false,
        locked: false
      }
    ]
  },
  {
    id: 'linear-equations',
    title: 'Linear Equations',
    titleAmharic: 'መስመራዊ እኩልታዎች',
    description: 'Solve and graph linear equations in one and two variables',
    progress: 45,
    estimatedTime: 180,
    lessons: [
      {
        id: 'solving-linear-one-var',
        title: 'Solving Linear Equations (One Variable)',
        titleAmharic: 'መስመራዊ እኩልታዎችን መፍታት (አንድ ተለዋዋጭ)',
        duration: 40,
        type: 'video',
        difficulty: 'medium',
        completed: true,
        locked: false,
        score: 87
      },
      {
        id: 'graphing-linear',
        title: 'Graphing Linear Equations',
        titleAmharic: 'የመስመራዊ እኩልታዎች ግራፍ',
        duration: 45,
        type: 'video',
        difficulty: 'medium',
        completed: false,
        locked: false
      },
      {
        id: 'systems-equations',
        title: 'Systems of Linear Equations',
        titleAmharic: 'የመስመራዊ እኩልታዎች ስርዓት',
        duration: 50,
        type: 'exercise',
        difficulty: 'hard',
        completed: false,
        locked: false
      }
    ]
  },
  {
    id: 'quadratic-equations',
    title: 'Quadratic Equations',
    titleAmharic: 'ካሬያዊ እኩልታዎች',
    description: 'Master quadratic equations and their applications',
    progress: 0,
    estimatedTime: 200,
    prerequisite: 'linear-equations',
    lessons: [
      {
        id: 'intro-quadratics',
        title: 'Introduction to Quadratics',
        titleAmharic: 'የካሬያዊ እኩልታዎች መግቢያ',
        duration: 35,
        type: 'video',
        difficulty: 'medium',
        completed: false,
        locked: true
      },
      {
        id: 'factoring-quadratics',
        title: 'Factoring Quadratic Expressions',
        titleAmharic: 'ካሬያዊ መግለጫዎችን ማፈራረስ',
        duration: 40,
        type: 'exercise',
        difficulty: 'hard',
        completed: false,
        locked: true
      }
    ]
  }
];

export function CurriculumTree({ subjectId, subjectName, subjectNameAmharic, onLessonSelect }: CurriculumTreeProps) {
  const [expandedUnits, setExpandedUnits] = useState<string[]>(['algebra-basics']);

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => 
      prev.includes(unitId) 
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="h-4 w-4" />;
      case 'exercise': return <Target className="h-4 w-4" />;
      case 'quiz': return <Award className="h-4 w-4" />;
      case 'reading': return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isUnitLocked = (unit: Unit) => {
    if (!unit.prerequisite) return false;
    const prerequisiteUnit = mathUnits.find(u => u.id === unit.prerequisite);
    return prerequisiteUnit ? prerequisiteUnit.progress < 80 : false;
  };

  return (
    <div className="space-y-4">
      {/* Subject Header */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{subjectName}</CardTitle>
              <p className="text-lg text-muted-foreground">{subjectNameAmharic}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Overall Progress</div>
              <div className="text-2xl font-bold text-primary">
                {Math.round(mathUnits.reduce((acc, unit) => acc + unit.progress, 0) / mathUnits.length)}%
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Units */}
      {mathUnits.map((unit, unitIndex) => {
        const isExpanded = expandedUnits.includes(unit.id);
        const isLocked = isUnitLocked(unit);
        const completedLessons = unit.lessons.filter(l => l.completed).length;
        
        return (
          <Card key={unit.id} className={`${isLocked ? 'opacity-60' : ''}`}>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => !isLocked && toggleUnit(unit.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {isLocked ? (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    ) : isExpanded ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                    <span className="text-sm font-medium text-muted-foreground">
                      Unit {unitIndex + 1}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{unit.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{unit.titleAmharic}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{unit.progress}%</div>
                    <div className="text-xs text-muted-foreground">
                      {completedLessons}/{unit.lessons.length} lessons
                    </div>
                  </div>
                  <div className="w-20">
                    <Progress value={unit.progress} className="h-2" />
                  </div>
                </div>
              </div>
              
              {isLocked && unit.prerequisite && (
                <div className="text-sm text-muted-foreground mt-2">
                  Complete "{mathUnits.find(u => u.id === unit.prerequisite)?.title}" to unlock
                </div>
              )}
            </CardHeader>
            
            {isExpanded && !isLocked && (
              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">{unit.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{Math.round(unit.estimatedTime / 60)} hours</span>
                    </div>
                    <span>{unit.lessons.length} lessons</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {unit.lessons.map((lesson, lessonIndex) => (
                    <div 
                      key={lesson.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        lesson.locked 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-muted/50 cursor-pointer'
                      }`}
                      onClick={() => !lesson.locked && onLessonSelect(lesson, unit)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {lesson.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : lesson.locked ? (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            getTypeIcon(lesson.type)
                          )}
                          <span className="text-sm font-medium text-muted-foreground">
                            {unitIndex + 1}.{lessonIndex + 1}
                          </span>
                        </div>
                        
                        <div>
                          <div className="font-medium">{lesson.title}</div>
                          <div className="text-sm text-muted-foreground">{lesson.titleAmharic}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge className={getDifficultyColor(lesson.difficulty)}>
                          {lesson.difficulty}
                        </Badge>
                        
                        <div className="text-xs text-muted-foreground">
                          {lesson.duration} min
                        </div>
                        
                        {lesson.completed && lesson.score && (
                          <div className="text-sm font-medium text-green-600">
                            {lesson.score}%
                          </div>
                        )}
                        
                        {!lesson.locked && !lesson.completed && (
                          <Button size="sm" variant="outline">
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}