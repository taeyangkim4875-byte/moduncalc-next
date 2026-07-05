'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import { won } from '@/utils/format';

type Direction = '외화→원화' | '원화→외화';

interface CurrencyInfo { code: string; name: string; rate: number; unit: number }

const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: '미국 달러', rate: 1380, unit: 1 },
  { code: 'EUR', name: '유로', rate: 1540, unit: 1 },
  { code: 'JPY', name: '일본 엔 (100엔)', rate: 960, unit: 100 },
  { code: 'CNY', name: '중국 위안', rate: 190, unit: 1 },
  { code: 'GBP', name: '영국 파운드', rate: 1780, unit: 1 },
];

export default function CurrencyCalc() {
  const [amount, setAmount] = useState(1);
  const [currIdx, setCurrIdx] = useState(0);
  const [direction, setDirection] = useState<Direction>('외화→원화');

  const curr = CURRENCIES[currIdx];
  const directions: Direction[] = ['외화→원화', '원화→외화'];

  let result: number;
  let resultLabel: string;
  if (direction === '외화→원화') {
    result = (amount / curr.unit) * curr.rate;
    resultLabel = won(result);
  } else {
    result = (amount / curr.rate) * curr.unit;
    resultLabel = curr.code === 'JPY'
      ? `${result.toFixed(2)} 엔`
      : `${result.toFixed(2)} ${curr.code}`;
  }

  return (<>
    <Card>
      <SectionTitle num="1">변환 설정</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">변환 방향</label>
        <div className="flex gap-1.5 bg-[#F2F4F6] rounded-xl p-1">
          {directions.map(d => (
            <button key={d} onClick={() => setDirection(d)}
              className={`flex-1 py-2.5 rounded-[10px] text-sm font-bold border-0 cursor-pointer transition-all ${direction === d ? 'bg-white text-[var(--primary)] shadow-sm' : 'bg-transparent text-[var(--sub)]'}`}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">통화</label>
        <select value={currIdx} onChange={e => setCurrIdx(+e.target.value)}
          className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
          {CURRENCIES.map((c, i) => <option key={c.code} value={i}>{c.code} - {c.name}</option>)}
        </select>
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">금액</label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={amount} min={0} onChange={e => setAmount(+e.target.value || 0)}
            className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
          <span className="text-sm font-bold text-[var(--sub)]">{direction === '외화→원화' ? curr.code : 'KRW'}</span>
        </div>
      </div>
    </Card>

    <div>
      <div className="text-lg font-extrabold mt-4 mb-3 px-1">변환 결과</div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">
          {curr.code} · {curr.unit === 100 ? '100엔당' : '1'} {curr.code} = {curr.rate.toLocaleString()}원
        </span>
        <div className="text-center py-2">
          <div className="text-sm font-bold text-[var(--sub)]">{direction === '외화→원화' ? '원화 환산액' : `${curr.code} 환산액`}</div>
          <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{resultLabel}</div>
          <div className="text-sm text-[var(--sub)]">
            {direction === '외화→원화'
              ? `${amount.toLocaleString()} ${curr.code} → 원화`
              : `${amount.toLocaleString()}원 → ${curr.code}`}
          </div>
        </div>
      </div>
    </div>

    <Card>
      <div className="text-[13px] font-extrabold mb-2">📋 주요 통화 환율표</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">통화</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">기준</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">환율(원)</th></tr></thead>
        <tbody>
          {CURRENCIES.map(c => (
            <tr key={c.code} className="border-b border-[var(--line)]"><td className="py-2 font-bold">{c.code} ({c.name})</td><td className="text-right py-2 font-bold">{c.unit}</td><td className="text-right py-2 font-bold">{c.rate.toLocaleString()}원</td></tr>
          ))}
        </tbody>
      </table>
    </Card>

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <div className="mt-1 bg-[#FFF8E1] border border-[#FFE082] rounded-xl p-3.5 text-[11px] text-[#8B6914]">고시환율 기준 참고용입니다. 실제 환율은 은행·송금 서비스에서 확인하세요. 환율은 수시로 변동됩니다.</div>
    </footer>
  </>);
}
