import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Target, 
  Brain, 
  Star, 
  Zap, 
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Lightbulb
} from "lucide-react";

interface LearningNode {
  id: string;
  title: string;
  type: 'concept' | 'practice' | 'assessment' | 'project';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  prerequisite?: string[];
  mastered: boolean;
  attempted: boolean;
  score?: number;
  recommendations: string[];
}

interface StudentProfile {
  id: string;
  name: string;
  grade: number;
  subject: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  strengths: string[];
  weaknesses: string[];
  currentLevel: number;
  masteredConcepts: string[];
  strugglingConcepts: string[];
  preferredPace: 'slow' | 'moderate' | 'fast';
}

interface AdaptiveLearningPathProps {
  studentProfile: StudentProfile;
  currentTopic: string;
  onSelectNode: (node: LearningNode) => void;
}

export function AdaptiveLearningPath({ 
  studentProfile, 
  currentTopic, 
  onSelectNode 
}: AdaptiveLearningPathProps) {
  const [learningPath, setLearningPath] = useState<LearningNode[]>([]);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [adaptiveRecommendations, setAdaptiveRecommendations] = useState<string[]>([]);

  // Ethiopian curriculum-aligned learning nodes for Set Theory
  const generateLearningPath = (): LearningNode[] => {
    const baseNodes: LearningNode[] = [
      {
        id: "intro_sets",
        title: "Introduction to Sets",
        type: "concept",
        difficulty: "easy",
        estimatedTime: 15,
        mastered: studentProfile.masteredConcepts.includes("intro_sets"),
        attempted: true,
        score: 85,
        recommendations: [
          "Watch the introductory video about sets",
          "Practice identifying sets in daily life",
          "Complete the basic set notation exercises"
        ]
      },
      {
        id: "set_notation",
        title: "Set Notation and Symbols",
        type: "concept",
        difficulty: "easy",
        estimatedTime: 20,
        prerequisite: ["intro_sets"],
        mastered: studentProfile.masteredConcepts.includes("set_notation"),
        attempted: true,
        score: 78,
        recommendations: [
          "Practice writing sets using proper notation",
          "Learn the Ethiopian mathematical symbols for sets",
          "Complete set-builder notation exercises"
        ]
      },
      {
        id: "types_of_sets",
        title: "Types of Sets",
        type: "concept",
        difficulty: "medium",
        estimatedTime: 25,
        prerequisite: ["set_notation"],
        mastered: false,
        attempted: false,
        recommendations: [
          "Study finite, infinite, and empty sets",
          "Practice identifying different types of sets",
          "Work through Ethiopian curriculum examples"
        ]
      },
      {
        id: "set_operations",
        title: "Set Operations (Union, Intersection)",
        type: "practice",
        difficulty: "medium",
        estimatedTime: 30,
        prerequisite: ["types_of_sets"],
        mastered: false,
        attempted: false,
        recommendations: [
          "Learn union and intersection operations",
          "Practice with Venn diagrams",
          "Solve real-world problems using set operations"
        ]
      },
      {
        id: "venn_diagrams",
        title: "Venn Diagrams",
        type: "practice",
        difficulty: "medium",
        estimatedTime: 35,
        prerequisite: ["set_operations"],
        mastered: false,
        attempted: false,
        recommendations: [
          "Draw and interpret Venn diagrams",
          "Solve problems using visual representations",
          "Apply to Ethiopian demographic data examples"
        ]
      },
      {
        id: "complement_difference",
        title: "Set Complement and Difference",
        type: "concept",
        difficulty: "hard",
        estimatedTime: 25,
        prerequisite: ["venn_diagrams"],
        mastered: false,
        attempted: false,
        recommendations: [
          "Master complement and difference operations",
          "Practice with complex set problems",
          "Apply De Morgan's laws"
        ]
      },
      {
        id: "practical_applications",
        title: "Practical Applications",
        type: "project",
        difficulty: "hard",
        estimatedTime: 45,
        prerequisite: ["complement_difference"],
        mastered: false,
        attempted: false,
        recommendations: [
          "Apply set theory to real Ethiopian scenarios",
          "Create a project using population data",
          "Analyze school enrollment statistics"
        ]
      },
      {
        id: "final_assessment",
        title: "Comprehensive Assessment",
        type: "assessment",
        difficulty: "hard",
        estimatedTime: 60,
        prerequisite: ["practical_applications"],
        mastered: false,
        attempted: false,
        recommendations: [
          "Complete the comprehensive set theory test",
          "Demonstrate mastery of all concepts",
          "Prepare for advanced topics"
        ]
      }
    ];

    // Adapt the path based on student profile
    return baseNodes.map(node => {
      const adaptedNode = { ...node };

      // Adjust difficulty based on student's current level
      if (studentProfile.currentLevel < 7 && node.difficulty === 'hard') {
        adaptedNode.difficulty = 'medium';
        adaptedNode.estimatedTime = Math.floor(node.estimatedTime * 1.3);
      } else if (studentProfile.currentLevel > 8 && node.difficulty === 'easy') {
        adaptedNode.difficulty = 'medium';
        adaptedNode.estimatedTime = Math.floor(node.estimatedTime * 0.8);
      }

      // Adjust based on learning style
      if (studentProfile.learningStyle === 'visual') {
        adaptedNode.recommendations = [
          ...node.recommendations,
          "Use visual aids and diagrams",
          "Watch concept visualization videos"
        ];
      } else if (studentProfile.learningStyle === 'auditory') {
        adaptedNode.recommendations = [
          ...node.recommendations,
          "Listen to audio explanations",
          "Discuss concepts with peers"
        ];
      }

      // Adjust based on pace preference
      if (studentProfile.preferredPace === 'fast') {
        adaptedNode.estimatedTime = Math.floor(node.estimatedTime * 0.7);
      } else if (studentProfile.preferredPace === 'slow') {
        adaptedNode.estimatedTime = Math.floor(node.estimatedTime * 1.5);
      }

      return adaptedNode;
    });
  };

  useEffect(() => {
    const path = generateLearningPath();
    setLearningPath(path);

    // Find current node based on progress
    const currentIndex = path.findIndex(node => !node.mastered);
    setCurrentNodeIndex(currentIndex === -1 ? path.length - 1 : currentIndex);

    // Generate adaptive recommendations
    generateAdaptiveRecommendations(path, currentIndex);
  }, [studentProfile]);

  const generateAdaptiveRecommendations = (path: LearningNode[], currentIndex: number) => {
    const recommendations = [];

    // Based on weaknesses
    if (studentProfile.weaknesses.includes('Set Operations')) {
      recommendations.push("Focus extra time on set operations practice");
      recommendations.push("Use the interactive Venn diagram tool");
    }

    // Based on learning style
    if (studentProfile.learningStyle === 'visual') {
      recommendations.push("Use color-coded diagrams for different set operations");
    } else if (studentProfile.learningStyle === 'kinesthetic') {
      recommendations.push("Use physical objects to represent sets");
    }

    // Based on progress
    const masteredCount = path.filter(node => node.mastered).length;
    const progressPercentage = (masteredCount / path.length) * 100;
    
    if (progressPercentage < 30) {
      recommendations.push("Take your time with fundamentals - they're crucial for success");
    } else if (progressPercentage > 70) {
      recommendations.push("Great progress! Consider challenging yourself with advanced problems");
    }

    setAdaptiveRecommendations(recommendations);
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'assessment': return <Award className="h-4 w-4" />;
      case 'project': return <Lightbulb className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getNodeColor = (node: LearningNode) => {
    if (node.mastered) return 'border-success bg-success/10';
    if (node.attempted) return 'border-warning bg-warning/10';
    return 'border-muted bg-muted/10';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalTime = learningPath.reduce((total, node) => total + node.estimatedTime, 0);
  const completedTime = learningPath
    .filter(node => node.mastered)
    .reduce((total, node) => total + node.estimatedTime, 0);
  const progressPercentage = totalTime > 0 ? (completedTime / totalTime) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Your Adaptive Learning Path - {currentTopic}
          </CardTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Grade {studentProfile.grade} Ethiopian Curriculum</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-success">
                {learningPath.filter(node => node.mastered).length}
              </div>
              <div className="text-sm text-muted-foreground">Mastered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">
                {learningPath.filter(node => node.attempted && !node.mastered).length}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-muted-foreground">
                {Math.floor(totalTime / 60)}h {totalTime % 60}m
              </div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Adaptive Recommendations */}
      {adaptiveRecommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {adaptiveRecommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start">
                  <Zap className="h-4 w-4 mr-2 mt-0.5 text-accent" />
                  <span className="text-sm">{recommendation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Path Nodes */}
      <Card>
        <CardHeader>
          <CardTitle>Your Learning Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPath.map((node, index) => (
              <div key={node.id} className="relative">
                {/* Connection Line */}
                {index < learningPath.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-8 bg-border"></div>
                )}
                
                <div 
                  className={`border-2 rounded-lg p-4 transition-all duration-300 hover:shadow-medium cursor-pointer ${getNodeColor(node)} ${
                    index === currentNodeIndex ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  onClick={() => onSelectNode(node)}
                >
                  <div className="flex items-start space-x-4">
                    {/* Node Icon */}
                    <div className={`p-2 rounded-full ${
                      node.mastered ? 'bg-success text-success-foreground' :
                      node.attempted ? 'bg-warning text-warning-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {node.mastered ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        getNodeIcon(node.type)
                      )}
                    </div>

                    {/* Node Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{node.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getDifficultyColor(node.difficulty)}>
                            {node.difficulty}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {node.estimatedTime}m
                          </div>
                        </div>
                      </div>

                      {/* Score display */}
                      {node.score && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Your Score</span>
                            <span className="font-semibold">{node.score}%</span>
                          </div>
                          <Progress value={node.score} className="h-1" />
                        </div>
                      )}

                      {/* Node Type Badge */}
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {node.type}
                        </Badge>
                        
                        {/* Prerequisites warning */}
                        {node.prerequisite && node.prerequisite.some(prereq => 
                          !learningPath.find(n => n.id === prereq)?.mastered
                        ) && (
                          <div className="flex items-center text-warning text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Prerequisites needed
                          </div>
                        )}
                      </div>

                      {/* Current node indicator */}
                      {index === currentNodeIndex && !node.mastered && (
                        <div className="mt-2 flex items-center text-primary text-sm font-medium">
                          <ArrowRight className="h-3 w-3 mr-1" />
                          Recommended next step
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recommendations */}
                  {index === currentNodeIndex && node.recommendations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-medium text-sm mb-2">Recommendations:</h4>
                      <ul className="space-y-1">
                        {node.recommendations.slice(0, 3).map((rec, recIndex) => (
                          <li key={recIndex} className="text-xs text-muted-foreground flex items-start">
                            <Star className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}