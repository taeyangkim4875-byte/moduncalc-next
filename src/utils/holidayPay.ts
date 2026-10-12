/**
 * 주휴수당 계산 (UI 비의존 순수 함수).
 *
 * 알바 월급 계산기·급여명세서 생성기에서 그대로 재사용할 수 있도록
 * React 나 DOM 에 의존하지 않는다.
 *
 * 근거
 * - 근로기준법 제55조        주휴일(1주 평균 1회 이상 유급휴일)
 * - 근로기준법 제18조 제3항  1주 소정근로시간 15시간 미만은 주휴 적용 제외
 * - 근로기준법 제50조        소정근로시간 1일 8시간·1주 40시간 상한
 * - 최저임금법 제5조         최저임금 미달 여부 판단
 */

import {
  WEEKS_PER_MONTH,
  WEEKLY_HOLIDAY_MIN_HOURS,
  WEEKLY_HOLIDAY_MAX_HOURS,
  FULLTIME_WEEKLY_HOURS,
  minimumWageOf,
} from '@/data/labor';

/** 미지급 사유 코드. UI 문구와 분리해 두어 다른 화면에서도 재사용한다. */
export type IneligibleReason = 'under-15-hours' | 'absence' | 'no-hours';

export interface HolidayPayInput {
  /** 시급(원) */
  hourlyWage: number;
  /** 1주 소정근로시간 */
  weeklyHours: number;
  /** 해당 주 소정근로일 개근 여부 */
  isFullAttendance: boolean;
  /** 최저임금 비교 기준 연도 */
  year: number;
}

export interface HolidayPayResult {
  /** 적용된 시급 (입력값 정규화) */
  hourlyWage: number;
  /** 지급 대상 여부 */
  eligible: boolean;
  /** 미지급 사유 (지급 대상이면 null) */
  reason: IneligibleReason | null;
  /** 1주 소정근로시간 (입력값 정규화) */
  weeklyHours: number;
  /** 주휴시간 (최대 8시간) */
  holidayHours: number;
  /** 주휴수당 (주) */
  weeklyPay: number;
  /** 주휴수당 월 환산 */
  monthlyPay: number;
  /** 주휴수당 제외 기본 임금 (주) */
  weeklyBasePay: number;
  /** 기본 임금 월 환산 */
  monthlyBasePay: number;
  /** 주휴수당 포함 월 급여 */
  monthlyTotalPay: number;
  /** 주휴수당까지 반영한 실질 시급 */
  effectiveHourlyWage: number;
  /** 주휴시간이 8시간 상한에 걸렸는지 */
  cappedByMaxHours: boolean;
  /** 적용된 최저시급 */
  minimumWage: number;
  /** 시급이 최저임금 미만인지 */
  belowMinimumWage: boolean;
}

/** 음수·NaN 을 0 으로 정규화 */
function clean(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/**
 * 주휴시간 = (1주 소정근로시간 ÷ 40) × 8, 최대 8시간.
 *
 * 주 40시간을 넘겨 일해도 초과분은 연장근로라 소정근로시간에 들어가지 않으므로
 * 주휴시간은 8시간에서 멈춘다. 상한을 두지 않으면 주 48시간 입력 시
 * 9.6시간이 나와 과다 계산된다.
 */
export function calcHolidayHours(weeklyHours: number): number {
  const hours = (clean(weeklyHours) / FULLTIME_WEEKLY_HOURS) * WEEKLY_HOLIDAY_MAX_HOURS;
  return Math.min(hours, WEEKLY_HOLIDAY_MAX_HOURS);
}

export function calcWeeklyHolidayPay(input: HolidayPayInput): HolidayPayResult {
  const hourlyWage = clean(input.hourlyWage);
  const weeklyHours = clean(input.weeklyHours);
  const minimumWage = minimumWageOf(input.year);

  let reason: IneligibleReason | null = null;
  if (weeklyHours <= 0) reason = 'no-hours';
  else if (weeklyHours < WEEKLY_HOLIDAY_MIN_HOURS) reason = 'under-15-hours';
  else if (!input.isFullAttendance) reason = 'absence';

  const eligible = reason === null;

  const holidayHours = eligible ? calcHolidayHours(weeklyHours) : 0;
  const weeklyPay = holidayHours * hourlyWage;
  const monthlyPay = weeklyPay * WEEKS_PER_MONTH;

  const weeklyBasePay = weeklyHours * hourlyWage;
  const monthlyBasePay = weeklyBasePay * WEEKS_PER_MONTH;
  const monthlyTotalPay = monthlyBasePay + monthlyPay;

  // 실제 일한 시간 대비 받는 금액. 주휴수당이 없으면 시급과 같다.
  const effectiveHourlyWage = weeklyHours > 0 ? (weeklyBasePay + weeklyPay) / weeklyHours : 0;

  return {
    hourlyWage,
    eligible,
    reason,
    weeklyHours,
    holidayHours,
    weeklyPay,
    monthlyPay,
    weeklyBasePay,
    monthlyBasePay,
    monthlyTotalPay,
    effectiveHourlyWage,
    cappedByMaxHours: eligible && weeklyHours > FULLTIME_WEEKLY_HOURS,
    minimumWage,
    belowMinimumWage: hourlyWage > 0 && hourlyWage < minimumWage,
  };
}
