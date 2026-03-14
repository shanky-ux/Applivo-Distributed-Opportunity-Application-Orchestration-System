"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Bot, 
  User,
  Briefcase,
  FileText,
  TrendingUp,
  GraduationCap,
  X
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const suggestedPrompts = [
  { icon: Briefcase, text: "Find AI internships in Europe" },
  { icon: FileText, text: "Generate resume for Nvidia" },
  { icon: TrendingUp, text: "Analyze job market trends" },
  { icon: GraduationCap, text: "Show my skill gaps" },
];

const sampleMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI career assistant. I can help you find jobs, generate resumes, analyze your applications, and more. How can I help you today?",
    timestamp: new Date().toISOString(),
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue;
    if (!messageContent.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(messageContent),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("internship") || lowerQuery.includes("job")) {
      return "I found some great opportunities for you! Based on your profile, here are the top 3 recommendations:\n\n1. **AI Research Intern** at DeepMind - London, UK\n2. **Machine Learning Intern** at Anthropic - San Francisco, CA\n3. **Data Science Intern** at Spotify - Stockholm, Sweden\n\nWould you like me to generate tailored applications for these positions?";
    } else if (lowerQuery.includes("resume")) {
      return "I'd be happy to help you generate a resume! I've analyzed your profile and found a great match for a Senior Software Engineer position at Google. The resume will highlight your experience with React, TypeScript, and Node.js.\n\nShall I generate it now?";
    } else if (lowerQuery.includes("skill") || lowerQuery.includes("gap")) {
      return "Based on my analysis of your profile and the current job market, here are your skill gaps:\n\n**High Priority:**\n- Kubernetes\n- GCP\n- Machine Learning\n\n**Medium Priority:**\n- GraphQL\n- Docker\n\nI've created a learning path to help you close these gaps. Would you like me to show you the details?";
    } else if (lowerQuery.includes("trend") || lowerQuery.includes("market")) {
      return "Here's what I found about the current job market:\n\n**Hot Skills in Demand:**\n1. AI/ML - +45% growth\n2. Cloud Architecture - +38% growth\n3. DevOps - +32% growth\n\n**Industry Insights:**\n- Remote work opportunities increased by 28%\n- Average salaries up 12% from last year\n- Tech companies hiring actively despite market conditions\n\nWould you like more detailed analytics?";
    }
    return "I understand you're asking about \"" + query + "\". Let me analyze your request and provide you with the best guidance. Could you please specify what you'd like to know?";
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-7rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Career Assistant</h1>
              <p className="text-sm text-muted-foreground">Your personal career advisor</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Main Chat Area */}
          <Card className="flex-1 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`p-2 rounded-full h-fit ${
                      message.role === "user" ? "bg-primary/20" : "bg-purple-500/20"
                    }`}>
                      {message.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4 text-purple-400" />
                      )}
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      message.role === "user" 
                        ? "bg-primary/20 border border-primary/30 rounded-br-sm" 
                        : "bg-card/60 border border-white/10 rounded-bl-sm"
                    }`}>
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 rounded-full bg-purple-500/20">
                    <Bot className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about your career..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage()} className="gap-2">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Suggested Prompts */}
          <div className="w-64 hidden lg:block">
            <h3 className="font-semibold mb-3">Suggested Prompts</h3>
            <div className="space-y-2">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start gap-2 h-auto py-3 text-left"
                  onClick={() => handleSendMessage(prompt.text)}
                >
                  <prompt.icon className="h-4 w-4 shrink-0" />
                  <span className="text-sm">{prompt.text}</span>
                </Button>
              ))}
            </div>

            {/* Quick Actions */}
            <h3 className="font-semibold mt-6 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Generate Resume
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Briefcase className="h-4 w-4" />
                Find Jobs
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <TrendingUp className="h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
