// Help article category
export type HelpCategory = 
  | 'getting-started' 
  | 'account' 
  | 'billing' 
  | 'file-conversion' 
  | 'troubleshooting';

// Help article interface
export interface HelpArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: HelpCategory;
  tags: string[];
  lastUpdated: string; // ISO date string
  publishedAt: string; // ISO date string for original publication date
}

// FAQ interface
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: HelpCategory;
}

// Contact support form data
export interface SupportRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
} 