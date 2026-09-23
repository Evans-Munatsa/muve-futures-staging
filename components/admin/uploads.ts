'use client';

import { upload } from '@vercel/blob/client';

/** Uploads a file to Vercel Blob through /api/admin/upload and returns its public URL. */
export async function uploadFile(file: File, kind: 'image' | 'document'): Promise<string> {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
  const blob = await upload(`${kind === 'image' ? 'images' : 'documents'}/${safeName}`, file, {
    access: 'public',
    handleUploadUrl: '/api/admin/upload',
    clientPayload: kind,
  });
  return blob.url;
}

/** Reads an image's pixel size in the browser (needed for correctly sized photos). */
export function imageSize(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve({ width: 0, height: 0 });
    img.src = src;
  });
}

/** Friendly message for a failed upload. */
export function uploadError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (/BLOB_READ_WRITE_TOKEN|503|aren’t set up/i.test(message)) {
    return 'Uploads aren’t set up yet. Add BLOB_READ_WRITE_TOKEN in Vercel, or pick a photo from the library.';
  }
  if (/content type|allowed/i.test(message)) return 'That file type isn’t allowed.';
  if (/size|too large/i.test(message)) return 'That file is too large.';
  return `Upload failed: ${message}`;
}
