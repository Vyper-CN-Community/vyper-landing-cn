import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function getImageUrl(baseUrl: string): string {
  const timestamp = Date.now();
  return `${baseUrl}?v=${timestamp}`;
}

const baseImageUrl = "https://vyperlang.org/assets/images/og-img-vyper.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://vyperlang.org"),
  title: "Vyper",
  description:
    "Vyper is a smart contract language with a relentless focus on security, simplicity, and readability",
  openGraph: {
    title: "Vyper",
    description:
      "Vyper is a smart contract language with a relentless focus on security, simplicity, and readability",
    url: "https://vyperlang.org",
    siteName: "Vyper",
    images: [
      {
        url: getImageUrl(baseImageUrl),
        width: 1200,
        height: 630,
        alt: "Vyper is a smart contract language with a relentless focus on security, simplicity, and readability",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyper",
    description:
      "Vyper is a smart contract language with a relentless focus on security, simplicity, and readability",
    images: [getImageUrl(baseImageUrl)],
  },
  other: {
    "telegram-image": getImageUrl(baseImageUrl),
  },
};
