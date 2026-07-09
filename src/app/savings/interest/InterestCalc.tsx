'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import { won } from '@/utils/format';

export default function InterestCalc(){
  const [type,setType]=useState<'savings'|'deposit'>('savings');
  const [principal,setPrincipal]=useState(100);
  const [rate,setRate]=useState(3.5);
  const [months,setMonths]=useState(12);
  const [taxType,setTaxType]=useState<'normal'|'free'|'prefer'>('normal');

  const taxRate=taxType==='normal'?0.154:taxType==='prefer'?0.095:0;

  const calc=()=>{
    const p=principal*10000;
    let interest:number, totalPrincipal:number;
    if(type==='savings'){
      totalPrincipal=p*months;
      interest=p*(rate/100/12)*(months*(months+1)/2);
    }else{
      totalPrincipal=p;
      interest=p*(rate/100)*(months/12);
    }
    const tax=Math.floor(interest*taxRate);
    const afterTaxInterest=Math.floor(interest-tax);
    const total=totalPrincipal+afterTaxInterest;
    return {total,interest:Math.floor(interest),tax,afterTaxInterest,totalPrincipal};
  };

  const r=calc();

  const seg=(opts:{label:string;value:string}[],current:string,set:(v:string)=>void)=>
    <div className="flex flex-wrap gap-2">{opts.map(o=><button key={o.value} onClick={()=>set(o.value)} className={`flex-1 min-w-[60px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${current===o.value?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{o.label}</button>)}</div>;

  const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;

  return(<>
    <Card><SectionTitle num="1">거래 정보</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">거래유형</label>{seg([{label:'적금',value:'savings'},{label:'예금',value:'deposit'}],type,v=>setType(v as 'savings'|'deposit'))}</div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">{type==='savings'?'월 납입액':'원금'} <span className="text-xs text-[var(--sub)] font-medium ml-1">{principal.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={principal} min={0} onChange={e=>setPrincipal(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div>
        <input type="range" min={0} max={1000} step={10} value={principal} onChange={e=>setPrincipal(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">연 이자율 <span className="text-xs text-[var(--sub)] font-medium ml-1">{rate}%</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={rate} min={0} max={10} step={0.1} onChange={e=>setRate(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">%</span></div>
        <input type="range" min={0} max={10} step={0.1} value={rate} onChange={e=>setRate(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">가입 기간</label>
        <select value={months} onChange={e=>setMonths(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
          <option value={6}>6개월</option>
          <option value={12}>12개월</option>
          <option value={24}>24개월</option>
          <option value={36}>36개월</option>
        </select>
      </div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">이자과세</label>{seg([{label:'일반과세 15.4%',value:'normal'},{label:'비과세',value:'free'},{label:'세금우대 9.5%',value:'prefer'}],taxType,v=>setTaxType(v as 'normal'|'free'|'prefer'))}</div>
    </Card>

    <div className="text-lg font-extrabold mt-4 mb-3 px-1">만기 수령액</div>
    <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
      <div className="text-center py-2">
        <div className="text-sm font-bold text-[var(--sub)]">세후 만기 수령액</div>
        <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(r.total)}</div>
      </div>
      <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">원금 합계</span><span className="font-bold">{won(r.totalPrincipal)}</span></div>
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">세전 이자</span><span className="font-bold">{won(r.interest)}</span></div>
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">이자 과세 ({taxType==='normal'?'15.4%':taxType==='prefer'?'9.5%':'0%'})</span><span className="font-bold text-[var(--red)]">-{won(r.tax)}</span></div>
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">세후 이자</span><span className="font-bold text-[var(--primary-dark)]">{won(r.afterTaxInterest)}</span></div>
      </div>
    </div>

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 적금·예금 이자 계산이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">적금은 매달 일정 금액을 납입하고 만기에 이자와 함께 돌려받는 상품입니다. 이자는 단리 기준으로 월납입액 x (연이자율/12) x n(n+1)/2 공식으로 계산됩니다. 예금은 목돈을 한 번에 맡기고 만기에 이자를 받는 상품입니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">이자소득에는 소득세 14%와 주민세 1.4%를 합산한 15.4%의 세금이 부과됩니다. 비과세 상품이나 세금우대(9.5%) 상품을 활용하면 더 많은 이자를 받을 수 있습니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 단리와 복리의 차이는 무엇인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 단리는 원금에 대해서만 이자를 계산하고, 복리는 이자에 대한 이자까지 계산합니다. 일반적인 은행 적금·예금은 단리로 계산됩니다. 이 계산기도 단리 기준입니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 비과세 혜택은 누가 받을 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 비과세종합저축은 만 65세 이상, 장애인, 국가유공자 등이 가입할 수 있으며, 1인당 5,000만원 한도 내에서 이자소득세가 면제됩니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 적금과 예금의 차이는 무엇인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 적금은 매달 일정 금액을 납입하는 방식이고, 예금은 목돈을 한 번에 맡기는 방식입니다. 같은 금리라면 예금이 이자가 더 많습니다. 적금은 목돈 마련에, 예금은 목돈 운용에 적합합니다.</div></div>
      </div>
    </Card>

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <b className="text-[#6B7684]">계산 가정</b><br/>· 단리 기준 계산 · 이자과세: 일반 15.4%, 세금우대 9.5%, 비과세 0%
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">참고용 추정 도구입니다. 실제 수령액은 금융기관의 약관에 따라 다를 수 있습니다.</div>
    </footer>
  </>);
}
