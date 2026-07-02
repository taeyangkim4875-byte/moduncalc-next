'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;
const fmt=(n:number)=>isNaN(n)?'—':parseFloat(n.toFixed(4)).toLocaleString('ko-KR',{maximumFractionDigits:4});

export default function PercentCalc(){
  const [a1,setA1]=useState(10000);const [b1,setB1]=useState(10);
  const [a2,setA2]=useState(100);const [b2,setB2]=useState(130);
  const [a3,setA3]=useState(30);const [b3,setB3]=useState(200);
  const r1=a1*b1/100;const r2=a2?((b2-a2)/Math.abs(a2))*100:0;const r3=b3?(a3/b3)*100:0;
  return(<>
    <Card><SectionTitle num="1">A의 B%는?</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">값 A</label><div className="flex items-center gap-2.5"><input type="number" value={a1} onChange={e=>setA1(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">비율 B (%)</label><div className="flex items-center gap-2.5"><input type="number" value={b1} onChange={e=>setB1(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">%</span></div></div>
      <R v={fmt(r1)} l={`${fmt(a1)}의 ${fmt(b1)}%`}/>
    </Card>
    <Card><SectionTitle num="2">변화율 계산</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">이전 값</label><div className="flex items-center gap-2.5"><input type="number" value={a2} onChange={e=>setA2(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">이후 값</label><div className="flex items-center gap-2.5"><input type="number" value={b2} onChange={e=>setB2(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/></div></div>
      <R v={`${r2>=0?'+':''}${fmt(r2)}%`} l={`${fmt(Math.abs(b2-a2))} ${b2>=a2?'증가':'감소'}`}/>
    </Card>
    <Card><SectionTitle num="3">A는 B의 몇 %?</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">부분 값 A</label><div className="flex items-center gap-2.5"><input type="number" value={a3} onChange={e=>setA3(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">전체 값 B</label><div className="flex items-center gap-2.5"><input type="number" value={b3} onChange={e=>setB3(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/></div></div>
      <R v={`${fmt(r3)}%`} l={`${fmt(a3)}은 ${fmt(b3)}의 ${fmt(r3)}%`}/>
    </Card>
  </>);
}
