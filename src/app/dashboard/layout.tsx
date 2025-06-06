import DashboardHeader from "./_components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <DashboardHeader />
      <div className="p-5">
        {children}
      </div>
    </main>
  );
}
