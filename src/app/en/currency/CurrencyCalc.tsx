'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1380 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 1520 },
  { code: 'JPY', name: 'Japanese Yen (100)', symbol: '¥', rate: 950 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 1780 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 190 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1010 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 900 },
  { code: 'VND', name: 'Vietnamese Dong (1000)', symbol: '₫', rate: 55 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', rate: 24 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', rate: 40 },
  { code: 'IDR', name: 'Indonesian Rupiah (1000)', symbol: 'Rp', rate: 85 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1050 },
];

export default function CurrencyCalc() {
  const [amount, setAmount] = useState(100);
  const [direction, setDirection] = useState<'toKRW' | 'fromKRW'>('toKRW');
  const [selected, setSelected] = useState('USD');

  const currency = CURRENCIES.find(c => c.code === selected)!;
  const isUnit = currency.code === 'JPY' || currency.code === 'VND' || currency.code === 'IDR';
  const unitMultiplier = isUnit ? (currency.code === 'JPY' ? 100 : 1000) : 1;

  const converted = direction === 'toKRW'
    ? amount * currency.rate / unitMultiplier
    : amount / currency.rate * unitMultiplier;

  return (
    <>
      <Card>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setDirection('toKRW')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] cursor-pointer transition-colors ${direction === 'toKRW' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
            Foreign → KRW
          </button>
          <button onClick={() => setDirection('fromKRW')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] cursor-pointer transition-colors ${direction === 'fromKRW' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
            KRW → Foreign
          </button>
        </div>

        <SectionTitle num="1">Amount</SectionTitle>
        <div className="flex items-center gap-2.5 mb-4">
          <input type="number" value={amount} onChange={e => setAmount(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
          <span className="text-sm font-bold text-[var(--sub)]">{direction === 'toKRW' ? selected : 'KRW'}</span>
        </div>

        <SectionTitle num="2">Currency</SectionTitle>
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {CURRENCIES.map(c => (
            <button key={c.code} onClick={() => setSelected(c.code)} className={`py-2 rounded-lg text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${selected === c.code ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
              {c.code}
            </button>
          ))}
        </div>
      </Card>

      <Card className="!p-6">
        <div className="text-center">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">
            {direction === 'toKRW' ? `${amount.toLocaleString()} ${selected} =` : `₩${amount.toLocaleString()} =`}
          </div>
          <div className="text-[42px] font-extrabold text-[var(--primary-dark)] tracking-tight">
            {direction === 'toKRW' ? `₩${Math.round(converted).toLocaleString()}` : `${currency.symbol}${converted < 100 ? converted.toFixed(2) : Math.round(converted).toLocaleString()}`}
          </div>
          <div className="text-xs text-[var(--sub)] mt-2">
            Rate: 1 {isUnit ? `${unitMultiplier} ` : ''}{selected} = ₩{currency.rate.toLocaleString()}
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="📊">Quick Reference Rates</SectionTitle>
        <div className="flex flex-col gap-1.5">
          {CURRENCIES.map(c => (
            <div key={c.code} className={`flex justify-between items-center px-3 py-2 rounded-lg text-[13px] ${c.code === selected ? 'bg-[var(--primary-weak)]' : 'bg-[var(--bg)]'}`}>
              <span className="font-semibold">{c.symbol} {c.name}</span>
              <span className="font-bold text-[var(--primary-dark)]">₩{c.rate.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 Currency Exchange Tips</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2">
          <p><b>Best rates:</b> Licensed money changers in Myeongdong, Itaewon, or Dongdaemun typically offer the best rates. Avoid airport and hotel exchanges.</p>
          <p><b>ATMs:</b> Global ATMs (Woori Bank, KB, 7-Eleven) accept foreign cards. Check your bank&apos;s foreign transaction fees beforehand.</p>
          <p><b>Cards:</b> Korea is very card-friendly. Most places accept Visa/Mastercard, but some traditional markets and small shops are cash-only.</p>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          Exchange rates shown are approximate reference rates. Actual rates vary by provider and time. Check your bank or money changer for live rates.
        </div>
      </footer>
    </>
  );
}
