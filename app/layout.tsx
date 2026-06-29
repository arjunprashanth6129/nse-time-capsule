import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PROJECT } from "@/lib/stats";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${PROJECT.name} - ${PROJECT.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(PROJECT.live),
  title: {
    default: title,
    template: `%s · ${PROJECT.name}`,
  },
  description: PROJECT.description,
  applicationName: PROJECT.name,
  authors: [{ name: PROJECT.author }],
  keywords: [
    "financial literacy",
    "stock screener",
    "portfolio backtesting",
    "fundamental analysis",
    "NSE",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    type: "website",
    url: PROJECT.live,
    title,
    description: PROJECT.description,
    siteName: PROJECT.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: PROJECT.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
