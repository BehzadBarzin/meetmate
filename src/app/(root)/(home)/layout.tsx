import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      {/* Navbar------------------------------------------------------------ */}
      <Navbar />
      {/* Sidebar + Content------------------------------------------------- */}
      <div className="flex">
        {/* Sidebar--------------------------------------------------------- */}
        <Sidebar />
        {/* Content--------------------------------------------------------- */}
        <section className="flex flex-col min-h-screen flex-1 px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
        {/* ---------------------------------------------------------------- */}
      </div>
    </main>
  );
}
