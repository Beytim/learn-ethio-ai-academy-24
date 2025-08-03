import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Route, 
  CheckCircle, 
  Circle, 
  Star, 
  Clock,
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  Award,
  Zap,
  Users,
  ArrowRight
} from 'lucide-react';

interface LearningNode {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'practice' | 'assessment' | 'project';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  prerequisites: string[];
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  score?: number;
  masteryLevel?: number;
  aiRecommendation?: string;
}

interface LearningPath {
  id: string;
  subject: string;
  topic: string;
  nodes: LearningNode[];
  overallProgress: number;
  adaptiveInsights: string[];
}

interface AdaptiveLearningPathProps {
  studentId: string;
  currentPath: LearningPath;
  onNodeSelect: (nodeId: string) => void;
  onPathUpdate: (pathId: string) => void;
}

export function AdaptiveLearningPath({ 
  studentId, 
  currentPath, 
  onNodeSelect, 
  onPathUpdate 
}: AdaptiveLearningPathProps) {
  const [selectedNode, setSelectedNode] = useState<LearningNode | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getNodeIcon = (type: LearningNode['type'], status: LearningNode['status']) => {
    const iconClass = "h-6 w-6";
    
    if (status === 'completed') {
      return <CheckCircle className={`${iconClass} text-green-600`} />;
    }
    
    if (status === 'locked') {
      return <Circle className={`${iconClass} text-gray-400`} />;
    }

    switch (type) {
      case 'concept':
        return <BookOpen className={`${iconClass} text-blue-600`} />;
      case 'practice':
        return <Target className={`${iconClass} text-orange-600`} />;
      case 'assessment':
        return <Award className={`${iconClass} text-purple-600`} />;
      case 'project':
        return <Star className={`${iconClass} text-yellow-600`} />;
      default:
        return <Circle className={`${iconClass} text-gray-400`} />;
    }
  };

  const getDifficultyColor = (difficulty: LearningNode['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: LearningNode['status']) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-50';
      case 'in-progress': return 'border-blue-500 bg-blue-50';
      case 'available': return 'border-orange-500 bg-orange-50';
      case 'locked': return 'border-gray-300 bg-gray-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const completedNodes = currentPath.nodes.filter(node => node.status === 'completed').length;
  const totalNodes = currentPath.nodes.length;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const generateRecommendations = () => {
    const availableNodes = currentPath.nodes.filter(node => node.status === 'available');
    const recommendations = [];

    if (availableNodes.length > 0) {
      const easiestNode = availableNodes.reduce((prev, current) => 
        prev.difficulty === 'beginner' ? prev : current
      );
      recommendations.push(`Start with "${easiestNode.title}" - it's a great foundation`);
    }

    const lowScoreNodes = currentPath.nodes.filter(node => 
      node.status === 'completed' && node.score && node.score < 70
    );
    if (lowScoreNodes.length > 0) {
      recommendations.push(`Review "${lowScoreNodes[0].title}" to strengthen your understanding`);
    }

    return recommendations;
  };

  return (
    <div className="space-y-6">
      {/* Path Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-6 w-6 text-primary" />
            Adaptive Learning Path: {currentPath.topic}
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">{currentPath.subject}</p>
            <Badge variant="secondary">
              {completedNodes}/{totalNodes} completed
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(currentPath.overallProgress)}%</span>
            </div>
            <Progress value={currentPath.overallProgress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Path Visualization */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Learning Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentPath.nodes.map((node, index) => (
                  <div key={node.id} className="relative">
                    {/* Connection Line */}
                    {index < currentPath.nodes.length - 1 && (
                      <div className="absolute left-8 top-16 w-0.5 h-8 bg-border" />
                    )}
                    
                    {/* Node Card */}
                    <div 
                      className={`relative flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${getStatusColor(node.status)} ${
                        selectedNode?.id === node.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => {
                        setSelectedNode(node);
                        setShowDetails(true);
                        if (node.status !== 'locked') {
                          onNodeSelect(node.id);
                        }
                      }}
                    >
                      {/* Node Icon */}
                      <div className="flex-shrink-0">
                        {getNodeIcon(node.type, node.status)}
                      </div>

                      {/* Node Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold truncate">{node.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={getDifficultyColor(node.difficulty)}
                          >
                            {node.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {node.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTime(node.estimatedTime)}</span>
                          </div>
                          {node.score && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              <span>{node.score}%</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="flex-shrink-0">
                        {node.status === 'completed' && node.masteryLevel && (
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600">
                              {node.masteryLevel}% mastery
                            </div>
                          </div>
                        )}
                        {node.status === 'available' && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* AI Recommendation */}
                    {node.aiRecommendation && node.status === 'available' && (
                      <div className="ml-12 mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                        <div className="flex items-center gap-1 mb-1">
                          <Brain className="h-3 w-3" />
                          <span className="font-medium">AI Recommendation</span>
                        </div>
                        {node.aiRecommendation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {generateRecommendations().map((insight, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">{insight}</p>
                </div>
              ))}
              {currentPath.adaptiveInsights.map((insight, index) => (
                <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">{insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Concepts Mastered</span>
                  <span>{currentPath.nodes.filter(n => n.type === 'concept' && n.status === 'completed').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Practice Exercises</span>
                  <span>{currentPath.nodes.filter(n => n.type === 'practice' && n.status === 'completed').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Assessments Passed</span>
                  <span>{currentPath.nodes.filter(n => n.type === 'assessment' && n.status === 'completed').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Projects Completed</span>
                  <span>{currentPath.nodes.filter(n => n.type === 'project' && n.status === 'completed').length}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm font-medium">
                  <span>Total Time Invested</span>
                  <span>
                    {formatTime(
                      currentPath.nodes
                        .filter(n => n.status === 'completed')
                        .reduce((sum, n) => sum + n.estimatedTime, 0)
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => onPathUpdate(currentPath.id)}
              >
                <Brain className="h-4 w-4 mr-2" />
                Get AI Recommendations
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
              >
                <Users className="h-4 w-4 mr-2" />
                Find Study Partners
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
              >
                <Award className="h-4 w-4 mr-2" />
                View Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Node Details Modal */}
      {showDetails && selectedNode && (
        <Card className="fixed inset-x-4 bottom-4 z-50 max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getNodeIcon(selectedNode.type, selectedNode.status)}
                {selectedNode.title}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowDetails(false)}
              >
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedNode.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Type:</span> {selectedNode.type}
                </div>
                <div>
                  <span className="font-medium">Difficulty:</span> {selectedNode.difficulty}
                </div>
                <div>
                  <span className="font-medium">Est. Time:</span> {formatTime(selectedNode.estimatedTime)}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {selectedNode.status}
                </div>
              </div>

              {selectedNode.prerequisites.length > 0 && (
                <div>
                  <span className="font-medium">Prerequisites:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedNode.prerequisites.map((prereq, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.status !== 'locked' && (
                <Button 
                  onClick={() => {
                    onNodeSelect(selectedNode.id);
                    setShowDetails(false);
                  }}
                  className="w-full"
                >
                  {selectedNode.status === 'completed' ? 'Review' : 'Start Learning'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}