"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Calendar, 
  FileText, 
  Mail, 
  MoreHorizontal,
  GripVertical,
  X,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApplications } from "@/hooks/useApi";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import type { Application, ApplicationStatus } from "@/types";

const columns: { id: ApplicationStatus; title: string; color: string }[] = [
  { id: "saved", title: "Saved", color: "bg-blue-500" },
  { id: "queued", title: "Queued", color: "bg-yellow-500" },
  { id: "applied", title: "Applied", color: "bg-purple-500" },
  { id: "viewed", title: "Viewed", color: "bg-orange-500" },
  { id: "shortlisted", title: "Shortlisted", color: "bg-green-500" },
  { id: "interview_scheduled", title: "Interview Scheduled", color: "bg-cyan-500" },
  { id: "interview_completed", title: "Interview Completed", color: "bg-teal-500" },
  { id: "offer", title: "Offer", color: "bg-emerald-500" },
  { id: "rejected", title: "Rejected", color: "bg-red-500" },
];

const statusColors: Record<ApplicationStatus, string> = {
  saved: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  queued: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  applied: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  viewed: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  shortlisted: "bg-green-500/20 text-green-400 border-green-500/30",
  interview_scheduled: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  interview_completed: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  offer: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function ApplicationsPage() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  const { data: applications = [] } = useApplications();

  const getApplicationsByStatus = (status: ApplicationStatus) => {
    return applications.filter((app) => app.status === status);
  };

  const handleDragStart = (applicationId: string) => {
    setDraggedCard(applicationId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: ApplicationStatus) => {
    if (draggedCard) {
      console.log(`Moving application ${draggedCard} to ${status}`);
      setDraggedCard(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Application Tracker</h1>
            <p className="text-muted-foreground">Track and manage your job applications</p>
          </div>
          <Button>+ Add Application</Button>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {columns.map((column) => (
              <div
                key={column.id}
                className="w-72"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-2 w-2 rounded-full ${column.color}`} />
                  <h3 className="font-semibold">{column.title}</h3>
                  <Badge variant="secondary" className="ml-auto">
                    {getApplicationsByStatus(column.id).length}
                  </Badge>
                </div>
                <div className="space-y-3 min-h-[200px] p-2 rounded-xl bg-card/30 border border-white/5">
                  <AnimatePresence>
                    {getApplicationsByStatus(column.id).map((application) => (
                      <motion.div
                        key={application.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        draggable
                        onDragStart={() => handleDragStart(application.id)}
                        className={`p-3 rounded-lg bg-card/80 border border-white/10 cursor-pointer transition-all duration-200 hover:bg-card hover:border-white/20 hover:shadow-lg ${
                          draggedCard === application.id ? "opacity-50" : ""
                        }`}
                        onClick={() => setSelectedApplication(application)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                            {application.job.companyLogo ? (
                              <img 
                                src={application.job.companyLogo} 
                                alt={application.job.company}
                                className="h-5 w-5 object-contain"
                              />
                            ) : (
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <button className="p-1 hover:bg-white/10 rounded">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                        <h4 className="font-medium text-sm mb-1 line-clamp-1">
                          {application.job.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {application.job.company}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {application.resumeVersion && `Resume: ${application.resumeVersion}`}
                          </span>
                          {application.appliedAt && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatRelativeTime(application.appliedAt)}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Details Panel */}
        <AnimatePresence>
          {selectedApplication && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setSelectedApplication(null)}
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
                        {selectedApplication.job.companyLogo ? (
                          <img 
                            src={selectedApplication.job.companyLogo} 
                            alt={selectedApplication.job.company}
                            className="h-10 w-10 object-contain"
                          />
                        ) : (
                          <Briefcase className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{selectedApplication.job.title}</h2>
                        <p className="text-muted-foreground">{selectedApplication.job.company}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedApplication(null)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <Badge className={`mb-6 ${statusColors[selectedApplication.status]}`}>
                    {selectedApplication.status.replace("_", " ")}
                  </Badge>

                  {/* Application History */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Application History
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span>Applied</span>
                        <span className="text-muted-foreground ml-auto">
                          {selectedApplication.appliedAt && formatDate(selectedApplication.appliedAt)}
                        </span>
                      </div>
                      {selectedApplication.viewedAt && (
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-orange-500" />
                          <span>Viewed by recruiter</span>
                          <span className="text-muted-foreground ml-auto">
                            {formatDate(selectedApplication.viewedAt)}
                          </span>
                        </div>
                      )}
                      {selectedApplication.interviewDate && (
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-cyan-500" />
                          <span>Interview scheduled</span>
                          <span className="text-muted-foreground ml-auto">
                            {formatDate(selectedApplication.interviewDate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Resume & Cover Letter */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Documents
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Resume</span>
                        </div>
                        <Badge variant="secondary">{selectedApplication.resumeVersion || "Default"}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Cover Letter</span>
                        </div>
                        <Badge variant="secondary">
                          {selectedApplication.coverLetterId ? "Generated" : "None"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Interview Details */}
                  {selectedApplication.interviewDate && (
                    <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-cyan-400" />
                        Interview Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Date:</span> {formatDate(selectedApplication.interviewDate)}</p>
                        <p><span className="text-muted-foreground">Type:</span> {selectedApplication.interviewType}</p>
                        {selectedApplication.recruiterName && (
                          <p><span className="text-muted-foreground">Recruiter:</span> {selectedApplication.recruiterName}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedApplication.notes && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Notes</h3>
                      <p className="text-sm text-muted-foreground p-3 rounded-lg bg-white/5">
                        {selectedApplication.notes}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Update Status
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Follow-up
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
