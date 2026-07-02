'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;
export default function DiscountCalc(){
  const [price,setPrice]=useState(50000);const [rate,setRate]=useState(30);const [bp,setBp]=useState(3000);
  return(<>
    <Card><SectionTitle num="💰">할인가 계산</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">원래 가격</label><div className="flex items-center gap-2.5"><input type="number" value={price} onChange={e=>setPrice(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">원</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">할인율 <span className="text-xs text-[var(--sub)] font-medium ml-1">{rate}%</span></label><input type="range" min={0} max={90} step={5} value={rate} onChange={e=>setRate(+e.target.value)} className="w-full"/></div>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <R v={`${Math.round(price*(1-rate/100)).toLocaleString()}원`} l="할인 적용가"/>
        <R v={`${Math.round(price*rate/100).toLocaleString()}원`} l={`할인 금액 (${rate}%)`}/>
      </div>
    </Card>
    <Card><SectionTitle num="🔢">1+1 / 2+1 단가 비교</SectionTitle>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">상품 가격</label><div className="flex items-center gap-2.5"><input type="number" value={bp} onChange={e=>setBp(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">원</span></div></div>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <R v={`${Math.round(bp/2).toLocaleString()}원`} l="1+1 개당"/>
        <R v={`${Math.round(bp/3).toLocaleString()}원`} l="2+1 개당"/>
      </div>
    </Card>
  </>);
}
