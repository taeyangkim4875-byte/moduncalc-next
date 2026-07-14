'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

function formatWon(n: number): string {
  if (n >= 100000000) return (n / 100000000).toFixed(1) + ' eok';
  if (n >= 10000) return (n / 10000).toFixed(0) + ' man';
  return n.toLocaleString();
}

export default function CompoundCalcEn() {
  const [principal, setPrincipal] = useState(10000000);
  const [monthly, setMonthly] = useState(500000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);

  const monthlyRate = (rate || 0) / 100 / 12;
  const totalMonths = (years || 0) * 12;
  const totalInvested = (principal || 0) + (monthly || 0) * totalMonths;

  // Compound interest calculation
  let finalAmount = 0;
  if (monthlyRate > 0) {
    const principalGrowth = (principal || 0) * Math.pow(1 + monthlyRate, totalMonths);
    const monthlyGrowth = (monthly || 0) * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    finalAmount = principalGrowth + monthlyGrowth;
  } else {
    finalAmount = totalInvested;
  }

  const profit = finalAmount - totalInvested;
  const ruleOf72 = (rate || 0) > 0 ? (72 / (rate || 1)).toFixed(1) : '-';

  // Yearly table
  const yearlyData: { year: number; invested: number; balance: number }[] = [];
  for (let y = 1; y <= (years || 0); y++) {
    const m = y * 12;
    const inv = (principal || 0) + (monthly || 0) * m;
    let bal = 0;
    if (monthlyRate > 0) {
      bal = (principal || 0) * Math.pow(1 + monthlyRate, m) + (monthly || 0) * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate);
    } else {
      bal = inv;
    }
    yearlyData.push({ year: y, invested: inv, balance: Math.round(bal) });
  }

  return (
    <>
      <Card>
        <SectionTitle num="1">Investment Details</SectionTitle>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Initial Amount (won)</label>
            <input type="number" value={principal} onChange={e => setPrincipal(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Monthly (won)</label>
            <input type="number" value={monthly} onChange={e => setMonthly(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Annual Rate (%)</label>
            <input type="number" step={0.1} value={rate} onChange={e => setRate(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Years</label>
            <input type="number" min={1} max={50} value={years} onChange={e => setYears(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
        </div>
      </Card>

      <Card className="!p-6">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[var(--primary-weak)] rounded-xl p-4 text-center col-span-2">
            <div className="text-[10px] text-[var(--primary)] font-bold uppercase">Final Amount</div>
            <div className="text-[32px] font-extrabold text-[var(--primary-dark)]">{Math.round(finalAmount).toLocaleString()}</div>
            <div className="text-xs text-[var(--sub)]">won ({formatWon(Math.round(finalAmount))} won)</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Total Invested</div>
            <div className="text-xl font-extrabold text-[var(--primary-dark)]">{totalInvested.toLocaleString()}</div>
            <div className="text-xs text-[var(--sub)]">won</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Interest Earned</div>
            <div className="text-xl font-extrabold text-green-600">{Math.round(profit).toLocaleString()}</div>
            <div className="text-xs text-[var(--sub)]">won</div>
          </div>
        </div>
        <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
          <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Rule of 72</div>
          <div className="text-base font-extrabold text-[var(--primary-dark)]">Your money doubles in ~{ruleOf72} years</div>
          <div className="text-xs text-[var(--sub)]">at {rate || 0}% annual return</div>
        </div>
      </Card>

      {yearlyData.length > 0 && (
        <Card>
          <SectionTitle num="3">Year-by-Year Breakdown</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[var(--sub)] border-b border-[var(--line)]">
                  <th className="py-2 text-left font-bold">Year</th>
                  <th className="py-2 text-right font-bold">Invested</th>
                  <th className="py-2 text-right font-bold">Balance</th>
                  <th className="py-2 text-right font-bold">Profit</th>
                </tr>
              </thead>
              <tbody>
                {yearlyData.map(d => (
                  <tr key={d.year} className="border-b border-[var(--line)] last:border-0">
                    <td className="py-2 font-bold">{d.year}</td>
                    <td className="py-2 text-right">{d.invested.toLocaleString()}</td>
                    <td className="py-2 text-right font-bold text-[var(--primary-dark)]">{d.balance.toLocaleString()}</td>
                    <td className="py-2 text-right text-green-600">{(d.balance - d.invested).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">Guide: The Power of Compound Interest</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Compound interest is the most powerful force in investing.</b> Unlike simple interest (which only earns on your original amount), compound interest earns &quot;interest on interest,&quot; creating exponential growth over time. The longer you invest, the more dramatic the effect.</p>
          <p><b>Reference rates for planning:</b> Korean bank deposits (적금/예금) typically offer 3~4% annually. The KOSPI (Korean stock market index) has averaged about 7~8% over the long term. Global stock index funds (like S&amp;P 500) have historically returned about 7~10% annually. Higher returns come with higher risk and volatility.</p>
          <p><b>The Rule of 72:</b> This simple formula tells you how long it takes to double your money. Divide 72 by your annual interest rate. At 3% (bank deposit), it takes 24 years to double. At 7% (stock market), about 10.3 years. At 10%, just 7.2 years. This shows why investing in growth assets early is so impactful.</p>
          <p><b>Monthly contributions matter more than you think.</b> Even small regular contributions compound significantly over time. Saving 500,000 won per month at 7% for 20 years gives you about 260 million won — even though you only contributed 120 million won. The other 140 million won is pure compound interest growth.</p>
          <p><b>Start early, stay consistent.</b> A 25-year-old who invests 300,000 won/month until age 65 at 7% will accumulate over 790 million won. A 35-year-old doing the same will only reach about 365 million won. Those extra 10 years more than doubled the final amount — that is the magic of compound interest.</p>
        </div>
      </Card>
    </>
  );
}
