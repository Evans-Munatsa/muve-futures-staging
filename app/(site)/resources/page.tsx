import type { Metadata } from 'next';
import { ResourcesContent } from '@/components/resources/ResourcesContent';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Practice guides, policy downloads and answers to common referral questions for schools, local authorities and families.',
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
