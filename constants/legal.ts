/**
 * Governance pages linked from the footer. Each renders at `/{slug}`.
 *
 * TODO: this copy is a starting point written from the site's existing
 * statements; it needs review and sign-off (legal / DPO) before launch.
 */

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalPage {
  slug: string;
  /** Footer link text. */
  label: string;
  title: string;
  intro: string;
  sections: LegalSection[];
  /** Mailbox for questions about this page. */
  contactEmail: string;
}

const OFFICE_ADDRESS = 'MUVE Futures, Suite 1, Aqueous II, Rocky Lane, Birmingham, B6 5RQ';

export const LEGAL_PAGES: LegalPage[] = [
  {
    slug: 'feedback-and-complaints',
    label: 'Feedback & Complaints',
    title: 'Feedback & Complaints',
    intro:
      'We welcome feedback from learners, families, schools, Local Authorities and professionals. Hearing what is working, and what is not, helps us improve the education and support we provide.',
    contactEmail: 'quality@muvefutures.co.uk',
    sections: [
      {
        heading: 'Sharing feedback',
        paragraphs: [
          'Compliments, suggestions and concerns can be shared with any member of our team or sent to our quality assurance team by email. Every piece of feedback is read and, where appropriate, used to improve how we work.',
        ],
      },
      {
        heading: 'Making a complaint',
        paragraphs: [
          'If you are unhappy with any part of our service, please tell us. We aim to resolve concerns informally and quickly wherever possible. If that is not possible, you can raise a formal complaint in writing.',
        ],
        list: [
          'Your name and contact details',
          'The learner, school or organisation the complaint relates to',
          'What happened, including dates where possible',
          'What you would like to happen to put things right',
        ],
      },
      {
        heading: 'What happens next',
        paragraphs: [
          'We will acknowledge your complaint, investigate it fairly and let you know the outcome and any actions we will take. If you are not satisfied with the response, you can ask for the complaint to be reviewed by a senior leader who was not involved in the original investigation.',
        ],
      },
      {
        heading: 'Safeguarding concerns',
        paragraphs: [
          'If your concern relates to the safety or welfare of a child or young person, please contact our Designated Safeguarding Lead straight away rather than using the complaints process. If a child is in immediate danger, call 999.',
        ],
      },
    ],
  },
  {
    slug: 'modern-slavery',
    label: 'Modern Slavery',
    title: 'Modern Slavery Statement',
    intro:
      'MUVE Futures has a zero-tolerance approach to modern slavery, human trafficking and exploitation in all its forms, across our education provision, our workforce and our supply chains.',
    contactEmail: 'info@muvefutures.co.uk',
    sections: [
      {
        heading: 'Our commitment',
        paragraphs: [
          'We are committed to acting ethically and with integrity in all our relationships, and to putting in place effective systems to make sure slavery and human trafficking are not taking place anywhere in our organisation or supply chains.',
        ],
      },
      {
        heading: 'Our people',
        list: [
          'Safer recruitment practices, including right-to-work and enhanced DBS checks',
          'Fair pay and clear terms of employment for all staff',
          'Training so that staff can recognise and report signs of exploitation',
          'A whistleblowing procedure that lets concerns be raised in confidence',
        ],
      },
      {
        heading: 'Our suppliers',
        paragraphs: [
          'We expect everyone we work with to share our standards. We consider the risk of modern slavery when choosing suppliers and will act on any concerns raised about a supplier or partner.',
        ],
      },
      {
        heading: 'Reporting a concern',
        paragraphs: [
          'Anyone who suspects modern slavery connected with our work should report it to us. Concerns can also be reported to the Modern Slavery & Exploitation Helpline on 08000 121 700, or to the police.',
        ],
      },
    ],
  },
  {
    slug: 'privacy-policy',
    label: 'Privacy Policy',
    title: 'Privacy Policy',
    intro:
      'MUVE Futures is committed to protecting the privacy of learners, parents, carers, professionals and commissioners. This policy explains what personal information we collect, why we collect it and how we keep it safe, in line with UK GDPR and the Data Protection Act 2018.',
    contactEmail: 'dpo@muvefutures.co.uk',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          `MUVE Futures is the data controller for personal information collected through this website and our services. Our office is at ${OFFICE_ADDRESS}.`,
        ],
      },
      {
        heading: 'Information we collect',
        list: [
          'Contact details you give us through our referral, introduction and enquiry forms',
          'Information about a learner shared as part of a referral, which may include details of their education, health or additional needs',
          'Your email address if you subscribe to our updates',
          'Basic technical information about how our website is used',
        ],
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'We use personal information to respond to enquiries, assess and arrange education provision, communicate with the people supporting a learner, meet our safeguarding and legal duties, and send updates you have asked to receive.',
          'Information about a learner is handled with particular care and is only shared with the people and organisations who need it to support them.',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: [
          'We keep personal information only for as long as we need it for the purpose it was collected, or as required by law, and then delete or destroy it securely.',
        ],
      },
      {
        heading: 'Your rights',
        list: [
          'Ask for a copy of the information we hold about you',
          'Ask us to correct information that is wrong or incomplete',
          'Ask us to delete information or restrict how we use it',
          'Object to how we use your information',
          'Withdraw consent at any time where we rely on your consent',
        ],
      },
      {
        heading: 'Raising a concern',
        paragraphs: [
          "If you are unhappy with how we have handled your information, please contact us first so we can put it right. You also have the right to complain to the Information Commissioner's Office (ico.org.uk).",
        ],
      },
    ],
  },
  {
    slug: 'terms-and-conditions',
    label: 'Terms + Conditions',
    title: 'Terms + Conditions',
    intro:
      'These terms apply to your use of the MUVE Futures website. By using this website you accept them. Education provision commissioned from MUVE Futures is also governed by the agreement made for each placement.',
    contactEmail: 'info@muvefutures.co.uk',
    sections: [
      {
        heading: 'Using this website',
        paragraphs: [
          'The information on this website is provided for general guidance about our services. We work to keep it accurate and up to date, but it does not form part of any agreement for education provision.',
        ],
      },
      {
        heading: 'Commissioned provision',
        paragraphs: [
          'Placements are arranged under a written agreement with the commissioning school, Local Authority or organisation. That agreement sets out the programme, responsibilities, reporting and fees, and takes priority over anything on this website.',
        ],
      },
      {
        heading: 'Content and copyright',
        paragraphs: [
          'The content, logos and images on this website belong to MUVE Futures or are used with permission. They may not be copied or reused without our written permission, except for personal, non-commercial use.',
        ],
      },
      {
        heading: 'Links to other websites',
        paragraphs: [
          'Where we link to other websites, we do so for convenience. We are not responsible for their content or privacy practices.',
        ],
      },
      {
        heading: 'Changes to these terms',
        paragraphs: [
          'We may update these terms from time to time. The version published on this page is the one that applies. These terms are governed by the law of England and Wales.',
        ],
      },
    ],
  },
  {
    slug: 'revoke-consents',
    label: 'Revoke consents',
    title: 'Revoke Consents',
    intro:
      'Where we rely on your consent, you can change your mind at any time. Withdrawing consent will not affect anything we did with your consent before you withdrew it.',
    contactEmail: 'dpo@muvefutures.co.uk',
    sections: [
      {
        heading: 'Consents you can withdraw',
        list: [
          'Photography and video of a learner',
          'Sharing information with named professionals or organisations',
          'Transport and off-site learning arrangements',
          'Email updates and newsletters',
        ],
      },
      {
        heading: 'How to withdraw consent',
        paragraphs: [
          "Email our Data Protection Officer with your name, the learner's name if the consent relates to a learner, and the consent you would like to withdraw. We will confirm once your preferences have been updated.",
          'To stop receiving email updates, you can also use the unsubscribe link at the bottom of any email we send.',
        ],
      },
      {
        heading: 'When we may still use information',
        paragraphs: [
          'Some information is used because the law requires it or because it is needed to keep a young person safe, rather than because of consent. In those cases we will explain why we need to keep using it.',
        ],
      },
    ],
  },
];

export const LEGAL_LINKS = LEGAL_PAGES.map(({ slug, label }) => ({ slug, label, href: `/${slug}` }));

export function getLegalPage(slug: string): LegalPage | undefined {
  return LEGAL_PAGES.find((page) => page.slug === slug);
}
