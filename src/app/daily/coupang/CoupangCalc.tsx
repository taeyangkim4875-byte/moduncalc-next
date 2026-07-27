'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function CoupangCalc() {
  const [dailyClicks, setDailyClicks] = useState(100);
  const [convRate, setConvRate] = useState(3);
  const [avgOrder, setAvgOrder] = useState(30000);
  const [commRate, setCommRate] = useState(3);

  // 계산
  const dailyOrders = (dailyClicks || 0) * ((convRate || 0) / 100);
  const dailyRevenue = dailyOrders * (avgOrder || 0) * ((commRate || 0) / 100);
  const monthlyRevenue = dailyRevenue * 30;
  const yearlyRevenue = dailyRevenue * 365;

  // 목표별 필요 클릭 수
  const targetTable = [
    { label: '월 10만원', monthly: 100000 },
    { label: '월 50만원', monthly: 500000 },
    { label: '월 100만원', monthly: 1000000 },
    { label: '월 300만원', monthly: 3000000 },
  ];

  const requiredClicks = (monthly: number) => {
    const dailyTarget = monthly / 30;
    const revenuePerClick = ((convRate || 0) / 100) * (avgOrder || 0) * ((commRate || 0) / 100);
    return revenuePerClick > 0 ? Math.ceil(dailyTarget / revenuePerClick) : 0;
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">트래픽 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            일일 클릭 수 <span className="text-xs text-[var(--sub)] font-medium ml-1">{(dailyClicks || 0).toLocaleString()}회</span>
          </label>
          <input type="range" min={10} max={10000} step={10} value={dailyClicks} onChange={e => setDailyClicks(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={dailyClicks} onChange={e => setDailyClicks(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">회/일</span>
          </div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">
            전환율 <span className="text-xs text-[var(--sub)] font-medium ml-1">{convRate}%</span>
          </label>
          <input type="range" min={0.5} max={15} step={0.1} value={convRate} onChange={e => setConvRate(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={convRate} onChange={e => setConvRate(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" step={0.1} />
            <span className="text-sm font-bold text-[var(--sub)]">%</span>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">주문 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            평균 주문 금액 <span className="text-xs text-[var(--sub)] font-medium ml-1">{(avgOrder || 0).toLocaleString()}원</span>
          </label>
          <input type="range" min={5000} max={200000} step={1000} value={avgOrder} onChange={e => setAvgOrder(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={avgOrder} onChange={e => setAvgOrder(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">원</span>
          </div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">
            수수료율 <span className="text-xs text-[var(--sub)] font-medium ml-1">{commRate}%</span>
          </label>
          <div className="text-[11px] text-[var(--sub)] mb-1.5">쿠팡 카테고리별 1~3%</div>
          <input type="range" min={1} max={10} step={0.1} value={commRate} onChange={e => setCommRate(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={commRate} onChange={e => setCommRate(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" step={0.1} />
            <span className="text-sm font-bold text-[var(--sub)]">%</span>
          </div>
        </div>
      </Card>

      {/* 결과 */}
      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">💰 예상 수익</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">월간 예상 수익</div>
            <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{Math.round(monthlyRevenue).toLocaleString()}<span className="text-lg">원</span></div>
          </div>

          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">일일 예상 수익</span><span className="font-bold">{Math.round(dailyRevenue).toLocaleString()}원</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">월간 예상 수익</span><span className="font-bold">{Math.round(monthlyRevenue).toLocaleString()}원</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">연간 예상 수익</span><span className="font-bold">{Math.round(yearlyRevenue).toLocaleString()}원</span></div>
            <div className="flex justify-between border-t border-[var(--line)] pt-2.5"><span className="text-[var(--sub)] font-semibold">일일 예상 주문 건수</span><span className="font-bold">{dailyOrders.toFixed(1)}건</span></div>
          </div>
        </div>
      </div>

      {/* 목표별 필요 클릭 수 */}
      <Card>
        <SectionTitle num="📋">목표별 필요 일일 클릭 수</SectionTitle>
        <div className="text-xs text-[var(--sub)] mb-2">전환율 {convRate}%, 평균 주문액 {(avgOrder || 0).toLocaleString()}원, 수수료 {commRate}% 기준</div>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-2 border-[var(--line)]">
              <th className="py-2 text-left text-xs text-[var(--sub)] font-bold">목표 수익</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">필요 일일 클릭</th>
            </tr>
          </thead>
          <tbody>
            {targetTable.map(({ label, monthly }) => (
              <tr key={label} className="border-b border-[var(--line)]">
                <td className="py-2 font-bold">{label}</td>
                <td className="py-2 text-right font-bold text-[var(--primary-dark)]">{requiredClicks(monthly).toLocaleString()}회</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">쿠팡 파트너스 수익이 궁금하면 클릭수랑 전환율 넣어보세요. 카테고리별 수수료율은 보통 1~3% 수준이에요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 수수료는 언제 지급되나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 매월 말 정산 후 익월 25일경에 지급돼요. 최소 출금 금액은 1만원입니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 전환율 3%는 현실적인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 상품 리뷰 글은 5% 이상도 가능하고, 일반 배너는 1~2% 정도예요. 콘텐츠 품질에 따라 달라져요.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          예상 수익 시뮬레이션이며, 실제 수익은 상품 카테고리, 전환율, 시즌 등에 따라 달라집니다.
        </div>
      </footer>
    </>
  );
}
