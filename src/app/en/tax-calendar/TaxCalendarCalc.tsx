'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';

interface Deadline {
  month: number;
  day?: number;
  endDay?: number;
  title: string;
  korean: string;
  description: string;
  whoFiles: string;
  whereTo: string;
  important?: boolean;
}

const DEADLINES: Deadline[] = [
  {
    month: 1,
    day: 15,
    endDay: 28,
    title: 'Year-end Settlement Preparation',
    korean: '연말정산 준비',
    description: 'Gather receipts, donation records, medical expenses, and insurance payment records. Submit documents to your employer\'s HR department for year-end tax settlement.',
    whoFiles: 'All salaried employees (including foreigners with employment income)',
    whereTo: 'Submit to your employer (회사 인사팀)',
  },
  {
    month: 2,
    day: 28,
    title: 'Year-end Settlement Filing Deadline',
    korean: '연말정산 신고 마감',
    description: 'Employers complete year-end settlement calculations and submit to the National Tax Service. You will receive a refund or owe additional tax through your February or March paycheck.',
    whoFiles: 'Employers file on behalf of employees',
    whereTo: 'Hometax (홈택스) - employer submits',
    important: true,
  },
  {
    month: 3,
    day: 31,
    title: 'Corporate Tax Filing',
    korean: '법인세 신고',
    description: 'Corporations with fiscal year ending December 31 must file corporate income tax returns. This applies to foreign-owned businesses registered in Korea.',
    whoFiles: 'Corporations and business owners (법인사업자)',
    whereTo: 'Hometax (홈택스) or local tax office (세무서)',
  },
  {
    month: 5,
    day: 1,
    endDay: 31,
    title: 'Comprehensive Income Tax Filing',
    korean: '종합소득세 신고',
    description: 'File if you have income beyond regular salary: freelance work, rental income, overseas income, investment income, or multiple sources of income. This is the most important tax deadline for many foreigners.',
    whoFiles: 'Self-employed, freelancers, those with multiple income sources, foreign nationals with overseas income',
    whereTo: 'Hometax (홈택스, hometax.go.kr) or local tax office (세무서)',
    important: true,
  },
  {
    month: 6,
    day: 1,
    endDay: 30,
    title: 'Local Income Tax + 1st Property Tax',
    korean: '지방소득세 + 재산세 1차',
    description: 'Local income tax (지방소득세) is 10% of your national income tax and filed separately. Property tax (재산세) first installment is due for property owners.',
    whoFiles: 'Same as comprehensive income tax filers + property owners',
    whereTo: 'Wetax (위택스, wetax.go.kr) for local tax; property tax bill arrives by mail',
    important: true,
  },
  {
    month: 7,
    day: 1,
    endDay: 25,
    title: 'VAT 1st Half Reporting',
    korean: '부가가치세 1기 확정신고',
    description: 'Value Added Tax reporting for the first half of the year (January-June). Applies to business owners and self-employed individuals registered for VAT.',
    whoFiles: 'Business owners and self-employed (개인사업자, 법인사업자)',
    whereTo: 'Hometax (홈택스) or local tax office (세무서)',
    important: true,
  },
  {
    month: 8,
    day: 31,
    title: 'Earned Income Tax Special Collection',
    korean: '근로소득 특별징수',
    description: 'Mid-year tax adjustment period. Employers may collect additional taxes or process adjustments for employees who had changes in income or deductions during the year.',
    whoFiles: 'Employers on behalf of employees with changes',
    whereTo: 'Processed through payroll',
  },
  {
    month: 9,
    day: 16,
    endDay: 30,
    title: '2nd Property Tax',
    korean: '재산세 2차',
    description: 'Second installment of property tax for building owners. Tax bill is mailed to registered address. Payment can be made at banks, online, or convenience stores.',
    whoFiles: 'Property owners (건물/토지 소유자)',
    whereTo: 'Wetax (위택스) or bank payment',
  },
  {
    month: 11,
    day: 1,
    endDay: 30,
    title: 'Pension Savings & Deduction Planning',
    korean: '연금저축 및 세액공제 준비',
    description: 'Last chance to maximize tax deductions by contributing to pension savings (연금저축) and IRP accounts. Maximum deduction: ₩9,000,000 combined for pension savings + IRP.',
    whoFiles: 'Anyone wanting to reduce their tax burden for the year',
    whereTo: 'Your bank or securities company (은행/증권사)',
  },
  {
    month: 12,
    day: 1,
    endDay: 31,
    title: 'Year-end Tax Planning & Donations',
    korean: '연말 세금 계획 및 기부금 영수증',
    description: 'Final month to make tax-deductible donations, gather medical receipts, and prepare for January year-end settlement. Request donation receipts (기부금 영수증) from organizations.',
    whoFiles: 'All taxpayers preparing for year-end settlement',
    whereTo: 'Collect receipts; prepare for January filing',
    important: true,
  },
];

function getDDay(month: number, day?: number): number {
  const now = new Date();
  const year = now.getFullYear();
  const targetDay = day || 1;
  const target = new Date(year, month - 1, targetDay);
  if (target < now) {
    target.setFullYear(year + 1);
  }
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getNextDeadline(): Deadline {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  for (const d of DEADLINES) {
    const endDay = d.endDay || d.day || 28;
    if (d.month > currentMonth || (d.month === currentMonth && endDay >= currentDay)) {
      return d;
    }
  }
  return DEADLINES[0];
}

const MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function TaxCalendarCalc() {
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
  const nextDeadline = useMemo(() => getNextDeadline(), []);
  const nextDDay = useMemo(() => getDDay(nextDeadline.month, nextDeadline.day), [nextDeadline]);

  function toggleMonth(month: number) {
    setExpandedMonth(expandedMonth === month ? null : month);
  }

  return (
    <>
      {/* Next Deadline Highlight */}
      <Card className="!border-2 !border-[var(--primary)]">
        <div className="text-center">
          <div className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider mb-1">Next Upcoming Deadline</div>
          <div className="text-3xl font-extrabold text-[var(--primary-dark)]">D-{nextDDay}</div>
          <div className="text-sm font-bold text-[#333] mt-1">{nextDeadline.title}</div>
          <div className="text-xs text-[var(--sub)] mt-0.5">{nextDeadline.korean}</div>
          <div className="text-xs text-[var(--sub)] mt-1">
            {MONTH_NAMES[nextDeadline.month]} {nextDeadline.day && `${nextDeadline.day}`}{nextDeadline.endDay ? `–${nextDeadline.endDay}` : ''}, 2026
          </div>
        </div>
      </Card>

      {/* Monthly Timeline */}
      <Card>
        <SectionTitle num="1">2026 Tax Calendar (세금 달력)</SectionTitle>
        <div className="flex flex-col gap-2">
          {DEADLINES.map((deadline, i) => {
            const isNext = deadline === nextDeadline;
            const dDay = getDDay(deadline.month, deadline.day);
            const isExpanded = expandedMonth === i;

            return (
              <button
                key={i}
                className={`w-full text-left px-4 py-3 rounded-xl border-[1.5px] transition-all cursor-pointer ${
                  isNext
                    ? 'border-[var(--primary)] bg-[var(--primary-weak)]'
                    : 'border-[var(--line)] hover:border-[var(--primary)]'
                }`}
                onClick={() => toggleMonth(i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-lg grid place-items-center flex-none text-xs font-extrabold ${
                      isNext ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[#4E5968]'
                    }`}>
                      {MONTH_NAMES[deadline.month].slice(0, 3).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#333] truncate">{deadline.title}</div>
                      <div className="text-xs text-[var(--sub)]">{deadline.korean}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-none ml-2">
                    {deadline.important && (
                      <span className="text-[9px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md">KEY</span>
                    )}
                    <span className={`text-xs font-bold ${isNext ? 'text-[var(--primary)]' : 'text-[var(--sub)]'}`}>
                      D-{dDay}
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[var(--line)] text-sm text-[#4E5968]" onClick={e => e.stopPropagation()}>
                    <p className="mb-2">{deadline.description}</p>
                    <div className="bg-[var(--bg)] rounded-lg p-3 space-y-1.5">
                      <div className="flex gap-2">
                        <span className="text-xs font-bold text-[var(--sub)] flex-none w-20">Period:</span>
                        <span className="text-xs">
                          {MONTH_NAMES[deadline.month]} {deadline.day || 1}{deadline.endDay ? `–${deadline.endDay}` : ''}, 2026
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs font-bold text-[var(--sub)] flex-none w-20">Who files:</span>
                        <span className="text-xs">{deadline.whoFiles}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs font-bold text-[var(--sub)] flex-none w-20">Where:</span>
                        <span className="text-xs">{deadline.whereTo}</span>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Tax Filing Guide for Foreigners in Korea</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Using Hometax (홈택스) in English:</b> Visit hometax.go.kr and select &quot;English&quot; in the top-right corner. To log in, you need either a public authentication certificate (공동인증서) from your Korean bank, or you can use simple authentication (간편인증) via KakaoTalk, PASS, or banking apps. The English version covers basic filings including comprehensive income tax.</p>
          <p><b>What Foreigners Need to File:</b> If your only income is Korean salary, your employer handles tax through year-end settlement (연말정산). You must file separately if you have: freelance income, rental income, overseas income, capital gains, or income from multiple employers. Foreigners can choose a flat 19% tax rate on all Korean-source income instead of the progressive rate (6-45%) if it is more advantageous.</p>
          <p><b>Key Deductions for Foreigners:</b> You can deduct: national pension contributions (국민연금), health insurance premiums (건강보험료), housing rent (월세 세액공제, up to ₩750,000/year), education expenses, medical expenses exceeding 3% of income, and donations to registered charities. Credit/debit card spending over 25% of income also qualifies for deductions.</p>
          <p><b>Penalties for Late Filing:</b> Missing tax deadlines results in a 10-20% penalty on unpaid tax (무신고가산세) plus daily interest of approximately 0.022% (부납부가산세). If you voluntarily file late before the tax office contacts you, penalties are reduced. Always file on time even if you cannot pay the full amount - you can arrange installment payments.</p>
          <p><b>Getting Help:</b> For complex tax situations, hire a licensed tax accountant (세무사). Fees typically range from ₩100,000-300,000 for individual filing. Your local tax office (세무서) offers free consultation during filing seasons. The National Tax Service helpline (126) provides guidance in English.</p>
          <p><b>Related Tools:</b> Use our <a href="/en/tax-comparison" className="text-[var(--primary)] font-bold underline">Tax Comparison Calculator</a> to compare flat rate vs. progressive taxation, and our <a href="/en/salary" className="text-[var(--primary)] font-bold underline">Salary Calculator</a> to understand your take-home pay after taxes.</p>
        </div>
      </Card>
    </>
  );
}
