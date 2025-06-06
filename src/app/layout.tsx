import type { Metadata } from 'next';
import './globals.css';
import { geistMono, geistSans } from './fonts';

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
