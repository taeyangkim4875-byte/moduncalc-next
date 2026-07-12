'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const won = (n: number) => '₩' + Math.round(n).toLocaleString();

export default function SeveranceCalcEn() {
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2026-07-12');
  const [monthlySalary, setMonthlySalary] = useState(300); // 만원

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const years = totalDays / 365;

  const dailyWage = (monthlySalary * 10000) / 30;
  const severance = dailyWage * 30 * years;
  const eligible = totalDays >= 365;

  return (
    <>
      <Card>
        <SectionTitle num="1">Employment Details</SectionTitle>
        <div className="mb-3">
          <label className="block text-sm font-bold mb-2">Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-bold mb-2">End Date (or expected)</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-2">Monthly Salary (last 3 months avg)</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={monthlySalary} onChange={e => setMonthlySalary(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
        </div>
      </Card>

      <Card className="!p-6">
        <div className="text-center">
          {!eligible ? (
            <>
              <div className="text-2xl mb-2">⚠️</div>
              <div className="text-sm font-bold text-amber-700">Not yet eligible</div>
              <div className="text-xs text-[var(--sub)] mt-1">You need at least 1 year ({365 - totalDays} more days) of continuous service</div>
            </>
          ) : (
            <>
              <div className="text-xs font-bold text-[var(--sub)] mb-1">Estimated Severance Pay</div>
              <div className="text-[42px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(severance)}</div>
              <div className="text-sm text-[var(--sub)] mt-1">{totalDays} days ({years.toFixed(1)} years) of service</div>
            </>
          )}
        </div>
      </Card>

      {eligible && (
        <Card>
          <SectionTitle num="2">Breakdown</SectionTitle>
          <div className="flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Service period</span><span className="font-bold">{totalDays} days ({years.toFixed(2)} years)</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Daily wage (monthly ÷ 30)</span><span className="font-bold">{won(dailyWage)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Formula</span><span className="font-bold">Daily × 30 × years</span></div>
            <div className="flex justify-between border-t border-[var(--line)] pt-2.5"><span className="font-bold">Severance Pay</span><span className="font-extrabold text-[var(--primary-dark)]">{won(severance)}</span></div>
          </div>
        </Card>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 Severance Pay in Korea</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p>Under Korean labor law, <b>all employees</b> (including foreigners) who have worked for 1+ years are entitled to severance pay (퇴직금). This is a legal right, not a benefit.</p>
          <p><b>Calculation:</b> 30 days of average wage × number of years worked. Average wage is based on your last 3 months of total compensation (including regular bonuses).</p>
          <p><b>Important for foreigners:</b> Severance pay is separate from your final paycheck. Your employer must pay it within 14 days of your last day. If they refuse, you can file a complaint with the Labor Board (고용노동부).</p>
          <p><b>Tax:</b> Severance pay is subject to retirement income tax, which is calculated separately from regular income tax and is usually lower.</p>
        </div>
      </Card>
    </>
  );
}
