'use client';

import { useActionState, useState } from 'react';
import { Plus } from 'lucide-react';
import { createCollectionItem, type CreateItemState } from '@/lib/admin/content-actions';
import type { CollectionName } from '@/lib/content/registry';
import { inputClass } from './MediaInputs';

/** "Add a service" etc: asks for the new page's web address, then opens it in the editor. */
export function NewItemForm({ collection, noun, pathPrefix }: { collection: CollectionName; noun: string; pathPrefix: string }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState<CreateItemState, FormData>(createCollectionItem.bind(null, collection), {});

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-bold hover:border-brand-ink"
      >
        <Plus className="h-3.5 w-3.5" /> Add {noun}
      </button>
    );
  }

  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <label className="flex items-center gap-1 text-xs text-neutral-500">
        {pathPrefix}
        <input name="slug" required autoFocus pattern="[a-z0-9]+(-[a-z0-9]+)*" placeholder="new-page-address" className={`${inputClass} w-48 py-1.5 text-xs`} />
      </label>
      <button type="submit" disabled={pending} className="rounded-full bg-brand-orange px-3 py-1.5 text-xs font-bold text-white disabled:opacity-60">
        {pending ? 'Creating…' : 'Create'}
      </button>
      <button type="button" onClick={() => setOpen(false)} className="text-xs font-semibold text-neutral-500 hover:underline">
        Cancel
      </button>
      {state.error && <p className="w-full text-xs font-semibold text-red-600">{state.error}</p>}
    </form>
  );
}
