
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { AuthModal } from "@/components/AuthModal";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp,
  Star,
  Clock,
  Target,
  Brain,
  Zap,
  Shield
} from "lucide-react";

const Index = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={() => logout()}
      />

      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Students Worldwide</h2>
            <p className="text-xl text-muted-foreground">Join thousands of learners achieving their academic goals</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Lessons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Enhanced Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Learning Platform</h2>
            <p className="text-xl text-muted-foreground">Everything you need for academic success</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI-Powered Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Personalized learning paths powered by advanced AI that adapts to your learning style and pace.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Interactive Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Thousands of practice problems with instant feedback and detailed explanations.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Comprehensive analytics to track your progress and identify areas for improvement.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Social Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Connect with peers, join study groups, and learn collaboratively.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Flexible Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Study planner and calendar integration to manage your learning schedule effectively.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Earn certificates and badges as you complete courses and reach milestones.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who are already succeeding with Beytim Academy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-white text-primary hover:bg-gray-100"
            >
              Start Learning Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/about')}
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Learn More
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Instant access</span>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Index;
