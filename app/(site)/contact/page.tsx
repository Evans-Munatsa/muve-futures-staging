import type { Metadata } from 'next';
import { FormPage } from '@/components/forms/FormPage';
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactAside } from '@/components/forms/ContactAside';
import { LocationsMap } from '@/components/contact/LocationsMap';
import { getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with MUVE Futures, make a learner referral or book an introduction.',
};

export default async function ContactPage() {
  const { contact } = await getSingle('forms');
  return (
    <>
      <FormPage
        id="contact-form"
        badge={contact.badge}
        title={contact.title}
        intro={contact.intro}
        aside={<ContactAside show={['referral', 'intro', 'contact']} />}
      >
        <ContactForm />
      </FormPage>
      <LocationsMap />
    </>
  );
}
