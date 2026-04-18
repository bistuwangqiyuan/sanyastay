import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "三亚旅居通 SanyaStay - 三亚领先旅居民宿平台",
    template: "%s | 三亚旅居通 SanyaStay",
  },
  description:
    "三亚旅居通是三亚领先的旅居民宿平台，提供短租、月租、季租一站式服务。品质认证房源，资金托管保障，旅居社区互助。在三亚，住出生活的模样。",
  keywords: [
    "三亚旅居",
    "三亚民宿",
    "三亚短租",
    "三亚月租",
    "三亚季租",
    "候鸟旅居",
    "海南旅居",
    "SanyaStay",
  ],
  authors: [{ name: "SanyaStay" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "三亚旅居通 SanyaStay",
    title: "三亚旅居通 - 在三亚，住出生活的模样",
    description:
      "三亚领先旅居民宿平台，提供短租、月租、季租一站式服务。品质认证，资金托管，社区互助。",
  },
  twitter: {
    card: "summary_large_image",
    title: "三亚旅居通 SanyaStay",
    description: "三亚领先旅居民宿平台 - Live Your Life in Sanya",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
