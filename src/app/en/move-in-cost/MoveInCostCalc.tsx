'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type RentType = 'wolse' | 'jeonse';

function calcAgentFee(deposit: number, monthlyRent: number, type: RentType): { fee: number; rate: number } {
  const base = type === 'jeonse' ? deposit : deposit + monthlyRent * 100;
  let rate: number;
  if (base < 50_000_000) rate = 0.005;
  else if (base < 100_000_000) rate = 0.004;
  else if (base < 300_000_000) rate = 0.003;
  else if (base < 600_000_000) rate = 0.004;
  else if (base < 900_000_000) rate = 0.005;
  else rate = 0.009;

  const maxFee: Record<number, number> = {
    0.005: 250_000,
    0.004: 300_000,
    0.003: Infinity,
    0.009: Infinity,
  };

  let fee = Math.round(base * rate);
  if (base < 50_000_000 && fee > 250_000) fee = 250_000;
  else if (base < 100_000_000 && fee > 300_000) fee = 300_000;

  return { fee, rate };
}

const fmt = (n: number) => n.toLocaleString('ko-KR');

export default function MoveInCostCalc() {
  const [rentType, setRentType] = useState<RentType>('wolse');
  const [monthlyRent, setMonthlyRent] = useState(500_000);
  const [deposit, setDeposit] = useState(10_000_000);
  const [utilitySetup, setUtilitySetup] = useState(true);
  const [internet, setInternet] = useState(true);
  const [lockChange, setLockChange] = useState(true);
  const [furniture, setFurniture] = useState(false);
  const [movingService, setMovingService] = useState(true);

  function handleRentType(type: RentType) {
    setRentType(type);
    if (type === 'jeonse') {
      setDeposit(200_000_000);
      setMonthlyRent(0);
    } else {
      setDeposit(10_000_000);
      setMonthlyRent(500_000);
    }
  }

  const result = useMemo(() => {
    const agent = calcAgentFee(deposit, monthlyRent, rentType);
    const extras = {
      utilitySetup: utilitySetup ? 100_000 : 0,
      internet: internet ? 30_000 : 0,
      lockChange: lockChange ? 150_000 : 0,
      furniture: furniture ? 1_500_000 : 0,
      movingService: movingService ? 350_000 : 0,
    };
    const totalExtras = Object.values(extras).reduce((a, b) => a + b, 0);
    const totalMoveIn = deposit + agent.fee + totalExtras;
    const firstMonthTotal = rentType === 'wolse' ? totalMoveIn + monthlyRent : totalMoveIn;
    return { agent, extras, totalExtras, totalMoveIn, firstMonthTotal };
  }, [deposit, monthlyRent, rentType, utilitySetup, internet, lockChange, furniture, movingService]);

  const btnClass = (active: boolean) =>
    `flex-1 py-2.5 rounded-xl border-[1.5px] font-semibold text-sm transition-all cursor-pointer ${
      active
        ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]'
        : 'border-[var(--line)] hover:border-[var(--primary)] text-[#4E5968]'
    }`;

  const toggleClass = (active: boolean) =>
    `flex items-center justify-between w-full px-4 py-3 rounded-xl border-[1.5px] text-sm font-semibold cursor-pointer transition-all ${
      active
        ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]'
        : 'border-[var(--line)] text-[#4E5968]'
    }`;

  return (
    <>
      {/* Rent Type */}
      <Card>
        <SectionTitle num="1">Rent Type (계약 유형)</SectionTitle>
        <div className="flex gap-2">
          <button className={btnClass(rentType === 'wolse')} onClick={() => handleRentType('wolse')}>Wolse (월세)</button>
          <button className={btnClass(rentType === 'jeonse')} onClick={() => handleRentType('jeonse')}>Jeonse (전세)</button>
        </div>
      </Card>

      {/* Deposit & Rent */}
      <Card>
        <SectionTitle num="2">Deposit & Rent (보증금 / 월세)</SectionTitle>
        <label className="block text-xs font-bold text-[var(--sub)] mb-1">Deposit (보증금)</label>
        <input
          type="number"
          value={deposit}
          onChange={e => setDeposit(Math.max(0, Number(e.target.value)))}
          className="w-full py-3 px-4 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-semibold outline-none focus:border-[var(--primary)] mb-1"
        />
        <div className="text-xs text-[var(--sub)] mb-3">₩{fmt(deposit)}</div>

        {rentType === 'wolse' && (
          <>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Monthly Rent (월세)</label>
            <input
              type="number"
              value={monthlyRent}
              onChange={e => setMonthlyRent(Math.max(0, Number(e.target.value)))}
              className="w-full py-3 px-4 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-semibold outline-none focus:border-[var(--primary)] mb-1"
            />
            <div className="text-xs text-[var(--sub)]">₩{fmt(monthlyRent)}</div>
          </>
        )}
      </Card>

      {/* Move-in Extras */}
      <Card>
        <SectionTitle num="3">Move-in Extras (이사 추가 비용)</SectionTitle>
        <div className="flex flex-col gap-2">
          <button className={toggleClass(utilitySetup)} onClick={() => setUtilitySetup(!utilitySetup)}>
            <span>Utility setup deposit (전기/가스/수도)</span><span>~₩100,000</span>
          </button>
          <button className={toggleClass(internet)} onClick={() => setInternet(!internet)}>
            <span>Internet installation (인터넷 설치)</span><span>~₩30,000</span>
          </button>
          <button className={toggleClass(lockChange)} onClick={() => setLockChange(!lockChange)}>
            <span>Lock change (도어락 교체)</span><span>~₩150,000</span>
          </button>
          <button className={toggleClass(furniture)} onClick={() => setFurniture(!furniture)}>
            <span>Basic furniture (기본 가구)</span><span>~₩1,500,000</span>
          </button>
          <button className={toggleClass(movingService)} onClick={() => setMovingService(!movingService)}>
            <span>Moving service (이사 서비스)</span><span>~₩350,000</span>
          </button>
        </div>
      </Card>

      {/* Results */}
      <Card className="!border-2 !border-[var(--primary)]">
        <div className="text-center mb-4">
          <div className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider mb-1">Total Move-in Cost</div>
          <div className="text-3xl font-extrabold text-[var(--primary-dark)]">₩{fmt(result.firstMonthTotal)}</div>
          <div className="text-sm font-bold text-[#4E5968]">{rentType === 'wolse' ? 'Including first month rent' : 'Jeonse deposit + fees'}</div>
        </div>

        <div className="bg-[var(--bg)] rounded-xl p-4 mb-3">
          <div className="text-xs font-bold text-[var(--sub)] uppercase mb-3">Cost Breakdown</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#4E5968]">Deposit (보증금)</span>
              <span className="font-bold">₩{fmt(deposit)}</span>
            </div>
            {rentType === 'wolse' && (
              <div className="flex justify-between">
                <span className="text-[#4E5968]">First month rent (첫 달 월세)</span>
                <span className="font-bold">₩{fmt(monthlyRent)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#4E5968]">Agent fee (중개수수료, {(result.agent.rate * 100).toFixed(1)}%)</span>
              <span className="font-bold">₩{fmt(result.agent.fee)}</span>
            </div>
            {utilitySetup && (
              <div className="flex justify-between">
                <span className="text-[#4E5968]">Utility setup (전기/가스/수도)</span>
                <span className="font-bold">₩{fmt(result.extras.utilitySetup)}</span>
              </div>
            )}
            {internet && (
              <div className="flex justify-between">
                <span className="text-[#4E5968]">Internet installation</span>
                <span className="font-bold">₩{fmt(result.extras.internet)}</span>
              </div>
            )}
            {lockChange && (
              <div className="flex justify-between">
                <span className="text-[#4E5968]">Lock change (도어락)</span>
                <span className="font-bold">₩{fmt(result.extras.lockChange)}</span>
              </div>
            )}
            {furniture && (
              <div className="flex justify-between">
                <span className="text-[#4E5968]">Basic furniture</span>
                <span className="font-bold">₩{fmt(result.extras.furniture)}</span>
              </div>
            )}
            {movingService && (
              <div className="flex justify-between">
                <span className="text-[#4E5968]">Moving service (이사)</span>
                <span className="font-bold">₩{fmt(result.extras.movingService)}</span>
              </div>
            )}
            <div className="border-t border-[var(--line)] pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-[var(--primary-dark)]">₩{fmt(result.firstMonthTotal)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Korea Move-in Guide for Foreigners</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Wolse vs. Jeonse:</b> Korea has two main rental systems. Wolse (월세) is monthly rent with a smaller deposit, similar to Western rentals. Jeonse (전세) requires a large lump-sum deposit (often 50-80% of the home value) but no monthly rent. Your deposit is returned when you move out. Jeonse is becoming less common due to deposit fraud risks.</p>
          <p><b>Before Signing the Contract:</b> Always check the 등기부등본 (property registry) to verify the landlord owns the property and check for liens or mortgages. You can get this at any 등기소 (registry office) or online at iros.go.kr. Ask about 관리비 (maintenance fee), which covers building maintenance and sometimes includes water or heating.</p>
          <p><b>Agent Fee Negotiation:</b> The agent fee (중개수수료) is legally capped in Korea. Rates range from 0.3-0.9% depending on the transaction amount. The fee is non-negotiable below the cap but you should confirm the exact rate before signing. Both tenant and landlord pay their own agent fee.</p>
          <p><b>Cheapest Moving Options:</b> For small moves, use 용달이사 (small truck service) starting from ₩100,000-200,000. For full apartment moves, 포장이사 (full-service packing) costs ₩300,000-700,000 depending on apartment size and distance. Apps like 짐싸 (Zimssa) and 미소 (Miso) let you compare quotes from multiple moving companies.</p>
          <p><b>Getting Your Deposit Back:</b> Korean law protects your deposit through the 주택임대차보호법 (Housing Lease Protection Act). To maximize protection, register your move-in at the local 주민센터 (community center) and get a 확정일자 (fixed date stamp) on your contract within the first day. This establishes your priority as a creditor if the landlord faces financial trouble.</p>
          <p><b>Utility Setup:</b> After moving in, visit the local 주민센터 to register your address change. Utilities (electricity via KEPCO, gas via local provider, water via local government) will transfer to your name. Internet can be set up through KT, SK Broadband, or LG U+ with 1-2 year contracts starting around ₩30,000/month.</p>
        </div>
      </Card>
    </>
  );
}
