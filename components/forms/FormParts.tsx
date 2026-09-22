import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Numbered section inside a form, e.g. "1. About you". */
export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-5">
      <legend className="w-full border-b-2 border-brand-green pb-2 text-lg font-bold text-brand-ink">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

interface ChoiceChipsProps<T extends string> {
  label: string;
  options: readonly T[];
  /** Selected value(s). An array makes the group multi-select. */
  value: T | T[];
  onToggle: (option: T) => void;
  columns?: string;
}

/** Row of pill buttons used for single- and multi-select questions. */
export function ChoiceChips<T extends string>({ label, options, value, onToggle, columns }: ChoiceChipsProps<T>) {
  const multi = Array.isArray(value);
  const isSelected = (option: T) => (multi ? value.includes(option) : value === option);

  return (
    <div role="group" aria-label={label}>
      <p className="mb-2.5 text-sm font-semibold text-brand-ink">{label}</p>
      <div className={cn('flex flex-wrap gap-2', columns)}>
        {options.map((option) => {
          const selected = isSelected(option);
          return (
            <button
              type="button"
              key={option}
              onClick={() => onToggle(option)}
              aria-pressed={selected}
              className={cn(
                'cursor-pointer rounded-full border-2 px-4 py-2 text-xs font-bold transition sm:text-sm',
                selected
                  ? 'border-brand-orange bg-brand-orange text-white'
                  : 'border-brand-ink/15 bg-white text-brand-ink hover:border-brand-orange'
              )}
            >
              {multi && (selected ? '✓ ' : '+ ')}
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Confirmation shown in place of a form once it has been submitted. */
export function FormSuccess({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div role="status" className="space-y-5 py-8 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-white">
        <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
      </span>
      <h2 className="text-2xl font-bold text-brand-ink sm:text-3xl">{title}</h2>
      <div className="mx-auto max-w-md space-y-3 text-sm leading-relaxed text-brand-ink sm:text-base">{children}</div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

/** Inline validation message. */
export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl border-2 border-brand-coral bg-brand-coral/10 px-4 py-3 text-sm font-semibold text-brand-ink">
      {message}
    </p>
  );
}
