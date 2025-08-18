import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen h-[calc(100vh-70px)] overflow-hidden flex flex-col md:flex-row flex-nowrap">
      <aside className="relative w-screen md:w-[600px] lg:w-[900px] h-[400px] md:h-screen">
        <Image fill className="object-cover" alt="sidebar" src="/side.jpg" />
      </aside>
      <section className="w-full md:h-full flex justify-center items-center px-4 py-8">
        {children}
      </section>
    </main>
  );
}
