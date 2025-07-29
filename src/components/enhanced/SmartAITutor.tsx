import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  CheckCircle,
  XCircle,
  Lightbulb,
  MessageSquare,
  Settings,
  BarChart3,
  Zap,
  Star
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'quiz' | 'explanation' | 'assessment' | 'encouragement';
  confidence?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  topic?: string;
  isCorrect?: boolean;
}

interface LearningProfile {
  strengths: string[];
  weaknesses: string[];
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  currentLevel: number;
  masteryTopics: string[];
  strugglingTopics: string[];
  totalQuestions: number;
  correctAnswers: number;
}

interface SmartAITutorProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  topic: string;
  grade: number;
  studentId: string;
}

export function SmartAITutor({ 
  isOpen, 
  onClose, 
  subject, 
  topic, 
  grade, 
  studentId 
}: SmartAITutorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [tutorMode, setTutorMode] = useState<'chat' | 'quiz' | 'assessment' | 'practice'>('chat');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [learningProfile, setLearningProfile] = useState<LearningProfile>({
    strengths: ['Algebra', 'Geometry'],
    weaknesses: ['Trigonometry'],
    preferredLearningStyle: 'visual',
    currentLevel: 7,
    masteryTopics: ['Basic Sets', 'Union Operations'],
    strugglingTopics: ['Complex Functions'],
    totalQuestions: 25,
    correctAnswers: 18
  });
  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    currentStreak: 0,
    timeSpent: 0
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const recognition = useRef<any>(null);

  // Enhanced AI responses with adaptive difficulty
  const getAIResponse = (userInput: string, context: any) => {
    const input = userInput.toLowerCase();
    const difficulty = learningProfile.currentLevel >= 8 ? 'hard' : 
                     learningProfile.currentLevel >= 6 ? 'medium' : 'easy';

    // Contextual responses based on student profile
    const responses = {
      greeting: `Hello ${studentId}! I'm your personalized AI tutor for Grade ${grade} ${subject}. Based on your learning profile, I see you're strong in ${learningProfile.strengths.join(', ')} and we'll work together on ${learningProfile.weaknesses.join(', ')}. Ready to learn about ${topic}?`,
      
      explanation: {
        easy: `Let me explain ${topic} in simple terms. Think of it like organizing your books - sets are just collections of things that belong together. For example, all your math books form a "set" of math books.`,
        medium: `${topic} in mathematics refers to well-defined collections of objects. In Ethiopian Grade ${grade} curriculum, we use set notation like A = {1, 2, 3} to represent these collections. Each element belongs to the set uniquely.`,
        hard: `In advanced set theory for Grade ${grade}, we explore concepts like power sets, Cartesian products, and set operations. The Ethiopian curriculum emphasizes practical applications in probability and statistics.`
      },

      quiz: {
        easy: `Let's practice! If you have a set A = {red, blue, green} and set B = {blue, yellow}, what color appears in both sets? \na) red \nb) blue \nc) green \nd) yellow`,
        medium: `Here's a challenge: Given A = {x | x is an even number, 2 ≤ x ≤ 10} and B = {x | x is a multiple of 3, 0 < x ≤ 12}, find A ∩ B. \na) {6} \nb) {6, 12} \nc) {2, 4, 6, 8, 10} \nd) {3, 6, 9, 12}`,
        hard: `Advanced problem: If |A ∪ B| = 25, |A| = 15, and |A ∩ B| = 5, find |B|. Use the principle of inclusion-exclusion. \na) 10 \nb) 15 \nc) 20 \nd) 25`
      },

      encouragement: [
        "Excellent work! You're showing great progress in understanding sets. 🌟",
        "I can see you're thinking critically about this. That's exactly the right approach! 💪",
        "Your mathematical reasoning is improving with each question. Keep it up! 🚀",
        "Great job! You're mastering concepts that will help you in advanced mathematics. ✨"
      ]
    };

    if (input.includes('hello') || input.includes('hi')) {
      return { content: responses.greeting, type: 'text' as const };
    }
    
    if (input.includes('explain') || input.includes('what is')) {
      return { content: responses.explanation[difficulty], type: 'explanation' as const };
    }
    
    if (input.includes('quiz') || input.includes('question') || input.includes('test')) {
      return { 
        content: responses.quiz[difficulty], 
        type: 'quiz' as const,
        difficulty: difficulty as 'easy' | 'medium' | 'hard'
      };
    }

    // Adaptive response based on recent performance
    const recentAccuracy = sessionStats.questionsAnswered > 0 
      ? sessionStats.correctAnswers / sessionStats.questionsAnswered 
      : 0;

    if (recentAccuracy > 0.8) {
      return {
        content: "I notice you're doing excellent! Let me give you a more challenging problem to help you grow even more.",
        type: 'encouragement' as const
      };
    } else if (recentAccuracy < 0.5) {
      return {
        content: "I see you might need some extra support. Let's break this down into smaller steps and practice the fundamentals.",
        type: 'explanation' as const
      };
    }

    return {
      content: `That's an interesting question about ${topic}! Let me help you understand this better. Based on your learning profile, I think you'll grasp this concept well with some examples.`,
      type: 'text' as const
    };
  };

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.current = window.speechSynthesis;
    }

    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };
    }

    // Initialize conversation
    const welcomeMessage: Message = {
      id: 'welcome',
      content: getAIResponse('hello', {}).content,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([welcomeMessage]);

    if (speechEnabled) {
      speakText(welcomeMessage.content);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const speakText = (text: string) => {
    if (speechSynthesis.current && speechEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.voice = speechSynthesis.current.getVoices().find(voice => 
        voice.name.includes('Female') || voice.name.includes('Samantha')
      ) || null;
      speechSynthesis.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate processing time
    setTimeout(() => {
      const aiResponse = getAIResponse(currentInput, { 
        recentMessages: messages.slice(-3),
        learningProfile,
        sessionStats 
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: 'ai',
        timestamp: new Date(),
        type: aiResponse.type,
        difficulty: aiResponse.difficulty,
        topic: topic
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      if (speechEnabled) {
        speakText(aiResponse.content);
      }

      // Update session stats
      if (aiResponse.type === 'quiz') {
        setSessionStats(prev => ({
          ...prev,
          questionsAnswered: prev.questionsAnswered + 1
        }));
      }
    }, 1500);
  };

  const assessAnswer = (answer: string, isCorrect: boolean) => {
    setSessionStats(prev => ({
      ...prev,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      currentStreak: isCorrect ? prev.currentStreak + 1 : 0
    }));

    const feedback = isCorrect 
      ? "🎉 Excellent! That's correct. You're really understanding these concepts well."
      : "Not quite right, but great effort! Let me explain the correct approach.";

    const feedbackMessage: Message = {
      id: Date.now().toString(),
      content: feedback,
      sender: 'ai',
      timestamp: new Date(),
      type: 'assessment',
      isCorrect
    };

    setMessages(prev => [...prev, feedbackMessage]);
    
    if (speechEnabled) {
      speakText(feedback);
    }
  };

  const quickActions = [
    { icon: Brain, label: "Explain Concept", action: () => setInputValue("Explain this concept") },
    { icon: Target, label: "Take Quiz", action: () => setInputValue("Give me a quiz") },
    { icon: BookOpen, label: "Examples", action: () => setInputValue("Show me examples") },
    { icon: Lightbulb, label: "Hint", action: () => setInputValue("Give me a hint") }
  ];

  const accuracy = sessionStats.questionsAnswered > 0 
    ? (sessionStats.correctAnswers / sessionStats.questionsAnswered) * 100 
    : 0;

  if (!isOpen) return null;

  return (
    <Card className="fixed inset-4 bg-card border border-border shadow-strong z-50 flex flex-col max-w-6xl mx-auto">
      <CardHeader className="pb-4 border-b border-border bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-primary-foreground/20 p-3 rounded-full">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Smart AI Tutor</CardTitle>
              <div className="flex items-center space-x-3 mt-1">
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                  Grade {grade} {subject}
                </Badge>
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                  {topic}
                </Badge>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm">Active</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              ×
            </Button>
          </div>
        </div>

        {/* Performance Dashboard */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-primary-foreground/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{sessionStats.questionsAnswered}</div>
            <div className="text-sm opacity-90">Questions</div>
          </div>
          <div className="bg-primary-foreground/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{accuracy.toFixed(0)}%</div>
            <div className="text-sm opacity-90">Accuracy</div>
          </div>
          <div className="bg-primary-foreground/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{sessionStats.currentStreak}</div>
            <div className="text-sm opacity-90">Streak</div>
          </div>
          <div className="bg-primary-foreground/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">Level {learningProfile.currentLevel}</div>
            <div className="text-sm opacity-90">Progress</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex p-0">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%]`}>
                    {message.sender === 'ai' && (
                      <div className="bg-gradient-primary p-2 rounded-full">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    
                    <div
                      className={`rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : message.type === 'quiz'
                          ? 'bg-warning/10 border-2 border-warning/20'
                          : message.type === 'assessment'
                          ? message.isCorrect 
                            ? 'bg-success/10 border-2 border-success/20'
                            : 'bg-destructive/10 border-2 border-destructive/20'
                          : 'bg-muted'
                      }`}
                    >
                      {message.type === 'quiz' && (
                        <div className="flex items-center space-x-2 mb-3">
                          <Target className="h-4 w-4" />
                          <span className="font-semibold">Practice Question</span>
                          {message.difficulty && (
                            <Badge variant="outline" className="text-xs">
                              {message.difficulty}
                            </Badge>
                          )}
                        </div>
                      )}

                      {message.type === 'assessment' && (
                        <div className="flex items-center space-x-2 mb-3">
                          {message.isCorrect ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                          <span className="font-semibold">
                            {message.isCorrect ? 'Correct!' : 'Incorrect'}
                          </span>
                        </div>
                      )}

                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>

                    {message.sender === 'user' && (
                      <div className="bg-primary p-2 rounded-full">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-primary p-2 rounded-full">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="p-4 border-t border-border">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={action.action}
                >
                  <action.icon className="h-3 w-3" />
                  <span>{action.label}</span>
                </Button>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex space-x-3">
              <div className="flex-1 flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about mathematics..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isListening ? stopListening : startListening}
                  className={isListening ? 'bg-destructive text-destructive-foreground' : ''}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar - Learning Analytics */}
        <div className="w-80 border-l border-border bg-muted/30 p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Learning Analytics
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span>{accuracy.toFixed(0)}%</span>
                </div>
                <Progress value={accuracy} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Current Level</span>
                  <span>Level {learningProfile.currentLevel}</span>
                </div>
                <Progress value={(learningProfile.currentLevel / 10) * 100} className="h-2" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Strengths
            </h3>
            <div className="space-y-2">
              {learningProfile.strengths.map((strength, index) => (
                <Badge key={index} variant="secondary" className="w-full justify-start">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Focus Areas
            </h3>
            <div className="space-y-2">
              {learningProfile.weaknesses.map((weakness, index) => (
                <Badge key={index} variant="outline" className="w-full justify-start">
                  {weakness}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Learning Preferences</h3>
            <div className="text-sm text-muted-foreground">
              <p>Style: {learningProfile.preferredLearningStyle}</p>
              <p>Mastered: {learningProfile.masteryTopics.length} topics</p>
              <p>Working on: {learningProfile.strugglingTopics.length} topics</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}