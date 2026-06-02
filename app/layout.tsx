import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tracert — Cisco Certification Study Tracker",
  description: "Dev mock mode build for Tracert.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed right-3 top-3 z-50 rounded-full border border-amber-500/50 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
          DEV MOCK MODE
        </div>
        {children}
      </body>
    </html>
  );
}
