import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Circle, 
  Lock, 
  Star, 
  Trophy,
  Target,
  BookOpen,
  Clock,
  ArrowRight
} from "lucide-react";

interface MasteryLevel {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'locked' | 'available' | 'in-progress' | 'mastered';
  prerequisites: string[];
  estimatedTime: string;
  skills: string[];
  xpReward: number;
}

interface MasteryMapProps {
  subject: string;
  grade: number;
  onSkillSelect: (skill: MasteryLevel) => void;
}

export function MasteryMap({ subject, grade, onSkillSelect }: MasteryMapProps) {
  const [selectedPath, setSelectedPath] = useState<string>('fundamentals');

  const masteryLevels: MasteryLevel[] = [
    {
      id: 'numbers-basics',
      title: 'Number Fundamentals',
      description: 'Master basic number operations and properties',
      progress: 100,
      status: 'mastered',
      prerequisites: [],
      estimatedTime: '2-3 hours',
      skills: ['Place Value', 'Comparing Numbers', 'Rounding'],
      xpReward: 150
    },
    {
      id: 'arithmetic',
      title: 'Arithmetic Operations',
      description: 'Addition, subtraction, multiplication, and division mastery',
      progress: 85,
      status: 'in-progress',
      prerequisites: ['numbers-basics'],
      estimatedTime: '4-5 hours',
      skills: ['Addition', 'Subtraction', 'Multiplication', 'Division'],
      xpReward: 200
    },
    {
      id: 'fractions',
      title: 'Fractions & Decimals',
      description: 'Work with parts of wholes and decimal notation',
      progress: 0,
      status: 'available',
      prerequisites: ['arithmetic'],
      estimatedTime: '6-7 hours',
      skills: ['Fraction Concepts', 'Decimal Place Value', 'Converting'],
      xpReward: 250
    },
    {
      id: 'algebra-intro',
      title: 'Introduction to Algebra',
      description: 'Variables, expressions, and basic equations',
      progress: 0,
      status: 'locked',
      prerequisites: ['fractions'],
      estimatedTime: '8-10 hours',
      skills: ['Variables', 'Expressions', 'Simple Equations'],
      xpReward: 300
    },
    {
      id: 'geometry-basics',
      title: 'Geometry Fundamentals',
      description: 'Shapes, angles, and measurement',
      progress: 60,
      status: 'in-progress',
      prerequisites: ['arithmetic'],
      estimatedTime: '5-6 hours',
      skills: ['Shapes', 'Angles', 'Perimeter', 'Area'],
      xpReward: 275
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'mastered':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'in-progress':
        return <Circle className="h-6 w-6 text-warning" />;
      case 'available':
        return <Target className="h-6 w-6 text-primary" />;
      case 'locked':
        return <Lock className="h-6 w-6 text-muted-foreground" />;
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered':
        return 'bg-success/10 border-success/20';
      case 'in-progress':
        return 'bg-warning/10 border-warning/20';
      case 'available':
        return 'bg-primary/10 border-primary/20';
      case 'locked':
        return 'bg-muted/50 border-muted';
      default:
        return 'bg-muted/50 border-muted';
    }
  };

  const overallProgress = Math.round(
    masteryLevels.reduce((sum, level) => sum + level.progress, 0) / masteryLevels.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Trophy className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Mastery Map</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Master {subject} concepts step by step. Each skill builds on previous knowledge.
        </p>
        
        {/* Overall Progress */}
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Overall Progress</span>
                <span className="text-2xl font-bold">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{masteryLevels.filter(l => l.status === 'mastered').length} mastered</span>
                <span>{masteryLevels.filter(l => l.status === 'in-progress').length} in progress</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mastery Path */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {masteryLevels.map((level, index) => (
          <Card 
            key={level.id} 
            className={`${getStatusColor(level.status)} transition-all duration-300 hover:shadow-medium ${
              level.status !== 'locked' ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
            }`}
            onClick={() => level.status !== 'locked' && onSkillSelect(level)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {getStatusIcon(level.status)}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{level.title}</h3>
                      <p className="text-muted-foreground">{level.description}</p>
                    </div>
                    {level.status !== 'locked' && (
                      <Button 
                        variant={level.status === 'mastered' ? 'outline' : 'default'}
                        size="sm"
                      >
                        {level.status === 'mastered' ? 'Review' : 'Continue'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {level.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{level.progress}%</span>
                      </div>
                      <Progress value={level.progress} className="h-2" />
                    </div>
                  )}

                  {/* Skills & Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{level.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        <span>{level.xpReward} XP</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {level.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {level.prerequisites.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Prerequisites: {level.prerequisites.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}