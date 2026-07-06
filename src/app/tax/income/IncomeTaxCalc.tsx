'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { progressiveTax } from '@/utils/tax';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';

export default function IncomeTaxCalc(){
  const [income,setIncome]=useState(5000);
  const [deduction,setDeduction]=useState(1000);
  const [dependents,setDependents]=useState(1);
  const [result,setResult]=useState<{base:number;tax:number;local:number;total:number;effectiveRate:number}|null>(null);
  const [autoCalc,setAutoCalc]=useState(false);

  useEffect(()=>{
    const p=getParams();
    if(!Object.keys(p).length)return;
    if(p.income)setIncome(+p.income);
    if(p.deduction)setDeduction(+p.deduction);
    if(p.dependents)setDependents(+p.dependents);
    setAutoCalc(true);
  },[]);

  useEffect(()=>{
    if(autoCalc){calc();setAutoCalc(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[autoCalc]);

  const calc=()=>{
    const base=Math.max(0,(income-deduction)*10000-dependents*1500000);
    const tax=progressiveTax(base);
    const local=Math.round(tax*0.1);
    const total=Math.round(tax)+local;
    const effectiveRate=income>0?(total/(income*10000)*100):0;
    setResult({base,tax:Math.round(tax),local,total,effectiveRate});
    setParams({income,deduction,dependents});
    scrollToResult();
  };

  return(<>
    <Card><SectionTitle num="1">소득 정보</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">총 수입금액</label><div className="flex items-center gap-2.5"><input type="number" value={income} onChange={e=>setIncome(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div></div>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">필요경비/소득공제</label><div className="flex items-center gap-2.5"><input type="number" value={deduction} onChange={e=>setDeduction(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">인적공제 인원 (본인 포함)</label>
        <select value={dependents} onChange={e=>setDependents(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
          {[1,2,3,4,5].map(n=><option key={n} value={n}>{n}명</option>)}
        </select>
      </div>
    </Card>
    {result&&<div id="calc-result">
      <div className="text-lg font-extrabold mt-4 mb-3 px-1">세액 결과</div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <div className="text-center py-2">
          <div className="text-sm font-bold text-[var(--sub)]">총 세금</div>
          <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.total)}</div>
          <div className="text-sm text-[var(--sub)]">실효세율 {result.effectiveRate.toFixed(1)}%</div>
        </div>
        <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">과세표준</span><span className="font-bold">{won(result.base)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">산출세액</span><span className="font-bold">{won(result.tax)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">지방소득세</span><span className="font-bold">{won(result.local)}</span></div>
        </div>
      </div>
    </div>}
    {result && <ShareButtons title="종합소득세 결과" />}
    {!result&&<Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 예상 세액을 계산해 드려요.</Card>}
    <CtaButton label="세액 계산하기" onClick={calc}/>
  </>);
}
