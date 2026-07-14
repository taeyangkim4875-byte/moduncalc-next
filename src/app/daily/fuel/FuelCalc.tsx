'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;
const fmt=(n:number)=>parseFloat(n.toFixed(1)).toLocaleString('ko-KR',{maximumFractionDigits:1});
export default function FuelCalc(){
  const [dist,setDist]=useState(500);const [liter,setLiter]=useState(45);
  const [td,setTd]=useState(300);const [eff,setEff]=useState(12);const [price,setPrice]=useState(1650);
  const eff1=liter?dist/liter:0;const liters2=eff?td/eff:0;const cost=liters2*price;
  return(<>
    <Card><SectionTitle num="⛽">자동차 연비 계산</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">주행 거리</label><div className="flex items-center gap-2.5"><input type="number" value={dist} onChange={e=>setDist(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">주유량</label><div className="flex items-center gap-2.5"><input type="number" value={liter} onChange={e=>setLiter(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">L</span></div></div>
      <R v={`${fmt(eff1)} km/L`} l={`${fmt(dist)}km ÷ ${fmt(liter)}L`}/>
    </Card>
    <Card><SectionTitle num="💰">여행 유류비 계산</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">주행 거리</label><div className="flex items-center gap-2.5"><input type="number" value={td} onChange={e=>setTd(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km</span></div></div>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">차량 연비</label><div className="flex items-center gap-2.5"><input type="number" value={eff} onChange={e=>setEff(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km/L</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">유가</label><div className="flex items-center gap-2.5"><input type="number" value={price} onChange={e=>setPrice(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">원/L</span></div></div>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <R v={`${fmt(liters2)}L`} l="예상 주유량"/>
        <R v={`${Math.round(cost).toLocaleString()}원`} l="예상 유류비"/>
      </div>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">📊 차종별 평균 연비 비교</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-xs text-[var(--sub)] font-bold">차종</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">가솔린</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">디젤</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">하이브리드</th></tr></thead>
          <tbody>
            {[['경차 (모닝, 스파크)','15~17','–','–'],['소형 (아반떼, K3)','12~15','16~19','18~23'],['중형 (쏘나타, K5)','10~13','14~17','17~21'],['대형 (그랜저, K8)','8~11','12~15','14~18'],['SUV (투싼, 스포티지)','9~12','13~16','15~19'],['대형SUV (팰리세이드)','7~10','11~14','–']].map(([type,gas,diesel,hybrid],i)=>(
              <tr key={i} className="border-b border-[var(--line)]"><td className="py-2 font-semibold">{type}</td><td className="py-2 text-right">{gas}</td><td className="py-2 text-right">{diesel}</td><td className="py-2 text-right text-[var(--green)] font-bold">{hybrid}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-[11px] text-[var(--sub)] mt-2">단위: km/L · 복합연비 기준 · 실제 연비는 운전 습관에 따라 다릅니다</div>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">🚗 주요 구간 유류비 참고</h2>
      <div className="flex flex-col gap-1.5 text-[13px]">
        {[['서울 → 부산', 400, 12], ['서울 → 대전', 160, 12], ['서울 → 강릉', 230, 12], ['서울 → 목포', 370, 12], ['서울 → 제주 (차량 선적 포함)', 450, 12]].map(([route, km, mpg]) => {
          const liters = (km as number) / (mpg as number);
          const cost = liters * 1650;
          return (
            <div key={route as string} className="flex justify-between items-center bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <div><span className="font-semibold">{route}</span> <span className="text-[var(--sub)] text-[11px] ml-1">{km}km</span></div>
              <span className="font-bold text-[var(--primary-dark)]">약 {Math.round(cost as number).toLocaleString()}원</span>
            </div>
          );
        })}
      </div>
      <div className="text-[11px] text-[var(--sub)] mt-2">연비 12km/L, 유가 1,650원/L 기준 · 고속도로 통행료 별도</div>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 자동차 연비란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">연비(km/L)는 연료 1리터로 주행할 수 있는 거리를 나타내며, 자동차의 경제성을 판단하는 핵심 지표입니다. <b>연비 = 주행 거리(km) ÷ 사용 연료량(L)</b>으로 계산합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3"><b>실제 연비 측정법:</b> 주유 후 트립미터(구간거리계)를 0으로 초기화합니다. 다음 주유 시 주행거리와 주유량을 기록하면 실제 연비를 정확히 계산할 수 있습니다. 이 방법이 가장 정확합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3"><b>공인연비 vs 실제 연비:</b> 환경부가 발표하는 공인연비는 표준 시험실 조건에서 측정한 값입니다. 실제 도로에서는 에어컨, 급가속, 정체, 오르막길 등으로 공인연비의 70~85% 수준이 나옵니다. 특히 여름철에는 에어컨 사용으로 연비가 10~20% 더 떨어질 수 있습니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed"><b>여행 유류비 계산:</b> (주행 거리 ÷ 연비) × 유가로 계산합니다. 서울에서 부산까지 약 400km를 연비 12km/L 차량으로 이동하면 약 33L가 필요하며, 리터당 1,650원이면 약 55,000원의 유류비가 들어갑니다. 왕복이면 약 11만원입니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">💡 연비를 높이는 7가지 방법</h2>
      <div className="flex flex-col gap-2 text-sm text-[#4E5968]">
        {[
          ['경제속도 유지', '일반도로 60~80km/h, 고속도로 90~100km/h가 가장 연비 효율이 좋습니다.'],
          ['급가속·급제동 자제', '부드러운 가속과 감속만으로 연비가 10~15% 개선됩니다.'],
          ['타이어 공기압 점검', '적정 공기압보다 10% 부족하면 연비가 3~5% 떨어집니다. 월 1회 점검 권장.'],
          ['불필요한 짐 줄이기', '차량 무게가 50kg 늘면 연비가 약 2% 감소합니다.'],
          ['에어컨 적정 사용', '에어컨은 연비를 10~20% 떨어뜨립니다. 내기순환 모드와 적정 온도(24~26도) 설정.'],
          ['엔진오일 교체', '적정 주기로 엔진오일을 교체하면 마찰이 줄어 연비가 개선됩니다.'],
          ['아이들링 줄이기', '정차 시 시동을 끄면 불필요한 연료 소모를 줄일 수 있습니다. 최신 차량은 ISG 기능 활용.'],
        ].map(([title, desc], i) => (
          <div key={i} className="bg-[var(--bg)] rounded-xl p-3">
            <span className="font-bold text-[var(--ink)]">{i+1}. {title}</span>
            <p className="mt-0.5 text-[12.5px] text-[var(--sub)]">{desc}</p>
          </div>
        ))}
      </div>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 자동차 연비는 어떻게 계산하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 연비(km/L) = 주행 거리 ÷ 주유량입니다. 만탱 후 트립미터를 0으로 놓고, 다음 만탱 시 주행거리와 주유량을 나누면 실제 연비를 구할 수 있습니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 실제 연비가 공인연비보다 낮은 이유는?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 공인연비는 표준 시험실 조건에서 측정한 값입니다. 실제 도로에서는 에어컨, 급가속, 정체, 오르막길 등으로 공인연비의 70~85% 수준이 나옵니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 서울에서 부산까지 유류비는 얼마인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 서울-부산 약 400km 기준, 연비 12km/L 차량에 유가 1,650원/L이면 약 55,000원입니다. 고속도로 통행료(약 25,000원)는 별도입니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 연비를 높이는 가장 효과적인 방법은?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 경제속도(60~80km/h) 유지와 급가속·급제동 자제가 가장 효과적입니다. 이것만으로도 연비가 10~20% 개선됩니다. 타이어 공기압 점검도 간단하지만 효과가 큽니다.</div></div>
      </div>
    </Card>
  </>);
}
