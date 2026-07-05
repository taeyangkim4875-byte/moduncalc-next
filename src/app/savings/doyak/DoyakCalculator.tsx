'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';

const MEDIAN_2026: Record<number, number> = {1:2564238,2:4199292,3:5359036,4:6494738,5:7556719,6:8555952};
const DOHYAK_MONTHS = 60;

function rentInterestSchedule(monthly: number, rateArr: number[]) {
  let acc = 0;
  for (let m = 1; m <= rateArr.length; m++) acc += (rateArr[m - 1] / 12) * m;
  return monthly * acc;
}

function dohyakSchedule(baseRate: number, varRate: number, bonus: number, incomeBonus: number, startMonth: number) {
  const arr: number[] = [];
  for (let m = 1; m <= 60; m++) {
    const base = m <= 36 ? baseRate : varRate;
    const bn = m >= startMonth ? bonus : 0;
    arr.push((base + bn + incomeBonus) / 100);
  }
  return arr;
}

function dohyakRateSegments(baseRate: number, varRate: number, bonus: number, incomeBonus: number, startMonth: number) {
  const bounds = [...new Set([1, startMonth, 37].filter(x => x >= 1 && x <= 60))].sort((a, b) => a - b);
  return bounds.map((from, i) => {
    const to = i + 1 < bounds.length ? bounds[i + 1] - 1 : 60;
    const base = from <= 36 ? baseRate : varRate;
    const bn = from >= startMonth ? bonus : 0;
    return { from, to, rate: base + bn + incomeBonus };
  });
}

function dohyakTier(s: number) {
  if (s <= 2400) return { limit: 400000, ratio: 0.06, label: '총급여 2,400만 이하', desc: '월 최대 2.4만원' };
  if (s <= 3600) return { limit: 500000, ratio: 0.046, label: '총급여 3,600만 이하', desc: '월 최대 2.3만원' };
  if (s <= 4800) return { limit: 600000, ratio: 0.037, label: '총급여 4,800만 이하', desc: '월 최대 2.22만원' };
  if (s <= 6000) return { limit: 700000, ratio: 0.03, label: '총급여 6,000만 이하', desc: '월 최대 2.1만원' };
  if (s <= 7500) return { limit: 0, ratio: 0, label: '비과세만 적용', desc: '기여금 없음' };
  return null;
}

export default function DoyakCalculator() {
  const [state, setState] = useState({
    size: 3, salary: 3000, houseIncome: 400,
    pay: 70, baseRate: 4.5, varRate: 3.0, dohyakBonus: 1.5, bonusStart: 1,
  });
  const [result, setResult] = useState<{total:number;principal:number;contrib:number;interest:number;segLabel:string;tier:ReturnType<typeof dohyakTier>}|null>(null);

  const update = (key: string, val: number) => setState(prev => ({ ...prev, [key]: val }));

  const medianRatio = () => {
    const median = MEDIAN_2026[state.size];
    return median ? (state.houseIncome * 10000 / median * 100) : 0;
  };

  const calculate = () => {
    const s = state;
    const payM = s.pay * 10000;
    const tier = dohyakTier(s.salary);
    if (!tier) return;

    const incomeBonus = s.salary <= 2400 ? 0.5 : 0;
    const sched = dohyakSchedule(s.baseRate, s.varRate, s.dohyakBonus, incomeBonus, s.bonusStart);
    const segs = dohyakRateSegments(s.baseRate, s.varRate, s.dohyakBonus, incomeBonus, s.bonusStart);
    const cm = Math.min(payM, tier.limit) * tier.ratio;
    const principal = payM * DOHYAK_MONTHS;
    const contrib = cm * DOHYAK_MONTHS;
    const ip = rentInterestSchedule(payM, sched);
    const ic = rentInterestSchedule(cm, sched);
    const interest = ip + ic;
    const total = principal + contrib + interest;
    const segLabel = segs.map(g => `${g.from}~${g.to}개월 연 ${g.rate.toFixed(1)}%`).join(' → ');

    setResult({ total, principal, contrib, interest, segLabel, tier });
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">개인 · 가구 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">가구원 수</label>
          <div className="flex flex-wrap gap-2">
            {[1,2,3,4,5,6].map(n => (
              <button key={n} onClick={() => update('size', n)} className={`flex-1 min-w-[54px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${state.size === n ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]' : 'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{n}인</button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">본인 총급여 (연) <span className="text-xs text-[var(--sub)] font-medium ml-1">{state.salary.toLocaleString()}만원</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={state.salary} onChange={e => update('salary', +e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input type="range" min={0} max={8000} step={100} value={state.salary} onChange={e => update('salary', +e.target.value)} className="w-full mt-3.5" />
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">가구 월 소득 <span className="text-xs text-[var(--sub)] font-medium ml-1">중위소득 대비 {medianRatio().toFixed(0)}%</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={state.houseIncome} onChange={e => update('houseIncome', +e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">납입 · 금리 조건</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">월 납입액 <span className="text-xs text-[var(--sub)] font-medium ml-1">{state.pay}만원</span></label>
          <input type="range" min={0} max={70} step={1} value={state.pay} onChange={e => update('pay', +e.target.value)} className="w-full" />
          <div className="text-xs text-[var(--sub)] mt-1">최대 70만원</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">기본금리 (1~3년차)</label>
          <select value={state.baseRate} onChange={e => update('baseRate', +e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
            <option value={3.0}>3.0%</option><option value={3.5}>3.5%</option><option value={4.0}>4.0%</option><option value={4.5}>4.5%</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">4~5년차 변동금리</label>
          <select value={state.varRate} onChange={e => update('varRate', +e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
            <option value={2.0}>2.0%</option><option value={2.5}>2.5%</option><option value={3.0}>3.0%</option><option value={3.5}>3.5%</option><option value={4.0}>4.0%</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">은행 우대금리 <span className="text-xs text-[var(--sub)] font-medium ml-1">최대 1.5%p</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={state.dohyakBonus} min={0} max={1.5} step={0.1} onChange={e => update('dohyakBonus', Math.min(1.5, Math.max(0, +e.target.value || 0)))} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">%</span>
          </div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">우대금리 적용 시작</label>
          <select value={state.bonusStart} onChange={e => update('bonusStart', +e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
            <option value={1}>가입 시점부터 (소급)</option><option value={13}>2년차부터</option><option value={25}>3년차부터</option><option value={37}>4년차부터</option><option value={49}>5년차부터</option>
          </select>
        </div>
      </Card>

      {/* 정부 기여금 구간 표 */}
      <Card>
        <SectionTitle num="📋">정부 기여금 구간</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-xs text-[var(--sub)] font-bold">총급여</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">매칭 한도</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">비율</th></tr></thead>
          <tbody>
            {[
              ['2,400만 이하','40만','6.0%'],['2,400~3,600만','50만','4.6%'],['3,600~4,800만','60만','3.7%'],['4,800~6,000만','70만','3.0%'],['6,000~7,500만','-','비과세만'],
            ].map(([g,l,r],i) => (
              <tr key={i} className={`border-b border-[var(--line)] ${state.salary <= [2400,3600,4800,6000,7500][i] && (i === 0 || state.salary > [0,2400,3600,4800,6000][i]) ? 'bg-[var(--primary-weak)] font-extrabold' : ''}`}>
                <td className="py-2">{g}</td><td className="py-2 text-right">{l}</td><td className="py-2 text-right">{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {result && (
        <div>
          <div className="text-lg font-extrabold mt-4 mb-3 px-1">도약계좌 만기 수령액</div>
          <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
            <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">만기 5년 · {result.tier?.label}</span>
            <div className="text-xs font-bold text-[var(--primary-dark)] bg-[var(--primary-weak)] rounded-[10px] p-2.5 mb-3.5 leading-relaxed">{result.segLabel}</div>
            <div className="text-[32px] font-extrabold tracking-tight">{won(result.total)}</div>
            <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">납입 원금</span><span className="font-bold">{won(result.principal)}</span></div>
              <div className="flex justify-between text-[var(--violet)]"><span className="font-semibold">정부 기여금</span><span className="font-bold">{won(result.contrib)}</span></div>
              <div className="flex justify-between text-[var(--green)]"><span className="font-semibold">이자 (비과세)</span><span className="font-bold">{won(result.interest)}</span></div>
            </div>
          </div>
        </div>
      )}

      {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 만기 수령액을 계산해 드려요.</Card>}

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 청년도약계좌란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">청년도약계좌는 만 19~34세 청년이 매월 최대 70만원을 5년간 납입하면 정부 기여금과 비과세 혜택을 받을 수 있는 정책 금융상품입니다. 1~3년차는 고정금리, 4~5년차는 변동금리가 적용되며, 우대금리는 충족 시점부터 적용됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">정부 기여금은 소득 구간에 따라 납입액의 3~6%가 매칭 지급됩니다. 총급여 6,000만원 초과~7,500만원 이하는 비과세 혜택만 적용됩니다.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 중도해지하면 어떻게 되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 정부 기여금 반환 + 이자 과세(15.4%). 특별중도해지 사유(결혼, 출산 등) 시 기여금 유지 가능.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 우대금리는 언제부터 적용되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 대부분 조건 충족 시점부터 적용됩니다. 일부 은행은 만기 소급 적용하므로 은행별 확인이 필요합니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">추정치입니다. 정확한 금액은 해당 은행 상품설명서를 확인하세요.</div>
      </footer>

      <CtaButton label="만기 수령액 계산하기" onClick={calculate} />
    </>
  );
}
