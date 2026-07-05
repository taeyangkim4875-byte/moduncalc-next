'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';

export default function ConvertCalc(){
  const [dir,setDir]=useState<'j2m'|'m2j'>('j2m');
  const [jeonse,setJeonse]=useState(30000);
  const [deposit,setDeposit]=useState(5000);
  const [rent,setRent]=useState(50);
  const [rate,setRate]=useState(4.5);
  const [result,setResult]=useState<{value:number;label:string;annual:number}|null>(null);

  const calc=()=>{
    if(dir==='j2m'){
      const monthly=(jeonse-deposit)*10000*rate/100/12;
      setResult({value:monthly,label:'월세',annual:monthly*12});
      scrollToResult();
    }else{
      const total=deposit*10000+rent*10000*12/(rate/100);
      setResult({value:total,label:'전세 환산금',annual:rent*10000*12});
      scrollToResult();
    }
  };

  return(<>
    <Card><SectionTitle num="1">전환 정보</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">전환 방향</label>
        <div className="flex gap-2">
          {([['j2m','전세 → 월세'],['m2j','월세 → 전세']] as const).map(([v,l])=><button key={v} onClick={()=>setDir(v)} className={`flex-1 py-2.5 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer ${dir===v?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{l}</button>)}
        </div>
      </div>
      {dir==='j2m'?<>
        <div className="mb-4"><label className="block text-sm font-bold mb-2">전세보증금</label><div className="flex items-center gap-2.5"><input type="number" value={jeonse} onChange={e=>setJeonse(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div></div>
        <div className="mb-4"><label className="block text-sm font-bold mb-2">월세 보증금</label><div className="flex items-center gap-2.5"><input type="number" value={deposit} onChange={e=>setDeposit(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div></div>
      </>:<>
        <div className="mb-4"><label className="block text-sm font-bold mb-2">보증금</label><div className="flex items-center gap-2.5"><input type="number" value={deposit} onChange={e=>setDeposit(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div></div>
        <div className="mb-4"><label className="block text-sm font-bold mb-2">월세</label><div className="flex items-center gap-2.5"><input type="number" value={rent} onChange={e=>setRent(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div></div>
      </>}
      <div className="mb-0"><label className="block text-sm font-bold mb-2">전환율</label><div className="flex items-center gap-2.5"><input type="number" value={rate} step={0.1} onChange={e=>setRate(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">%</span></div></div>
    </Card>
    {result&&<div id="calc-result" className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
      <div className="text-center py-2">
        <div className="text-sm font-bold text-[var(--sub)]">{result.label}</div>
        <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.value)}{dir==='j2m'&&<span className="text-base font-bold">/월</span>}</div>
        <div className="text-sm text-[var(--sub)]">연간 {won(result.annual)}</div>
      </div>
    </div>}
    {!result&&<Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 전환 결과를 알려드려요.</Card>}
    <CtaButton label="전환 계산하기" onClick={calc}/>
  </>);
}
