'use server';

import { randomBytes } from 'node:crypto';
import { del, put } from '@vercel/blob';
import { and, eq, gt } from 'drizzle-orm';
import { db, hasDatabase, schema } from '@/lib/db';
import { getCollectionItem, getSingle } from '@/lib/content/queries';
import { CV_MAX_BYTES, RIGHT_TO_WORK, isAcceptingApplications, type ApplyState } from './shared';

/*
 * Receives an application from /careers/[slug]. Everything from the browser is
 * untrusted: fields are re-validated here, the vacancy must still be open, and
 * the CV's first bytes must match a PDF or Word file. CVs go to a *private*
 * Vercel Blob path that only the dashboard can read.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Submissions faster than this after the form loaded are almost certainly bots. */
const MIN_FILL_MS = 3000;

const CV_TYPES: Record<string, { contentType: string; magic: number[] }> = {
  pdf: { contentType: 'application/pdf', magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  docx: { contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', magic: [0x50, 0x4b, 0x03, 0x04] }, // zip
  doc: { contentType: 'application/msword', magic: [0xd0, 0xcf, 0x11, 0xe0] }, // OLE2
};

const text = (formData: FormData, name: string, max: number) => String(formData.get(name) ?? '').trim().slice(0, max);

function newReference() {
  // Unambiguous characters only (no 0/O, 1/I).
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(6);
  return `MF-C-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('')}`;
}

/** A safe file name to show in the dashboard (the stored path is random). */
function cleanFileName(name: string) {
  return name.replace(/[^\w.\- ()]+/g, '_').slice(-120) || 'cv';
}

export async function submitApplication(slug: string, _prev: ApplyState, formData: FormData): Promise<ApplyState> {
  const { contact } = await getSingle('settings');
  const unavailable: ApplyState = {
    ok: false,
    error: `Sorry, we can’t receive applications online right now. Please email your CV to ${contact.enquiriesEmail}.`,
  };

  // Bots: a filled honeypot or an instant submission gets a quiet "thanks".
  const startedAt = Number(formData.get('startedAt'));
  if (text(formData, 'website', 200) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { ok: true, reference: newReference() };
  }

  const vacancy = await getCollectionItem('vacancy', slug);
  if (!vacancy) return { ok: false, error: 'This vacancy no longer exists.' };
  if (!isAcceptingApplications(vacancy)) return { ok: false, error: 'Sorry, applications for this role have now closed.' };
  if (!hasDatabase || !process.env.BLOB_READ_WRITE_TOKEN) return unavailable;

  const values = {
    firstName: text(formData, 'firstName', 100),
    lastName: text(formData, 'lastName', 100),
    email: text(formData, 'email', 254).toLowerCase(),
    phone: text(formData, 'phone', 40),
    location: text(formData, 'location', 120),
    rightToWork: text(formData, 'rightToWork', 40),
    coverLetter: text(formData, 'coverLetter', 6000),
    heardAbout: text(formData, 'heardAbout', 200),
  };

  const errors: Record<string, string> = {};
  if (!values.firstName) errors.firstName = 'Enter your first name.';
  if (!values.lastName) errors.lastName = 'Enter your last name.';
  if (!EMAIL.test(values.email)) errors.email = 'Enter a valid email address.';
  if (values.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a phone number we can reach you on.';
  if (!(RIGHT_TO_WORK as readonly string[]).includes(values.rightToWork)) errors.rightToWork = 'Tell us whether you have the right to work in the UK.';
  if (formData.get('consent') !== 'yes') errors.consent = 'Please confirm you’re happy for us to use your details for this application.';

  const cv = formData.get('cv');
  const file = cv instanceof File && cv.size > 0 ? cv : null;
  const extension = file?.name.split('.').pop()?.toLowerCase() ?? '';
  const type = CV_TYPES[extension];
  if (!file) errors.cv = 'Attach your CV.';
  else if (file.size > CV_MAX_BYTES) errors.cv = `Your CV must be ${CV_MAX_BYTES / 1024 / 1024}MB or smaller.`;
  else if (!type) errors.cv = 'Upload your CV as a PDF or Word document (.pdf, .doc or .docx).';

  let bytes: Uint8Array | null = null;
  if (file && type && !errors.cv) {
    bytes = new Uint8Array(await file.arrayBuffer());
    if (!type.magic.every((b, i) => bytes![i] === b)) errors.cv = 'That file doesn’t look like a PDF or Word document. Please check it and try again.';
  }

  if (Object.keys(errors).length) return { ok: false, error: 'Please check the highlighted fields.', fieldErrors: errors };

  try {
    // One application per person per role a day; stops double submits and repeated spam.
    const [recent] = await db()
      .select({ id: schema.jobApplications.id })
      .from(schema.jobApplications)
      .where(
        and(
          eq(schema.jobApplications.vacancySlug, slug),
          eq(schema.jobApplications.email, values.email),
          gt(schema.jobApplications.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000))
        )
      )
      .limit(1);
    if (recent) return { ok: false, error: 'We’ve already received an application from this email address for this role. Thank you!' };

    const blob = await put(`applications/${slug}/cv.${extension}`, Buffer.from(bytes!), {
      access: 'private',
      contentType: type!.contentType,
      addRandomSuffix: true,
    });

    const reference = newReference();
    try {
      await db()
        .insert(schema.jobApplications)
        .values({
          ...values,
          reference,
          vacancySlug: slug,
          vacancyTitle: vacancy.title,
          cvPathname: blob.pathname,
          cvFileName: cleanFileName(file!.name),
          cvContentType: type!.contentType,
        });
    } catch (error) {
      // Don't leave an orphaned CV behind.
      await del(blob.url).catch(() => {});
      throw error;
    }

    return { ok: true, reference };
  } catch (error) {
    console.error('[careers] Couldn’t save application', error);
    return unavailable;
  }
}
