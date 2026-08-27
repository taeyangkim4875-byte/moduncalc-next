'use client';

import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import SliderInput from '@/components/SliderInput';
import ResultPanel from '@/components/ResultPanel';
import ResultRow from '@/components/ResultRow';
import ShareButtons from '@/components/ShareButtons';
import TrustBadge from '@/components/TrustBadge';
import EmbedCode from '@/components/EmbedCode';
import SavePrompt from '@/components/SavePrompt';
import { won } from '@/utils/format';
import { NP_RATE, NP_CAP, HI_RATE, LTC_RATE, EI_RATE } from '@/utils/tax';
import { scrollToResult } from '@/utils/scroll';
import { getParams, setParams } from '@/utils/params';
import { trackCalcComplete } from '@/utils/analytics';

const EI_RATE_EMPLOYER = 0.0135;

interface InsResult {
  npEmp: number;
  npCo: number;
  hiEmp: number;
  hiCo: number;
  ltcEmp: number;
  ltcCo: number;
  eiEmp: number;
  eiCo: number;
  totalEmp: number;
  totalCo: number;
  totalAll: number;
}

function calc(salaryMan: number): InsResult {
  const salary = salaryMan * 10000;
  const npBase = Math.min(salary, NP_CAP);
  const npEmp = Math.round(npBase * NP_RATE);
  const npCo = npEmp;
  const hiEmp = Math.round(salary * HI_RATE);
  const hiCo = hiEmp;
  const ltcEmp = Math.round(hiEmp * LTC_RATE);
  const ltcCo = ltcEmp;
  const eiEmp = Math.round(salary * EI_RATE);
  const eiCo = Math.round(salary * EI_RATE_EMPLOYER);
  const totalEmp = npEmp + hiEmp + ltcEmp + eiEmp;
  const totalCo = npCo + hiCo + ltcCo + eiCo;
  return { npEmp, npCo, hiEmp, hiCo, ltcEmp, ltcCo, eiEmp, eiCo, totalEmp, totalCo, totalAll: totalEmp + totalCo };
}

function Bar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-[12px]">
      <span className="w-16 text-right font-semibold text-[var(--sub)] flex-none">{label}</span>
      <div className="flex-1 h-5 bg-[var(--bg)] rounded-lg overflow-hidden">
        <div className="h-full rounded-lg transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="w-20 text-right font-bold flex-none">{won(value)}</span>
    </div>
  );
}

export default function InsuranceCalc() {
  const [salary, setSalary] = useState(300);
  const [result, setResult] = useState<InsResult | null>(null);

  useEffect(() => {
    const p = getParams();
    if (p.salary) setSalary(+p.salary);
  }, []);

  const handleCalc = () => {
    const r = calc(salary);
    setResult(r);
    setParams({ salary }, { calcId: '/salary/insurance', primaryOutput: `근로자 ${won(r.totalEmp)}` });
    trackCalcComplete('insurance', won(r.totalEmp));
    scrollToResult();
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">급여 정보</SectionTitle>
        <SliderInput
          label="월 급여 (세전)"
          value={salary}
          onChange={setSalary}
          min={100}
          max={1500}
          step={10}
          unit="만원"
          minLabel="100만"
          maxLabel="1,500만"
          trackId="insurance-salary"
        />
        <TrustBadge />
      </Card>

      <CtaButton label="4대보험료 계산하기" onClick={handleCalc} />

      {result && (
        <div id="calc-result">
          <ResultPanel
            label="내가 내는 4대보험료 (월)"
            value={won(result.totalEmp)}
            sub={`연 ${won(result.totalEmp * 12)}`}
          />

          <Card className="mt-3">
            <h3 className="text-[15px] font-extrabold mb-3">근로자 부담분</h3>
            <div className="flex flex-col gap-2.5">
              <ResultRow label="국민연금" value={won(result.npEmp)} />
              <ResultRow label="건강보험" value={won(result.hiEmp)} />
              <ResultRow label="장기요양" value={won(result.ltcEmp)} />
              <ResultRow label="고용보험" value={won(result.eiEmp)} />
              <ResultRow label="합계" value={won(result.totalEmp)} bold separator />
            </div>
          </Card>

          <Card>
            <h3 className="text-[15px] font-extrabold mb-3">사업주 부담분</h3>
            <div className="flex flex-col gap-2.5">
              <ResultRow label="국민연금" value={won(result.npCo)} />
              <ResultRow label="건강보험" value={won(result.hiCo)} />
              <ResultRow label="장기요양" value={won(result.ltcCo)} />
              <ResultRow label="고용보험" value={won(result.eiCo)} />
              <ResultRow label="합계" value={won(result.totalCo)} bold separator />
            </div>
          </Card>

          <Card>
            <h3 className="text-[15px] font-extrabold mb-3">보험료 비중</h3>
            <div className="flex flex-col gap-2">
              <Bar label="국민연금" value={result.npEmp} max={result.totalEmp} color="#3182F6" />
              <Bar label="건강보험" value={result.hiEmp} max={result.totalEmp} color="#00B894" />
              <Bar label="장기요양" value={result.ltcEmp} max={result.totalEmp} color="#F39C12" />
              <Bar label="고용보험" value={result.eiEmp} max={result.totalEmp} color="#E74C3C" />
            </div>
            <div className="mt-3 text-xs text-[var(--sub)]">
              근로자+사업주 합산 월 <b className="text-[var(--ink)]">{won(result.totalAll)}</b> · 연 <b className="text-[var(--ink)]">{won(result.totalAll * 12)}</b>
            </div>
          </Card>

          <Card>
            <h3 className="text-[15px] font-extrabold mb-3">연간 요약</h3>
            <div className="flex flex-col gap-2.5">
              <ResultRow label="근로자 연간 부담" value={won(result.totalEmp * 12)} bold />
              <ResultRow label="사업주 연간 부담" value={won(result.totalCo * 12)} bold />
              <ResultRow label="합산 연간 총액" value={won(result.totalAll * 12)} bold separator color="var(--primary)" />
            </div>
          </Card>

          <ShareButtons title="4대보험 계산기" />
          <EmbedCode href="/salary/insurance" />
          <SavePrompt />
        </div>
      )}
    </>
  );
}
