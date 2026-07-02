'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';

const MEDIAN_2026: Record<number, number> = {1:2564238,2:4199292,3:5359036,4:6494738,5:7556719,6:8555952};
const DOHYAK_MONTHS = 60;
const MIRAE_MONTHS = 36;
const MIRAE_PAY_CAP = 500000;
const NORMAL_TAX_RATE = 0.154;

function rentInterest(monthly: number, annualRate: number, months: number) {
  return monthly * (annualRate / 12) * months * (months + 1) / 2;
}

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
  if (s <= 2400) return { limit: 400000, ratio: 0.06, label: '총급여 2,400만 이하' };
  if (s <= 3600) return { limit: 500000, ratio: 0.046, label: '총급여 3,600만 이하' };
  if (s <= 4800) return { limit: 600000, ratio: 0.037, label: '총급여 4,800만 이하' };
  if (s <= 6000) return { limit: 700000, ratio: 0.03, label: '총급여 6,000만 이하' };
  if (s <= 7500) return { limit: 0, ratio: 0, label: '비과세만 적용' };
  return null;
}

function miraeType(s: number, mr: number, sz: number, dual: boolean) {
  if (s > 7500) return { type: '이용불가', reason: 'income', rate: 0, cap: 0, label: '' };
  const ec = sz === 2 ? 250 : 200;
  if (mr > ec) return { type: '이용불가', reason: 'median', rate: 0, cap: 0, label: '' };
  let uc = 150;
  if (dual && sz === 2) uc = 200;
  if (s <= 3600 && mr <= uc) return { type: '우대형', rate: 0.12, cap: 60000, label: '우대형 (납입액 12%)' };
  let nc = 200;
  if (sz === 2) nc = 250;
  if (s <= 6000 && mr <= nc) return { type: '일반형', rate: 0.06, cap: 30000, label: '일반형 (납입액 6%)' };
  return { type: '비과세형', rate: 0, cap: 0, label: '비과세만 적용 (기여금 없음)' };
}

export default function SavingsCalculator() {
  const [state, setState] = useState({
    size: 3, salary: 3000, houseIncome: 400, dual: false, sme: false,
    pay: 70, baseRate: 4.5, varRate: 3.0, dohyakBonus: 1.5, bonusStart: 1, miraeBonus: 3.0,
  });
  const [result, setResult] = useState<string | null>(null);

  const update = (key: string, val: number | boolean) => setState(prev => ({ ...prev, [key]: val }));

  const medianRatio = () => {
    const median = MEDIAN_2026[state.size];
    return median ? (state.houseIncome * 10000 / median * 100) : 0;
  };

  const calculate = () => {
    const s = state;
    const payM = s.pay * 10000;
    const miraePayM = Math.min(payM, MIRAE_PAY_CAP);
    const incWon = s.houseIncome * 10000;
    const median = MEDIAN_2026[s.size];
    const mr = median ? (incWon / median * 100) : 9999;

    let html = '<div class="text-lg font-extrabold mt-4 mb-3 px-1">비교 결과</div>';

    if (s.salary > 7500) {
      html += '<div style="background:#FFF4E5;border-radius:12px;padding:12px 14px;font-size:13px;color:#B26A00;font-weight:600;margin-bottom:14px">총급여 7,500만원 초과 — 가입 대상이 아닙니다.</div>';
    }

    const tier = dohyakTier(s.salary);
    if (tier) {
      const ib = s.salary <= 2400 ? 0.5 : 0;
      const sched = dohyakSchedule(s.baseRate, s.varRate, s.dohyakBonus, ib, s.bonusStart);
      const segs = dohyakRateSegments(s.baseRate, s.varRate, s.dohyakBonus, ib, s.bonusStart);
      const cm = Math.min(payM, tier.limit) * tier.ratio;
      const pr = payM * DOHYAK_MONTHS, cs = cm * DOHYAK_MONTHS;
      const ip = rentInterestSchedule(payM, sched), ic = rentInterestSchedule(cm, sched);
      const is2 = ip + ic, tot = pr + cs + is2;
      const sl = segs.map(g => `${g.from}~${g.to}개월 연 ${g.rate.toFixed(1)}%`).join(' → ');

      html += `<div class="bg-white rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,.04)] p-5 mb-3.5 border-[1.5px] border-transparent hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(49,130,246,.16)] transition-all" data-amt="${tot}">
        <span class="inline-flex items-center gap-1.5 text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">만기 유지 · 5년</span>
        <h3 class="m-0 mb-1 text-[15px] font-extrabold">청년도약계좌 만기 유지</h3>
        <div class="text-[12.5px] text-[var(--sub)] mb-3.5">${tier.label} · 월 ${won(payM)} 납입</div>
        <div class="text-xs font-bold text-[var(--primary-dark)] bg-[var(--primary-weak)] rounded-[10px] p-2.5 mb-3.5 leading-relaxed">${sl}</div>
        <div class="text-3xl font-extrabold tracking-tight">${won(tot)}</div>
        <div class="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5">
          <div class="flex justify-between items-center text-[13.5px]"><span class="text-[var(--sub)] font-semibold">납입 원금</span><span class="font-bold">${won(pr)}</span></div>
          <div class="flex justify-between items-center text-[13.5px] text-[var(--violet)]"><span class="font-semibold">정부 기여금</span><span class="font-bold">${won(cs)}</span></div>
          <div class="flex justify-between items-center text-[13.5px] text-[var(--green)]"><span class="font-semibold">이자 (비과세)</span><span class="font-bold">${won(is2)}</span></div>
        </div>
      </div>`;
    }

    if (s.salary <= 7500) {
      const mt = miraeType(s.salary, mr, s.size, s.dual);
      if (mt.type !== '이용불가' && mt.type !== '비과세형' || mt.type === '비과세형') {
        if (mt.type === '이용불가') {
          html += '<div style="background:#FFF4E5;border-radius:12px;padding:12px 14px;font-size:13px;color:#B26A00;font-weight:600;margin-bottom:14px">가입 기준을 초과합니다.</div>';
        } else {
          const rate = (5 + s.miraeBonus) / 100;
          const cm = Math.min(miraePayM * mt.rate, mt.cap);
          const pr = miraePayM * MIRAE_MONTHS, cs = cm * MIRAE_MONTHS;
          const ip = rentInterest(miraePayM, rate, MIRAE_MONTHS), ic = rentInterest(cm, rate, MIRAE_MONTHS);
          const is2 = ip + ic, tot = pr + cs + is2;
          const ben = is2 + cs, sum = MIRAE_MONTHS * (MIRAE_MONTHS + 1) / 2;
          const rE = miraePayM > 0 ? ben / (miraePayM * sum / 12) : 0;
          const rT = rE / (1 - NORMAL_TAX_RATE);

          html += `<div class="bg-white rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,.04)] p-5 mb-3.5 border-[1.5px] border-transparent hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(49,130,246,.16)] transition-all" data-amt="${tot}">
            <span class="inline-flex items-center gap-1.5 text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--violet-weak)] text-[var(--violet)]">환승 · 3년</span>
            <h3 class="m-0 mb-1 text-[15px] font-extrabold">청년미래적금(2026) 환승</h3>
            <div class="text-[12.5px] text-[var(--sub)] mb-3.5">${mt.label} · 연 ${(rate * 100).toFixed(1)}% · 월 ${won(miraePayM)}</div>
            <div class="text-3xl font-extrabold tracking-tight">${won(tot)}</div>
            <div class="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5">
              <div class="flex justify-between items-center text-[13.5px]"><span class="text-[var(--sub)] font-semibold">납입 원금</span><span class="font-bold">${won(pr)}</span></div>
              <div class="flex justify-between items-center text-[13.5px] text-[var(--violet)]"><span class="font-semibold">정부 기여금 (${mt.type})</span><span class="font-bold">${won(cs)}</span></div>
              <div class="flex justify-between items-center text-[13.5px] text-[var(--green)]"><span class="font-semibold">이자 (비과세)</span><span class="font-bold">${won(is2)}</span></div>
            </div>
            ${miraePayM > 0 ? `<div class="mt-3.5 bg-[var(--primary-weak)] rounded-xl p-3.5">
              <div class="text-xs font-bold text-[var(--primary-dark)]">과세적금 환산 수익률</div>
              <div class="text-[22px] font-extrabold text-[var(--primary-dark)] tracking-tight">연 ${(rT * 100).toFixed(1)}%</div>
            </div>` : ''}
          </div>`;
        }
      }
    }

    html += '<div class="text-[11.5px] text-[var(--sub)] leading-relaxed text-center py-1 mt-0.5">추정치예요. 가입 전 공식 상품설명서를 꼭 확인하세요.</div>';
    setResult(html);
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">개인 · 가구 정보</SectionTitle>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">가구원 수</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <button key={n} onClick={() => update('size', n)}
                className={`flex-1 min-w-[54px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${state.size === n ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]' : 'bg-white border-[var(--line)] text-[var(--sub)] hover:border-[#C9D0D6]'}`}
              >{n}인</button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">본인 총급여 (연) <span className="text-xs text-[var(--sub)] font-medium ml-1">{state.salary.toLocaleString()}만원</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={state.salary} onChange={e => update('salary', +e.target.value || 0)}
              className="flex-1 w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold text-[var(--ink)] outline-none bg-white focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input type="range" min={0} max={8000} step={100} value={state.salary} onChange={e => update('salary', +e.target.value)}
            className="w-full mt-3.5" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">가구 월 소득 <span className="text-xs text-[var(--sub)] font-medium ml-1">중위소득 대비 {medianRatio().toFixed(0)}%</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={state.houseIncome} onChange={e => update('houseIncome', +e.target.value || 0)}
              className="flex-1 w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold text-[var(--ink)] outline-none bg-white focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
        </div>

        <div className="mb-4">
          <div className={`flex items-center justify-between gap-3 p-3.5 border-[1.5px] rounded-xl mb-2.5 transition-colors ${state.dual ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)]'}`}>
            <div>
              <div className="text-sm font-bold">맞벌이 가구</div>
              <div className="text-xs text-[var(--sub)] font-medium mt-0.5">2인 가구 맞벌이 시 기준 완화</div>
            </div>
            <label className="relative w-12 h-7 cursor-pointer flex-none">
              <input type="checkbox" checked={state.dual} onChange={e => update('dual', e.target.checked)} className="opacity-0 w-0 h-0 absolute" />
              <span className={`absolute inset-0 rounded-full transition-colors ${state.dual ? 'bg-[var(--primary)]' : 'bg-[#D1D6DB]'}`}>
                <span className={`absolute w-[22px] h-[22px] left-[3px] top-[3px] bg-white rounded-full shadow-sm transition-transform ${state.dual ? 'translate-x-5' : ''}`} />
              </span>
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">납입 · 금리 · 우대 조건</SectionTitle>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">월 납입액 <span className="text-xs text-[var(--sub)] font-medium ml-1">{state.pay}만원</span></label>
          <input type="range" min={0} max={70} step={1} value={state.pay} onChange={e => update('pay', +e.target.value)} className="w-full" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">청년도약 기본금리 (1~3년차)</label>
          <select value={state.baseRate} onChange={e => update('baseRate', +e.target.value)}
            className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold text-[var(--ink)] bg-white outline-none appearance-none">
            <option value={3.0}>3.0%</option><option value={3.5}>3.5%</option><option value={4.0}>4.0%</option><option value={4.5}>4.5%</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">4~5년차 변동금리</label>
          <select value={state.varRate} onChange={e => update('varRate', +e.target.value)}
            className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold text-[var(--ink)] bg-white outline-none appearance-none">
            <option value={2.0}>2.0%</option><option value={2.5}>2.5%</option><option value={3.0}>3.0%</option><option value={3.5}>3.5%</option><option value={4.0}>4.0%</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">청년도약 우대금리</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={state.dohyakBonus} min={0} max={1.5} step={0.1}
              onChange={e => update('dohyakBonus', Math.min(1.5, Math.max(0, +e.target.value || 0)))}
              className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold text-[var(--ink)] outline-none bg-white focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">%</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">우대금리 적용 시작 시점</label>
          <select value={state.bonusStart} onChange={e => update('bonusStart', +e.target.value)}
            className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold text-[var(--ink)] bg-white outline-none appearance-none">
            <option value={1}>가입 시점부터 (소급 적용)</option><option value={13}>2년차부터</option><option value={25}>3년차부터</option><option value={37}>4년차부터</option><option value={49}>5년차부터</option>
          </select>
        </div>

        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">미래적금 우대금리</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={state.miraeBonus} min={0} max={3.0} step={0.1}
              onChange={e => update('miraeBonus', Math.min(3.0, Math.max(0, +e.target.value || 0)))}
              className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold text-[var(--ink)] outline-none bg-white focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">%</span>
          </div>
          <div className="text-xs text-[var(--sub)] mt-2">기본 5.0% + 우대 최대 3.0%p = 최대 8.0%</div>
        </div>
      </Card>

      {result ? (
        <div dangerouslySetInnerHTML={{ __html: result }} />
      ) : (
        <Card className="text-center text-[var(--sub)] text-sm py-8">
          계산하기 버튼을 누르면 두 상품을 비교해 드려요.
        </Card>
      )}

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <b className="text-[#6B7684]">계산 가정</b><br />
        · 청년도약계좌: 5년 만기, 단리, 비과세, 정부 기여금 매칭<br />
        · 청년미래적금: 3년 만기, 단리, 비과세, 정부 기여금<br />
        · 중위소득 기준: 2026년 보건복지부 고시
        <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1] leading-relaxed">
          이 계산기는 공개된 정책·금리를 기반으로 한 추정치를 제공하며, 실제 수령액과 다를 수 있습니다.
        </div>
      </footer>

      <CtaButton label="실수령액 계산하기" onClick={calculate} />
    </>
  );
}
