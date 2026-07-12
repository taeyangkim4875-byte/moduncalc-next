'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import { HI_RATE, LTC_RATE } from '@/utils/tax';

const won = (n: number) => '₩' + Math.round(n).toLocaleString();

export default function HealthInsCalc() {
  const [type, setType] = useState<'employee' | 'self'>('employee');
  const [salary, setSalary] = useState(300); // 만원/월

  // Employee: 50% split with employer
  const empHI = salary * 10000 * HI_RATE;
  const empLTC = empHI * LTC_RATE;
  const empTotal = empHI + empLTC;

  // Self-employed foreigner: full amount (no employer share), with minimum floor
  const selfHI = salary * 10000 * HI_RATE * 2; // pay both halves
  const selfLTC = selfHI * LTC_RATE;
  const selfMin = 142810; // 2026 minimum for self-employed foreigners (approx)
  const selfTotal = Math.max(selfHI + selfLTC, selfMin);

  const premium = type === 'employee' ? empTotal : selfTotal;

  return (
    <>
      <Card>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setType('employee')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] cursor-pointer transition-colors ${type === 'employee' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
            Employee
          </button>
          <button onClick={() => setType('self')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] cursor-pointer transition-colors ${type === 'self' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
            Self-employed / Other
          </button>
        </div>

        <SectionTitle num="1">Monthly Income</SectionTitle>
        <div className="flex items-center gap-2.5 mb-2">
          <input type="number" value={salary} onChange={e => setSalary(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
          <span className="text-sm font-bold text-[var(--sub)]">만원/mo</span>
        </div>
        {type === 'self' && (
          <div className="text-[11px] text-[var(--sub)] mt-1 mb-2">Self-employed foreigners have a minimum monthly premium of ~₩142,810</div>
        )}
      </Card>

      <Card className="!p-6">
        <div className="text-center">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">Your Monthly Premium</div>
          <div className="text-[42px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(premium)}</div>
          <div className="text-sm text-[var(--sub)] mt-1">
            {type === 'employee' ? 'Your share (employer pays the same)' : 'Total (you pay full amount)'}
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">Breakdown</SectionTitle>
        <div className="flex flex-col gap-2.5 text-[13.5px]">
          {type === 'employee' ? (
            <>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Health Insurance ({(HI_RATE * 100).toFixed(3)}%)</span><span className="font-bold">{won(empHI)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Long-term Care ({(LTC_RATE * 100).toFixed(2)}% of HI)</span><span className="font-bold">{won(empLTC)}</span></div>
              <div className="flex justify-between border-t border-[var(--line)] pt-2.5"><span className="font-bold">Your Share</span><span className="font-extrabold text-[var(--primary-dark)]">{won(empTotal)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Employer also pays</span><span className="font-bold">{won(empTotal)}</span></div>
            </>
          ) : (
            <>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Health Insurance (full)</span><span className="font-bold">{won(selfHI)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Long-term Care</span><span className="font-bold">{won(selfHI * LTC_RATE)}</span></div>
              {selfHI + selfHI * LTC_RATE < selfMin && (
                <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">Minimum floor applied</span><span className="font-bold text-amber-600">↑ {won(selfMin)}</span></div>
              )}
              <div className="flex justify-between border-t border-[var(--line)] pt-2.5"><span className="font-bold">Total</span><span className="font-extrabold text-[var(--primary-dark)]">{won(selfTotal)}</span></div>
            </>
          )}
        </div>
      </Card>

      <Card>
        <SectionTitle num="3">What NHI Covers</SectionTitle>
        <div className="flex flex-col gap-2 text-[13px]">
          {[
            ['Outpatient (clinic/hospital)', '30% copay', 'You pay 30%, NHI covers 70%'],
            ['Inpatient (hospitalization)', '20% copay', 'You pay 20%, NHI covers 80%'],
            ['Pharmacy (prescriptions)', '30% copay', 'With doctor\'s prescription'],
            ['Dental (basic)', 'Partially covered', 'Scaling 1x/year free, fillings covered'],
            ['Health checkup', 'Free', 'General checkup every 1-2 years'],
            ['MRI / CT scan', '30-60% copay', 'When medically necessary'],
          ].map(([item, copay, note]) => (
            <div key={item as string} className="bg-[var(--bg)] rounded-xl p-3">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-bold text-sm">{item}</span>
                <span className="text-xs font-bold text-[var(--primary-dark)]">{copay}</span>
              </div>
              <div className="text-[11px] text-[var(--sub)]">{note}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 Health Insurance for Foreigners</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2">
          <p><b>Employees:</b> Automatically enrolled through your employer. Premium is {(HI_RATE * 100).toFixed(3)}% of monthly salary, split 50/50 with your employer. Long-term care insurance ({(LTC_RATE * 100).toFixed(2)}% of HI premium) is added on top.</p>
          <p><b>Self-employed / Visa holders:</b> You pay the full premium yourself (both employee and employer portions). A minimum monthly premium applies regardless of income.</p>
          <p><b>Tip:</b> Keep your NHI card with you. Show it at any hospital or clinic for the insured rate. Without it, you&apos;ll pay the full uninsured price (2-3x more).</p>
        </div>
      </Card>
    </>
  );
}
