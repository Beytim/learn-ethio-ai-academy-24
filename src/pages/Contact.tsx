import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HeadphonesIcon, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    userType: "student"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      userType: "student"
    });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@beytimacademy.com",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate help",
      contact: "+251-11-xxx-xxxx",
      action: "Call Now"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 9 AM - 6 PM",
      action: "Start Chat"
    }
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email."
    },
    {
      question: "Can I access lessons offline?",
      answer: "Currently, an internet connection is required to access lessons and interact with the AI tutor."
    },
    {
      question: "How does the AI tutor work?",
      answer: "Our AI tutor uses advanced machine learning to provide personalized explanations and answer your questions based on the curriculum."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes! Our platform is fully responsive and works great on mobile devices. A dedicated app is coming soon."
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
      <div className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold animate-slide-up">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-slide-up">
              We're here to help you succeed. Reach out with any questions or feedback.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="group hover:shadow-medium hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="text-center">
                <method.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">{method.title}</CardTitle>
                <p className="text-muted-foreground">{method.description}</p>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="font-medium">{method.contact}</p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Send us a Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userType">I am a...</Label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="parent">Parent</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ and Info */}
          <div className="space-y-8">
            {/* Office Info */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Visit Our Office</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Beytim Academy Headquarters</p>
                  <p className="text-muted-foreground">
                    Bole Road, Addis Ababa<br />
                    Ethiopia, East Africa
                  </p>
                </div>
                
                <div className="flex items-start space-x-3 pt-4 border-t">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-4 border-t">
                  <HeadphonesIcon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Support Hours</p>
                    <p className="text-sm text-muted-foreground">
                      24/7 AI Tutor Support<br />
                      Live Chat: 9 AM - 6 PM (Mon-Fri)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div key={index} className="space-y-2 pb-4 border-b last:border-b-0">
                    <h4 className="font-medium text-sm">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-secondary text-primary-foreground shadow-medium">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <Users className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">24hr</div>
                    <div className="text-sm opacity-90">Response Time</div>
                  </div>
                  <div>
                    <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm opacity-90">Satisfaction Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
