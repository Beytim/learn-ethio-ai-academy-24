import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { BookOpen, Users, Award, Target, Heart, Lightbulb, Globe, Zap } from "lucide-react";

export default function About() {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: "Curriculum-Aligned",
      description: "Content based on Ethiopian Ministry of Education textbooks"
    },
    {
      icon: Zap,
      title: "AI-Powered Tutoring",
      description: "Get instant help and explanations from our intelligent AI tutor"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect with classmates and teachers in a supportive environment"
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and badges"
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description: "Adaptive content that adjusts to your learning pace and style"
    },
    {
      icon: Globe,
      title: "Accessible Anywhere",
      description: "Learn from anywhere with our mobile-friendly platform"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Students" },
    { number: "500+", label: "Lessons Available" },
    { number: "95%", label: "Student Success Rate" },
    { number: "24/7", label: "AI Tutor Support" }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Educational Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "Former educator with 15 years of experience in curriculum development"
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "AI specialist focused on educational technology and machine learning"
    },
    {
      name: "Aisha Patel",
      role: "UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Designer passionate about creating intuitive learning experiences"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={() => logout()}
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold animate-slide-up">
              About Beytim Academy
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 animate-slide-up">
              Empowering Ethiopian students with world-class education through innovative AI-powered learning
            </p>
            <div className="flex items-center justify-center space-x-8 pt-8">
              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto mb-2 text-red-400" />
                <p className="text-sm">Made with Love</p>
              </div>
              <div className="text-center">
                <Lightbulb className="h-12 w-12 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm">Innovation First</p>
              </div>
              <div className="text-center">
                <Globe className="h-12 w-12 mx-auto mb-2 text-blue-400" />
                <p className="text-sm">Global Standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Statement */}
        <Card className="mb-16 shadow-strong">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-8">
              At Beytim Academy, we believe every Ethiopian student deserves access to quality education. 
              Our mission is to bridge the educational gap by providing innovative, AI-powered learning experiences 
              that are aligned with the Ethiopian curriculum and designed to inspire lifelong learning.
            </p>
            <div className="grid md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Beytim Academy?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-medium hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-medium hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-4">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <Card className="bg-gradient-secondary text-primary-foreground shadow-strong">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="bg-primary-foreground/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Excellence</h3>
                <p className="text-primary-foreground/80">Striving for the highest quality in education</p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary-foreground/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Inclusion</h3>
                <p className="text-primary-foreground/80">Making education accessible to every student</p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary-foreground/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p className="text-primary-foreground/80">Using cutting-edge technology for learning</p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-primary-foreground/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Empathy</h3>
                <p className="text-primary-foreground/80">Understanding and supporting every learner</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their education with Beytim Academy
          </p>
          <Button size="lg" className="px-8 py-3 text-lg">
            Get Started Today
          </Button>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
