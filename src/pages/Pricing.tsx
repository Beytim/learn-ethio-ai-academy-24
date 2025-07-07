
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Check, Star, Crown, Zap } from "lucide-react";

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "Forever",
      description: "Perfect for trying out Beytim Academy",
      icon: Star,
      color: "text-gray-500",
      bgColor: "bg-gray-50",
      popular: false,
      features: [
        "Access to basic lessons",
        "5 AI tutor questions per day",
        "Basic progress tracking",
        "Community access",
        "Mobile app access"
      ],
      limitations: [
        "Limited video content",
        "No downloadable materials",
        "Basic support only"
      ]
    },
    {
      name: "Student",
      price: "29",
      period: "/month",
      description: "Ideal for individual students",
      icon: Zap,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      popular: true,
      features: [
        "Everything in Free",
        "Unlimited AI tutor access",
        "Full video library access",
        "Downloadable study materials",
        "Advanced analytics",
        "Priority support",
        "Offline mode",
        "Custom study plans",
        "Practice test generator"
      ],
      limitations: []
    },
    {
      name: "Family",
      price: "79",
      period: "/month",
      description: "Great for families with multiple students",
      icon: Crown,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      popular: false,
      features: [
        "Everything in Student",
        "Up to 5 student accounts",
        "Parent dashboard",
        "Progress monitoring",
        "Family calendar",
        "Bulk assignments",
        "Teacher consultation calls",
        "Priority feature requests"
      ],
      limitations: []
    }
  ];

  const handleGetStarted = (planName: string) => {
    if (planName === "Free") {
      navigate('/auth');
    } else {
      // In a real app, this would integrate with a payment processor
      console.log(`Starting ${planName} plan signup`);
      navigate('/auth');
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Choose Your <span className="bg-gradient-hero bg-clip-text text-transparent">Learning Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select the perfect plan for your educational journey. All plans include access to our AI tutor 
              and comprehensive Ethiopian curriculum.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-strong ${
                  plan.popular ? 'border-primary shadow-medium scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className={`${plan.bgColor} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                    <plan.icon className={`h-8 w-8 ${plan.color}`} />
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price === "0" ? "Free" : `$${plan.price}`}</span>
                    {plan.price !== "0" && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  
                  <Button 
                    onClick={() => handleGetStarted(plan.name)}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-primary hover:shadow-medium' 
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                    size="lg"
                  >
                    {plan.name === "Free" ? "Get Started" : "Start Free Trial"}
                  </Button>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3 text-success">✓ Included Features</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                            <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-muted-foreground">Limitations</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                              <span className="w-4 h-4 flex items-center justify-center mt-0.5">•</span>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Comparison */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Features</th>
                      <th className="text-center py-3">Free</th>
                      <th className="text-center py-3">Student</th>
                      <th className="text-center py-3">Family</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-3">AI Tutor Questions</td>
                      <td className="text-center py-3">5/day</td>
                      <td className="text-center py-3">Unlimited</td>
                      <td className="text-center py-3">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Video Lessons</td>
                      <td className="text-center py-3">Basic</td>
                      <td className="text-center py-3">Full Library</td>
                      <td className="text-center py-3">Full Library</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Student Accounts</td>
                      <td className="text-center py-3">1</td>
                      <td className="text-center py-3">1</td>
                      <td className="text-center py-3">5</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Offline Downloads</td>
                      <td className="text-center py-3">❌</td>
                      <td className="text-center py-3">✅</td>
                      <td className="text-center py-3">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Parent Dashboard</td>
                      <td className="text-center py-3">❌</td>
                      <td className="text-center py-3">❌</td>
                      <td className="text-center py-3">✅</td>
                    </tr>
                    <tr>
                      <td className="py-3">Priority Support</td>
                      <td className="text-center py-3">❌</td>
                      <td className="text-center py-3">✅</td>
                      <td className="text-center py-3">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I change plans later?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately,
                    and we'll prorate any billing adjustments.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                  <p className="text-muted-foreground text-sm">
                    All paid plans come with a 7-day free trial. No credit card required to start,
                    and you can cancel anytime during the trial period.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground text-sm">
                    We accept all major credit cards, PayPal, and local Ethiopian payment methods
                    including mobile money transfers.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Do you offer student discounts?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes! We offer special pricing for schools and educational institutions.
                    Contact us for volume discounts and institutional pricing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
