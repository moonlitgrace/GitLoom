import DashboardHeader from './_components/header';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <DashboardHeader />
      <div className="mx-auto max-w-300">{children}</div>
    </main>
  );
}
