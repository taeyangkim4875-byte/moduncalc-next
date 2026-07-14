'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type InputMode = 'quantity' | 'investment';

export default function CryptoCalcEn() {
  const [inputMode, setInputMode] = useState<InputMode>('investment');
  const [buyPrice, setBuyPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [investment, setInvestment] = useState('');
  const [feeRate, setFeeRate] = useState('0.05');

  const buy = +buyPrice || 0;
  const current = +currentPrice || 0;
  const fee = +feeRate || 0;

  const qty = inputMode === 'quantity'
    ? (+quantity || 0)
    : buy > 0 ? (+investment || 0) / buy : 0;

  const investmentAmount = inputMode === 'investment' ? (+investment || 0) : qty * buy;
  const currentValue = qty * current;
  const buyFee = investmentAmount * (fee / 100);
  const sellFee = currentValue * (fee / 100);
  const totalFee = buyFee + sellFee;
  const grossPL = currentValue - investmentAmount;
  const netPL = grossPL - totalFee;
  const returnRate = investmentAmount > 0 ? (grossPL / investmentAmount) * 100 : 0;
  const netReturnRate = investmentAmount > 0 ? (netPL / investmentAmount) * 100 : 0;

  const isProfit = netPL >= 0;

  return (
    <>
      {/* Input Mode */}
      <Card className="!p-3">
        <div className="flex gap-1">
          <button
            onClick={() => setInputMode('investment')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${inputMode === 'investment' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
          >
            By Investment
          </button>
          <button
            onClick={() => setInputMode('quantity')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${inputMode === 'quantity' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
          >
            By Quantity
          </button>
        </div>
      </Card>

      {/* Input */}
      <Card>
        <SectionTitle num="1">Trade Details</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">Buy Price (per unit)</label>
            <input
              type="number"
              inputMode="numeric"
              value={buyPrice}
              onChange={e => setBuyPrice(e.target.value)}
              placeholder="e.g. 50000000"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
          {inputMode === 'quantity' ? (
            <div>
              <label className="text-xs font-bold text-[var(--sub)] block mb-1">Quantity</label>
              <input
                type="number"
                inputMode="decimal"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                placeholder="e.g. 0.5"
                className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
              />
            </div>
          ) : (
            <div>
              <label className="text-xs font-bold text-[var(--sub)] block mb-1">Total Investment</label>
              <input
                type="number"
                inputMode="numeric"
                value={investment}
                onChange={e => setInvestment(e.target.value)}
                placeholder="e.g. 1000000"
                className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
              />
            </div>
          )}
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">Current Price (per unit)</label>
            <input
              type="number"
              inputMode="numeric"
              value={currentPrice}
              onChange={e => setCurrentPrice(e.target.value)}
              placeholder="e.g. 55000000"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">Fee Rate (%)</label>
            <div className="flex gap-2">
              {['0.01', '0.04', '0.05', '0.1'].map(f => (
                <button
                  key={f}
                  onClick={() => setFeeRate(f)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${feeRate === f ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
                >
                  {f}%
                </button>
              ))}
            </div>
            <input
              type="number"
              inputMode="decimal"
              value={feeRate}
              onChange={e => setFeeRate(e.target.value)}
              className="w-full mt-2 py-2 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] tabular-nums"
              placeholder="Custom rate"
            />
          </div>
        </div>
      </Card>

      {/* Result */}
      <Card className="!p-5">
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">Net Profit (After Fees)</div>
          <div className={`text-[40px] font-extrabold tracking-tight leading-none tabular-nums ${isProfit ? 'text-[#10B981]' : 'text-[#E5484D]'}`}>
            {isProfit ? '+' : ''}{Math.round(netPL).toLocaleString()}
          </div>
          <div className={`text-lg font-bold mt-1 ${isProfit ? 'text-[#10B981]' : 'text-[#E5484D]'}`}>
            {isProfit ? '+' : ''}{netReturnRate.toFixed(2)}%
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { label: 'Investment', value: Math.round(investmentAmount).toLocaleString() },
            { label: 'Quantity', value: qty > 0 ? qty.toFixed(8) : '0' },
            { label: 'Current Value', value: Math.round(currentValue).toLocaleString() },
            { label: 'Return (before fees)', value: `${returnRate >= 0 ? '+' : ''}${returnRate.toFixed(2)}%` },
            { label: 'Gross P&L', value: `${grossPL >= 0 ? '+' : ''}${Math.round(grossPL).toLocaleString()}` },
            { label: 'Total Fees', value: `-${Math.round(totalFee).toLocaleString()}` },
          ].map(item => (
            <div key={item.label} className="flex justify-between items-center bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <span className="text-[13px] font-semibold">{item.label}</span>
              <span className="text-[13px] font-bold tabular-nums">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Korean Exchange Fees */}
      <Card>
        <SectionTitle num="2">Korean Exchange Fee Comparison</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b-2 border-[var(--line)]">
                <th className="py-2 text-left text-[var(--sub)] font-bold">Exchange</th>
                <th className="py-2 text-right text-[var(--sub)] font-bold">Fee</th>
                <th className="py-2 text-right text-[var(--sub)] font-bold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Upbit (업비트)', '0.05%', '#1 in Korea by volume'],
                ['Bithumb (빗썸)', '0.04%', '0.01% with coupons'],
                ['Coinone (코인원)', '0.20%', 'Tiered pricing'],
                ['Korbit (코빗)', '0.20%', 'Tiered pricing'],
                ['Binance', '0.10%', '25% off with BNB'],
              ].map(([name, fee, note]) => (
                <tr key={name as string} className="border-b border-[var(--line)]">
                  <td className="py-1.5 font-semibold">{name}</td>
                  <td className="py-1.5 text-right font-bold">{fee}</td>
                  <td className="py-1.5 text-right text-[var(--sub)]">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Crypto Investment Guide</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Crypto Tax in Korea:</b> Cryptocurrency taxation has been postponed multiple times and was scheduled for 2027, but further delays are possible. When implemented, gains exceeding 2.5 million KRW per year will be taxed at 22% (including local tax). Foreign exchange users must also report.</p>
          <p><b>Korean Exchanges:</b> Upbit is the largest Korean exchange by trading volume, followed by Bithumb. Korean exchanges require real-name bank accounts (실명확인 계좌) linked to the exchange. Foreign nationals may face restrictions on opening KRW trading accounts.</p>
          <p><b>Investment Risks:</b> Cryptocurrency is extremely volatile and you may lose your entire investment. Only invest money you can afford to lose. Avoid leverage/margin trading as a beginner. Diversify your portfolio and beware of phishing scams - only use official exchange websites and apps.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. Is cryptocurrency taxed in Korea?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. Crypto taxation has been postponed multiple times. Originally set for 2027, further delays are possible. When implemented, gains over 2.5 million KRW/year will be taxed at 22%.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. What are the fees on Korean exchanges?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. Upbit charges 0.05%, Bithumb 0.04% (as low as 0.01% with coupons), Coinone 0.2%, and Binance 0.1%. Fees vary by exchange and payment method.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. How is the return calculated?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. Return = (Current Price - Buy Price) / Buy Price x 100. Net profit deducts both buy-side and sell-side transaction fees from the gross profit.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          Results are for reference only. Actual returns may differ due to exchange fee policies, slippage, and taxes. Investment decisions are your own responsibility.
        </div>
      </footer>
    </>
  );
}
