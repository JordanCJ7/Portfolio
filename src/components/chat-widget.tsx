"use client";

import { useState, useRef, useEffect } from 'react';
import { personalChat, type PersonalChatInput } from '@/ai/flows/personal-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Send, Bot, User, MessageCircle, X, Minimize2, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: `Hi! 👋 I'm Janitha's AI assistant. I can help you learn about his projects, skills, and experience. What would you like to know?`,
  timestamp: new Date(),
};

const QUICK_QUESTIONS = [
  "What are Janitha's key skills?",
  "Tell me about his projects",
  "Is he available for internships?",
  "What technologies does he use?"
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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
      }

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

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInputMessage('');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <div className="group relative">
          {/* Animated Background Rings */}
          <div className="absolute inset-0 rounded-full">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 animate-pulse"></div>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          
          {/* Main Button */}
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="relative rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-110 active:scale-95 border-2 border-white/20 backdrop-blur-sm group-hover:border-white/40"
          >
            <MessageCircle className="h-7 w-7 text-white group-hover:animate-bounce" />
            
            {/* Sparkle Effects */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
          </Button>
          
          {/* Floating Notification Badge */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce">
            AI
          </div>
          
          {/* Enhanced Tooltip */}
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:translate-y-1">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm px-4 py-3 rounded-xl whitespace-nowrap shadow-2xl border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Ask about Janitha</span>
              </div>
              <div className="text-xs text-gray-300 mt-1">Click to start chatting!</div>
              <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
          
          {/* Floating Text Animation */}
          <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full shadow-lg font-medium animate-bounce">
              💬 Chat with AI
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-8 right-8 z-50 transition-all duration-300",
      isMinimized ? "w-96 h-14" : "w-96 h-[500px]"
    )}>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">Janitha's AI Assistant</h3>
              <p className="text-blue-100 text-sm">Ask me anything about Janitha!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-2 h-auto"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-lg px-4 py-3 text-sm",
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                    )}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                    <div
                      className={cn(
                        "text-xs mt-2 opacity-70",
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 max-w-[85%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Questions (show only if it's a new conversation) */}
              {messages.length === 1 && !isLoading && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 text-center font-medium">Quick questions to get started:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {QUICK_QUESTIONS.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-start text-left h-auto py-3 px-4 text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 text-gray-700 border-gray-300 transition-all duration-200 font-medium"
                        onClick={() => handleSendMessage(question)}
                        disabled={isLoading}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900">
              <div className="flex space-x-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Janitha's skills, projects, experience..."
                  disabled={isLoading}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-500">
                  🤖 AI-powered • Ask about projects, skills & experience
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetChat}
                  className="text-xs text-gray-500 hover:text-gray-700 p-1 h-auto"
                >
                  Clear Chat
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
