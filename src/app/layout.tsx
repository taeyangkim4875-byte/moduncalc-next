import type { Metadata } from "next";
import Script from "next/script";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "모든 계산기 - 연봉, 적금, 대출, 건강 계산기",
    template: "%s | 모든 계산기",
  },
  description: "연봉 실수령액, 청년도약계좌, 대출이자, BMI까지. 2026년 최신 정책 반영 무료 계산기 모음.",
  metadataBase: new URL("https://moduncalc.com"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "모든 계산기",
  },
  robots: "index, follow",
  verification: {
    other: {
      "naver-site-verification": "c33afc1701de2a5bdeff3618d35c66829dd77437",
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NX4JK10SS6"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-NX4JK10SS6');`}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3741035032582828"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Sidebar />
        <main className="lg:ml-[var(--sb-w)]">
          {children}
        </main>
      </body>
    </html>
  );
}
