import type { Metadata } from 'next';
import { FormPage } from '@/components/forms/FormPage';
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactAside } from '@/components/forms/ContactAside';
import { LocationsMap } from '@/components/contact/LocationsMap';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with MUVE Futures, make a learner referral or book an introduction.',
};

export default function ContactPage() {
  return (
    <>
      <FormPage
        id="contact-form"
        badge="Contact"
        title="We're Here To Help"
        intro="Whether you're a parent looking for guidance, a school seeking support or a professional exploring provision for a learner, our team is here to listen."
        aside={<ContactAside show={['referral', 'intro', 'contact']} />}
      >
        <ContactForm />
      </FormPage>
      <LocationsMap />
    </>
  );
}
