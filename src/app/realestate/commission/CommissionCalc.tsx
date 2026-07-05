'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';

type DealType = '매매' | '전세' | '월세';

interface RateRow { max: number; rate: number; cap?: number; label: string }

const SALE_RATES: RateRow[] = [
  { max: 5000, rate: 0.006, cap: 250000, label: '5천만 미만' },
  { max: 20000, rate: 0.005, cap: 800000, label: '5천만~2억' },
  { max: 60000, rate: 0.004, label: '2억~6억' },
  { max: 90000, rate: 0.005, label: '6억~9억' },
  { max: 120000, rate: 0.005, label: '9억~12억' },
  { max: 150000, rate: 0.006, label: '12억~15억' },
  { max: Infinity, rate: 0.007, label: '15억 이상' },
];

const RENT_RATES: RateRow[] = [
  { max: 5000, rate: 0.005, cap: 200000, label: '5천만 미만' },
  { max: 10000, rate: 0.004, cap: 300000, label: '5천만~1억' },
  { max: 60000, rate: 0.003, label: '1억~6억' },
  { max: 120000, rate: 0.004, label: '6억~12억' },
  { max: 150000, rate: 0.005, label: '12억~15억' },
  { max: Infinity, rate: 0.006, label: '15억 이상' },
];

function getRate(amount: number, table: RateRow[]) {
  const row = table.find(r => amount < r.max) || table[table.length - 1];
  const raw = amount * 10000 * row.rate;
  const fee = row.cap ? Math.min(raw, row.cap) : raw;
  return { rate: row.rate, fee: Math.round(fee) };
}

export default function CommissionCalc() {
  const [dealType, setDealType] = useState<DealType>('매매');
  const [price, setPrice] = useState(50000);
  const [monthly, setMonthly] = useState(50);
  const [result, setResult] = useState<{ rate: number; fee: number; vat: number; total: number } | null>(null);

  const calc = () => {
    let amount = price;
    const table = dealType === '매매' ? SALE_RATES : RENT_RATES;
    if (dealType === '월세') {
      amount = price + monthly * 100;
    }
    const { rate, fee } = getRate(amount, table);
    const vat = Math.round(fee * 0.1);
    setResult({ rate, fee, vat, total: fee + vat });
    scrollToResult();
  };

  const types: DealType[] = ['매매', '전세', '월세'];

  return (<>
    <Card>
      <SectionTitle num="1">거래 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">거래유형</label>
        <div className="flex gap-1.5 bg-[#F2F4F6] rounded-xl p-1">
          {types.map(t => (
            <button key={t} onClick={() => { setDealType(t); setResult(null); }}
              className={`flex-1 py-2.5 rounded-[10px] text-sm font-bold border-0 cursor-pointer transition-all ${dealType === t ? 'bg-white text-[var(--primary)] shadow-sm' : 'bg-transparent text-[var(--sub)]'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">{dealType === '월세' ? '보증금' : '거래금액'} <span className="text-xs text-[var(--sub)] font-medium ml-1">{price.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={price} min={0} onChange={e => setPrice(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
          <span className="text-sm font-bold text-[var(--sub)]">만원</span>
        </div>
        <input type="range" min={0} max={200000} step={1000} value={price} onChange={e => setPrice(+e.target.value)} className="w-full mt-3.5" />
      </div>
      {dealType === '월세' && (
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">월세 <span className="text-xs text-[var(--sub)] font-medium ml-1">{monthly.toLocaleString()}만원</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={monthly} min={0} onChange={e => setMonthly(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원/월</span>
          </div>
        </div>
      )}
    </Card>

    {result && (
      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">예상 중개수수료</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">
            {dealType} · 요율 {(result.rate * 100).toFixed(1)}%
          </span>
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">총 비용 (부가세 포함)</div>
            <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.total)}</div>
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">적용 요율</span><span className="font-bold">{(result.rate * 100).toFixed(1)}%</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">중개수수료</span><span className="font-bold">{won(result.fee)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">부가세 (10%)</span><span className="font-bold">{won(result.vat)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">총 비용</span><span className="font-bold">{won(result.total)}</span></div>
          </div>
        </div>
      </div>
    )}

    {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 중개수수료를 계산해 드려요.</Card>}

    <Card>
      <div className="text-[13px] font-extrabold mb-2">📋 매매 중개수수료 요율표</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">거래금액</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">요율</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">한도</th></tr></thead>
        <tbody>
          {SALE_RATES.map(r => (
            <tr key={r.label} className="border-b border-[var(--line)]"><td className="py-2 font-bold">{r.label}</td><td className="text-right py-2 font-bold">{(r.rate * 100).toFixed(1)}%</td><td className="text-right py-2 font-bold">{r.cap ? won(r.cap) : '-'}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="text-[13px] font-extrabold mb-2 mt-5">📋 전세·임대 중개수수료 요율표</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">거래금액</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">요율</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">한도</th></tr></thead>
        <tbody>
          {RENT_RATES.map(r => (
            <tr key={r.label} className="border-b border-[var(--line)]"><td className="py-2 font-bold">{r.label}</td><td className="text-right py-2 font-bold">{(r.rate * 100).toFixed(1)}%</td><td className="text-right py-2 font-bold">{r.cap ? won(r.cap) : '-'}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="text-[11px] text-[var(--sub)] mt-2">주택 기준 · 오피스텔/상가는 별도 요율 적용</div>
    </Card>

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <b className="text-[#6B7684]">계산 가정</b><br/>· 주택 기준 법정 상한요율 적용<br/>· 월세: 환산보증금 = 보증금 + (월세 x 100)
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">참고용 추정 도구입니다. 실제 수수료는 중개사와 협의하세요.</div>
    </footer>

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 부동산 중개수수료(복비)란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">부동산 중개수수료는 매매, 전세, 월세 등 부동산 거래 시 공인중개사에게 지불하는 서비스 대가입니다. 흔히 &apos;복비&apos;라고 부르며, 거래 유형과 금액에 따라 법정 상한요율이 정해져 있습니다. 매매의 경우 거래금액 구간별로 0.4%~0.7%, 전세·임대의 경우 0.3%~0.6%가 적용됩니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">중개수수료는 매도인(임대인)과 매수인(임차인)이 각각 부담하는 것이 원칙이며, 상한요율은 최대 금액을 의미하므로 협의를 통해 낮출 수 있습니다. 부가가치세(10%)는 중개사의 과세 유형에 따라 별도로 부과될 수 있으니 거래 전 반드시 확인하시기 바랍니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 복비(중개수수료)를 깎을 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 법정 상한요율은 말 그대로 최대 한도입니다. 이 범위 안에서 중개사와 자유롭게 협의하여 수수료를 낮출 수 있습니다. 거래금액이 클수록 협상 여지가 크며, 계약 전에 수수료를 미리 확인하는 것이 좋습니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 부가세는 별도인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 공인중개사가 일반과세자인 경우 중개수수료의 10%가 부가가치세로 별도 부과됩니다. 간이과세자(연매출 8,000만원 미만)인 경우에는 부가세가 면제되거나 크게 줄어들 수 있으니, 계약 전에 중개사의 과세 유형을 확인하세요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 요율 상한은 법적 기준인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 「공인중개사법」 시행규칙에 의해 거래 유형·금액별 상한요율이 법정되어 있습니다. 중개사가 이 상한을 초과하여 수수료를 받으면 법 위반에 해당하며, 과잉 수수료 수령 시 행정 제재를 받을 수 있습니다.</div></div>
      </div>
    </Card>

    <CtaButton label="중개수수료 계산하기" onClick={calc} />
  </>);
}
