import { Toaster } from '@/components/ui/sonner';
import QueryProvider from '@/providers/query-provider';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { geistMono, geistSans } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'GitLoom',
  description: 'The Git-native CMS for modern content workflows.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: 'px-4 py-3! gap-2! text-xs!',
            classNames: {
              description: 'text-muted-foreground!',
            },
          }}
        />
      </body>
    </html>
  );
}
