// 2026년 4대보험 요율 (근로자 부담분)
export const NP_RATE = 0.0475;       // 국민연금 4.75%
export const NP_CAP = 6370000;       // 기준소득월액 상한
export const HI_RATE = 0.03595;      // 건강보험 3.595%
export const LTC_RATE = 0.1314;      // 장기요양 = 건강보험료의 13.14%
export const EI_RATE = 0.009;        // 고용보험 0.9%

export interface NetPayResult {
  netYear: number;
  netMonth: number;
  insurance: number;
  incomeTax: number;
  localTax: number;
  np: number;
  hi: number;
  ei: number;
  deductMonth: number;
}

export function netPay(grossMan: number, dependents: number, useNontax: boolean): NetPayResult {
  const gross = grossMan * 10000;
  const nontaxYear = useNontax ? 200000 * 12 : 0;
  const taxableGross = Math.max(0, gross - nontaxYear);
  const wageM = taxableGross / 12;

  const npBase = Math.min(wageM, NP_CAP);
  const np = npBase * NP_RATE * 12;
  const hi = wageM * HI_RATE * 12;
  const ltc = hi * LTC_RATE;
  const ei = wageM * EI_RATE * 12;
  const insurance = np + hi + ltc + ei;

  const ded = earnedIncomeDeduction(taxableGross);
  const earnedIncome = Math.max(0, taxableGross - ded);
  const personal = dependents * 1500000;
  const base = Math.max(0, earnedIncome - personal - np - hi - ltc - ei);
  const calcTax = progressiveTax(base);
  const credit = earnedTaxCredit(calcTax, taxableGross);
  const incomeTax = Math.max(0, calcTax - credit);
  const localTax = incomeTax * 0.10;

  const totalDeduct = insurance + incomeTax + localTax;
  const netYear = gross - totalDeduct;

  return {
    netYear,
    netMonth: netYear / 12,
    insurance,
    incomeTax,
    localTax,
    np,
    hi: hi + ltc,
    ei,
    deductMonth: totalDeduct / 12,
  };
}

export function earnedIncomeDeduction(g: number): number {
  let d: number;
  if (g <= 5000000) d = g * 0.7;
  else if (g <= 15000000) d = 3500000 + (g - 5000000) * 0.4;
  else if (g <= 45000000) d = 7500000 + (g - 15000000) * 0.15;
  else if (g <= 100000000) d = 12000000 + (g - 45000000) * 0.05;
  else d = 14750000 + (g - 100000000) * 0.02;
  return Math.min(d, 20000000);
}

export function progressiveTax(base: number): number {
  if (base <= 14000000) return base * 0.06;
  if (base <= 50000000) return 840000 + (base - 14000000) * 0.15;
  if (base <= 88000000) return 6240000 + (base - 50000000) * 0.24;
  if (base <= 150000000) return 15360000 + (base - 88000000) * 0.35;
  if (base <= 300000000) return 37060000 + (base - 150000000) * 0.38;
  if (base <= 500000000) return 94060000 + (base - 300000000) * 0.40;
  if (base <= 1000000000) return 174060000 + (base - 500000000) * 0.42;
  return 384060000 + (base - 1000000000) * 0.45;
}

export function earnedTaxCredit(calcTax: number, g: number): number {
  const credit = calcTax <= 1300000 ? calcTax * 0.55 : 715000 + (calcTax - 1300000) * 0.30;
  let cap: number;
  if (g <= 33000000) cap = 740000;
  else if (g <= 70000000) cap = Math.max(660000, 740000 - (g - 33000000) * 0.008);
  else if (g <= 120000000) cap = Math.max(500000, 660000 - (g - 70000000) * 0.5);
  else cap = Math.max(200000, 500000 - (g - 120000000) * 0.5);
  return Math.min(credit, cap);
}
