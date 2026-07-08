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
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 종합소득세란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">종합소득세는 개인이 1년간 경제활동으로 얻은 소득(사업, 근로, 이자, 배당, 연금, 기타소득)을 종합하여 과세하는 세금입니다. 매년 5월 1일~31일 사이에 전년도 소득에 대해 신고·납부하며, 소득이 많을수록 높은 세율이 적용되는 누진세 구조(6~45%)입니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">과세표준은 총 수입금액에서 필요경비(또는 소득공제)와 인적공제를 차감하여 산출합니다. 프리랜서, 자영업자, 부업 소득자 등이 주로 신고 대상이며, 근로소득만 있는 직장인은 연말정산으로 대체됩니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 종합소득세 세율은 어떻게 되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 과세표준 구간별로 6%(1,400만원 이하)~45%(10억원 초과)의 누진세율이 적용됩니다. 지방소득세(소득세의 10%)가 별도로 부과되어 실제 최고세율은 49.5%입니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 인적공제란 무엇인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 본인, 배우자, 부양가족에 대해 1인당 150만원을 소득에서 공제하는 제도입니다. 부양가족은 연 소득 100만원(근로소득만 있으면 총급여 500만원) 이하 조건을 충족해야 합니다.</div></div>
      </div>
    </Card>

    <CtaButton label="세액 계산하기" onClick={calc}/>
  </>);
}
