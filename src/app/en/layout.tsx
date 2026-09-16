import type { Metadata } from "next";
import HtmlLangEn from "./HtmlLangEn";

/**
 * /en 하위는 기본적으로 noindex 입니다.
 * 본문 분량과 고유성이 충분한 /en/guide/* 만 en/guide/layout.tsx 에서 index 로 덮어씁니다.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <HtmlLangEn />
      {children}
    </div>
  );
}
