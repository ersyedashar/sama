import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happy Birthday Sama ❤️ | From Er. Syed Ashar",
  description:
    "A magical digital birthday experience for Sama — crafted with love by Er. Syed Ashar.",
  keywords: ["birthday", "sama", "interactive", "celebration", "magical"],
  openGraph: {
    title: "Happy Birthday Sama ❤️ | From Er. Syed Ashar",
    description:
      "A magical digital birthday experience for Sama — crafted with love by Er. Syed Ashar",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#050510] text-white w-full">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
