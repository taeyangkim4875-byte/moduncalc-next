'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

// 근로기준법 제60조 연차 계산
// 1년 미만: 1개월 개근 시 1일 (최대 11일)
// 1년 이상: 15일 + 3년 이후 매 2년마다 +1일 (최대 25일)

function calcAnnualLeave(startDate: string): { totalYears: number; totalMonths: number; annualDays: number; detail: string; yearlyBreakdown: { year: number; days: number; note: string }[] } | null {
  if (!startDate) return null;
  const start = new Date(startDate + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (start > now) return null;

  const diffMs = now.getTime() - start.getTime();
  const totalDays = Math.floor(diffMs / 864e5);
  const totalMonths = Math.floor(totalDays / 30.44);
  const totalYears = Math.floor(totalDays / 365.25);

  const yearlyBreakdown: { year: number; days: number; note: string }[] = [];

  // 1년 미만: 월차
  if (totalYears < 1) {
    const monthsWorked = Math.min(11, Math.floor(totalDays / 30.44));
    return {
      totalYears: 0,
      totalMonths: monthsWorked,
      annualDays: monthsWorked,
      detail: `입사 ${monthsWorked}개월 → 월차 ${monthsWorked}일 발생`,
      yearlyBreakdown: [{ year: 0, days: monthsWorked, note: `1년 미만 월차 (${monthsWorked}개월 개근)` }],
    };
  }

  // 1년 이상: 연차 계산
  let currentAnnual = 0;

  for (let y = 1; y <= totalYears; y++) {
    let days: number;
    let note: string;

    if (y === 1) {
      days = 15;
      note = '1년 근속 → 15일';
    } else if (y < 3) {
      days = 15;
      note = `${y}년 근속 → 15일`;
    } else {
      const extra = Math.floor((y - 1) / 2);
      days = Math.min(25, 15 + extra);
      note = `${y}년 근속 → ${days}일 (가산 +${extra}일)`;
    }
    currentAnnual = days;
    yearlyBreakdown.push({ year: y, days, note });
  }

  return {
    totalYears,
    totalMonths: totalMonths % 12,
    annualDays: currentAnnual,
    detail: `근속 ${totalYears}년 → 올해 연차 ${currentAnnual}일`,
    yearlyBreakdown,
  };
}

export default function AnnualCalc() {
  const [startDate, setStartDate] = useState('');
  const r = startDate ? calcAnnualLeave(startDate) : null;

  return (
    <>
      <Card>
        <SectionTitle num="1">입사 정보</SectionTitle>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">입사일</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none focus:border-[var(--primary)]" />
        </div>
      </Card>

      {r && (
        <Card>
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">올해 발생 연차</div>
            <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{r.annualDays}일</div>
            <div className="text-sm text-[var(--sub)]">
              근속 {r.totalYears > 0 ? `${r.totalYears}년` : ''}{r.totalMonths > 0 ? ` ${r.totalMonths}개월` : ''}
            </div>
          </div>

          <div className="bg-[var(--primary-weak)] rounded-xl p-3.5 text-center mt-3">
            <div className="text-xs text-[var(--primary-dark)] font-bold">{r.detail}</div>
          </div>

          {/* 연도별 연차 표 */}
          <div className="mt-4">
            <div className="text-xs font-bold text-[var(--sub)] mb-2">연도별 연차 발생 내역</div>
            <div className="flex flex-col gap-1.5 text-[13px]">
              {r.yearlyBreakdown.map((item) => (
                <div key={item.year} className={`flex justify-between px-3 py-2 rounded-lg ${item.year === r.totalYears ? 'bg-[var(--primary-weak)] font-extrabold' : 'bg-[var(--bg)]'}`}>
                  <span className="text-[var(--sub)] font-semibold">{item.note}</span>
                  <span className="font-bold text-[var(--primary-dark)]">{item.days}일</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* 연차 기준표 */}
      <Card>
        <SectionTitle num="📋">근로기준법 연차 기준</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-xs text-[var(--sub)] font-bold">근속</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">연차 일수</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">비고</th></tr></thead>
          <tbody>
            <tr className="border-b border-[var(--line)]"><td className="py-2">1년 미만</td><td className="py-2 text-right font-bold">최대 11일</td><td className="py-2 text-right text-[var(--sub)]">월 1일 (개근 시)</td></tr>
            <tr className="border-b border-[var(--line)]"><td className="py-2">1~2년</td><td className="py-2 text-right font-bold">15일</td><td className="py-2 text-right text-[var(--sub)]">80% 이상 출근</td></tr>
            <tr className="border-b border-[var(--line)]"><td className="py-2">3~4년</td><td className="py-2 text-right font-bold">16일</td><td className="py-2 text-right text-[var(--sub)]">+1일</td></tr>
            <tr className="border-b border-[var(--line)]"><td className="py-2">5~6년</td><td className="py-2 text-right font-bold">17일</td><td className="py-2 text-right text-[var(--sub)]">+2일</td></tr>
            <tr className="border-b border-[var(--line)]"><td className="py-2">7~8년</td><td className="py-2 text-right font-bold">18일</td><td className="py-2 text-right text-[var(--sub)]">+3일</td></tr>
            <tr className="border-b border-[var(--line)]"><td className="py-2">21년 이상</td><td className="py-2 text-right font-bold">25일</td><td className="py-2 text-right text-[var(--sub)]">최대</td></tr>
          </tbody>
        </table>
        <div className="text-[11px] text-[var(--sub)] mt-2">근로기준법 제60조 · 3년 이후 매 2년마다 1일 가산 · 최대 25일</div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 연차휴가란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">연차유급휴가는 근로기준법 제60조에 따라 근로자에게 부여되는 유급 휴일입니다. 1년 미만 근무자는 1개월 개근 시 1일의 월차가 발생하며(최대 11일), 1년 이상 근무 시 80% 이상 출근 조건으로 15일의 연차가 부여됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">3년 이상 근속하면 매 2년마다 1일씩 가산되어 최대 25일까지 늘어납니다. 미사용 연차는 발생일로부터 1년 후 소멸되며, 소멸된 연차에 대해서는 연차수당을 청구할 수 있습니다.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 1년 미만인데 연차가 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 1개월 개근 시 1일의 월차가 발생합니다. 첫 해에 최대 11일까지 사용할 수 있으며, 1년 근속 시 발생하는 15일에서 이미 사용한 월차를 차감합니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 연차는 언제 소멸하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 발생일로부터 1년간 미사용 시 소멸됩니다. 미사용 연차에 대해서는 연차수당을 청구할 수 있습니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 연차수당은 어떻게 계산하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 미사용 연차 1일당 통상임금 1일분이 지급됩니다. 통상임금 ÷ 209시간 × 8시간 = 1일 연차수당입니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">근로기준법 기준 추정치입니다. 회사별 취업규칙에 따라 다를 수 있습니다.</div>
      </footer>
    </>
  );
}
