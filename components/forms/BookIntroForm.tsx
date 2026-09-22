'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChoiceChips, FormSection, FormSuccess } from '@/components/forms/FormParts';

const TIMES = ['Morning (09:00 – 12:00)', 'Early afternoon (12:00 – 14:30)', 'Late afternoon (14:30 – 17:00)'] as const;

type PreferredTime = (typeof TIMES)[number];

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  organisation: '',
  preferredDate: '',
  preferredTime: TIMES[0] as PreferredTime,
  notes: '',
};

export function BookIntroForm() {
  const [form, setForm] = useState(EMPTY);
  const [confirmed, setConfirmed] = useState(false);

  const update = <K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send `form` to the bookings inbox / calendar.
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (confirmed) {
    return (
      <FormSuccess
        title="Intro Requested"
        action={
          <Button asChild variant="orange" size="pill">
            <Link href="/">Return to the website</Link>
          </Button>
        }
      >
        <p>
          Thank you, <strong>{form.name}</strong>. We&apos;ve received your request and will email{' '}
          <strong>{form.email}</strong> to confirm a time.
        </p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <FormSection title="1. Your details">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="intro-name">Your name *</Label>
            <Input
              id="intro-name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="intro-org">School / organisation</Label>
            <Input
              id="intro-org"
              autoComplete="organization"
              value={form.organisation}
              onChange={(e) => update('organisation', e.target.value)}
              placeholder="Leave blank if you're a parent or carer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="intro-email">Email address *</Label>
            <Input
              id="intro-email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="intro-phone">Phone number</Label>
            <Input
              id="intro-phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="2. When suits you">
        <div className="space-y-2 sm:max-w-xs">
          <Label htmlFor="intro-date">Preferred date</Label>
          <Input
            id="intro-date"
            type="date"
            value={form.preferredDate}
            onChange={(e) => update('preferredDate', e.target.value)}
          />
        </div>
        <ChoiceChips
          label="Preferred time"
          options={TIMES}
          value={form.preferredTime}
          onToggle={(time) => update('preferredTime', time)}
        />
      </FormSection>

      <FormSection title="3. What you'd like to talk about">
        <div className="space-y-2">
          <Label htmlFor="intro-notes">A little about what you need</Label>
          <Textarea
            id="intro-notes"
            rows={4}
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="A learner you'd like to discuss, the kind of provision you're exploring, or a partnership idea."
          />
        </div>
      </FormSection>

      <div className="flex justify-end border-t-2 border-brand-green pt-6">
        <Button type="submit" variant="orange" size="pill" className="gap-2">
          <Send className="h-4 w-4" aria-hidden="true" />
          Request an Intro
        </Button>
      </div>
    </form>
  );
}
