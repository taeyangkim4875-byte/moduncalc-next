'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import SliderInput from '@/components/SliderInput';
import ResultRow from '@/components/ResultRow';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParamsWithProfile, setParams } from '@/utils/params';
import ChainBanner from '@/components/ChainBanner';
import JourneyBreadcrumb from '@/components/JourneyBreadcrumb';
import ProfileBanner from '@/components/ProfileBanner';
import SavePrompt from '@/components/SavePrompt';
import ModeToggle from '@/components/ModeToggle';
import { bisect } from '@/utils/solver';

function calcTotalTax(price: number, houseCount: number, area: number) {
  const priceWon = price * 10000;
  let rate: number;
  if (houseCount === 1) {
    if (price <= 60000) rate = 0.01;
    else if (price <= 90000) { const r = (price / 10000 * 2 / 3 - 3) / 100; rate = Math.max(0.01, Math.min(0.03, r)); }
    else rate = 0.03;
  } else if (houseCount === 2) rate = 0.08;
  else rate = 0.12;
  const acqTax = Math.round(priceWon * rate);
  const nongTax = area <= 85 ? 0 : Math.round(priceWon * 0.002);
  const eduTax = Math.round(acqTax * 0.1);
  return { acqTax, nongTax, eduTax, total: acqTax + nongTax + eduTax, rate };
}

interface Result {
  maxPrice: number;
  acqTax: number;
  nongTax: number;
  eduTax: number;
  total: number;
  rate: number;
}

export default function AcqTaxReverse() {
  const [targetTax, setTargetTax] = useState(500);
  const [houseCount, setHouseCount] = useState(1);
  const [area, setArea] = useState(85);
  const [result, setResult] = useState<Result | null>(null);
  const [noSolution, setNoSolution] = useState(false);
  const [autoCalc, setAutoCalc] = useState(false);
  const [profileFilled, setProfileFilled] = useState<string[]>([]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const { params: p, profileKeys } = getParamsWithProfile();
    if (!Object.keys(p).length) return;
    if (p.targetTax) setTargetTax(+p.targetTax);
    if (p.houseCount) setHouseCount(+p.houseCount);
    if (p.area) setArea(+p.area);
    setProfileFilled(profileKeys);
    setAutoCalc(true);
  }, []);

  useEffect(() => {
    if (autoCalc) { calc(); setAutoCalc(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCalc]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function calc() {
    if (targetTax <= 0) return;
    const targetWon = targetTax * 10000;
    const fn = (p: number) => calcTotalTax(p, houseCount, area).total - targetWon;
    const sol = bisect(fn, 0, 500000);

    if (!sol.converged || isNaN(sol.value)) {
      setNoSolution(true);
      setResult(null);
      return;
    }

    const maxPrice = Math.floor(sol.value);
    const breakdown = calcTotalTax(maxPrice, houseCount, area);
    setNoSolution(false);
    setResult({
      maxPrice,
      acqTax: breakdown.acqTax,
      nongTax: breakdown.nongTax,
      eduTax: breakdown.eduTax,
      total: breakdown.total,
      rate: breakdown.rate,
    });
    setParams({ targetTax, houseCount, area }, { primaryOutput: `매수한도 ${maxPrice >= 10000 ? `${Math.floor(maxPrice / 10000)}억${maxPrice % 10000 ? ` ${(maxPrice % 10000).toLocaleString()}만` : ''}` : maxPrice.toLocaleString() + '만'}원` });
    scrollToResult();
  }

  const seg = (opts: { label: string; value: number }[], current: number, set: (v: number) => void) =>
    <div className="flex flex-wrap gap-2">{opts.map(o => <button key={o.value} onClick={() => set(o.value)} className={`flex-1 min-w-[60px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${current === o.value ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]' : 'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{o.label}</button>)}</div>;

  const fmtPrice = (p: number) => p >= 10000 ? `${Math.floor(p / 10000)}억${p % 10000 ? ` ${(p % 10000).toLocaleString()}만` : ''}원` : `${p.toLocaleString()}만원`;

  return (<>
    <ChainBanner />
    <JourneyBreadcrumb currentHref="/realestate/acqtax/reverse" />
    <ProfileBanner filledKeys={profileFilled} />
    <ModeToggle forwardHref="/realestate/acqtax" reverseHref="/realestate/acqtax/reverse" mode="reverse" forwardLabel="매매가 → 취득세" reverseLabel="취득세 → 매수한도" />

    <Card>
      <SectionTitle num="1">취득세 예산</SectionTitle>
      <SliderInput
        label="취득세 예산"
        hint={`${targetTax.toLocaleString()}만원`}
        value={targetTax}
        onChange={v => setTargetTax(v || 0)}
        min={0}
        max={5000}
        step={50}
        unit="만원"
      />
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">주택 수</label>
        {seg([{ label: '1주택', value: 1 }, { label: '2주택', value: 2 }, { label: '3주택+', value: 3 }], houseCount, setHouseCount)}
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">면적 <span className="text-xs text-[var(--sub)] font-medium ml-1">85㎡ 이하 농특세 면제</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={area || ''} onChange={e => setArea(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
          <span className="text-sm font-bold text-[var(--sub)]">㎡</span>
        </div>
      </div>
    </Card>

    {noSolution && (
      <Card className="bg-[#FFF4E5] border-[#F59E0B]">
        <div className="text-sm font-bold text-[#B26A00]">해당 조건에서는 취득세 {targetTax.toLocaleString()}만원 이내 매수가 어렵습니다.</div>
        <div className="text-xs text-[#B26A00] mt-1">취득세 예산을 늘리거나 조건을 변경해 보세요.</div>
      </Card>
    )}

    {result && (
      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">매수 가능 금액</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">
            {houseCount === 1 ? '1주택' : houseCount === 2 ? '2주택' : '3주택+'} · 세율 {(result.rate * 100).toFixed(1)}%
          </span>
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">최대 매수 가능 금액</div>
            <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{fmtPrice(result.maxPrice)}</div>
            <div className="text-sm text-[var(--sub)]">취득세 예산 {targetTax.toLocaleString()}만원 기준</div>
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <ResultRow label="취득세" value={won(result.acqTax)} />
            <ResultRow label={`농어촌특별세${area <= 85 ? ' (면제)' : ''}`} value={won(result.nongTax)} />
            <ResultRow label="지방교육세" value={won(result.eduTax)} />
            <ResultRow label="세금 합계" value={won(result.total)} bold />
          </div>
        </div>
      </div>
    )}

    <SavePrompt />
    {result && <ShareButtons title="취득세 역산 결과" />}

    {!result && !noSolution && <Card className="text-center text-[var(--sub)] text-sm py-8">취득세 예산을 입력하면 매수 가능 금액을 역산해 드려요.</Card>}

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">참고용 추정치입니다. 정확한 세액은 관할 지자체에 확인하세요.</div>
    </footer>

    <Card>
      <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed">취득세 예산이 정해져 있을 때, 그 안에서 살 수 있는 최대 집값을 역산해 드려요. 주택 수와 면적에 따라 세율이 달라지는 것도 자동 반영됩니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 취득세 예산은 어떻게 잡아야 하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 일반적으로 매매가의 1~3% 수준이에요. 다주택자는 8~12%까지 올라가니 미리 계산해 보세요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 생애 첫 주택 감면은 반영되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 이 계산기는 법정 기본 세율을 적용해요. 감면 대상이면 실제로는 더 비싼 집을 살 수 있어요.</div></div>
      </div>
    </Card>

    <CtaButton label="매수 한도 역산하기" onClick={calc} />
  </>);
}
