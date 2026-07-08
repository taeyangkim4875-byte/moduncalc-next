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
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 퍼센트 계산이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">퍼센트(%)는 전체를 100으로 보았을 때의 비율을 나타내는 단위입니다. 일상에서 할인율, 이자율, 성장률, 세율 등 다양한 곳에서 사용됩니다. &apos;A의 B%&apos;는 A × B ÷ 100으로 계산하며, &apos;A는 B의 몇 %&apos;는 A ÷ B × 100으로 구합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">변화율은 (이후 값 - 이전 값) ÷ 이전 값 × 100으로 계산합니다. 예를 들어 100에서 130으로 변했다면 변화율은 +30%이며, 100에서 70으로 줄었다면 -30%입니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 퍼센트포인트(%p)와 퍼센트(%)의 차이는?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 퍼센트포인트는 두 퍼센트 값의 단순 차이이고, 퍼센트는 비율의 변화입니다. 예를 들어 금리가 3%에서 5%로 오르면 2%p 상승이지만, 변화율로는 약 66.7% 상승입니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 할인된 가격에서 원래 가격을 구하려면?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 할인된 가격 ÷ (1 - 할인율/100)로 구합니다. 예를 들어 30% 할인된 가격이 7,000원이면, 원래 가격은 7,000 ÷ 0.7 = 10,000원입니다.</div></div>
      </div>
    </Card>
  </>);
}
