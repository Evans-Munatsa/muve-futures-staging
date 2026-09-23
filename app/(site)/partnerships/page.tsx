import type { Metadata } from 'next';
import { DesignFormPage } from '@/components/forms/DesignFormPage';
import { PartnershipShapes } from '@/components/forms/FormShapes';
import { PartnershipForm } from '@/components/forms/PartnershipForm';
import { getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Partnerships',
  description: 'Work with MUVE Futures to create better education pathways for children and young people through partnership.',
};

export default async function PartnershipsPage() {
  const { partnership } = await getSingle('forms');
  return (
    <DesignFormPage
      badge={partnership.badge}
      title={partnership.title}
      intro={partnership.intro}
      shapes={<PartnershipShapes />}
      heroClassName="lg:u-pb-190"
    >
      <PartnershipForm />
    </DesignFormPage>
  );
}
