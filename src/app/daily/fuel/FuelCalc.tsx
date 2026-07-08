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
      <h2 className="text-base font-extrabold mb-3">📖 자동차 연비란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">연비(km/L)는 연료 1리터로 주행할 수 있는 거리를 나타내며, 자동차의 경제성을 판단하는 핵심 지표입니다. 연비 = 주행 거리 ÷ 사용 연료량으로 계산합니다. 일반 경차는 15~20km/L, 중형차는 10~14km/L, SUV는 8~12km/L 수준입니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">여행 유류비는 (주행 거리 ÷ 연비) × 유가로 계산합니다. 서울에서 부산까지 약 400km를 연비 12km/L 차량으로 이동하면 약 33L가 필요하며, 리터당 1,650원이면 약 55,000원의 유류비가 들어갑니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 실제 연비가 공인연비보다 낮은 이유는?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 공인연비는 정해진 시험 조건에서 측정한 값이며, 실제 도로 주행에서는 에어컨 사용, 급가속·급제동, 도심 정체 등으로 인해 공인연비의 70~85% 수준이 나옵니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 연비를 높이는 방법은?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 급가속·급제동을 피하고, 정속 주행을 유지하며, 타이어 공기압을 적정 수준으로 관리하면 연비가 5~15% 개선됩니다. 불필요한 짐을 줄이는 것도 도움이 됩니다.</div></div>
      </div>
    </Card>
  </>);
}
