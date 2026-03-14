// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  location?: string;
  experienceLevel?: string;
  preferredRoles?: string[];
  preferredLocations?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  remote: "remote" | "hybrid" | "onsite";
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  description: string;
  requirements: string[];
  niceToHave?: string[];
  techStack?: string[];
  matchScore: number;
  priorityScore: number;
  source: string;
  sourceUrl: string;
  postedAt: string;
  scrapedAt: string;
  skills: string[];
  skillGaps?: string[];
}

export interface JobFilters {
  search?: string;
  location?: string;
  type?: string;
  remote?: string;
  matchScoreMin?: number;
  source?: string;
}

export interface JobDetails extends Job {
  aiSummary: string;
  preferredSkills: string[];
}

// Application Types
export type ApplicationStatus = 
  | "saved" 
  | "queued" 
  | "applied" 
  | "viewed" 
  | "shortlisted" 
  | "interview_scheduled" 
  | "interview_completed" 
  | "offer" 
  | "rejected";

export interface Application {
  id: string;
  job: Job;
  status: ApplicationStatus;
  resumeId?: string;
  resumeVersion?: string;
  coverLetterId?: string;
  appliedAt?: string;
  viewedAt?: string;
  notes?: string;
  recruiterName?: string;
  recruiterEmail?: string;
  interviewDate?: string;
  interviewType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationHistory {
  id: string;
  applicationId: string;
  status: ApplicationStatus;
  timestamp: string;
  note?: string;
}

// Resume Types
export interface Resume {
  id: string;
  name: string;
  targetRole: string;
  atsScore?: number;
  fileUrl?: string;
  fileName?: string;
  jobId?: string;
  createdAt: string;
  updatedAt: string;
}

// Cover Letter Types
export interface CoverLetter {
  id: string;
  company: string;
  role: string;
  content: string;
  jobId?: string;
  createdAt: string;
}

// Interview Types
export interface Interview {
  id: string;
  applicationId: string;
  company: string;
  role: string;
  interviewDate: string;
  interviewType: "phone" | "video" | "onsite" | "technical" | "behavioral";
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  preparationPlan?: InterviewPreparation[];
  createdAt: string;
  updatedAt: string;
}

export interface InterviewPreparation {
  id: string;
  type: "technical" | "behavioral" | "company" | "questions";
  title: string;
  content: string;
}

// Analytics Types
export interface Analytics {
  totalApplications: number;
  totalResponses: number;
  totalInterviews: number;
  totalOffers: number;
  responseRate: number;
  interviewRate: number;
  offerRate: number;
  applicationsPerWeek: {
    week: string;
    count: number;
  }[];
  skillsDemand: {
    skill: string;
    count: number;
  }[];
}

// Agent Types
export interface AgentStatus {
  isRunning: boolean;
  autoJobDiscovery: boolean;
  autoResumeGeneration: boolean;
  autoApply: boolean;
  dailyApplicationLimit: number;
  matchScoreThreshold: number;
  lastRunAt?: string;
}

export interface AgentLog {
  id: string;
  task: string;
  status: "running" | "completed" | "failed" | "pending";
  timestamp: string;
  duration?: string;
  details?: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// Activity Types
export interface Activity {
  id: string;
  type: "job_scraped" | "resume_generated" | "application_submitted" | "notification_sent" | "interview_scheduled";
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Stats Types
export interface DashboardStats {
  applicationsSent: number;
  responsesReceived: number;
  interviewsScheduled: number;
  offersReceived: number;
}

// Settings Types
export interface UserSettings {
  profile: {
    name: string;
    location: string;
    experienceLevel: string;
    preferredRoles: string[];
    preferredLocations: string[];
  };
  automation: {
    autoApply: boolean;
    approvalRequired: boolean;
    dailyApplicationLimit: number;
  };
  integrations: {
    email: string;
    telegram?: string;
    calendar?: string;
  };
}
