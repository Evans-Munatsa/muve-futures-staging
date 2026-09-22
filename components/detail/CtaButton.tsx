import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookIntroButton, ReferralButton } from '@/components/common/ActionButtons';
import { CONTACT_ENQUIRY_HREF, type Cta } from '@/constants';

/** Renders a content-model CTA as the matching modal trigger or contact link. */
export function CtaButton({ cta, referralService }: { cta: Cta; referralService?: string }) {
  switch (cta.action) {
    case 'referral':
      return <ReferralButton serviceName={referralService}>{cta.label}</ReferralButton>;
    case 'intro':
      return <BookIntroButton>{cta.label}</BookIntroButton>;
    case 'contact':
      return (
        <Button asChild variant="orange" size="pill">
          <Link href={CONTACT_ENQUIRY_HREF}>{cta.label}</Link>
        </Button>
      );
  }
}
