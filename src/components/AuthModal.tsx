import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, User, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as 'student' | 'teacher' | 'admin';

    try {
      await login(email, password, role);
      toast({
        title: "Welcome to Beytim Academy!",
        description: "You have successfully logged in.",
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }

    setIsLoading(false);
  };

  const demoCredentials = [
    { email: 'student@demo.com', role: 'student', name: 'Alex Johnson' },
    { email: 'teacher@demo.com', role: 'teacher', name: 'Sarah Wilson' },
    { email: 'admin@demo.com', role: 'admin', name: 'Admin User' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border border-border shadow-strong">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>Welcome to Beytim Academy</span>
          </DialogTitle>
          <DialogDescription>
            Sign in to access your personalized learning experience
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex items-center space-x-2">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Demo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <Select name="role" required>
                  <SelectTrigger className="focus:ring-primary">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border">
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-medium transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="demo" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Try Beytim Academy with these demo accounts:
            </div>
            
            <div className="space-y-3">
              {demoCredentials.map((cred, index) => (
                <Card key={index} className="p-3 hover:shadow-medium transition-all duration-300 cursor-pointer border border-border"
                      onClick={() => login(cred.email, 'demo123', cred.role as any)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{cred.name}</div>
                      <div className="text-sm text-muted-foreground">{cred.email}</div>
                    </div>
                    <div className="text-xs bg-muted px-2 py-1 rounded-md capitalize">
                      {cred.role}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-xs text-muted-foreground text-center">
              Click any card above to login as that user
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}