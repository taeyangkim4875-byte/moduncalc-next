/**
 * 사이트 전역에서 공유하는 법정 요율·기준 금액.
 * 본문에 숫자를 직접 적기 전에 반드시 이 파일의 값과 맞는지 확인할 것.
 *
 * 출처 (최종 확인 2026-10-06) · 변경 이력은 src/data/changelog.ts 와 /changelog 페이지에 기록
 * - 최저임금: 고용노동부 고시 (2026년 10,320원 / 2027년 10,700원)
 * - 국민연금: 국민연금공단 2026년 기준소득월액 상·하한액 조정 안내 (2026.7~2027.6)
 * - 건강보험·장기요양: 국민건강보험공단 2026년 보험료율 고시
 * - 고용보험: 고용보험법 시행령 (근로자 부담 실업급여분)
 */

export const CURRENT_YEAR = 2026;
export const LAST_REVIEWED = '2026.10';
export const LAST_REVIEWED_LABEL = '2026년 10월 6일';

/* ── 4대보험 (근로자 부담분) ───────────────────────────── */
/** 국민연금 근로자 부담 4.75% (총 9.5%, 2026년 0.5%p 인상) */
export const NP_RATE = 0.0475;
/** 국민연금 총 요율 9.5% */
export const NP_RATE_TOTAL = 0.095;
/** 기준소득월액 상한 659만원 (2026.7~2027.6) */
export const NP_CAP_MONTHLY = 6590000;
/** 기준소득월액 하한 41만원 (2026.7~2027.6) */
export const NP_FLOOR_MONTHLY = 410000;
/** 건강보험 근로자 부담 3.595% (총 7.19%) */
export const HI_RATE = 0.03595;
/** 건강보험 총 요율 7.19% */
export const HI_RATE_TOTAL = 0.0719;
/** 장기요양보험 = 건강보험료의 13.14% */
export const LTC_RATIO = 0.1314;
/** 고용보험(실업급여) 근로자 부담 0.9% */
export const EI_RATE = 0.009;

/* ── 최저임금 ─────────────────────────────────────────── */
/** 2026년 최저시급 10,320원 (2025년 10,030원 대비 +290원, 2.9%) */
export const MINIMUM_WAGE_HOURLY = 10320;
/** 2027년 최저시급 10,700원 (2026.7.14 의결, 2027.1.1 시행) */
export const MINIMUM_WAGE_HOURLY_NEXT = 10700;
export const MINIMUM_WAGE_HOURLY_PREV = 10030;
/** 월 209시간 환산 = 2,156,880원 */
export const MINIMUM_WAGE_MONTHLY = MINIMUM_WAGE_HOURLY * 209;
export const MINIMUM_WAGE_MONTHLY_NEXT = MINIMUM_WAGE_HOURLY_NEXT * 209;

/* ── 실업급여(구직급여) ───────────────────────────────── */
/** 1일 상한액 68,100원 (2026년) */
export const JOBLESS_UPPER_DAILY = 68100;
/** 1일 하한액 = 최저시급 × 8시간 × 80% = 66,048원 */
export const JOBLESS_LOWER_DAILY = Math.round(MINIMUM_WAGE_HOURLY * 8 * 0.8);
export const JOBLESS_RATE = 0.6;

/* ── 국민연금 예상수령액 산식 ─────────────────────────── */
export const NPS_CONST = 1.29;
/** A값(전체 가입자 평균소득월액 3년 평균) */
export const NPS_A_VALUE = 3193511;
export const NPS_INCOME_CAP = NP_CAP_MONTHLY;
export const NPS_INCOME_FLOOR = NP_FLOOR_MONTHLY;

/* ── 취득세 ───────────────────────────────────────────── */
export const ACQTAX_RATE_1H_LOW = 0.01;
export const ACQTAX_RATE_1H_HIGH = 0.03;
export const ACQTAX_RATE_2H = 0.08;
export const ACQTAX_RATE_3H = 0.12;
