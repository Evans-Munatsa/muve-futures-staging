import { get } from '@vercel/blob';
import { eq } from 'drizzle-orm';
import { getCurrentAdmin } from '@/lib/auth/dal';
import { db, schema } from '@/lib/db';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Streams an applicant's CV from private Blob storage. Only signed-in admins
 * can download; the file itself never has a public URL.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return new Response('Not signed in', { status: 401 });

  const { id } = await params;
  if (!UUID.test(id)) return new Response('Not found', { status: 404 });

  const [application] = await db()
    .select({
      cvPathname: schema.jobApplications.cvPathname,
      cvFileName: schema.jobApplications.cvFileName,
      cvContentType: schema.jobApplications.cvContentType,
      firstName: schema.jobApplications.firstName,
      lastName: schema.jobApplications.lastName,
    })
    .from(schema.jobApplications)
    .where(eq(schema.jobApplications.id, id));
  if (!application) return new Response('Not found', { status: 404 });

  const file = await get(application.cvPathname, { access: 'private', useCache: false }).catch(() => null);
  if (!file || file.statusCode !== 200) return new Response('The CV file could not be found.', { status: 404 });

  // Name the download after the applicant, keeping the original extension.
  const extension = application.cvFileName.split('.').pop() ?? 'pdf';
  const downloadName = `CV - ${application.firstName} ${application.lastName}.${extension}`.replace(/["\\\r\n]/g, '');
  const inline = new URL(request.url).searchParams.get('view') === '1' && application.cvContentType === 'application/pdf';

  return new Response(file.stream, {
    headers: {
      'Content-Type': application.cvContentType,
      'Content-Disposition': `${inline ? 'inline' : 'attachment'}; filename="${downloadName.replace(/[^\x20-\x7e]/g, '_')}"; filename*=UTF-8''${encodeURIComponent(downloadName)}`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
