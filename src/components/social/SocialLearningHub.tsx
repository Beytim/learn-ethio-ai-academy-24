import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  MessageSquare, 
  Share2, 
  Trophy,
  Star,
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  Award,
  Search,
  Filter,
  Heart,
  MessageCircle,
  Send,
  Zap
} from 'lucide-react';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  members: number;
  maxMembers: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: 'english' | 'amharic' | 'both';
  isPrivate: boolean;
  activity: 'high' | 'medium' | 'low';
  recentActivity: string;
}

interface StudyBuddy {
  id: string;
  name: string;
  avatar: string;
  grade: number;
  subjects: string[];
  studyStreak: number;
  helpfulRating: number;
  isOnline: boolean;
  compatibility: number;
  sharedSubjects: string[];
}

interface StudyPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    grade: number;
  };
  subject: string;
  title: string;
  content: string;
  type: 'question' | 'explanation' | 'resource' | 'achievement';
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const mockStudyGroups: StudyGroup[] = [
  {
    id: 'sg1',
    name: 'Grade 9 Math Masters',
    description: 'Focused group for mastering algebraic concepts and geometry',
    subject: 'Mathematics',
    members: 24,
    maxMembers: 30,
    level: 'intermediate',
    language: 'both',
    isPrivate: false,
    activity: 'high',
    recentActivity: '5 min ago'
  },
  {
    id: 'sg2',
    name: 'Physics Problem Solvers',
    description: 'Collaborative problem solving for Grade 10 Physics',
    subject: 'Physics',
    members: 18,
    maxMembers: 25,
    level: 'advanced',
    language: 'english',
    isPrivate: false,
    activity: 'medium',
    recentActivity: '1 hour ago'
  },
  {
    id: 'sg3',
    name: 'Ethiopian History Study Circle',
    description: 'የኢትዮጵያ ታሪክ በጋራ መማር',
    subject: 'History',
    members: 15,
    maxMembers: 20,
    level: 'beginner',
    language: 'amharic',
    isPrivate: false,
    activity: 'high',
    recentActivity: '20 min ago'
  }
];

const mockStudyBuddies: StudyBuddy[] = [
  {
    id: 'sb1',
    name: 'Meron Tadesse',
    avatar: '/api/placeholder/40/40',
    grade: 9,
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    studyStreak: 15,
    helpfulRating: 4.8,
    isOnline: true,
    compatibility: 92,
    sharedSubjects: ['Mathematics', 'Physics']
  },
  {
    id: 'sb2',
    name: 'Daniel Bekele',
    avatar: '/api/placeholder/40/40',
    grade: 10,
    subjects: ['Biology', 'Chemistry', 'English'],
    studyStreak: 8,
    helpfulRating: 4.6,
    isOnline: false,
    compatibility: 85,
    sharedSubjects: ['Chemistry']
  },
  {
    id: 'sb3',
    name: 'Sara Alemu',
    avatar: '/api/placeholder/40/40',
    grade: 9,
    subjects: ['Mathematics', 'Amharic', 'History'],
    studyStreak: 22,
    helpfulRating: 4.9,
    isOnline: true,
    compatibility: 88,
    sharedSubjects: ['Mathematics', 'History']
  }
];

const mockStudyPosts: StudyPost[] = [
  {
    id: 'sp1',
    author: {
      name: 'Yonas Mehari',
      avatar: '/api/placeholder/40/40',
      grade: 9
    },
    subject: 'Mathematics',
    title: 'Help with Quadratic Equations',
    content: 'I\'m struggling with solving quadratic equations using the quadratic formula. Can someone explain the steps clearly?',
    type: 'question',
    timestamp: '2 hours ago',
    likes: 12,
    comments: 8,
    isLiked: false,
    difficulty: 'medium'
  },
  {
    id: 'sp2',
    author: {
      name: 'Hanan Ibrahim',
      avatar: '/api/placeholder/40/40',
      grade: 10
    },
    subject: 'Physics',
    title: 'Newton\'s Laws Explained Simply',
    content: 'Here\'s a simple way to remember Newton\'s three laws of motion with everyday examples...',
    type: 'explanation',
    timestamp: '4 hours ago',
    likes: 28,
    comments: 15,
    isLiked: true,
    difficulty: 'easy'
  },
  {
    id: 'sp3',
    author: {
      name: 'Kidus Worku',
      avatar: '/api/placeholder/40/40',
      grade: 11
    },
    subject: 'Chemistry',
    title: 'Completed Organic Chemistry Unit!',
    content: 'Just finished all lessons in the Organic Chemistry unit with 95% average! The molecular structure animations really helped.',
    type: 'achievement',
    timestamp: '6 hours ago',
    likes: 45,
    comments: 12,
    isLiked: true
  }
];

interface SocialLearningHubProps {
  currentUser: {
    id: string;
    name: string;
    grade: number;
    subjects: string[];
  };
}

export function SocialLearningHub({ currentUser }: SocialLearningHubProps) {
  const [activeTab, setActiveTab] = useState<'groups' | 'buddies' | 'feed'>('feed');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [posts, setPosts] = useState(mockStudyPosts);

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'high': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'intermediate': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'question': return <MessageCircle className="h-4 w-4" />;
      case 'explanation': return <BookOpen className="h-4 w-4" />;
      case 'resource': return <Share2 className="h-4 w-4" />;
      case 'achievement': return <Trophy className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const renderStudyGroups = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search study groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="grid gap-4">
        {mockStudyGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{group.name}</h3>
                    <Badge className={getActivityColor(group.activity)}>
                      {group.activity} activity
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{group.description}</p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant="outline">{group.subject}</Badge>
                    <Badge className={getLevelColor(group.level)}>{group.level}</Badge>
                    <Badge variant="secondary">{group.language}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{group.members}/{group.maxMembers} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Active {group.recentActivity}</span>
                    </div>
                  </div>
                </div>
                
                <Button>Join Group</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStudyBuddies = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Find study buddies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Button variant="outline">
          <Target className="h-4 w-4 mr-2" />
          Match Me
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockStudyBuddies.map((buddy) => (
          <Card key={buddy.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={buddy.avatar} alt={buddy.name} />
                    <AvatarFallback>{buddy.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {buddy.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{buddy.name}</h4>
                    <Badge variant="outline">Grade {buddy.grade}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      <span>{buddy.studyStreak} day streak</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{buddy.helpfulRating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex flex-wrap gap-1">
                      {buddy.sharedSubjects.map((subject, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">
                        {buddy.compatibility}% match
                      </span>
                      <Progress value={buddy.compatibility} className="h-1 flex-1" />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                    <Button size="sm">
                      <Users className="h-3 w-3 mr-1" />
                      Add Buddy
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStudyFeed = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="default">
          <Send className="h-4 w-4 mr-2" />
          Create Post
        </Button>
        <div className="flex-1">
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{post.author.name}</h4>
                    <Badge variant="outline">Grade {post.author.grade}</Badge>
                    <Badge variant="secondary">{post.subject}</Badge>
                    <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {getPostTypeIcon(post.type)}
                      <span className="text-sm font-medium capitalize">{post.type}</span>
                    </div>
                    {post.difficulty && (
                      <Badge className={getLevelColor(post.difficulty)}>
                        {post.difficulty}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.content}</p>
                  
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikePost(post.id)}
                      className={post.isLiked ? 'text-red-500' : ''}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </Button>
                    
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Social Learning Hub
          </CardTitle>
          <p className="text-muted-foreground">
            Connect, collaborate, and learn together with your peers
          </p>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 bg-muted p-1 rounded-lg w-fit">
        {[
          { id: 'feed', label: 'Study Feed', icon: MessageSquare },
          { id: 'groups', label: 'Study Groups', icon: Users },
          { id: 'buddies', label: 'Study Buddies', icon: Target }
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
      {activeTab === 'groups' && renderStudyGroups()}
      {activeTab === 'buddies' && renderStudyBuddies()}
      {activeTab === 'feed' && renderStudyFeed()}
    </div>
  );
}