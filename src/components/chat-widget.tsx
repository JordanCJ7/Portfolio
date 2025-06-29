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
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 transition-all duration-300",
      isMinimized ? "w-80 h-12" : "w-80 h-96"
    )}>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">Janitha's AI Assistant</h3>
              <p className="text-blue-100 text-xs">Ask me anything!</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-64 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-800">
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
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
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
                        "text-xs mt-1 opacity-70",
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
                  <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 max-w-[80%]">
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
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                  <div className="grid grid-cols-1 gap-1">
                    {QUICK_QUESTIONS.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-start text-left h-auto py-2 px-3 text-xs hover:bg-blue-50 hover:border-blue-200 text-gray-600"
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
            <div className="p-3 border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Janitha..."
                  disabled={isLoading}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  Powered by AI • Ask about projects, skills & experience
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetChat}
                  className="text-xs text-gray-500 hover:text-gray-700 p-1 h-auto"
                >
                  Reset
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
