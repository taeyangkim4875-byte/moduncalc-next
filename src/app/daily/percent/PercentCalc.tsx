'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ResultPanel from '@/components/ResultPanel';
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
      <ResultPanel className="mt-3" value={fmt(r1)} sub={`${fmt(a1)}의 ${fmt(b1)}%`}/>
    </Card>
    <Card><SectionTitle num="2">변화율 계산</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">이전 값</label><div className="flex items-center gap-2.5"><input type="number" value={a2} onChange={e=>setA2(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">이후 값</label><div className="flex items-center gap-2.5"><input type="number" value={b2} onChange={e=>setB2(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/></div></div>
      <ResultPanel className="mt-3" value={`${r2>=0?'+':''}${fmt(r2)}%`} sub={`${fmt(Math.abs(b2-a2))} ${b2>=a2?'증가':'감소'}`}/>
    </Card>
    <Card><SectionTitle num="3">A는 B의 몇 %?</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">부분 값 A</label><div className="flex items-center gap-2.5"><input type="number" value={a3} onChange={e=>setA3(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">전체 값 B</label><div className="flex items-center gap-2.5"><input type="number" value={b3} onChange={e=>setB3(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/></div></div>
      <ResultPanel className="mt-3" value={`${fmt(r3)}%`} sub={`${fmt(a3)}은 ${fmt(b3)}의 ${fmt(r3)}%`}/>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed">퍼센트 계산이 헷갈릴 때 여기서 바로 하세요. A의 B%, 변화율, A는 B의 몇 % 세 가지를 한번에 계산해요.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 퍼센트포인트(%p)와 퍼센트(%)의 차이는?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 퍼센트포인트는 두 퍼센트 값의 단순 차이이고, 퍼센트는 비율의 변화입니다. 예를 들어 금리가 3%에서 5%로 오르면 2%p 상승이지만, 변화율로는 약 66.7% 상승입니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 할인된 가격에서 원래 가격을 구하려면?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 할인된 가격 ÷ (1 - 할인율/100)로 구합니다. 예를 들어 30% 할인된 가격이 7,000원이면, 원래 가격은 7,000 ÷ 0.7 = 10,000원입니다.</div></div>
      </div>
    </Card>
  </>);
}
