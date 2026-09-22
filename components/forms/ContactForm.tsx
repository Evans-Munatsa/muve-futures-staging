'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormSuccess } from '@/components/forms/FormParts';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

/** General enquiry form on the contact page. */
export function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof typeof EMPTY, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send `form` to the enquiries inbox.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FormSuccess
        title="Message Sent"
        action={
          <Button
            variant="outline"
            size="pill"
            className="border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white"
            onClick={() => {
              setForm(EMPTY);
              setSubmitted(false);
            }}
          >
            Send another message
          </Button>
        }
      >
        <p>
          Thank you for getting in touch. We&apos;ll reply to <strong>{form.email}</strong> within one
          working day.
        </p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">Send Us a Message</h2>
        <p className="mt-2 text-sm sm:text-base">
          Questions about our services, capacity, careers or partnerships? We&apos;d love to hear
          from you.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Your name *</Label>
          <Input
            id="contact-name"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email address *</Label>
          <Input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone number</Label>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-subject">Subject</Label>
          <Input id="contact-subject" value={form.subject} onChange={(e) => update('subject', e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Your message *</Label>
        <Textarea
          id="contact-message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="orange" size="pill" className="gap-2">
          <Send className="h-4 w-4" aria-hidden="true" />
          Send Message
        </Button>
      </div>
    </form>
  );
}
