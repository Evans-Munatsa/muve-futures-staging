import 'server-only';
import { getSingle } from '@/lib/content/queries';
import type { FormKind, SubmissionSection } from '@/lib/db/schema';
import { INBOXES } from '@/lib/forms/shared';
import { sendGraphMail } from './graph';
import { EMAIL_ROUTES, parseAddresses, type EmailRoute } from './routes';
import { getEmailSettings, isConfigured, type EmailSettings } from './settings';
import { renderBrandedEmail, type BrandedEmail } from './template';

/*
 * Forwards website forms to email, alongside the dashboard Inbox. Called
 * after the submission is saved (via next/server `after`), so a slow or
 * failing mail server never affects the person filling in the form; failures
 * are only logged. Nothing is sent until Settings → Email is set up.
 */

const ukTime = (date: Date) =>
  date.toLocaleString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

async function deliver(route: EmailRoute, build: (s: EmailSettings, address: string[]) => { subject: string; email: Omit<BrandedEmail, 'siteUrl' | 'address'>; replyTo?: { address: string; name?: string } }) {
  try {
    const settings = await getEmailSettings();
    const target = settings.routes[route];
    const to = parseAddresses(target.to);
    if (!settings.enabled || !target.enabled || !to.length || !isConfigured(settings)) return;
    const { address } = await getSingle('settings');
    const { subject, email, replyTo } = build(settings, address.lines);
    await sendGraphMail(settings, { to, subject, replyTo, html: renderBrandedEmail({ ...email, siteUrl: settings.siteUrl, address: address.lines }) });
  } catch (error) {
    console.error(`[email] Couldn’t email a ${route} submission`, error);
  }
}

export interface SavedSubmission {
  form: FormKind;
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  answers: SubmissionSection[];
  createdAt: Date;
}

export function notifySubmission(s: SavedSubmission) {
  const formName = EMAIL_ROUTES.find((r) => r.id === s.form)?.label ?? INBOXES[s.form].label;
  return deliver(s.form, (settings) => ({
    subject: `${formName}: ${s.subject} (${s.reference})`,
    replyTo: s.email ? { address: s.email, name: s.name } : undefined,
    email: {
      eyebrow: `Website form · ${formName}`,
      heading: s.subject,
      meta: [
        { label: 'Reference', value: s.reference },
        { label: 'Received', value: ukTime(s.createdAt) },
      ],
      sections: s.answers,
      button: { label: 'Open in dashboard', href: `${settings.siteUrl}/admin/inbox/${s.form}/${s.id}` },
      note: s.email ? `Reply to this email to answer ${s.name || 'them'} directly at ${s.email}.` : undefined,
    },
  }));
}

export interface SavedApplication {
  id: string;
  reference: string;
  vacancyTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  rightToWork: string;
  heardAbout: string;
  coverLetter: string;
  cvFileName: string;
  createdAt: Date;
}

export function notifyJobApplication(a: SavedApplication) {
  const name = `${a.firstName} ${a.lastName}`.trim();
  return deliver('job-application', (settings) => ({
    subject: `Job application: ${a.vacancyTitle} – ${name} (${a.reference})`,
    replyTo: { address: a.email, name },
    email: {
      eyebrow: 'Website form · Job application',
      heading: a.vacancyTitle,
      meta: [
        { label: 'Reference', value: a.reference },
        { label: 'Received', value: ukTime(a.createdAt) },
      ],
      sections: [
        {
          title: 'Applicant',
          fields: [
            ['Name', name],
            ['Email', a.email],
            ['Phone', a.phone],
            ['Location', a.location],
            ['Right to work in the UK', a.rightToWork],
            ['Heard about us', a.heardAbout],
          ]
            .filter(([, v]) => v)
            .map(([label, value]) => ({ label, value })),
        },
        ...(a.coverLetter ? [{ title: 'Cover letter', fields: [{ label: 'Message', value: a.coverLetter }] }] : []),
      ],
      // CVs stay in private storage, so link to them rather than attaching them.
      button: { label: 'View application and CV', href: `${settings.siteUrl}/admin/careers/${a.id}` },
      note: `The CV (${a.cvFileName}) is in the dashboard; you’ll need to sign in to download it. Reply to this email to contact ${a.firstName} directly.`,
    },
  }));
}

export function notifyNewsletter(email: string, source: string) {
  return deliver('newsletter', (settings) => ({
    subject: `Newsletter sign-up: ${email}`,
    email: {
      eyebrow: 'Website form · Newsletter',
      heading: 'New newsletter sign-up',
      sections: [{ title: 'Sign-up', fields: [{ label: 'Email', value: email }, { label: 'Where', value: source }] }],
      button: { label: 'See all sign-ups', href: `${settings.siteUrl}/admin/inbox/newsletter` },
    },
  }));
}

/** For Settings → Email: sends a sample and reports any error, unlike the quiet notifications above. */
export async function sendTestEmail(to: string): Promise<void> {
  const settings = await getEmailSettings();
  if (!isConfigured(settings)) throw new Error('Add the tenant ID, client ID, client secret and sender first.');
  const { address } = await getSingle('settings');
  await sendGraphMail(settings, {
    to: [to],
    subject: 'Test email from the Muve Futures website',
    html: renderBrandedEmail({
      eyebrow: 'Test email',
      heading: 'Email forwarding is working',
      intro: 'This is how website form submissions will look when they arrive by email.',
      meta: [
        { label: 'Reference', value: 'MF-R-EXAMPLE' },
        { label: 'Sent', value: ukTime(new Date()) },
      ],
      sections: [
        {
          title: '1. Referrer details',
          fields: [
            { label: 'Name', value: 'Jane Example' },
            { label: 'Email', value: 'jane@example.com' },
            { label: 'Organisation', value: 'Example Academy' },
          ],
        },
        { title: '3. Support requested', fields: [{ label: 'Referring for', value: 'One-to-One Education, SEND Support' }] },
      ],
      button: { label: 'Open the dashboard', href: `${settings.siteUrl}/admin` },
      note: 'Real emails let you reply straight to the person who filled in the form.',
      siteUrl: settings.siteUrl,
      address: address.lines,
    }),
  });
}
