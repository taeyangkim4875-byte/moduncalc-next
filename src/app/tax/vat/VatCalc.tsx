'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function VatCalc(){
  const [mode,setMode]=useState<'supply'|'total'>('supply');
  const [amount,setAmount]=useState(1000000);
  const supply=mode==='supply'?amount:Math.round(amount/1.1);
  const vat=mode==='supply'?Math.round(amount*0.1):amount-supply;
  const total=mode==='supply'?amount+vat:amount;

  return(<>
    <Card><SectionTitle num="1">금액 입력</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">입력 방식</label>
        <div className="flex gap-2">
          {([['supply','공급가액'],['total','합계금액']] as const).map(([v,l])=><button key={v} onClick={()=>setMode(v)} className={`flex-1 py-2.5 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer ${mode===v?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{l}</button>)}
        </div>
      </div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">{mode==='supply'?'공급가액':'합계금액'}</label>
        <div className="flex items-center gap-2.5"><input type="number" value={amount} onChange={e=>setAmount(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">원</span></div>
      </div>
    </Card>
    <div className="grid grid-cols-3 gap-2.5">
      <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">공급가액</div><div className="text-lg font-extrabold text-[var(--ink)] mt-1">{supply.toLocaleString()}</div><div className="text-[10px] text-[var(--sub)]">원</div></div>
      <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">부가세(10%)</div><div className="text-lg font-extrabold text-[var(--primary-dark)] mt-1">{vat.toLocaleString()}</div><div className="text-[10px] text-[var(--sub)]">원</div></div>
      <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">합계금액</div><div className="text-lg font-extrabold text-[var(--green)] mt-1">{total.toLocaleString()}</div><div className="text-[10px] text-[var(--sub)]">원</div></div>
    </div>
  </>);
}
