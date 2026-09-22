import { PillarItem } from '@/app/types';

export const PILLARS_DATA: PillarItem[] = [
  {
    id: 'personalised',
    title: 'Personalised',
    subtitle: 'Every learner is unique, so every curriculum is custom-built.',
    image: '/images/home/pillar-personalised.webp',
    tag: 'Personalised',
    description: 'We discard rigid one-size-fits-all curricula. Instead, learning pathways are co-designed around the young person’s passions, sensory thresholds, and pace.',
    points: [
      'Bespoke timetables tailored to sensory and cognitive profiles',
      'Interest-led learning modules (coding, creative arts, mechanics, nature)',
      'Low-demand pacing with zero punitive attendance pressure'
    ]
  },
  {
    id: 'relationship-based',
    title: 'Relationship Based',
    subtitle: 'Education begins with trust, connection, and unconditional positive regard.',
    image: '/images/home/pillar-relationship-based.webp',
    tag: 'Relationship Based',
    description: 'Academic learning is impossible without emotional regulation and psychological safety. Our mentors establish deep rapport before introducing tasks.',
    points: [
      'Consistent 1:1 trusted key worker dedicated to the learner',
      'Trauma-informed, attachment-aware restorative practice',
      'Safe, non-judgmental space where learners feel heard and valued'
    ]
  },
  {
    id: 'flexible',
    title: 'Flexible',
    subtitle: 'Adapting timetable, location, and teaching style to learner well-being.',
    image: '/images/home/pillar-flexible.webp',
    tag: 'Flexible',
    description: 'Provisions adapt dynamically in real-time. Whether delivered in the home, community hub, or virtual classroom, we meet learners wherever they are.',
    points: [
      'Multi-environment options: in-home, community library, or outreach hub',
      'Gradual micro-step timetable scaling based on weekly stamina',
      'Hybrid blend of practical life projects and academic milestones'
    ]
  },
  {
    id: 'outcome-focused',
    title: 'Outcome Focused',
    subtitle: 'Clear, measurable steps toward confidence, qualifications, and independence.',
    image: '/images/home/pillar-outcome-focused.webp',
    tag: 'Outcome Focused',
    description: 'Every session links to purposeful progression — whether that is reintegration into school, GCSEs/Functional Skills, or Post-16 independence.',
    points: [
      'Nationally accredited qualifications (Functional Skills & GCSEs)',
      'Transparent EHCP outcome mapping and weekly data for SENCOs',
      'Sustainable reintegration pathways and supported college transitions'
    ]
  }
];

export const CORE_VALUES = [
  {
    title: 'Unconditional Positive Regard',
    description: 'Every interaction begins with radical empathy, understanding that challenging behaviour communicates an unmet emotional or sensory need.',
  },
  {
    title: 'Trauma & Attachment Informed',
    description: 'Our educators are trained in brain-based trauma physiology, polyvagal theory, and therapeutic de-escalation.',
  },
  {
    title: 'Transparency with Multi-Agency Partners',
    description: 'We act as a seamless extension of schools and local authorities, providing punctual data, statutory compliance, and weekly updates.',
  },
];
