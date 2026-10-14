/*
 * Who can use which part of the dashboard. Super admins can use everything,
 * including the Admins page. Managers only get the areas a super admin has
 * ticked for them. Shared by the server checks and the dashboard UI.
 */

export const ADMIN_AREAS = {
  content: { label: 'Website content', help: 'Pages, services, resources, legal pages and site settings' },
  blog: { label: 'Blog', help: 'Write, edit and publish posts' },
  careers: { label: 'Careers', help: 'Vacancies and job applications, including CVs' },
  inbox: { label: 'Inbox', help: 'Form submissions, including referrals with learners’ details' },
} as const;

export type AdminArea = keyof typeof ADMIN_AREAS;
export type AdminRole = 'super_admin' | 'manager';

export const AREA_KEYS = Object.keys(ADMIN_AREAS) as AdminArea[];

export const ROLE_LABELS: Record<AdminRole, string> = { super_admin: 'Super admin', manager: 'Manager' };

export const isArea = (value: unknown): value is AdminArea => typeof value === 'string' && value in ADMIN_AREAS;

export interface AccessHolder {
  role: AdminRole;
  permissions: string[];
}

export const isSuperAdmin = (admin: AccessHolder) => admin.role === 'super_admin';

export function canAccess(admin: AccessHolder, area: AdminArea): boolean {
  return isSuperAdmin(admin) || admin.permissions.includes(area);
}

/** Vacancies are edited with the website content but belong to Careers. */
export const contentArea = (key: string): AdminArea => (key === 'vacancy' || key.startsWith('vacancy:') ? 'careers' : 'content');
