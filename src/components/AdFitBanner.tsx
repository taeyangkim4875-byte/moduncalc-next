'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { isAdFree } from '@/utils/ads';

/**
 * 카카오 애드핏 배너.
 *
 * 승인된 단위 세 개 중 두 개만 씁니다.
 *   top    320x100  상단, 제목 아래
 *   middle 300x250  본문 끝, 관련 계산기 위
 * 728x90 은 쓰지 않습니다. PageLayout 이 max-w-[560px] + px-4 라 실제 콘텐츠
 * 폭이 528px 이어서 넘칩니다.
 *
 * 구조 주의:
 * 애드핏 스크립트는 로드 시점에 document 의 .kakao_ad_area 를 훑어 채웁니다.
 * 그래서 ins 는 각 자리에서 JSX 로 그리고, 스크립트는 AdFitLoader 가 페이지당
 * 한 번만 붙입니다. 광고 단위마다 스크립트를 붙이면 두 번 로드되어 같은 영역을
 * 중복으로 스캔합니다. AdFitLoader 는 PageLayout 의 마지막에 두어, 형제
 * 컴포넌트의 effect 가 모두 끝난 뒤(= ins 가 DOM 에 올라간 뒤) 실행되게 합니다.
 */
const SLOTS = {
  top: { unit: 'DAN-n0I9aajSdMbc3qAt', width: 320, height: 100 },
  middle: { unit: 'DAN-lh4uMpaDtGapuuFs', width: 300, height: 250 },
} as const;

const AD_SCRIPT = 'https://t1.kakaocdn.net/kas/static/ba.min.js';

export default function AdFitBanner({ slot }: { slot: keyof typeof SLOTS }) {
  const pathname = usePathname();
  if (isAdFree(pathname ?? '')) return null;

  const { unit, width, height } = SLOTS[slot];

  // 자리를 미리 잡아두지 않습니다(minHeight 없음).
  // 관리화면에 대체 광고를 걸어두면 미판매 노출도 채워지지만, 광고 차단 확장이
  // 켜져 있거나 요청 자체가 실패하면 대체 광고도 오지 않습니다. 그때 ins 가
  // display:none 으로 남아 빈 자리만 보이는 쪽이 광고가 뜰 때 본문이 한 번
  // 밀리는 것보다 나쁩니다. 그래서 채워진 만큼만 공간을 차지하게 둡니다.
  return (
    <div className="flex items-center justify-center my-4 overflow-hidden">
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit={unit}
        data-ad-width={String(width)}
        data-ad-height={String(height)}
      />
    </div>
  );
}

/** 애드핏 스크립트를 페이지당 한 번 붙인다. 경로가 바뀌면 다시 붙여 새 ins 를 훑게 한다. */
export function AdFitLoader() {
  const pathname = usePathname();
  const adFree = isAdFree(pathname ?? '');

  useEffect(() => {
    if (adFree) return;

    const script = document.createElement('script');
    script.src = AD_SCRIPT;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [adFree, pathname]);

  return null;
}
