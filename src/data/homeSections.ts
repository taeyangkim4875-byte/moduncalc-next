/**
 * 홈 화면 구성.
 *
 * 예전에는 홈에서 계산기 83개를 전부 나열했다. 첫 화면이 링크 벽이 되어
 * 무엇부터 봐야 할지 알 수 없었고, 분야별 허브 페이지는 사이드바에서만
 * 닿을 수 있어 신호가 약했다.
 *
 * 지금은 홈에서 "많이 쓰는 것 6개 + 분야 진입 9개 + 최근 추가 3개"만 보여주고,
 * 전체 목록은 각 허브가 맡는다. 홈 링크가 83개에서 20개 아래로 줄고,
 * 허브로 가는 경로가 생긴다.
 */

export interface HomeSection {
  href: string;
  icon: string;
  label: string;
  desc: string;
}

/** 분야별 진입점. 허브가 있는 분야는 허브로, 없는 분야는 대표 계산기로 보낸다. */
export const SECTIONS: readonly HomeSection[] = [
  { href: '/salary', icon: '💰', label: '연봉·급여', desc: '실수령액·퇴직금·주휴수당' },
  { href: '/savings', icon: '🏦', label: '적금·예금', desc: '청년도약계좌·만기 이자' },
  { href: '/loan', icon: '🏠', label: '대출·이자', desc: '상환방식·DSR·할부' },
  { href: '/realestate', icon: '🏢', label: '부동산', desc: '취득세·복비·이사 정산' },
  { href: '/tax', icon: '🧾', label: '세금', desc: '부가세·종소세·증여세' },
  { href: '/pension', icon: '👵', label: '연금·보험', desc: '국민연금·실업급여·4대보험' },
  { href: '/health', icon: '💪', label: '건강', desc: 'BMI·기초대사량·칼로리' },
  { href: '/daily', icon: '🗂️', label: '일상', desc: '전기요금·글자수·D-day' },
  { href: '/guide', icon: '📖', label: '가이드', desc: '제도를 제대로 이해하기' },
];

export interface RecentItem extends HomeSection {}

/**
 * 최근 추가한 계산기.
 * 새로 만들 때 맨 앞에 넣고 3개만 유지한다.
 */
export const RECENTLY_ADDED: readonly RecentItem[] = [
  { href: '/daily/gift-money', icon: '💌', label: '축의금 계산기', desc: '관계와 식대로 적정 범위 판단' },
  { href: '/realestate/move-out', icon: '📦', label: '이사 정산 계산기', desc: '보증금·장기수선충당금 정산' },
  { href: '/salary/holiday-pay', icon: '📅', label: '주휴수당 계산기', desc: '받을 수 있는지 조건부터 확인' },
];
