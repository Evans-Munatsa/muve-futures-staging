export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'who-we-support'
  | 'resources'
  | 'contact'
  | 'referral'
  | 'coming-soon'
  | 'not-found'
  | 'server-error';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  keyFeatures: string[];
  icon?: string;
  category?: 'Specialist 1:1' | 'Group Provision' | 'Reintegration' | 'Vocational';
  ageRange?: string;
  deliveryMode?: 'On-site' | 'In-school' | 'Hybrid' | 'Community Outreach';
}

export interface FrameworkStage {
  step: number;
  title: string;
  headline: string;
  description: string;
  activities: string[];
}

export interface PillarItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  points?: string[];
  description?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  specialisms: string[];
  image: string;
}

export interface CaseStudy {
  id: string;
  studentPseudonym: string;
  age: string;
  background: string;
  needs: string[];
  intervention: string;
  outcome: string;
  quote: string;
  title?: string;
  ageGroup?: string;
  primaryNeed?: string;
  duration?: string;
  quoteAuthor?: string;
}

export interface ResourceArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  summary: string;
  image: string;
  tags: string[];
}

export interface PolicyDocument {
  id: string;
  title: string;
  category: 'Safeguarding' | 'Curriculum & SEND' | 'Governance & Operations' | 'Admissions';
  lastUpdated: string;
  fileSize: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Commissioning' | 'SEND Support' | 'Attendance & EBSNA' | 'Costs & Funding';
}

export interface ReferralFormData {
  referrerType: 'Local Authority' | 'School / Academy' | 'Parent / Carer' | 'Social Worker / Healthcare' | 'Other';
  referrerName: string;
  referrerEmail: string;
  referrerPhone: string;
  organisationName: string;
  learnerAgeGroup: '4-7 (KS1)' | '8-11 (KS2)' | '11-14 (KS3)' | '14-16 (KS4)' | '16-19 (Post-16)' | '19-25 (Young Adult)';
  primaryNeeds: string[];
  currentSetting: string;
  hasEhcp: boolean;
  fundingSource: string;
  urgency: 'Immediate (Within 48h)' | 'Next Half-Term' | 'Planned Intake';
  notes: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  organisation: string;
  role: string;
  message: string;
}
