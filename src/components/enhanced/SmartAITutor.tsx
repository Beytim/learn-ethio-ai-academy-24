import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  Send, 
  Mic, 
  Volume2, 
  BookOpen, 
  Lightbulb,
  Brain,
  Target,
  Zap,
  MessageSquare,
  User
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'explanation' | 'hint' | 'encouragement';
  relatedTopic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface SmartAITutorProps {
  studentLevel: string;
  currentSubject: string;
  currentTopic: string;
  learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  onTopicSuggestion?: (topic: string) => void;
}

export function SmartAITutor({ 
  studentLevel, 
  currentSubject, 
  currentTopic, 
  learningStyle = 'visual',
  onTopicSuggestion 
}: SmartAITutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your AI tutor for ${currentSubject}. I'm here to help you master ${currentTopic}. What would you like to learn about today?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'encouragement'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    // Simulate intelligent AI responses based on content
    const responses = {
      greeting: [
        "Great to see you're ready to learn! Let's dive into some exciting concepts.",
        "I'm excited to help you understand this topic better. What specific area interests you?"
      ],
      question: [
        "That's an excellent question! Let me break this down step by step...",
        "I love your curiosity! Here's how we can approach this problem..."
      ],
      difficulty: [
        "I notice this might be challenging. Let's start with the basics and build up gradually.",
        "This is a complex topic, but I believe in you! Let's tackle it together."
      ],
      encouragement: [
        "You're doing great! Keep asking questions - that's how we learn best.",
        "I can see you're really thinking about this. That's the spirit of a true learner!"
      ]
    };

    let responseType: keyof typeof responses = 'encouragement';
    let response = '';

    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      responseType = 'greeting';
    } else if (userMessage.includes('?')) {
      responseType = 'question';
    } else if (userMessage.toLowerCase().includes('hard') || userMessage.toLowerCase().includes('difficult')) {
      responseType = 'difficulty';
    }

    response = responses[responseType][Math.floor(Math.random() * responses[responseType].length)];

    // Add context-specific information based on current topic
    if (currentTopic.toLowerCase().includes('algebra')) {
      response += " In algebra, we work with variables and equations to solve real-world problems.";
    } else if (currentTopic.toLowerCase().includes('geometry')) {
      response += " Geometry helps us understand shapes, spaces, and how they relate to each other.";
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: 'ai',
      timestamp: new Date(),
      type: responseType === 'question' ? 'explanation' : 'encouragement',
      relatedTopic: currentTopic
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'explanation':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'hint':
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case 'encouragement':
        return <Zap className="h-4 w-4 text-green-500" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const suggestedQuestions = [
    `Explain the basics of ${currentTopic}`,
    `Give me a practice problem`,
    `What are real-world applications?`,
    `I'm struggling with this concept`
  ];

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          Smart AI Tutor
          <Badge variant="secondary" className="ml-auto">
            {learningStyle} learner
          </Badge>
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Target className="h-4 w-4" />
          <span>{currentSubject} • {currentTopic} • Grade {studentLevel}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4 p-4">
        {/* Chat Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'ai' && getMessageIcon(message.type)}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  {message.relatedTopic && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      {message.relatedTopic}
                    </Badge>
                  )}
                </div>

                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="justify-start text-xs h-auto p-2 text-left"
              onClick={() => setInputMessage(question)}
            >
              <Lightbulb className="h-3 w-3 mr-2 flex-shrink-0" />
              <span className="truncate">{question}</span>
            </Button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your studies..."
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setIsRecording(!isRecording)}
              >
                <Mic className={`h-4 w-4 ${isRecording ? 'text-red-500' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          AI responses are generated for educational purposes. Always verify important information.
        </div>
      </CardContent>
    </Card>
  );
}