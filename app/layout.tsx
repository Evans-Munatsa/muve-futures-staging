"use client";

import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import "./globals.css";
import { AppShell } from "@/components/common/AppShell";

// Initialize your local font file safely
const lexendDeca = localFont({
  src: "../public/fonts/LexendDeca-Regular.ttf",
  variable: "--font-lexend-deca",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  const isComingSoon = pathname === "/coming-soon";

  return (
    <html lang="en">
      <body className={`min-h-full flex flex-col ${lexendDeca.variable}`}>
        {isComingSoon ? (
          // Render plain children without AppShell (No Nav/Footer) on coming-soon page
          <main>{children}</main> 
        ) : (
          // Render standard AppShell with Nav/Footer everywhere else
          <AppShell>{children}</AppShell>
        )}
      </body>
    </html>
  );
}
