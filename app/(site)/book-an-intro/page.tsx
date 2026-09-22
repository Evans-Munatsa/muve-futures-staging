import type { Metadata } from 'next';
import { FormPage } from '@/components/forms/FormPage';
import { BookIntroForm } from '@/components/forms/BookIntroForm';
import { ContactAside } from '@/components/forms/ContactAside';

export const metadata: Metadata = {
  title: 'Book an Intro',
  description:
    'Book an introduction with the MUVE Futures team to talk about a learner, our services or working in partnership.',
};

export default function BookIntroPage() {
  return (
    <FormPage
      badge="Book an Intro"
      title="Let's Start With A Conversation"
      intro="Book a short introduction with our team to talk about a learner, our services or working in partnership."
      aside={<ContactAside show={['referral', 'contact']} />}
    >
      <BookIntroForm />
    </FormPage>
  );
}
