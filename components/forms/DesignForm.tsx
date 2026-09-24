'use client';

import { useId } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * Building blocks for the forms in public/design (Partnerships, Make a
 * Referral, Feedback): white pill fields straight on the green page, bold ink
 * labels and pill "bubbles" for choices. From lg up, sizes are design pixels
 * (u-* units, 1920px frame).
 */

const fieldText = 'text-sm text-brand-ink placeholder:text-neutral-400 lg:u-text-19';
const focusRing = 'outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green';

export const labelClass = 'block text-sm font-bold text-brand-ink lg:u-text-19';

/** Space between one question and the next. */
export const groupGap = 'mt-8 lg:u-mt-44';

export function FieldLabel({ htmlFor, children, className }: { htmlFor?: string; children: React.ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn(labelClass, 'mb-2 lg:u-mb-10', className)}>
      {children}
    </label>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className, ...props }: InputProps) {
  return <input {...props} className={cn('h-9 w-full rounded-full bg-white px-4 lg:u-h-36 lg:u-px-17', fieldText, focusRing, className)} />;
}

/*
 * Note: cn() can't tell that two u-* classes set the same property, so a
 * size variant is chosen with a prop rather than overridden with className.
 */
const TEXTAREA_HEIGHT = { short: 'h-28 lg:u-h-106', default: 'h-44 lg:u-h-208', tall: 'h-48 lg:u-h-234' };

export function TextArea({
  short = false,
  tall = false,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { short?: boolean; tall?: boolean }) {
  return (
    <textarea
      {...props}
      className={cn(
        'block w-full resize-y rounded-2xl bg-white px-4 py-3 lg:u-rounded-15 lg:u-px-17 lg:u-py-12',
        TEXTAREA_HEIGHT[short ? 'short' : tall ? 'tall' : 'default'],
        fieldText,
        focusRing,
        className
      )}
    />
  );
}

/** A labelled text field. */
export function Field({ label, className, ...props }: InputProps & { label: React.ReactNode }) {
  const id = useId();
  return (
    <div className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <TextInput id={id} {...props} />
    </div>
  );
}

interface BubbleProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Radio buttons in the same group share a name. */
  type?: 'radio' | 'checkbox';
  name?: string;
  required?: boolean;
  /** The design puts the bubble after short labels ("Mr ◯") and before long ones ("◯ Referral partnership"). */
  bubbleFirst?: boolean;
  className?: string;
}

/** A choice: a native radio/checkbox drawn as the design's white pill. */
export function Bubble({ label, checked, onChange, type = 'checkbox', name, required, bubbleFirst = false, className }: BubbleProps) {
  const pill = (
    <span
      aria-hidden="true"
      className={cn(
        'flex h-7 w-10 shrink-0 items-center justify-center rounded-full bg-white transition-colors lg:u-h-36 lg:u-w-51',
        'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-brand-green',
        checked && 'bg-brand-ink'
      )}
    >
      <span className={cn('h-2.5 w-2.5 rounded-full bg-white transition-transform lg:u-h-12 lg:u-w-12', checked ? 'scale-100' : 'scale-0')} />
    </span>
  );

  return (
    <label className={cn('inline-flex cursor-pointer items-center gap-2 text-sm leading-[1.05] text-brand-ink lg:u-gap-8 lg:u-text-19', className)}>
      <input
        type={type}
        name={name}
        required={required}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      {bubbleFirst && pill}
      <span>{label}</span>
      {!bubbleFirst && pill}
    </label>
  );
}

interface ChoiceGroupProps<T extends string> {
  legend: React.ReactNode;
  options: readonly T[];
  value: T | T[];
  onChange: (value: T) => void;
  bubbleFirst?: boolean;
  required?: boolean;
  className?: string;
  /** Layout of the options. */
  optionsClassName?: string;
  /** Start a new row after these option indexes, to match the design's rows. */
  breakAfter?: number[];
  /** Extra content after the options, e.g. an "Other" text box. */
  children?: React.ReactNode;
}

/** A question answered with bubbles; an array value makes it multi-select. */
export function ChoiceGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
  bubbleFirst,
  required,
  className,
  optionsClassName,
  breakAfter = [],
  children,
}: ChoiceGroupProps<T>) {
  const name = useId();
  const multi = Array.isArray(value);

  const bubble = (option: T) => (
    <Bubble
      key={option}
      label={option}
      type={multi ? 'checkbox' : 'radio'}
      name={name}
      // One required radio makes the group required.
      required={required && !multi}
      bubbleFirst={bubbleFirst}
      checked={multi ? value.includes(option) : value === option}
      onChange={() => onChange(option)}
    />
  );

  const rowClass = cn('flex flex-wrap items-center gap-x-6 gap-y-3 lg:u-gap-x-30', optionsClassName);

  // With breakAfter, each design row is its own line of options; `children` joins the last one.
  if (breakAfter.length) {
    const rows: T[][] = [[]];
    options.forEach((option, i) => {
      rows[rows.length - 1].push(option);
      if (breakAfter.includes(i) && i < options.length - 1) rows.push([]);
    });
    return (
      <fieldset className={className}>
        <legend className={cn(labelClass, 'mb-2 lg:u-mb-10')}>{legend}</legend>
        <div className="flex flex-col gap-3 lg:u-gap-y-18">
          {rows.map((row, r) => (
            <div key={r} className={rowClass}>
              {row.map(bubble)}
              {r === rows.length - 1 && children}
            </div>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className={className}>
      <legend className={cn(labelClass, 'mb-2 lg:u-mb-10')}>{legend}</legend>
      <div className={rowClass}>
        {options.map(bubble)}
        {children}
      </div>
    </fieldset>
  );
}

/** Adds or removes an option from a multi-select answer. */
export function toggle<T>(list: T[], option: T): T[] {
  return list.includes(option) ? list.filter((o) => o !== option) : [...list, option];
}

export function SubmitRow({
  thanks,
  label = 'Submit',
  error,
  spacious = false,
  pending = false,
}: {
  thanks: string;
  label?: string;
  error?: string;
  spacious?: boolean;
  /** While sending: the button is disabled and says so. */
  pending?: boolean;
}) {
  return (
    <div className={spacious ? 'mt-16 lg:u-mt-183' : 'mt-12 lg:u-mt-80'}>
      {error && (
        <p role="alert" className="mb-4 font-bold text-brand-ink lg:u-mb-16 lg:u-text-19">
          {error}
        </p>
      )}
      <p className="text-sm font-bold text-brand-ink lg:u-text-19">{thanks}</p>
      <button
        type="submit"
        disabled={pending}
        className={cn(
          'mt-3 h-10 w-44 cursor-pointer rounded-full bg-brand-ink text-base font-bold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-wait disabled:opacity-70 lg:u-mt-14 lg:u-h-42 lg:u-w-227 lg:u-text-22',
          focusRing
        )}
      >
        {pending ? 'Sending…' : label}
      </button>
    </div>
  );
}

/** Shown in place of a form once it has been sent. */
export function SentMessage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="status" className="rounded-tr-[3rem] bg-white px-6 py-12 text-center text-brand-ink sm:px-12 lg:u-rounded-tr-80">
      <CheckCircle2 className="mx-auto h-14 w-14 text-brand-green" aria-hidden="true" />
      <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{title}</h2>
      <div className="mx-auto mt-4 max-w-xl space-y-3 text-sm leading-relaxed sm:text-base">{children}</div>
    </div>
  );
}
