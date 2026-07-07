'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const fmt = (n: number) => parseFloat(n.toFixed(2)).toLocaleString('ko-KR');
const fmtWon = (n: number) => Math.round(n).toLocaleString('ko-KR');

export default function StockCalc() {
  // 수익률 계산
  const [buyPrice, setBuyPrice] = useState(44000);
  const [curPrice, setCurPrice] = useState(12000);
  const [qty, setQty] = useState(100);

  const pctChange = buyPrice ? ((curPrice - buyPrice) / buyPrice) * 100 : 0;
  const totalBuy = buyPrice * qty;
  const totalCur = curPrice * qty;
  const profit = totalCur - totalBuy;

  // 물타기 계산
  const [addPrice, setAddPrice] = useState(12000);
  const [addQty, setAddQty] = useState(100);

  const totalQty = qty + addQty;
  const avgPrice = totalQty > 0 ? (totalBuy + addPrice * addQty) / totalQty : 0;
  const newPct = avgPrice ? ((curPrice - avgPrice) / avgPrice) * 100 : 0;
  const breakEvenPrice = avgPrice;

  // 목표가 계산
  const [targetPct, setTargetPct] = useState(10);
  const targetPrice = buyPrice * (1 + targetPct / 100);

  return (
    <>
      {/* 수익률 계산 */}
      <Card>
        <SectionTitle num="1">수익률 계산</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">매수 단가</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={buyPrice} onChange={e => setBuyPrice(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">원</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">현재가</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={curPrice} onChange={e => setCurPrice(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">원</span>
          </div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">보유 수량</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={qty} onChange={e => setQty(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">주</span>
          </div>
        </div>

        {/* 실시간 결과 */}
        <div className={`rounded-[14px] p-5 text-center mt-4 ${pctChange >= 0 ? 'bg-[#FFEBEE]' : 'bg-[#E3F2FD]'}`} style={{ background: pctChange >= 0 ? '#E6F8F0' : '#FFE5E5' }}>
          <div className="text-xs font-bold" style={{ color: pctChange >= 0 ? 'var(--green)' : '#E5484D' }}>수익률</div>
          <div className="text-[38px] font-extrabold tracking-tight" style={{ color: pctChange >= 0 ? 'var(--green)' : '#E5484D' }}>
            {pctChange >= 0 ? '+' : ''}{fmt(pctChange)}%
          </div>
          <div className="text-sm text-[var(--sub)] mt-1">
            {pctChange >= 0 ? '▲' : '▼'} {fmtWon(Math.abs(curPrice - buyPrice))}원 ({pctChange >= 0 ? '상승' : '하락'})
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2 text-[13.5px]">
          <div className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2"><span className="text-[var(--sub)] font-semibold">매수 총액</span><span className="font-bold">{fmtWon(totalBuy)}원</span></div>
          <div className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2"><span className="text-[var(--sub)] font-semibold">평가 금액</span><span className="font-bold">{fmtWon(totalCur)}원</span></div>
          <div className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2">
            <span className="text-[var(--sub)] font-semibold">평가 손익</span>
            <span className="font-bold" style={{ color: profit >= 0 ? 'var(--green)' : '#E5484D' }}>{profit >= 0 ? '+' : ''}{fmtWon(profit)}원</span>
          </div>
        </div>
      </Card>

      {/* 목표가 계산 */}
      <Card>
        <SectionTitle num="2">목표가 계산</SectionTitle>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">목표 수익률 <span className="text-xs text-[var(--sub)] font-medium ml-1">{targetPct}%</span></label>
          <input type="range" min={-50} max={100} step={1} value={targetPct} onChange={e => setTargetPct(+e.target.value)} className="w-full" />
        </div>
        <div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3">
          <div className="text-xs text-[var(--primary-dark)] font-bold">목표 매도가</div>
          <div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{fmtWon(targetPrice)}원</div>
          <div className="text-xs text-[var(--sub)] mt-1">매수가 {fmtWon(buyPrice)}원 기준 {targetPct >= 0 ? '+' : ''}{targetPct}%</div>
        </div>
      </Card>

      {/* 물타기 계산 */}
      <Card>
        <SectionTitle num="3">물타기 (평단가 낮추기)</SectionTitle>
        <div className="text-xs text-[var(--sub)] mb-3">추가 매수 시 평균 단가가 어떻게 변하는지 확인하세요</div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">추가 매수 단가</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={addPrice} onChange={e => setAddPrice(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">원</span>
          </div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">추가 매수 수량</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={addQty} onChange={e => setAddQty(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">주</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center">
            <div className="text-xs text-[var(--primary-dark)] font-bold">물타기 후 평단가</div>
            <div className="text-xl font-extrabold text-[var(--primary-dark)]">{fmtWon(avgPrice)}원</div>
            <div className="text-[10px] text-[var(--sub)] mt-1">기존 {fmtWon(buyPrice)}원 → {fmtWon(avgPrice)}원</div>
          </div>
          <div className="rounded-[14px] p-4 text-center" style={{ background: newPct >= 0 ? '#E6F8F0' : '#FFE5E5' }}>
            <div className="text-xs font-bold" style={{ color: newPct >= 0 ? 'var(--green)' : '#E5484D' }}>물타기 후 수익률</div>
            <div className="text-xl font-extrabold" style={{ color: newPct >= 0 ? 'var(--green)' : '#E5484D' }}>{newPct >= 0 ? '+' : ''}{fmt(newPct)}%</div>
            <div className="text-[10px] text-[var(--sub)] mt-1">기존 {fmt(pctChange)}% → {fmt(newPct)}%</div>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2 text-[13.5px]">
          <div className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2"><span className="text-[var(--sub)] font-semibold">총 보유 수량</span><span className="font-bold">{fmtWon(totalQty)}주</span></div>
          <div className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2"><span className="text-[var(--sub)] font-semibold">총 투자 금액</span><span className="font-bold">{fmtWon(totalBuy + addPrice * addQty)}원</span></div>
          <div className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2"><span className="text-[var(--sub)] font-semibold">손익분기 단가</span><span className="font-bold">{fmtWon(breakEvenPrice)}원</span></div>
          <div className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2"><span className="text-[var(--sub)] font-semibold">평단가 변화</span><span className="font-bold text-[var(--green)]">▼ {fmtWon(buyPrice - avgPrice)}원 ({fmt(((buyPrice - avgPrice) / buyPrice) * 100)}%↓)</span></div>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 주식 수익률과 물타기란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3"><b>수익률</b>은 매수가 대비 현재가의 변화를 퍼센트로 나타낸 것입니다. 수익률(%) = (현재가 - 매수가) ÷ 매수가 × 100으로 계산합니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed"><b>물타기</b>는 주가가 하락했을 때 추가 매수하여 평균 매수 단가를 낮추는 전략입니다. 평단가가 낮아지면 이후 주가 반등 시 더 빠르게 손익분기점에 도달할 수 있지만, 추가 하락 시 손실이 더 커질 수 있으므로 신중한 판단이 필요합니다.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 물타기는 언제 하는 게 좋나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 해당 종목의 펀더멘털(실적, 성장성)이 건전하고 일시적 하락이라고 판단될 때만 하는 것이 좋습니다. 하락 추세가 계속되는 종목에 물타기하면 손실이 커질 수 있습니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 손익분기 단가란?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 투자 원금을 회수하기 위해 주가가 도달해야 하는 가격입니다. 물타기 후 평균 매수 단가와 같습니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 세금과 수수료는 반영되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 이 계산기는 세금(양도세, 증권거래세)과 매매 수수료를 제외한 단순 수익률입니다. 실제 수익은 이보다 줄어들 수 있습니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          투자 참고용이며, 투자 판단의 근거로 사용하지 마세요. 세금·수수료는 미반영.
        </div>
      </footer>
    </>
  );
}
