import type { Metadata } from 'next';
import Image from 'next/image';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata: Metadata = { title: 'Sign in' };

export default async function LoginPage({ searchParams }: PageProps<'/admin/login'>) {
  const { next } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-green px-4 py-16">
      <div className="w-full max-w-md rounded-tr-[3rem] bg-white p-8 shadow-xl sm:p-10">
        <Image src="/logo.svg" width={281} height={135} alt="Muve Futures" className="h-auto w-36 rounded bg-brand-green p-2" priority />
        <h1 className="mt-6 text-2xl font-bold">Sign in to the dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">Edit website content and publish blog posts.</p>
        <LoginForm next={typeof next === 'string' ? next : '/admin'} />
      </div>
    </main>
  );
}
