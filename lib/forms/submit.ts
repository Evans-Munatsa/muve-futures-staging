'use server';

import { randomBytes } from 'node:crypto';
import { and, eq, gt } from 'drizzle-orm';
import { db, hasDatabase, schema } from '@/lib/db';
import { getSingle } from '@/lib/content/queries';
import type { FormKind, SubmissionSection } from '@/lib/db/schema';
import { INBOXES, type BotMeta, type SubmitResult } from './shared';

/*
 * Server side of every website form. Input comes from the browser, so it's
 * treated as unknown: each value is read as trimmed, length-capped text and
 * the required fields are checked again here. Answers are stored as labelled
 * sections so the dashboard Inbox can show any form.
 */

type Input = Record<string, unknown>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Faster than this after the form appeared is a bot. */
const MIN_FILL_MS = 2500;
/** A second identical submission within this window returns the first reference (double clicks). */
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;

const obj = (value: unknown): Input => (value && typeof value === 'object' && !Array.isArray(value) ? (value as Input) : {});
const str = (value: unknown, max = 500) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const bool = (value: unknown) => value === true;
const list = (value: unknown, max = 20) => (Array.isArray(value) ? value.map((v) => str(v, 200)).filter(Boolean).slice(0, max) : []);
const yesNo = (value: boolean) => (value ? 'Yes' : 'No');

function reference(form: FormKind) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return `${INBOXES[form].prefix}-${Array.from(randomBytes(6), (b) => alphabet[b % alphabet.length]).join('')}`;
}

/** Drops empty answers and empty sections. */
function sections(...parts: { title: string; fields: [string, string][] }[]): SubmissionSection[] {
  return parts
    .map(({ title, fields }) => ({ title, fields: fields.filter(([, v]) => v).map(([label, value]) => ({ label, value })) }))
    .filter((s) => s.fields.length);
}

function isBot(meta: unknown) {
  const m = obj(meta) as Partial<BotMeta>;
  return Boolean(str(m.website)) || !m.startedAt || Date.now() - Number(m.startedAt) < MIN_FILL_MS;
}

async function unavailable(): Promise<SubmitResult> {
  const { contact } = await getSingle('settings');
  return { ok: false, error: `Sorry, we couldn’t send your message just now. Please try again, or email us at ${contact.enquiriesEmail}.` };
}

interface Submission {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  answers: SubmissionSection[];
}

async function save(form: FormKind, meta: unknown, submission: Submission | string): Promise<SubmitResult> {
  // A validation message from the form's checks.
  if (typeof submission === 'string') return { ok: false, error: submission };
  // Bots get a quiet "thanks" so they don't learn anything.
  if (isBot(meta)) return { ok: true, reference: reference(form) };
  if (!hasDatabase) return unavailable();

  try {
    const [recent] = await db()
      .select({ reference: schema.formSubmissions.reference })
      .from(schema.formSubmissions)
      .where(
        and(
          eq(schema.formSubmissions.form, form),
          eq(schema.formSubmissions.email, submission.email),
          eq(schema.formSubmissions.subject, submission.subject),
          gt(schema.formSubmissions.createdAt, new Date(Date.now() - DUPLICATE_WINDOW_MS))
        )
      )
      .limit(1);
    if (recent) return { ok: true, reference: recent.reference };

    const ref = reference(form);
    await db()
      .insert(schema.formSubmissions)
      .values({ form, reference: ref, name: submission.name, email: submission.email, phone: submission.phone ?? '', subject: submission.subject, answers: submission.answers });
    return { ok: true, reference: ref };
  } catch (error) {
    console.error(`[forms] Couldn’t save a ${form} submission`, error);
    return unavailable();
  }
}

/** Shared checks for a name and email. Returns an error message or null. */
function contactProblem(name: string, email: string, phone?: string, phoneRequired = false) {
  if (!name) return 'Please enter your name.';
  if (!EMAIL.test(email)) return 'Please enter a valid email address.';
  if (phoneRequired && (phone ?? '').replace(/\D/g, '').length < 7) return 'Please enter a phone number we can reach you on.';
  return null;
}

// ── Person (title, date of birth, name, address) ──────────────────────────

function person(value: unknown) {
  const p = obj(value);
  const title = str(p.title, 40) === 'Other' ? str(p.titleOther, 40) : str(p.title, 40);
  return {
    title,
    dateOfBirth: str(p.dateOfBirth, 20),
    firstName: str(p.firstName, 100),
    middleName: str(p.middleName, 100),
    lastName: str(p.lastName, 100),
    address: [p.address1, p.address2, p.city, p.region, p.postcode, p.country].map((v) => str(v, 120)).filter(Boolean).join(', '),
  };
}

const fullName = (p: ReturnType<typeof person>) => [p.firstName, p.lastName].filter(Boolean).join(' ');

function personFields(p: ReturnType<typeof person>, middleLabel = 'Middle name'): [string, string][] {
  return [
    ['Title', p.title],
    ['Name', fullName(p)],
    [middleLabel, p.middleName],
    ['Date of birth', p.dateOfBirth],
    ['Address', p.address],
  ];
}

// ── The forms ──────────────────────────────────────────────────────────────

/** "Chat to Us" on the contact page. */
export async function submitContact(data: unknown, meta: unknown): Promise<SubmitResult> {
  const d = obj(data);
  const name = str(d.name, 120);
  const email = str(d.email, 254).toLowerCase();
  const phone = str(d.phone, 40);
  const subject = str(d.subject, 200);
  const message = str(d.message, 6000);
  const problem = contactProblem(name, email, phone, true) ?? (!subject ? 'Please add a subject.' : !message ? 'Please write your message.' : null);
  return save(
    'contact',
    meta,
    problem ?? {
      name,
      email,
      phone,
      subject,
      answers: sections(
        { title: 'Contact details', fields: [['Name', name], ['Email', email], ['Phone', phone]] },
        { title: 'Message', fields: [['Subject', subject], ['Message', message]] }
      ),
    }
  );
}

/** Make a Referral. */
export async function submitReferral(data: unknown, meta: unknown): Promise<SubmitResult> {
  const d = obj(data);
  const referrer = person(d.referrer);
  const individual = person(d.individual);
  const email = str(d.email, 254).toLowerCase();
  const phone = str(d.phone, 40);
  const referringFor = list(d.referringFor).map((v) => (v === 'Other' && str(d.referringForOther) ? `Other: ${str(d.referringForOther, 200)}` : v));
  const when = str(d.when, 60) === 'Other' ? `Other: ${str(d.whenOther, 200)}` : str(d.when, 60);
  const about = str(d.aboutYoungPerson, 6000);

  const problem =
    contactProblem(fullName(referrer), email, phone, true) ??
    (!str(d.organisation) ? 'Please enter your organisation.' : null) ??
    (!individual.firstName || !individual.lastName ? 'Please enter the young person’s name.' : null) ??
    (referringFor.length === 0 ? 'Please choose at least one type of support you are referring for.' : null) ??
    (!when ? 'Please tell us when support is required.' : null) ??
    (!about ? 'Please tell us briefly about the young person and what support they need.' : null) ??
    (!bool(d.consentToShare) || !bool(d.understandsUse) ? 'Please confirm both declarations.' : null);

  return save(
    'referral',
    meta,
    problem ?? {
      name: fullName(referrer),
      email,
      phone,
      subject: `Referral for ${fullName(individual)}`.slice(0, 200),
      answers: sections(
        {
          title: '1. Referrer details',
          fields: [
            ...personFields(referrer),
            ['Email', email],
            ['Phone', phone],
            ['Organisation', str(d.organisation, 200)],
            ['Role', str(d.role, 200)],
            ['Relationship to the young person', str(d.relationship, 200)],
            ['Happy to be contacted about this referral', str(d.happyToBeContacted, 10)],
          ],
        },
        {
          title: '2. Individual details',
          fields: [
            ...personFields(individual, 'Preferred name'),
            ['Aware of this referral', yesNo(bool(d.individualAware))],
            ['Referral made in their best interests', yesNo(bool(d.bestInterests))],
            ['Referral note', str(d.referralNote, 6000)],
          ],
        },
        {
          title: '3. Support requested',
          fields: [
            ['Referring for', referringFor.join(', ')],
            ['When support is required', when],
            ['About the young person and the support they need', about],
          ],
        },
        { title: '4. Additional information', fields: [['Anything else', str(d.additionalInfo, 6000)]] },
        {
          title: '5. Consent',
          fields: [
            ['Has consent or authority to share this information', yesNo(bool(d.consentToShare))],
            ['Understands how the information will be used', yesNo(bool(d.understandsUse))],
          ],
        },
        { title: '6. Next steps', fields: [['Preferred contact method', str(d.contactMethod, 60)]] }
      ),
    }
  );
}

/** Partnerships. */
export async function submitPartnership(data: unknown, meta: unknown): Promise<SubmitResult> {
  const d = obj(data);
  const p = person(d.person);
  const email = str(d.email, 254).toLowerCase();
  const phone = str(d.phone, 40);
  const organisation = str(d.organisation, 200);
  const problem =
    contactProblem(fullName(p), email, phone, true) ??
    (!organisation ? 'Please enter your organisation.' : null) ??
    (!str(d.contactMethod) ? 'Please choose a preferred contact method.' : null);

  return save(
    'partnership',
    meta,
    problem ?? {
      name: fullName(p),
      email,
      phone,
      subject: `Partnership enquiry from ${organisation}`.slice(0, 200),
      answers: sections(
        {
          title: 'About you',
          fields: [...personFields(p), ['Email', email], ['Phone', phone], ['Organisation', organisation], ['Role', str(d.role, 200)], ['Based in', str(d.location, 200)]],
        },
        {
          title: 'The partnership',
          fields: [
            ['Interested in', list(d.types).join(', ')],
            ['How they’d like to work with MUVE Futures', str(d.howToWork, 6000)],
            ['Preferred contact method', str(d.contactMethod, 60)],
          ],
        }
      ),
    }
  );
}

/** Book an Intro. */
export async function submitBookIntro(data: unknown, meta: unknown): Promise<SubmitResult> {
  const d = obj(data);
  const name = str(d.name, 120);
  const email = str(d.email, 254).toLowerCase();
  const phone = str(d.phone, 40);
  const organisation = str(d.organisation, 200);
  const problem = contactProblem(name, email, phone);

  return save(
    'book-intro',
    meta,
    problem ?? {
      name,
      email,
      phone,
      subject: `Intro request${organisation ? ` from ${organisation}` : ''}`.slice(0, 200),
      answers: sections(
        { title: 'Contact details', fields: [['Name', name], ['Organisation', organisation], ['Email', email], ['Phone', phone]] },
        { title: 'When suits them', fields: [['Preferred date', str(d.preferredDate, 20)], ['Preferred time', str(d.preferredTime, 60)]] },
        { title: 'What they’d like to talk about', fields: [['Notes', str(d.notes, 6000)]] }
      ),
    }
  );
}

/** Feedback. */
export async function submitFeedback(data: unknown, meta: unknown): Promise<SubmitResult> {
  const d = obj(data);
  const name = [str(d.firstName, 100), str(d.lastName, 100)].filter(Boolean).join(' ');
  const email = str(d.email, 254).toLowerCase();
  const phone = str(d.phone, 40);
  const kind = ['Compliments', 'Complaints', 'Suggestion'].includes(str(d.kind)) ? str(d.kind) : 'Feedback';
  const message = str(d.message, 6000);
  const problem = contactProblem(name, email) ?? (!message ? 'Please write your message.' : null);

  return save(
    'feedback',
    meta,
    problem ?? {
      name,
      email,
      phone,
      subject: `${kind === 'Suggestion' ? 'A suggestion' : kind === 'Complaints' ? 'A complaint' : kind === 'Compliments' ? 'A compliment' : 'Feedback'} from ${name}`.slice(0, 200),
      answers: sections(
        { title: 'Feedback', fields: [['Type', kind], ['They are a', str(d.person, 60)], ['Message', message]] },
        { title: 'Contact details', fields: [['Name', name], ['Email', email], ['Phone', phone]] }
      ),
    }
  );
}

/** Newsletter sign-up (footer and coming-soon page). Signing up twice is fine. */
export async function subscribeNewsletter(emailInput: unknown, source: unknown, meta: unknown): Promise<SubmitResult> {
  const email = str(emailInput, 254).toLowerCase();
  if (!EMAIL.test(email)) return { ok: false, error: 'Please enter a valid email address.' };
  if (isBot(meta)) return { ok: true, reference: '' };
  if (!hasDatabase) return unavailable();
  try {
    await db()
      .insert(schema.newsletterSubscribers)
      .values({ email, source: str(source, 40) === 'coming-soon' ? 'coming-soon' : 'footer' })
      .onConflictDoNothing({ target: schema.newsletterSubscribers.email });
    return { ok: true, reference: '' };
  } catch (error) {
    console.error('[forms] Couldn’t save a newsletter sign-up', error);
    return unavailable();
  }
}
