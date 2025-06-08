import Footer from './_components/footer';
import Header from './_components/header';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <div className="mx-auto max-w-300">{children}</div>
      <Footer />
    </main>
  );
}
