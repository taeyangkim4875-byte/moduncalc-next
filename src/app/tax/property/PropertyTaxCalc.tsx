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
import { scrollToResult } from '@/utils/scroll';
import { getParams, setParams } from '@/utils/params';
import { trackCalcComplete } from '@/utils/analytics';

type HouseType = 'single' | 'general';

const FAIR_MARKET_RATIO = 0.6;

function calcPropertyTax(priceMan: number, type: HouseType) {
  const deductionMan = type === 'single' ? 120000 : 90000;
  const taxableMan = Math.max(0, priceMan - deductionMan);
  const taxBase = taxableMan * FAIR_MARKET_RATIO;

  if (taxBase <= 0) {
    return { taxBase: 0, mainTax: 0, ruralTax: 0, total: 0 };
  }

  const isSingle = type === 'single';
  let mainTax: number;

  if (isSingle) {
    if (taxBase <= 30000) mainTax = taxBase * 0.005;
    else if (taxBase <= 60000) mainTax = 150 + (taxBase - 30000) * 0.007;
    else if (taxBase <= 120000) mainTax = 360 + (taxBase - 60000) * 0.01;
    else if (taxBase <= 250000) mainTax = 960 + (taxBase - 120000) * 0.013;
    else if (taxBase <= 500000) mainTax = 2650 + (taxBase - 250000) * 0.015;
    else if (taxBase <= 940000) mainTax = 6400 + (taxBase - 500000) * 0.02;
    else mainTax = 15200 + (taxBase - 940000) * 0.027;
  } else {
    if (taxBase <= 30000) mainTax = taxBase * 0.005;
    else if (taxBase <= 60000) mainTax = 150 + (taxBase - 30000) * 0.007;
    else if (taxBase <= 120000) mainTax = 360 + (taxBase - 60000) * 0.01;
    else if (taxBase <= 250000) mainTax = 960 + (taxBase - 120000) * 0.013;
    else if (taxBase <= 500000) mainTax = 2650 + (taxBase - 250000) * 0.02;
    else if (taxBase <= 940000) mainTax = 7650 + (taxBase - 500000) * 0.03;
    else mainTax = 20850 + (taxBase - 940000) * 0.05;
  }

  mainTax = Math.round(mainTax * 10000);
  const ruralTax = Math.round(mainTax * 0.2);
  const total = mainTax + ruralTax;

  return { taxBase: taxBase * 10000, mainTax, ruralTax, total };
}

export default function PropertyTaxCalc() {
  const [priceMan, setPriceMan] = useState(90000);
  const [houseType, setHouseType] = useState<HouseType>('single');
  const [result, setResult] = useState<ReturnType<typeof calcPropertyTax> | null>(null);

  useEffect(() => {
    const p = getParams();
    if (p.price) setPriceMan(+p.price);
    if (p.type === 'general') setHouseType('general');
  }, []);

  function handleCalc() {
    const r = calcPropertyTax(priceMan, houseType);
    setResult(r);
    setParams(
      { price: priceMan, type: houseType },
      { calcId: '/tax/property', primaryOutput: r.total > 0 ? won(r.total) : '과세 대상 아님' },
    );
    trackCalcComplete('/tax/property', r.total > 0 ? won(r.total) : '0');
    scrollToResult();
  }

  return (
    <>
      <SavePrompt />

      <Card>
        <SectionTitle num="1">주택 정보 입력</SectionTitle>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">주택 유형</label>
          <div className="flex gap-1.5 bg-[#F2F4F6] rounded-xl p-1">
            {(['single', 'general'] as const).map(t => (
              <button
                key={t}
                onClick={() => setHouseType(t)}
                className={`flex-1 py-2.5 rounded-[10px] text-sm font-bold text-center border-0 cursor-pointer transition-all ${
                  houseType === t
                    ? 'bg-white text-[var(--primary)] shadow-sm'
                    : 'bg-transparent text-[var(--sub)]'
                }`}
              >
                {t === 'single' ? '1세대 1주택' : '일반(다주택)'}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[var(--sub)] mt-1.5 px-0.5">
            {houseType === 'single' ? '공제 12억원 적용' : '공제 9억원 적용'}
          </p>
        </div>

        <SliderInput
          label="주택 공시가격 합계"
          value={priceMan}
          onChange={setPriceMan}
          min={0}
          max={500000}
          step={1000}
          unit="만원"
          hint={`${(priceMan / 10000).toFixed(priceMan % 10000 === 0 ? 0 : 1)}억원`}
          minLabel="0"
          maxLabel="50억"
          trackId="property-price"
        />

        <div className="bg-[var(--bg)] rounded-xl px-3 py-2.5 text-[13px] text-[var(--sub)] font-medium">
          공정시장가액비율: <strong className="text-[var(--ink)]">60%</strong> (2026년 기준)
        </div>
      </Card>

      <CtaButton label="종부세 계산하기" onClick={handleCalc} />

      {result && (
        <div id="calc-result">
          <Card>
            <div className="flex justify-between items-center mb-3">
              <SectionTitle num="2">종합부동산세 결과</SectionTitle>
              <TrustBadge />
            </div>

            {result.total === 0 ? (
              <ResultPanel
                label="종부세 과세 대상이 아닙니다"
                value="0원"
                sub={`공시가격 ${(priceMan / 10000).toFixed(1)}억원 · ${houseType === 'single' ? '1주택 공제 12억' : '일반 공제 9억'} 이하`}
                variant="green"
              />
            ) : (
              <>
                <ResultPanel
                  label="종부세 + 농특세 합계"
                  value={won(result.total)}
                  sub={`월 환산 약 ${won(Math.round(result.total / 12))}`}
                />

                <div className="flex flex-col gap-2 mt-4">
                  <ResultRow label="과세표준" value={won(result.taxBase)} />
                  <ResultRow label="종합부동산세 본세" value={won(result.mainTax)} bold />
                  <ResultRow label="농어촌특별세 (20%)" value={won(result.ruralTax)} />
                  <ResultRow label="합계 납부액" value={won(result.total)} bold separator color="var(--primary)" />
                  <ResultRow label="월 환산" value={won(Math.round(result.total / 12))} />
                </div>

                <div className="bg-[#FFF8E1] rounded-xl px-3 py-2.5 mt-4 text-[12px] text-[#8B6914] font-medium leading-relaxed">
                  세부담 상한: {houseType === 'single' ? '전년도 대비 150%' : '전년도 대비 300%'}까지만 부과됩니다. 전년도 종부세가 있으면 실제 납부액이 줄어들 수 있습니다.
                </div>
              </>
            )}

            <ShareButtons title="종합부동산세 계산기" />
          </Card>

          <EmbedCode href="/tax/property" />
        </div>
      )}
    </>
  );
}
