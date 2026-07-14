'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';

const fmtBig = (n: number) => {
  if (n >= 100000000) {
    const uk = Math.floor(n / 100000000);
    const man = Math.round((n % 100000000) / 10000);
    return man > 0 ? `${uk}억 ${man.toLocaleString()}만` : `${uk}억`;
  }
  return `${Math.round(n / 10000).toLocaleString()}만`;
};

export default function LifetimeCalc() {
  const [age, setAge] = useState(30);
  const [monthlySalary, setMonthlySalary] = useState(300);
  const [retireAge, setRetireAge] = useState(60);
  const [raiseRate, setRaiseRate] = useState(3);
  const [result, setResult] = useState<{
    totalGross: number; totalNet: number; remainingMonths: number;
    peakSalary: number; peakAge: number; avgMonthly: number;
    yearlyData: { age: number; annual: number; cumulative: number }[];
  } | null>(null);

  const calc = () => {
    const years = Math.max(0, retireAge - age);
    if (years <= 0) return;

    let totalGross = 0;
    let currentMonthly = monthlySalary * 10000;
    let peakSalary = currentMonthly;
    let peakAge = age;
    const yearlyData: { age: number; annual: number; cumulative: number }[] = [];

    for (let y = 0; y < years; y++) {
      const annual = currentMonthly * 12;
      totalGross += annual;
      if (currentMonthly > peakSalary) { peakSalary = currentMonthly; peakAge = age + y; }
      yearlyData.push({ age: age + y, annual, cumulative: totalGross });
      currentMonthly *= (1 + raiseRate / 100);
    }

    // 세후 대략 추정 (평균 실효세율 약 20~25% 적용)
    const avgAnnual = totalGross / years;
    let effectiveRate: number;
    if (avgAnnual <= 30000000) effectiveRate = 0.12;
    else if (avgAnnual <= 50000000) effectiveRate = 0.18;
    else if (avgAnnual <= 80000000) effectiveRate = 0.22;
    else if (avgAnnual <= 120000000) effectiveRate = 0.26;
    else effectiveRate = 0.30;
    const totalNet = totalGross * (1 - effectiveRate);

    const remainingMonths = years * 12;
    const avgMonthly = totalGross / remainingMonths;

    setResult({ totalGross, totalNet, remainingMonths, peakSalary, peakAge, avgMonthly, yearlyData });
    scrollToResult();
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">내 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">현재 나이 <span className="text-xs text-[var(--sub)] font-medium ml-1">{age}세</span></label>
          <input type="range" min={18} max={60} step={1} value={age} onChange={e => setAge(+e.target.value)} className="w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">현재 월급 (세전)</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={monthlySalary} onChange={e => setMonthlySalary(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input type="range" min={100} max={1000} step={10} value={monthlySalary} onChange={e => setMonthlySalary(+e.target.value)} className="w-full mt-3.5" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">예상 은퇴 나이 <span className="text-xs text-[var(--sub)] font-medium ml-1">{retireAge}세</span></label>
          <input type="range" min={Math.max(age + 1, 40)} max={70} step={1} value={retireAge} onChange={e => setRetireAge(+e.target.value)} className="w-full" />
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">연간 임금 상승률 <span className="text-xs text-[var(--sub)] font-medium ml-1">{raiseRate}%</span></label>
          <input type="range" min={0} max={10} step={0.5} value={raiseRate} onChange={e => setRaiseRate(+e.target.value)} className="w-full" />
          <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1"><span>동결 (0%)</span><span>평균 (3%)</span><span>고성장 (10%)</span></div>
        </div>
      </Card>

      {result && (
        <div id="calc-result">
          <div className="text-lg font-extrabold mt-4 mb-3 px-1">💰 평생 근로소득</div>
          <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
            <div className="text-center py-2">
              <div className="text-sm font-bold text-[var(--sub)]">은퇴까지 총 근로소득 (세전)</div>
              <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{fmtBig(result.totalGross)}원</div>
              <div className="text-sm text-[var(--sub)]">{age}세 → {retireAge}세 · {retireAge - age}년간</div>
            </div>

            <div className="mt-3 bg-[var(--green-weak)] rounded-xl p-3.5 text-center">
              <div className="text-xs font-bold text-[var(--green)]">세후 실수령 총액 (추정)</div>
              <div className="text-2xl font-extrabold text-[var(--green)]">{fmtBig(result.totalNet)}원</div>
            </div>

            <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">남은 월급날</span><span className="font-bold text-[var(--primary-dark)]">{result.remainingMonths}번</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">평균 월급</span><span className="font-bold">{fmtBig(result.avgMonthly)}원</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">최고 연봉 시점</span><span className="font-bold">{result.peakAge}세 · 월 {fmtBig(result.peakSalary)}원</span></div>
            </div>
          </div>

          {/* 연봉 성장 추이 */}
          <Card>
            <div className="text-xs font-bold text-[var(--sub)] mb-2">연봉 성장 추이</div>
            <div className="flex flex-col gap-1">
              {result.yearlyData.filter((_, i) => i % Math.max(1, Math.floor(result.yearlyData.length / 12)) === 0 || i === result.yearlyData.length - 1).map((d, i) => {
                const maxAnnual = result.yearlyData[result.yearlyData.length - 1].annual;
                const pct = maxAnnual > 0 ? (d.annual / maxAnnual) * 100 : 0;
                return (
                  <div key={i} className="flex items-center gap-2 text-[11px]">
                    <span className="w-8 text-right font-bold text-[var(--sub)]">{d.age}세</span>
                    <div className="flex-1 h-4 bg-[var(--bg)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-20 text-right font-bold">{fmtBig(d.annual)}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 누적 소득 마일스톤 */}
          <Card>
            <div className="text-xs font-bold text-[var(--sub)] mb-2">누적 소득 마일스톤</div>
            <div className="flex flex-col gap-1.5 text-[13px]">
              {[100000000, 500000000, 1000000000, 2000000000, 3000000000].map(milestone => {
                const d = result.yearlyData.find(y => y.cumulative >= milestone);
                if (!d) return null;
                return (
                  <div key={milestone} className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2">
                    <span className="text-[var(--sub)] font-semibold">{fmtBig(milestone)}원 돌파</span>
                    <span className="font-bold text-[var(--primary-dark)]">{d.age}세</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
      {result && <ShareButtons title="평생 근로소득" />}

      {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 평생 근로소득을 계산해 드려요.</Card>}

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 평생 근로소득이란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">평생 근로소득은 직장 생활을 시작해서 은퇴할 때까지 받는 급여의 총합입니다. 매년 임금 상승률을 반영하면 초반에는 적지만 후반으로 갈수록 연봉이 커지는 복리 효과가 나타납니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">한국 직장인의 평균 근속 기간은 약 30년이며, 임금 상승률은 업종·직급에 따라 다르지만 평균 2~4% 수준입니다. 연봉 3,600만원(월 300만원)으로 30년간 연 3% 상승 시 평생 총 근로소득은 약 17억원입니다.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 임금 상승률은 어느 정도가 현실적인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 일반 직장인은 연 2~4%, 고성장 직군(IT, 금융)은 5~8%, 공무원·공기업은 1~3% 정도가 현실적입니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 세후 실수령은 정확한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 평균 실효세율로 추정한 값입니다. 정확한 세후 금액은 연봉 구간, 공제 항목에 따라 달라집니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 이직하면 어떻게 되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 이직 시 연봉이 크게 오르면 임금 상승률을 높게, 현직 유지라면 낮게 설정해서 비교해보세요.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">시뮬레이션 결과이며, 실제 소득은 이직·승진·경기 변동에 따라 달라집니다.</div>
      </footer>

      <CtaButton label="💰 평생 소득 계산하기" onClick={calc} />
    </>
  );
}
