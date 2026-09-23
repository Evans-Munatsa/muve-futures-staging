'use client';

import { useId, useState } from 'react';
import { ChoiceGroup, Field, FieldLabel, SentMessage, SubmitRow, TextArea, groupGap } from '@/components/forms/DesignForm';
import { cn } from '@/lib/utils';

const KINDS = ['Compliments', 'Complaints', 'Suggestion'] as const;
const PEOPLE = ['Client', 'Family', 'Friend', 'Professional', 'Community Member', 'Other'] as const;

type Kind = (typeof KINDS)[number];

const EMPTY = { kind: 'Compliments' as Kind, person: '', firstName: '', lastName: '', email: '', phone: '', message: '' };

/** Compliments, complaints and suggestions (public/design/feedback.png). */
export function FeedbackForm() {
  const kindName = useId();
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const set = <K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send `form` to the feedback inbox.
    setSent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (sent) {
    return (
      <SentMessage title="Thank You For Your Feedback">
        <p>
          We read every message. If you’ve asked us to get back to you, we’ll reply to <strong>{form.email}</strong>.
        </p>
      </SentMessage>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="mb-3 text-base font-bold text-brand-ink lg:u-mb-12 lg:u-text-23">I want to give my...</legend>
        <div className="flex flex-wrap gap-2 lg:u-gap-15">
          {KINDS.map((kind) => {
            const selected = form.kind === kind;
            return (
              <label key={kind} className="cursor-pointer">
                <input type="radio" name={kindName} className="peer sr-only" checked={selected} onChange={() => set('kind', kind)} />
                {/* As in the design, the chosen option is outlined and the others are filled. */}
                <span
                  className={cn(
                    'flex h-9 w-36 items-center justify-center rounded-full border-[3px] border-brand-ink text-sm font-bold transition-colors lg:u-h-39 lg:u-w-286 lg:u-text-19 lg:u-border-4',
                    'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-brand-green',
                    selected ? 'bg-transparent text-brand-ink' : 'bg-brand-ink text-white hover:bg-brand-ink/85'
                  )}
                >
                  {kind}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <ChoiceGroup
        className="mt-8 lg:u-mt-51"
        legend="I am a..."
        options={PEOPLE}
        value={form.person as (typeof PEOPLE)[number]}
        onChange={(person) => set('person', person)}
        optionsClassName="lg:u-gap-x-24"
      />

      <div className={cn('grid gap-5 sm:grid-cols-2 lg:u-gap-x-14 lg:u-gap-y-22', groupGap)}>
        <Field label="First Name" required autoComplete="given-name" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
        <Field label="Last Name" autoComplete="family-name" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
        <Field label="Email" type="email" required autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
        <Field label="Phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
      </div>

      <div className="mt-5 lg:u-mt-22">
        <FieldLabel htmlFor="feedback-message">Message</FieldLabel>
        <TextArea id="feedback-message" required value={form.message} onChange={(e) => set('message', e.target.value)} />
      </div>

      <SubmitRow thanks="Thank you for starting a conversation with us!" />
    </form>
  );
}
