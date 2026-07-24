'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import Link from 'next/link';
import { progressiveTax, earnedIncomeDeduction, earnedTaxCredit, NP_RATE, NP_CAP, HI_RATE, LTC_RATE, EI_RATE } from '@/utils/tax';

const won = (n: number) => '₩' + Math.round(n).toLocaleString();

const BRACKETS = [
  { min: 0, max: 14_000_000, rate: 6 },
  { min: 14_000_000, max: 50_000_000, rate: 15 },
  { min: 50_000_000, max: 88_000_000, rate: 24 },
  { min: 88_000_000, max: 150_000_000, rate: 35 },
  { min: 150_000_000, max: 300_000_000, rate: 38 },
  { min: 300_000_000, max: 500_000_000, rate: 40 },
  { min: 500_000_000, max: 1_000_000_000, rate: 42 },
  { min: 1_000_000_000, max: Infinity, rate: 45 },
];

export default function IncomeTaxCalcEn() {
  const [grossMan, setGrossMan] = useState('5000');
  const [dependents, setDependents] = useState(1);
  const [mealAllowance, setMealAllowance] = useState(true);

  const result = useMemo(() => {
    const gm = Number(grossMan) || 0;
    if (gm <= 0) return null;

    const gross = gm * 10000;
    const nontaxYear = mealAllowance ? 200_000 * 12 : 0;
    const taxableGross = Math.max(0, gross - nontaxYear);
    const wageM = taxableGross / 12;

    // Insurance
    const npBase = Math.min(wageM, NP_CAP);
    const np = npBase * NP_RATE * 12;
    const hi = wageM * HI_RATE * 12;
    const ltc = hi * LTC_RATE;
    const ei = wageM * EI_RATE * 12;
    const insurance = np + hi + ltc + ei;

    // Progressive tax calc
    const ded = earnedIncomeDeduction(taxableGross);
    const earnedIncome = Math.max(0, taxableGross - ded);
    const personal = dependents * 1_500_000;
    const taxBase = Math.max(0, earnedIncome - personal - np - hi - ltc - ei);
    const calcTax = progressiveTax(taxBase);
    const credit = earnedTaxCredit(calcTax, taxableGross);
    const incomeTax = Math.max(0, calcTax - credit);
    const localTax = incomeTax * 0.10;

    // Flat 19% option for foreigners
    const flatTax = taxableGross * 0.19;
    const flatLocal = flatTax * 0.10;

    // Bracket breakdown
    const bracketBreakdown = BRACKETS.map(b => {
      if (taxBase <= b.min) return { ...b, taxable: 0, tax: 0 };
      const taxable = Math.min(taxBase, b.max === Infinity ? taxBase : b.max) - b.min;
      return { ...b, taxable: Math.max(0, taxable), tax: Math.max(0, taxable) * b.rate / 100 };
    }).filter(b => b.taxable > 0);

    const effectiveRate = gross > 0 ? ((incomeTax + localTax) / gross * 100) : 0;
    const flatEffective = gross > 0 ? ((flatTax + flatLocal) / gross * 100) : 0;

    return {
      gross, taxableGross, taxBase, incomeTax, localTax, insurance,
      np, hi: hi + ltc, ei,
      effectiveRate, flatTax, flatLocal, flatEffective,
      bracketBreakdown,
      progressiveBetter: (incomeTax + localTax) <= (flatTax + flatLocal),
    };
  }, [grossMan, dependents, mealAllowance]);

  return (
    <>
      <Card>
        <SectionTitle num="1">Annual Gross Salary</SectionTitle>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="number"
            inputMode="numeric"
            value={grossMan}
            onChange={e => setGrossMan(e.target.value)}
            className="flex-1 h-11 px-3 rounded-xl border-[1.5px] border-[var(--line)] text-sm font-bold text-right focus:outline-none focus:border-[var(--primary)]"
          />
          <span className="text-sm font-bold text-[var(--sub)] whitespace-nowrap">만원 (₩10K)</span>
        </div>
        <p className="text-xs text-[#8B95A1] mb-4">
          {result ? `= ${won(result.gross)} / year = ${won(result.gross / 12)} / month` : 'Enter your annual gross salary in 만원 (10,000 KRW units)'}
        </p>

        <SectionTitle num="2">Dependents (부양가족)</SectionTitle>
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {[1, 2, 3, 4].map(d => (
            <button key={d} onClick={() => setDependents(d)} className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${dependents === d ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
              {d === 1 ? 'Just me' : `${d} people`}
            </button>
          ))}
        </div>

        <SectionTitle num="3">Non-taxable Meal Allowance</SectionTitle>
        <div className="grid grid-cols-2 gap-1.5">
          {[true, false].map(v => (
            <button key={String(v)} onClick={() => setMealAllowance(v)} className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${mealAllowance === v ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
              {v ? 'Yes (₩200K/mo)' : 'No'}
            </button>
          ))}
        </div>
        <p className="text-xs text-[#8B95A1] mt-2">Most Korean companies provide ₩200,000/month non-taxable meal allowance (식대).</p>
      </Card>

      {result && (
        <>
          <Card>
            <h2 className="text-base font-extrabold mb-3">Tax Bracket Breakdown</h2>
            <div className="space-y-1.5 mb-4">
              {result.bracketBreakdown.map((b, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-[var(--bg)] rounded-lg">
                  <div>
                    <span className="text-xs font-bold text-[var(--primary)]">{b.rate}% bracket</span>
                    <span className="text-xs text-[#8B95A1] ml-2">
                      {won(b.min)} ~ {b.max === Infinity ? '∞' : won(b.max)}
                    </span>
                  </div>
                  <span className="text-sm font-bold">{won(b.tax)}</span>
                </div>
              ))}
            </div>
            <div className="p-3 bg-[var(--bg)] rounded-xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#4E5968]">Taxable base (과세표준)</span>
                <span className="font-bold">{won(result.taxBase)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#4E5968]">Income tax (소득세)</span>
                <span className="font-bold">{won(result.incomeTax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#4E5968]">Local income tax (지방소득세, 10%)</span>
                <span className="font-bold">{won(result.localTax)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-[var(--line)] pt-2">
                <span className="text-[#4E5968] font-bold">Total tax</span>
                <span className="font-extrabold text-[var(--primary)]">{won(result.incomeTax + result.localTax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#4E5968]">Effective tax rate</span>
                <span className="font-bold">{result.effectiveRate.toFixed(1)}%</span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-base font-extrabold mb-3">Progressive vs. 19% Flat Tax</h2>
            <p className="text-xs text-[#8B95A1] mb-3">Foreigners in Korea can choose the 19% flat tax rate (no deductions applied) instead of the progressive system. This is often better for high earners.</p>
            <div className="grid grid-cols-2 gap-2">
              <div className={`p-3 rounded-xl border-[1.5px] ${result.progressiveBetter ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)]'}`}>
                <div className="text-xs font-bold mb-1">Progressive (일반과세)</div>
                <div className="text-lg font-extrabold">{won(result.incomeTax + result.localTax)}</div>
                <div className="text-xs text-[#8B95A1]">{result.effectiveRate.toFixed(1)}% effective</div>
                {result.progressiveBetter && <div className="text-xs font-bold text-[var(--primary)] mt-1">Better option</div>}
              </div>
              <div className={`p-3 rounded-xl border-[1.5px] ${!result.progressiveBetter ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)]'}`}>
                <div className="text-xs font-bold mb-1">19% Flat (단일세율)</div>
                <div className="text-lg font-extrabold">{won(result.flatTax + result.flatLocal)}</div>
                <div className="text-xs text-[#8B95A1]">{result.flatEffective.toFixed(1)}% effective</div>
                {!result.progressiveBetter && <div className="text-xs font-bold text-[var(--primary)] mt-1">Better option</div>}
              </div>
            </div>
            <p className="text-xs text-[#8B95A1] mt-3">
              You save <b>{won(Math.abs((result.incomeTax + result.localTax) - (result.flatTax + result.flatLocal)))}</b>/year by choosing the {result.progressiveBetter ? 'progressive' : 'flat 19%'} option.
            </p>
            <p className="text-xs text-[#8B95A1] mt-1">
              Compare both options in detail: <Link href="/en/tax-comparison" className="text-[var(--primary)] font-bold hover:underline">Tax Comparison Calculator</Link>
            </p>
          </Card>

          <Card>
            <h2 className="text-base font-extrabold mb-3">Social Insurance Deductions (4대보험)</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#4E5968]">National Pension (국민연금, {(NP_RATE * 100).toFixed(2)}%)</span>
                <span className="font-bold">{won(result.np)}/yr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#4E5968]">Health Insurance + LTC (건강+장기요양)</span>
                <span className="font-bold">{won(result.hi)}/yr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#4E5968]">Employment Insurance (고용보험, {(EI_RATE * 100).toFixed(1)}%)</span>
                <span className="font-bold">{won(result.ei)}/yr</span>
              </div>
              <div className="flex justify-between text-sm border-t border-[var(--line)] pt-2">
                <span className="text-[#4E5968] font-bold">Total insurance</span>
                <span className="font-extrabold">{won(result.insurance)}/yr</span>
              </div>
            </div>
          </Card>
        </>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">Korean Tax Brackets Explained</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea uses a <b>progressive income tax system</b> (종합소득세) with 8 brackets ranging from 6% to 45%. Your income is taxed at increasingly higher rates as it passes through each bracket — you do not pay the top rate on your entire income.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Year-end settlement (연말정산):</b> Every January-February, your employer calculates your actual tax liability for the previous year versus what was withheld monthly. If you overpaid, you get a refund; if you underpaid, you owe the difference. This is Korea&apos;s version of filing taxes, and most employees don&apos;t need to file separately.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>How to file:</b> As a foreign employee, your employer handles year-end settlement. You may need to submit receipts for medical expenses, education costs, donations, and card usage via the Hometax (홈택스) system. Alternatively, foreigners can elect the 19% flat tax rate, which requires no deductions — just a flat calculation on total salary.
        </p>
      </Card>
    </>
  );
}
