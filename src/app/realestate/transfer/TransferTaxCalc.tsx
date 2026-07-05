'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { progressiveTax } from '@/utils/tax';

type HoldPeriod = '1년미만' | '1~2년' | '2년이상';

export default function TransferTaxCalc() {
  const [acqPrice, setAcqPrice] = useState(30000);
  const [sellPrice, setSellPrice] = useState(50000);
  const [holdPeriod, setHoldPeriod] = useState<HoldPeriod>('2년이상');
  const [oneHouse, setOneHouse] = useState(false);
  const [result, setResult] = useState<{
    gain: number; taxBase: number; transferTax: number; localTax: number; total: number;
    deduction: number; basicDeduction: number;
  } | null>(null);

  const calc = () => {
    const acq = acqPrice * 10000;
    const sell = sellPrice * 10000;
    let gain = sell - acq;
    if (gain <= 0) {
      setResult({ gain, taxBase: 0, transferTax: 0, localTax: 0, total: 0, deduction: 0, basicDeduction: 0 });
      return;
    }

    let taxableGain = gain;

    // 1세대1주택: 양도가 12억 초과분만 과세
    if (oneHouse) {
      if (sell <= 1200000000) {
        setResult({ gain, taxBase: 0, transferTax: 0, localTax: 0, total: 0, deduction: 0, basicDeduction: 0 });
        return;
      }
      const ratio = (sell - 1200000000) / sell;
      taxableGain = Math.round(gain * ratio);
    }

    // 장기보유특별공제 (2년 이상 보유 시)
    let deductionRate = 0;
    if (holdPeriod === '2년이상') {
      if (oneHouse) {
        deductionRate = 0.80; // 1세대1주택 3년 이상 보유 시 최대 80%
      } else {
        deductionRate = 0.30; // 일반: 연 2%씩 최대 30% (15년)
      }
    }
    const deduction = Math.round(taxableGain * deductionRate);
    taxableGain -= deduction;

    // 기본공제 250만원
    const basicDeduction = 2500000;
    const taxBase = Math.max(0, taxableGain - basicDeduction);

    // 보유기간별 세율
    let transferTax: number;
    if (holdPeriod === '1년미만') {
      transferTax = Math.round(taxBase * 0.45); // 1년 미만: 45%
    } else if (holdPeriod === '1~2년') {
      transferTax = Math.round(taxBase * 0.35); // 1~2년: 기본세율(35% 단일)은 아니지만 간편 적용
      // 실제로는 기본세율이지만 간편계산기이므로 누진세율 적용
      transferTax = Math.round(progressiveTax(taxBase));
    } else {
      transferTax = Math.round(progressiveTax(taxBase));
    }

    const localTax = Math.round(transferTax * 0.1);

    setResult({
      gain,
      taxBase,
      transferTax,
      localTax,
      total: transferTax + localTax,
      deduction,
      basicDeduction,
    });
  };

  const periods: HoldPeriod[] = ['1년미만', '1~2년', '2년이상'];

  return (<>
    <Card>
      <SectionTitle num="1">거래 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">취득가액 <span className="text-xs text-[var(--sub)] font-medium ml-1">{acqPrice.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={acqPrice} min={0} onChange={e => setAcqPrice(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
          <span className="text-sm font-bold text-[var(--sub)]">만원</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">양도가액 <span className="text-xs text-[var(--sub)] font-medium ml-1">{sellPrice.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={sellPrice} min={0} onChange={e => setSellPrice(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
          <span className="text-sm font-bold text-[var(--sub)]">만원</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">보유기간</label>
        <select value={holdPeriod} onChange={e => setHoldPeriod(e.target.value as HoldPeriod)}
          className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
          {periods.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="mb-0">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" checked={oneHouse} onChange={e => setOneHouse(e.target.checked)}
            className="w-5 h-5 rounded accent-[var(--primary)]" />
          <span className="text-sm font-bold">1세대 1주택</span>
        </label>
        <div className="text-xs text-[var(--sub)] mt-1.5 ml-[30px]">2년 이상 보유(조정대상지역은 2년 거주) 시 양도가 12억 초과분만 과세</div>
      </div>
    </Card>

    {result && (
      <div>
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">예상 양도소득세</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">
            {holdPeriod} 보유{oneHouse ? ' · 1세대1주택' : ''}
          </span>
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">예상 총 세금</div>
            <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.total)}</div>
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">양도차익</span><span className="font-bold">{won(result.gain)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">장기보유특별공제</span><span className="font-bold">-{won(result.deduction)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">기본공제</span><span className="font-bold">-{won(result.basicDeduction)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">과세표준</span><span className="font-bold">{won(result.taxBase)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">양도소득세</span><span className="font-bold">{won(result.transferTax)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">지방소득세 (10%)</span><span className="font-bold">{won(result.localTax)}</span></div>
          </div>
        </div>
      </div>
    )}

    {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 예상 양도소득세를 계산해 드려요.</Card>}

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <b className="text-[#6B7684]">계산 가정</b><br/>· 필요경비(취득세, 중개수수료 등) 미포함 간편 계산<br/>· 1세대1주택: 양도가 12억 초과분 과세, 보유 3년 이상 시 80% 공제<br/>· 1년 미만 보유: 45% 단일세율
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">참고용 간편 계산입니다. 정확한 세액은 세무사 또는 국세청 홈택스에서 확인하세요.</div>
    </footer>

    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 1세대1주택 비과세 조건은?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 양도가 12억원 이하인 경우 비과세입니다. 12억 초과분에 대해서만 양도세가 과세되며, 2년 이상 보유(조정대상지역은 2년 거주)가 필요합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 장기보유특별공제란?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 부동산을 장기간 보유한 경우 양도차익에서 일정 비율을 공제해 주는 제도입니다. 일반적으로 연 2%씩 최대 30%(15년), 1세대1주택은 최대 80%까지 공제됩니다.</div></div>
      </div>
    </Card>

    <CtaButton label="양도세 계산하기" onClick={calc} />
  </>);
}
