import { CaseStudy } from '@/app/types';

export const SUPPORT_NEEDS = [
  {
    id: 'send',
    name: 'SEND & Neurodiversity',
    shortDesc: 'Autism, ADHD, PDA profiles, sensory processing differences, and speech & language challenges.',
    iconName: 'Sparkles',
    details: 'Specialised sensory-friendly spaces, visual schedules, low-demand approaches, and assistive tech.'
  },
  {
    id: 'semh',
    name: 'SEMH & Mental Health',
    shortDesc: 'Trauma, anxiety disorders, depression, attachment difficulties, and social dysregulation.',
    iconName: 'HeartHandshake',
    details: 'Zones of Regulation, 1:1 relational mentoring, non-punitive restorative de-escalation.'
  },
  {
    id: 'ebsna',
    name: 'EBSNA & School Anxiety',
    shortDesc: 'Emotionally Based School Non-Attendance, panic attacks, and severe sensory burnout.',
    iconName: 'Home',
    details: 'Graduated micro-stepping, home-based learning, confidence rebuilding, zero-demand starts.'
  },
  {
    id: 'medical',
    name: 'Medical & Physical Needs',
    shortDesc: 'Chronic illness, post-surgery recovery, autoimmune conditions, and reduced energy capacity.',
    iconName: 'ShieldAlert',
    details: 'Flexible pacing, hybrid delivery, hospital liaison, infection-controlled environments.'
  },
  {
    id: 'exclusion',
    name: 'Exclusion Prevention & Day 6',
    shortDesc: 'Pupils at risk of permanent exclusion or on statutory Day 6 alternative provision.',
    iconName: 'Compass',
    details: 'Fast-track turnaround, behavioral reset, vocational discovery, restorative reintegration.'
  },
  {
    id: 'post16',
    name: 'Post-16 & NEET Prevention',
    shortDesc: 'Young people aged 16-25 needing bridge programmes into apprenticeships, college, or adult living.',
    iconName: 'GraduationCap',
    details: 'Supported internships, Functional Skills Level 2, travel training, and independent living skills.'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-leo',
    studentPseudonym: 'Leo',
    title: 'Leo’s Pathway: Overcoming Severe EBSNA to Accreditations',
    age: 'Age 14 (Year 9)',
    ageGroup: 'Age 14 (KS3)',
    primaryNeed: 'Severe EBSNA & Autism',
    duration: '12 Months Provision',
    background: 'Leo had been out of formal education for 18 months following severe panic attacks on school grounds. Mainstream secondary felt overwhelming, resulting in total home withdrawal.',
    needs: ['Severe EBSNA & Social Anxiety', 'Diagnosed Autism (Sensory Overload)', 'Depression'],
    intervention: 'Muve Futures introduced a 1:1 tutor matching his intense interest in computer coding. Started with two 45-minute home sessions weekly, gradually incorporating outdoor walks and community digital labs.',
    outcome: 'Leo achieved 94% attendance across Year 10, passed 4 Functional Skills Level 2 awards, and is now dual-registered with a specialist college access programme.',
    quote: 'For the first time in two years, my son smiled on a Monday morning. Muve Futures gave us our family life back.',
    quoteAuthor: 'Sarah M. (Leo’s Mother)'
  },
  {
    id: 'case-maya',
    studentPseudonym: 'Maya',
    title: 'Maya’s Pathway: Relational Safety and Exclusion Prevention',
    age: 'Age 11 (Year 6)',
    ageGroup: 'Age 11 (KS2)',
    primaryNeed: 'SEMH & Emotional Regulation',
    duration: '6 Months Provision',
    background: 'Exclusion risk due to explosive emotional dysregulation during unstructured school breaks. She felt unlistened to and misunderstood by standard sanction policies.',
    needs: ['SEMH Needs', 'ADHD & Executive Dysfunction', 'Early Childhood Trauma'],
    intervention: 'Assigned a dedicated key worker utilizing restorative regulation techniques. Timetable featured frequent movement breaks, music therapy, and 1:1 emotional literacy mentoring.',
    outcome: 'Zero recorded crisis incidents over 6 months; successful transition into Year 7 with a tailored regulation passport and self-advocacy toolkit.',
    quote: 'They didn’t shout when I felt angry. They helped me breathe and understand what was happening inside my body.',
    quoteAuthor: 'Maya (Learner, Year 6)'
  },
  {
    id: 'case-jordan',
    studentPseudonym: 'Jordan',
    title: 'Jordan’s Pathway: From NEET Risk to Modern Engineering Apprenticeship',
    age: 'Age 17 (Post-16)',
    ageGroup: 'Age 17 (Post-16)',
    primaryNeed: 'Post-16 Vocational Transition',
    duration: '9 Months Provision',
    background: 'Jordan had dropped out of sixth form with no GCSE passes and was at risk of becoming permanently NEET (Not in Education, Employment, or Training).',
    needs: ['Speech, Language & Communication Needs', 'Low Academic Confidence', 'Disengaged NEET Status'],
    intervention: 'Enrolled on our 52-Week Community Learning and Supported Internship pathway with vocational placement in local horticulture and vehicle mechanics.',
    outcome: 'Completed City & Guilds Entry Level 3 accreditation and secured a paid modern apprenticeship with a local engineering firm.',
    quote: 'Muve Futures treated me like a capable young adult. They opened doors I thought were closed forever.',
    quoteAuthor: 'Jordan (Apprentice Learner)'
  }
];

export const TRANSITION_MILESTONES = [
  {
    phase: 'Phase 1: Stabilization & Trust',
    weeks: 'Weeks 1–4',
    focus: 'Emotional regulation baseline, sensory passport completion, zero pressure on output.',
  },
  {
    phase: 'Phase 2: Curriculum Exploration',
    weeks: 'Weeks 5–12',
    focus: 'Interest-led project modules, micro-step stamina building, baseline diagnostic assessments.',
  },
  {
    phase: 'Phase 3: Formal Accreditation',
    weeks: 'Weeks 13–24',
    focus: 'Functional Skills, GCSE coursework modules, community outreach and group interaction.',
  },
  {
    phase: 'Phase 4: Dual Registration & Transition Handover',
    weeks: 'Weeks 25+',
    focus: 'Supported setting visits, shadow days with receiving team, post-transition check-in safety net.',
  },
];
