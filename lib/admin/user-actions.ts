'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { hashPassword, passwordProblem, verifyPassword } from '@/lib/auth/password';

export interface FormState {
  error?: string;
  success?: string;
}

export async function createAdmin(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!name) return { error: 'Add a name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter a valid email address.' };
  const weak = passwordProblem(password);
  if (weak) return { error: weak };

  const [existing] = await db().select({ id: schema.adminUsers.id }).from(schema.adminUsers).where(eq(schema.adminUsers.email, email));
  if (existing) return { error: 'There’s already an admin with that email.' };

  await db().insert(schema.adminUsers).values({ name, email, passwordHash: await hashPassword(password) });
  revalidatePath('/admin/users');
  return { success: `${name} can now sign in.` };
}

export async function deleteAdmin(id: string) {
  const me = await requireAdmin();
  if (id === me.id) return;
  await db().delete(schema.adminUsers).where(eq(schema.adminUsers.id, id));
  revalidatePath('/admin/users');
}

export async function changePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const current = String(formData.get('current') ?? '');
  const next = String(formData.get('next') ?? '');

  const [row] = await db().select().from(schema.adminUsers).where(eq(schema.adminUsers.id, me.id));
  if (!row || !(await verifyPassword(current, row.passwordHash))) return { error: 'Your current password is incorrect.' };
  const weak = passwordProblem(next);
  if (weak) return { error: weak };

  await db().update(schema.adminUsers).set({ passwordHash: await hashPassword(next) }).where(eq(schema.adminUsers.id, me.id));
  return { success: 'Password updated.' };
}
