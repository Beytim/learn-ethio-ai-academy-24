
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  FileText, 
  Video, 
  Image, 
  Save,
  Eye,
  Calendar,
  Tag
} from "lucide-react";

const ContentManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const contentItems = [
    {
      id: 1,
      title: "Introduction to Algebra",
      type: "lesson",
      subject: "Mathematics",
      grade: 9,
      status: "published",
      created: "2024-01-15",
      views: 1250
    },
    {
      id: 2,
      title: "Chemical Reactions Video",
      type: "video",
      subject: "Chemistry",
      grade: 10,
      status: "draft",
      created: "2024-01-10",
      views: 0
    },
    {
      id: 3,
      title: "Physics Practice Test",
      type: "test",
      subject: "Physics",
      grade: 11,
      status: "published",
      created: "2024-01-05",
      views: 890
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'test': return <Edit className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => navigate('/auth')}
        onLogout={() => navigate('/')}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Content <span className="bg-gradient-hero bg-clip-text text-transparent">Management</span>
              </h1>
              <p className="text-xl text-muted-foreground">Create and manage educational content</p>
            </div>
            <Button className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </div>

          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content Library</TabsTrigger>
              <TabsTrigger value="editor">Content Editor</TabsTrigger>
              <TabsTrigger value="media">Media Upload</TabsTrigger>
              <TabsTrigger value="publishing">Publishing</TabsTrigger>
            </TabsList>

            {/* Content Library */}
            <TabsContent value="content" className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <Input placeholder="Search content..." className="max-w-md" />
                <select className="px-3 py-2 border border-input bg-background rounded-md">
                  <option>All Types</option>
                  <option>Lessons</option>
                  <option>Videos</option>
                  <option>Tests</option>
                </select>
                <select className="px-3 py-2 border border-input bg-background rounded-md">
                  <option>All Subjects</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
              </div>

              <div className="grid gap-4">
                {contentItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-medium transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <span>{item.subject} • Grade {item.grade}</span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{item.created}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{item.views} views</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Content Editor */}
            <TabsContent value="editor" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Content Editor</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input placeholder="Enter content title..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <select className="w-full px-3 py-2 border border-input bg-background rounded-md">
                        <option>Select subject...</option>
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Grade Level</label>
                      <select className="w-full px-3 py-2 border border-input bg-background rounded-md">
                        <option>Select grade...</option>
                        <option>Grade 7</option>
                        <option>Grade 8</option>
                        <option>Grade 9</option>
                        <option>Grade 10</option>
                        <option>Grade 11</option>
                        <option>Grade 12</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Content Type</label>
                      <select className="w-full px-3 py-2 border border-input bg-background rounded-md">
                        <option>Select type...</option>
                        <option>Lesson</option>
                        <option>Video</option>
                        <option>Practice Test</option>
                        <option>Quiz</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      className="w-full h-64 p-3 border border-input bg-background rounded-md resize-none"
                      placeholder="Enter your content here..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button className="bg-gradient-primary">
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media Upload */}
            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Media Upload</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Media Files</h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop files here, or click to browse
                    </p>
                    <Button variant="outline">
                      Choose Files
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Supports: Images (JPG, PNG, GIF), Videos (MP4, MOV), Documents (PDF, DOC)
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="bg-blue-100 p-3 rounded-lg mb-3">
                        <Image className="h-8 w-8 text-blue-600 mx-auto" />
                      </div>
                      <h4 className="font-medium text-center">Images</h4>
                      <p className="text-sm text-muted-foreground text-center">
                        Upload diagrams, charts, and illustrations
                      </p>
                    </Card>

                    <Card className="p-4">
                      <div className="bg-green-100 p-3 rounded-lg mb-3">
                        <Video className="h-8 w-8 text-green-600 mx-auto" />
                      </div>
                      <h4 className="font-medium text-center">Videos</h4>
                      <p className="text-sm text-muted-foreground text-center">
                        Upload educational videos and tutorials
                      </p>
                    </Card>

                    <Card className="p-4">
                      <div className="bg-purple-100 p-3 rounded-lg mb-3">
                        <FileText className="h-8 w-8 text-purple-600 mx-auto" />
                      </div>
                      <h4 className="font-medium text-center">Documents</h4>
                      <p className="text-sm text-muted-foreground text-center">
                        Upload PDFs and reference materials
                      </p>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Publishing Tools */}
            <TabsContent value="publishing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publishing Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Publication Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Auto-publish</span>
                          <input type="checkbox" className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Allow comments</span>
                          <input type="checkbox" className="rounded" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Enable ratings</span>
                          <input type="checkbox" className="rounded" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Content Tags</h3>
                      <div className="space-y-2">
                        <Input placeholder="Add tags..." />
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">
                            <Tag className="h-3 w-3 mr-1" />
                            algebra
                          </Badge>
                          <Badge variant="outline">
                            <Tag className="h-3 w-3 mr-1" />
                            grade-9
                          </Badge>
                          <Badge variant="outline">
                            <Tag className="h-3 w-3 mr-1" />
                            mathematics
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Button className="bg-gradient-primary">
                      Publish Now
                    </Button>
                    <Button variant="outline">
                      Schedule Publication
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
