import { describe, it, expect } from 'vitest';
import { netPay, progressiveTax, earnedIncomeDeduction, earnedTaxCredit } from '../tax';
import { bisect, secantWithFallback } from '../solver';

describe('tax regression', () => {
  it('netPay 3000만원 1인 비과세X', () => {
    const r = netPay(3000, 1, false);
    expect(r.netMonth).toBeCloseTo(2211063, -1);
    expect(r.insurance).toBeGreaterThan(0);
    expect(r.incomeTax).toBeGreaterThanOrEqual(0);
  });

  it('netPay 5000만원 3인 비과세O', () => {
    const r = netPay(5000, 3, true);
    expect(r.netYear).toBeGreaterThan(40000000);
    expect(r.netYear).toBeLessThan(50000000);
    expect(r.np).toBeGreaterThan(0);
  });

  it('netPay 1억 1인 비과세X', () => {
    const r = netPay(10000, 1, false);
    expect(r.netYear).toBeGreaterThan(70000000);
    expect(r.netYear).toBeLessThan(90000000);
    expect(r.incomeTax).toBeGreaterThan(5000000);
  });

  it('progressiveTax brackets', () => {
    expect(progressiveTax(0)).toBe(0);
    expect(progressiveTax(14000000)).toBe(840000);
    expect(progressiveTax(50000000)).toBe(6240000);
    expect(progressiveTax(88000000)).toBe(15360000);
  });

  it('earnedIncomeDeduction ranges', () => {
    expect(earnedIncomeDeduction(5000000)).toBe(3500000);
    expect(earnedIncomeDeduction(15000000)).toBe(7500000);
    expect(earnedIncomeDeduction(45000000)).toBe(12000000);
  });

  it('earnedTaxCredit caps', () => {
    expect(earnedTaxCredit(1000000, 30000000)).toBe(550000);
    expect(earnedTaxCredit(2000000, 50000000)).toBeLessThanOrEqual(740000);
  });
});

describe('solver regression', () => {
  it('bisect finds sqrt(2)', () => {
    const r = bisect(x => x * x - 2, 1, 2);
    expect(r.converged).toBe(true);
    expect(r.value).toBeCloseTo(Math.SQRT2, 5);
  });

  it('bisect returns NaN when no sign change', () => {
    const r = bisect(x => x * x + 1, 0, 10);
    expect(r.converged).toBe(false);
    expect(r.value).toBeNaN();
  });

  it('secantWithFallback converges', () => {
    const r = secantWithFallback(x => x * x - 9, 1, 5, 0, 10);
    expect(r.converged).toBe(true);
    expect(r.value).toBeCloseTo(3, 4);
  });
});

describe('loan calculation regression', () => {
  it('equal payment loan 3억 3.5% 30년', () => {
    const P = 30000 * 10000;
    const r = 3.5 / 100 / 12;
    const n = 30 * 12;
    const eqM = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    expect(Math.round(eqM)).toBe(1347134);
  });

  it('equal payment loan 5억 4% 25년', () => {
    const P = 50000 * 10000;
    const r = 4.0 / 100 / 12;
    const n = 25 * 12;
    const eqM = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    expect(eqM).toBeGreaterThan(2600000);
    expect(eqM).toBeLessThan(2700000);
  });
});

describe('BMI calculation regression', () => {
  it('170cm 70kg BMI', () => {
    const bmi = 70 / ((170 / 100) ** 2);
    expect(bmi).toBeCloseTo(24.22, 1);
  });

  it('160cm 50kg BMI', () => {
    const bmi = 50 / ((160 / 100) ** 2);
    expect(bmi).toBeCloseTo(19.53, 1);
  });
});

describe('pension NPS regression', () => {
  it('300만원 소득 30년 가입', () => {
    const NPS_CONST = 1.29, NPS_A = 3193511, NPS_CAP = 6370000, NPS_FLOOR = 400000;
    const income = 300;
    const years = 30;
    const B = Math.min(Math.max(income * 10000, NPS_FLOOR), NPS_CAP);
    const n = Math.max(0, (years - 20)) * 12;
    const baseRatio = Math.min(years, 20) / 20;
    const basicYear = NPS_CONST * (NPS_A + B) * baseRatio * (1 + 0.05 * n / 12);
    const monthly = basicYear / 12;
    expect(monthly).toBeGreaterThan(900000);
    expect(monthly).toBeLessThan(1100000);
  });
});

describe('acqtax regression', () => {
  it('1주택 5억 85㎡ 이하', () => {
    const price = 50000;
    const priceWon = price * 10000;
    const rate = 0.01;
    const acqTax = Math.round(priceWon * rate);
    const nongTax = 0;
    const eduTax = Math.round(acqTax * 0.1);
    expect(acqTax).toBe(5000000);
    expect(nongTax).toBe(0);
    expect(eduTax).toBe(500000);
    expect(acqTax + nongTax + eduTax).toBe(5500000);
  });

  it('2주택 8% 적용', () => {
    const priceWon = 50000 * 10000;
    const rate = 0.08;
    expect(Math.round(priceWon * rate)).toBe(40000000);
  });
});
