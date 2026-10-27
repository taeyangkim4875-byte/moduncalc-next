'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { isAdFree } from '@/utils/ads';

/**
 * 애드센스 스크립트는 "실질적인 콘텐츠가 있는 페이지"에만 싣습니다.
 * 게재 범위 판단은 utils/ads 의 isAdFree 가 갖고 있고, 애드핏 배너도 같은
 * 함수를 씁니다. 근거와 제외 목록은 그쪽 주석에 적어 두었습니다.
 *
 * 참고: 이 계정은 아직 애드센스 승인 전이라 스크립트가 광고를 채우지 않습니다.
 * 승인되면 그대로 동작합니다.
 */
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
