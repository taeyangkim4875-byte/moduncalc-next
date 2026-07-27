'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function YouTubeCalc() {
  const [monthlyViews, setMonthlyViews] = useState(10000);
  const [cpm, setCpm] = useState(3000);
  const [adRate, setAdRate] = useState(50);
  const [monthlyUploads, setMonthlyUploads] = useState(8);

  // 계산
  const monetizedViews = (monthlyViews || 0) * ((adRate || 0) / 100);
  const monthlyRevenue = (monetizedViews / 1000) * (cpm || 0);
  const yearlyRevenue = monthlyRevenue * 12;
  const perVideo = (monthlyUploads || 0) > 0 ? monthlyRevenue / (monthlyUploads || 1) : 0;

  // 구독자 수 대비 예상 수익 표 (구독자의 약 10%가 월간 조회 기준)
  const subscriberTable = [
    { subscribers: 1000, label: '1,000명' },
    { subscribers: 5000, label: '5,000명' },
    { subscribers: 10000, label: '1만명' },
    { subscribers: 50000, label: '5만명' },
    { subscribers: 100000, label: '10만명' },
    { subscribers: 1000000, label: '100만명' },
  ];

  const estRevenue = (subscribers: number) => {
    // 구독자 수 x 평균 영상당 조회비율(30%) x 월 업로드 수 = 월간 조회수
    const estViews = subscribers * 0.3 * (monthlyUploads || 0);
    const estMonetized = estViews * ((adRate || 0) / 100);
    return Math.round((estMonetized / 1000) * (cpm || 0));
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">조회수 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            월간 조회수 <span className="text-xs text-[var(--sub)] font-medium ml-1">{(monthlyViews || 0).toLocaleString()}회</span>
          </label>
          <input type="range" min={1000} max={10000000} step={1000} value={monthlyViews} onChange={e => setMonthlyViews(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={monthlyViews} onChange={e => setMonthlyViews(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">회/월</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            CPM <span className="text-xs text-[var(--sub)] font-medium ml-1">{(cpm || 0).toLocaleString()}원</span>
          </label>
          <div className="text-[11px] text-[var(--sub)] mb-1.5 flex items-center gap-1">
            <span className="inline-block w-3.5 h-3.5 rounded-full bg-[var(--primary-weak)] text-[var(--primary)] text-[9px] font-bold grid place-items-center">?</span>
            1000회 노출당 수익
          </div>
          <input type="range" min={500} max={20000} step={100} value={cpm} onChange={e => setCpm(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={cpm} onChange={e => setCpm(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">원</span>
          </div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">
            광고 노출 비율 <span className="text-xs text-[var(--sub)] font-medium ml-1">{adRate}%</span>
          </label>
          <div className="text-[11px] text-[var(--sub)] mb-1.5">모든 시청에 광고가 붙진 않습니다</div>
          <input type="range" min={20} max={80} step={1} value={adRate} onChange={e => setAdRate(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={adRate} onChange={e => setAdRate(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">%</span>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">업로드 정보</SectionTitle>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">
            월 업로드 수 <span className="text-xs text-[var(--sub)] font-medium ml-1">{monthlyUploads}개</span>
          </label>
          <input type="range" min={1} max={30} step={1} value={monthlyUploads} onChange={e => setMonthlyUploads(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={monthlyUploads} onChange={e => setMonthlyUploads(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">개/월</span>
          </div>
        </div>
      </Card>

      {/* 결과 */}
      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">💰 예상 수익</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">월간 예상 광고 수익</div>
            <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{Math.round(monthlyRevenue).toLocaleString()}<span className="text-lg">원</span></div>
          </div>

          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">월간 예상 수익</span><span className="font-bold">{Math.round(monthlyRevenue).toLocaleString()}원</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">연간 예상 수익</span><span className="font-bold">{Math.round(yearlyRevenue).toLocaleString()}원</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">영상당 수익</span><span className="font-bold">{Math.round(perVideo).toLocaleString()}원</span></div>
            <div className="flex justify-between border-t border-[var(--line)] pt-2.5"><span className="text-[var(--sub)] font-semibold">광고 노출 조회수</span><span className="font-bold">{Math.round(monetizedViews).toLocaleString()}회</span></div>
          </div>
        </div>
      </div>

      {/* 구독자 수 대비 예상 수익 표 */}
      <Card>
        <SectionTitle num="📋">구독자 수 대비 예상 월 수익</SectionTitle>
        <div className="text-xs text-[var(--sub)] mb-2">영상당 조회율 30%, 월 {monthlyUploads}개 업로드, CPM {(cpm || 0).toLocaleString()}원 기준</div>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-2 border-[var(--line)]">
              <th className="py-2 text-left text-xs text-[var(--sub)] font-bold">구독자 수</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">예상 월 수익</th>
            </tr>
          </thead>
          <tbody>
            {subscriberTable.map(({ subscribers, label }) => (
              <tr key={subscribers} className="border-b border-[var(--line)]">
                <td className="py-2 font-bold">{label}</td>
                <td className="py-2 text-right font-bold text-[var(--primary-dark)]">{estRevenue(subscribers).toLocaleString()}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">유튜브 수익이 궁금하면 조회수랑 CPM 넣어보세요. 한국 평균 CPM은 약 2,000~5,000원 수준이에요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 수익은 언제 지급되나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 매월 21~26일에 애드센스로 지급돼요. 최소 100달러 이상이어야 해요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 조회수 100만이면 얼마인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. CPM 3,000원, 광고 노출 50% 기준 약 150만원이에요. 채널 주제에 따라 크게 달라져요.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          예상 수익 시뮬레이션이며, 실제 수익은 채널 주제, 시청자 지역, 시즌 등에 따라 달라집니다.
        </div>
      </footer>
    </>
  );
}
