import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, Check } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const features = [
    "AI-Powered Tutoring",
    "Interactive Quizzes", 
    "Progress Tracking",
    "Ethiopian Curriculum",
    "Mobile-Friendly",
    "Multi-Language Support"
  ];

  const stats = [
    { label: "Students", value: "10,000+", icon: User },
    { label: "Lessons", value: "500+", icon: BookOpen },
    { label: "Success Rate", value: "95%", icon: Check }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-glow"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <Badge className="bg-gradient-primary text-primary-foreground shadow-soft">
                  🚀 Now with AI Tutoring
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Master Your
                  <span className="bg-gradient-hero bg-clip-text text-transparent ml-3">
                    Education
                  </span>
                  <br />
                  with AI Power
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Beytim Academy brings personalized learning to Ethiopian students with AI tutoring, 
                  interactive lessons, and comprehensive progress tracking.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-sm hover:shadow-soft transition-all duration-300"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={onGetStarted}
                  className="bg-gradient-primary hover:shadow-strong transition-all duration-300 text-lg px-8 py-3 shadow-medium"
                >
                  Start Learning Now
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-3 hover:bg-muted transition-all duration-300"
                >
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="flex justify-center">
                      <div className="bg-gradient-primary p-3 rounded-xl shadow-medium">
                        <stat.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Card className="bg-card/80 backdrop-blur-sm border border-border shadow-strong hover:shadow-strong transition-all duration-500">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Mock AI Chat Interface */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-primary p-2 rounded-full">
                          <BookOpen className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="font-semibold">AI Tutor</div>
                        <Badge variant="secondary" className="text-xs">Online</Badge>
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs ml-auto">
                          "Can you explain sets in mathematics?"
                        </div>
                        
                        <div className="bg-card rounded-lg p-3 max-w-sm shadow-soft border border-border">
                          <div className="text-sm space-y-2">
                            <p>A set is a collection of distinct objects. Let me show you with an example:</p>
                            <div className="bg-accent/10 p-2 rounded text-xs font-mono">
                              A = &#123;1, 2, 3, 4, 5&#125;
                            </div>
                            <p className="text-xs text-muted-foreground">Would you like to try a practice question?</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mock Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Chapter Progress</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>

                    {/* Mock Achievements */}
                    <div className="flex space-x-2">
                      <Badge className="bg-success text-success-foreground">Quiz Master</Badge>
                      <Badge className="bg-warning text-warning-foreground">Fast Learner</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}