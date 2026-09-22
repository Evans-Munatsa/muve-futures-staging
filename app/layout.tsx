import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SITE_CONFIG } from '@/constants';
import './globals.css';

// Every weight the design uses; with only Regular loaded the browser fakes bold.
const lexendDeca = localFont({
  src: [
    { path: '../public/fonts/LexendDeca-Light.ttf', weight: '300' },
    { path: '../public/fonts/LexendDeca-Regular.ttf', weight: '400' },
    { path: '../public/fonts/LexendDeca-Medium.ttf', weight: '500' },
    { path: '../public/fonts/LexendDeca-SemiBold.ttf', weight: '600' },
    { path: '../public/fonts/LexendDeca-Bold.ttf', weight: '700' },
    { path: '../public/fonts/LexendDeca-ExtraBold.ttf', weight: '800' },
  ],
  variable: '--font-lexend-deca-local',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
};

// Navbar/footer live in app/(site)/layout.tsx so that standalone pages
// such as /coming-soon can opt out of them.
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-GB" className={lexendDeca.variable}>
      <body className="font-lexend-deca flex min-h-full flex-col">{children}</body>
    </html>
  );
}
