'use client';

import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Loader2, Paperclip, X } from 'lucide-react';
import { Bubble, ChoiceGroup, FieldLabel, SentMessage, TextArea, TextInput, groupGap, labelClass } from '@/components/forms/DesignForm';
import { submitApplication } from '@/lib/careers/apply';
import { CV_ACCEPT, CV_MAX_BYTES, RIGHT_TO_WORK, type ApplyState } from '@/lib/careers/shared';
import { cn } from '@/lib/utils';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm font-bold text-brand-ink lg:u-text-17">⚠ {message}</p>;
}

/** Apply for one vacancy: details, right to work, CV upload and consent. */
export function ApplicationForm({ slug, jobTitle }: { slug: string; jobTitle: string }) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(submitApplication.bind(null, slug), { ok: null });
  const [rightToWork, setRightToWork] = useState('');
  const [consent, setConsent] = useState(false);
  const [cvName, setCvName] = useState('');
  const [cvError, setCvError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef<HTMLInputElement>(null);

  // When the form was first shown, for the server's bot check.
  useEffect(() => {
    if (startedRef.current && !startedRef.current.value) startedRef.current.value = String(Date.now());
  }, []);

  // Bring the confirmation (or the first problem) into view after sending.
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.ok !== null) topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [state]);

  if (state.ok) {
    return (
      <div ref={topRef} className="scroll-mt-32">
        <SentMessage title="Application Received">
          <p>
            Thank you for applying for <strong>{jobTitle}</strong>. Your reference is:
          </p>
          <p className="inline-block rounded-xl bg-brand-lime px-5 py-2 text-xl font-bold tracking-wider">{state.reference}</p>
          <p>We’ll review your application and be in touch by email or phone. Please keep your reference in case you need to contact us.</p>
          <p>
            <Link href="/careers" className="font-bold underline">
              See other vacancies
            </Link>
          </p>
        </SentMessage>
      </div>
    );
  }

  const errors = state.ok === false ? (state.fieldErrors ?? {}) : {};

  const pickFile = (file: File | undefined) => {
    setCvError('');
    setCvName(file?.name ?? '');
    if (file && file.size > CV_MAX_BYTES) {
      setCvError(`That file is ${(file.size / 1024 / 1024).toFixed(1)}MB. Your CV must be ${CV_MAX_BYTES / 1024 / 1024}MB or smaller.`);
    }
  };

  return (
    <div ref={topRef} className="scroll-mt-32">
      <form
        // Submitted by hand rather than with `action=`: React resets a form after its
        // action runs, which would wipe everything (and the CV) if a field needs fixing.
        onSubmit={(e) => {
          e.preventDefault();
          if (cvError || pending) return;
          const data = new FormData(e.currentTarget);
          startTransition(() => action(data));
        }}
      >
        {state.ok === false && (
          <p role="alert" className="mb-8 rounded-2xl bg-white px-5 py-4 font-bold text-brand-ink lg:u-mb-34 lg:u-text-19">
            {state.error}
          </p>
        )}

        {/* Bot traps: hidden from people, filled in by most spam scripts. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <input ref={startedRef} type="hidden" name="startedAt" />

        <fieldset>
          <legend className={cn(labelClass, 'mb-2 lg:u-mb-10')}>Name</legend>
          <div className="grid gap-3 sm:grid-cols-2 lg:u-gap-30">
            <div>
              <TextInput name="firstName" aria-label="First name" placeholder="First Name*" required autoComplete="given-name" aria-invalid={!!errors.firstName} />
              <FieldError message={errors.firstName} />
            </div>
            <div>
              <TextInput name="lastName" aria-label="Last name" placeholder="Last Name*" required autoComplete="family-name" aria-invalid={!!errors.lastName} />
              <FieldError message={errors.lastName} />
            </div>
          </div>
        </fieldset>

        <div className={cn('grid gap-6 sm:grid-cols-2 lg:u-gap-x-30 lg:gap-y-0', groupGap)}>
          <div>
            <FieldLabel htmlFor="apply-email">Email*</FieldLabel>
            <TextInput id="apply-email" name="email" type="email" required autoComplete="email" aria-invalid={!!errors.email} />
            <FieldError message={errors.email} />
          </div>
          <div>
            <FieldLabel htmlFor="apply-phone">Phone*</FieldLabel>
            <TextInput id="apply-phone" name="phone" type="tel" required autoComplete="tel" aria-invalid={!!errors.phone} />
            <FieldError message={errors.phone} />
          </div>
        </div>

        <div className={cn('grid gap-6 sm:grid-cols-2 lg:u-gap-x-30 lg:gap-y-0', groupGap)}>
          <div>
            <FieldLabel htmlFor="apply-location">Where are you based?</FieldLabel>
            <TextInput id="apply-location" name="location" placeholder="Town or city" autoComplete="address-level2" />
          </div>
          <div>
            <ChoiceGroup
              legend="Do you have the right to work in the UK?*"
              options={RIGHT_TO_WORK}
              value={rightToWork as (typeof RIGHT_TO_WORK)[number]}
              onChange={setRightToWork}
              required
            />
            {/* The bubbles show the choice; this carries it in the form data. */}
            <input type="hidden" name="rightToWork" value={rightToWork} />
            <FieldError message={errors.rightToWork} />
          </div>
        </div>

        <div className={groupGap}>
          <p className={cn(labelClass, 'mb-2 lg:u-mb-10')} id="apply-cv-label">
            CV*
          </p>
          <div className="flex flex-wrap items-center gap-3 lg:u-gap-14">
            <label
              className={cn(
                'inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-brand-ink px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg',
                'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-orange has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-brand-green',
                'lg:u-h-42 lg:u-px-28 lg:u-text-19'
              )}
            >
              <Paperclip className="h-4 w-4" aria-hidden="true" />
              {cvName ? 'Change file' : 'Choose file'}
              <input
                ref={fileRef}
                type="file"
                name="cv"
                accept={CV_ACCEPT}
                required
                aria-labelledby="apply-cv-label"
                aria-invalid={!!(errors.cv || cvError)}
                className="sr-only"
                onChange={(e) => pickFile(e.target.files?.[0])}
              />
            </label>
            {cvName ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-brand-ink lg:u-text-17">
                <span className="max-w-[16rem] truncate">{cvName}</span>
                <button
                  type="button"
                  aria-label="Remove file"
                  className="cursor-pointer text-neutral-500 hover:text-brand-ink"
                  onClick={() => {
                    if (fileRef.current) fileRef.current.value = '';
                    pickFile(undefined);
                  }}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </span>
            ) : (
              <span className="text-sm text-brand-ink lg:u-text-17">PDF or Word, up to {CV_MAX_BYTES / 1024 / 1024}MB</span>
            )}
          </div>
          <FieldError message={cvError || errors.cv} />
        </div>

        <div className={groupGap}>
          <FieldLabel htmlFor="apply-cover">Why are you interested in this role?</FieldLabel>
          <TextArea id="apply-cover" name="coverLetter" maxLength={6000} placeholder="Tell us a little about yourself and your experience (optional)" />
        </div>

        <div className={cn('lg:u-w-580', groupGap)}>
          <FieldLabel htmlFor="apply-heard">How did you hear about this role?</FieldLabel>
          <TextInput id="apply-heard" name="heardAbout" placeholder="e.g. LinkedIn, a friend, our website" />
        </div>

        <div className={groupGap}>
          <Bubble
            bubbleFirst
            required
            checked={consent}
            onChange={setConsent}
            label={
              <>
                I’m happy for MUVE Futures to use the details and CV I’ve provided to consider my application, as described in the{' '}
                <Link href="/privacy-policy" target="_blank" className="font-bold underline">
                  Privacy Policy
                </Link>
                .*
              </>
            }
          />
          <input type="hidden" name="consent" value={consent ? 'yes' : ''} />
          <FieldError message={errors.consent} />
        </div>

        <div className="mt-12 lg:u-mt-60">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-10 min-w-44 cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-orange px-8 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#d94e20] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-wait disabled:opacity-70 lg:u-h-48 lg:u-min-w-268 lg:u-text-22"
          >
            {pending && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
            {pending ? 'Sending…' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
}
