"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  TrendingUp, 
  DollarSign,
  ExternalLink,
  FileText,
  Mail,
  Send,
  X,
  Sparkles
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useJobs, useScrapeJobs } from "@/hooks/useApi";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { Job } from "@/types";

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    remote: "",
    matchScoreMin: 0,
  });

  const { data: jobs = [] } = useJobs(filters);
  const scrapeJobsMutation = useScrapeJobs();

  // Auto-scrape on page load (with rate limiting - only scrape if not done in last hour)
  const [hasAutoScraped, setHasAutoScraped] = useState(false);
  
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    if (hasAutoScraped) return;
    
    const lastScrape = localStorage.getItem('lastScrapeTime');
    const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
    const now = Date.now();
    
    // Scrape if never done before or if last scrape was more than 1 hour ago
    if (!lastScrape || (now - parseInt(lastScrape)) > ONE_HOUR) {
      scrapeJobsMutation.mutate();
      localStorage.setItem('lastScrapeTime', now.toString());
      setHasAutoScraped(true);
    }
  }, [hasAutoScraped, scrapeJobsMutation]);

  const filteredJobs = jobs.filter((job: Job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !filters.location || job.location.includes(filters.location);
    const matchesType = !filters.type || job.type === filters.type;
    const matchesRemote = !filters.remote || job.remote === filters.remote;
    const matchesScore = job.matchScore >= filters.matchScoreMin;
    return matchesSearch && matchesLocation && matchesType && matchesRemote && matchesScore;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Discovery</h1>
            <p className="text-muted-foreground">AI-discovered opportunities matching your profile</p>
          </div>
          <Button 
            className="gap-2"
            onClick={() => {
              console.log("Triggering scrape...");
              scrapeJobsMutation.mutate();
            }}
            disabled={scrapeJobsMutation.isPending}
          >
            <Sparkles className="h-4 w-4" />
            {scrapeJobsMutation.isPending ? "Discovering..." : "Discover New Jobs"}
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs, companies..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-3 py-2 rounded-lg bg-card border border-white/10 text-sm"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
            <select 
              className="px-3 py-2 rounded-lg bg-card border border-white/10 text-sm"
              value={filters.remote}
              onChange={(e) => setFilters({ ...filters, remote: e.target.value })}
            >
              <option value="">All Locations</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="cursor-pointer hover:border-primary/50 transition-all duration-300 group"
                onClick={() => setSelectedJob(job)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
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
                        <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                          {job.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                      <TrendingUp className="h-3 w-3 text-green-400" />
                      <span className="text-sm font-bold text-green-400">{job.matchScore}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <Badge variant={job.remote === "remote" ? "success" : "secondary"} className="text-xs">
                      {job.remote}
                    </Badge>
                  </div>

                  {job.salaryMin && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <DollarSign className="h-4 w-4" />
                      {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax || 0)}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-4">
                    {job.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{job.source}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(job.postedAt)}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Job Details Panel */}
        <AnimatePresence>
          {selectedJob && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setSelectedJob(null)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-card/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                        {selectedJob.companyLogo ? (
                          <img 
                            src={selectedJob.companyLogo} 
                            alt={selectedJob.company}
                            className="h-10 w-10 object-contain"
                          />
                        ) : (
                          <Briefcase className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                        <p className="text-muted-foreground">{selectedJob.company}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedJob(null)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <Badge variant={selectedJob.remote === "remote" ? "success" : "secondary"}>
                      {selectedJob.remote}
                    </Badge>
                    <Badge variant="outline">{selectedJob.type}</Badge>
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">{selectedJob.matchScore}% match</span>
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      AI Summary
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This role is an excellent match for your profile. Your skills in {selectedJob.skills.slice(0, 3).join(", ")} align well with the job requirements. Consider highlighting your experience with these technologies in your application.
                    </p>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.requirements.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-green-500/10">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  {selectedJob.techStack && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skill Gaps */}
                  {selectedJob.skillGaps && selectedJob.skillGaps.length > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                      <h3 className="font-semibold mb-2 text-yellow-400">Skill Gaps</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Consider learning these skills to improve your match:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skillGaps.map((skill) => (
                          <Badge key={skill} variant="warning">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <Button className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Apply Now
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Generate Resume
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Mail className="h-4 w-4" />
                        Generate Cover Letter
                      </Button>
                    </div>
                    <Button variant="ghost" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Original Posting
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
