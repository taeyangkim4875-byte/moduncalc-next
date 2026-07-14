'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const tippingByCountry = [
  { country: 'South Korea', flag: '🇰🇷', tip: '0%', note: 'Not expected' },
  { country: 'Japan', flag: '🇯🇵', tip: '0%', note: 'Can be offensive' },
  { country: 'China', flag: '🇨🇳', tip: '0%', note: 'Not customary' },
  { country: 'USA', flag: '🇺🇸', tip: '15-20%', note: 'Expected' },
  { country: 'Canada', flag: '🇨🇦', tip: '15-20%', note: 'Expected' },
  { country: 'UK', flag: '🇬🇧', tip: '10-15%', note: 'Appreciated' },
  { country: 'France', flag: '🇫🇷', tip: '5-10%', note: 'Service included' },
  { country: 'Germany', flag: '🇩🇪', tip: '5-10%', note: 'Round up' },
  { country: 'Australia', flag: '🇦🇺', tip: '0-10%', note: 'Not expected' },
  { country: 'Thailand', flag: '🇹🇭', tip: '10%', note: 'Appreciated' },
];

export default function TipCalc() {
  const [bill, setBill] = useState(50000);
  const [tipPercent, setTipPercent] = useState(0);
  const [people, setPeople] = useState(1);

  const billVal = bill || 0;
  const peopleVal = people || 1;
  const tipAmount = Math.round(billVal * (tipPercent / 100));
  const total = billVal + tipAmount;
  const perPerson = Math.round(total / peopleVal);

  const tipOptions = [0, 5, 10, 15, 20];

  return (
    <>
      <Card className="!p-5 !bg-[var(--primary)] !text-white">
        <div className="text-center">
          <div className="text-lg font-extrabold mb-1">Korea = No Tipping Required</div>
          <p className="text-sm opacity-90">Tipping is NOT part of Korean culture. Service charges are included in prices. You do not need to tip at restaurants, cafes, taxis, or hotels in Korea.</p>
        </div>
      </Card>

      <Card>
        <SectionTitle num="1">Tip Calculator</SectionTitle>
        <p className="text-xs text-[var(--sub)] mb-3">While tipping is not needed in Korea, use this calculator when traveling to countries where tipping is expected.</p>
        <div className="mb-4">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">Bill Amount (KRW)</label>
          <input
            type="number"
            value={bill}
            onChange={e => setBill(+e.target.value)}
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">Tip Percentage</label>
          <div className="grid grid-cols-5 gap-2">
            {tipOptions.map(p => (
              <button
                key={p}
                onClick={() => setTipPercent(p)}
                className={`py-3 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${tipPercent === p ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}
              >
                {p}%
              </button>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">Number of People</label>
          <input
            type="number"
            min={1}
            max={50}
            value={people}
            onChange={e => setPeople(+e.target.value)}
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"
          />
        </div>
      </Card>

      <Card className="!p-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Tip</div>
            <div className="text-[24px] font-extrabold text-[var(--primary-dark)]">{tipAmount.toLocaleString()}</div>
            <div className="text-xs text-[var(--sub)]">KRW</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Total</div>
            <div className="text-[24px] font-extrabold text-[var(--primary-dark)]">{total.toLocaleString()}</div>
            <div className="text-xs text-[var(--sub)]">KRW</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Per Person</div>
            <div className="text-[24px] font-extrabold text-[var(--primary-dark)]">{perPerson.toLocaleString()}</div>
            <div className="text-xs text-[var(--sub)]">KRW</div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">Tipping Customs by Country</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] text-[var(--sub)] uppercase">
                <th className="pb-2">Country</th>
                <th className="pb-2 text-center">Tip</th>
                <th className="pb-2 text-right">Note</th>
              </tr>
            </thead>
            <tbody>
              {tippingByCountry.map((c, i) => (
                <tr key={i} className="border-t border-[var(--line)]">
                  <td className="py-2 text-xs font-bold">{c.flag} {c.country}</td>
                  <td className="py-2 text-xs text-center">{c.tip}</td>
                  <td className="py-2 text-xs text-right text-[var(--sub)]">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Guide: Tipping Culture in Korea</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Why Koreans don&apos;t tip</b>: In Korea, good service is considered part of the job, not something that requires extra payment. Prices at restaurants, cafes, and hotels already include service. Attempting to tip can sometimes cause confusion or even embarrassment.</p>
          <p><b>When tipping IS appreciated</b>: While never expected, a small tip may be appreciated in a few situations: exceptional service at high-end international hotels, private tour guides, or golf caddies (typically 20,000-50,000 KRW). Even then, it is a bonus, not an obligation.</p>
          <p><b>Delivery drivers (배달)</b>: Delivery apps like Baemin and Coupang Eats do not have a tipping feature. Delivery drivers do not expect tips. However, some apps have recently introduced optional &quot;delivery appreciation&quot; features.</p>
          <p><b>Taxis</b>: Never tip taxi drivers in Korea. Simply pay the metered fare. You can pay by T-money card, credit card, or cash. Rounding up to the nearest 1,000 KRW is common for convenience but is not considered a tip.</p>
          <p><b>Hair salons and spas</b>: No tipping at Korean hair salons (미용실), jjimjilbangs (찜질방), or spas. The listed price is what you pay. Some upscale salons may add a service charge to the bill automatically.</p>
          <p><b>Restaurants (식당)</b>: No tip needed at any type of restaurant in Korea, from street food stalls to fine dining. Some high-end restaurants in tourist areas catering to foreigners may add a 10% service charge, but this is rare and already included in the bill.</p>
        </div>
      </Card>
    </>
  );
}
