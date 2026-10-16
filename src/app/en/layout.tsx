import type { Metadata } from "next";
import HtmlLangEn from "./HtmlLangEn";
import { EN_OPEN_GRAPH } from "./sharedMetadata";

/**
 * /en 하위는 기본적으로 noindex 입니다.
 * 본문 분량과 고유성이 충분한 /en/guide/* 만 en/guide/layout.tsx 에서 index 로 덮어씁니다.
 *
 * title.template 은 루트의 "%s | 모든 계산기" 를 영문용으로 갈아끼웁니다.
 * 영문 검색 결과에 한국어 사이트명이 붙는 것을 막기 위함입니다.
 * 주의: template 은 "자식" 세그먼트에만 적용되므로 /en 자체(en/page.tsx)는
 * title.absolute 로 따로 지정합니다.
 *
 * openGraph 는 얕은 병합이라 하위에서 정의하면 통째로 덮어씁니다.
 * 그래서 자체 openGraph 를 쓰는 페이지에는 sharedMetadata 의 EN_OPEN_GRAPH 를 펼쳐 넣습니다.
 */
export const metadata: Metadata = {
  title: {
    template: "%s | Moduncalc",
    default: "Moduncalc - Korea Calculators for Foreigners",
  },
  // url 은 일부러 넣지 않습니다. 여기 넣으면 자체 openGraph 가 없는 하위
  // 페이지 전부가 og:url 로 /en 을 물려받아, 공유 미리보기가 엉뚱한 페이지를
  // 가리킵니다. 없으면 공유한 주소가 그대로 쓰이므로 그게 더 안전합니다.
  openGraph: EN_OPEN_GRAPH,
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
