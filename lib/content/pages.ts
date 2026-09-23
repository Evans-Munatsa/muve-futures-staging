/**
 * Content types for the single pages (Home, About, overviews, forms,
 * Resources, site settings) and their built-in defaults. Defaults are the copy
 * the site shipped with; they're used until a document is saved in the
 * dashboard, and seeded into the database by `npm run db:seed`.
 *
 * In headings, a line break ("\n") becomes a line break on larger screens.
 */
import { FRAMEWORK_STAGES, PILLARS_DATA, SITE_CONFIG, FAQ_ITEMS, POLICY_DOCUMENTS } from '@/constants';
import type { FrameworkStage } from '@/app/types';

export interface CtaLabel {
  label: string;
}

// ── Site settings ──────────────────────────────────────────────────────────

export interface SettingsContent {
  siteName: string;
  tagline: string;
  /** Default meta description for search engines. */
  description: string;
  contact: {
    phone: string;
    /** International format used for tap-to-call links. */
    phoneInternational: string;
    referralsEmail: string;
    enquiriesEmail: string;
  };
  address: { heading: string; lines: string[] };
  socials: { linkedin: string; instagram: string; facebook: string };
  footerCredit: string;
  comingSoon: { heading: string };
}

export const DEFAULT_SETTINGS: SettingsContent = {
  siteName: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  description: SITE_CONFIG.description,
  contact: {
    phone: SITE_CONFIG.contact.phone,
    phoneInternational: SITE_CONFIG.contact.phoneFormatted,
    referralsEmail: SITE_CONFIG.contact.email,
    enquiriesEmail: SITE_CONFIG.contact.enquiriesEmail,
  },
  address: { heading: 'UK Office', lines: ['Suite 1', 'Aqueous II', 'Rocky Lane', 'Birmingham', 'B6 5RQ'] },
  socials: {
    linkedin: SITE_CONFIG.socials.linkedin,
    instagram: SITE_CONFIG.socials.instagram,
    facebook: SITE_CONFIG.socials.facebook,
  },
  footerCredit: 'All Rights Reserved. Site by Marva Group.',
  comingSoon: { heading: 'Website Launching Soon' },
};

// ── Home ───────────────────────────────────────────────────────────────────

export interface HomePillar {
  tag: string;
  title: string;
  subtitle: string;
  points: string[];
  image: string;
}

export interface HomeContent {
  hero: { title: string; intro: string; primaryCta: string; secondaryCta: string };
  quote: { text: string; cta: string };
  pillars: HomePillar[];
  journey: { title: string; body: string; cta: string };
  whoWeSupport: { eyebrow: string; title: string; body: string; cta: string };
  services: { eyebrow: string; title: string; intro: string; pills: { label: string; slug: string }[]; closing: string };
  framework: { eyebrow: string; title: string; intro: string; cta: string; stages: FrameworkStage[] };
  partnerships: { eyebrow: string; title: string; body: string; cta: string };
  referral: { eyebrow: string; title: string; body: string; cta: string };
  resources: { title: string; cta: string };
  closing: { title: string; body: string; cta: string };
}

export const DEFAULT_HOME: HomeContent = {
  hero: {
    title: 'Education That Starts With Understanding',
    intro:
      'Personalised Alternative Provision for young people aged 4–25 with SEND, SEMH, EBSNA or other barriers to learning. We create flexible programmes that rebuild confidence, reconnect learners with education and prepare them for what comes next.',
    primaryCta: 'Learn More',
    secondaryCta: 'Make a Referral',
  },
  quote: {
    text: '“Every programme is designed around the individual learner rather than expecting every learner to fit a standard model. We adapt education to meet each young person’s needs, goals and preferred way of learning.”',
    cta: 'Learn More',
  },
  pillars: PILLARS_DATA.map(({ tag, title, subtitle, points, image }) => ({ tag, title, subtitle, points: points ?? [], image })),
  journey: {
    title: 'Every Journey Starts\nSomewhere Different',
    body: 'Every learner’s journey is unique. Some have lost confidence in education, some are struggling with attendance and others simply need learning to look different. We begin by understanding the learner before designing the education pathway, ensuring every programme is built around their strengths, aspirations and individual needs.',
    cta: 'Make a Referral',
  },
  whoWeSupport: {
    eyebrow: 'Who We Support',
    title: 'Supporting Learners\nWith Diverse Needs',
    body: 'We support children and young people experiencing SEND, SEMH, Emotionally Based School Non-Attendance (EBSNA), medical needs, disrupted education, risk of exclusion and transition between educational settings.',
    cta: 'Explore Our Services',
  },
  services: {
    eyebrow: 'Our Services',
    title: 'Education That Adapts\nAround The Learner',
    intro: 'Our services include',
    pills: [
      { label: 'EOTAS', slug: 'eotas' },
      { label: '52 Week Provision', slug: '52-week-provision' },
      { label: 'Alternative Provision', slug: 'alternative-provision' },
      { label: 'SEND Support', slug: 'send-support' },
      { label: 'SEMH Support', slug: 'semh-support' },
      { label: 'EBSNA Support', slug: 'ebsna-support' },
      { label: 'One-to-One Education', slug: 'one-to-one-education' },
      { label: 'Community Learning', slug: 'community-learning' },
      { label: 'Online Learning', slug: 'online-learning' },
      { label: 'Hybrid Learning', slug: 'hybrid-learning' },
      { label: 'Reintegration', slug: 'reintegration-programmes' },
      { label: 'Transition Support', slug: 'transition-support' },
    ],
    closing: 'Every pathway is personalised around the learner.',
  },
  framework: {
    eyebrow: 'Our Framework',
    title: 'The Four\nStage Approach',
    intro: 'Every programme follows a structured approach',
    cta: 'Discover Our Approach',
    stages: FRAMEWORK_STAGES,
  },
  partnerships: {
    eyebrow: 'Partnerships',
    title: 'Working Together\nAround Every Learner',
    body: 'Positive outcomes are achieved through collaboration. We work closely with schools, Local Authorities, commissioners, families and professionals to create joined-up education pathways that place the learner at the centre of every decision.',
    cta: 'Book an Intro',
  },
  referral: {
    eyebrow: 'Referral',
    title: 'A Simple Referral Journey',
    body: 'Making a referral is straightforward. We begin with a conversation, understand the learner’s needs and desired outcomes, recommend the most appropriate pathway and provide regular communication throughout the programme.',
    cta: 'Make a Referral',
  },
  resources: { title: 'Resources For Schools, Families\nand Professionals', cta: 'Visit Our Resources' },
  closing: {
    title: 'Every Young Person\nDeserves The Opportunity\nTo Move Forward',
    body: 'Whether you’re ready to make a referral or simply want to discuss a learner’s needs, our team is here to help you find the right education pathway.',
    cta: 'Make a Referral',
  },
};

// ── About ──────────────────────────────────────────────────────────────────

export interface AboutContent {
  hero: { title: string; intro: string; cta: string };
  intro: { title: string; body: string };
  whyWeExist: { title: string; body: string; items: { label: string; copy: string }[] };
  whyChooseUs: { eyebrow: string; title: string; body: string; cta: string };
  closing: { title: string; body: string; cta: string };
}

export const DEFAULT_ABOUT: AboutContent = {
  hero: {
    title: 'More Than\nAlternative Provision',
    intro:
      'MUVE Futures provides personalised education that helps children and young people reconnect with learning, build confidence and prepare for positive futures. We believe education should adapt to the learner, not the learner to education.',
    cta: 'Book an Intro',
  },
  intro: {
    title: 'Education Built Around The Individual',
    body: 'Every child deserves an education that recognises their strengths, understands their challenges and provides the support they need to succeed. Our personalised approach focuses on the whole learner, not simply the barriers they face.',
  },
  whyWeExist: {
    title: 'Why We Exist',
    body: "MUVE Futures was created to provide meaningful education opportunities for children and young people who require a different pathway through learning. We believe Alternative Provision should create opportunities, not limitations, and every programme should be designed with the learner's future in mind.",
    items: [
      {
        label: 'Our Mission',
        copy: 'To create personalised education pathways that help every learner engage, progress and prepare for a positive future through flexible, relationship-based education.',
      },
      {
        label: 'Our Vision',
        copy: "To become one of the UK's most trusted Alternative Provision partners by delivering personalised education that improves outcomes for learners, schools, families and communities.",
      },
      {
        label: 'Our Values',
        copy: 'We are Personalised in our approach, Relationship Based in our practice, Flexible in our delivery and Outcome Focused in everything we do. These principles guide every decision we make.',
      },
    ],
  },
  whyChooseUs: {
    eyebrow: 'The Difference',
    title: 'Why Choose Us?',
    body: 'We look beyond labels and diagnoses to understand every learner as an individual. By working collaboratively with schools, families and professionals, we create education pathways that are meaningful, flexible and focused on long-term success.',
    cta: 'Discover Our Approach',
  },
  closing: {
    title: "Let's Build Better Futures Together",
    body: "Whether you're looking for Alternative Provision, exploring partnership opportunities or seeking advice about a learner, we'd love to hear from you.",
    cta: 'Book an Intro',
  },
};

// ── Services overview (/services) ──────────────────────────────────────────

export interface ServicesPageContent {
  hero: { badge: string; title: string; introLead: string; introHighlight: string; introTail: string; cta: string };
  whyChooseUs: { eyebrow: string; title: string; body: string; cta: string };
  closing: { title: string; body: string; cta: string };
}

export const DEFAULT_SERVICES_PAGE: ServicesPageContent = {
  hero: {
    badge: 'Accredited & Therapeutic Pathways',
    title: 'Education That Adapts Around The Learner',
    introLead: 'Our services include',
    introHighlight:
      'Alternative Provision, SEND Support, SEMH Support, EBSNA Support, One-to-One Education, Community Learning, Online Learning, Hybrid Learning, Reintegration Programmes, Transition Support, EOTAS & 52 Week Provision.',
    introTail: "Every service can be personalised around the learner's individual circumstances.",
    cta: 'Explore Our Services',
  },
  whyChooseUs: {
    eyebrow: 'Why Choose Us',
    title: 'Structured For Impact, Built With Care',
    body: "We don't simply deliver education. We build confidence, create positive relationships, support independence and prepare learners for successful futures through structured, personalised programmes.",
    cta: 'Explore Our Services',
  },
  closing: {
    title: 'Finding The Right Pathway Starts With A Conversation',
    body: "Every referral begins by understanding the learner. We'll help you identify the most appropriate education pathway and work collaboratively to achieve positive outcomes.",
    cta: 'Discuss a Learner',
  },
};

// ── Who We Support overview ────────────────────────────────────────────────

export interface WhoWeSupportPageContent {
  hero: { badge: string; title: string; intro: string; cta: string };
  workingTogether: { title: string; paragraphs: string[]; cta: string };
  closing: { title: string; body: string; cta: string };
}

export const DEFAULT_WHO_WE_SUPPORT_PAGE: WhoWeSupportPageContent = {
  hero: {
    badge: 'Who We Support',
    title: 'Education Built Around the Learner',
    intro:
      'Every child and young person deserves an education that recognises their strengths, responds to their needs and gives them a meaningful way forward. MUVE Futures supports learners aged 4 to 25 who may be struggling to access or remain in education. We also work closely with the families, schools, professionals and organisations involved in their journey.',
    cta: 'Talk to Our Team',
  },
  workingTogether: {
    title: 'Working together around\nevery learner',
    paragraphs: [
      'The best outcomes happen when the people supporting a learner share information, understand their responsibilities and work towards the same goals.',
      "We create personalised education pathways with clear outcomes, regular communication and joined-up planning. This helps everyone involved understand the programme, follow progress and contribute to the learner's next steps.",
    ],
    cta: 'Explore Our Services',
  },
  closing: {
    title: "Let's find the right way forward",
    body: "Whether you're a parent looking for guidance, a school seeking support or a professional exploring provision for a learner, our team is here to listen.",
    cta: 'Speak with our team',
  },
};

// ── Form pages ─────────────────────────────────────────────────────────────

export interface FormHero {
  badge: string;
  title: string;
  intro: string;
}

export interface FormsContent {
  contact: FormHero;
  referral: FormHero;
  bookIntro: FormHero;
}

export const DEFAULT_FORMS: FormsContent = {
  contact: {
    badge: 'Contact',
    title: "We're Here To Help",
    intro:
      "Whether you're a parent looking for guidance, a school seeking support or a professional exploring provision for a learner, our team is here to listen.",
  },
  referral: {
    badge: 'Referral',
    title: 'Make a Referral',
    intro:
      "Making a referral is straightforward. Tell us about the learner, and we'll get in touch to understand their needs and recommend the most appropriate pathway.",
  },
  bookIntro: {
    badge: 'Book an Intro',
    title: "Let's Start With A Conversation",
    intro: 'Book a short introduction with our team to talk about a learner, our services or working in partnership.',
  },
};

// ── Resources ──────────────────────────────────────────────────────────────

export interface ResourcesContent {
  hero: { badge: string; title: string; intro: string; searchPlaceholder: string };
  guides: { eyebrow: string; title: string };
  policies: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; category: string; lastUpdated: string; fileSize: string; description: string; fileUrl: string }[];
  };
  faqs: { eyebrow: string; title: string; intro: string; items: { question: string; answer: string; category: string }[] };
}

export const DEFAULT_RESOURCES: ResourcesContent = {
  hero: {
    badge: 'Knowledge Hub & Guidance Library',
    title: 'Resources For Schools, Families and Local Authorities',
    intro:
      'Expert insight, statutory policies, SENCO toolkits, and step-by-step guidance on navigating SEND, Section 19, and Emotionally Based School Non-Attendance (EBSNA).',
    searchPlaceholder: 'Search guides, policies, keywords (e.g. EBSNA, EHCP, attendance)...',
  },
  guides: { eyebrow: 'Expert Articles & Toolkits', title: 'Guidance & Practitioner Toolkits' },
  policies: {
    eyebrow: 'Governance & Transparency',
    title: 'Statutory Policies & Compliance Documents',
    intro: 'Download our verified policies updated for the 2025/2026 academic year in accordance with DfE statutory guidelines.',
    items: POLICY_DOCUMENTS.map(({ title, category, lastUpdated, fileSize, description }) => ({
      title,
      category,
      lastUpdated,
      fileSize,
      description,
      fileUrl: '',
    })),
  },
  faqs: {
    eyebrow: 'Frequently Asked Questions',
    title: 'Commissioning & Provision Answers',
    intro: 'Common questions from Headteachers, SENCOs, Local Authority caseworkers, and families.',
    items: FAQ_ITEMS.map(({ question, answer, category }) => ({ question, answer, category })),
  },
};
