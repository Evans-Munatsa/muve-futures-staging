import type { Metadata } from 'next';
import { FormPage } from '@/components/forms/FormPage';
import { ReferralForm } from '@/components/forms/ReferralForm';
import { ContactAside } from '@/components/forms/ContactAside';

export const metadata: Metadata = {
  title: 'Make a Referral',
  description:
    'Refer a learner to MUVE Futures. Tell us about their needs and we will help identify the most appropriate education pathway.',
};

export default async function ReferralPage({ searchParams }: PageProps<'/referral'>) {
  const { service } = await searchParams;
  const preselectedService = typeof service === 'string' ? service : undefined;

  return (
    <FormPage
      badge="Referral"
      title="Make a Referral"
      intro="Making a referral is straightforward. Tell us about the learner, and we'll get in touch to understand their needs and recommend the most appropriate pathway."
      aside={<ContactAside show={['intro', 'contact']} />}
    >
      {/* Keyed so following a link for a different service resets the form. */}
      <ReferralForm key={preselectedService ?? 'general'} preselectedService={preselectedService} />
    </FormPage>
  );
}
