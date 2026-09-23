'use client';

import { useId } from 'react';
import { Bubble, FieldLabel, TextInput, groupGap, labelClass } from '@/components/forms/DesignForm';
import { cn } from '@/lib/utils';

/*
 * The title / date of birth, name and address rows shared by the Partnerships
 * and Referral forms (public/design).
 */

export const TITLES = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'] as const;

export interface Person {
  title: string;
  /** Free text when the title is "Other". */
  titleOther: string;
  dateOfBirth: string;
  firstName: string;
  /** Or preferred name, see `preferredName`. */
  middleName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
}

export const emptyPerson = (): Person => ({
  title: '',
  titleOther: '',
  dateOfBirth: '',
  firstName: '',
  middleName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  region: '',
  postcode: '',
  country: '',
});

const DATE_PATTERN = '\\s*\\d{1,2}\\s*/\\s*\\d{1,2}\\s*/\\s*\\d{4}\\s*';

interface PersonFieldsProps {
  value: Person;
  onChange: (value: Person) => void;
  /** Ask for a preferred name (after the last name) instead of a middle name, as for the young person on the referral form. */
  preferredName?: boolean;
}

export function PersonFields({ value, onChange, preferredName = false }: PersonFieldsProps) {
  const middleLabel = preferredName ? 'Preferred Name' : 'Middle Name';
  const titleName = useId();
  const dobId = useId();
  const set = <K extends keyof Person>(key: K, v: Person[K]) => onChange({ ...value, [key]: v });

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
        <fieldset>
          <legend className={cn(labelClass, 'mb-2 lg:u-mb-10')}>Title*</legend>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:u-gap-x-30">
            {TITLES.map((title) => (
              <Bubble
                key={title}
                type="radio"
                name={titleName}
                required
                label={title}
                checked={value.title === title}
                onChange={() => onChange({ ...value, title, titleOther: '' })}
              />
            ))}
            <label className="inline-flex items-center gap-2 text-sm text-brand-ink lg:u-gap-8 lg:u-text-19">
              <input
                type="radio"
                name={titleName}
                className="sr-only"
                checked={value.title === 'Other'}
                onChange={() => set('title', 'Other')}
              />
              Other
              <TextInput
                aria-label="Other title"
                className="w-28 lg:u-w-135"
                value={value.titleOther}
                onFocus={() => value.title !== 'Other' && set('title', 'Other')}
                onChange={(e) => onChange({ ...value, title: 'Other', titleOther: e.target.value })}
                required={value.title === 'Other'}
              />
            </label>
          </div>
        </fieldset>

        <div className="lg:u-w-280">
          <FieldLabel htmlFor={dobId}>Date of Birth*</FieldLabel>
          <TextInput
            id={dobId}
            required
            inputMode="numeric"
            placeholder="DD / MM / YYYY"
            pattern={DATE_PATTERN}
            title="Use the format DD / MM / YYYY"
            value={value.dateOfBirth}
            onChange={(e) => set('dateOfBirth', e.target.value)}
          />
        </div>
      </div>

      <fieldset className={groupGap}>
        <legend className={cn(labelClass, 'mb-2 lg:u-mb-10')}>Name</legend>
        <div className="grid gap-3 sm:grid-cols-3 lg:u-gap-30">
          <TextInput aria-label="First name" placeholder="First Name*" required autoComplete="given-name" value={value.firstName} onChange={(e) => set('firstName', e.target.value)} />
          <TextInput
            aria-label={middleLabel}
            placeholder={middleLabel}
            autoComplete={preferredName ? 'nickname' : 'additional-name'}
            className={preferredName ? 'sm:order-last' : undefined}
            value={value.middleName}
            onChange={(e) => set('middleName', e.target.value)}
          />
          <TextInput aria-label="Last name" placeholder="Last Name*" required autoComplete="family-name" value={value.lastName} onChange={(e) => set('lastName', e.target.value)} />
        </div>
      </fieldset>

      <fieldset className={groupGap}>
        <legend className={cn(labelClass, 'mb-2 lg:u-mb-10')}>Address</legend>
        <div className="space-y-3 lg:space-y-0">
          <TextInput aria-label="Address line 1" placeholder="Address Line 1*" required autoComplete="address-line1" value={value.address1} onChange={(e) => set('address1', e.target.value)} />
          <TextInput aria-label="Address line 2" placeholder="Address Line 2" autoComplete="address-line2" className="lg:u-mt-24" value={value.address2} onChange={(e) => set('address2', e.target.value)} />
          <div className="grid gap-3 sm:grid-cols-2 lg:u-mt-24 lg:grid-cols-4 lg:u-gap-24">
            <TextInput aria-label="City" placeholder="City*" required autoComplete="address-level2" value={value.city} onChange={(e) => set('city', e.target.value)} />
            <TextInput aria-label="State, province or region" placeholder="State/Province/Region*" required autoComplete="address-level1" value={value.region} onChange={(e) => set('region', e.target.value)} />
            <TextInput aria-label="Postal or zip code" placeholder="Postal/Zip Code*" required autoComplete="postal-code" value={value.postcode} onChange={(e) => set('postcode', e.target.value)} />
            <TextInput aria-label="Country" placeholder="Country*" required autoComplete="country-name" value={value.country} onChange={(e) => set('country', e.target.value)} />
          </div>
        </div>
      </fieldset>
    </>
  );
}
