import type { Metadata } from 'next';
import { FormPage } from '@/components/forms/FormPage';
import { BookIntroForm } from '@/components/forms/BookIntroForm';
import { ContactAside } from '@/components/forms/ContactAside';
import { getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Book an Intro',
  description:
    'Book an introduction with the MUVE Futures team to talk about a learner, our services or working in partnership.',
};

export default async function BookIntroPage() {
  const { bookIntro } = await getSingle('forms');
  return (
    <FormPage
      badge={bookIntro.badge}
      title={bookIntro.title}
      intro={bookIntro.intro}
      aside={<ContactAside show={['referral', 'contact']} />}
    >
      <BookIntroForm />
    </FormPage>
  );
}
