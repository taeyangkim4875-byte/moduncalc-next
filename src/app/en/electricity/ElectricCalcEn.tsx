'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Season = 'regular' | 'summer' | 'winter';

function calcBill(kwh: number, season: Season) {
  // Tier boundaries differ by season
  const tiers = season === 'summer'
    ? [300, 450]  // Summer: wider bands
    : [200, 400]; // Regular & Winter

  const rates = [120.0, 214.6, 307.3];

  // Base fee depends on total usage (uses regular boundaries for base fee)
  const baseFee = kwh <= 200 ? 910 : kwh <= 400 ? 1600 : 7300;

  // Calculate tiered energy charge
  const tierUsage = [0, 0, 0];
  const tierCost = [0, 0, 0];
  let remaining = kwh;

  // Tier 1
  const t1 = Math.min(remaining, tiers[0]);
  tierUsage[0] = t1;
  tierCost[0] = t1 * rates[0];
  remaining -= t1;

  // Tier 2
  const t2 = Math.min(remaining, tiers[1] - tiers[0]);
  tierUsage[1] = t2;
  tierCost[1] = t2 * rates[1];
  remaining -= t2;

  // Tier 3
  tierUsage[2] = remaining;
  tierCost[2] = remaining * rates[2];

  const energyCharge = tierCost[0] + tierCost[1] + tierCost[2];
  const subtotal = baseFee + energyCharge;
  const vat = Math.floor(subtotal * 0.1);
  const fund = Math.floor(subtotal * 0.037);
  const total = subtotal + vat + fund;

  return { baseFee, tierUsage, tierCost, rates, tiers, energyCharge, subtotal, vat, fund, total };
}

export default function ElectricCalcEn() {
  const [kwh, setKwh] = useState(300);
  const [season, setSeason] = useState<Season>('regular');

  const result = calcBill(kwh, season);
  const maxBar = Math.max(...result.tierCost, 1);

  return (
    <>
      <Card>
        <SectionTitle num="1">Monthly Usage</SectionTitle>
        <label className="block text-xs font-bold text-[var(--sub)] mb-1">Electricity Usage (kWh)</label>
        <input
          type="number"
          min={50}
          max={1000}
          value={kwh}
          onChange={e => setKwh(+e.target.value || 0)}
          className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center mb-3"
        />
        <input
          type="range"
          min={50}
          max={1000}
          step={10}
          value={kwh}
          onChange={e => setKwh(+e.target.value || 0)}
          className="w-full accent-[var(--primary)]"
        />
        <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1">
          <span>50 kWh</span>
          <span>1,000 kWh</span>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">Season</SectionTitle>
        <div className="grid grid-cols-3 gap-2">
          {([['regular', 'Regular'], ['summer', 'Summer (Jul-Aug)'], ['winter', 'Winter']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setSeason(val as Season)}
              className={`py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${
                season === val
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-white text-[var(--sub)] border-[var(--line)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="!p-6">
        <div className="text-center mb-4">
          <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Estimated Monthly Bill</div>
          <div className="text-[40px] font-extrabold text-[var(--primary-dark)]">{result.total.toLocaleString()}<span className="text-lg ml-1">won</span></div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {['Tier 1', 'Tier 2', 'Tier 3'].map((label, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-[var(--sub)]">{label} ({i === 0 ? `0-${result.tiers[0]}` : i === 1 ? `${result.tiers[0] + 1}-${result.tiers[1]}` : `${result.tiers[1] + 1}+`} kWh) @ {result.rates[i]}/kWh</span>
                <span className="font-bold">{result.tierUsage[i]} kWh</span>
              </div>
              <div className="w-full h-5 bg-[var(--bg)] rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg flex items-center justify-end pr-2 text-[10px] font-bold text-white"
                  style={{
                    width: `${Math.max((result.tierCost[i] / maxBar) * 100, 0)}%`,
                    backgroundColor: i === 0 ? '#3b82f6' : i === 1 ? '#f59e0b' : '#ef4444',
                    minWidth: result.tierCost[i] > 0 ? '40px' : '0',
                  }}
                >
                  {result.tierCost[i] > 0 ? `${Math.round(result.tierCost[i]).toLocaleString()}` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--line)] pt-3 flex flex-col gap-1.5 text-sm">
          <div className="flex justify-between"><span className="text-[var(--sub)]">Base Fee (기본요금)</span><span className="font-bold">{result.baseFee.toLocaleString()} won</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)]">Energy Charge (전력량요금)</span><span className="font-bold">{Math.round(result.energyCharge).toLocaleString()} won</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)]">VAT 10% (부가세)</span><span className="font-bold">{result.vat.toLocaleString()} won</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)]">Industry Fund 3.7% (전력산업기반기금)</span><span className="font-bold">{result.fund.toLocaleString()} won</span></div>
          <div className="flex justify-between border-t border-[var(--line)] pt-2 mt-1"><span className="font-extrabold">Total (합계)</span><span className="font-extrabold text-[var(--primary-dark)]">{result.total.toLocaleString()} won</span></div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Understanding Korean Electricity Bills</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Why summer bills spike:</b> Korea uses a progressive tier system (누진제) where the per-kWh rate increases dramatically with usage. A typical household uses 200-300 kWh normally, but air conditioning can push usage to 500+ kWh, hitting the expensive third tier at 307.3/kWh. The base fee also jumps from 1,600 to 7,300 above 400 kWh.</p>
          <p><b>AC power consumption tips:</b> A standard wall-mounted AC uses 800-1,200W. Running it 8 hours/day for a month adds ~200-300 kWh. Use inverter (인버터) models which are 30-50% more efficient. Set temperature to 26-28C and use a fan alongside your AC.</p>
          <p><b>How to read your bill:</b> Your bill arrives monthly from KEPCO (한국전력). Key items: 기본요금 (base fee), 전력량요금 (energy charge per tier), 부가가치세 (VAT), 전력산업기반기금 (industry fund). Most apartments include electricity in the management fee (관리비).</p>
          <p><b>한전 (KEPCO) app:</b> Download the KEPCO app to check real-time usage, pay bills, and see your consumption history. You can also set up auto-pay (자동이체). The app is available in Korean only but is straightforward to navigate.</p>
        </div>
      </Card>
    </>
  );
}
