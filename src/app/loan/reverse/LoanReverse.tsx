'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import SliderInput from '@/components/SliderInput';
import ResultRow from '@/components/ResultRow';
import ModeToggle from '@/components/ModeToggle';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParamsWithProfile, setParams } from '@/utils/params';
import SavePrompt from '@/components/SavePrompt';

interface ReverseResult {
  maxAmount: number;
  totalRepay: number;
  totalInt: number;
  graceInt: number;
}

export default function LoanReverse() {
  const [monthly, setMonthly] = useState(100);
  const [rate, setRate] = useState(3.5);
  const [term, setTerm] = useState(30);
  const [grace, setGrace] = useState(0);
  const [result, setResult] = useState<ReverseResult | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const { params: p } = getParamsWithProfile();
    if (!Object.keys(p).length) return;
    if (p.monthly) setMonthly(+p.monthly);
    if (p.rate) setRate(+p.rate);
    if (p.term) setTerm(+p.term);
    if (p.grace) setGrace(+p.grace);
    setAutoCalc(true);
  }, []);

  useEffect(() => {
    if (autoCalc) { calc(); setAutoCalc(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCalc]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function calc() {
    const M = monthly * 10000;
    const r = rate / 100 / 12;
    const totalM = term * 12;
    const graceM = grace;
    const payM = Math.max(1, totalM - graceM);

    let P: number;
    if (r > 0) {
      const factor = Math.pow(1 + r, payM);
      P = M * (factor - 1) / (r * factor);
    } else {
      P = M * payM;
    }

    if (!isFinite(P) || P <= 0) {
      setResult(null);
      return;
    }

    const graceInt = P * r * graceM;
    const totalRepay = M * payM + graceInt;
    const totalInt = totalRepay - P;

    setResult({ maxAmount: P, totalRepay, totalInt, graceInt });

    const amountMan = Math.round(P / 10000);
    setParams({ monthly, rate, term, grace }, { primaryOutput: `최대 ${amountMan >= 10000 ? `${Math.floor(amountMan / 10000)}억${amountMan % 10000 ? ` ${(amountMan % 10000).toLocaleString()}만` : ''}` : amountMan.toLocaleString() + '만'}원` });
    scrollToResult();
  }

  function fmtAmount(v: number) {
    const man = Math.round(v / 10000);
    if (man >= 10000) {
      const ok = man % 10000;
      return `${Math.floor(man / 10000)}억${ok ? ` ${ok.toLocaleString()}만` : ''}원`;
    }
    return `${man.toLocaleString()}만원`;
  }

  return (<>
    <ModeToggle forwardHref="/loan" reverseHref="/loan/reverse" mode="reverse" forwardLabel="대출금 → 월 상환액" reverseLabel="월 상환액 → 대출 한도" />

    <Card><SectionTitle num="1">상환 조건 입력</SectionTitle>
      <SliderInput
        label="월 상환 가능액"
        hint={`${monthly.toLocaleString()}만원/월`}
        value={monthly}
        onChange={v => setMonthly(v || 0)}
        min={10}
        max={500}
        step={10}
        unit="만원"
      />
      <SliderInput
        label="연 이자율"
        value={rate}
        onChange={v => setRate(v || 0)}
        min={0}
        max={20}
        step={0.1}
        unit="%"
      />
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">대출 기간</label>
        <select value={term} onChange={e => setTerm(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
          {[5, 10, 15, 20, 25, 30, 35].map(y => <option key={y} value={y}>{y}년</option>)}
        </select>
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">거치기간</label>
        <select value={grace} onChange={e => setGrace(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
          <option value={0}>없음</option><option value={6}>6개월</option><option value={12}>1년</option><option value={24}>2년</option><option value={36}>3년</option>
        </select>
      </div>
    </Card>

    {result && (
      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">역산 결과</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">
            원리금균등 · 연 {rate}% · {term}년
          </span>
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">최대 대출 가능 금액</div>
            <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{fmtAmount(result.maxAmount)}</div>
            <div className="text-sm text-[var(--sub)]">월 {monthly.toLocaleString()}만원 상환 기준</div>
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2">
            <ResultRow label="총 상환액" value={won(result.totalRepay)} />
            <ResultRow label="총 이자" value={won(result.totalInt)} color="#E5484D" />
            {grace > 0 && <ResultRow label={`거치기간 이자 (${grace}개월)`} value={won(result.graceInt)} />}
          </div>
        </div>

        <Card>
          <SectionTitle num="📊">금리별 대출 한도 비교</SectionTitle>
          <div className="flex flex-col gap-2 text-[13.5px]">
            {[2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 6.0].map(r => {
              const mr = r / 100 / 12;
              const payM = Math.max(1, term * 12 - grace);
              const f = Math.pow(1 + mr, payM);
              const p = mr > 0 ? (monthly * 10000 * (f - 1) / (mr * f)) : monthly * 10000 * payM;
              return (
                <div key={r} className={`flex justify-between py-1.5 ${Math.abs(r - rate) < 0.01 ? 'font-extrabold text-[var(--primary-dark)]' : ''}`}>
                  <span className="text-[var(--sub)] font-semibold">연 {r.toFixed(1)}%</span>
                  <span className="font-bold">{fmtAmount(p)}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    )}

    <SavePrompt />
    {result && <ShareButtons title="대출 한도 역산 결과" />}
    {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 대출 가능 금액을 역산해 드려요.</Card>}

    <Card>
      <h2 className="text-base font-extrabold mb-3">역산 계산기가 필요한 이유</h2>
      <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2.5">
        <p>대출 상담을 받으러 가기 전에 &quot;내 월급에서 매달 얼마까지 감당할 수 있는가&quot;를 먼저 정하는 게 순서입니다. 그래야 과도한 대출을 피할 수 있어요.</p>
        <p>일반적으로 월 소득의 30~40% 이내로 상환액을 잡는 게 안전하다고 봅니다. 월 소득 400만원이라면 120~160만원이 적정 수준이에요.</p>
      </div>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">실제로 이만큼 빌릴 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">이 결과는 산술적 한도입니다. 실제로는 DSR(총부채원리금상환비율) 규제가 적용되어 한도가 더 낮을 수 있어요. DSR 계산기로 같이 확인해보세요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">금리가 오르면 한도가 많이 줄어드나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">네. 위의 금리별 비교표에서 보시듯, 금리 1%p 차이로 수천만원이 달라집니다. 가능하면 금리가 낮을 때 실행하는 게 유리합니다.</div></div>
      </div>
    </Card>

    <CtaButton label="대출 한도 역산하기" onClick={calc} />
  </>);
}
