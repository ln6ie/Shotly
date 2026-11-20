import type { Metadata } from "next";

const description =
  "نسّق لقطات تطبيقك لمتجري App Store وGoogle Play. أضف الصور والنصوص والشعار والخلفية، ثم صدّر التصميم بصيغة PNG عالية الدقة.";
const previewImage =
  "https://raw.githubusercontent.com/ln6ie/Shotly/main/public/logo.png";

export const siteMetadata: Metadata = {
  title: "Shotly — صانع لقطات شاشة التطبيقات",
  description,
  applicationName: "Shotly",
  keywords: [
    "Shotly",
    "تصميم لقطات شاشة",
    "لقطات تطبيقات",
    "App Store screenshots",
    "Google Play screenshots",
  ],
  authors: [{ name: "ln6ie", url: "https://github.com/ln6ie" }],
  openGraph: {
    title: "Shotly — صانع لقطات شاشة التطبيقات",
    description,
    siteName: "Shotly",
    images: [{ url: previewImage, width: 512, height: 512, alt: "شعار Shotly" }],
    locale: "ar_IQ",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Shotly — صانع لقطات شاشة التطبيقات",
    description,
    images: [previewImage],
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }, { url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};
