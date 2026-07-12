/**
 * Korea Foreigner Flat Tax vs Progressive Tax Comparator
 *
 * Legal basis:
 * - Flat tax: 조세특례제한법 제18조의2 (Special Taxation for Foreign Workers)
 *   19% flat income tax + 1.9% local tax = 20.9% total
 *   Available for up to 20 years from first working day in Korea
 *   Must elect annually during year-end settlement
 *   NO deductions/credits allowed under flat tax
 *
 * - Progressive tax: 소득세법 제55조 (8 brackets, 6%~45%)
 *   + local income tax 10% of income tax
 *   Deductions (earned income deduction, personal exemption, tax credit) apply
 *
 * - 4대보험 rates (2026):
 *   National Pension 4.75% (cap: ₩6,370,000/month)
 *   Health Insurance 3.595%
 *   Long-term Care 13.14% of health insurance
 *   Employment Insurance 0.9%
 *   Source: 국민연금공단, 건강보험공단 2026년 고시
 */

import {
  NP_RATE, NP_CAP, HI_RATE, LTC_RATE, EI_RATE,
  progressiveTax, earnedIncomeDeduction, earnedTaxCredit,
} from './tax';

// Flat tax rate for foreign workers
export const FLAT_INCOME_RATE = 0.19;
export const FLAT_LOCAL_RATE = 0.019; // 10% of income tax
export const FLAT_TOTAL_RATE = FLAT_INCOME_RATE + FLAT_LOCAL_RATE; // 20.9%

export interface TaxBreakdown {
  grossAnnual: number;
  // Social insurance (same for both methods)
  nationalPension: number;
  healthInsurance: number;    // includes long-term care
  employmentInsurance: number;
  totalInsurance: number;
  // Tax
  incomeTax: number;
  localTax: number;
  totalTax: number;
  // Totals
  totalDeductions: number;
  netAnnual: number;
  netMonthly: number;
  effectiveRate: number;      // total tax / gross %
}

export interface ComparisonResult {
  flat: TaxBreakdown;
  progressive: TaxBreakdown;
  savings: number;            // positive = flat is cheaper
  recommendation: 'flat' | 'progressive';
  breakEvenSalary: number;    // approximate break-even gross salary (만원)
}

function calcInsurance(grossAnnual: number): {
  np: number; hi: number; ei: number; total: number;
} {
  const monthly = grossAnnual / 12;
  const npBase = Math.min(monthly, NP_CAP);
  const np = npBase * NP_RATE * 12;
  const hi = monthly * HI_RATE * 12;
  const ltc = hi * LTC_RATE;
  const ei = monthly * EI_RATE * 12;
  return { np, hi: hi + ltc, ei, total: np + hi + ltc + ei };
}

/**
 * Calculate flat tax (19% + 1.9% local)
 * Under flat tax: NO earned income deduction, NO personal exemption, NO tax credit
 * Tax base = gross income (4대보험 is NOT deductible under flat tax)
 */
export function calculateFlatTax(grossMan: number): TaxBreakdown {
  const gross = grossMan * 10000;
  const ins = calcInsurance(gross);

  // Flat tax applies to total gross salary (no deductions)
  const incomeTax = gross * FLAT_INCOME_RATE;
  const localTax = gross * FLAT_LOCAL_RATE;
  const totalTax = incomeTax + localTax;

  const totalDeductions = ins.total + totalTax;
  const netAnnual = gross - totalDeductions;

  return {
    grossAnnual: gross,
    nationalPension: ins.np,
    healthInsurance: ins.hi,
    employmentInsurance: ins.ei,
    totalInsurance: ins.total,
    incomeTax,
    localTax,
    totalTax,
    totalDeductions,
    netAnnual,
    netMonthly: netAnnual / 12,
    effectiveRate: (totalTax / gross) * 100,
  };
}

/**
 * Calculate progressive tax (standard Korean income tax)
 * Applies: earned income deduction, personal exemption, 4대보험 deduction, tax credit
 */
export function calculateProgressiveTax(
  grossMan: number,
  dependents: number = 1,
  useNontax: boolean = false,
): TaxBreakdown {
  const gross = grossMan * 10000;
  const nontaxYear = useNontax ? 200000 * 12 : 0;
  const taxableGross = Math.max(0, gross - nontaxYear);

  const ins = calcInsurance(taxableGross);

  const ded = earnedIncomeDeduction(taxableGross);
  const earnedIncome = Math.max(0, taxableGross - ded);
  const personal = dependents * 1500000;
  const base = Math.max(0, earnedIncome - personal - ins.np - ins.hi - ins.ei);
  const calcTax = progressiveTax(base);
  const credit = earnedTaxCredit(calcTax, taxableGross);
  const incomeTax = Math.max(0, calcTax - credit);
  const localTax = incomeTax * 0.10;
  const totalTax = incomeTax + localTax;

  const totalDeductions = ins.total + totalTax;
  const netAnnual = gross - totalDeductions;

  return {
    grossAnnual: gross,
    nationalPension: ins.np,
    healthInsurance: ins.hi,
    employmentInsurance: ins.ei,
    totalInsurance: ins.total,
    incomeTax,
    localTax,
    totalTax,
    totalDeductions,
    netAnnual,
    netMonthly: netAnnual / 12,
    effectiveRate: (totalTax / gross) * 100,
  };
}

/**
 * Find approximate break-even salary where flat = progressive
 * Uses binary search (만원 unit)
 */
export function findBreakEven(dependents: number = 1): number {
  // At low salaries progressive is cheaper; at high salaries flat is cheaper.
  // Find the crossover point using binary search.
  let lo = 5000;  // 5000만원 (progressive always wins here)
  let hi = 50000; // 5억원 (flat always wins here)
  for (let i = 0; i < 50; i++) {
    const mid = Math.floor((lo + hi) / 2);
    const flat = calculateFlatTax(mid);
    const prog = calculateProgressiveTax(mid, dependents, false);
    if (prog.totalTax > flat.totalTax) {
      // flat is cheaper at mid → break-even is lower
      hi = mid;
    } else {
      // progressive is cheaper at mid → break-even is higher
      lo = mid + 1;
    }
  }
  return lo;
}

/**
 * Compare flat vs progressive and return recommendation
 */
export function compareTax(
  grossMan: number,
  dependents: number = 1,
  useNontax: boolean = false,
): ComparisonResult {
  const flat = calculateFlatTax(grossMan);
  const progressive = calculateProgressiveTax(grossMan, dependents, useNontax);
  const savings = progressive.totalTax - flat.totalTax; // positive = flat saves money
  const breakEvenSalary = findBreakEven(dependents);

  return {
    flat,
    progressive,
    savings,
    recommendation: savings > 0 ? 'flat' : 'progressive',
    breakEvenSalary,
  };
}
