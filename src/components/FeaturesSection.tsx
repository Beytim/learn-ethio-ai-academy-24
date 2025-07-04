
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, BookOpen, TrendingUp, Award, Users, Clock } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Tutoring",
      description: "Get instant help from our AI tutor trained on Ethiopian curriculum. Ask questions, get explanations, and receive personalized guidance 24/7.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      description: "Access complete Grade 7-12 content aligned with Ethiopian Ministry of Education textbooks. Math, Science, English, and more subjects available.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics. Track completion rates, quiz scores, time spent, and identify areas for improvement.",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Award,
      title: "Interactive Quizzes",
      description: "Test your knowledge with engaging quizzes. Get instant feedback, detailed explanations, and track your performance over time.",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: Users,
      title: "Multi-Role Support",
      description: "Built for students, teachers, and administrators. Teachers can track class progress, assign work, and monitor student performance.",
      color: "text-primary-glow",
      bgColor: "bg-primary-glow/10"
    },
    {
      icon: Clock,
      title: "Learn at Your Pace",
      description: "Self-paced learning that adapts to your schedule. Access lessons anytime, anywhere, from any device with our mobile-friendly platform.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-gradient-primary text-primary-foreground">
              🌟 Platform Features
            </Badge>
            <h2 className="text-4xl font-bold">
              Everything You Need for 
              <span className="bg-gradient-hero bg-clip-text text-transparent ml-3">
                Academic Success
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beytim Academy combines cutting-edge AI technology with comprehensive Ethiopian curriculum 
              to deliver an unparalleled learning experience for students across all grade levels.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover:shadow-medium transition-all duration-300 border border-border group"
                >
                  <div className="space-y-4">
                    <div className={`${feature.bgColor} p-3 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-xl opacity-20 transform rotate-6"></div>
              <Card className="relative overflow-hidden shadow-strong border-2 border-border">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                  alt="Students learning with Beytim Academy"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Card className="bg-card/90 backdrop-blur-sm border border-border p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-primary p-2 rounded-full">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">AI Tutor is helping 500+ students right now</p>
                        <p className="text-xs text-muted-foreground">Average response time: 2 seconds</p>
                      </div>
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    </div>
                  </Card>
                </div>
              </Card>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">10,000+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">500+</div>
              <div className="text-sm text-muted-foreground">Interactive Lessons</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">24/7</div>
              <div className="text-sm text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
