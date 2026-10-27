/**
 * 광고를 싣지 않는 페이지.
 *
 * 규칙은 하나입니다: **noindex 인 페이지에는 광고를 싣지 않는다.**
 * 색인할 가치가 없다고 스스로 선언한 페이지에 광고만 싣는 상태를 만들지 않기
 * 위함입니다. Google 게시자 정책의 Valuable Inventory 항목과 같은 취지이고,
 * 애드핏 운영정책의 매체 콘텐츠 심사에도 같은 기준이 적용됩니다.
 *
 * 아래 목록은 src/app 의 metadata.robots 설정과 1:1로 대응합니다.
 *
 * - /history, /map   : 사용자 개인 기록·내부 탐색용 화면 (본문 거의 없음)
 * - /daily/adsense   : noindex 로 운영 중인 계산기
 * - /embed/*         : 외부 사이트 iframe 삽입용 위젯
 * - /en/*            : noindex 인 영문 계산기 (색인 대상인 /en/guide/* 는 제외)
 *
 * AdsenseScript 와 AdFitBanner 가 이 함수를 공유합니다. 한쪽만 고쳐서
 * 두 광고의 게재 범위가 어긋나는 일을 막기 위해 여기로 뺐습니다.
 */
const AD_FREE_EXACT = new Set(['/history', '/map', '/daily/adsense']);

export function isAdFree(pathname: string): boolean {
  if (AD_FREE_EXACT.has(pathname)) return true;
  if (pathname.startsWith('/embed')) return true;
  // 영문 가이드 본문은 색인 대상이므로 광고 게재, 나머지 /en 계산기는 제외
  if (pathname.startsWith('/en/guide')) return false;
  if (pathname === '/en' || pathname.startsWith('/en/')) return true;
  return false;
}
