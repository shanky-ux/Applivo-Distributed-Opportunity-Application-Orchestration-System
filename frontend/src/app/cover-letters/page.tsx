"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Sparkles, 
  Download, 
  Trash2, 
  Eye,
  Briefcase
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCoverLetters, useJobs } from "@/hooks/useApi";
import { formatDate } from "@/lib/utils";

export default function CoverLettersPage() {
  const { data: coverLetters = [] } = useCoverLetters();
  const { data: jobs = [] } = useJobs();
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Cover Letters</h1>
            <p className="text-muted-foreground">AI-generated cover letters for your applications</p>
          </div>
          <Button className="gap-2">
            <Sparkles className="h-4 w-4" />
            Generate Cover Letter
          </Button>
        </div>

        {/* Cover Letter List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coverLetters.map((coverLetter, index) => (
            <motion.div
              key={coverLetter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:border-white/20 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/20">
                      <Mail className="h-6 w-6 text-purple-400" />
                    </div>
                    <Badge variant="secondary">
                      {formatDate(coverLetter.createdAt)}
                    </Badge>
                  </div>

                  <h3 className="font-semibold mb-1">{coverLetter.role}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {coverLetter.company}
                  </p>

                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {coverLetter.content.substring(0, 150)}...
                  </p>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Eye className="h-3 w-3" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Generate New Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Generate New Cover Letter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <select className="flex-1 px-3 py-2 rounded-lg bg-card border border-white/10">
                <option value="">Select a job...</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} at {job.company}
                  </option>
                ))}
              </select>
              <Button className="gap-2">
                <Sparkles className="h-4 w-4" />
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
