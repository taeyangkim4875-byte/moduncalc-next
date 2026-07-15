'use client';

import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';

const MEDIAN_2026: Record<number, number> = {1:2564238,2:4199292,3:5359036,4:6494738,5:7556719,6:8555952};
const DOHYAK_MONTHS = 60;

function rentInterestSchedule(monthly: number, rateArr: number[]) {
  const n = rateArr.length;
  let acc = 0;
  for (let m = 1; m <= n; m++) acc += (rateArr[m - 1] / 12) * (n - m + 1);
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
    pay: 70, baseRate: 4.5, varRate: 3.0, dohyakBonus: 1.5, bonusStart: 13,
  });
  const [result, setResult] = useState<{total:number;principal:number;contrib:number;interest:number;segLabel:string;tier:ReturnType<typeof dohyakTier>}|null>(null);
  const [currentResult, setCurrentResult] = useState<{months:number;principal:number;contrib:number;interest:number;total:number;monthlyData:{m:number;principal:number;contrib:number;interest:number;total:number}[]}|null>(null);
  const [elapsedMonths, setElapsedMonths] = useState(12);
  const [autoCalc, setAutoCalc] = useState(false);

  useEffect(() => {
    const p = getParams();
    if (!Object.keys(p).length) return;
    setState(prev => ({
      ...prev,
      ...(p.size ? { size: +p.size } : {}),
      ...(p.salary ? { salary: +p.salary } : {}),
      ...(p.houseIncome ? { houseIncome: +p.houseIncome } : {}),
      ...(p.pay ? { pay: +p.pay } : {}),
      ...(p.baseRate ? { baseRate: +p.baseRate } : {}),
      ...(p.varRate ? { varRate: +p.varRate } : {}),
      ...(p.dohyakBonus ? { dohyakBonus: +p.dohyakBonus } : {}),
      ...(p.bonusStart ? { bonusStart: +p.bonusStart } : {}),
    }));
    setAutoCalc(true);
  }, []);

  useEffect(() => {
    if (autoCalc) { calculate(); setAutoCalc(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCalc]);

  const update = (key: string, val: number) => setState(prev => ({ ...prev, [key]: val }));

  const medianRatio = () => {
    const median = MEDIAN_2026[state.size];
    return median ? ((state.houseIncome || 0) * 10000 / median * 100) : 0;
  };

  const calculate = () => {
    const s = state;
    const payM = (s.pay || 0) * 10000;
    const tier = dohyakTier(s.salary || 0);
    if (!tier) return;

    const incomeBonus = (s.salary || 0) <= 2400 ? 0.5 : 0;
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

    // 현재까지 쌓인 금액 계산 (월별)
    const em = elapsedMonths || 0;
    if (em > 0 && em <= 60) {
      const monthlyData: {m:number;principal:number;contrib:number;interest:number;total:number}[] = [];
      let accPrincipal = 0;
      let accContrib = 0;
      let accInterest = 0;
      for (let m = 1; m <= em; m++) {
        accPrincipal += payM;
        accContrib += cm;
        // 단리: m번째 납입분의 이자 = 납입액 × 월이율 × (경과개월수 - m + 1)개월 적수 아님
        // 정확한 방식: 각 월 납입분이 (em - m)개월 동안 이자 발생 (납입한 달은 미포함이 일반적)
        // 하지만 은행 관행상 납입월 포함 적수 방식: (em - m + 1)개월
      }
      // 적수 방식으로 정확 계산: 이자 = Σ(k=1→em) 납입액 × (연이율/12) × (em - k + 1)
      let interestP = 0;
      let interestC = 0;
      for (let k = 1; k <= em; k++) {
        const monthRate = sched[k - 1] / 12; // 해당 월의 월이율
        const remaining = em - k; // 납입 후 경과 개월 (납입월 미포함이 일반적이나, 만기 시 포함)
        // 은행 적금 이자 계산: 적수 = 납입액 × 잔여개월수 (납입월 다음달부터 계산)
        // 단, 간소화를 위해 (em - k + 1)을 쓰면 만기 계산과 일치
        interestP += payM * monthRate * (em - k + 1);
        interestC += cm * monthRate * (em - k + 1);
      }
      accInterest = interestP + interestC;

      // 월별 데이터 생성 (5개월 간격 + 현재)
      const snapshots = [1, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60].filter(m => m <= em);
      if (!snapshots.includes(em)) snapshots.push(em);
      snapshots.sort((a, b) => a - b);

      for (const sm of snapshots) {
        let p2 = payM * sm;
        let c2 = cm * sm;
        let ip2 = 0, ic2 = 0;
        for (let k = 1; k <= sm; k++) {
          const mr = sched[k - 1] / 12;
          ip2 += payM * mr * (sm - k + 1);
          ic2 += cm * mr * (sm - k + 1);
        }
        monthlyData.push({ m: sm, principal: p2, contrib: c2, interest: ip2 + ic2, total: p2 + c2 + ip2 + ic2 });
      }

      setCurrentResult({ months: em, principal: accPrincipal, contrib: accContrib, interest: accInterest, total: accPrincipal + accContrib + accInterest, monthlyData });
    } else {
      setCurrentResult(null);
    }

    setParams({ size: s.size, salary: s.salary, houseIncome: s.houseIncome, pay: s.pay, baseRate: s.baseRate, varRate: s.varRate, dohyakBonus: s.dohyakBonus, bonusStart: s.bonusStart });
    scrollToResult();
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
            <input type="number" value={state.salary} onChange={e => update('salary', +e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input type="range" min={0} max={8000} step={100} value={state.salary} onChange={e => update('salary', +e.target.value)} className="w-full mt-3.5" />
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">가구 월 소득 <span className="text-xs text-[var(--sub)] font-medium ml-1">중위소득 대비 {medianRatio().toFixed(0)}%</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={state.houseIncome} onChange={e => update('houseIncome', +e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
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
            <input type="number" value={state.dohyakBonus} min={0} max={1.5} step={0.1} onChange={e => update('dohyakBonus', Math.min(1.5, Math.max(0, +e.target.value)))} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">%</span>
          </div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">우대금리 적용 시작</label>
          <select value={state.bonusStart} onChange={e => update('bonusStart', +e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
            <option value={1}>가입 시점부터 (일부 은행 만기 소급)</option><option value={13}>2년차부터 (일반적)</option><option value={25}>3년차부터</option><option value={37}>4년차부터</option><option value={49}>5년차부터</option>
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
        <div id="calc-result">
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
      {/* 현재까지 쌓인 금액 */}
      {result && currentResult && (
        <div>
          <div className="text-lg font-extrabold mt-4 mb-3 px-1">📊 지금까지 모은 돈 ({currentResult.months}개월차)</div>
          <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--green)]">
            <div className="mb-3">
              <label className="block text-sm font-bold mb-2">현재 경과 개월 수 <span className="text-xs text-[var(--sub)] font-medium ml-1">{elapsedMonths}개월</span></label>
              <input type="range" min={1} max={60} step={1} value={elapsedMonths} onChange={e => { setElapsedMonths(+e.target.value); }} className="w-full" />
              <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1">
                <span>1개월</span><span>12개월</span><span>24개월</span><span>36개월</span><span>48개월</span><span>60개월</span>
              </div>
            </div>
            <button onClick={calculate} className="w-full py-2.5 mb-3 border-0 rounded-xl bg-[var(--green)] text-white text-sm font-extrabold cursor-pointer transition-all hover:opacity-90 active:scale-[.985]">
              잔액 다시 계산
            </button>
            <div className="text-[32px] font-extrabold tracking-tight text-[var(--green)]">{won(currentResult.total)}</div>
            <div className="mt-3 border-t border-[var(--line)] pt-3 flex flex-col gap-2 text-[13.5px]">
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">납입 원금</span><span className="font-bold">{won(currentResult.principal)}</span></div>
              <div className="flex justify-between text-[var(--violet)]"><span className="font-semibold">정부 기여금</span><span className="font-bold">{won(currentResult.contrib)}</span></div>
              <div className="flex justify-between text-[var(--green)]"><span className="font-semibold">이자 (비과세)</span><span className="font-bold">{won(currentResult.interest)}</span></div>
            </div>
          </div>

          {/* 월별 추이 표 */}
          {currentResult.monthlyData.length > 1 && (
            <Card>
              <SectionTitle num="📈">월별 잔액 추이</SectionTitle>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[11.5px] min-w-[320px]">
                  <thead>
                    <tr className="border-b-2 border-[var(--line)]">
                      <th className="py-1.5 text-left text-[var(--sub)] font-bold">개월</th>
                      <th className="py-1.5 text-right text-[var(--sub)] font-bold">원금</th>
                      <th className="py-1.5 text-right text-[var(--sub)] font-bold">기여금</th>
                      <th className="py-1.5 text-right text-[var(--sub)] font-bold">이자</th>
                      <th className="py-1.5 text-right font-bold">합계</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentResult.monthlyData.map(d => (
                      <tr key={d.m} className={`border-b border-[var(--line)] ${d.m === currentResult.months ? 'bg-[var(--green-weak)] font-extrabold' : ''}`}>
                        <td className="py-1.5 font-bold">{d.m}개월</td>
                        <td className="py-1.5 text-right">{won(d.principal)}</td>
                        <td className="py-1.5 text-right text-[var(--violet)]">{won(d.contrib)}</td>
                        <td className="py-1.5 text-right text-[var(--green)]">{won(d.interest)}</td>
                        <td className="py-1.5 text-right font-bold">{won(d.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      )}

      {result && <ShareButtons title="도약계좌 수령액" />}

      {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 만기 수령액을 계산해 드려요.</Card>}

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 청년도약계좌란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">청년도약계좌는 만 19~34세 청년이 매월 최대 70만원을 5년간 납입하면 정부 기여금과 비과세 혜택을 받을 수 있는 정책 금융상품입니다. 1~3년차는 고정금리, 4~5년차는 변동금리가 적용되며, 우대금리는 충족 시점부터 적용됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">정부 기여금은 소득 구간에 따라 납입액의 3~6%가 매칭 지급됩니다. 총급여 6,000만원 초과~7,500만원 이하는 비과세 혜택만 적용됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3"><b>2026년 3년차 변동금리 전환:</b> 2024년 초에 가입한 1기 가입자부터 고정금리(연 4.5%) 기간이 종료되고, 4년차부터 변동금리로 전환됩니다. KB국민·신한·우리은행은 변동금리를 연 3.0%로 고시했으며, 우대금리 1.5%p를 합해도 최고 4.5%로 낮아집니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed"><b>현재 잔액 확인:</b> 위 계산기에서 &quot;현재까지 쌓인 금액&quot; 기능을 이용하면 만기 전이라도 지금까지 원금+이자+기여금이 얼마인지 확인할 수 있습니다. 변동금리 전환 시점(37개월차)을 기준으로 이자가 달라지는 것도 자동 반영됩니다.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">🚨 특별중도해지 사유 안내</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">아래 사유에 해당하면 <b>정부기여금과 비과세 혜택을 유지</b>한 채 중도해지할 수 있습니다. 일반 중도해지 시에는 기여금 반환 + 이자 과세(15.4%)가 적용되므로, 해지를 고려한다면 특별중도해지 해당 여부를 먼저 확인하세요.</p>
        <div className="flex flex-col gap-1.5 text-[13px]">
          {[
            ['💒 혼인', '혼인신고일 전후 2년 이내'],
            ['👶 출산', '출생일 전후 2년 이내'],
            ['🏠 생애최초 주택구입', '가입자 본인이 생애 최초로 주택 구입 시'],
            ['📦 퇴직', '가입자 본인의 비자발적 퇴직 (권고사직, 계약만료 등)'],
            ['🏢 폐업', '가입자 본인의 사업장 폐업'],
            ['🏥 장기치료', '3개월 이상 치료가 필요한 질병·상해'],
            ['🌊 천재지변', '자연재해 등 불가항력적 사유'],
            ['✈️ 사망·해외이주', '가입자 사망 또는 해외 이주'],
            ['🔄 청년미래적금 환승', '미래적금 가입 신청 → 계좌 개설 후 도약계좌 특별중도해지'],
          ].map(([title, desc]) => (
            <div key={title as string} className="bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <span className="font-bold text-[var(--ink)]">{title}</span>
              <span className="text-[var(--sub)] ml-1.5">— {desc}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[11.5px] text-[var(--sub)] leading-relaxed bg-[#FFF4E5] rounded-lg p-3">
          <b className="text-[#B26A00]">⚠️ 주의:</b> 특별중도해지 시에도 해지 신청 시점까지의 이자만 지급됩니다. 만기 이자보다 적을 수 있으므로, 만기까지 유지가 가능하다면 유지하는 것이 유리합니다. 정확한 요건은 가입 은행에 문의하세요.
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">💡 일반 중도해지 vs 특별중도해지 비교</h2>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-xs text-[var(--sub)] font-bold">구분</th><th className="py-2 text-center text-xs text-[var(--sub)] font-bold">일반 해지</th><th className="py-2 text-center text-xs text-[var(--sub)] font-bold">특별 해지</th></tr></thead>
          <tbody>
            <tr className="border-b border-[var(--line)]"><td className="py-2 font-semibold">정부기여금</td><td className="py-2 text-center text-[#E5484D] font-bold">반환 ❌</td><td className="py-2 text-center text-[var(--green)] font-bold">유지 ✅</td></tr>
            <tr className="border-b border-[var(--line)]"><td className="py-2 font-semibold">비과세</td><td className="py-2 text-center text-[#E5484D] font-bold">과세 (15.4%)</td><td className="py-2 text-center text-[var(--green)] font-bold">비과세 유지 ✅</td></tr>
            <tr className="border-b border-[var(--line)]"><td className="py-2 font-semibold">원금+이자</td><td className="py-2 text-center font-bold">지급</td><td className="py-2 text-center font-bold">지급</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 중도해지하면 어떻게 되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 정부 기여금 반환 + 이자 과세(15.4%). 특별중도해지 사유(결혼, 출산, 청년미래적금 환승 등) 시 기여금 유지 가능.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 미래적금으로 환승할 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 환승은 최초 신청 기간(2026.6.22~7.3)에 단 한 번만 가능했습니다. 미래적금 가입 신청 → 계좌 개설 후 도약계좌를 특별중도해지하는 순서입니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 우대금리는 언제부터 적용되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. <b>소급 적용이 안 됩니다.</b> 조건을 충족한 시점부터 우대금리가 적용되며, 그 이전 기간에는 기본금리만 적용됩니다. 일부 은행은 만기 시 소급 적용하므로 반드시 은행별 상품설명서를 확인하세요.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">추정치입니다. 정확한 금액은 해당 은행 상품설명서를 확인하세요.</div>
      </footer>

      <CtaButton label="만기 수령액 계산하기" onClick={calculate} />
    </>
  );
}
