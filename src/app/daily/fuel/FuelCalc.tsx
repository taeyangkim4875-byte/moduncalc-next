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
  </>);
}
