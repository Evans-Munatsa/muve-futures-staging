import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { db, schema } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/dal';
import { COLLECTIONS, SINGLES, type CollectionName, type SingleKey } from '@/lib/content/registry';
import { NewItemForm } from '@/components/admin/NewItemForm';

export const metadata: Metadata = { title: 'Website content' };

const titleOf = (data: unknown) => (data && typeof data === 'object' && 'title' in data ? String((data as { title: unknown }).title) : '');
const orderOf = (data: unknown) => (data && typeof data === 'object' && 'order' in data ? Number((data as { order: unknown }).order) || 0 : 0);

export default async function ContentIndex() {
  await requireAdmin();
  const rows = await db().select({ key: schema.content.key, data: schema.content.data, updatedAt: schema.content.updatedAt }).from(schema.content);
  const saved = new Map(rows.map((r) => [r.key, r]));

  const collectionItems = (name: CollectionName) => {
    const stored = rows.filter((r) => r.key.startsWith(`${name}:`));
    const items = stored.length
      ? stored.map((r) => ({ slug: r.key.slice(name.length + 1), title: titleOf(r.data), order: orderOf(r.data), updatedAt: r.updatedAt as Date | null }))
      : Object.entries(COLLECTIONS[name].defaults).map(([slug, data]) => ({ slug, title: titleOf(data), order: orderOf(data), updatedAt: null as Date | null }));
    return items.sort((a, b) => a.order - b.order);
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Website content</h1>
        <p className="mt-1 text-sm text-neutral-500">Choose a page to edit. Anything you haven’t edited yet shows the site’s original copy.</p>
      </header>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500">Pages</h2>
        <ul className="mt-2 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
          {(Object.keys(SINGLES) as SingleKey[]).map((key) => (
            <li key={key}>
              <Link href={`/admin/content/${key}`} className="flex items-center gap-4 px-4 py-3 hover:bg-neutral-50">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{SINGLES[key].label}</span>
                  <span className="block text-xs text-neutral-500">{SINGLES[key].description}</span>
                </span>
                <span className="hidden text-xs text-neutral-500 sm:block">
                  {saved.get(key) ? `Edited ${saved.get(key)!.updatedAt.toLocaleDateString('en-GB')}` : 'Original copy'}
                </span>
                <ChevronRight className="h-4 w-4 text-neutral-400" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {(Object.keys(COLLECTIONS) as CollectionName[]).map((name) => {
        const def = COLLECTIONS[name];
        return (
          <section key={name} id={name} className="scroll-mt-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500">{def.label}</h2>
                <p className="text-xs text-neutral-500">{def.description}</p>
              </div>
              {def.allowCreate && <NewItemForm collection={name} noun={def.itemNoun} pathPrefix={def.path('')} />}
            </div>
            <ul className="mt-2 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
              {collectionItems(name).length === 0 && <li className="px-4 py-3 text-sm text-neutral-500">None yet.</li>}
              {collectionItems(name).map((item) => (
                <li key={item.slug}>
                  <Link href={`/admin/content/${name}/${item.slug}`} className="flex items-center gap-4 px-4 py-3 hover:bg-neutral-50">
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{item.title || item.slug}</span>
                      <span className="block text-xs text-neutral-500">{def.path(item.slug)}</span>
                    </span>
                    <span className="hidden text-xs text-neutral-500 sm:block">
                      {item.updatedAt ? `Edited ${item.updatedAt.toLocaleDateString('en-GB')}` : 'Original copy'}
                    </span>
                    <ChevronRight className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
