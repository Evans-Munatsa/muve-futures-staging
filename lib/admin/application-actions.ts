'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { del } from '@vercel/blob';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { STATUS_LABELS } from '@/lib/careers/shared';
import type { ApplicationStatus } from '@/lib/db/schema';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type UpdateApplicationState = { ok?: boolean; error?: string; savedAt?: string };

/** Saves an application's status and the team's notes. */
export async function updateApplication(id: string, _prev: UpdateApplicationState, formData: FormData): Promise<UpdateApplicationState> {
  await requireAdmin();
  if (!UUID.test(id)) return { error: 'Unknown application.' };

  const status = String(formData.get('status') ?? '');
  if (!Object.hasOwn(STATUS_LABELS, status)) return { error: 'Choose a status.' };
  const notes = String(formData.get('notes') ?? '').slice(0, 10000);

  await db()
    .update(schema.jobApplications)
    .set({ status: status as ApplicationStatus, notes, updatedAt: new Date() })
    .where(eq(schema.jobApplications.id, id));

  revalidatePath('/admin/careers');
  return { ok: true, savedAt: new Date().toISOString() };
}

/** Deletes an application and its CV for good (e.g. at the end of the retention period, or on request). */
export async function deleteApplication(id: string) {
  await requireAdmin();
  if (!UUID.test(id)) return;
  const [application] = await db()
    .select({ cvPathname: schema.jobApplications.cvPathname })
    .from(schema.jobApplications)
    .where(eq(schema.jobApplications.id, id));
  if (application) {
    // The file first: if that fails, the record (and the way to find the file) is kept.
    await del(application.cvPathname);
    await db().delete(schema.jobApplications).where(eq(schema.jobApplications.id, id));
  }
  revalidatePath('/admin/careers');
  redirect('/admin/careers');
}
