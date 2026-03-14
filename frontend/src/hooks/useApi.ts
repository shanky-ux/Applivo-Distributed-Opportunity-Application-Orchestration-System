"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  authApi, 
  jobsApi, 
  applicationsApi, 
  resumesApi, 
  coverLettersApi,
  interviewsApi,
  analyticsApi,
  agentApi,
  chatApi,
  settingsApi,
  profileApi
} from "@/services/api";
import type { 
  JobFilters, 
  ApplicationStatus, 
  UserSettings,
  AgentStatus 
} from "@/types";

// Auth Hooks
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: authApi.getCurrentUser,
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => 
      authApi.login(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) => 
      authApi.register(name, email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user);
    },
  });
};

// Jobs Hooks
export const useJobs = (filters?: JobFilters) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => jobsApi.getJobs(filters),
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => jobsApi.getJobById(id),
    enabled: !!id,
  });
};

export const useScrapeJobs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: jobsApi.scrapeJobs,
    onSuccess: () => {
      console.log("Scraping started successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error: any) => {
      // Show error in console for debugging
      console.error("Scrape error:", error?.response?.data || error.message);
    },
  });
};

// Applications Hooks
export const useApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: applicationsApi.getApplications,
  });
};

export const useApplication = (id: string) => {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => applicationsApi.getApplicationById(id),
    enabled: !!id,
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, resumeId, coverLetterId }: { 
      jobId: string; 
      resumeId?: string; 
      coverLetterId?: string 
    }) => applicationsApi.createApplication(jobId, resumeId, coverLetterId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) => 
      applicationsApi.updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applicationsApi.deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

// Resumes Hooks
export const useResumes = () => {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: resumesApi.getResumes,
  });
};

export const useResume = (id: string) => {
  return useQuery({
    queryKey: ["resume", id],
    queryFn: () => resumesApi.getResumeById(id),
    enabled: !!id,
  });
};

export const useUploadResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resumesApi.uploadResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
};

export const useGenerateResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resumesApi.generateResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resumesApi.deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
};

// Cover Letters Hooks
export const useCoverLetters = () => {
  return useQuery({
    queryKey: ["coverLetters"],
    queryFn: coverLettersApi.getCoverLetters,
  });
};

export const useCoverLetter = (id: string) => {
  return useQuery({
    queryKey: ["coverLetter", id],
    queryFn: () => coverLettersApi.getCoverLetterById(id),
    enabled: !!id,
  });
};

export const useGenerateCoverLetter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: coverLettersApi.generateCoverLetter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coverLetters"] });
    },
  });
};

export const useDeleteCoverLetter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: coverLettersApi.deleteCoverLetter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coverLetters"] });
    },
  });
};

// Interviews Hooks
export const useInterviews = () => {
  return useQuery({
    queryKey: ["interviews"],
    queryFn: interviewsApi.getInterviews,
  });
};

export const useInterview = (id: string) => {
  return useQuery({
    queryKey: ["interview", id],
    queryFn: () => interviewsApi.getInterviewById(id),
    enabled: !!id,
  });
};

export const useCreateInterview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId, interviewDate, interviewType }: { 
      applicationId: string; 
      interviewDate: string; 
      interviewType: string 
    }) => interviewsApi.createInterview(applicationId, interviewDate, interviewType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
  });
};

// Analytics Hooks
export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: analyticsApi.getAnalytics,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: analyticsApi.getDashboardStats,
  });
};

export const useActivityFeed = (limit?: number) => {
  return useQuery({
    queryKey: ["activityFeed", limit],
    queryFn: () => analyticsApi.getActivityFeed(limit),
  });
};

// Agent Hooks
export const useAgentStatus = () => {
  return useQuery({
    queryKey: ["agentStatus"],
    queryFn: agentApi.getStatus,
  });
};

export const useUpdateAgentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: agentApi.updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agentStatus"] });
    },
  });
};

export const useRunAgentCycle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: agentApi.runAgentCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agentLogs"] });
    },
  });
};

export const useAgentLogs = (limit?: number) => {
  return useQuery({
    queryKey: ["agentLogs", limit],
    queryFn: () => agentApi.getLogs(limit),
  });
};

// Chat Hooks
export const useChatMessage = () => {
  return useMutation({
    mutationFn: ({ message, conversationId }: { message: string; conversationId?: string }) => 
      chatApi.sendMessage(message, conversationId),
  });
};

// Settings Hooks
export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: settingsApi.getSettings,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: settingsApi.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};

// Profile Hooks
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
