'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';

const MEDIAN_2026: Record<number, number> = {1:2564238,2:4199292,3:5359036,4:6494738,5:7556719,6:8555952};
const MIRAE_MONTHS = 36;
const MIRAE_PAY_CAP = 500000;
const NORMAL_TAX_RATE = 0.154;

function rentInterest(monthly: number, annualRate: number, months: number) {
  return monthly * (annualRate / 12) * months * (months + 1) / 2;
}

function miraeType(s: number, mr: number, sz: number, dual: boolean) {
  if (s > 7500) return { type: '이용불가', rate: 0, cap: 0, label: '' };
  const ec = sz === 2 ? 250 : 200;
  if (mr > ec) return { type: '이용불가', rate: 0, cap: 0, label: '' };
  let uc = 150;
  if (dual && sz === 2) uc = 200;
  if (s <= 3600 && mr <= uc) return { type: '우대형', rate: 0.12, cap: 60000, label: '우대형 (납입액 12%)' };
  let nc = 200; if (sz === 2) nc = 250;
  if (s <= 6000 && mr <= nc) return { type: '일반형', rate: 0.06, cap: 30000, label: '일반형 (납입액 6%)' };
  return { type: '비과세형', rate: 0, cap: 0, label: '비과세만 (기여금 없음)' };
}

// 은행별 우대금리 데이터 (2026년 6월 기준)
interface BankRate {
  name: string;
  group: 1 | 2;
  maxBonus: number;
  items: { label: string; rate: number; desc: string }[];
}

// 2026.06 기준 · 출처: 금융위원회 공시, 은행연합회, 각 은행 상품설명서
const BANKS: BankRate[] = [
  { name: 'KB국민', group: 1, maxBonus: 3.0, items: [
    { label: '소득우대', rate: 0.5, desc: '총급여 3,600만(종합소득 2,600만)원 이하' },
    { label: '재무상담', rate: 0.2, desc: '청년 재무상담 프로그램 이수' },
    { label: '급여이체', rate: 1.0, desc: 'KB입출금 통장 급여 입금 12회 이상' },
    { label: '출금실적', rate: 0.8, desc: '공과금 자동이체·KB카드 결제 등 출금 12회 이상' },
    { label: '거래감사', rate: 0.5, desc: '만기 전전월 말 KB 거래 실적 충족' },
  ]},
  { name: 'NH농협', group: 1, maxBonus: 3.0, items: [
    { label: '소득우대', rate: 0.5, desc: '총급여 3,600만(종합소득 2,600만)원 이하' },
    { label: '재무상담', rate: 0.2, desc: '청년 재무상담 프로그램 이수' },
    { label: '급여·대금이체', rate: 1.0, desc: '급여 또는 사업자대금 이체 실적' },
    { label: '카드실적', rate: 0.7, desc: 'NH카드 월 20만원 이상 결제' },
    { label: '신규가입', rate: 0.3, desc: 'NH 첫 적금 가입 또는 도약 연계' },
    { label: '마이데이터', rate: 0.3, desc: 'NH마이데이터 서비스 가입' },
  ]},
  { name: '신한', group: 1, maxBonus: 3.0, items: [
    { label: '소득우대', rate: 0.5, desc: '총급여 3,600만(종합소득 2,600만)원 이하' },
    { label: '재무상담', rate: 0.2, desc: '청년 재무상담 프로그램 이수' },
    { label: '급여이체', rate: 0.3, desc: '신한은행 급여이체 18개월 이상' },
    { label: '카드이용', rate: 0.2, desc: '신한카드 이용 18개월 이상' },
    { label: '갈아타기', rate: 1.3, desc: '도약계좌 연계가입 시 (최초 신청기간 한정)' },
    { label: '증권거래', rate: 0.5, desc: '신한투자증권 3개월 이상 거래' },
  ]},
  { name: '하나', group: 1, maxBonus: 3.0, items: [
    { label: '소득우대', rate: 0.5, desc: '총급여 3,600만(종합소득 2,600만)원 이하' },
    { label: '재무상담', rate: 0.2, desc: '청년 재무상담 프로그램 이수' },
    { label: '급여이체', rate: 1.2, desc: '급여(월 50만 이상) 이체 24회 이상' },
    { label: '카드결제', rate: 0.6, desc: '하나카드 결제 24회 이상' },
    { label: '예적금미보유', rate: 0.5, desc: '직전 1년 하나은행 예적금 미보유' },
  ]},
  { name: '우리', group: 1, maxBonus: 3.0, items: [
    { label: '소득우대', rate: 0.5, desc: '총급여 3,600만(종합소득 2,600만)원 이하' },
    { label: '재무상담', rate: 0.2, desc: '청년 재무상담 프로그램 이수' },
    { label: '급여이체', rate: 1.5, desc: '우리은행 소득 입금 실적' },
    { label: '카드이용', rate: 0.5, desc: '우리카드 월 10만원 이상 결제' },
    { label: '출시기념', rate: 0.3, desc: '출시 기념 우대 (한정 기간)' },
  ]},
  { name: 'IBK기업', group: 1, maxBonus: 3.0, items: [
    { label: '소득우대', rate: 0.5, desc: '총급여 3,600만(종합소득 2,600만)원 이하' },
    { label: '재무상담', rate: 0.2, desc: '청년 재무상담 프로그램 이수' },
    { label: '급여이체', rate: 0.8, desc: 'IBK 급여이체 실적' },
    { label: '카드이용', rate: 0.5, desc: 'IBK카드 결제 실적' },
    { label: '중소기업재직', rate: 0.5, desc: '중소기업 재직 청년 추가 우대' },
    { label: '연계가입', rate: 0.5, desc: '도약계좌 연계 또는 첫 적금' },
  ]},
  { name: '우체국', group: 1, maxBonus: 3.0, items: [
    { label: '소득우대', rate: 0.5, desc: '총급여 3,600만(종합소득 2,600만)원 이하' },
    { label: '재무상담', rate: 0.2, desc: '청년 재무상담 프로그램 이수' },
    { label: '급여이체', rate: 0.8, desc: '우체국 급여이체 실적' },
    { label: '거래실적', rate: 1.0, desc: '우체국 예적금·보험 거래 실적' },
    { label: '자동이체', rate: 0.5, desc: '공과금 자동이체 실적' },
  ]},
  { name: '카카오뱅크', group: 2, maxBonus: 2.0, items: [
    { label: '소득우대', rate: 0.5, desc: '총급여 3,600만(종합소득 2,600만)원 이하' },
    { label: '재무상담', rate: 0.2, desc: '청년 재무상담 프로그램 이수' },
    { label: '급여이체', rate: 0.5, desc: '카카오뱅크 급여이체 실적' },
    { label: '거래실적', rate: 0.8, desc: '카카오뱅크 자유적금·체크카드 등 거래' },
  ]},
];

export default function MiraeCalculator() {
  const [state, setState] = useState({
    size: 3, salary: 3000, houseIncome: 400, dual: false,
    pay: 50, bank: 0, // bank index
    checkedItems: {} as Record<string, boolean>,
  });
  const [result, setResult] = useState<{total:number;principal:number;contrib:number;interest:number;rate:number;mt:ReturnType<typeof miraeType>;rTaxAdj:number}|null>(null);

  const update = (key: string, val: number | boolean) => setState(prev => ({ ...prev, [key]: val }));
  const bank = BANKS[state.bank];
  const checkedBonus = bank.items.reduce((sum, item) => sum + (state.checkedItems[`${state.bank}-${item.label}`] ? item.rate : 0), 0);
  const totalBonus = Math.min(checkedBonus, bank.maxBonus);
  const totalRate = 5.0 + totalBonus;

  const toggleItem = (label: string) => {
    const key = `${state.bank}-${label}`;
    setState(prev => ({ ...prev, checkedItems: { ...prev.checkedItems, [key]: !prev.checkedItems[key] } }));
  };

  const medianRatio = () => {
    const median = MEDIAN_2026[state.size];
    return median ? (state.houseIncome * 10000 / median * 100) : 0;
  };

  const calculate = () => {
    const s = state;
    const payM = Math.min(s.pay * 10000, MIRAE_PAY_CAP);
    const mr = medianRatio();
    const mt = miraeType(s.salary, mr, s.size, s.dual);
    if (mt.type === '이용불가') { setResult(null); return; }

    const rate = totalRate / 100;
    const cm = Math.min(payM * mt.rate, mt.cap);
    const principal = payM * MIRAE_MONTHS;
    const contrib = cm * MIRAE_MONTHS;
    const ip = rentInterest(payM, rate, MIRAE_MONTHS);
    const ic = rentInterest(cm, rate, MIRAE_MONTHS);
    const interest = ip + ic;
    const total = principal + contrib + interest;
    const ben = interest + contrib;
    const sum = MIRAE_MONTHS * (MIRAE_MONTHS + 1) / 2;
    const rEff = payM > 0 ? ben / (payM * sum / 12) : 0;
    const rTaxAdj = rEff / (1 - NORMAL_TAX_RATE);

    setResult({ total, principal, contrib, interest, rate: totalRate, mt, rTaxAdj });
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
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">가구 월 소득 <span className="text-xs text-[var(--sub)] font-medium ml-1">중위소득 대비 {medianRatio().toFixed(0)}%</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={state.houseIncome} onChange={e => update('houseIncome', +e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
        </div>
        <div className="mb-0">
          <div className={`flex items-center justify-between gap-3 p-3.5 border-[1.5px] rounded-xl transition-colors ${state.dual ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)]'}`}>
            <div><div className="text-sm font-bold">맞벌이 가구</div><div className="text-xs text-[var(--sub)] font-medium mt-0.5">2인 가구 우대형 기준 완화</div></div>
            <label className="relative w-12 h-7 cursor-pointer flex-none">
              <input type="checkbox" checked={state.dual} onChange={e => update('dual', e.target.checked)} className="opacity-0 w-0 h-0 absolute" />
              <span className={`absolute inset-0 rounded-full transition-colors ${state.dual ? 'bg-[var(--primary)]' : 'bg-[#D1D6DB]'}`}><span className={`absolute w-[22px] h-[22px] left-[3px] top-[3px] bg-white rounded-full shadow-sm transition-transform ${state.dual ? 'translate-x-5' : ''}`} /></span>
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">납입 · 은행 선택</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">월 납입액 <span className="text-xs text-[var(--sub)] font-medium ml-1">{state.pay}만원</span></label>
          <input type="range" min={0} max={50} step={1} value={state.pay} onChange={e => update('pay', +e.target.value)} className="w-full" />
          <div className="text-xs text-[var(--sub)] mt-1">최대 50만원</div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">은행 선택</label>
          <div className="grid grid-cols-4 gap-1.5">
            {BANKS.map((b, i) => (
              <button key={i} onClick={() => setState(prev => ({ ...prev, bank: i, checkedItems: {} }))} className={`py-2.5 px-1 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-all ${state.bank === i ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]' : 'bg-white border-[var(--line)] text-[var(--sub)]'}`}>
                {b.name}
                <div className="text-[10px] mt-0.5 font-medium">{b.group === 1 ? '최대 8%' : '최대 7%'}</div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 선택된 은행의 우대금리 체크리스트 */}
      <Card>
        <SectionTitle num="3">{bank.name} 우대금리 선택</SectionTitle>
        <div className="text-xs text-[var(--sub)] mb-3">충족 가능한 우대 조건을 체크하세요 (최대 {bank.maxBonus}%p)</div>
        <div className="flex flex-col gap-2">
          {bank.items.map(item => {
            const key = `${state.bank}-${item.label}`;
            const checked = !!state.checkedItems[key];
            return (
              <button key={item.label} onClick={() => toggleItem(item.label)} className={`flex items-center gap-3 p-3 border-[1.5px] rounded-xl text-left cursor-pointer transition-all ${checked ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)] bg-white'}`}>
                <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-none text-xs ${checked ? 'border-[var(--primary)] bg-[var(--primary)] text-white' : 'border-[var(--line)]'}`}>{checked ? '✓' : ''}</span>
                <div className="flex-1">
                  <div className="text-sm font-bold">{item.label} <span className="text-[var(--primary)] ml-1">+{item.rate}%p</span></div>
                  <div className="text-xs text-[var(--sub)] mt-0.5">{item.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-3 bg-[var(--primary-weak)] rounded-xl p-3.5 text-center">
          <div className="text-xs text-[var(--primary-dark)] font-bold">적용 금리</div>
          <div className="text-2xl font-extrabold text-[var(--primary-dark)]">연 {totalRate.toFixed(1)}%</div>
          <div className="text-xs text-[var(--sub)] mt-1">기본 5.0% + 우대 {totalBonus.toFixed(1)}%p</div>
        </div>
      </Card>

      {result && (
        <div>
          <div className="text-lg font-extrabold mt-4 mb-3 px-1">미래적금 만기 수령액</div>
          <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--violet)]">
            <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--violet-weak)] text-[var(--violet)]">만기 3년 · {result.mt.label}</span>
            <div className="text-sm text-[var(--sub)] mb-2">{bank.name}은행 · 연 {result.rate.toFixed(1)}%</div>
            <div className="text-[32px] font-extrabold tracking-tight">{won(result.total)}</div>
            <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">납입 원금</span><span className="font-bold">{won(result.principal)}</span></div>
              <div className="flex justify-between text-[var(--violet)]"><span className="font-semibold">정부 기여금 ({result.mt.type})</span><span className="font-bold">{won(result.contrib)}</span></div>
              <div className="flex justify-between text-[var(--green)]"><span className="font-semibold">이자 (비과세)</span><span className="font-bold">{won(result.interest)}</span></div>
            </div>
            <div className="mt-3.5 bg-[var(--violet-weak)] rounded-xl p-3.5">
              <div className="text-xs font-bold text-[var(--violet)]">과세적금 환산 수익률</div>
              <div className="text-[22px] font-extrabold text-[var(--violet)]">연 {(result.rTaxAdj * 100).toFixed(1)}%</div>
              <div className="text-[11px] text-[var(--sub)] mt-1">기여금·비과세 포함, 일반 적금(15.4% 과세) 대비</div>
            </div>
          </div>
        </div>
      )}

      {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">은행을 선택하고 우대 조건을 체크한 후 계산해 보세요.</Card>}

      {/* 은행별 금리 비교표 */}
      <Card>
        <SectionTitle num="📊">은행별 최대 금리 비교</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-xs text-[var(--sub)] font-bold">은행</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">그룹</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">최대 금리</th></tr></thead>
          <tbody>
            {BANKS.map((b, i) => (
              <tr key={i} className={`border-b border-[var(--line)] ${state.bank === i ? 'bg-[var(--primary-weak)] font-extrabold' : ''}`}>
                <td className="py-2 font-bold">{b.name}</td>
                <td className="py-2 text-right">{b.group}그룹</td>
                <td className="py-2 text-right text-[var(--primary-dark)] font-extrabold">{(5.0 + b.maxBonus).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-[11px] text-[var(--sub)] mt-2">1그룹: 최대 우대 3%p (8%), 2그룹: 최대 우대 2%p (7%)</div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 청년미래적금이란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">청년미래적금은 2026년 출시된 3년 만기 정책 적금으로, 기본금리 5.0%에 은행별 우대금리 최대 3.0%p를 더해 최대 연 8.0%의 고금리를 제공합니다. 정부 기여금도 소득 구간에 따라 납입액의 6~12%가 매칭 지급됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">가입 자격은 만 19~34세, 총급여 7,500만원 이하, 가구 중위소득 200% 이하입니다. 은행 선택 시 최고 금리보다 <b>3년간 우대 조건을 실제로 충족할 수 있는지</b>가 더 중요합니다.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 우대금리를 중간에 못 채우면?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 충족하지 못한 항목의 우대금리만 빠지고, 기본금리 5%와 나머지 우대금리는 유지됩니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 도약계좌에서 환승할 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 환승은 최초 신청 기간(2026.6.22~7.3)에 <b>단 한 번만</b> 가능했습니다. 반드시 미래적금 가입 신청 → 대상 확인 → 계좌 개설 후에 도약계좌를 특별중도해지해야 합니다. 도약계좌를 먼저 해지하면 환승 혜택을 받을 수 없습니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 어떤 은행이 가장 유리한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 금리 자체는 1그룹 은행이 동일(최대 8%)이지만, 우대 조건 달성 난이도가 다릅니다. 주거래 은행을 선택하는 것이 가장 현실적입니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">은행별 우대금리 조건은 2026년 6월 기준이며, 변경될 수 있습니다. 정확한 조건은 해당 은행에서 확인하세요.</div>
      </footer>

      <CtaButton label="만기 수령액 계산하기" onClick={calculate} />
    </>
  );
}
