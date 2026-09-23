'use server';

import { redirect } from 'next/navigation';
import { updateTag } from 'next/cache';
import { eq, like } from 'drizzle-orm';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { ContentValidationError, validate } from '@/lib/content/fields';
import { COLLECTIONS, SINGLES, contentKey, contentTag, parseKey, type CollectionName } from '@/lib/content/registry';
import { SLUG_PATTERN } from '@/lib/slug';

export type SaveResult = { ok: true; savedAt: string } | { ok: false; errors: string[] };

const SLUG = SLUG_PATTERN;

/**
 * The site treats a collection in the database as complete once any item is
 * saved, so copy every built-in item in before the first write. Otherwise
 * editing one service would make the others disappear.
 */
async function ensureCollectionSeeded(name: CollectionName) {
  const existing = await db()
    .select({ key: schema.content.key })
    .from(schema.content)
    .where(like(schema.content.key, `${name}:%`))
    .limit(1);
  if (existing.length) return;
  const rows = Object.entries(COLLECTIONS[name].defaults).map(([slug, data]) => ({ key: contentKey(name, slug), data }));
  if (rows.length) await db().insert(schema.content).values(rows).onConflictDoNothing();
}

function refresh(key: string) {
  const parsed = parseKey(key);
  if (!parsed) return;
  updateTag(parsed.kind === 'single' ? contentTag.single(parsed.key) : contentTag.collection(parsed.collection));
}

/** Validates and stores one document. `data` comes from the dashboard editor. */
export async function saveContent(key: string, data: unknown): Promise<SaveResult> {
  const admin = await requireAdmin();
  const parsed = parseKey(key);
  if (!parsed) return { ok: false, errors: ['Unknown content.'] };

  const fieldSchema = parsed.kind === 'single' ? SINGLES[parsed.key].schema : COLLECTIONS[parsed.collection].schema;
  let clean: unknown;
  try {
    clean = validate(fieldSchema, data);
  } catch (error) {
    if (error instanceof ContentValidationError) return { ok: false, errors: error.issues };
    throw error;
  }

  if (parsed.kind === 'collection') await ensureCollectionSeeded(parsed.collection);

  const now = new Date();
  await db()
    .insert(schema.content)
    .values({ key, data: clean, updatedAt: now, updatedBy: admin.id })
    .onConflictDoUpdate({ target: schema.content.key, set: { data: clean, updatedAt: now, updatedBy: admin.id } });

  refresh(key);
  return { ok: true, savedAt: now.toISOString() };
}

/** Throws away saved changes to a single page, going back to the built-in copy. */
export async function resetContent(key: string) {
  await requireAdmin();
  const parsed = parseKey(key);
  if (parsed?.kind !== 'single') return;
  await db().delete(schema.content).where(eq(schema.content.key, key));
  refresh(key);
  redirect(`/admin/content/${key}`);
}

export interface CreateItemState {
  error?: string;
}

export async function createCollectionItem(
  collection: CollectionName,
  _prev: CreateItemState,
  formData: FormData
): Promise<CreateItemState> {
  await requireAdmin();
  const def = COLLECTIONS[collection];
  if (!def?.allowCreate || !def.blank) return { error: 'New items can’t be added here.' };

  const slug = String(formData.get('slug') ?? '').trim().toLowerCase();
  if (!SLUG.test(slug)) return { error: 'Use lowercase letters, numbers and hyphens, e.g. forest-school.' };

  await ensureCollectionSeeded(collection);
  const key = contentKey(collection, slug);
  const [taken] = await db().select({ key: schema.content.key }).from(schema.content).where(eq(schema.content.key, key));
  if (taken) return { error: 'That address is already used.' };

  const admin = await requireAdmin();
  await db().insert(schema.content).values({ key, data: def.blank(), updatedBy: admin.id });
  refresh(key);
  redirect(`/admin/content/${collection}/${slug}`);
}

export async function deleteCollectionItem(key: string) {
  await requireAdmin();
  const parsed = parseKey(key);
  if (parsed?.kind !== 'collection' || !COLLECTIONS[parsed.collection].allowCreate) return;
  await ensureCollectionSeeded(parsed.collection);
  await db().delete(schema.content).where(eq(schema.content.key, key));
  refresh(key);
  redirect(`/admin/content#${parsed.collection}`);
}
