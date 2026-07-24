'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const won = (n: number) => '₩' + Math.round(n).toLocaleString();

type Currency = 'USD' | 'EUR' | 'JPY' | 'GBP' | 'CNY' | 'CAD' | 'AUD';

const REF_RATES: Record<Currency, number> = {
  USD: 1380,
  EUR: 1510,
  JPY: 9.2,
  GBP: 1750,
  CNY: 190,
  CAD: 1020,
  AUD: 920,
};

const CURRENCY_LABELS: Record<Currency, string> = {
  USD: 'USD ($)',
  EUR: 'EUR (€)',
  JPY: 'JPY (¥)',
  GBP: 'GBP (£)',
  CNY: 'CNY (¥)',
  CAD: 'CAD ($)',
  AUD: 'AUD ($)',
};

interface Method {
  key: string;
  name: string;
  nameKr: string;
  spreadPct: number;
  fixedFee: number;
  description: string;
  color: string;
}

const METHODS: Method[] = [
  { key: 'myeongdong', name: 'Myeongdong Money Changers', nameKr: '명동 환전소', spreadPct: 0.7, fixedFee: 0, description: 'Best rates for cash. Located near Myeongdong station exits 5-6.', color: '#10B981' },
  { key: 'bank', name: 'Korean Bank', nameKr: '은행', spreadPct: 1.5, fixedFee: 0, description: 'Safe and reliable. KB, Shinhan, Woori all offer exchange. Ask for preferential rate coupons (우대 쿠폰) on mobile banking apps.', color: '#3182F6' },
  { key: 'card', name: 'Card Payment (Visa/MC)', nameKr: '카드 결제', spreadPct: 1.5, fixedFee: 0, description: 'Convenient for purchases. Actual spread depends on your card issuer. Always pay in KRW, never accept DCC (Dynamic Currency Conversion).', color: '#7C3AED' },
  { key: 'atm', name: 'ATM Withdrawal', nameKr: 'ATM 인출', spreadPct: 2.0, fixedFee: 5000, description: 'Use Global ATMs at 7-Eleven (세븐일레븐) or CU. Fees: ₩3,000-5,000 per transaction + your bank\'s foreign ATM fee.', color: '#F59E0B' },
  { key: 'airport', name: 'Airport Exchange', nameKr: '공항 환전', spreadPct: 4.0, fixedFee: 0, description: 'Worst rates. Only exchange minimal amount at Incheon Airport. Better to use ATM in arrivals area.', color: '#EF4444' },
];

export default function ExchangeTipCalc() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [amount, setAmount] = useState('1000');

  const result = useMemo(() => {
    const amt = Number(amount) || 0;
    if (amt <= 0) return null;

    const baseRate = REF_RATES[currency];
    const midMarketKRW = amt * baseRate;

    return METHODS.map(m => {
      const effectiveRate = baseRate * (1 - m.spreadPct / 100);
      const receivedKRW = amt * effectiveRate - m.fixedFee;
      const loss = midMarketKRW - receivedKRW;
      const lossPct = (loss / midMarketKRW) * 100;
      return { ...m, effectiveRate, receivedKRW, loss, lossPct };
    }).sort((a, b) => a.loss - b.loss);
  }, [currency, amount]);

  const amt = Number(amount) || 0;
  const midMarketKRW = amt * REF_RATES[currency];

  return (
    <>
      <Card>
        <SectionTitle num="1">Your Currency</SectionTitle>
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {(Object.keys(REF_RATES) as Currency[]).map(c => (
            <button key={c} onClick={() => setCurrency(c)} className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${currency === c ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
              {c}
            </button>
          ))}
        </div>

        <SectionTitle num="2">Amount to Exchange</SectionTitle>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            inputMode="numeric"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="flex-1 h-11 px-3 rounded-xl border-[1.5px] border-[var(--line)] text-sm font-bold text-right focus:outline-none focus:border-[var(--primary)]"
          />
          <span className="text-sm font-bold text-[var(--sub)] whitespace-nowrap">{CURRENCY_LABELS[currency]}</span>
        </div>
        <p className="text-xs text-[#8B95A1]">
          Reference mid-market rate: 1 {currency} ≈ {won(REF_RATES[currency])}
          {amt > 0 && ` = ${won(midMarketKRW)} total`}
        </p>
        <p className="text-[10px] text-[#8B95A1] mt-1">Note: These are reference rates for comparison. Actual rates vary daily.</p>
      </Card>

      {result && amt > 0 && (
        <>
          <Card>
            <h2 className="text-base font-extrabold mb-3">Exchange Method Comparison</h2>
            <div className="space-y-2">
              {result.map((m, i) => (
                <div key={m.key} className="p-3 bg-[var(--bg)] rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {i === 0 && <span className="text-[10px] font-bold text-white bg-[#10B981] px-1.5 py-0.5 rounded">BEST</span>}
                      <span className="text-sm font-bold">{m.name}</span>
                      <span className="text-xs text-[#8B95A1]">({m.nameKr})</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between mb-1.5">
                    <div>
                      <span className="text-lg font-extrabold" style={{ color: m.color }}>{won(m.receivedKRW)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#EF4444] font-bold">-{won(m.loss)}</span>
                      <span className="text-[10px] text-[#8B95A1] ml-1">({m.lossPct.toFixed(1)}% loss)</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-[#8B95A1]">
                    <span>Rate: {won(m.effectiveRate)}/{currency}</span>
                    <span>Spread: ~{m.spreadPct}%{m.fixedFee > 0 ? ` + ${won(m.fixedFee)} fee` : ''}</span>
                  </div>
                  <p className="text-xs text-[#8B95A1] mt-1.5">{m.description}</p>
                </div>
              ))}
            </div>
            {result.length >= 2 && (
              <p className="text-xs text-[#4E5968] mt-3 p-2 bg-[var(--primary-weak)] rounded-lg">
                <b>You save {won(result[result.length - 1].loss - result[0].loss)}</b> by using {result[0].name} instead of {result[result.length - 1].name} for this amount.
              </p>
            )}
          </Card>

          <Card>
            <h2 className="text-base font-extrabold mb-3">Recommendation</h2>
            <div className="p-3 bg-[var(--bg)] rounded-xl">
              {amt * REF_RATES[currency] > 5_000_000 ? (
                <p className="text-sm text-[#4E5968] leading-relaxed">
                  For large amounts ({won(midMarketKRW)}+), visit <b>Myeongdong money changers</b> (명동 환전소) for the best cash rates. Alternatively, use a fintech service like <b>Wise (와이즈)</b> or <b>Revolut</b> for bank transfers with near mid-market rates (~0.3-0.5% spread). For amounts over $10,000 USD equivalent, you must declare at customs.
                </p>
              ) : amt * REF_RATES[currency] > 500_000 ? (
                <p className="text-sm text-[#4E5968] leading-relaxed">
                  For medium amounts, <b>Myeongdong money changers</b> offer the best cash rates. If you can&apos;t visit Myeongdong, use your <b>Korean bank&apos;s mobile app</b> with a preferential rate coupon (90% 우대) — most banks offer these for free. <b>Wise</b> is excellent for transfers to your Korean account.
                </p>
              ) : (
                <p className="text-sm text-[#4E5968] leading-relaxed">
                  For small amounts, just use your <b>debit/credit card</b> for purchases — the convenience outweighs the small spread. Avoid airport exchange. For cash needs, withdraw from <b>7-Eleven Global ATMs</b> which accept international cards 24/7.
                </p>
              )}
            </div>
          </Card>
        </>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">Where to Exchange Money in Korea</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Myeongdong money changers (명동 환전소):</b> The best rates in Korea, often within 0.5-1% of mid-market. Look for shops near Exit 5 or 6 of Myeongdong Station (Line 4). Many are open until 9 PM and handle all major currencies. No ID required for amounts under ₩5,000,000.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>7-Eleven Global ATMs:</b> The easiest way to get Korean won with a foreign card. Look for ATMs labeled &quot;Global ATM&quot; or &quot;외국카드 사용가능&quot; at any 7-Eleven convenience store. They accept Visa, Mastercard, Cirrus, and Plus networks. Fee is typically ₩3,000-5,000 per transaction, and your home bank may charge an additional foreign ATM fee.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Wise / Revolut:</b> If you have a Korean bank account, transferring money via Wise (formerly TransferWise) gives you near mid-market rates with a transparent fee of ~0.3-0.5%. Revolut also works well for card payments in Korea with competitive exchange rates during weekday trading hours.
        </p>
      </Card>
    </>
  );
}
