import QueryProvider from '@/providers/query-provider';
import type { Metadata } from 'next';
import { geistMono, geistSans } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gitloom',
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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
