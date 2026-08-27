'use client';

import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import SliderInput from '@/components/SliderInput';
import ResultPanel from '@/components/ResultPanel';
import ResultRow from '@/components/ResultRow';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';
import TrustBadge from '@/components/TrustBadge';
import EmbedCode from '@/components/EmbedCode';
import SavePrompt from '@/components/SavePrompt';
import { trackCalcComplete } from '@/utils/analytics';

type HouseholdType = 'single' | 'one-earner' | 'dual-earner';

interface EitcConfig {
  incomeMax: number;
  riseEnd: number;
  plateauEnd: number;
  declineEnd: number;
  maxAmount: number;
}

const EITC_CONFIG: Record<HouseholdType, EitcConfig> = {
  'single':      { incomeMax: 4500, riseEnd: 900,  plateauEnd: 1200, declineEnd: 2200, maxAmount: 1650000 },
  'one-earner':  { incomeMax: 6500, riseEnd: 1400, plateauEnd: 2100, declineEnd: 3200, maxAmount: 2850000 },
  'dual-earner': { incomeMax: 6500, riseEnd: 1700, plateauEnd: 2500, declineEnd: 4400, maxAmount: 3300000 },
};

function calcEitc(type: HouseholdType, incomeMan: number): number {
  const c = EITC_CONFIG[type];
  if (incomeMan <= 0 || incomeMan > c.declineEnd) return 0;
  if (incomeMan <= c.riseEnd) return Math.round(c.maxAmount * (incomeMan / c.riseEnd));
  if (incomeMan <= c.plateauEnd) return c.maxAmount;
  return Math.round(c.maxAmount * ((c.declineEnd - incomeMan) / (c.declineEnd - c.plateauEnd)));
}

function calcChildCredit(incomeMan: number, children: number): number {
  if (children <= 0 || incomeMan <= 0 || incomeMan > 7000) return 0;
  const maxPerChild = 1000000;
  const minPerChild = 500000;
  let perChild: number;
  if (incomeMan <= 2100) {
    perChild = Math.round(maxPerChild * (incomeMan / 2100));
  } else if (incomeMan <= 4000) {
    perChild = maxPerChild;
  } else {
    perChild = Math.round(maxPerChild * ((7000 - incomeMan) / (7000 - 4000)));
  }
  perChild = Math.max(perChild, minPerChild);
  if (incomeMan > 7000) perChild = 0;
  return perChild * children;
}

function applyAssetReduction(amount: number, assetMan: number): number {
  if (assetMan > 30000) return 0;
  if (assetMan > 20000) return Math.round(amount * 0.5);
  return amount;
}

const LABELS: Record<HouseholdType, string> = {
  'single': '단독가구',
  'one-earner': '홑벌이가구',
  'dual-earner': '맞벌이가구',
};

export default function EitcCalc() {
  const [type, setType] = useState<HouseholdType>('single');
  const [income, setIncome] = useState(2000);
  const [children, setChildren] = useState(0);
  const [asset, setAsset] = useState(10000);
  const [result, setResult] = useState<{
    eitc: number;
    childCredit: number;
    total: number;
    assetReduced: boolean;
    assetExceeded: boolean;
  } | null>(null);

  useEffect(() => {
    const p = getParams();
    if (p.type) setType(p.type as HouseholdType);
    if (p.income) setIncome(+p.income);
    if (p.children) setChildren(+p.children);
    if (p.asset) setAsset(+p.asset);
  }, []);

  function calculate() {
    const assetExceeded = asset > 30000;
    const assetReduced = asset > 20000 && asset <= 30000;

    let eitc = calcEitc(type, income);
    eitc = applyAssetReduction(eitc, asset);

    let childCredit = 0;
    if (type !== 'single' && children > 0) {
      childCredit = calcChildCredit(income, children);
      childCredit = applyAssetReduction(childCredit, asset);
    }

    const total = eitc + childCredit;

    setResult({ eitc, childCredit, total, assetReduced, assetExceeded });
    setParams(
      { type, income, children, asset },
      { calcId: '/tax/eitc', primaryOutput: won(total) },
    );
    trackCalcComplete('eitc', won(total));
    scrollToResult();
  }

  const config = EITC_CONFIG[type];

  return (
    <>
      <SavePrompt />
      <Card>
        <SectionTitle num="1">가구 유형</SectionTitle>
        <div className="flex gap-1.5 bg-[#F2F4F6] rounded-xl p-1 mb-4">
          {(['single', 'one-earner', 'dual-earner'] as HouseholdType[]).map(t => (
            <button
              key={t}
              onClick={() => { setType(t); setResult(null); }}
              className={`flex-1 py-2.5 rounded-[10px] text-sm font-bold text-center border-0 cursor-pointer transition-all ${
                type === t
                  ? 'bg-white text-[var(--primary)] shadow-sm'
                  : 'bg-transparent text-[var(--sub)]'
              }`}
            >
              {LABELS[t]}
            </button>
          ))}
        </div>

        <div className="bg-[var(--bg)] rounded-xl px-3 py-2.5 mb-4">
          <p className="text-xs text-[var(--sub)] leading-relaxed m-0">
            {type === 'single' && '배우자·부양자녀·생계를 같이하는 부양 부모(70세 이상)가 없는 가구'}
            {type === 'one-earner' && '배우자의 총급여가 300만원 미만이거나 부양자녀·부양 부모가 있는 가구'}
            {type === 'dual-earner' && '배우자의 총급여가 300만원 이상인 가구'}
          </p>
        </div>

        <SliderInput
          label="총급여액"
          value={income}
          onChange={setIncome}
          min={0}
          max={config.incomeMax}
          step={100}
          unit="만원"
          minLabel="0"
          maxLabel={`${config.incomeMax.toLocaleString()}만`}
          trackId="eitc-income"
        />

        {type !== 'single' && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">18세 미만 자녀 수</label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setChildren(n)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] cursor-pointer transition-all ${
                    children === n
                      ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]'
                      : 'border-[var(--line)] bg-white text-[var(--sub)]'
                  }`}
                >
                  {n}명
                </button>
              ))}
            </div>
          </div>
        )}

        <SliderInput
          label="가구 재산 합계"
          value={asset}
          onChange={setAsset}
          min={0}
          max={30000}
          step={1000}
          unit="만원"
          hint="(주택+토지+건물+예금+자동차 등)"
          minLabel="0"
          maxLabel="3억"
          trackId="eitc-asset"
        />
      </Card>

      <CtaButton label="장려금 계산하기" onClick={calculate} />

      {result && (
        <div id="calc-result">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <SectionTitle num="2">예상 장려금</SectionTitle>
              <TrustBadge />
            </div>

            <ResultPanel
              label="총 장려금 예상액"
              value={won(result.total)}
              sub={result.total === 0 ? '지급 대상이 아닙니다' : '연 1회 지급 (정기 신청 기준 9월)'}
              variant={result.total > 0 ? 'primary' : 'neutral'}
            />

            <div className="flex flex-col gap-2 mt-4">
              <ResultRow label="근로장려금" value={won(result.eitc)} bold />
              {type !== 'single' && children > 0 && (
                <ResultRow label={`자녀장려금 (${children}명)`} value={won(result.childCredit)} bold />
              )}
              {result.assetReduced && (
                <ResultRow label="재산 감액" value="50% 감액 적용" color="#E5484D" />
              )}
              {result.assetExceeded && (
                <ResultRow label="재산 초과" value="3억 초과 — 지급 불가" color="#E5484D" />
              )}
            </div>

            {result.total > 0 && (
              <div className="mt-4 bg-[var(--bg)] rounded-xl px-3 py-2.5">
                <div className="text-xs font-bold text-[var(--ink)] mb-1.5">📅 신청 일정</div>
                <div className="flex flex-col gap-1 text-xs text-[var(--sub)]">
                  <div><b className="text-[var(--ink)]">정기 신청:</b> 매년 5월 1일 ~ 5월 31일 → 9월 지급</div>
                  <div><b className="text-[var(--ink)]">반기 신청:</b> 상반기 9월, 하반기 3월 → 6월·12월 지급</div>
                  <div><b className="text-[var(--ink)]">기한 후 신청:</b> 6월 1일 ~ 11월 30일 → 10% 감액</div>
                </div>
              </div>
            )}

            <div className="mt-4 bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <div className="text-xs font-bold text-[var(--ink)] mb-1.5">💰 2026년 최대 지급액</div>
              <div className="flex flex-col gap-1 text-xs text-[var(--sub)]">
                <div><b>단독가구:</b> 근로장려금 최대 165만원</div>
                <div><b>홑벌이가구:</b> 근로장려금 최대 285만원</div>
                <div><b>맞벌이가구:</b> 근로장려금 최대 330만원</div>
                <div><b>자녀장려금:</b> 자녀 1인당 최대 100만원 (최소 50만원)</div>
              </div>
            </div>

            <ShareButtons title="근로장려금 계산기" />
          </Card>
          <EmbedCode href="/tax/eitc" />
        </div>
      )}
      <div className="pb-24" />
    </>
  );
}
