import { TeamMember } from '@/app/types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'sarah-jenkins',
    name: 'Dr. Sarah Jenkins',
    role: 'Director of Education & Safeguarding Lead',
    credentials: 'EdD, NPQH, PGCE, MA SEND',
    bio: 'With over 20 years leading specialist provision and local authority inclusion services, Sarah oversees quality assurance, KCSIE safeguarding compliance, and curriculum rigor.',
    specialisms: ['Statutory Safeguarding (DSL Level 4)', 'Complex SEND Provision', 'Curriculum Design', 'Ofsted Readiness'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'marcus-reid',
    name: 'Marcus Reid',
    role: 'Head of Alternative Provision & Reintegration',
    credentials: 'BSc (Hons), QTS, Trauma-Informed Schools Practitioner',
    bio: 'Marcus has pioneered bespoke 1:1 and small-group engagement models across the West Midlands, successfully transitioning over 150 school-refusing learners back into education.',
    specialisms: ['EBSNA Micro-stepping', 'Trauma & Attachment', 'Restorative Practice', 'Post-16 Progression'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'anita-patel',
    name: 'Anita Patel',
    role: 'Lead Educational Psychologist & SEND Consultant',
    credentials: 'D.Ed.Psy, CPsychol, AFBPsS',
    bio: 'Anita specializes in neuroaffirming profiling for autistic learners, ADHDers, and young people with Pathological Demand Avoidance (PDA) profiles.',
    specialisms: ['Neuroaffirming Assessments', 'PDA Profiles', 'Sensory Modulation', 'EHCP Annual Reviews'],
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'david-okafor',
    name: 'David Okafor',
    role: 'Pastoral & Relational Mentoring Lead',
    credentials: 'BA Youth & Community Work, Zones of Regulation Trainer',
    bio: 'David leads our community learning and vocational outreach programmes, connecting learners with creative technology, sports, and practical trade experiences.',
    specialisms: ['Relational Mentoring', 'Youth Justice Diversion', 'Community Hub Partnerships', 'Life Skills & Independence'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  }
];

export const IMPACT_METRICS = [
  { value: '96%', label: 'Positive Progression', subtext: 'Learners successfully progressing to school, college or training' },
  { value: '48 hrs', label: 'Rapid Assessment', subtext: 'Emergency placement response time across the West Midlands' },
  { value: '100%', label: 'KCSIE Compliant', subtext: 'All staff Enhanced DBS checked with Level 3 Safeguarding training' },
  { value: '4–25', label: 'Age Continuum', subtext: 'Seamless developmental coverage from KS1 through adult transition' }
];
