import type { Metadata } from 'next';

/**
 * 영문 가이드(/en/guide/*)는 색인 대상입니다.
 * 상위 /en 레이아웃의 noindex 설정을 여기서 덮어씁니다.
 */
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
};

export default function EnGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
