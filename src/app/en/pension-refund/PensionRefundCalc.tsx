'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import { NP_RATE, NP_CAP } from '@/utils/tax';

const won = (n: number) => '₩' + Math.round(n).toLocaleString();

// Countries with pension treaties (cannot get lump-sum refund)
const TREATY_COUNTRIES = [
  'USA', 'Canada', 'Germany', 'France', 'Japan', 'Australia',
  'Czech Republic', 'Hungary', 'Belgium', 'Poland', 'Slovakia',
  'Switzerland', 'Austria', 'Bulgaria', 'Romania', 'Denmark',
  'India', 'Luxembourg', 'Netherlands', 'Brazil', 'Mongolia',
  'Turkey', 'Croatia', 'Finland', 'Sweden', 'Spain', 'UK',
  'Ireland', 'Peru', 'Uruguay', 'Slovenia', 'Portugal', 'Greece',
  'Philippines', 'Israel', 'Chile', 'Italy',
];

const INTEREST_RATE = 0.02; // approximate annual interest on contributions

export default function PensionRefundCalc() {
  const [monthlySalary, setMonthlySalary] = useState(300);
  const [months, setMonths] = useState(24);
  const [country, setCountry] = useState('');
  const [calculated, setCalculated] = useState(false);

  const monthlyBase = Math.min(monthlySalary * 10000, NP_CAP);
  const monthlyContribution = monthlyBase * NP_RATE;
  const totalContributions = monthlyContribution * months;

  // Simple interest approximation (average contribution time = months/2)
  const avgYears = months / 24; // average holding period
  const interest = totalContributions * INTEREST_RATE * avgYears;
  const refundAmount = totalContributions + interest;

  const isTreaty = TREATY_COUNTRIES.some(c => c.toLowerCase() === country.toLowerCase());

  return (
    <>
      <Card>
        <SectionTitle num="1">Your Details</SectionTitle>
        <div className="mb-3">
          <label className="block text-sm font-bold mb-2">Monthly Salary <span className="text-xs text-[var(--sub)] font-medium ml-1">{monthlySalary}만원</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={monthlySalary} onChange={e => setMonthlySalary(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원/mo</span>
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-bold mb-2">Months Worked in Korea</label>
          <input type="number" value={months} onChange={e => setMonths(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Your Nationality</label>
          <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. USA, Vietnam, China" className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] placeholder:font-medium placeholder:text-[var(--sub)]" />
        </div>
        <button onClick={() => setCalculated(true)} className="w-full py-4 border-0 rounded-xl bg-[var(--primary)] text-white text-lg font-extrabold cursor-pointer shadow-[var(--shadow-h)] transition-all hover:bg-[var(--primary-dark)] active:scale-[.985]">
          Calculate Refund
        </button>
      </Card>

      {calculated && (
        <>
          {isTreaty && (
            <Card className="!border-amber-300 !bg-amber-50">
              <div className="text-center">
                <div className="text-2xl mb-2">⚠️</div>
                <div className="text-sm font-bold text-amber-800 mb-1">{country} has a pension treaty with Korea</div>
                <div className="text-xs text-amber-700">You may NOT be eligible for a lump-sum refund. Your pension credits may be transferred to your home country instead. Contact NPS (1355) for your specific situation.</div>
              </div>
            </Card>
          )}

          <Card className="!p-6">
            <div className="text-center">
              <div className="text-xs font-bold text-[var(--sub)] mb-1">Estimated Refund</div>
              <div className="text-[42px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(refundAmount)}</div>
              <div className="text-sm text-[var(--sub)] mt-1">({months} months of contributions + interest)</div>
            </div>
          </Card>

          <Card>
            <SectionTitle num="2">Breakdown</SectionTitle>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Monthly contribution</span><span className="font-bold">{won(monthlyContribution)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Months worked</span><span className="font-bold">{months} months</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Total contributions</span><span className="font-bold">{won(totalContributions)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Interest (approx.)</span><span className="font-bold">{won(interest)}</span></div>
              <div className="flex justify-between border-t border-[var(--line)] pt-2.5"><span className="font-bold">Refund Amount</span><span className="font-extrabold text-[var(--primary-dark)]">{won(refundAmount)}</span></div>
            </div>
          </Card>

          <Card>
            <SectionTitle num="3">How to Apply</SectionTitle>
            <div className="flex flex-col gap-2 text-[13px] text-[#4E5968]">
              <div className="bg-[var(--bg)] rounded-xl p-3"><b>1.</b> Leave Korea (you must have departed)</div>
              <div className="bg-[var(--bg)] rounded-xl p-3"><b>2.</b> Apply within 3 years of departure</div>
              <div className="bg-[var(--bg)] rounded-xl p-3"><b>3.</b> Submit: passport copy, Korean bank account (or overseas account), alien registration card copy</div>
              <div className="bg-[var(--bg)] rounded-xl p-3"><b>4.</b> Apply online at NPS website or via Korean embassy</div>
              <div className="bg-[var(--bg)] rounded-xl p-3"><b>5.</b> Refund is processed in 2–4 weeks</div>
            </div>
          </Card>
        </>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 About National Pension Refund</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">Foreign workers in Korea pay into the National Pension System (NPS) at a rate of <b>4.75%</b> of their monthly salary (2026 rate). When you leave Korea permanently, you can request a lump-sum refund of your employee contributions plus accrued interest.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3"><b>Important:</b> Only YOUR contributions (employee portion) are refunded. The employer&apos;s matching 4.75% stays in the NPS fund and is not refunded.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">The monthly contribution cap is based on a maximum standard monthly income of ₩6,370,000. If your salary exceeds this, pension contributions are calculated based on the cap.</p>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          Estimates only. Actual refund depends on NPS records. Contact NPS at 1355 for exact amounts.
        </div>
      </footer>
    </>
  );
}
