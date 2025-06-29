"use client";

import { useState, useRef, useEffect } from 'react';
import { personalChat, type PersonalChatInput } from '@/ai/flows/personal-chat';
import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Send, Bot, User, Sparkles, MessageCircle, ShieldAlert } from 'lucide-react';
import AnimatedElement from '@/components/animated-element';
import ChatBubble from '@/components/ui/chat-bubble';
import { cn } from '@/lib/utils';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: `Hi there! 👋 I'm Janitha's personal AI assistant. I know all about his projects, skills, and experience. 

Ask me anything about:
• His development projects and achievements
• Technical skills and technologies he works with
• His role in different projects and teams
• Specific metrics and impact of his work
• His educational background and certifications

What would you like to know about Janitha?`,
  timestamp: new Date(),
};

const STARTER_QUESTIONS = [
  "What are Janitha's most impressive projects?",
  "What technologies does Janitha specialize in?",
  "Tell me about Janitha's leadership experience",
  "What's Janitha's educational background?",
  "Show me Janitha's project metrics and achievements"
];

export default function PersonalAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const result = await personalChat({
        message: messageToSend,
        conversationHistory
      } as PersonalChatInput);

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: result.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (!result.isRelevant) {
        toast({
          title: "Off-topic question",
          description: "I focus on questions about Janitha. Feel free to ask about his projects, skills, or experience!",
        });
      }
    } catch (error) {
      console.error("Error in chat:", error);
      let errorMessage = "Sorry, I'm having trouble responding right now. Please try again.";
      let errorTitle = "Error";

      if (error instanceof Error) {
        if (error.message.includes("Rate limit exceeded") || error.message.includes("Daily request limit exceeded")) {
          errorMessage = error.message;
          errorTitle = "Usage Limit Reached";
          toast({
            title: errorTitle,
            description: errorMessage,
            variant: "destructive",
            icon: <ShieldAlert className="h-5 w-5" />,
          });
        } else {
          toast({
            title: errorTitle,
            description: errorMessage,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred.",
          variant: "destructive",
        });
      }

      // Add error message to chat
      const errorChatMessage: ChatMessage = {
        role: 'assistant',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try asking your question again in a moment.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <SectionWrapper
      title="Ask About Janitha"
      subtitle="Chat with Janitha's personal AI assistant. Get detailed insights about his projects, skills, achievements, and experience. Your questions help showcase what makes him unique!"
    >
      <AnimatedElement>
        <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
          <CardHeader className="text-center border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardTitle className="flex items-center justify-center text-2xl">
              <div className="relative">
                <Bot className="mr-3 h-8 w-8 text-primary animate-pulse" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-bounce" />
              </div>
              Janitha's AI Assistant
            </CardTitle>
            <CardDescription className="text-base">
              I'm here to answer questions about Janitha's portfolio, projects, achievements, and technical expertise.
              <br />
              <span className="text-xs text-muted-foreground mt-1 block">
                Rate limits apply to ensure optimal performance within free tier
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {/* Starter Questions */}
            {messages.length === 1 && (
              <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Popular Questions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {STARTER_QUESTIONS.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-start text-left h-auto py-2 px-3 text-xs hover:bg-primary/5 hover:border-primary/20"
                        onClick={() => handleSendMessage(question)}
                        disabled={isLoading}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <ChatBubble key={index} isUser={message.role === 'user'} delay={index * 0.1}>
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-auto'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    )}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div
                      className={cn(
                        "text-xs mt-2 opacity-60",
                        message.role === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                </ChatBubble>
              ))}

              {isLoading && (
                <ChatBubble isUser={false}>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white animate-pulse" />
                    </div>
                  </div>
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </ChatBubble>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Janitha's projects, skills, or experience..."
                  disabled={isLoading}
                  className="flex-1 border-gray-300 focus:border-primary focus:ring-primary/20"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  size="icon"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                I specialize in Janitha's portfolio. Ask about his projects, technologies, achievements, or experience!
              </p>
            </div>
          </CardContent>
        </Card>
      </AnimatedElement>
    </SectionWrapper>
  );
}
