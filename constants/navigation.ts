import React from 'react';
import { PageId } from '../types';
import {
  BookOpen,
  Layers,
  Award,
  HeartHandshake,
  UserCheck,
  Compass,
  FileText,
  ShieldCheck,
  HelpCircle,
  Send,
  Calendar,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';

export interface DropdownItem {
  label: string;
  sectionId: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

export interface NavLinkConfig {
  id: PageId;
  label: string;
  dropdown?: DropdownItem[];
}

export const SITE_CONFIG = {
  name: 'Muve Futures',
  tagline: 'Alternative Provision & Specialist Education',
  description: 'Specialist, relationship-based alternative provision supporting learners aged 4–25 across Birmingham and the West Midlands.',
  contact: {
    phone: '0121 405 9284',
    phoneFormatted: '+44 121 405 9284',
    email: 'referrals@muvefutures.co.uk',
    enquiriesEmail: 'info@muvefutures.co.uk',
    address: 'Regional Hub: 102 Colmore Row, Birmingham, B3 3AG',
    operatingHours: 'Monday – Friday: 8:00 AM – 5:30 PM',
    emergencyResponse: 'Emergency assessments deployed within 48 hours',
  },
  socials: {
    linkedin: 'https://linkedin.com/company/muve-futures',
    twitter: 'https://twitter.com/muvefutures',
    facebook: 'https://facebook.com/muvefutures',
  },
  compliance: {
    kcsie: 'KCSIE 2024/25 Compliant',
    dbs: '100% Enhanced DBS & Barred List Checked',
    ofsted: 'Operating under Section 19 Standards',
  },
};

export const NAV_LINKS_CONFIG: NavLinkConfig[] = [
  { id: 'home', label: 'Home' },
  // { id: 'about', label: 'About Us' },
  {
    id: 'services',
    label: 'Services',
    dropdown: [
      {
        label: 'Alternative Provision',
        sectionId: 'service-directory',
        description: '1:1 core education, specialist re-engagement & therapeutic AP',
        icon: BookOpen,
        tag: 'Direct Catalog',
      },
      {
        label: 'SEND',
        sectionId: 'delivery-models',
        description: '1:1 in-home, small cohort hubs & hybrid timetable options',
        icon: Layers,
        tag: 'Provision Models',
      },
      {
        label: 'One-To-One Education',
        sectionId: 'commissioning-guide',
        description: '4-step statutory compliance, QA framework & reporting standards',
        icon: Award,
        tag: 'SENCO & LA',
      },
      {
        label: 'Community Learning',
        sectionId: 'commissioning-guide',
        description: '4-step statutory compliance, QA framework & reporting standards',
        icon: Award,
        tag: 'SENCO & LA',
      },
      {
        label: 'Online Learning',
        sectionId: 'commissioning-guide',
        description: '4-step statutory compliance, QA framework & reporting standards',
        icon: Award,
        tag: 'SENCO & LA',
      },
      {
        label: 'Hybrid Learning',
        sectionId: 'commissioning-guide',
        description: '4-step statutory compliance, QA framework & reporting standards',
        icon: Award,
        tag: 'SENCO & LA',
      },
      {
        label: 'Reintegration Programmes',
        sectionId: 'commissioning-guide',
        description: '4-step statutory compliance, QA framework & reporting standards',
        icon: Award,
        tag: 'SENCO & LA',
      },
      {
        label: 'Transition Support',
        sectionId: 'commissioning-guide',
        description: '4-step statutory compliance, QA framework & reporting standards',
        icon: Award,
        tag: 'SENCO & LA',
      },
      {
        label: 'EOTAS',
        sectionId: 'commissioning-guide',
        description: '4-step statutory compliance, QA framework & reporting standards',
        icon: Award,
        tag: 'SENCO & LA',
      },
      {
        label: '52 Week Provision',
        sectionId: 'commissioning-guide',
        description: '4-step statutory compliance, QA framework & reporting standards',
        icon: Award,
        tag: 'SENCO & LA',
      },
    ],
  },
  {
    id: 'who-we-support',
    label: 'Who We Support',
    dropdown: [
      {
        label: 'Schools',
        sectionId: 'needs-matrix',
        description: 'EBSNA, complex SEND, neurodivergence, SEMH & EOTAS criteria',
        icon: HeartHandshake,
        tag: 'Inclusion Scope',
      },
      {
        label: 'Local Authorities',
        sectionId: 'case-studies',
        description: 'Real student journeys from school refusal to qualifications',
        icon: UserCheck,
        tag: 'Verified Outcomes',
      },
      {
        label: 'Commissioners',
        sectionId: 'transition-pathways',
        description: 'Structured reintegration back to school or Post-16 preparation',
        icon: Compass,
        tag: 'Next Steps',
      },
      {
        label: 'Virtual Schools',
        sectionId: 'transition-pathways',
        description: 'Structured reintegration back to school or Post-16 preparation',
        icon: Compass,
        tag: 'Next Steps',
      },
      {
        label: 'Parents & Families',
        sectionId: 'transition-pathways',
        description: 'Structured reintegration back to school or Post-16 preparation',
        icon: Compass,
        tag: 'Next Steps',
      },
      {
        label: 'Care Providers',
        sectionId: 'transition-pathways',
        description: 'Structured reintegration back to school or Post-16 preparation',
        icon: Compass,
        tag: 'Next Steps',
      },
      {
        label: 'SEND Professionals',
        sectionId: 'transition-pathways',
        description: 'Structured reintegration back to school or Post-16 preparation',
        icon: Compass,
        tag: 'Next Steps',
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resource',
    dropdown: [
      {
        label: 'About',
        sectionId: 'guides-library',
        description: 'EBSNA strategies, low-demand approaches & free SENCO guides',
        icon: FileText,
        tag: 'Practice Guides',
      },
      {
        label: 'Topics',
        sectionId: 'policy-downloads',
        description: 'KCSIE, safeguarding, behaviour, SEND & curriculum documents',
        icon: ShieldCheck,
        tag: 'Governance',
      },
      {
        label: 'Downloads',
        sectionId: 'referral-faq',
        description: 'Statutory duty answers, funding mechanics & daily attendance sync',
        icon: HelpCircle,
        tag: 'Knowledge Base',
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    dropdown: [
      {
        label: 'Chat to Us',
        sectionId: 'referral-form',
        description: 'Priority referral submission form for schools and local authorities',
        icon: Send,
        tag: 'Fast-Track',
      },
      {
        label: 'Make a Learner Referral',
        sectionId: 'referral-form',
        description: 'Priority referral submission form for schools and local authorities',
        icon: Send,
        tag: 'Fast-Track',
      },
      {
        label: 'Book Introduction',
        sectionId: 'locations-map',
        description: 'Birmingham, Solihull, Sandwell, Coventry & West Midlands hubs',
        icon: MapPin,
        tag: 'West Midlands',
      },
      {
        label: 'Partnerships',
        sectionId: 'general-enquiry',
        description: 'Book a professional consultation call or message our AP team',
        icon: Calendar,
        tag: 'Consultation',
      },
      {
        label: 'Careers',
        sectionId: 'locations-map',
        description: 'Birmingham, Solihull, Sandwell, Coventry & West Midlands hubs',
        icon: MapPin,
        tag: 'West Midlands',
      },
      
    ],
  },
];

export const FOOTER_SECTIONS = [
  {
    title: 'Key Provisions',
    links: [
      { label: 'EOTAS Section 19 Packages', href: '/services#service-directory' },
      { label: '52-Week Continuity Provision', href: '/services#service-directory' },
      { label: '1:1 Special Educational Support', href: '/services#delivery-models' },
      { label: 'EBSNA Re-engagement', href: '/who-we-support#needs-matrix' },
      { label: 'Post-16 Vocational Pathways', href: '/services#service-directory' },
    ],
  },
  {
    title: 'Commissioners & Schools',
    links: [
      { label: 'Make a Referral', href: '/contact#referral-form' },
      { label: 'Commissioning & QA Guide', href: '/services#commissioning-guide' },
      { label: 'Safeguarding & KCSIE', href: '/resources#policy-downloads' },
      { label: 'Frequently Asked Questions', href: '/resources#referral-faq' },
      { label: 'Upcoming Digital Portal', href: '/coming-soon' },
    ],
  },
  {
    title: 'Practitioners & Guides',
    links: [
      { label: 'EBSNA De-escalation Toolkit', href: '/resources#guides-library' },
      { label: 'Section 19 Statutory Guide', href: '/resources#guides-library' },
      { label: 'Low-Arousal Classroom Setup', href: '/resources#guides-library' },
      { label: 'Student Case Studies', href: '/who-we-support#case-studies' },
      { label: 'System Health / Status', href: '/500' },
    ],
  },
];
