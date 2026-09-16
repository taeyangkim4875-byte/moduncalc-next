'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

/**
 * 애드센스 스크립트는 "실질적인 콘텐츠가 있는 페이지"에만 싣습니다.
 *
 * Google 게시자 정책의 Valuable Inventory(가치 있는 인벤토리) 항목은
 * 콘텐츠가 없거나 부족한 페이지에 광고를 게재하는 것을 금지합니다.
 *
 * 규칙은 하나입니다: **noindex 인 페이지에는 광고를 싣지 않는다.**
 * 색인할 가치가 없다고 스스로 선언한 페이지에 광고만 싣는 상태를 만들지 않기 위함입니다.
 * 아래 목록은 src/app 의 metadata.robots 설정과 1:1로 대응합니다.
 *
 * - /history, /map   : 사용자 개인 기록·내부 탐색용 화면 (본문 거의 없음)
 * - /daily/adsense   : noindex 로 운영 중인 계산기
 * - /embed/*         : 외부 사이트 iframe 삽입용 위젯
 * - /en/*            : noindex 인 영문 계산기 (색인 대상인 /en/guide/* 는 제외)
 */
const AD_FREE_EXACT = new Set(['/history', '/map', '/daily/adsense']);

function isAdFree(pathname: string): boolean {
  if (AD_FREE_EXACT.has(pathname)) return true;
  if (pathname.startsWith('/embed')) return true;
  // 영문 가이드 본문은 색인 대상이므로 광고 게재, 나머지 /en 계산기는 제외
  if (pathname.startsWith('/en/guide')) return false;
  if (pathname === '/en' || pathname.startsWith('/en/')) return true;
  return false;
}

export default function AdsenseScript() {
  const pathname = usePathname();
  if (isAdFree(pathname ?? '')) return null;

  return (
    <Script
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3741035032582828"
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
