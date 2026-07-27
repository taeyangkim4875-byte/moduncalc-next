'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type InputMode = 'quantity' | 'investment';

export default function CryptoCalc() {
  const [inputMode, setInputMode] = useState<InputMode>('investment');
  const [buyPrice, setBuyPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [investment, setInvestment] = useState('');
  const [feeRate, setFeeRate] = useState('0.05');

  const buy = +buyPrice || 0;
  const current = +currentPrice || 0;
  const fee = +feeRate || 0;

  // 수량 계산
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
      {/* 입력 모드 */}
      <Card className="!p-3">
        <div className="flex gap-1">
          <button
            onClick={() => setInputMode('investment')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${inputMode === 'investment' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
          >
            투자금으로 입력
          </button>
          <button
            onClick={() => setInputMode('quantity')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${inputMode === 'quantity' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
          >
            수량으로 입력
          </button>
        </div>
      </Card>

      {/* 입력 */}
      <Card>
        <SectionTitle num="1">매매 정보 입력</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">매수 단가 (원)</label>
            <input
              type="number"
              inputMode="numeric"
              value={buyPrice}
              onChange={e => setBuyPrice(e.target.value)}
              placeholder="예: 50000000"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
          {inputMode === 'quantity' ? (
            <div>
              <label className="text-xs font-bold text-[var(--sub)] block mb-1">매수 수량</label>
              <input
                type="number"
                inputMode="decimal"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                placeholder="예: 0.5"
                className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
              />
            </div>
          ) : (
            <div>
              <label className="text-xs font-bold text-[var(--sub)] block mb-1">투자금 (원)</label>
              <input
                type="number"
                inputMode="numeric"
                value={investment}
                onChange={e => setInvestment(e.target.value)}
                placeholder="예: 1000000"
                className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
              />
            </div>
          )}
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">현재가 (원)</label>
            <input
              type="number"
              inputMode="numeric"
              value={currentPrice}
              onChange={e => setCurrentPrice(e.target.value)}
              placeholder="예: 55000000"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">수수료율 (%)</label>
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
              placeholder="직접 입력"
            />
          </div>
        </div>
      </Card>

      {/* 결과 */}
      <Card className="!p-5">
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">수수료 차감 후 실수익</div>
          <div className={`text-[40px] font-extrabold tracking-tight leading-none tabular-nums ${isProfit ? 'text-[#10B981]' : 'text-[#E5484D]'}`}>
            {isProfit ? '+' : ''}{Math.round(netPL).toLocaleString()}원
          </div>
          <div className={`text-lg font-bold mt-1 ${isProfit ? 'text-[#10B981]' : 'text-[#E5484D]'}`}>
            {isProfit ? '+' : ''}{netReturnRate.toFixed(2)}%
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { label: '투자금', value: `${Math.round(investmentAmount).toLocaleString()}원` },
            { label: '보유 수량', value: qty > 0 ? qty.toFixed(8) : '0' },
            { label: '평가금액', value: `${Math.round(currentValue).toLocaleString()}원` },
            { label: '수익률 (수수료 전)', value: `${returnRate >= 0 ? '+' : ''}${returnRate.toFixed(2)}%` },
            { label: '손익금액 (수수료 전)', value: `${grossPL >= 0 ? '+' : ''}${Math.round(grossPL).toLocaleString()}원` },
            { label: '총 수수료', value: `-${Math.round(totalFee).toLocaleString()}원` },
          ].map(item => (
            <div key={item.label} className="flex justify-between items-center bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <span className="text-[13px] font-semibold">{item.label}</span>
              <span className="text-[13px] font-bold tabular-nums">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 거래소 수수료 비교 */}
      <Card>
        <SectionTitle num="2">주요 거래소 수수료 비교</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b-2 border-[var(--line)]">
                <th className="py-2 text-left text-[var(--sub)] font-bold">거래소</th>
                <th className="py-2 text-right text-[var(--sub)] font-bold">수수료</th>
                <th className="py-2 text-right text-[var(--sub)] font-bold">비고</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['업비트', '0.05%', '국내 1위 거래량'],
                ['빗썸', '0.04%', '쿠폰 적용 시 0.01%'],
                ['코인원', '0.20%', '등급별 차등'],
                ['코빗', '0.20%', '등급별 차등'],
                ['바이낸스', '0.10%', 'BNB 결제 시 25% 할인'],
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

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">코인 수익률 계산할 때 수수료까지 빼면 생각보다 적어요. 매수·매도 수수료를 반영한 실수익을 바로 확인할 수 있어요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 코인 수익에 세금이 붙나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 가상자산 과세는 여러 차례 유예 중이에요. 시행 시 연 250만원 초과 수익에 22%가 과세됩니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 거래소 수수료는 얼마인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 업비트 0.05%, 빗썸 0.04%, 바이낸스 0.1%가 기본이에요. 거래소마다 다를 수 있어요.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          계산 결과는 참고용이며, 실제 수익은 거래소 수수료 정책, 슬리피지, 세금 등에 따라 달라질 수 있습니다. 투자 결정은 본인 판단에 따르세요.
        </div>
      </footer>
    </>
  );
}
