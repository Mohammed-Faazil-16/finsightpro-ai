import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  PieChart,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'analysis';
}

interface ChatbotProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export const Chatbot = ({ isMinimized = false, onToggleMinimize }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your FinSight Pro AI assistant. I can help you with investment advice, market analysis, portfolio optimization, and financial planning. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    { text: "Analyze my portfolio", icon: PieChart },
    { text: "Market trends today", icon: TrendingUp },
    { text: "Risk assessment", icon: Shield },
    { text: "Investment options", icon: DollarSign }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('portfolio') || message.includes('analyze')) {
      return "Based on your profile, I recommend a diversified portfolio with 60% stocks and 40% bonds. Your risk tolerance suggests this allocation would be optimal. Would you like me to break down specific fund recommendations?";
    }
    
    if (message.includes('market') || message.includes('trend')) {
      return "Current market analysis shows positive momentum in tech and healthcare sectors. The S&P 500 is up 12.4% YTD. However, consider the potential impact of rising interest rates on growth stocks. Would you like sector-specific insights?";
    }
    
    if (message.includes('risk')) {
      return "Your risk assessment indicates a moderate risk tolerance. This means you can handle some volatility for potentially higher returns. I recommend a mix of index funds and blue-chip stocks. Want me to suggest specific investments?";
    }
    
    if (message.includes('invest') || message.includes('buy')) {
      return "For your investment amount and timeline, I suggest starting with broad market ETFs like VTI or SPY, plus some international exposure with VXUS. Would you like specific allocation percentages and reasoning?";
    }
    
    if (message.includes('retirement') || message.includes('401k')) {
      return "For retirement planning, maximize your 401(k) match first, then consider a Roth IRA. Based on your age and income, you should be saving at least 15% for retirement. Need help calculating how much you'll need?";
    }

    return "I'd be happy to help with that! I can provide insights on investments, market analysis, portfolio optimization, risk assessment, and financial planning. Could you be more specific about what you'd like to know?";
  };

  const handleSendMessage = async (messageText?: string) => {
    const messageToSend = messageText || input.trim();
    if (!messageToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(messageToSend),
        sender: 'bot',
        timestamp: new Date(),
        type: 'analysis'
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 h-16 border-border shadow-[var(--shadow-elevated)] cursor-pointer hover:shadow-lg transition-[var(--transition-all)]" onClick={onToggleMinimize}>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-accent text-accent-foreground">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">FinSight AI</span>
          </div>
          <Maximize2 className="w-4 h-4 text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] border-border shadow-[var(--shadow-elevated)] flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-accent text-accent-foreground">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          FinSight AI Assistant
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
          <Minimize2 className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : ''}`}>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {message.type === 'analysis' && (
                      <Badge variant="secondary" className="text-xs">
                        AI Analysis
                      </Badge>
                    )}
                  </div>
                </div>

                {message.sender === 'user' && (
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Suggestions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">Quick suggestions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-xs h-8"
                  onClick={() => handleSendMessage(suggestion.text)}
                >
                  <suggestion.icon className="w-3 h-3 mr-1" />
                  {suggestion.text}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about investments, markets, or financial advice..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isTyping}
              size="sm"
              className="bg-gradient-to-r from-primary to-accent"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};