'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import AiAnalysis from '@/components/AiAnalysis';

export default function FireCalc() {
  const [age, setAge] = useState(30);
  const [monthlyIncome, setMonthlyIncome] = useState(400);
  const [monthlyExpense, setMonthlyExpense] = useState(250);
  const [currentAsset, setCurrentAsset] = useState(5000);
  const [returnRate, setReturnRate] = useState(5);
  const [retireExpense, setRetireExpense] = useState(200);
  const [result, setResult] = useState<{
    fireAge: number; fireAsset: number; savingRate: number;
    monthlySaving: number; yearsToFire: number; possible: boolean;
    yearlyData: { age: number; asset: number }[];
  } | null>(null);

  const calc = () => {
    const monthlySaving = ((monthlyIncome || 0) - (monthlyExpense || 0)) * 10000;
    const savingRate = (monthlyIncome || 0) > 0 ? (((monthlyIncome || 0) - (monthlyExpense || 0)) / (monthlyIncome || 0)) * 100 : 0;
    const fireAsset = (retireExpense || 0) * 10000 * 12 * 25; // 4% 룰
    const r = (returnRate || 0) / 100 / 12; // 월 수익률

    let asset = (currentAsset || 0) * 10000;
    let months = 0;
    const maxMonths = (100 - age) * 12; // 100세까지
    const yearlyData: { age: number; asset: number }[] = [{ age, asset: Math.round(asset) }];

    if (monthlySaving <= 0 && asset < fireAsset) {
      setResult({ fireAge: 0, fireAsset, savingRate, monthlySaving, yearsToFire: 0, possible: false, yearlyData });
      scrollToResult();
      return;
    }

    while (asset < fireAsset && months < maxMonths) {
      asset = asset * (1 + r) + monthlySaving;
      months++;
      if (months % 12 === 0) {
        yearlyData.push({ age: age + months / 12, asset: Math.round(asset) });
      }
    }

    if (asset >= fireAsset) {
      // 달성 시점의 데이터가 없으면 추가
      const fireAge = age + Math.ceil(months / 12);
      if (yearlyData[yearlyData.length - 1].age !== fireAge) {
        yearlyData.push({ age: fireAge, asset: Math.round(asset) });
      }
      setResult({ fireAge, fireAsset, savingRate, monthlySaving, yearsToFire: Math.ceil(months / 12), possible: true, yearlyData });
    } else {
      setResult({ fireAge: 0, fireAsset, savingRate, monthlySaving, yearsToFire: 0, possible: false, yearlyData });
    }
    scrollToResult();
  };

  const fmtAmt = (n: number) => {
    if (n >= 100000000) return `${(n / 100000000).toFixed(1)}억`;
    if (n >= 10000) return `${Math.round(n / 10000).toLocaleString()}만`;
    return n.toLocaleString();
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">현재 상황</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">현재 나이 <span className="text-xs text-[var(--sub)] font-medium ml-1">{age}세</span></label>
          <input type="range" min={20} max={60} step={1} value={age} onChange={e => setAge(+e.target.value)} className="w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">월 소득 (세후)</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={monthlyIncome} onChange={e => setMonthlyIncome(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">월 지출</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={monthlyExpense} onChange={e => setMonthlyExpense(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <div className="text-xs text-[var(--sub)] mt-1">월 저축: {((monthlyIncome || 0) - (monthlyExpense || 0)).toLocaleString()}만원 (저축률 {(monthlyIncome || 0) > 0 ? (((monthlyIncome || 0) - (monthlyExpense || 0)) / (monthlyIncome || 0) * 100).toFixed(0) : 0}%)</div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">현재 순자산 (금융자산)</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={currentAsset} onChange={e => setCurrentAsset(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">은퇴 조건</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">예상 투자 수익률 <span className="text-xs text-[var(--sub)] font-medium ml-1">연 {returnRate}%</span></label>
          <input type="range" min={0} max={12} step={0.5} value={returnRate} onChange={e => setReturnRate(+e.target.value)} className="w-full" />
          <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1"><span>보수적 (0%)</span><span>예금 (3%)</span><span>주식 (7%)</span><span>공격적 (12%)</span></div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">은퇴 후 월 생활비</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={retireExpense} onChange={e => setRetireExpense(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <div className="text-xs text-[var(--sub)] mt-1">4% 룰 기준 필요 자산: {fmtAmt((retireExpense || 0) * 10000 * 12 * 25)}원</div>
        </div>
      </Card>

      {result && (
        <div id="calc-result">
          <div className="text-lg font-extrabold mt-4 mb-3 px-1">🔥 FIRE 시뮬레이션 결과</div>
          <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
            {result.possible ? (
              <div className="text-center py-2">
                <div className="text-5xl mb-2">🔥</div>
                <div className="text-sm font-bold text-[var(--sub)]">경제적 자유 달성 시점</div>
                <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{result.fireAge}세</div>
                <div className="text-sm text-[var(--sub)]">지금부터 {result.yearsToFire}년 후</div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-2">😢</div>
                <div className="text-base font-extrabold text-[#E5484D]">현재 조건으로는 달성이 어려워요</div>
                <div className="text-sm text-[var(--sub)] mt-1">소득을 늘리거나 지출을 줄여보세요</div>
              </div>
            )}

            <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">FIRE 필요 자산</span><span className="font-bold">{fmtAmt(result.fireAsset)}원</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">월 저축액</span><span className="font-bold">{won(result.monthlySaving)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">저축률</span><span className="font-bold">{result.savingRate.toFixed(0)}%</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">4% 룰 기준</span><span className="font-bold">자산의 4%만 매년 인출</span></div>
            </div>

            {/* 자산 성장 표 */}
            {result.yearlyData.length > 1 && (
              <div className="mt-4">
                <div className="text-xs font-bold text-[var(--sub)] mb-2">자산 성장 추이</div>
                {/* 시각적 바 */}
                <div className="flex flex-col gap-1">
                  {result.yearlyData.filter((_, i) => i % Math.max(1, Math.floor(result.yearlyData.length / 10)) === 0 || i === result.yearlyData.length - 1).map((d, i) => {
                    const pct = result.fireAsset > 0 ? Math.min(100, (d.asset / result.fireAsset) * 100) : 0;
                    const achieved = d.asset >= result.fireAsset;
                    return (
                      <div key={i} className="flex items-center gap-2 text-[11px]">
                        <span className="w-8 text-right font-bold text-[var(--sub)]">{d.age}세</span>
                        <div className="flex-1 h-4 bg-[var(--bg)] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${achieved ? 'bg-[var(--green)]' : 'bg-[var(--primary)]'}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className={`w-16 text-right font-bold ${achieved ? 'text-[var(--green)]' : ''}`}>{fmtAmt(d.asset)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-[var(--sub)]">
                  <div className="w-3 h-3 bg-[var(--primary)] rounded-full" /> 성장 중
                  <div className="w-3 h-3 bg-[var(--green)] rounded-full ml-2" /> FIRE 달성
                  <span className="ml-auto">목표: {fmtAmt(result.fireAsset)}원</span>
                </div>
              </div>
            )}
          </div>

          <AiAnalysis type="fire" data={{
            income: monthlyIncome,
            expense: monthlyExpense,
            asset: currentAsset,
            fireAsset: result.fireAsset,
            fireAge: result.fireAge,
            savingRate: result.savingRate,
          }} label="FIRE 전략 AI 분석 받기" />
        </div>
      )}
      {result && <ShareButtons title="FIRE 계산 결과" />}

      {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 FIRE 달성 시점을 계산해 드려요.</Card>}

      {/* 저축률별 FIRE 기간 참고표 */}
      <Card>
        <SectionTitle num="📋">저축률별 FIRE 달성 기간</SectionTitle>
        <div className="text-xs text-[var(--sub)] mb-2">투자 수익률 연 5% 가정, 현재 자산 0원 기준</div>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-xs text-[var(--sub)] font-bold">저축률</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">FIRE까지</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">느낌</th></tr></thead>
          <tbody>
            {[
              ['10%', '약 51년', '😓'],
              ['20%', '약 37년', '😐'],
              ['30%', '약 28년', '🙂'],
              ['40%', '약 22년', '😊'],
              ['50%', '약 17년', '😄'],
              ['60%', '약 12년', '🔥'],
              ['70%', '약 9년', '🔥🔥'],
              ['80%', '약 6년', '🔥🔥🔥'],
            ].map(([rate, years, emoji]) => (
              <tr key={rate} className="border-b border-[var(--line)]">
                <td className="py-2 font-bold">{rate}</td>
                <td className="py-2 text-right">{years}</td>
                <td className="py-2 text-right text-lg">{emoji}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 FIRE란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3"><b>FIRE(Financial Independence, Retire Early)</b>는 경제적 독립을 달성하여 원하는 시점에 은퇴할 수 있는 상태를 만드는 운동입니다. 핵심은 <b>4% 룰</b>로, 연간 생활비의 25배를 모으면 자산의 4%만 매년 인출해도 자산이 고갈되지 않는다는 이론입니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">예를 들어 월 200만원(연 2,400만원)으로 생활할 수 있다면, 6억원이 FIRE 목표 자산입니다. 저축률이 가장 중요한 변수이며, 저축률 50%면 약 17년, 70%면 약 9년 만에 달성 가능합니다.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 4% 룰이란?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 은퇴 자산에서 매년 4%만 인출하면 투자 수익으로 원금이 유지된다는 트리니티 연구 결과입니다. 연간 생활비 × 25 = 필요 자산.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 인플레이션은 반영되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 이 계산기는 명목 수익률 기준입니다. 실질 수익률로 계산하려면 투자 수익률에서 인플레이션(약 2~3%)을 빼고 입력하세요.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 국민연금은 포함되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 이 계산기는 국민연금을 별도로 반영하지 않습니다. 국민연금이 있으면 은퇴 후 필요 생활비가 줄어들어 FIRE 달성이 더 빨라집니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">시뮬레이션 결과이며, 실제 투자 수익은 시장 상황에 따라 달라집니다. 투자 판단의 근거로 사용하지 마세요.</div>
      </footer>

      <CtaButton label="🔥 FIRE 계산하기" onClick={calc} />
    </>
  );
}
