'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import { netPay } from '@/utils/tax';

const won = (n: number) => '₩' + Math.round(n).toLocaleString();

export default function SalaryCalcEn() {
  const [salary, setSalary] = useState(5000);
  const [dependents, setDependents] = useState(1);
  const [nontax, setNontax] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof netPay> | null>(null);

  const calculate = () => setResult(netPay(salary, dependents, nontax));

  return (
    <>
      <Card>
        <SectionTitle num="1">Your Info</SectionTitle>
        <div className="mb-3">
          <label className="block text-sm font-bold mb-2">
            Annual Gross Salary <span className="text-xs text-[var(--sub)] font-medium ml-1">{salary.toLocaleString()}만원</span>
          </label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={salary} onChange={e => setSalary(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input type="range" min={2000} max={30000} step={100} value={salary} onChange={e => setSalary(+e.target.value)} className="w-full mt-3.5" />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-bold mb-2">Dependents</label>
          <select value={dependents} onChange={e => setDependents(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] bg-white">
            {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} {n === 1 ? '(yourself)' : 'persons'}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold mb-4">
          <input type="checkbox" checked={nontax} onChange={e => setNontax(e.target.checked)} className="w-4 h-4 accent-[var(--primary)]" />
          Non-taxable meal allowance (₩200,000/mo)
        </label>
        <button onClick={calculate} className="w-full py-4 border-0 rounded-xl bg-[var(--primary)] text-white text-lg font-extrabold cursor-pointer shadow-[var(--shadow-h)] transition-all hover:bg-[var(--primary-dark)] active:scale-[.985]">
          Calculate Net Pay
        </button>
      </Card>

      {result && (
        <>
          <Card className="!p-6">
            <div className="text-center">
              <div className="text-xs font-bold text-[var(--sub)] mb-1">Monthly Net Pay</div>
              <div className="text-[42px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.netMonth)}</div>
              <div className="text-sm text-[var(--sub)] mt-1">Annual: {won(result.netYear)}</div>
            </div>
          </Card>
          <Card>
            <SectionTitle num="2">Monthly Deductions</SectionTitle>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              {[
                ['National Pension', result.np / 12],
                ['Health + Long-term Care', result.hi / 12],
                ['Employment Insurance', result.ei / 12],
                ['Income Tax', result.incomeTax / 12],
                ['Local Tax', result.localTax / 12],
              ].map(([label, amount]) => (
                <div key={label as string} className="flex justify-between items-center">
                  <span className="text-[var(--sub)] font-semibold">{label as string}</span>
                  <span className="font-bold">{won(amount as number)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center border-t border-[var(--line)] pt-2.5">
                <span className="font-bold">Total Deductions</span>
                <span className="font-extrabold text-[var(--primary-dark)]">{won(result.deductMonth)}</span>
              </div>
            </div>
          </Card>
        </>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 Understanding Korean Salary Deductions</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">In Korea, your employer deducts social insurance premiums and income tax from your monthly paycheck before you receive it. The four social insurance programs (4대보험) are: National Pension, Health Insurance, Long-term Care Insurance, and Employment Insurance.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">Income tax follows an 8-bracket progressive system (6%–45%), with an additional 10% local income tax. Various deductions and credits can significantly reduce your tax burden, especially for those with dependents.</p>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          Based on 2026 rates: NP 4.75%, HI 3.595%, LTC 13.14% of HI, EI 0.9%. Estimates only.
        </div>
      </footer>
    </>
  );
}
