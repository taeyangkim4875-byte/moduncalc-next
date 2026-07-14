import type { Metadata } from "next";
import Script from "next/script";
import Sidebar from "@/components/Sidebar";
import ScrollToTop from "@/components/ScrollToTop";
import { WebsiteJsonLd } from "@/components/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "모든 계산기 - 연봉, 적금, 대출, 건강, 세금 무료 계산기 70종 (2026)",
    template: "%s | 모든 계산기",
  },
  description: "연봉 실수령액, 청년도약계좌, 청년미래적금, 대출이자, 취득세, BMI, 퇴직금, 최저시급까지. 2026년 최신 정책 반영 무료 계산기 모음 70종.",
  keywords: "계산기, 연봉 실수령액, 청년도약계좌, 청년미래적금, 대출 이자 계산기, BMI 계산기, 국민연금, 실업급여, 최저시급, 퇴직금 계산기, 취득세, 전월세 전환, 종합소득세, 증여세, 연말정산",
  metadataBase: new URL("https://moduncalc.com"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "모든 계산기",
    url: "https://moduncalc.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@moduncalc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    other: {
      "naver-site-verification": "c33afc1701de2a5bdeff3618d35c66829dd77437",
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    languages: {
      "ko": "https://moduncalc.com",
      "en": "https://moduncalc.com/en",
    },
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
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#3182F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="모든계산기" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <WebsiteJsonLd />
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
        <ScrollToTop />
        <Script id="sw-register" strategy="afterInteractive">
          {`if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`}
        </Script>
      </body>
    </html>
  );
}
