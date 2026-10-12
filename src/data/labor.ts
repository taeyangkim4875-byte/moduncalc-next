/**
 * 노동 관계 법정 기준값 (연도별).
 *
 * 계산 로직에 숫자를 직접 적지 말고 반드시 이 파일의 값을 쓸 것.
 * 값이 바뀌면 이 파일과 src/data/changelog.ts 를 함께 수정하고,
 * npm run check:rates 로 본문에 남은 과거 수치가 없는지 확인한다.
 *
 * 최종 확인 2026-10-12
 */

import { MINIMUM_WAGE_HOURLY, MINIMUM_WAGE_HOURLY_NEXT, MINIMUM_WAGE_HOURLY_PREV } from './constants';

/* ── 월 환산 기준 ─────────────────────────────────────── */
/**
 * 1개월 평균 주수 = 365일 ÷ 7일 ÷ 12개월 = 4.345238...
 * 실무에서 흔히 쓰는 "4.345주"가 이 값의 반올림이다.
 * 주 40시간 + 주휴 8시간 = 48시간에 이 값을 곱하면 월 소정근로시간 209시간이 나온다.
 */
export const WEEKS_PER_MONTH = 365 / 7 / 12;

/** 월 소정근로시간 209시간 (주 40시간 통상근로자 기준) */
export const MONTHLY_WORK_HOURS_FULLTIME = Math.round((40 + 8) * WEEKS_PER_MONTH);

/* ── 주휴수당 ─────────────────────────────────────────── */
/**
 * 주휴수당 지급 요건: 1주 소정근로시간 15시간 이상
 * 근로기준법 제18조 제3항 (초단시간 근로자 적용 제외), 제55조 (휴일)
 */
export const WEEKLY_HOLIDAY_MIN_HOURS = 15;

/**
 * 주휴시간 상한 8시간.
 * 소정근로시간은 1일 8시간·1주 40시간을 초과할 수 없으므로(근로기준법 제50조)
 * 주휴시간도 8시간을 넘을 수 없다. 주 40시간을 초과해 일해도 초과분은
 * 연장근로이지 소정근로가 아니라서 주휴시간을 늘리지 않는다.
 */
export const WEEKLY_HOLIDAY_MAX_HOURS = 8;

/** 통상근로자의 1주 소정근로시간 (주휴시간 비례 계산의 분모) */
export const FULLTIME_WEEKLY_HOURS = 40;

/* ── 최저임금 (고용노동부 고시) ───────────────────────── */
/**
 * 연도별 시간급 최저임금.
 * 다음 해 금액은 매년 7월 최저임금위원회 의결 → 8월 5일까지 고용노동부 고시.
 *
 * TODO: 2028년 최저임금은 2027년 7월경 의결 예정. 고시 확인 후 추가할 것.
 *       확정 전까지 추정치를 넣지 말 것.
 */
export const MINIMUM_WAGE_BY_YEAR: Readonly<Record<number, number>> = {
  2025: MINIMUM_WAGE_HOURLY_PREV, // 10,030원
  2026: MINIMUM_WAGE_HOURLY, //      10,320원 (전년 대비 +2.9%)
  2027: MINIMUM_WAGE_HOURLY_NEXT, // 10,700원 (2026.7.14 의결, 2027.1.1 시행)
};

/** 최저임금이 고시된 연도 목록 (오름차순) */
export const MINIMUM_WAGE_YEARS: readonly number[] = Object.keys(MINIMUM_WAGE_BY_YEAR)
  .map(Number)
  .sort((a, b) => a - b);

export const LATEST_MINIMUM_WAGE_YEAR = MINIMUM_WAGE_YEARS[MINIMUM_WAGE_YEARS.length - 1];

/** 해당 연도 최저시급. 고시되지 않은 연도는 가장 가까운 확정 연도 값을 쓴다. */
export function minimumWageOf(year: number): number {
  if (MINIMUM_WAGE_BY_YEAR[year] !== undefined) return MINIMUM_WAGE_BY_YEAR[year];
  const first = MINIMUM_WAGE_YEARS[0];
  if (year < first) return MINIMUM_WAGE_BY_YEAR[first];
  return MINIMUM_WAGE_BY_YEAR[LATEST_MINIMUM_WAGE_YEAR];
}

/* ── 수습 감액 ────────────────────────────────────────── */
/**
 * 1년 이상 근로계약 체결 시 수습 3개월 이내에 한해 최저임금의 90%까지 감액 가능.
 * 단순노무업무 종사자(고용노동부 고시 직종)는 수습이라도 감액 불가.
 * 최저임금법 제5조 제2항, 같은 법 시행령 제3조
 */
export const PROBATION_WAGE_RATIO = 0.9;
export const PROBATION_MAX_MONTHS = 3;

/* ── 5인 미만 사업장 적용 제외 ────────────────────────── */
/**
 * 근로기준법 제11조 제1항 — 상시 5명 이상 사업장에만 법 전부 적용.
 * 같은 법 시행령 제7조 [별표 1]이 5인 미만에 적용할 조항을 따로 정한다.
 *
 * 주휴수당(제55조)은 5인 미만에도 적용된다는 점이 중요하다.
 * 사업장 규모를 이유로 주휴수당을 거절할 수 없다.
 */
export const SMALL_WORKPLACE_THRESHOLD = 5;

/** 5인 미만 사업장에도 적용되는 것 */
export const SMALL_WORKPLACE_APPLIES: readonly string[] = [
  '최저임금',
  '주휴수당',
  '퇴직금',
  '휴게시간',
  '4대보험',
  '근로계약서 교부',
  '임금명세서 교부',
  '해고예고',
];

/** 5인 미만 사업장에 적용되지 않는 것 */
export const SMALL_WORKPLACE_EXEMPT: readonly string[] = [
  '연장·야간·휴일 가산수당(50%)',
  '연차유급휴가',
  '주 52시간 상한',
  '부당해고 구제신청',
];
