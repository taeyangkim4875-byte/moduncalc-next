import { describe, it, expect } from 'vitest';
import { calcWeeklyHolidayPay, calcHolidayHours } from '../holidayPay';
import { WEEKS_PER_MONTH, MINIMUM_WAGE_BY_YEAR } from '@/data/labor';

const W2026 = MINIMUM_WAGE_BY_YEAR[2026]; // 10,320원

const base = { hourlyWage: W2026, isFullAttendance: true, year: 2026 };

describe('주휴시간 산정', () => {
  it('주 40시간이면 8시간', () => {
    expect(calcHolidayHours(40)).toBe(8);
  });

  it('주 20시간이면 4시간 (비례)', () => {
    expect(calcHolidayHours(20)).toBe(4);
  });

  it('주 15시간이면 3시간', () => {
    expect(calcHolidayHours(15)).toBe(3);
  });

  it('주 40시간 초과는 8시간에서 멈춘다 (상한)', () => {
    expect(calcHolidayHours(48)).toBe(8);
    expect(calcHolidayHours(60)).toBe(8);
  });
});

describe('지급 대상 판정', () => {
  it('주 15시간 미만은 미지급', () => {
    const r = calcWeeklyHolidayPay({ ...base, weeklyHours: 14 });
    expect(r.eligible).toBe(false);
    expect(r.reason).toBe('under-15-hours');
    expect(r.holidayHours).toBe(0);
    expect(r.weeklyPay).toBe(0);
    expect(r.monthlyPay).toBe(0);
  });

  it('정확히 주 15시간은 지급 대상 (경계값)', () => {
    const r = calcWeeklyHolidayPay({ ...base, weeklyHours: 15 });
    expect(r.eligible).toBe(true);
    expect(r.reason).toBeNull();
    expect(r.holidayHours).toBe(3);
    expect(r.weeklyPay).toBe(3 * W2026); // 30,960원
  });

  it('개근하지 않으면 15시간 이상이어도 미지급', () => {
    const r = calcWeeklyHolidayPay({ ...base, weeklyHours: 40, isFullAttendance: false });
    expect(r.eligible).toBe(false);
    expect(r.reason).toBe('absence');
    expect(r.holidayHours).toBe(0);
    expect(r.weeklyPay).toBe(0);
    // 결근해도 실제 일한 시간에 대한 기본 임금은 그대로 남는다
    expect(r.weeklyBasePay).toBe(40 * W2026);
  });

  it('근무시간 0이면 미지급', () => {
    const r = calcWeeklyHolidayPay({ ...base, weeklyHours: 0 });
    expect(r.eligible).toBe(false);
    expect(r.reason).toBe('no-hours');
    expect(r.effectiveHourlyWage).toBe(0);
  });
});

describe('금액 계산', () => {
  it('주 40시간 최저시급: 주휴수당 82,560원', () => {
    const r = calcWeeklyHolidayPay({ ...base, weeklyHours: 40 });
    expect(r.holidayHours).toBe(8);
    expect(r.weeklyPay).toBe(8 * W2026); // 82,560원
  });

  it('주 40시간 월 환산은 1개월 평균 주수 기준', () => {
    const r = calcWeeklyHolidayPay({ ...base, weeklyHours: 40 });
    // (40 + 8)시간 × 4.345238...주 = 208.571시간
    expect(r.monthlyTotalPay).toBeCloseTo(48 * WEEKS_PER_MONTH * W2026, 6);
    expect(Math.round(r.monthlyTotalPay)).toBe(2152457);
  });

  it('고시 월 환산액(209시간)과의 차이는 반올림에서 온다', () => {
    const r = calcWeeklyHolidayPay({ ...base, weeklyHours: 40 });
    // 고용노동부 고시는 208.571시간을 209시간으로 반올림해 쓴다.
    // 두 값이 다른 것은 정상이며, 차이는 0.43시간분이다.
    const official = 209 * W2026; // 2,156,880원
    const exactHours = 48 * WEEKS_PER_MONTH; // 208.571...
    expect(Math.round(exactHours)).toBe(209);
    expect(official - r.monthlyTotalPay).toBeCloseTo((209 - exactHours) * W2026, 6);
    expect(Math.round(official - r.monthlyTotalPay)).toBe(4423);
  });

  it('주 40시간 실질 시급은 시급의 1.2배', () => {
    const r = calcWeeklyHolidayPay({ ...base, weeklyHours: 40 });
    // 40시간 일하고 48시간분을 받으므로 48/40 = 1.2
    expect(r.effectiveHourlyWage).toBeCloseTo(W2026 * 1.2, 6);
    expect(Math.round(r.effectiveHourlyWage)).toBe(12384);
  });

  it('주 48시간: 주휴시간이 상한에 걸려 9.6시간이 되지 않는다', () => {
    const r = calcWeeklyHolidayPay({ ...base, weeklyHours: 48 });
    expect(r.holidayHours).toBe(8);
    expect(r.cappedByMaxHours).toBe(true);
    // 상한이 없었다면 9.6시간 → 99,072원이 되어 과다 계산된다
    expect(r.weeklyPay).toBe(8 * W2026);
    expect(r.weeklyPay).toBeLessThan(9.6 * W2026);
  });

  it('주 40시간 이하에서는 상한 플래그가 켜지지 않는다', () => {
    expect(calcWeeklyHolidayPay({ ...base, weeklyHours: 40 }).cappedByMaxHours).toBe(false);
    expect(calcWeeklyHolidayPay({ ...base, weeklyHours: 20 }).cappedByMaxHours).toBe(false);
  });

  it('주 20시간 단시간 근로자', () => {
    const r = calcWeeklyHolidayPay({ ...base, weeklyHours: 20 });
    expect(r.holidayHours).toBe(4);
    expect(r.weeklyPay).toBe(4 * W2026); // 41,280원
    expect(r.effectiveHourlyWage).toBeCloseTo(W2026 * 1.2, 6);
  });
});

describe('최저임금 비교', () => {
  it('최저시급 미만이면 경고', () => {
    const r = calcWeeklyHolidayPay({ ...base, hourlyWage: 9500, weeklyHours: 40 });
    expect(r.belowMinimumWage).toBe(true);
    expect(r.minimumWage).toBe(W2026);
  });

  it('최저시급과 같으면 경고하지 않는다 (경계값)', () => {
    const r = calcWeeklyHolidayPay({ ...base, hourlyWage: W2026, weeklyHours: 40 });
    expect(r.belowMinimumWage).toBe(false);
  });

  it('연도를 바꾸면 비교 기준도 바뀐다', () => {
    const r2027 = calcWeeklyHolidayPay({ ...base, hourlyWage: 10500, weeklyHours: 40, year: 2027 });
    expect(r2027.minimumWage).toBe(MINIMUM_WAGE_BY_YEAR[2027]); // 10,700원
    expect(r2027.belowMinimumWage).toBe(true);

    const r2026 = calcWeeklyHolidayPay({ ...base, hourlyWage: 10500, weeklyHours: 40, year: 2026 });
    expect(r2026.belowMinimumWage).toBe(false); // 2026 기준으로는 미달 아님
  });

  it('고시되지 않은 연도는 가장 최근 확정 연도 기준을 쓴다', () => {
    const r = calcWeeklyHolidayPay({ ...base, weeklyHours: 40, year: 2030 });
    expect(r.minimumWage).toBe(MINIMUM_WAGE_BY_YEAR[2027]);
  });
});

describe('입력 정규화', () => {
  it('음수·NaN 은 0 으로 처리한다', () => {
    const r = calcWeeklyHolidayPay({ ...base, hourlyWage: -100, weeklyHours: NaN });
    expect(r.eligible).toBe(false);
    expect(r.weeklyPay).toBe(0);
    expect(r.monthlyTotalPay).toBe(0);
    expect(r.belowMinimumWage).toBe(false); // 시급 0 은 미달 경고 대상이 아니다
  });
});
