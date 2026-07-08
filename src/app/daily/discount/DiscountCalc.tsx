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
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 할인 계산이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">할인가 계산은 원래 가격에서 할인율을 적용한 실제 결제 금액을 구하는 것입니다. 할인 적용가 = 원래 가격 × (1 - 할인율/100)로 계산합니다. 예를 들어 50,000원 상품에 30% 할인을 적용하면 35,000원이 됩니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">1+1이나 2+1 같은 묶음 행사도 실질 할인으로 환산할 수 있습니다. 1+1은 50% 할인, 2+1은 약 33% 할인과 같습니다. 개당 단가로 비교하면 어떤 행사가 더 유리한지 쉽게 판단할 수 있습니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 이중 할인은 어떻게 계산하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 20% 할인 후 추가 10% 할인은 30% 할인이 아닙니다. 원래 가격의 80% × 90% = 72%, 즉 28% 할인과 같습니다. 할인은 순차적으로 곱해야 합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 1+1과 50% 할인 중 어느 게 유리한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 같은 가격 기준이라면 개당 단가는 동일합니다. 다만 1+1은 2개를 반드시 가져가야 하므로, 1개만 필요하다면 50% 할인이 낭비가 적습니다.</div></div>
      </div>
    </Card>
  </>);
}
