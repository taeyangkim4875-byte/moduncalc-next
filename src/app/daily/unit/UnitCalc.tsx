'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-3 text-center"><div className="text-xl font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-[10px] text-[var(--sub)] mt-0.5">{l}</div></div>;
const fmt=(n:number)=>parseFloat(n.toFixed(4)).toLocaleString('ko-KR',{maximumFractionDigits:4});
export default function UnitCalc(){
  const [len,setLen]=useState(1);const [wt,setWt]=useState(1);const [temp,setTemp]=useState(36.5);const [area,setArea]=useState(33);
  return(<>
    <Card><SectionTitle num="📏">길이</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={len} onChange={e=>setLen(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">m</span></div>
      <div className="grid grid-cols-2 gap-2"><R v={fmt(len*100)} l="cm"/><R v={fmt(len*3.28084)} l="ft"/><R v={fmt(len*39.3701)} l="inch"/><R v={fmt(len/1000)} l="km"/></div>
    </Card>
    <Card><SectionTitle num="⚖️">무게</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={wt} onChange={e=>setWt(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">kg</span></div>
      <div className="grid grid-cols-2 gap-2"><R v={fmt(wt*1000)} l="g"/><R v={fmt(wt*2.20462)} l="lb"/><R v={fmt(wt*35.274)} l="oz"/></div>
    </Card>
    <Card><SectionTitle num="🌡️">온도</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={temp} step={0.1} onChange={e=>setTemp(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">℃</span></div>
      <div className="grid grid-cols-2 gap-2"><R v={fmt(temp*9/5+32)} l="℉ (화씨)"/><R v={fmt(temp+273.15)} l="K (절대온도)"/></div>
    </Card>
    <Card><SectionTitle num="📐">면적</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={area} onChange={e=>setArea(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">㎡</span></div>
      <div className="grid grid-cols-2 gap-2"><R v={fmt(area/3.3058)} l="평"/><R v={fmt(area*10.7639)} l="ft²"/></div>
    </Card>
  </>);
}
