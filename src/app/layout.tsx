import type { Metadata } from "next";
import { iranSans } from "@/utils/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Articleland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning={true}>
      <body className={`${iranSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
