export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  details: string;
  budget: string;
  serviceInterest?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'closed';
  createdAt: string;
}

export interface MeetingBooking {
  id: string;
  name: string;
  email: string;
  company?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. '10:00 AM'
  durationMinutes: number;
  meetingType: 'Discovery Call' | 'Technical Architecture' | 'Product Demo';
  notes?: string;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  techStack: string[];
  deliverables: string[];
  caseStudySnippet: {
    client: string;
    metric: string;
    summary: string;
  };
  gridSpan: string; // e.g., 'col-span-1 md:col-span-2'
}

export interface AIEstimateRequest {
  projectType: string;
  description: string;
  budgetRange: string;
  timeline: string;
  keyFeatures?: string[];
}

export interface AIEstimateResponse {
  summary: string;
  recommendedArchitecture: string[];
  estimatedTimelineWeeks: string;
  suggestedPhasePlan: { phase: string; title: string; duration: string; details: string }[];
  keyRisksAndMitigations: string[];
  estimatedBudgetMatch: string;
}
