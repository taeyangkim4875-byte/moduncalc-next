'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function AdSenseCalc() {
  const [pageviews, setPageviews] = useState(1000);
  const [rpm, setRpm] = useState(3000);
  const [ctr, setCtr] = useState(2);
  const [cpc, setCpc] = useState(300);

  // RPM 기준 계산
  const dailyRpm = ((pageviews || 0) / 1000) * (rpm || 0);
  const monthlyRpm = dailyRpm * 30;
  const yearlyRpm = dailyRpm * 365;

  // CTR x CPC 기준 교차 검증
  const dailyClicks = (pageviews || 0) * ((ctr || 0) / 100);
  const dailyCtrCpc = dailyClicks * (cpc || 0);
  const monthlyCtrCpc = dailyCtrCpc * 30;

  // 목표 수익 달성에 필요한 일일 PV
  const targetTable = [
    { label: '월 10만원', monthly: 100000 },
    { label: '월 50만원', monthly: 500000 },
    { label: '월 100만원', monthly: 1000000 },
    { label: '월 300만원', monthly: 3000000 },
  ];

  const requiredPV = (monthly: number) => {
    const dailyTarget = monthly / 30;
    return (rpm || 0) > 0 ? Math.ceil((dailyTarget / (rpm || 1)) * 1000) : 0;
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">트래픽 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            일일 페이지뷰 <span className="text-xs text-[var(--sub)] font-medium ml-1">{(pageviews || 0).toLocaleString()}회</span>
          </label>
          <input type="range" min={100} max={100000} step={100} value={pageviews} onChange={e => setPageviews(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={pageviews} onChange={e => setPageviews(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">회/일</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            페이지 RPM <span className="text-xs text-[var(--sub)] font-medium ml-1">{(rpm || 0).toLocaleString()}원</span>
          </label>
          <div className="text-[11px] text-[var(--sub)] mb-1.5 flex items-center gap-1">
            <span className="inline-block w-3.5 h-3.5 rounded-full bg-[var(--primary-weak)] text-[var(--primary)] text-[9px] font-bold grid place-items-center">?</span>
            1000회 노출당 수익
          </div>
          <input type="range" min={500} max={30000} step={100} value={rpm} onChange={e => setRpm(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={rpm} onChange={e => setRpm(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">원</span>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">클릭 기반 (교차 검증)</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            CTR (클릭률) <span className="text-xs text-[var(--sub)] font-medium ml-1">{ctr}%</span>
          </label>
          <input type="range" min={0.5} max={10} step={0.1} value={ctr} onChange={e => setCtr(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={ctr} onChange={e => setCtr(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" step={0.1} />
            <span className="text-sm font-bold text-[var(--sub)]">%</span>
          </div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">
            CPC (클릭당 수익) <span className="text-xs text-[var(--sub)] font-medium ml-1">{(cpc || 0).toLocaleString()}원</span>
          </label>
          <input type="range" min={50} max={3000} step={10} value={cpc} onChange={e => setCpc(+e.target.value)} className="w-full" />
          <div className="flex items-center gap-2.5 mt-2">
            <input type="number" value={cpc} onChange={e => setCpc(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">원</span>
          </div>
        </div>
      </Card>

      {/* 결과 */}
      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">💰 예상 수익</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">RPM 기준 월간 예상 수익</div>
            <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{Math.round(monthlyRpm).toLocaleString()}<span className="text-lg">원</span></div>
          </div>

          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">일일 예상 수익 (RPM)</span><span className="font-bold">{Math.round(dailyRpm).toLocaleString()}원</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">월간 예상 수익</span><span className="font-bold">{Math.round(monthlyRpm).toLocaleString()}원</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">연간 예상 수익</span><span className="font-bold">{Math.round(yearlyRpm).toLocaleString()}원</span></div>
            <div className="flex justify-between border-t border-[var(--line)] pt-2.5"><span className="text-[var(--sub)] font-semibold">CTR x CPC 기준 일일</span><span className="font-bold">{Math.round(dailyCtrCpc).toLocaleString()}원</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">CTR x CPC 기준 월간</span><span className="font-bold">{Math.round(monthlyCtrCpc).toLocaleString()}원</span></div>
          </div>
        </div>
      </div>

      {/* 목표 수익 달성 필요 PV */}
      <Card>
        <SectionTitle num="📋">목표별 필요 일일 PV</SectionTitle>
        <div className="text-xs text-[var(--sub)] mb-2">현재 RPM {(rpm || 0).toLocaleString()}원 기준</div>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-2 border-[var(--line)]">
              <th className="py-2 text-left text-xs text-[var(--sub)] font-bold">목표 수익</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">필요 일일 PV</th>
            </tr>
          </thead>
          <tbody>
            {targetTable.map(({ label, monthly }) => (
              <tr key={label} className="border-b border-[var(--line)]">
                <td className="py-2 font-bold">{label}</td>
                <td className="py-2 text-right font-bold text-[var(--primary-dark)]">{requiredPV(monthly).toLocaleString()}회</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 RPM이란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>RPM(Revenue Per Mille)</b>은 페이지 1,000회 노출당 발생하는 수익입니다. 애드센스 대시보드에서 확인할 수 있으며, 블로그 주제와 방문자 품질에 따라 크게 달라집니다.
        </p>
        <h3 className="text-sm font-extrabold mb-2">한국 블로그 평균 RPM</h3>
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex justify-between px-3 py-2 rounded-xl bg-[var(--bg)] text-sm">
            <span>일반 (생활정보, 리뷰)</span><span className="font-bold">1,000~3,000원</span>
          </div>
          <div className="flex justify-between px-3 py-2 rounded-xl bg-[var(--bg)] text-sm">
            <span>금융/보험/IT</span><span className="font-bold">5,000~15,000원</span>
          </div>
        </div>
        <h3 className="text-sm font-extrabold mb-2">블로그 수익을 높이는 방법</h3>
        <ul className="text-sm text-[#4E5968] leading-relaxed pl-4 mb-3" style={{ listStyleType: 'disc' }}>
          <li>고단가 키워드(금융, 보험, IT) 콘텐츠 작성</li>
          <li>검색 유입 최적화 (SEO)로 양질의 트래픽 확보</li>
          <li>광고 배치 최적화 (본문 상단, 중간 삽입)</li>
          <li>모바일 반응형 광고 적용</li>
        </ul>
        <h3 className="text-sm font-extrabold mb-2">애드센스 정책 주의사항</h3>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          자체 클릭, 클릭 유도, 부정 트래픽은 계정 정지 사유입니다. 콘텐츠 품질과 자연 유입에 집중하는 것이 장기적으로 유리합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. RPM과 CPC 중 어떤 기준이 정확한가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. RPM은 전체적인 수익 효율을, CPC는 개별 클릭 수익을 나타냅니다. 두 지표를 함께 보면 더 정확한 예상이 가능합니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 애드센스 수익은 언제 지급되나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 매월 21~26일 사이에 전월 수익이 지급됩니다. 최소 지급 기준액은 100달러(약 13만원)입니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 블로그 초보도 애드센스 승인을 받을 수 있나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 양질의 원본 콘텐츠 20~30개 이상, 개인정보처리방침 페이지, 충분한 텍스트가 있으면 승인 가능성이 높습니다.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          예상 수익 시뮬레이션이며, 실제 수익은 트래픽 품질, 광고 단가, 시즌 등에 따라 달라집니다.
        </div>
      </footer>
    </>
  );
}
