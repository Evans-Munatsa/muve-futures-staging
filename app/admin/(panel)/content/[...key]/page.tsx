import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { withDefaults } from '@/lib/content/fields';
import { COLLECTIONS, SINGLES, parseKey } from '@/lib/content/registry';
import { ContentEditor } from '@/components/admin/ContentEditor';
import { ConfirmButton } from '@/components/admin/ConfirmButton';
import { deleteCollectionItem, resetContent } from '@/lib/admin/content-actions';

export const metadata: Metadata = { title: 'Edit content' };

export default async function EditContentPage({ params }: PageProps<'/admin/content/[...key]'>) {
  await requireAdmin();
  const segments = (await params).key;
  const key = segments.join(':');
  const parsed = parseKey(key);
  if (!parsed) notFound();

  const [row] = await db().select().from(schema.content).where(eq(schema.content.key, key));

  let title: string;
  let schemaDef;
  let initial: unknown;
  let publicPath: string;

  if (parsed.kind === 'single') {
    const def = SINGLES[parsed.key];
    title = def.label;
    schemaDef = def.schema;
    initial = withDefaults(row?.data, def.defaults);
    publicPath = def.path;
  } else {
    const def = COLLECTIONS[parsed.collection];
    const fallback = def.defaults[parsed.slug];
    // Items created in the dashboard only exist in the database.
    if (!row && !fallback) notFound();
    initial = withDefaults(row?.data, fallback ?? row?.data);
    title = (initial as { title?: string }).title || parsed.slug;
    schemaDef = def.schema;
    publicPath = def.path(parsed.slug);
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/content" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-brand-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All content
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {row ? `Last saved ${row.updatedAt.toLocaleString('en-GB')}` : 'Showing the site’s original copy — nothing saved yet.'}
          </p>
        </div>

        {parsed.kind === 'single' && row && (
          <ConfirmButton action={resetContent.bind(null, key)} confirm="Discard all saved changes to this page and go back to the original copy?">
            Reset to original
          </ConfirmButton>
        )}
        {parsed.kind === 'collection' && COLLECTIONS[parsed.collection].allowCreate && (
          <ConfirmButton action={deleteCollectionItem.bind(null, key)} confirm={`Delete this ${COLLECTIONS[parsed.collection].itemNoun}? Its page will stop working.`} danger>
            Delete {COLLECTIONS[parsed.collection].itemNoun}
          </ConfirmButton>
        )}
      </header>

      <ContentEditor contentKey={key} schema={schemaDef} initial={initial} publicPath={publicPath} />
    </div>
  );
}
