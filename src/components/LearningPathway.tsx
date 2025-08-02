import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Target,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';

interface PathwayStep {
  id: string;
  title: string;
  titleAmharic: string;
  description: string;
  type: 'subject' | 'skill' | 'assessment' | 'project';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  prerequisites: string[];
  progress: number;
  completed: boolean;
  locked: boolean;
}

interface LearningPathwayProps {
  studentLevel: 'beginner' | 'intermediate' | 'advanced';
  focusArea: 'science' | 'mathematics' | 'languages' | 'general';
  onStepSelect: (step: PathwayStep) => void;
}

const pathwaySteps: PathwayStep[] = [
  {
    id: 'math-fundamentals',
    title: 'Mathematics Fundamentals',
    titleAmharic: 'የሂሳብ መሰረታዊ ነገሮች',
    description: 'Master basic arithmetic, algebra, and problem-solving skills',
    type: 'subject',
    difficulty: 'beginner',
    estimatedTime: 120,
    prerequisites: [],
    progress: 100,
    completed: true,
    locked: false
  },
  {
    id: 'algebra-mastery',
    title: 'Algebra Mastery',
    titleAmharic: 'የአልጄብራ ትምህርት',
    description: 'Advanced algebraic concepts and equation solving',
    type: 'subject',
    difficulty: 'intermediate',
    estimatedTime: 180,
    prerequisites: ['math-fundamentals'],
    progress: 75,
    completed: false,
    locked: false
  },
  {
    id: 'geometry-basics',
    title: 'Geometry Fundamentals',
    titleAmharic: 'የጂኦሜትሪ መሰረታዊ ነገሮች',
    description: 'Shapes, angles, area, and volume calculations',
    type: 'subject',
    difficulty: 'intermediate',
    estimatedTime: 150,
    prerequisites: ['math-fundamentals'],
    progress: 60,
    completed: false,
    locked: false
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving Skills',
    titleAmharic: 'ችግር መፍታት ክህሎት',
    description: 'Advanced mathematical reasoning and problem-solving strategies',
    type: 'skill',
    difficulty: 'intermediate',
    estimatedTime: 90,
    prerequisites: ['algebra-mastery', 'geometry-basics'],
    progress: 0,
    completed: false,
    locked: true
  },
  {
    id: 'midterm-assessment',
    title: 'Mid-Term Assessment',
    titleAmharic: 'የመካከለኛ ወቅት ምዘና',
    description: 'Comprehensive assessment of mathematical skills',
    type: 'assessment',
    difficulty: 'intermediate',
    estimatedTime: 60,
    prerequisites: ['problem-solving'],
    progress: 0,
    completed: false,
    locked: true
  },
  {
    id: 'advanced-topics',
    title: 'Advanced Mathematics',
    titleAmharic: 'የላቀ ሂሳብ',
    description: 'Calculus, statistics, and advanced mathematical concepts',
    type: 'subject',
    difficulty: 'advanced',
    estimatedTime: 240,
    prerequisites: ['midterm-assessment'],
    progress: 0,
    completed: false,
    locked: true
  },
  {
    id: 'final-project',
    title: 'Capstone Project',
    titleAmharic: 'የመጨረሻ ፕሮጀክት',
    description: 'Apply mathematical knowledge to real-world problems',
    type: 'project',
    difficulty: 'advanced',
    estimatedTime: 120,
    prerequisites: ['advanced-topics'],
    progress: 0,
    completed: false,
    locked: true
  }
];

export function LearningPathway({ studentLevel, focusArea, onStepSelect }: LearningPathwayProps) {
  const getStepIcon = (type: string, completed: boolean) => {
    if (completed) return <CheckCircle className="h-6 w-6 text-green-500" />;
    
    switch (type) {
      case 'subject': return <BookOpen className="h-6 w-6" />;
      case 'skill': return <Target className="h-6 w-6" />;
      case 'assessment': return <Award className="h-6 w-6" />;
      case 'project': return <TrendingUp className="h-6 w-6" />;
      default: return <BookOpen className="h-6 w-6" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'subject': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'skill': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'assessment': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'project': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalProgress = Math.round(
    pathwaySteps.reduce((acc, step) => acc + step.progress, 0) / pathwaySteps.length
  );

  const completedSteps = pathwaySteps.filter(step => step.completed).length;
  const totalTime = pathwaySteps.reduce((acc, step) => acc + step.estimatedTime, 0);

  return (
    <div className="space-y-6">
      {/* Pathway Overview */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Your Learning Pathway
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{totalProgress}%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{completedSteps}/{pathwaySteps.length}</div>
              <div className="text-sm text-muted-foreground">Steps Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{Math.round(totalTime / 60)}h</div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </div>
          </div>
          <Progress value={totalProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Pathway Steps */}
      <div className="space-y-4">
        {pathwaySteps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Connection Line */}
            {index < pathwaySteps.length - 1 && (
              <div className="absolute left-8 top-20 w-0.5 h-8 bg-border z-0" />
            )}
            
            <Card 
              className={`relative z-10 transition-all ${
                step.locked 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'hover:shadow-lg cursor-pointer'
              } ${step.completed ? 'border-green-200 dark:border-green-800' : ''}`}
              onClick={() => !step.locked && onStepSelect(step)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {/* Step Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full border-2 flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                      : step.locked
                      ? 'bg-muted border-muted-foreground/20'
                      : 'bg-primary/5 border-primary/20'
                  }`}>
                    {getStepIcon(step.type, step.completed)}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <Badge className={getTypeColor(step.type)}>
                        {step.type}
                      </Badge>
                      <Badge className={getDifficultyColor(step.difficulty)}>
                        {step.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-1">{step.titleAmharic}</p>
                    <p className="text-sm mb-3">{step.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{Math.round(step.estimatedTime / 60)}h {step.estimatedTime % 60}m</span>
                      </div>
                      {step.prerequisites.length > 0 && (
                        <div className="text-xs">
                          Requires: {step.prerequisites.length} prerequisite(s)
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {!step.locked && step.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{step.progress}%</span>
                        </div>
                        <Progress value={step.progress} className="h-2" />
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    {step.completed ? (
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    ) : step.locked ? (
                      <Button variant="ghost" size="sm" disabled>
                        Locked
                      </Button>
                    ) : step.progress > 0 ? (
                      <Button size="sm">
                        Continue
                      </Button>
                    ) : (
                      <Button size="sm">
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Recommendation Card */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Recommended Next Step</h3>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
            Based on your progress, we recommend focusing on "{pathwaySteps.find(s => !s.completed && !s.locked)?.title}" next.
            This will help you build on your current knowledge and maintain learning momentum.
          </p>
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
            View Recommendations
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}