import Link from 'next/link';
import { AsidePanel } from '@/components/forms/FormPage';
import { BOOK_INTRO_HREF, REFERRAL_HREF } from '@/constants';
import { getSingle } from '@/lib/content/queries';

/** Side panels shared by the form pages: the other forms, and how to reach us. */
export async function ContactAside({ show }: { show: Array<'referral' | 'intro' | 'contact'> }) {
  const { contact, address } = await getSingle('settings');
  const { phone, phoneInternational, referralsEmail: email, enquiriesEmail } = contact;

  return (
    <>
      {show.includes('referral') && (
        <AsidePanel title="Ready to refer?" tone="orange">
          <p>Tell us about the learner and we&apos;ll help find the right education pathway.</p>
          <Link href={REFERRAL_HREF} className="inline-block pt-1 font-bold underline">
            Make a referral →
          </Link>
        </AsidePanel>
      )}

      {show.includes('intro') && (
        <AsidePanel title="Prefer to talk first?" tone="pink">
          <p>Book a short introduction with our team to talk things through.</p>
          <Link href={BOOK_INTRO_HREF} className="inline-block pt-1 font-bold underline">
            Book an intro →
          </Link>
        </AsidePanel>
      )}

      {show.includes('contact') && (
        <AsidePanel title="Get in touch" tone="cyan">
          <p>
            <a href={`tel:${phoneInternational.replace(/\s/g, '')}`} className="font-bold hover:underline">
              {phone}
            </a>
          </p>
          <p>
            Referrals:{' '}
            <a href={`mailto:${email}`} className="font-bold break-all hover:underline">
              {email}
            </a>
          </p>
          <p>
            Enquiries:{' '}
            <a href={`mailto:${enquiriesEmail}`} className="font-bold break-all hover:underline">
              {enquiriesEmail}
            </a>
          </p>
          <address className="pt-2 not-italic">
            {address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </AsidePanel>
      )}
    </>
  );
}
