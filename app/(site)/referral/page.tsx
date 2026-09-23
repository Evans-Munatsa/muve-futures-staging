import type { Metadata } from 'next';
import { FormPage } from '@/components/forms/FormPage';
import { ReferralForm } from '@/components/forms/ReferralForm';
import { ContactAside } from '@/components/forms/ContactAside';
import { getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Make a Referral',
  description:
    'Refer a learner to MUVE Futures. Tell us about their needs and we will help identify the most appropriate education pathway.',
};

export default async function ReferralPage({ searchParams }: PageProps<'/referral'>) {
  const [{ service }, { referral }] = await Promise.all([searchParams, getSingle('forms')]);
  const preselectedService = typeof service === 'string' ? service : undefined;

  return (
    <FormPage
      badge={referral.badge}
      title={referral.title}
      intro={referral.intro}
      aside={<ContactAside show={['intro', 'contact']} />}
    >
      {/* Keyed so following a link for a different service resets the form. */}
      <ReferralForm key={preselectedService ?? 'general'} preselectedService={preselectedService} />
    </FormPage>
  );
}
