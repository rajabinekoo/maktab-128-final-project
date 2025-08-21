import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import { iranSans } from "@/utils/fonts";
import { classes } from "@/utils/classes";
import { AppBar } from "@/components/organisms/appbar";
import { ReduxProvider } from "@/providers/redux.provider";
import { ReactQueryProvider } from "@/providers/react-query.provider";

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
      <body
        className={classes(
          "bg-zinc-50 text-zinc-900 antialiased",
          iranSans.variable
        )}
      >
        <ReduxProvider>
          <ReactQueryProvider>
            <ToastContainer position="top-left" />
            <AppBar />
            {children}
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
