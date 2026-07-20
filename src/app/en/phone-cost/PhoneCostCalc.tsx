'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Usage = 'light' | 'moderate' | 'heavy';
type Priority = 'price' | 'speed' | 'coverage';
type Contract = '1year' | '2year' | 'none';

interface Plan {
  carrier: string;
  carrierKr: string;
  type: 'major' | 'mvno';
  planName: string;
  data: string;
  price: number;
  network: string;
  note?: string;
}

const allPlans: Plan[] = [
  // Major carriers
  { carrier: 'SKT', carrierKr: 'SK텔레콤', type: 'major', planName: '5G Unlimited', data: 'Unlimited', price: 75000, network: '5G', note: 'Best coverage nationwide' },
  { carrier: 'SKT', carrierKr: 'SK텔레콤', type: 'major', planName: 'LTE 10GB', data: '10GB', price: 55000, network: 'LTE' },
  { carrier: 'SKT', carrierKr: 'SK텔레콤', type: 'major', planName: 'LTE 3GB', data: '3GB', price: 39000, network: 'LTE' },
  { carrier: 'KT', carrierKr: 'KT', type: 'major', planName: '5G Unlimited', data: 'Unlimited', price: 72000, network: '5G' },
  { carrier: 'KT', carrierKr: 'KT', type: 'major', planName: 'LTE 10GB', data: '10GB', price: 52000, network: 'LTE' },
  { carrier: 'KT', carrierKr: 'KT', type: 'major', planName: 'LTE 3GB', data: '3GB', price: 37000, network: 'LTE' },
  { carrier: 'LG U+', carrierKr: 'LG유플러스', type: 'major', planName: '5G Unlimited', data: 'Unlimited', price: 69000, network: '5G', note: 'Cheapest major carrier 5G' },
  { carrier: 'LG U+', carrierKr: 'LG유플러스', type: 'major', planName: 'LTE 10GB', data: '10GB', price: 49000, network: 'LTE' },
  { carrier: 'LG U+', carrierKr: 'LG유플러스', type: 'major', planName: 'LTE 3GB', data: '3GB', price: 35000, network: 'LTE' },
  // MVNOs
  { carrier: 'KT M Mobile', carrierKr: 'KT M모바일', type: 'mvno', planName: 'Unlimited', data: 'Unlimited', price: 33000, network: 'LTE (KT)', note: 'Uses KT network' },
  { carrier: 'KT M Mobile', carrierKr: 'KT M모바일', type: 'mvno', planName: '10GB', data: '10GB', price: 22000, network: 'LTE (KT)' },
  { carrier: 'Yoyu Mobile', carrierKr: '여유모바일', type: 'mvno', planName: 'Unlimited', data: 'Unlimited', price: 29000, network: 'LTE (SKT)', note: 'Uses SKT network' },
  { carrier: 'Yoyu Mobile', carrierKr: '여유모바일', type: 'mvno', planName: '10GB', data: '10GB', price: 19000, network: 'LTE (SKT)' },
  { carrier: 'Alteul Mobile', carrierKr: '알뜰모바일', type: 'mvno', planName: 'Unlimited', data: 'Unlimited', price: 25000, network: 'LTE (LG U+)', note: 'Cheapest unlimited plan' },
  { carrier: 'Alteul Mobile', carrierKr: '알뜰모바일', type: 'mvno', planName: '10GB', data: '10GB', price: 17000, network: 'LTE (LG U+)' },
];

function fmt(n: number) {
  return '₩' + n.toLocaleString();
}

export default function PhoneCostCalc() {
  const [usage, setUsage] = useState<Usage>('moderate');
  const [priority, setPriority] = useState<Priority>('price');
  const [contract, setContract] = useState<Contract>('none');

  // Filter and sort plans
  const filtered = allPlans.filter(p => {
    if (usage === 'light') return p.data === '3GB' || (p.data === '10GB' && p.type === 'mvno');
    if (usage === 'moderate') return p.data === '10GB' || p.data === 'Unlimited';
    return p.data === 'Unlimited';
  });

  const sorted = [...filtered].sort((a, b) => {
    if (priority === 'price') return a.price - b.price;
    if (priority === 'speed') {
      const scoreA = a.network.includes('5G') ? 0 : 1;
      const scoreB = b.network.includes('5G') ? 0 : 1;
      return scoreA - scoreB || a.price - b.price;
    }
    // coverage: major carriers first
    const scoreA = a.type === 'major' ? 0 : 1;
    const scoreB = b.type === 'major' ? 0 : 1;
    return scoreA - scoreB || a.price - b.price;
  });

  const recommended = sorted[0];

  const contractDiscount = contract === '2year' ? 0.25 : contract === '1year' ? 0.15 : 0;

  const btnClass = (active: boolean) =>
    `flex-1 py-3 px-2 rounded-xl border-[1.5px] text-center cursor-pointer transition-all ${
      active
        ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)] font-bold'
        : 'border-[var(--line)] text-[#4E5968]'
    }`;

  return (
    <>
      <Card>
        <SectionTitle num="1">How much data do you use?</SectionTitle>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button className={btnClass(usage === 'light')} onClick={() => setUsage('light')}>
            <div className="text-sm font-bold">Light</div>
            <div className="text-[10px] text-[var(--sub)]">~3GB</div>
          </button>
          <button className={btnClass(usage === 'moderate')} onClick={() => setUsage('moderate')}>
            <div className="text-sm font-bold">Moderate</div>
            <div className="text-[10px] text-[var(--sub)]">~10GB</div>
          </button>
          <button className={btnClass(usage === 'heavy')} onClick={() => setUsage('heavy')}>
            <div className="text-sm font-bold">Heavy</div>
            <div className="text-[10px] text-[var(--sub)]">Unlimited</div>
          </button>
        </div>

        <SectionTitle num="2">What matters most?</SectionTitle>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button className={btnClass(priority === 'price')} onClick={() => setPriority('price')}>
            <div className="text-sm font-bold">Price</div>
            <div className="text-[10px] text-[var(--sub)]">Cheapest</div>
          </button>
          <button className={btnClass(priority === 'speed')} onClick={() => setPriority('speed')}>
            <div className="text-sm font-bold">Speed</div>
            <div className="text-[10px] text-[var(--sub)]">5G first</div>
          </button>
          <button className={btnClass(priority === 'coverage')} onClick={() => setPriority('coverage')}>
            <div className="text-sm font-bold">Coverage</div>
            <div className="text-[10px] text-[var(--sub)]">Reliability</div>
          </button>
        </div>

        <SectionTitle num="3">Contract length?</SectionTitle>
        <div className="grid grid-cols-3 gap-2">
          <button className={btnClass(contract === '1year')} onClick={() => setContract('1year')}>
            <div className="text-sm font-bold">1 Year</div>
            <div className="text-[10px] text-[var(--sub)]">~15% off</div>
          </button>
          <button className={btnClass(contract === '2year')} onClick={() => setContract('2year')}>
            <div className="text-sm font-bold">2 Years</div>
            <div className="text-[10px] text-[var(--sub)]">~25% off</div>
          </button>
          <button className={btnClass(contract === 'none')} onClick={() => setContract('none')}>
            <div className="text-sm font-bold">No Contract</div>
            <div className="text-[10px] text-[var(--sub)]">MVNO only</div>
          </button>
        </div>
      </Card>

      {/* Recommended */}
      {recommended && (
        <Card className="!border-2 !border-[var(--primary)]">
          <div className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider mb-2">Best Match</div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-lg font-extrabold">{recommended.carrier}</div>
              <div className="text-xs text-[var(--sub)]">{recommended.carrierKr} &middot; {recommended.planName}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold text-[var(--primary-dark)]">
                {fmt(Math.round(recommended.price * (1 - contractDiscount)))}
              </div>
              <div className="text-[10px] text-[var(--sub)]">per month</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[var(--bg)] rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-[var(--sub)] font-bold">DATA</div>
              <div className="text-xs font-bold mt-0.5">{recommended.data}</div>
            </div>
            <div className="bg-[var(--bg)] rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-[var(--sub)] font-bold">NETWORK</div>
              <div className="text-xs font-bold mt-0.5">{recommended.network}</div>
            </div>
            <div className="bg-[var(--bg)] rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-[var(--sub)] font-bold">YEARLY</div>
              <div className="text-xs font-bold mt-0.5">{fmt(Math.round(recommended.price * (1 - contractDiscount) * 12))}</div>
            </div>
          </div>
          {recommended.note && (
            <div className="text-xs text-[var(--primary)] font-semibold mt-2">{recommended.note}</div>
          )}
        </Card>
      )}

      {/* All Plans Comparison */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">All Matching Plans</h2>
        <div className="flex flex-col gap-2">
          {sorted.map((plan, i) => {
            const discountedPrice = Math.round(plan.price * (1 - (plan.type === 'major' ? contractDiscount : 0)));
            return (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border-[1.5px] border-[var(--line)]">
                <div>
                  <div className="text-sm font-bold">{plan.carrier}</div>
                  <div className="text-[10px] text-[var(--sub)]">
                    {plan.carrierKr} &middot; {plan.data} &middot; {plan.network}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold">{fmt(discountedPrice)}<span className="text-[10px] font-normal text-[var(--sub)]">/mo</span></div>
                  {contractDiscount > 0 && plan.type === 'major' && (
                    <div className="text-[10px] text-[var(--sub)] line-through">{fmt(plan.price)}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Phone Plan Guide for Foreigners</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>How to sign up:</b> Visit any carrier store (대리점) with your ARC (외국인등록증) and passport. Staff will help you choose a plan and activate your SIM. Most stores have limited English support, so bring a Korean-speaking friend or use a translation app.</p>
          <p><b>What is MVNO (알뜰폰)?</b> MVNOs are budget carriers that lease network capacity from SKT, KT, or LG U+. You get the same coverage at 30-50% lower prices. The trade-off: no physical stores, less customer support, and no device subsidies. Sign up online or at convenience stores.</p>
          <p><b>Number portability (번호이동):</b> You can switch carriers while keeping your phone number. Visit the new carrier&apos;s store and request &quot;번호이동&quot;. The process takes about 30 minutes. Your old contract must be fulfilled or early termination fees apply.</p>
          <p><b>eSIM options:</b> Most modern phones support eSIM. SKT, KT, and some MVNOs offer eSIM activation. Useful if you want to keep your home country SIM in one slot and Korean eSIM in the other. Activate through the carrier&apos;s app.</p>
          <p><b>Airport SIM cards:</b> At Incheon Airport (인천공항), you can buy prepaid SIMs from KT and SKT booths in the arrivals hall. Prices range from ₩30,000 (5 days) to ₩55,000 (30 days). Tourist SIMs include data, calls, and a temporary Korean number. No ARC required.</p>
        </div>
      </Card>
    </>
  );
}
