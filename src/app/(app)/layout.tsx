import { SessionProvider } from 'next-auth/react';
import Footer from './_components/footer';
import Header from './_components/header';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <SessionProvider>
        <Header />
      </SessionProvider>
      <div className="mx-auto max-w-300">{children}</div>
      <Footer />
    </main>
  );
}
