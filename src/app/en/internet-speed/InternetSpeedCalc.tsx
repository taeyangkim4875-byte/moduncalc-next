'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type InternetType = 'home' | 'mobile';

interface HomePlan {
  provider: string;
  providerKr: string;
  speed: string;
  monthly: number;
  contract: string;
  installFee: string;
}

interface MobilePlan {
  provider: string;
  providerKr: string;
  type: 'Major' | 'MVNO';
  data: string;
  monthly: number;
  note: string;
}

const HOME_PLANS: HomePlan[] = [
  { provider: 'KT', providerKr: '케이티', speed: '100 Mbps', monthly: 22000, contract: '3 years', installFee: '30,000 (often waived)' },
  { provider: 'KT', providerKr: '케이티', speed: '500 Mbps', monthly: 33000, contract: '3 years', installFee: '30,000 (often waived)' },
  { provider: 'KT', providerKr: '케이티', speed: '1 Gbps', monthly: 38500, contract: '3 years', installFee: '30,000 (often waived)' },
  { provider: 'SK Broadband', providerKr: 'SK브로드밴드', speed: '100 Mbps', monthly: 22000, contract: '3 years', installFee: '30,000 (often waived)' },
  { provider: 'SK Broadband', providerKr: 'SK브로드밴드', speed: '500 Mbps', monthly: 33000, contract: '3 years', installFee: '30,000 (often waived)' },
  { provider: 'SK Broadband', providerKr: 'SK브로드밴드', speed: '1 Gbps', monthly: 38500, contract: '3 years', installFee: '40,000 (often waived)' },
  { provider: 'LG U+', providerKr: 'LG유플러스', speed: '100 Mbps', monthly: 22000, contract: '3 years', installFee: '30,000 (often waived)' },
  { provider: 'LG U+', providerKr: 'LG유플러스', speed: '500 Mbps', monthly: 33000, contract: '3 years', installFee: '30,000 (often waived)' },
  { provider: 'LG U+', providerKr: 'LG유플러스', speed: '1 Gbps', monthly: 38500, contract: '3 years', installFee: '50,000 (often waived)' },
];

const MOBILE_PLANS: MobilePlan[] = [
  { provider: 'SKT', providerKr: 'SK텔레콤', type: 'Major', data: 'Unlimited', monthly: 55000, note: '5G, 200Mbps throttle after deprioritization' },
  { provider: 'SKT', providerKr: 'SK텔레콤', type: 'Major', data: 'Unlimited Premium', monthly: 80000, note: '5G, full speed, 100+ roaming countries' },
  { provider: 'KT', providerKr: '케이티', type: 'Major', data: 'Unlimited', monthly: 55000, note: '5G, standard unlimited' },
  { provider: 'KT', providerKr: '케이티', type: 'Major', data: 'Unlimited Premium', monthly: 79000, note: '5G, full speed, extras included' },
  { provider: 'LG U+', providerKr: 'LG유플러스', type: 'Major', data: 'Unlimited', monthly: 52000, note: '5G, slightly cheaper entry' },
  { provider: 'LG U+', providerKr: 'LG유플러스', type: 'Major', data: 'Unlimited Premium', monthly: 75000, note: '5G, full speed' },
  { provider: 'Hello Mobile', providerKr: '헬로모바일', type: 'MVNO', data: 'Unlimited (3Mbps)', monthly: 20000, note: 'LTE, speed capped but truly unlimited' },
  { provider: 'Hello Mobile', providerKr: '헬로모바일', type: 'MVNO', data: 'Unlimited (5Mbps)', monthly: 25000, note: 'LTE, good for basic use' },
  { provider: 'KT M Mobile', providerKr: 'KT엠모바일', type: 'MVNO', data: '15GB + Unlimited (1Mbps)', monthly: 22000, note: 'KT network, throttled after 15GB' },
  { provider: 'KT M Mobile', providerKr: 'KT엠모바일', type: 'MVNO', data: 'Unlimited (5Mbps)', monthly: 28000, note: 'KT network, decent speed' },
  { provider: 'Tplus', providerKr: '티플러스', type: 'MVNO', data: 'Unlimited (10Mbps)', monthly: 33000, note: 'SKT network, good value' },
  { provider: 'Mint Mobile KR', providerKr: '민트모바일', type: 'MVNO', data: 'Unlimited Full Speed', monthly: 35000, note: 'Budget full-speed option' },
];

export default function InternetSpeedCalc() {
  const [internetType, setInternetType] = useState<InternetType>('home');
  const [selectedHome, setSelectedHome] = useState<number | null>(null);
  const [selectedMobile, setSelectedMobile] = useState<number | null>(null);
  const [mobileFilter, setMobileFilter] = useState<'all' | 'Major' | 'MVNO'>('all');

  const selectedHomePlan = selectedHome !== null ? HOME_PLANS[selectedHome] : null;
  const selectedMobilePlan = selectedMobile !== null ? MOBILE_PLANS[selectedMobile] : null;

  const filteredMobile = mobileFilter === 'all' ? MOBILE_PLANS : MOBILE_PLANS.filter(p => p.type === mobileFilter);

  const yearlyHome = selectedHomePlan ? selectedHomePlan.monthly * 12 : 0;
  const yearlyMobile = selectedMobilePlan ? selectedMobilePlan.monthly * 12 : 0;
  const totalMonthly = (selectedHomePlan?.monthly || 0) + (selectedMobilePlan?.monthly || 0);
  const totalYearly = totalMonthly * 12;

  return (
    <>
      <Card>
        <SectionTitle num="1">Internet Type</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {([['home', 'Home Internet'], ['mobile', 'Mobile Data']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setInternetType(val)}
              className={`py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${
                internetType === val
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-white text-[var(--sub)] border-[var(--line)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </Card>

      {internetType === 'home' && (
        <Card>
          <SectionTitle num="2">Home Internet Plans (가정용 인터넷)</SectionTitle>
          <div className="flex flex-col gap-2">
            {(['KT', 'SK Broadband', 'LG U+'] as const).map(provider => (
              <div key={provider}>
                <div className="text-xs font-bold text-[var(--sub)] mb-1.5 mt-2">{provider} ({HOME_PLANS.find(p => p.provider === provider)?.providerKr})</div>
                {HOME_PLANS.filter(p => p.provider === provider).map((plan, idx) => {
                  const globalIdx = HOME_PLANS.indexOf(plan);
                  const isSelected = selectedHome === globalIdx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedHome(isSelected ? null : globalIdx)}
                      className={`flex items-center justify-between p-3 rounded-xl border-[1.5px] cursor-pointer transition-colors mb-1.5 ${
                        isSelected ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)] bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold">{plan.speed}</div>
                        <div className="text-[10px] text-[var(--sub)]">Contract: {plan.contract} / Install: {plan.installFee}</div>
                      </div>
                      <div className="text-sm font-extrabold text-[var(--primary-dark)]">{plan.monthly.toLocaleString()}<span className="text-xs font-normal"> won/mo</span></div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Card>
      )}

      {internetType === 'mobile' && (
        <Card>
          <SectionTitle num="2">Mobile Data Plans (휴대폰 요금제)</SectionTitle>
          <div className="flex gap-1.5 mb-3">
            {([['all', 'All'], ['Major', 'Major Carriers'], ['MVNO', 'MVNOs (알뜰폰)']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setMobileFilter(val as 'all' | 'Major' | 'MVNO')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border-[1.5px] transition-colors ${
                  mobileFilter === val
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                    : 'bg-white text-[var(--sub)] border-[var(--line)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            {filteredMobile.map((plan, idx) => {
              const globalIdx = MOBILE_PLANS.indexOf(plan);
              const isSelected = selectedMobile === globalIdx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedMobile(isSelected ? null : globalIdx)}
                  className={`flex items-center justify-between p-3 rounded-xl border-[1.5px] cursor-pointer transition-colors ${
                    isSelected ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)] bg-white'
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-sm font-bold">{plan.provider} <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${plan.type === 'MVNO' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{plan.type}</span></div>
                    <div className="text-xs text-[var(--sub)]">{plan.data}</div>
                    <div className="text-[10px] text-[var(--sub)]">{plan.note}</div>
                  </div>
                  <div className="text-sm font-extrabold text-[var(--primary-dark)] text-right">{plan.monthly.toLocaleString()}<span className="text-xs font-normal"> won/mo</span></div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <Card className="!p-6">
        <div className="text-center mb-3">
          <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Monthly Cost Summary</div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Home Internet</div>
            <div className="text-[22px] font-extrabold text-[var(--primary-dark)]">{selectedHomePlan ? selectedHomePlan.monthly.toLocaleString() : '-'}</div>
            <div className="text-xs text-[var(--sub)]">{selectedHomePlan ? `${selectedHomePlan.provider} ${selectedHomePlan.speed}` : 'Select a plan'}</div>
            {yearlyHome > 0 && <div className="text-[10px] text-[var(--sub)] mt-1">{yearlyHome.toLocaleString()} won/year</div>}
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Mobile Data</div>
            <div className="text-[22px] font-extrabold text-[var(--primary-dark)]">{selectedMobilePlan ? selectedMobilePlan.monthly.toLocaleString() : '-'}</div>
            <div className="text-xs text-[var(--sub)]">{selectedMobilePlan ? `${selectedMobilePlan.provider} ${selectedMobilePlan.data}` : 'Select a plan'}</div>
            {yearlyMobile > 0 && <div className="text-[10px] text-[var(--sub)] mt-1">{yearlyMobile.toLocaleString()} won/year</div>}
          </div>
        </div>
        {totalMonthly > 0 && (
          <div className="border-t border-[var(--line)] pt-3">
            <div className="flex justify-between text-sm mb-1"><span className="text-[var(--sub)]">Total Monthly</span><span className="font-extrabold text-[var(--primary-dark)]">{totalMonthly.toLocaleString()} won</span></div>
            <div className="flex justify-between text-sm"><span className="text-[var(--sub)]">Total Yearly</span><span className="font-bold">{totalYearly.toLocaleString()} won</span></div>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Internet in Korea: What Foreigners Need to Know</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>How to sign up:</b> You need an ARC (Alien Registration Card / 외국인등록증) to sign up for both home internet and mobile plans. Visit any provider&apos;s store (대리점) with your ARC and passport. Some stores have English-speaking staff, especially in areas like Itaewon, Hongdae, and Gangnam.</p>
          <p><b>Contract terms:</b> Home internet contracts are typically 3 years. Early termination fees can be 100,000-200,000 won depending on remaining months. Some providers offer 1-year contracts at a slightly higher monthly rate. When moving apartments, you can transfer your internet service (이전 설치) for a small fee.</p>
          <p><b>Cancellation fees (위약금):</b> If you leave Korea before your contract ends, you will owe a cancellation fee proportional to the remaining contract period. Some providers waive this if you provide proof of departure (flight ticket). Always ask about cancellation terms before signing.</p>
          <p><b>Speed expectations:</b> Korea consistently ranks among the top countries for internet speed. The advertised 1 Gbps plans typically deliver 800-950 Mbps in practice. Even the 100 Mbps plans are sufficient for streaming 4K video and working from home.</p>
          <p><b>Free public WiFi:</b> Korea has extensive free public WiFi. Look for networks like &quot;Public WiFi Free&quot;, &quot;KT Free WiFi&quot;, or &quot;U+zone&quot; in subway stations, buses, cafes, and public buildings. Most cafes provide free WiFi for customers.</p>
        </div>
      </Card>
    </>
  );
}
