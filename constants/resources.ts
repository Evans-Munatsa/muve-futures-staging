import { PolicyDocument, FAQItem, ResourceArticle } from '@/app/types';

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: 'ebsna-guide',
    title: 'De-escalating School Anxiety: A Practical Toolkit for SENCOs and Families',
    category: 'EBSNA & Attendance',
    readTime: '6 min read',
    publishedDate: 'Feb 2026',
    author: 'Marcus Reid (Head of AP)',
    summary: 'A compassionate, evidence-based guide detailing why coercive attendance measures fail school-avoidant pupils and how gradual low-demand steps rebuild genuine safety.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80',
    tags: ['EBSNA', 'Anxiety', 'SENCO Toolkit', 'Attendance']
  },
  {
    id: 'section19-statutory',
    title: 'Demystifying Section 19: Local Authority Duties for Medically Absent Learners',
    category: 'Local Authority & Section 19',
    readTime: '8 min read',
    publishedDate: 'Jan 2026',
    author: 'Dr. Sarah Jenkins (Education Director)',
    summary: 'A clear breakdown of statutory obligations under Section 19 of the Education Act 1996 for children who cannot attend school due to illness or exclusion.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    tags: ['Section 19', 'Local Authority', 'Statutory Duty', 'EOTAS']
  },
  {
    id: 'neuroaffirming-classroom',
    title: 'Creating Low-Arousal Learning Environments for Autistic Learners',
    category: 'SEND Strategies',
    readTime: '5 min read',
    publishedDate: 'Nov 2025',
    author: 'Anita Patel (Lead Educational Psychologist)',
    summary: 'Practical tips on lighting, acoustic management, non-verbal options, and sensory reset stations to eliminate cognitive fatigue and sensory overload.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    tags: ['Autism', 'Sensory', 'Neurodivergence', 'Classroom Design']
  },
  {
    id: 'parent-partnership-guide',
    title: 'Parent & Carer Guide: Navigating the AP Referral and EHCP Process',
    category: 'Parent Guides',
    readTime: '7 min read',
    publishedDate: 'Oct 2025',
    author: 'David Okafor (Pastoral Lead)',
    summary: 'Everything families need to know when a school or local authority proposes alternative provision, including rights, funding, and transition expectations.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
    tags: ['Parents', 'EHCP', 'Rights', 'Commissioning']
  }
];

export const RESOURCES_LIST = RESOURCE_ARTICLES;

export const POLICY_DOCUMENTS: PolicyDocument[] = [
  {
    id: 'pol-safeguarding',
    title: 'Child Protection & Safeguarding Policy 2025/2026',
    category: 'Safeguarding',
    lastUpdated: 'September 2025',
    fileSize: '1.4 MB PDF',
    description: 'Comprehensive safeguarding procedures conforming to Keeping Children Safe in Education (KCSIE 2024/2025), Working Together to Safeguard Children, and local multi-agency safeguarding arrangements (BSSP).'
  },
  {
    id: 'pol-send',
    title: 'Special Educational Needs & Disabilities (SEND) Policy & Information Report',
    category: 'Curriculum & SEND',
    lastUpdated: 'August 2025',
    fileSize: '950 KB PDF',
    description: 'Detailed framework for reasonable adjustments, graduated approach (Assess-Plan-Do-Review), and EHCP statutory compliance.'
  },
  {
    id: 'pol-ebsna',
    title: 'EBSNA & Low-Demand Reintegration Protocol',
    category: 'Curriculum & SEND',
    lastUpdated: 'October 2025',
    fileSize: '820 KB PDF',
    description: 'Clinical and trauma-informed guidance on managing school avoidance, sensory micro-stepping, and home-to-school transitional timetables.'
  },
  {
    id: 'pol-behaviour',
    title: 'Relational & Positive Behaviour Support Policy',
    category: 'Governance & Operations',
    lastUpdated: 'July 2025',
    fileSize: '1.1 MB PDF',
    description: 'Non-punitive, restorative framework emphasizing unconditional positive regard, de-escalation, and regulation before correction.'
  },
  {
    id: 'pol-admissions',
    title: 'Referral, Commissioning & Admissions Policy',
    category: 'Admissions',
    lastUpdated: 'August 2025',
    fileSize: '740 KB PDF',
    description: 'Statutory admissions criteria, Service Level Agreement (SLA) terms for local authorities and schools, Section 19 guidance, and pricing structure.'
  },
  {
    id: 'pol-complaints',
    title: 'Feedback, Concerns & Complaints Procedure',
    category: 'Governance & Operations',
    lastUpdated: 'June 2025',
    fileSize: '620 KB PDF',
    description: 'Transparent three-stage procedure for parents, carers, commissioners, and young people to voice concerns with designated ombudsman escalations.'
  }
];

export const POLICIES_DATA = POLICY_DOCUMENTS;

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-commissioning',
    category: 'Commissioning',
    question: 'Who can refer and commission a placement with Muve Futures?',
    answer: 'We accept referrals directly from Local Authorities (SEN departments, Virtual Schools, and EOTAS teams), Mainstream Schools and Academies, Alternative Provision Multi-Academy Trusts, and Social Care teams. We also welcome inquiries from Parents and Carers seeking Section 19 or personal budget funding.'
  },
  {
    id: 'faq-timeline',
    category: 'Commissioning',
    question: 'How quickly can an emergency educational package be deployed?',
    answer: 'For emergency or crisis referrals (e.g., medical exclusion, school breakdown), our rapid response team can complete the initial assessment within 48 hours and begin transitional education within 5 working days of SLA signing.'
  },
  {
    id: 'faq-ehcp',
    category: 'SEND Support',
    question: 'Does a child require an Education, Health and Care Plan (EHCP) to access Muve Futures?',
    answer: 'No. While many of our learners have an EHCP, we also support young people on SEN Support (K code), those undergoing statutory EHCP assessment, learners navigating medical absences, and young people experiencing acute EBSNA without a formal diagnosis.'
  },
  {
    id: 'faq-ebsna',
    category: 'Attendance & EBSNA',
    question: 'How do you handle young people who refuse to leave their bedroom or home?',
    answer: 'Our trauma-informed educators use gentle, zero-pressure micro-stepping. We begin with camera-off digital greetings, interest-based gaming/art discussions, and home garden meet-ups. We never force compliance; we establish safety and predictability first.'
  },
  {
    id: 'faq-funding',
    category: 'Costs & Funding',
    question: 'How are placements funded?',
    answer: 'Placements are typically funded by the placing school (using High Needs Top-Up or Pupil Premium), the Local Authority via Section 19 statutory duties or EOTAS budgets, or through direct payment personal health/education budgets (PHBs).'
  },
  {
    id: 'faq-reporting',
    category: 'Commissioning',
    question: 'What attendance and progress reporting do commissioners receive?',
    answer: 'Commissioners and schools receive real-time morning/afternoon statutory attendance logs (compatible with SIMS, Arbor, and Bromcom), weekly qualitative progress summaries, and comprehensive termly EHCP outcome tracking reports.'
  }
];

export const FAQS_DATA = FAQ_ITEMS;
