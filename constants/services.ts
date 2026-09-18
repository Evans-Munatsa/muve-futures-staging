import { ServiceItem, FrameworkStage } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'eotas',
    name: 'EOTAS Provision',
    description: 'Education Other Than At School (EOTAS) packages specifically tailored for learners who cannot attend formal school settings due to illness, exclusion, or complex special educational needs.',
    keyFeatures: ['Bespoke timetable aligned with Section 19 statutory duty', 'Delivered in home, community or hybrid environments', 'Full EHCP outcome tracking and statutory reporting'],
    category: 'Specialist 1:1',
    ageRange: '4–25 Years',
    deliveryMode: 'Hybrid'
  },
  {
    id: '52-week',
    name: '52 Week Provision',
    description: 'Year-round continuous educational and pastoral support ensuring emotional stability for learners with high anxiety, complex attachment needs, or during holiday vulnerability.',
    keyFeatures: ['Continuous engagement preventing holiday regression', 'Therapeutic mentoring and life skills development', 'Consistent key worker support throughout all 52 weeks'],
    category: 'Group Provision',
    ageRange: '7–25 Years',
    deliveryMode: 'On-site'
  },
  {
    id: 'alternative-provision',
    name: 'Alternative Provision',
    description: 'Personalised, accredited and non-accredited learning pathways tailored for young people who require an alternative to mainstream schooling.',
    keyFeatures: ['Vocational and core academic subjects (GCSE & Functional Skills)', 'Trauma-informed, neuroaffirming staff team', 'Individualised pace and sensory-friendly learning spaces'],
    category: 'Group Provision',
    ageRange: '11–16 Years',
    deliveryMode: 'On-site'
  },
  {
    id: 'send-support',
    name: 'SEND Specialist Support',
    description: 'Specialised educational support for children and young people with Special Educational Needs and Disabilities (SEND), integrating sensory, cognitive, and communication adaptations.',
    keyFeatures: ['Autism, ADHD, Dyslexia, and sensory accommodations', 'Speech and language therapy integration', 'Collaboration with educational psychologists and local clinical networks'],
    category: 'Specialist 1:1',
    ageRange: '4–25 Years',
    deliveryMode: 'Hybrid'
  },
  {
    id: 'semh-support',
    name: 'SEMH Support',
    description: 'Dedicated provision for young people navigating Social, Emotional and Mental Health needs, prioritizing emotional regulation and safety before academic pressure.',
    keyFeatures: ['Zones of regulation and restorative de-escalation strategies', '1:1 relational mentoring and emotional literacy', 'Safe, non-punitive trauma-informed learning approach'],
    category: 'Specialist 1:1',
    ageRange: '7–19 Years',
    deliveryMode: 'In-school'
  },
  {
    id: 'ebsna-support',
    name: 'EBSNA Support',
    description: 'Emotionally Based School Non-Attendance (EBSNA) intervention designed to gently re-engage learners paralyzed by school-related anxiety or traumatic school experiences.',
    keyFeatures: ['Paced, micro-step re-engagement plans with zero pressure', 'Home visits and trust-building low-demand sessions', 'Family systemic support and low-demand educational bridging'],
    category: 'Reintegration',
    ageRange: '8–18 Years',
    deliveryMode: 'Community Outreach'
  },
  {
    id: 'one-to-one',
    name: 'One-to-One Education',
    description: 'Dedicated single-tutor and single-learner model focused entirely on the specific learning style, interests, and processing speed of the young person.',
    keyFeatures: ['Unconditional positive regard and individual pacing', 'Customised curriculum matched to the learner’s special interests', 'Safe, focused environment free from peer pressure'],
    category: 'Specialist 1:1',
    ageRange: '4–25 Years',
    deliveryMode: 'Hybrid'
  },
  {
    id: 'community-learning',
    name: 'Community Learning',
    description: 'Experiential and real-world education situated within local libraries, nature reserves, creative hubs, and community partner spaces.',
    keyFeatures: ['Real-world social interaction and community navigation', 'Outdoor learning, horticulture, and physical recreation', 'Practical life skills and independent travel practice'],
    category: 'Vocational',
    ageRange: '14–25 Years',
    deliveryMode: 'Community Outreach'
  },
  {
    id: 'online-learning',
    name: 'Online Specialist Learning',
    description: 'Interactive, live 1:1 and small group digital learning with vetted specialist teachers, perfect for medically vulnerable or high-anxiety learners.',
    keyFeatures: ['Camera-optional, low-sensory virtual classrooms', 'Recorded lessons and accessible multi-modal materials', 'Live pastoral check-ins and safeguarding oversight'],
    category: 'Specialist 1:1',
    ageRange: '7–25 Years',
    deliveryMode: 'Hybrid'
  },
  {
    id: 'hybrid-learning',
    name: 'Hybrid Learning Pathways',
    description: 'A balanced combination of virtual lessons, in-person mentoring, and community-based projects that adapts as the learner’s confidence develops.',
    keyFeatures: ['Graduated increase of in-person contact hours', 'Seamless digital curriculum continuity', 'Flexible timetable adjusting to energy and mental wellness'],
    category: 'Reintegration',
    ageRange: '11–19 Years',
    deliveryMode: 'Hybrid'
  },
  {
    id: 'reintegration',
    name: 'Reintegration Roadmaps',
    description: 'Structured, supportive roadmaps helping learners return successfully to mainstream, special school settings, or vocational colleges when ready.',
    keyFeatures: ['Gradual timetable step-up and dual-registration support', 'Transition meetings and joint observations with destination staff', 'Post-transition follow-up and settling-in check-ins'],
    category: 'Reintegration',
    ageRange: '5–18 Years',
    deliveryMode: 'In-school'
  },
  {
    id: 'transition-support',
    name: 'Post-16 Transition & Prep',
    description: 'Guidance and preparation for crucial developmental milestones, including Post-16 pathways, independent living, supported internships, and adult life.',
    keyFeatures: ['Career guidance, CV preparation, and college taster visits', 'Budgeting, travel training, and self-advocacy skills', 'Multi-agency transition planning up to age 25'],
    category: 'Vocational',
    ageRange: '16–25 Years',
    deliveryMode: 'Community Outreach'
  }
];

export const FRAMEWORK_STAGES: FrameworkStage[] = [
  {
    step: 1,
    title: 'Engage',
    headline: 'Engage by building trust and understanding the learner.',
    description: 'Before any formal academic work begins, our specialist team focuses purely on relationship building, uncovering the young person’s unique interests, validating past difficulties, and establishing a safe emotional baseline.',
    activities: [
      'Low-pressure informal meet-and-greets at the learner’s pace',
      'Interest-led exploration (gaming, art, music, mechanics, animals)',
      'Sensory profile evaluation and preferred communication style mapping',
      'Listening deeply to parents, carers, and previous educators'
    ]
  },
  {
    step: 2,
    title: 'Assess & Plan',
    headline: 'Assess needs collaboratively and design a bespoke learning pathway.',
    description: 'We review existing EHCP outcomes, psychological assessments, and current emotional thresholds to co-create a tailored educational roadmap with transparent, realistic milestones.',
    activities: [
      'Baseline academic, social, and emotional competency mapping',
      'Co-designing the timetable with the learner and family',
      'Establishing clear crisis and regulation management strategies',
      'Setting meaningful small-step targets aligned with statutory goals'
    ]
  },
  {
    step: 3,
    title: 'Deliver & Adapt',
    headline: 'Deliver personalised provision with continuous real-time adaptations.',
    description: 'Experienced tutors and mentors provide one-to-one or small-group education. We constantly monitor engagement, cognitive load, and regulation, pivoting strategies dynamically when needed.',
    activities: [
      'Flexible 1:1 specialist tutoring and relational mentoring',
      'Curriculum tailored to learner strengths and accreditation goals',
      'Weekly multi-agency updates and attendance logging',
      'Sensory breaks and integrated emotional well-being practices'
    ]
  },
  {
    step: 4,
    title: 'Progress & Transition',
    headline: 'Celebrate achievements and prepare for confident, sustainable next steps.',
    description: 'Every programme is purpose-built to prepare learners for what comes next—whether that is mainstream reintegration, specialist schooling, college, apprenticeships, or independent living.',
    activities: [
      'Gradual exposure and accompanied visits to destination settings',
      'Handover packages and strategy briefings for receiving teams',
      'Accredited qualification achievement and portfolio handovers',
      'Ongoing post-transition mentoring and pastoral check-ins'
    ]
  }
];

export const DELIVERY_MODELS = [
  {
    title: 'One-to-One Specialist Mentoring',
    badge: 'High Impact',
    description: 'Dedicated educator working exclusively with one learner in their home, at our specialist center, or in a calm community venue.',
    ratio: '1:1 Ratio',
    bestFor: 'High anxiety, complex trauma, severe sensory overload, or school non-attendance.'
  },
  {
    title: 'Small Nurture Groups (Max 4)',
    badge: 'Social Focus',
    description: 'Calm, structured group learning designed to gently build peer collaboration and social communication without mainstream noise.',
    ratio: '1:4 Ratio',
    bestFor: 'Learners preparing for special school or college group settings.'
  },
  {
    title: 'Hybrid Digital & Physical',
    badge: 'Flexible',
    description: 'Blended schedule combining live specialist online lessons with accompanied weekly in-person outdoor or vocational projects.',
    ratio: 'Bespoke Blend',
    bestFor: 'Medically vulnerable learners, gradual step-ups, and rural locations.'
  },
  {
    title: 'Vocational & Community Pathways',
    badge: 'Practical',
    description: 'Hands-on learning in mechanics, horticulture, animal care, creative digital media, and cooking.',
    ratio: 'Practical 1:2',
    bestFor: 'Learners aged 14–25 preparing for direct employment or apprenticeships.'
  }
];

export const COMMISSIONING_STEPS = [
  {
    stepNumber: '01',
    title: 'Rapid Referral & Needs Triage',
    desc: 'School or Local Authority submits the learner referral. Our multi-disciplinary team reviews documentation within 24–48 hours.',
  },
  {
    stepNumber: '02',
    title: 'Family Engagement & Safety Mapping',
    desc: 'Informal, zero-pressure meet-and-greet to evaluate sensory thresholds, learner passions, and environmental adaptations.',
  },
  {
    stepNumber: '03',
    title: 'SLA Formalisation & Target Alignment',
    desc: 'Clear Service Level Agreement signed with explicit EHCP outcome linkages, timetable commitments, and statutory reporting intervals.',
  },
  {
    stepNumber: '04',
    title: 'Deployment & Daily Attendance Sync',
    desc: 'Provision commences with 100% attendance tracking directly fed into school and LA management systems twice daily.',
  },
];
