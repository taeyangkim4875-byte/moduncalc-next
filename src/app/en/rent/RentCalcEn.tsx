'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const won = (n: number) => '₩' + Math.round(n).toLocaleString();

export default function RentCalcEn() {
  const [mode, setMode] = useState<'toWolse' | 'toJeonse'>('toWolse');
  const [jeonse, setJeonse] = useState(30000); // 만원
  const [deposit, setDeposit] = useState(1000); // 만원
  const [rate, setRate] = useState(4.5); // 전환율 %

  // Jeonse → Wolse conversion
  const safeRate = rate || 0;
  const monthlyRent = safeRate ? (((jeonse || 0) - (deposit || 0)) * 10000 * (safeRate / 100)) / 12 : 0;

  // Wolse → Jeonse conversion
  const [wolse, setWolse] = useState(80); // 만원/월
  const [wolseDeposit, setWolseDeposit] = useState(1000);
  const jeonseEquiv = safeRate ? (wolseDeposit || 0) + ((wolse || 0) * 12 / (safeRate / 100)) / 10000 : 0;

  return (
    <>
      <Card>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('toWolse')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] cursor-pointer transition-colors ${mode === 'toWolse' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
            Jeonse → Wolse
          </button>
          <button onClick={() => setMode('toJeonse')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] cursor-pointer transition-colors ${mode === 'toJeonse' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
            Wolse → Jeonse
          </button>
        </div>

        {mode === 'toWolse' ? (
          <>
            <SectionTitle num="1">Jeonse to Monthly Rent</SectionTitle>
            <div className="mb-3">
              <label className="block text-sm font-bold mb-2">Jeonse Deposit</label>
              <div className="flex items-center gap-2.5">
                <input type="number" value={jeonse} onChange={e => setJeonse(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
                <span className="text-sm font-bold text-[var(--sub)]">만원</span>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-bold mb-2">New Deposit (보증금)</label>
              <div className="flex items-center gap-2.5">
                <input type="number" value={deposit} onChange={e => setDeposit(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
                <span className="text-sm font-bold text-[var(--sub)]">만원</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <SectionTitle num="1">Monthly Rent to Jeonse</SectionTitle>
            <div className="mb-3">
              <label className="block text-sm font-bold mb-2">Monthly Rent</label>
              <div className="flex items-center gap-2.5">
                <input type="number" value={wolse} onChange={e => setWolse(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
                <span className="text-sm font-bold text-[var(--sub)]">만원/mo</span>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-bold mb-2">Current Deposit</label>
              <div className="flex items-center gap-2.5">
                <input type="number" value={wolseDeposit} onChange={e => setWolseDeposit(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
                <span className="text-sm font-bold text-[var(--sub)]">만원</span>
              </div>
            </div>
          </>
        )}

        <div className="mb-2">
          <label className="block text-sm font-bold mb-2">Conversion Rate <span className="text-xs text-[var(--sub)] font-medium ml-1">{rate}%</span></label>
          <input type="range" min={1} max={10} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} className="w-full" />
          <div className="text-[11px] text-[var(--sub)] mt-1">Legal cap: Bank of Korea base rate + 2% (currently ~5.5%)</div>
        </div>
      </Card>

      <Card className="!p-6">
        <div className="text-center">
          {mode === 'toWolse' ? (
            <>
              <div className="text-xs font-bold text-[var(--sub)] mb-1">Equivalent Monthly Rent</div>
              <div className="text-[42px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(monthlyRent)}</div>
              <div className="text-sm text-[var(--sub)] mt-1">with {deposit.toLocaleString()}만원 deposit</div>
            </>
          ) : (
            <>
              <div className="text-xs font-bold text-[var(--sub)] mb-1">Equivalent Jeonse</div>
              <div className="text-[42px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(jeonseEquiv * 10000)}</div>
              <div className="text-sm text-[var(--sub)] mt-1">{Math.round(jeonseEquiv).toLocaleString()}만원</div>
            </>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 Understanding Korean Rentals</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Jeonse (전세)</b>: You pay a large deposit (typically ₩50M–300M+) and NO monthly rent. The landlord invests your deposit and earns returns. When your lease ends, you get the full deposit back. Risk: if the landlord can&apos;t repay, recovery can be difficult.</p>
          <p><b>Wolse (월세)</b>: Smaller deposit + monthly rent, similar to Western rentals. More common for foreigners and short-term stays.</p>
          <p><b>Banjeonse (반전세)</b>: A hybrid — moderate deposit with reduced monthly rent.</p>
          <p><b>Tip for foreigners:</b> Always register your lease at the local 주민센터 (community center) for legal protection. This gives you priority claim on the deposit if anything goes wrong.</p>
        </div>
      </Card>
    </>
  );
}
