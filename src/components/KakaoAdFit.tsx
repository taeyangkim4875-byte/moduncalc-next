'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function KakaoAdFit() {
  const adRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');

  useEffect(() => {
    if (isEn) return;
    if (!adRef.current) return;

    // 이미 광고가 로드됐으면 스킵
    if (adRef.current.querySelector('ins.kakao_ad_area')) return;

    const ins = document.createElement('ins');
    ins.className = 'kakao_ad_area';
    ins.style.display = 'none';
    ins.setAttribute('data-ad-unit', 'DAN-EAtJLC31kDhyGxRU');
    ins.setAttribute('data-ad-width', '728');
    ins.setAttribute('data-ad-height', '90');
    adRef.current.appendChild(ins);

    const script = document.createElement('script');
    script.src = '//t1.kakaocdn.net/kas/static/ba.min.js';
    script.async = true;
    adRef.current.appendChild(script);
  }, [isEn, pathname]);

  if (isEn) return null;

  return (
    <div ref={adRef} className="flex justify-center my-4" />
  );
}
