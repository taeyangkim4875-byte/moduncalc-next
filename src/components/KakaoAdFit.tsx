'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function KakaoAdFit() {
  const pcRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');

  useEffect(() => {
    if (isEn) return;

    // PC 광고 (728x90)
    if (pcRef.current && !pcRef.current.querySelector('ins.kakao_ad_area')) {
      const ins = document.createElement('ins');
      ins.className = 'kakao_ad_area';
      ins.style.display = 'none';
      ins.setAttribute('data-ad-unit', 'DAN-EAtJLC31kDhyGxRU');
      ins.setAttribute('data-ad-width', '728');
      ins.setAttribute('data-ad-height', '90');
      pcRef.current.appendChild(ins);

      const script = document.createElement('script');
      script.src = '//t1.kakaocdn.net/kas/static/ba.min.js';
      script.async = true;
      pcRef.current.appendChild(script);
    }

    // 모바일 광고 (320x100)
    if (mobileRef.current && !mobileRef.current.querySelector('ins.kakao_ad_area')) {
      const ins = document.createElement('ins');
      ins.className = 'kakao_ad_area';
      ins.style.display = 'none';
      ins.setAttribute('data-ad-unit', 'DAN-n0I9aajSdMbc3qAt');
      ins.setAttribute('data-ad-width', '320');
      ins.setAttribute('data-ad-height', '100');
      mobileRef.current.appendChild(ins);

      const script = document.createElement('script');
      script.src = '//t1.kakaocdn.net/kas/static/ba.min.js';
      script.async = true;
      mobileRef.current.appendChild(script);
    }
  }, [isEn, pathname]);

  if (isEn) return null;

  return (
    <>
      <div ref={pcRef} className="hidden md:flex justify-center my-4" />
      <div ref={mobileRef} className="flex md:hidden justify-center my-4" />
    </>
  );
}
