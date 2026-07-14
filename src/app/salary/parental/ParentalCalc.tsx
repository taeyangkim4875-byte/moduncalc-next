'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';

// 2026 기준: 일반 육아휴직 통상임금 80%, 상한 160만, 하한 70만
// 6+6: 통상임금 100%, 상한 월 450만 (첫 6개월)
// 사후지급금 폐지 (2026~), 매월 전액 지급
// 최대 사용기간: 1년 6개월

export default function ParentalCalc() {
  const [wage, setWage] = useState(300);
  const [months, setMonths] = useState(12);
  const [is66, setIs66] = useState(false);
  const [result, setResult] = useState<{ monthlyList: number[]; total: number; avgMonthly: number } | null>(null);

  const calc = () => {
    const wageWon = (wage || 0) * 10000;
    const monthlyList: number[] = [];

    for (let m = 1; m <= months; m++) {
      let monthly: number;
      if (is66 && m <= 6) {
        // 6+6: 통상임금 100%, 상한 450만
        monthly = Math.min(wageWon, 4500000);
      } else {
        // 일반: 통상임금 80%, 상한 160만, 하한 70만
        monthly = Math.max(700000, Math.min(wageWon * 0.8, 1600000));
      }
      monthlyList.push(Math.round(monthly));
    }

    const total = monthlyList.reduce((s, v) => s + v, 0);
    const avgMonthly = months > 0 ? total / months : 0;

    setResult({ monthlyList, total, avgMonthly });
    scrollToResult();
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">급여 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">통상임금 (월) <span className="text-xs text-[var(--sub)] font-medium ml-1">{wage.toLocaleString()}만원</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={wage} onChange={e => setWage(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input type="range" min={100} max={700} step={10} value={wage} onChange={e => setWage(+e.target.value)} className="w-full mt-3.5" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">육아휴직 기간 <span className="text-xs text-[var(--sub)] font-medium ml-1">{months}개월</span></label>
          <input type="range" min={1} max={18} step={1} value={months} onChange={e => setMonths(+e.target.value)} className="w-full" />
          <div className="text-xs text-[var(--sub)] mt-1">최대 18개월 (2026년~)</div>
        </div>
        <div className="mb-0">
          <div className={`flex items-center justify-between gap-3 p-3.5 border-[1.5px] rounded-xl transition-colors ${is66 ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)]'}`}>
            <div>
              <div className="text-sm font-bold">6+6 부모육아휴직제</div>
              <div className="text-xs text-[var(--sub)] font-medium mt-0.5">생후 18개월 내 부모 동시/순차 휴직 시 첫 6개월 상향</div>
            </div>
            <label className="relative w-12 h-7 cursor-pointer flex-none">
              <input type="checkbox" checked={is66} onChange={e => setIs66(e.target.checked)} className="opacity-0 w-0 h-0 absolute" />
              <span className={`absolute inset-0 rounded-full transition-colors ${is66 ? 'bg-[var(--primary)]' : 'bg-[#D1D6DB]'}`}><span className={`absolute w-[22px] h-[22px] left-[3px] top-[3px] bg-white rounded-full shadow-sm transition-transform ${is66 ? 'translate-x-5' : ''}`} /></span>
            </label>
          </div>
        </div>
      </Card>

      {result && (
        <div id="calc-result">
          <div className="text-lg font-extrabold mt-4 mb-3 px-1">예상 육아휴직 급여</div>
          <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
            <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">{is66 ? '6+6 부모육아휴직제' : '일반 육아휴직'} · {months}개월</span>
            <div className="text-center py-2">
              <div className="text-sm font-bold text-[var(--sub)]">총 예상 급여</div>
              <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.total)}</div>
              <div className="text-sm text-[var(--sub)]">월 평균 {won(result.avgMonthly)}</div>
            </div>
            <div className="mt-4 border-t border-[var(--line)] pt-3.5">
              <div className="text-xs font-bold text-[var(--sub)] mb-2">월별 급여 내역</div>
              <div className="flex flex-col gap-1.5 text-[13px]">
                {result.monthlyList.map((m, i) => (
                  <div key={i} className={`flex justify-between px-3 py-1.5 rounded-lg ${is66 && i < 6 ? 'bg-[var(--primary-weak)]' : 'bg-[var(--bg)]'}`}>
                    <span className="text-[var(--sub)] font-semibold">{i + 1}개월차 {is66 && i < 6 ? '(6+6)' : ''}</span>
                    <span className="font-bold">{won(m)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {result && <ShareButtons title="육아휴직 급여" />}

      {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 육아휴직 급여를 계산해 드려요.</Card>}

      <Card>
        <SectionTitle num="📋">급여 기준표</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-xs text-[var(--sub)] font-bold">구분</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">지급률</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">상한/하한</th></tr></thead>
          <tbody>
            <tr className="border-b border-[var(--line)]"><td className="py-2 font-bold">일반 육아휴직</td><td className="py-2 text-right">통상임금 80%</td><td className="py-2 text-right">상한 160만 / 하한 70만</td></tr>
            <tr className="border-b border-[var(--line)] bg-[var(--primary-weak)]"><td className="py-2 font-bold">6+6 (첫 6개월)</td><td className="py-2 text-right">통상임금 100%</td><td className="py-2 text-right">상한 450만</td></tr>
            <tr className="border-b border-[var(--line)]"><td className="py-2 font-bold">6+6 (7개월~)</td><td className="py-2 text-right">통상임금 80%</td><td className="py-2 text-right">상한 160만 / 하한 70만</td></tr>
          </tbody>
        </table>
        <div className="text-[11px] text-[var(--sub)] mt-2">2026년 기준 · 사후지급금 폐지, 매월 전액 지급 · 최대 18개월</div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 육아휴직 급여란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">육아휴직 급여는 만 8세 이하 또는 초등학교 2학년 이하의 자녀를 가진 근로자가 육아휴직을 사용할 때 고용보험에서 지급하는 급여입니다. 2026년부터 최대 18개월까지 사용할 수 있으며, 사후지급금(25%)이 폐지되어 매월 전액 지급됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">일반 육아휴직은 통상임금의 80%(상한 월 160만원, 하한 70만원)를 지급합니다. 6+6 부모육아휴직제를 적용하면 생후 18개월 이내 자녀에 대해 부모가 동시 또는 순차적으로 휴직할 경우, 첫 6개월은 통상임금 100%(상한 월 450만원)까지 받을 수 있습니다.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 6+6 부모육아휴직제란?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 생후 18개월 이내 자녀에 대해 부모가 동시 또는 순차적으로 육아휴직 시, 첫 6개월은 통상임금 100%(상한 월 450만원)를 지급하는 제도입니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 사후지급금이 없어졌나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 2026년부터 사후지급금(25%)이 폐지되어 매월 급여 전액을 바로 받을 수 있습니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 최대 몇 개월까지 가능한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 2026년부터 최대 18개월(1년 6개월)까지 사용할 수 있습니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">추정치입니다. 정확한 금액은 고용24(work24.go.kr)에서 확인하세요.</div>
      </footer>

      <CtaButton label="급여 계산하기" onClick={calc} />
    </>
  );
}
