'use client';

import { useState } from 'react';
import { BotTrap, useFormSubmit } from '@/components/forms/BotTrap';
import { FieldLabel, TextArea, TextInput } from '@/components/forms/DesignForm';
import type { ContactPageContent } from '@/lib/content/pages';
import { submitContact } from '@/lib/forms/submit';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

/** The "Chat to Us" enquiry form on the light-green card. Messages go to the dashboard Inbox. */
export function ChatForm({ content }: { content: ContactPageContent['form'] }) {
  const [form, setForm] = useState(EMPTY);
  const { pending, error, reference, submit, reset } = useFormSubmit();
  const sent = reference !== null;
  const set = (key: keyof typeof EMPTY, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(e.currentTarget, (meta) => submitContact(form, meta));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-ink sm:text-3xl lg:u-text-51">{content.title}</h2>
      <p className="mt-3 max-w-xl text-sm leading-[1.3] text-brand-ink lg:u-mt-16 lg:u-max-w-800 lg:u-text-24">{content.intro}</p>

      {sent ? (
        <div role="status" className="mt-8 rounded-2xl bg-white p-6 text-brand-ink lg:u-mt-40 lg:u-rounded-15 lg:u-p-30">
          <p className="font-bold lg:u-text-22">Message sent. Thank you!</p>
          <p className="mt-2 text-sm lg:u-text-18">
            We’ll reply to <strong>{form.email}</strong> within one working day. Your reference is <strong>{reference}</strong>.
          </p>
          <button
            type="button"
            className="mt-4 cursor-pointer text-sm font-bold underline lg:u-text-18"
            onClick={() => {
              setForm(EMPTY);
              reset();
            }}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative mt-8 lg:u-mt-40">
          <BotTrap />
          <div className="grid gap-5 sm:grid-cols-2 lg:u-gap-x-30 lg:u-gap-y-30">
            <div>
              <FieldLabel htmlFor="chat-name">Name*</FieldLabel>
              <TextInput id="chat-name" required autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} />
            </div>
            <div>
              <FieldLabel htmlFor="chat-email">Email Address*</FieldLabel>
              <TextInput id="chat-email" type="email" required autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
            </div>
            <div>
              <FieldLabel htmlFor="chat-phone">Phone Number*</FieldLabel>
              <TextInput id="chat-phone" type="tel" required autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </div>
            <div>
              <FieldLabel htmlFor="chat-subject">Subject*</FieldLabel>
              <TextInput id="chat-subject" required value={form.subject} onChange={(e) => set('subject', e.target.value)} />
            </div>
          </div>
          <div className="mt-5 lg:u-mt-30">
            <FieldLabel htmlFor="chat-message">Your Message*</FieldLabel>
            <TextArea id="chat-message" required tall value={form.message} onChange={(e) => set('message', e.target.value)} />
          </div>
          {error && (
            <p role="alert" className="mt-5 rounded-xl bg-white px-4 py-3 text-sm font-bold text-brand-ink lg:u-mt-24 lg:u-text-18">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="mt-6 h-10 cursor-pointer disabled:cursor-wait disabled:opacity-70 rounded-full bg-brand-orange px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#d94e20] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2 focus-visible:outline-none lg:u-mt-40 lg:u-h-44 lg:u-min-w-228 lg:u-text-20"
          >
            {pending ? 'Sending…' : content.submit}
          </button>
        </form>
      )}
    </div>
  );
}
