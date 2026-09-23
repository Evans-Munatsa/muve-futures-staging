import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db';
import { readSession } from './session';

export interface CurrentAdmin {
  id: string;
  name: string;
  email: string;
}

/**
 * The signed-in admin, or null. Checks the session cookie *and* that the admin
 * still exists. Memoised per request.
 */
export const getCurrentAdmin = cache(async (): Promise<CurrentAdmin | null> => {
  const session = await readSession();
  if (!session) return null;
  const [admin] = await db()
    .select({ id: schema.adminUsers.id, name: schema.adminUsers.name, email: schema.adminUsers.email })
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.id, session.userId));
  return admin ?? null;
});

/**
 * Use at the top of every admin page, server action and route handler.
 * Redirects to the login page when there's no valid session.
 */
export async function requireAdmin(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/admin/login');
  return admin;
}
