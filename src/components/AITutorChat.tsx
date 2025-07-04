import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Send, User, Bot, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'quiz' | 'explanation';
}

interface AITutorChatProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: string;
  topic?: string;
}

export function AITutorChat({ isOpen, onClose, subject = "Mathematics", topic = "Sets" }: AITutorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your AI tutor for ${subject}. I'm here to help you understand ${topic}. What would you like to learn about today?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const predefinedResponses: Record<string, string> = {
    'sets': 'A set is a collection of distinct objects, considered as an object in its own right. For example, A = {1, 2, 3, 4, 5} is a set containing five numbers. Sets can contain anything: numbers, letters, people, etc. Would you like to learn about set operations like union and intersection?',
    'union': 'The union of two sets A and B (written as A ∪ B) is the set containing all elements that are in either A or B (or both). For example, if A = {1, 2, 3} and B = {3, 4, 5}, then A ∪ B = {1, 2, 3, 4, 5}.',
    'intersection': 'The intersection of two sets A and B (written as A ∩ B) is the set containing all elements that are in both A and B. For example, if A = {1, 2, 3} and B = {3, 4, 5}, then A ∩ B = {3}.',
    'quiz': 'Great! Here\'s a quick quiz: If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, what is A ∪ B? \n\na) {3, 4}\nb) {1, 2, 3, 4, 5, 6}\nc) {1, 2, 5, 6}\nd) {1, 2, 3, 4, 3, 4, 5, 6}',
    'help': 'I can help you with:\n• Understanding basic concepts\n• Solving practice problems\n• Taking quizzes\n• Explaining step-by-step solutions\n\nJust ask me anything about mathematics!'
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

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
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowercaseInput = inputValue.toLowerCase();
      let aiResponse = "I understand you're asking about that topic. Let me explain it in simple terms. Could you be more specific about what aspect you'd like to learn?";

      // Find matching response
      for (const [key, response] of Object.entries(predefinedResponses)) {
        if (lowercaseInput.includes(key)) {
          aiResponse = response;
          break;
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: lowercaseInput.includes('quiz') ? 'quiz' : 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    "What are sets?",
    "Explain union and intersection",
    "Give me a quiz",
    "Show me examples"
  ];

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-96 bg-card border border-border shadow-strong z-50 flex flex-col">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-full">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-sm">AI Tutor</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">{subject}</Badge>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%]`}>
                  {message.sender === 'ai' && (
                    <div className="bg-gradient-primary p-1 rounded-full">
                      <Bot className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : message.type === 'quiz'
                        ? 'bg-warning/10 border border-warning/20'
                        : 'bg-muted'
                    }`}
                  >
                    {message.type === 'quiz' && (
                      <div className="flex items-center space-x-1 mb-2">
                        <Lightbulb className="h-3 w-3" />
                        <span className="text-xs font-semibold">Practice Quiz</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>

                  {message.sender === 'user' && (
                    <div className="bg-primary p-1 rounded-full">
                      <User className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-primary p-1 rounded-full">
                    <Bot className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
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

        {/* Quick Questions */}
        <div className="py-2 border-t border-border">
          <div className="flex flex-wrap gap-1 mb-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-6 px-2"
                onClick={() => setInputValue(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button size="sm" onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}