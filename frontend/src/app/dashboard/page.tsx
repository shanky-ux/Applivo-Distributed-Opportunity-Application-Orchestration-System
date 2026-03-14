"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  MessageCircle, 
  Calendar, 
  Award,
  Briefcase,
  FileText,
  Mail,
  Zap,
  TrendingUp,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/ui/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAnalytics, useJobs, useApplications, useActivityFeed, useScrapeJobs } from "@/hooks/useApi";
import { formatRelativeTime, formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const { data: analytics } = useAnalytics();
  const { data: jobs = [] } = useJobs();
  const { data: applications = [] } = useApplications();
  const { data: activities = [] } = useActivityFeed(5);
  const scrapeJobsMutation = useScrapeJobs();

  // Auto-scrape on page load (with rate limiting - only scrape if not done in last hour)
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    const lastScrape = localStorage.getItem('lastScrapeTime');
    const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
    const now = Date.now();
    
    // Scrape if never done before or if last scrape was more than 1 hour ago
    if (!lastScrape || (now - parseInt(lastScrape)) > ONE_HOUR) {
      scrapeJobsMutation.mutate();
      localStorage.setItem('lastScrapeTime', now.toString());
    }
  }, [scrapeJobsMutation]);

  const stats = [
    { 
      title: "Applications Sent", 
      value: String(analytics?.totalApplications || 0), 
      icon: Send, 
      trend: { value: 12, isPositive: true },
      description: "This month",
      color: "primary" as const
    },
    { 
      title: "Responses Received", 
      value: String(analytics?.totalResponses || 0), 
      icon: MessageCircle, 
      trend: { value: 5, isPositive: true },
      description: `${analytics?.responseRate || 0}% response rate`,
      color: "success" as const
    },
    { 
      title: "Interviews Scheduled", 
      value: String(analytics?.totalInterviews || 0), 
      icon: Calendar, 
      trend: { value: 1, isPositive: true },
      description: "This week",
      color: "info" as const
    },
    { 
      title: "Offers Received", 
      value: String(analytics?.totalOffers || 0), 
      icon: Award, 
      trend: { value: 100, isPositive: true },
      description: `${analytics?.offerRate || 0}% offer rate`,
      color: "warning" as const
    },
  ];

  const skillGaps = [
    { skill: "Kubernetes", demand: "High", gap: "Medium" },
    { skill: "GCP", demand: "Medium", gap: "Medium" },
    { skill: "Machine Learning", demand: "High", gap: "High" },
    { skill: "GraphQL", demand: "Medium", gap: "Low" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your career overview.</p>
          </div>
          <Button className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Insights
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Opportunities */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  New Opportunities
                </CardTitle>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.slice(0, 4).map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card-hover p-4 rounded-xl cursor-pointer group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                            {job.companyLogo ? (
                              <img 
                                src={job.companyLogo} 
                                alt={job.company}
                                className="h-8 w-8 object-contain"
                              />
                            ) : (
                              <Briefcase className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{job.location}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{job.type}</span>
                              <Badge variant={job.remote === "remote" ? "success" : "secondary"} className="text-xs">
                                {job.remote}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end mb-1">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span className="text-lg font-bold text-green-400">{job.matchScore}%</span>
                          </div>
                          {job.salaryMin && (
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax || 0)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        {(job.skills || []).slice(0, 4).map((skill: string) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Agent Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Agent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`
                        p-2 rounded-lg 
                        ${activity.type === 'job_scraped' ? 'bg-blue-500/20' : ''}
                        ${activity.type === 'resume_generated' ? 'bg-green-500/20' : ''}
                        ${activity.type === 'application_submitted' ? 'bg-purple-500/20' : ''}
                        ${activity.type === 'interview_scheduled' ? 'bg-yellow-500/20' : ''}
                        ${activity.type === 'notification_sent' ? 'bg-pink-500/20' : ''}
                      `}>
                        {activity.type === 'job_scraped' && <Briefcase className="h-4 w-4 text-blue-400" />}
                        {activity.type === 'resume_generated' && <FileText className="h-4 w-4 text-green-400" />}
                        {activity.type === 'application_submitted' && <Send className="h-4 w-4 text-purple-400" />}
                        {activity.type === 'interview_scheduled' && <Calendar className="h-4 w-4 text-yellow-400" />}
                        {activity.type === 'notification_sent' && <Mail className="h-4 w-4 text-pink-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatRelativeTime(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Gap Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Skill Gap Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skillGaps.map((skill) => (
                    <div key={skill.skill} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={skill.demand === "High" ? "success" : "secondary"} 
                          className="text-xs"
                        >
                          {skill.demand} demand
                        </Badge>
                        <Badge 
                          variant={skill.gap === "High" ? "destructive" : skill.gap === "Medium" ? "warning" : "success"} 
                          className="text-xs"
                        >
                          {skill.gap} gap
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Learning Path
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
