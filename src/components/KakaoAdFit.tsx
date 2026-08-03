'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function AdUnit({ adUnit, width, height, className }: { adUnit: string; width: string; height: string; className?: string }) {
  const adRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    if (!adRef.current) return;

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

    loaded.current = true;
  }, [adUnit, width, height]);

  return <div ref={adRef} className={className} />;
}

export default function KakaoAdFit() {
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');

  if (isEn) return null;

  return (
    <>
      <div className="hidden md:flex justify-center my-4">
        <AdUnit adUnit="DAN-EAtJLC31kDhyGxRU" width="728" height="90" />
      </div>
      <div className="flex md:hidden justify-center my-4">
        <AdUnit adUnit="DAN-n0I9aajSdMbc3qAt" width="320" height="100" />
      </div>
    </>
  );
}
