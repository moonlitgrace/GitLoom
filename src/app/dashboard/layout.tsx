import DashboardHeader from "./_components/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <DashboardHeader />
      <div className="p-4">
        {children}
      </div>
    </main>
  );
}
