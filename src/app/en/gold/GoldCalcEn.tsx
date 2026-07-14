'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Unit = 'don' | 'g' | 'oz';

const UNIT_TO_G: Record<Unit, number> = {
  don: 3.75,
  g: 1,
  oz: 31.1035,
};

const UNIT_LABELS: Record<Unit, string> = {
  don: 'Don (돈)',
  g: 'Grams',
  oz: 'Troy oz',
};

const QUICK_REF = [
  { label: '1 Don', g: 3.75 },
  { label: '3.75 Don (1 Nyang)', g: 14.0625 },
  { label: '10 Don', g: 37.5 },
  { label: '1 Troy Ounce', g: 31.1035 },
  { label: '100g', g: 100 },
];

export default function GoldCalcEn() {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<Unit>('g');
  const [goldPrice, setGoldPrice] = useState('115000');

  const weightNum = +weight || 0;
  const pricePerG = +goldPrice || 0;
  const weightInG = weightNum * UNIT_TO_G[unit];
  const totalPrice = Math.round(weightInG * pricePerG);

  return (
    <>
      {/* Input */}
      <Card>
        <SectionTitle num="1">Weight &amp; Price</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">Gold Weight</label>
            <div className="flex gap-2">
              <input
                type="number"
                inputMode="decimal"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="Enter weight"
                className="flex-1 py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
              />
              <div className="flex gap-1">
                {(['don', 'g', 'oz'] as const).map(u => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${unit === u ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
                  >
                    {UNIT_LABELS[u]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">Gold Price (KRW/g)</label>
            <input
              type="number"
              inputMode="numeric"
              value={goldPrice}
              onChange={e => setGoldPrice(e.target.value)}
              placeholder="115000"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
            <div className="text-[10px] text-[var(--sub)] mt-1">Enter the current market price. Default is for reference only.</div>
          </div>
        </div>
      </Card>

      {/* Result */}
      <Card className="!p-5">
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">Total Value</div>
          <div className="text-[40px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none tabular-nums">
            {totalPrice.toLocaleString()} KRW
          </div>
          <div className="text-xs text-[var(--sub)] mt-2">
            {weightNum > 0 && `${weightNum} ${UNIT_LABELS[unit]} = ${weightInG.toFixed(2)}g`}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{weightInG.toFixed(2)}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">Grams</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{(weightInG / 3.75).toFixed(2)}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">Don (돈)</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{(weightInG / 31.1035).toFixed(4)}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">Troy oz</div>
          </div>
        </div>
      </Card>

      {/* Quick Reference */}
      <Card>
        <SectionTitle num="2">Quick Reference Prices</SectionTitle>
        <div className="flex flex-col gap-1.5">
          {QUICK_REF.map(item => (
            <div key={item.label} className="flex justify-between items-center bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <span className="text-[13px] font-semibold">{item.label} ({item.g}g)</span>
              <span className="text-[13px] font-bold tabular-nums">{Math.round(item.g * pricePerG).toLocaleString()} KRW</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Gold Buying Guide for Korea</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Korean Gold Units:</b> Korea uses a traditional unit called &quot;don&quot; (돈). 1 don = 3.75 grams. When shopping at Jongno gold shops (종로 금은방) in Seoul, prices are quoted per don. 1 nyang (냥) = 10 don = 37.5g. The international standard troy ounce (oz) = 31.1035g.</p>
          <p><b>Where to Buy Gold in Korea:</b> Jongno in Seoul is famous for its gold shops (금은방). You can also trade through KRX Gold Market (Korea Exchange), which is VAT-exempt and capital gains tax-free. Banks offer &quot;gold banking&quot; (골드뱅킹) accounts. Gold ETFs like KODEX Gold Futures are available on the stock exchange.</p>
          <p><b>Tax on Gold in Korea:</b> Physical gold purchases (gold bars, jewelry) include 10% VAT. KRX Gold Market trades are VAT-exempt with no capital gains tax, making it the most tax-efficient option. Gold ETFs are subject to 15.4% dividend income tax on gains.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. How much does 1 don of gold weigh?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 1 don (돈) equals 3.75 grams. This is the traditional Korean unit for gold. 1 nyang (냥) = 10 don = 37.5 grams.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. Where can I buy gold in Korea?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. You can buy gold at Jongno gold shops in Seoul, KRX Gold Market, banks offering gold banking, or online. Jongno is the most popular area for physical gold purchases.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. Is there tax on gold purchases in Korea?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. Physical gold includes 10% VAT. KRX Gold Market is VAT-exempt and capital gains tax-free, making it the most tax-efficient option for investment purposes.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          Gold prices fluctuate in real time. The default price is for reference only. Check current prices from official sources before trading.
        </div>
      </footer>
    </>
  );
}
