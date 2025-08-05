
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SocialLearningHub } from "@/components/social/SocialLearningHub";
import { 
  Users, 
  MessageCircle, 
  BookOpen, 
  Trophy, 
  Plus, 
  Search,
  Clock,
  Star,
  MessageSquare,
  Heart,
  Share2,
  Filter
} from "lucide-react";

const SocialLearning = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const studyGroups = [
    {
      id: 1,
      name: "Grade 9 Mathematics",
      subject: "Mathematics",
      members: 24,
      activity: "2 hours ago",
      description: "Study group for Grade 9 mathematics curriculum",
      isJoined: true
    },
    {
      id: 2,
      name: "Chemistry Lab Partners",
      subject: "Chemistry", 
      members: 12,
      activity: "5 hours ago",
      description: "Collaborative chemistry experiments and discussions",
      isJoined: false
    },
    {
      id: 3,
      name: "English Literature Circle",
      subject: "English",
      members: 18,
      activity: "1 day ago", 
      description: "Analyzing literature and improving writing skills",
      isJoined: true
    }
  ];

  const forumPosts = [
    {
      id: 1,
      author: "የማነ ታደሰ",
      avatar: "/avatars/user1.jpg",
      subject: "Mathematics",
      title: "Help with Quadratic Equations",
      content: "I'm struggling with solving quadratic equations using the quadratic formula. Can someone explain the steps clearly?",
      timestamp: "2 hours ago",
      likes: 12,
      comments: 8,
      isLiked: false
    },
    {
      id: 2,
      author: "ሳራ አበባ",
      avatar: "/avatars/user2.jpg", 
      subject: "Chemistry",
      title: "Chemical Bonding Study Notes",
      content: "I've compiled comprehensive notes on chemical bonding. Feel free to use them for your studies!",
      timestamp: "4 hours ago",
      likes: 28,
      comments: 15,
      isLiked: true
    },
    {
      id: 3,
      author: "ዳዊት መሀሪ",
      avatar: "/avatars/user3.jpg",
      subject: "Physics", 
      title: "Physics Lab Report Template",
      content: "Here's a template I created for physics lab reports that follows our school's format requirements.",
      timestamp: "1 day ago",
      likes: 19,
      comments: 6,
      isLiked: false
    }
  ];

  const leaderboard = [
    { rank: 1, name: "አዳነች ገ/እግዚአብሔር", points: 2450, badge: "🏆" },
    { rank: 2, name: "መሳይ ዮሴፍ", points: 2340, badge: "🥈" },
    { rank: 3, name: "ቢንያም ተስፋዬ", points: 2180, badge: "🥉" },
    { rank: 4, name: "ሄኖክ አዳም", points: 2050, badge: "⭐" },
    { rank: 5, name: "ረሃብ ሳሙኤል", points: 1980, badge: "⭐" }
  ];

  const createPost = () => {
    if (newPostContent.trim()) {
      // Add new post logic here
      console.log('Creating post:', newPostContent);
      setNewPostContent('');
      setShowNewPost(false);
    }
  };

  const toggleLike = (postId: number) => {
    console.log('Toggling like for post:', postId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => navigate('/auth')}
        onLogout={() => navigate('/')}
      />

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">
            Social <span className="bg-gradient-hero bg-clip-text text-transparent">Learning</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect, collaborate, and learn together with fellow Ethiopian students. Share knowledge, form study groups, and grow together.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted p-1 rounded-lg">
            {[
              { id: 'feed', label: 'Community Feed', icon: MessageCircle },
              { id: 'groups', label: 'Study Groups', icon: Users },
              { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className="mx-1"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Community Feed Tab */}
        {activeTab === 'feed' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button 
                      variant="outline" 
                      className="flex-1 justify-start text-muted-foreground"
                      onClick={() => setShowNewPost(true)}
                    >
                      Share your knowledge or ask a question...
                    </Button>
                  </div>
                  
                  {showNewPost && (
                    <div className="space-y-4 border-t pt-4">
                      <Textarea
                        placeholder="What would you like to share with the community?"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">General Discussion</Badge>
                        <div className="space-x-2">
                          <Button variant="outline" onClick={() => setShowNewPost(false)}>
                            Cancel
                          </Button>
                          <Button onClick={createPost}>
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Forum Posts */}
              <div className="space-y-4">
                {forumPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-medium transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{post.author}</h4>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Badge variant="outline">{post.subject}</Badge>
                                <span>•</span>
                                <span>{post.timestamp}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium text-lg mb-2">{post.title}</h3>
                            <p className="text-muted-foreground">{post.content}</p>
                          </div>
                          
                          <div className="flex items-center space-x-6 pt-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleLike(post.id)}
                              className={post.isLiked ? "text-red-500" : ""}
                            >
                              <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
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

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Active Study Groups */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>My Study Groups</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {studyGroups.filter(group => group.isJoined).map((group) => (
                    <div key={group.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">{group.name}</h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                        <span>{group.members} members</span>
                        <span>{group.activity}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Join More Groups
                  </Button>
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Top Contributors</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboard.slice(0, 3).map((user) => (
                    <div key={user.rank} className="flex items-center space-x-3">
                      <span className="text-lg">{user.badge}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.points} points</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Study Groups Tab */}
        {activeTab === 'groups' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search study groups..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {studyGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-medium transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{group.name}</h3>
                          <Badge variant="outline" className="mt-1">{group.subject}</Badge>
                        </div>
                        <Badge variant={group.isJoined ? "default" : "secondary"}>
                          {group.isJoined ? "Joined" : "Available"}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground text-sm">{group.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{group.members} members</span>
                          <span>•</span>
                          <span>Active {group.activity}</span>
                        </div>
                        <Button size="sm" variant={group.isJoined ? "outline" : "default"}>
                          {group.isJoined ? "View Group" : "Join Group"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  <Trophy className="h-6 w-6 mx-auto mb-2" />
                  Community Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{user.badge}</span>
                        <div className="font-bold text-lg text-muted-foreground">#{user.rank}</div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.points} contribution points</p>
                      </div>
                      {user.rank <= 3 && (
                        <Badge variant="default">Top Contributor</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialLearning;
