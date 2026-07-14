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
        <h2 className="text-base font-extrabold mb-3">📖 가상자산 투자 가이드</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>가상자산 세금:</b> 가상자산 소득세는 여러 차례 유예를 거쳐 2027년 시행 예정이었으나, 추가 유예 가능성이 있습니다. 시행 시 연 250만원 초과 수익에 대해 22%(지방세 포함)가 과세됩니다. 해외 거래소 이용 시에도 신고 의무가 있으므로 유의하세요.</p>
          <p><b>주요 거래소 수수료:</b> 국내 최대 거래소인 업비트는 0.05%, 빗썸은 기본 0.04%(쿠폰 적용 시 0.01%까지 가능)입니다. 해외 거래소 바이낸스는 0.1%이며 BNB 토큰 결제 시 25% 할인됩니다. 원화 입출금 시 별도 수수료가 발생할 수 있습니다.</p>
          <p><b>투자 주의사항:</b> 가상자산은 변동성이 매우 높아 원금 손실 가능성이 있습니다. 여유 자금으로만 투자하고, 분산 투자를 권장합니다. 레버리지·마진 거래는 손실이 투자금을 초과할 수 있으므로 초보자는 피하세요. 피싱·스캠에 주의하고 공식 사이트만 이용하세요.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 가상자산 수익에 세금이 부과되나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 가상자산 과세는 여러 차례 유예되어 2027년 시행 예정이었으나 추가 유예 가능성이 있습니다. 시행 시 연 250만원 초과 수익에 22%(지방세 포함)가 과세됩니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 거래소 수수료는 얼마인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 업비트 0.05%, 빗썸 0.04%(쿠폰 적용 시 0.01%), 코인원 0.2%, 바이낸스 0.1%가 기본입니다. 거래소와 결제 수단에 따라 다를 수 있습니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 수익률은 어떻게 계산하나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 수익률 = (현재가 - 매수가) / 매수가 x 100입니다. 수수료를 반영한 실수익은 매수·매도 수수료를 차감한 후 계산됩니다.</div>
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
