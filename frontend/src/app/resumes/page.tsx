"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Upload, 
  Sparkles, 
  Download, 
  Trash2, 
  Briefcase,
  CheckCircle,
  XCircle
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useResumes, useJobs } from "@/hooks/useApi";
import { formatDate } from "@/lib/utils";

export default function ResumesPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const { data: resumes = [] } = useResumes();
  const { data: jobs = [] } = useJobs();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Resume Manager</h1>
            <p className="text-muted-foreground">Manage and generate AI-tailored resumes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Resume
            </Button>
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              Generate Resume
            </Button>
          </div>
        </div>

        {/* Generate for Job Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Generate Resume for Selected Job
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <select 
                className="flex-1 px-3 py-2 rounded-lg bg-card border border-white/10"
                value={selectedJob || ""}
                onChange={(e) => setSelectedJob(e.target.value)}
              >
                <option value="">Select a job...</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} at {job.company}
                  </option>
                ))}
              </select>
              <Button disabled={!selectedJob} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resume List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:border-white/20 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/20">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    {resume.atsScore && (
                      <Badge variant={resume.atsScore >= 80 ? "success" : "warning"}>
                        ATS: {resume.atsScore}%
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-semibold mb-1">{resume.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Target: {resume.targetRole}
                  </p>
                  {resume.fileName && (
                    <p className="text-xs text-muted-foreground mb-4">
                      {resume.fileName}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>Created: {formatDate(resume.createdAt)}</span>
                    <span>Updated: {formatDate(resume.updatedAt)}</span>
                  </div>

                  <div className="flex gap-2">
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

        {/* ATS Score Legend */}
        <Card>
          <CardHeader>
            <CardTitle>ATS Score Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="font-medium">80-100%</p>
                  <p className="text-sm text-muted-foreground">Excellent - High chances of getting past ATS</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-xs text-yellow-400">!</span>
                </div>
                <div>
                  <p className="font-medium">60-79%</p>
                  <p className="text-sm text-muted-foreground">Good - Some improvements recommended</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-400" />
                <div>
                  <p className="font-medium">Below 60%</p>
                  <p className="text-sm text-muted-foreground">Needs work - Major revisions needed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
