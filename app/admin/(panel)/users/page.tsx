import type { Metadata } from 'next';
import { asc } from 'drizzle-orm';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { deleteAdmin } from '@/lib/admin/user-actions';
import { ConfirmButton } from '@/components/admin/ConfirmButton';
import { AddAdminForm, ChangePasswordForm } from '@/components/admin/UserForms';

export const metadata: Metadata = { title: 'Admins' };

export default async function UsersPage() {
  const me = await requireAdmin();
  const admins = await db()
    .select({ id: schema.adminUsers.id, name: schema.adminUsers.name, email: schema.adminUsers.email, lastLoginAt: schema.adminUsers.lastLoginAt })
    .from(schema.adminUsers)
    .orderBy(asc(schema.adminUsers.createdAt));

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Admins</h1>
        <p className="mt-1 text-sm text-neutral-500">Everyone here can edit the website and the blog.</p>
      </header>

      <ul className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
        {admins.map((admin) => (
          <li key={admin.id} className="flex flex-wrap items-center gap-4 px-4 py-3">
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">
                {admin.name} {admin.id === me.id && <span className="text-xs font-normal text-neutral-500">(you)</span>}
              </span>
              <span className="block text-xs text-neutral-500">{admin.email}</span>
            </span>
            <span className="text-xs text-neutral-500">
              {admin.lastLoginAt ? `Last signed in ${admin.lastLoginAt.toLocaleDateString('en-GB')}` : 'Never signed in'}
            </span>
            {admin.id !== me.id && (
              <ConfirmButton action={deleteAdmin.bind(null, admin.id)} confirm={`Remove ${admin.name}? They’ll be signed out straight away.`} danger>
                Remove
              </ConfirmButton>
            )}
          </li>
        ))}
      </ul>

      <div className="grid gap-6 md:grid-cols-2">
        <AddAdminForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
