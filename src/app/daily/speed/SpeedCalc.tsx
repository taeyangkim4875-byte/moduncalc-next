'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;
const fmt=(n:number)=>parseFloat(n.toFixed(2)).toLocaleString('ko-KR',{maximumFractionDigits:2});
export default function SpeedCalc(){
  const [dist,setDist]=useState(300);const [speed,setSpeed]=useState(100);const [conv,setConv]=useState(100);
  const h=speed?dist/speed:0;const hr=Math.floor(h);const mn=Math.round((h-hr)*60);
  return(<>
    <Card><SectionTitle num="🚗">속도 · 거리 · 시간</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">거리</label><div className="flex items-center gap-2.5"><input type="number" value={dist} onChange={e=>setDist(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">속도</label><div className="flex items-center gap-2.5"><input type="number" value={speed} onChange={e=>setSpeed(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km/h</span></div></div>
      <R v={speed?`${hr}시간 ${mn}분`:'—'} l={`${fmt(dist)}km ÷ ${fmt(speed)}km/h`}/>
    </Card>
    <Card><SectionTitle num="🏃">속도 단위 변환</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={conv} onChange={e=>setConv(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km/h</span></div>
      <div className="grid grid-cols-2 gap-2.5"><R v={fmt(conv/3.6)} l="m/s"/><R v={fmt(conv*0.621371)} l="mph"/></div>
    </Card>
  </>);
}
