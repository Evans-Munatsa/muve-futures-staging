'use client';

import { useActionState, useEffect, useRef } from 'react';
import { changePassword, createAdmin, type FormState } from '@/lib/admin/user-actions';
import { MIN_PASSWORD_LENGTH } from '@/lib/auth/password-rules';
import { inputClass } from './MediaInputs';

function Result({ state }: { state: FormState }) {
  if (state.error) return <p role="alert" className="text-sm font-semibold text-red-600">{state.error}</p>;
  if (state.success) return <p role="status" className="text-sm font-semibold text-green-700">{state.success}</p>;
  return null;
}

const card = 'space-y-4 rounded-xl border border-neutral-200 bg-white p-5';
const field = 'block text-sm font-semibold';
const submit = 'cursor-pointer rounded-full bg-brand-orange px-5 py-2 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60';

export function AddAdminForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(createAdmin, {});
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className={card}>
      <h2 className="text-lg font-bold">Add an admin</h2>
      <label className={field}>
        Name
        <input name="name" required className={`${inputClass} mt-1`} />
      </label>
      <label className={field}>
        Email
        <input name="email" type="email" required className={`${inputClass} mt-1`} />
      </label>
      <label className={field}>
        Temporary password
        <input name="password" type="password" required minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" className={`${inputClass} mt-1`} />
        <span className="mt-1 block text-xs font-normal text-neutral-500">
          At least {MIN_PASSWORD_LENGTH} characters. Share it securely; they can change it after signing in.
        </span>
      </label>
      <Result state={state} />
      <button type="submit" disabled={pending} className={submit}>
        {pending ? 'Adding…' : 'Add admin'}
      </button>
    </form>
  );
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(changePassword, {});
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className={card}>
      <h2 className="text-lg font-bold">Change your password</h2>
      <label className={field}>
        Current password
        <input name="current" type="password" required autoComplete="current-password" className={`${inputClass} mt-1`} />
      </label>
      <label className={field}>
        New password
        <input name="next" type="password" required minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" className={`${inputClass} mt-1`} />
      </label>
      <Result state={state} />
      <button type="submit" disabled={pending} className={submit}>
        {pending ? 'Updating…' : 'Update password'}
      </button>
    </form>
  );
}
