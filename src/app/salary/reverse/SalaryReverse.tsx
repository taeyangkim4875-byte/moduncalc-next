'use client';

import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import SliderInput from '@/components/SliderInput';
import ResultPanel from '@/components/ResultPanel';
import ResultRow from '@/components/ResultRow';
import { won, fmtSalary } from '@/utils/format';
import { netPay } from '@/utils/tax';
import { bisect } from '@/utils/solver';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParamsWithProfile, setParams } from '@/utils/params';
import ModeToggle from '@/components/ModeToggle';
import SavePrompt from '@/components/SavePrompt';

interface ReverseResult {
  grossMan: number;
  grossMonth: number;
  netMonth: number;
  netYear: number;
  insurance: number;
  incomeTax: number;
  localTax: number;
  np: number;
  hi: number;
  ei: number;
  deductMonth: number;
}

export default function SalaryReverse() {
  const [targetNet, setTargetNet] = useState(300);
  const [dependents, setDependents] = useState(1);
  const [nontax, setNontax] = useState(true);
  const [result, setResult] = useState<ReverseResult | null>(null);
  const [error, setError] = useState('');
  const [autoCalc, setAutoCalc] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const { params: p } = getParamsWithProfile();
    if (!Object.keys(p).length) return;
    if (p.targetNet) setTargetNet(+p.targetNet);
    if (p.dependents) setDependents(+p.dependents);
    if (p.nontax !== undefined) setNontax(p.nontax === 'true');
    setAutoCalc(true);
  }, []);

  useEffect(() => {
    if (autoCalc) { calc(); setAutoCalc(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCalc]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function calc() {
    setError('');
    const target = targetNet * 10000;
    const fn = (gross: number) => netPay(gross, dependents, nontax).netMonth - target;

    const { value, converged } = bisect(fn, 2000, 50000);

    if (!converged || isNaN(value)) {
      setError(`월 ${targetNet}만원 실수령은 이 조건에서 달성할 수 없습니다.`);
      setResult(null);
      return;
    }

    const grossMan = Math.round(value / 10) * 10;
    const pay = netPay(grossMan, dependents, nontax);

    setResult({
      grossMan,
      grossMonth: (grossMan * 10000) / 12,
      netMonth: pay.netMonth,
      netYear: pay.netYear,
      insurance: pay.insurance,
      incomeTax: pay.incomeTax,
      localTax: pay.localTax,
      np: pay.np,
      hi: pay.hi,
      ei: pay.ei,
      deductMonth: pay.deductMonth,
    });
    setParams({ targetNet, dependents, nontax }, { primaryOutput: `연봉 ${fmtSalary(grossMan)}원` });
    scrollToResult();
  }

  return (
    <>
      <ModeToggle
        forwardHref="/salary"
        reverseHref="/salary/reverse"
        mode="reverse"
        forwardLabel="연봉 → 실수령액"
        reverseLabel="실수령액 → 연봉"
      />

      <Card>
        <SectionTitle num="1">희망 실수령액</SectionTitle>

        <SliderInput
          label="목표 월 실수령액"
          hint={`${targetNet}만원`}
          value={targetNet}
          onChange={v => setTargetNet(v || 0)}
          min={100}
          max={1000}
          step={10}
          unit="만원/월"
        />

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">부양가족 수 (본인 포함)</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <button
                key={n}
                onClick={() => setDependents(n)}
                className={`flex-1 min-w-[54px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${
                  dependents === n
                    ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]'
                    : 'bg-white border-[var(--line)] text-[var(--sub)] hover:border-[#C9D0D6]'
                }`}
              >
                {n}인
              </button>
            ))}
          </div>
        </div>

        <div className="mb-0">
          <div
            className={`flex items-center justify-between gap-3 p-3.5 border-[1.5px] rounded-xl transition-colors ${
              nontax ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)]'
            }`}
          >
            <div>
              <div className="text-sm font-bold">비과세 식대 적용</div>
              <div className="text-xs text-[var(--sub)] font-medium mt-0.5">월 20만원 비과세 식대 포함</div>
            </div>
            <label className="relative w-12 h-7 cursor-pointer flex-none">
              <input
                type="checkbox"
                checked={nontax}
                onChange={e => setNontax(e.target.checked)}
                className="opacity-0 w-0 h-0 absolute"
              />
              <span className={`absolute inset-0 rounded-full transition-colors ${nontax ? 'bg-[var(--primary)]' : 'bg-[#D1D6DB]'}`}>
                <span className={`absolute w-[22px] h-[22px] left-[3px] top-[3px] bg-white rounded-full shadow-sm transition-transform ${nontax ? 'translate-x-5' : ''}`} />
              </span>
            </label>
          </div>
        </div>
      </Card>

      {error && (
        <div className="bg-[#FFF4E5] rounded-xl p-3.5 text-[13px] text-[#B26A00] font-semibold mb-3.5">
          {error}
        </div>
      )}

      {result && (
        <div id="calc-result">
          <Card>
            <SectionTitle num="2">필요 연봉</SectionTitle>
            <ResultPanel
              value={fmtSalary(result.grossMan) + '원'}
              sub={`월 세전 ${won(result.grossMonth)}`}
              size="lg"
            />
            <div className="mt-3 text-center">
              <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg bg-[var(--primary-weak)] text-[var(--primary-dark)]">
                실수령 월 {won(result.netMonth)} · 연 {won(result.netYear)}
              </span>
            </div>
            <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5">
              <ResultRow label="세전 월급" value={won(result.grossMonth)} />
              <ResultRow label="공제 합계" value={`-${won(result.deductMonth)}`} color="#E8344E" />
              <ResultRow label="실수령액" value={won(result.netMonth)} bold />
            </div>
          </Card>

          <Card>
            <SectionTitle num="3">공제 내역 (월)</SectionTitle>
            <div className="flex flex-col gap-2.5">
              <ResultRow label="국민연금" value={won(result.np / 12)} />
              <ResultRow label="건강보험 + 장기요양" value={won(result.hi / 12)} />
              <ResultRow label="고용보험" value={won(result.ei / 12)} />
              <ResultRow label="4대보험 소계" value={won(result.insurance / 12)} separator />
              <ResultRow label="소득세" value={won(result.incomeTax / 12)} />
              <ResultRow label="지방소득세" value={won(result.localTax / 12)} />
              <ResultRow label="공제 합계" value={`-${won(result.deductMonth)}`} bold color="#E8344E" separator />
            </div>
          </Card>
        </div>
      )}

      <SavePrompt />
      {result && <ShareButtons title="연봉 역산 결과" />}

      {!result && !error && (
        <Card className="text-center text-[var(--sub)] text-sm py-8">
          희망 실수령액을 입력하고 버튼을 누르면 필요한 세전 연봉을 알려드려요.
        </Card>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">왜 역산이 필요할까요?</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2.5">
          <p>연봉 협상할 때 &quot;실수령 얼마를 받고 싶다&quot;에서 출발하는 분들이 많아요. 그런데 4대보험과 소득세 구조가 복잡해서 거꾸로 계산하기가 어렵습니다.</p>
          <p>이 계산기는 원하는 실수령액에서 세전 연봉을 자동으로 역산해 드려요. 연봉 협상이나 이직 시 목표 금액을 정하는 데 활용하세요.</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">역산 결과가 정확한가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">2026년 4대보험 요율과 소득세 누진세율을 기반으로 계산한 추정치입니다. 회사별 공제 항목이 다를 수 있어서 실제와 약간의 차이가 있을 수 있어요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">연봉이 10만원 단위로 나오는 이유는?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">실제 연봉 협상은 보통 100만원 또는 10만원 단위로 이루어지기 때문에, 가장 근접한 10만원 단위로 반올림해서 보여드려요.</div>
          </div>
        </div>
      </Card>

      <CtaButton label="필요 연봉 역산하기" onClick={calc} />
    </>
  );
}
