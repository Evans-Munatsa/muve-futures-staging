import type { Metadata } from 'next';
import { DesignFormPage } from '@/components/forms/DesignFormPage';
import { ReferralShapes } from '@/components/forms/FormShapes';
import { ReferralForm } from '@/components/forms/ReferralForm';
import { getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Make a Referral',
  description:
    'Refer a young person to MUVE Futures. Tell us about their needs and we will help identify the most appropriate education pathway.',
};

export default async function ReferralPage({ searchParams }: PageProps<'/referral'>) {
  const [{ service }, { referral }] = await Promise.all([searchParams, getSingle('forms')]);
  const preselectedService = typeof service === 'string' ? service : undefined;

  return (
    <DesignFormPage
      badge={referral.badge}
      title={referral.title}
      intro={referral.intro}
      shapes={<ReferralShapes />}
      heroClassName="lg:u-pb-140"
    >
      {/* Keyed so following a link for a different service resets the form. */}
      <ReferralForm key={preselectedService ?? 'general'} preselectedService={preselectedService} />
    </DesignFormPage>
  );
}
