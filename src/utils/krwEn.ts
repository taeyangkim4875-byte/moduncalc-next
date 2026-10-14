/**
 * 영문 페이지에서 쓰는 한국 화폐 단위 표기.
 *
 * 한국 계산기는 금액을 "만원" 단위로 입력받는 관행이 있는데, 영문 독자에게
 * 맨 "만원" 은 아무 정보가 아닙니다. 단위를 항상 원화 금액과 같이 보여줍니다.
 */

/** 만원 입력란 접미사. 단위를 모르는 독자를 위해 ₩10K 를 같이 적습니다. */
export const MAN_SUFFIX_EN = '만원 (₩10K)';
/** 월 단위 만원 입력란 접미사. */
export const MAN_SUFFIX_EN_MONTHLY = '만원 (₩10K) /mo';

/** 원 단위 금액 표기. */
export function won(n: number): string {
  return '₩' + Math.round(n).toLocaleString();
}

/** 만원 단위 값을 원화 금액으로. 예: 5000 → "₩50,000,000" */
export function wonFromMan(man: number): string {
  return won(man * 10000);
}

/**
 * 만원 단위 값을 억원 표기로.
 *
 * 1억원 = 10,000만원 입니다. 예전에 /en/tax-comparison 에서 100 으로 나눠
 * 5,000만원(₩50,000,000)을 "50.0억원"으로 100배 틀리게 적고 있었습니다.
 */
export function eokFromMan(man: number): string {
  const eok = man / 10000;
  const text = eok >= 10 ? eok.toFixed(0) : eok.toFixed(2).replace(/\.?0+$/, '');
  return `${text}억원`;
}
