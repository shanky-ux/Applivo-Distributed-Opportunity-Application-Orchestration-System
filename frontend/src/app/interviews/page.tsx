"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Video, 
  Phone, 
  Building, 
  Clock, 
  Play,
  FileText,
  CheckCircle,
  BookOpen,
  Users,
  Code
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInterviews, useJobs } from "@/hooks/useApi";
import type { Interview } from "@/types";
import { formatDate } from "@/lib/utils";

export default function InterviewsPage() {
  const { data: interviews = [] } = useInterviews();
  const { data: jobs = [] } = useJobs();
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Interview Preparation</h1>
            <p className="text-muted-foreground">Prepare for your upcoming interviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Interviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Interviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interviews.map((interview, index) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-card/60 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                      onClick={() => setSelectedInterview(interview)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                            <Building className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{interview.role}</h3>
                            <p className="text-sm text-muted-foreground">{interview.company}</p>
                          </div>
                        </div>
                        <Badge variant={interview.status === "scheduled" ? "success" : "secondary"}>
                          {interview.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(interview.interviewDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          {interview.interviewType === "video" ? (
                            <Video className="h-4 w-4" />
                          ) : (
                            <Phone className="h-4 w-4" />
                          )}
                          {interview.interviewType}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="gap-1">
                          <Play className="h-3 w-3" />
                          Start Mock Interview
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <FileText className="h-3 w-3" />
                          View Plan
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Question Banks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-400" />
                    Technical Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="p-2 rounded-lg bg-white/5 text-sm">Implement a binary search tree</li>
                    <li className="p-2 rounded-lg bg-white/5 text-sm">Explain REST vs GraphQL APIs</li>
                    <li className="p-2 rounded-lg bg-white/5 text-sm">Database indexing strategies</li>
                    <li className="p-2 rounded-lg bg-white/5 text-sm">System design: URL shortener</li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    View All Questions
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-400" />
                    Behavioral Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="p-2 rounded-lg bg-white/5 text-sm">Tell me about yourself</li>
                    <li className="p-2 rounded-lg bg-white/5 text-sm">Biggest challenge you've faced</li>
                    <li className="p-2 rounded-lg bg-white/5 text-sm">Why do you want to join us?</li>
                    <li className="p-2 rounded-lg bg-white/5 text-sm">Tell me about a conflict</li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    View All Questions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Intelligence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Company Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <h4 className="font-medium mb-2">Meta</h4>
                    <p className="text-xs text-muted-foreground mb-2">Key values: Move Fast, Build Things, Be Bold</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">Focus on impact</Badge>
                      <Badge variant="outline" className="text-xs">Data-driven</Badge>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <h4 className="font-medium mb-2">Stripe</h4>
                    <p className="text-xs text-muted-foreground mb-2">Key values: Customer obsession, Transparency</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">Technical excellence</Badge>
                      <Badge variant="outline" className="text-xs">Fintech focus</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mock Interview Simulator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-purple-400" />
                  Mock Interview Simulator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Practice with AI-powered mock interviews and get real-time feedback.
                </p>
                <Button className="w-full gap-2">
                  <Play className="h-4 w-4" />
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
