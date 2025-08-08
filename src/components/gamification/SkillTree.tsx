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
  Zap,
  Crown,
  Gem,
  Target
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  progress: number;
  status: 'locked' | 'available' | 'in-progress' | 'mastered';
  prerequisites: string[];
  xpReward: number;
  energyCost: number;
  position: { x: number; y: number };
}

interface SkillTreeProps {
  subject: string;
  userLevel: number;
  userEnergy: number;
  onSkillSelect: (skill: Skill) => void;
}

export function SkillTree({ subject, userLevel, userEnergy, onSkillSelect }: SkillTreeProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    {
      id: 'counting',
      name: 'Counting',
      description: 'Learn to count from 1 to 100',
      level: 5,
      maxLevel: 5,
      progress: 100,
      status: 'mastered',
      prerequisites: [],
      xpReward: 50,
      energyCost: 10,
      position: { x: 2, y: 0 }
    },
    {
      id: 'addition',
      name: 'Addition',
      description: 'Master single and multi-digit addition',
      level: 3,
      maxLevel: 5,
      progress: 60,
      status: 'in-progress',
      prerequisites: ['counting'],
      xpReward: 75,
      energyCost: 15,
      position: { x: 1, y: 1 }
    },
    {
      id: 'subtraction',
      name: 'Subtraction',
      description: 'Learn subtraction with and without regrouping',
      level: 3,
      maxLevel: 5,
      progress: 60,
      status: 'in-progress',
      prerequisites: ['counting'],
      xpReward: 75,
      energyCost: 15,
      position: { x: 3, y: 1 }
    },
    {
      id: 'multiplication',
      name: 'Multiplication',
      description: 'Times tables and multi-digit multiplication',
      level: 0,
      maxLevel: 5,
      progress: 0,
      status: 'available',
      prerequisites: ['addition'],
      xpReward: 100,
      energyCost: 20,
      position: { x: 0, y: 2 }
    },
    {
      id: 'division',
      name: 'Division',
      description: 'Long division and remainders',
      level: 0,
      maxLevel: 5,
      progress: 0,
      status: 'available',
      prerequisites: ['subtraction'],
      xpReward: 100,
      energyCost: 20,
      position: { x: 4, y: 2 }
    },
    {
      id: 'fractions',
      name: 'Fractions',
      description: 'Understanding parts of a whole',
      level: 0,
      maxLevel: 5,
      progress: 0,
      status: 'locked',
      prerequisites: ['multiplication', 'division'],
      xpReward: 125,
      energyCost: 25,
      position: { x: 2, y: 3 }
    }
  ];

  const getSkillIcon = (skill: Skill) => {
    switch (skill.status) {
      case 'mastered':
        return <Crown className="h-6 w-6 text-warning" />;
      case 'in-progress':
        return <Star className="h-6 w-6 text-primary" />;
      case 'available':
        return <Target className="h-6 w-6 text-accent" />;
      case 'locked':
        return <Lock className="h-6 w-6 text-muted-foreground" />;
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getSkillBorderColor = (skill: Skill) => {
    switch (skill.status) {
      case 'mastered':
        return 'border-warning shadow-warning/20';
      case 'in-progress':
        return 'border-primary shadow-primary/20';
      case 'available':
        return 'border-accent shadow-accent/20';
      case 'locked':
        return 'border-muted';
      default:
        return 'border-muted';
    }
  };

  const canAffordSkill = (skill: Skill) => {
    return userEnergy >= skill.energyCost && skill.status !== 'locked';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Gem className="h-8 w-8 text-primary" />
          {subject} Skill Tree
        </h1>
        <p className="text-muted-foreground">
          Master skills in order to unlock new challenges
        </p>
      </div>

      {/* Energy Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              <span className="font-medium">Energy</span>
            </div>
            <span className="text-sm font-bold">{userEnergy}/100</span>
          </div>
          <Progress value={userEnergy} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Energy regenerates over time. Use it wisely!
          </p>
        </CardContent>
      </Card>

      {/* Skill Tree Grid */}
      <div className="relative">
        <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={`
                col-start-${skill.position.x + 1} 
                row-start-${skill.position.y + 1}
                relative
              `}
            >
              <Card 
                className={`
                  transition-all duration-300 cursor-pointer border-2
                  ${getSkillBorderColor(skill)}
                  ${selectedSkill === skill.id ? 'scale-105 shadow-large' : 'hover:scale-102 hover:shadow-medium'}
                  ${!canAffordSkill(skill) ? 'opacity-60' : ''}
                `}
                onClick={() => {
                  setSelectedSkill(skill.id);
                  if (canAffordSkill(skill)) {
                    onSkillSelect(skill);
                  }
                }}
              >
                <CardHeader className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    {getSkillIcon(skill)}
                  </div>
                  <CardTitle className="text-sm">{skill.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    {skill.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Level {skill.level}/{skill.maxLevel}</span>
                          <span>{skill.progress}%</span>
                        </div>
                        <Progress value={skill.progress} className="h-1" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="outline" className="text-xs">
                        {skill.xpReward} XP
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>{skill.energyCost}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Lines */}
              {skill.prerequisites.map((prereqId) => {
                const prereq = skills.find(s => s.id === prereqId);
                if (!prereq) return null;
                
                return (
                  <svg
                    key={prereqId}
                    className="absolute inset-0 -z-10 pointer-events-none"
                    style={{
                      width: '100%',
                      height: '100%',
                      left: `${(prereq.position.x - skill.position.x) * 100}%`,
                      top: `${(prereq.position.y - skill.position.y) * 100}%`
                    }}
                  >
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${50 + (skill.position.x - prereq.position.x) * 100}%`}
                      y2={`${50 + (skill.position.y - prereq.position.y) * 100}%`}
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-border opacity-30"
                      strokeDasharray="5,5"
                    />
                  </svg>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Skill Details */}
      {selectedSkill && (
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            {(() => {
              const skill = skills.find(s => s.id === selectedSkill);
              if (!skill) return null;
              
              return (
                <div className="space-y-4 text-center">
                  <div>
                    {getSkillIcon(skill)}
                    <h3 className="text-xl font-bold mt-2">{skill.name}</h3>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </div>
                  
                  <div className="flex justify-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg">{skill.xpReward}</div>
                      <div className="text-muted-foreground">XP Reward</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{skill.energyCost}</div>
                      <div className="text-muted-foreground">Energy Cost</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    disabled={!canAffordSkill(skill)}
                  >
                    {skill.status === 'mastered' ? 'Review' : 
                     skill.status === 'locked' ? 'Locked' : 'Practice'}
                  </Button>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}