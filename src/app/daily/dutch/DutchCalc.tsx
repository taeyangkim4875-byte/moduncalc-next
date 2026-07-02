'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;
export default function DutchCalc(){
  const [total,setTotal]=useState(150000);const [people,setPeople]=useState(4);
  const [tipTotal,setTipTotal]=useState(100000);const [tipRate,setTipRate]=useState(10);
  return(<>
    <Card><SectionTitle num="🍽️">N분의1 더치페이</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">총 금액</label><div className="flex items-center gap-2.5"><input type="number" value={total} onChange={e=>setTotal(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">원</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">인원 수 <span className="text-xs text-[var(--sub)] font-medium ml-1">{people}명</span></label><input type="range" min={2} max={20} value={people} onChange={e=>setPeople(+e.target.value)} className="w-full"/></div>
      <R v={`${people>0?Math.ceil(total/people).toLocaleString():0}원`} l={`1인당 (${people}명)`}/>
    </Card>
    <Card><SectionTitle num="💸">팁 계산기</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">결제 금액</label><div className="flex items-center gap-2.5"><input type="number" value={tipTotal} onChange={e=>setTipTotal(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">원</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">팁 비율</label><div className="flex gap-2">{[5,10,15,20].map(r=><button key={r} onClick={()=>setTipRate(r)} className={`flex-1 py-2.5 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer ${tipRate===r?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{r}%</button>)}</div></div>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <R v={`${Math.round(tipTotal*tipRate/100).toLocaleString()}원`} l={`팁 (${tipRate}%)`}/>
        <R v={`${Math.round(tipTotal*(1+tipRate/100)).toLocaleString()}원`} l="총 결제액"/>
      </div>
    </Card>
  </>);
}
