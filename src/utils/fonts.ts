import localFont from "next/font/local";

export const iranSans = localFont({
  src: [
    {
      path: "../../public/fonts/IRANSans/IRANSansX-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSans/IRANSansX-UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSans/IRANSansX-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSans/IRANSansX-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSans/IRANSansX-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSans/IRANSansX-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSans/IRANSansX-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSans/IRANSansX-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSans/IRANSansX-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iran-sans",
  display: "swap",
});
