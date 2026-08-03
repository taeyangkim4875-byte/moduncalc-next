'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function AdSlot({ adUnit, width, height, id }: { adUnit: string; width: string; height: string; id: string }) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;
    if (adRef.current.childNodes.length > 0) return;

    const ins = document.createElement('ins');
    ins.className = 'kakao_ad_area';
    ins.style.display = 'none';
    ins.setAttribute('data-ad-unit', adUnit);
    ins.setAttribute('data-ad-width', width);
    ins.setAttribute('data-ad-height', height);
    adRef.current.appendChild(ins);

    const script = document.createElement('script');
    script.src = '//t1.kakaocdn.net/kas/static/ba.min.js';
    script.async = true;
    adRef.current.appendChild(script);
  }, [adUnit, width, height]);

  return <div ref={adRef} id={id} />;
}

export function KakaoAdTop() {
  const pathname = usePathname();
  if (pathname.startsWith('/en')) return null;

  return (
    <>
      <div className="hidden md:flex justify-center my-4">
        <AdSlot adUnit="DAN-EAtJLC31kDhyGxRU" width="728" height="90" id="ad-top-pc" />
      </div>
      <div className="flex md:hidden justify-center my-4">
        <AdSlot adUnit="DAN-n0I9aajSdMbc3qAt" width="320" height="100" id="ad-top-mobile" />
      </div>
    </>
  );
}

export function KakaoAdBottom() {
  const pathname = usePathname();
  if (pathname.startsWith('/en')) return null;

  return (
    <>
      <div className="hidden md:flex justify-center my-4">
        <AdSlot adUnit="DAN-EAtJLC31kDhyGxRU" width="728" height="90" id="ad-bottom-pc" />
      </div>
      <div className="flex md:hidden justify-center my-4">
        <AdSlot adUnit="DAN-n0I9aajSdMbc3qAt" width="320" height="100" id="ad-bottom-mobile" />
      </div>
    </>
  );
}

// 기본 export 유지 (호환성)
export default function KakaoAdFit() {
  return <KakaoAdTop />;
}
