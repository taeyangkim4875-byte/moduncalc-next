'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import { compareTax, type ComparisonResult } from '@/utils/foreignerTax';

const won = (n: number) => '₩' + Math.round(n).toLocaleString();
const wonMan = (n: number) => won(n * 10000);

export default function TaxComparator() {
  const [salary, setSalary] = useState(5000);
  const [dependents, setDependents] = useState(1);
  const [nontax, setNontax] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const calculate = () => setResult(compareTax(salary, dependents, nontax));

  return (
    <>
      <Card>
        <SectionTitle num="1">Your Salary</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Annual Gross Salary
            <span className="text-xs text-[var(--sub)] font-medium ml-1">
              {wonMan(salary)} ({(salary / 100).toFixed(1)}억원)
            </span>
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="number"
              value={salary}
              onChange={e => setSalary(+e.target.value)}
              className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"
            />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input type="range" min={2000} max={50000} step={100} value={salary} onChange={e => setSalary(+e.target.value)} className="w-full mt-3.5" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Dependents (including yourself)</label>
          <select
            value={dependents}
            onChange={e => setDependents(+e.target.value)}
            className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] bg-white"
          >
            {[1, 2, 3, 4, 5, 6, 7].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? '(yourself only)' : 'persons'}</option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold mb-4">
          <input type="checkbox" checked={nontax} onChange={e => setNontax(e.target.checked)} className="w-4 h-4 accent-[var(--primary)]" />
          Non-taxable meal allowance (₩200,000/month)
        </label>

        <button
          onClick={calculate}
          className="w-full py-4 border-0 rounded-xl bg-[var(--primary)] text-white text-lg font-extrabold cursor-pointer shadow-[var(--shadow-h)] transition-all hover:bg-[var(--primary-dark)] active:scale-[.985]"
        >
          Compare Tax Options
        </button>
      </Card>

      {result && (
        <>
          {/* Verdict */}
          <Card className="!p-6">
            <div className="text-center">
              <div className="text-xs font-bold text-[var(--sub)] mb-1">Our Recommendation</div>
              <div className="text-2xl font-extrabold text-[var(--primary-dark)] mb-1">
                {result.recommendation === 'flat' ? '🏷️ Flat Tax (19%)' : '📊 Progressive Tax'}
              </div>
              <div className="text-lg font-bold text-[var(--green)]">
                saves you {won(Math.abs(result.savings))}/year
              </div>
              <div className="text-xs text-[var(--sub)] mt-2">
                Break-even salary: {wonMan(result.breakEvenSalary)} ({(result.breakEvenSalary / 100).toFixed(1)}억원)
              </div>
            </div>
          </Card>

          {/* Side-by-side comparison */}
          <Card>
            <SectionTitle num="2">Side-by-Side Comparison</SectionTitle>
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 gap-y-2 text-[13px]">
              {/* Header */}
              <div className="font-bold text-[var(--sub)]" />
              <div className="font-extrabold text-center text-[var(--primary-dark)] text-xs">Flat 19%</div>
              <div className="font-extrabold text-center text-[var(--primary-dark)] text-xs">Progressive</div>

              <Row label="Gross Salary" a={result.flat.grossAnnual} b={result.progressive.grossAnnual} />

              <div className="col-span-3 border-t border-[var(--line)] my-1" />
              <div className="col-span-3 text-[10px] font-bold text-[var(--sub)] uppercase tracking-wide">Social Insurance (same)</div>
              <Row label="National Pension" a={result.flat.nationalPension} b={result.progressive.nationalPension} />
              <Row label="Health + Long-term Care" a={result.flat.healthInsurance} b={result.progressive.healthInsurance} />
              <Row label="Employment Insurance" a={result.flat.employmentInsurance} b={result.progressive.employmentInsurance} />
              <Row label="Insurance Subtotal" a={result.flat.totalInsurance} b={result.progressive.totalInsurance} bold />

              <div className="col-span-3 border-t border-[var(--line)] my-1" />
              <div className="col-span-3 text-[10px] font-bold text-[var(--sub)] uppercase tracking-wide">Tax</div>
              <Row label="Income Tax" a={result.flat.incomeTax} b={result.progressive.incomeTax} />
              <Row label="Local Tax" a={result.flat.localTax} b={result.progressive.localTax} />
              <Row label="Tax Subtotal" a={result.flat.totalTax} b={result.progressive.totalTax} bold highlight />

              <div className="col-span-3 border-t-2 border-[var(--ink)] my-1" />
              <Row label="Total Deductions" a={result.flat.totalDeductions} b={result.progressive.totalDeductions} bold />
              <Row label="Annual Net Pay" a={result.flat.netAnnual} b={result.progressive.netAnnual} bold highlight />
              <Row label="Monthly Net Pay" a={result.flat.netMonthly} b={result.progressive.netMonthly} bold />
              <Row label="Effective Tax Rate" a={result.flat.effectiveRate} b={result.progressive.effectiveRate} percent />
            </div>
          </Card>

          {/* Payslip Explainer */}
          <Card>
            <SectionTitle num="3">Understanding Your Korean Payslip</SectionTitle>
            <div className="flex flex-col gap-3 text-[13px]">
              <PayslipItem
                title="National Pension (국민연금)"
                rate="4.75%"
                desc="Korea's public pension. You pay half, employer pays half. If you leave Korea permanently, you can claim a lump-sum refund (except for citizens of countries with a pension treaty)."
              />
              <PayslipItem
                title="Health Insurance (건강보험)"
                rate="3.595% + Long-term Care 13.14%"
                desc="Covers medical expenses at Korean hospitals. Long-term care insurance is automatically added as a percentage of your health insurance premium."
              />
              <PayslipItem
                title="Employment Insurance (고용보험)"
                rate="0.9%"
                desc="Unemployment insurance. Entitles you to jobseeker's allowance if you lose your job involuntarily."
              />
              <PayslipItem
                title="Income Tax (소득세)"
                rate={result.recommendation === 'flat' ? '19% flat' : '6%–45% progressive'}
                desc="The main tax on your employment income. As a foreigner, you can choose between flat 19% or progressive rates each year during year-end settlement."
              />
              <PayslipItem
                title="Local Income Tax (지방소득세)"
                rate="10% of income tax"
                desc="A surtax on income tax that goes to your local government. Always 10% of whatever your income tax is."
              />
            </div>
          </Card>

          {/* Guide Content */}
          <Card>
            <h2 className="text-base font-extrabold mb-3">📖 Flat Tax vs Progressive: Which Should You Choose?</h2>
            <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
              <p>
                Korea offers foreign workers a special flat income tax rate of <b>19%</b> (Article 18-2 of the Special Tax Treatment Control Act).
                With the 10% local income tax surcharge, your total tax rate becomes <b>20.9%</b> of gross salary — no deductions, no credits, simple.
              </p>
              <p>
                The standard progressive system taxes you at <b>6% to 45%</b> across 8 brackets,
                but you get valuable deductions: earned income deduction, personal exemptions (₩1.5M per dependent),
                and the earned income tax credit. For most employees earning under ~₩160M, these deductions make progressive cheaper.
              </p>
              <p>
                <b>The break-even point</b> is approximately <b>{wonMan(result.breakEvenSalary)}</b> ({(result.breakEvenSalary / 100).toFixed(1)}억원) per year.
                Above this salary, flat tax saves you money. Below it, progressive is better.
                The more dependents you have, the higher the break-even shifts (because personal exemptions increase).
              </p>
              <p>
                <b>Key gotcha:</b> Flat tax applies to your <b>entire gross salary</b> — you lose ALL deductions and credits.
                This is why it only benefits high earners. A common mistake is choosing flat tax at ₩80M salary thinking &quot;19% sounds low&quot; — but with deductions,
                your effective progressive rate would be much lower than 19%.
              </p>
              <p>
                <b>How to apply:</b> Elect flat tax during your year-end tax settlement (연말정산) with your employer, typically in January–February.
                You can switch between flat and progressive every year — you&apos;re not locked in.
                The flat tax option is available for up to <b>20 years</b> from your first working day in Korea.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-base font-extrabold mb-3">❓ Frequently Asked Questions</h2>
            <div className="flex flex-col gap-4">
              <Faq q="What is the flat tax rate for foreigners in Korea?" a="Foreign workers can elect a flat 19% income tax rate (+ 1.9% local tax = 20.9% total) instead of the standard progressive rates (6%–45%). This option is available under Article 18-2 of the Special Tax Treatment Control Act." />
              <Faq q="When is flat tax better than progressive?" a={`Flat tax becomes advantageous when your annual gross salary exceeds approximately ${wonMan(result.breakEvenSalary)}. Below that threshold, progressive taxation with standard deductions and credits is cheaper.`} />
              <Faq q="Can I switch between flat and progressive every year?" a="Yes. You choose your tax method during year-end settlement (연말정산) each year, typically in January–February. You are not locked into either method." />
              <Faq q="Are social insurance contributions different under flat tax?" a="No. National Pension (4.75%), Health Insurance (3.595% + long-term care), and Employment Insurance (0.9%) contributions are identical regardless of which income tax method you choose." />
              <Faq q="What deductions am I giving up with flat tax?" a="Under flat tax, you cannot claim earned income deduction, personal exemptions (₩1.5M per dependent), or earned income tax credit. The 19% applies to your entire gross salary with no reductions." />
            </div>
          </Card>

          <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
            <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
              This calculator provides estimates based on 2026 tax rates and social insurance premiums.
              Actual amounts may differ. Consult a tax professional for formal advice.
              <br />Sources: 소득세법 §55, 조세특례제한법 §18-2, 국민연금공단·건강보험공단 2026 rate announcements.
            </div>
          </footer>
        </>
      )}

      {!result && (
        <Card>
          <h2 className="text-base font-extrabold mb-3">📖 About This Calculator</h2>
          <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
            Foreign workers in Korea can choose between a <b>flat 19% income tax rate</b> or the standard <b>progressive rates (6%–45%)</b>.
            This calculator compares both options side by side so you can see exactly which one saves you more money.
          </p>
          <p className="text-sm text-[#4E5968] leading-relaxed">
            Enter your annual gross salary above and click &quot;Compare Tax Options&quot; to get a detailed breakdown
            including social insurance, income tax, local tax, and net take-home pay under both methods.
          </p>
        </Card>
      )}
    </>
  );
}

function Row({ label, a, b, bold, highlight, percent }: {
  label: string; a: number; b: number; bold?: boolean; highlight?: boolean; percent?: boolean;
}) {
  const fmt = percent ? (n: number) => n.toFixed(1) + '%' : (n: number) => won(n);
  const winner = percent ? (a < b ? 'a' : a > b ? 'b' : '') : (a > b ? 'b' : a < b ? 'a' : '');
  return (
    <>
      <div className={`${bold ? 'font-bold' : 'text-[var(--sub)]'} font-semibold`}>{label}</div>
      <div className={`text-right tabular-nums ${bold ? 'font-extrabold' : 'font-semibold'} ${highlight && winner === 'a' ? 'text-[var(--green)]' : ''}`}>{fmt(a)}</div>
      <div className={`text-right tabular-nums ${bold ? 'font-extrabold' : 'font-semibold'} ${highlight && winner === 'b' ? 'text-[var(--green)]' : ''}`}>{fmt(b)}</div>
    </>
  );
}

function PayslipItem({ title, rate, desc }: { title: string; rate: string; desc: string }) {
  return (
    <div className="bg-[var(--bg)] rounded-xl p-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-sm">{title}</span>
        <span className="text-xs font-bold text-[var(--primary-dark)]">{rate}</span>
      </div>
      <div className="text-[12px] text-[var(--sub)] leading-relaxed">{desc}</div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. {q}</div>
      <div className="text-sm text-[#4E5968] leading-relaxed">A. {a}</div>
    </div>
  );
}
