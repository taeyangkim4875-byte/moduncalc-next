'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';

export default function LoanCalculator(){
  const [amount,setAmount]=useState(30000);
  const [rate,setRate]=useState(3.5);
  const [term,setTerm]=useState(30);
  const [grace,setGrace]=useState(0);
  const [result,setResult]=useState<{eq:{monthly:number;totalInt:number;total:number};pr:{first:number;last:number;totalInt:number;total:number};graceInt:number;saving:number}|null>(null);
  const [autoCalc,setAutoCalc]=useState(false);

  useEffect(()=>{
    const p=getParams();
    if(!Object.keys(p).length)return;
    if(p.amount)setAmount(+p.amount);
    if(p.rate)setRate(+p.rate);
    if(p.term)setTerm(+p.term);
    if(p.grace)setGrace(+p.grace);
    setAutoCalc(true);
  },[]);

  useEffect(()=>{
    if(autoCalc){calc();setAutoCalc(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[autoCalc]);

  const calc=()=>{
    const P=amount*10000,r=rate/100/12,totalM=term*12,graceM=grace,payM=Math.max(1,totalM-graceM);
    const graceInt=P*r*graceM;
    let eqM:number,eqTotalInt:number;
    if(r>0){eqM=P*r*Math.pow(1+r,payM)/(Math.pow(1+r,payM)-1);eqTotalInt=eqM*payM-P;}
    else{eqM=P/payM;eqTotalInt=0;}
    const prPrincipal=P/payM;
    const prFirst=prPrincipal+P*r;
    const prLast=prPrincipal+prPrincipal*r;
    const prTotalInt=P*r*(payM+1)/2;
    const saving=eqTotalInt-prTotalInt;
    setResult({eq:{monthly:eqM,totalInt:eqTotalInt+graceInt,total:P+eqTotalInt+graceInt},pr:{first:prFirst,last:prLast,totalInt:prTotalInt+graceInt,total:P+prTotalInt+graceInt},graceInt,saving});
    setParams({amount,rate,term,grace});
    scrollToResult();
  };

  return(<>
    <Card><SectionTitle num="1">대출 정보 입력</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">대출 금액 <span className="text-xs text-[var(--sub)] font-medium ml-1">{amount>=10000?`${Math.floor(amount/10000)}억${amount%10000?` ${(amount%10000).toLocaleString()}만`:''}`:amount.toLocaleString()+'만'}원</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={amount} onChange={e=>setAmount(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div>
        <input type="range" min={0} max={100000} step={500} value={amount} onChange={e=>setAmount(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">연 이자율</label>
        <div className="flex items-center gap-2.5"><input type="number" value={rate} min={0} max={20} step={0.1} onChange={e=>setRate(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">%</span></div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">대출 기간</label>
        <select value={term} onChange={e=>setTerm(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
          {[5,10,15,20,25,30,35].map(y=><option key={y} value={y}>{y}년</option>)}
        </select>
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">거치기간</label>
        <select value={grace} onChange={e=>setGrace(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
          <option value={0}>없음</option><option value={6}>6개월</option><option value={12}>1년</option><option value={24}>2년</option><option value={36}>3년</option>
        </select>
      </div>
    </Card>
    {result&&<div id="calc-result">
      <div className="text-lg font-extrabold mt-4 mb-3 px-1">상환 비교</div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">원리금균등상환</span>
        <div className="text-sm text-[var(--sub)] mb-1">매월 동일한 금액 납부</div>
        <div className="text-3xl font-extrabold tracking-tight">{won(result.eq.monthly)}<span className="text-base font-bold ml-1">/월</span></div>
        <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">총 이자</span><span className="font-bold text-[#E5484D]">{won(result.eq.totalInt)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">총 상환액</span><span className="font-bold">{won(result.eq.total)}</span></div>
        </div>
      </div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-transparent">
        <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--violet-weak)] text-[var(--violet)]">원금균등상환</span>
        <div className="text-sm text-[var(--sub)] mb-1">매월 줄어드는 금액 납부</div>
        <div className="text-3xl font-extrabold tracking-tight">{won(result.pr.first)}<span className="text-base font-bold ml-1">/첫 달</span></div>
        <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">마지막 달</span><span className="font-bold">{won(result.pr.last)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">총 이자</span><span className="font-bold text-[#E5484D]">{won(result.pr.totalInt)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">총 상환액</span><span className="font-bold">{won(result.pr.total)}</span></div>
        </div>
      </div>
      {result.saving>0&&<div className="bg-[var(--green-weak)] rounded-xl p-3.5 text-center mb-3.5">
        <div className="text-xs font-bold text-[var(--green)]">원금균등이 이자 절감</div>
        <div className="text-xl font-extrabold text-[var(--green)]">{won(result.saving)} 절약</div>
      </div>}
      {grace>0&&<div className="text-xs text-[var(--sub)] text-center">거치기간 {grace}개월 이자: {won(result.graceInt)}</div>}
    </div>}
    {result && <ShareButtons title="대출 상환 비교" />}
    {!result&&<Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 상환 방식별 납입액을 비교해 드려요.</Card>}
    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">실제 대출 금리·조건은 금융기관마다 다릅니다. 참고용으로만 활용하세요.</div>
    </footer>
    <Card>
      <h2 className="text-base font-extrabold mb-3">원리금균등 vs 원금균등, 뭐가 나을까</h2>
      <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2.5">
        <p>대출 받을 때 원리금균등이 나은지 원금균등이 나은지 항상 헷갈리잖아요. 총 이자 차이가 생각보다 커요.</p>
        <p>원리금균등은 매달 같은 금액을 내니까 계획 세우기 편해요. 근데 총 이자를 더 많이 내게 됩니다. 원금균등은 처음에 많이 내고 점점 줄어드는 방식인데, 총 이자는 확실히 적어요.</p>
        <p>3억원 30년 대출이면 두 방식의 이자 차이가 수백만원 이상 나거든요. 초반에 여유가 있으면 원금균등이 유리하고, 월 납입액을 일정하게 맞추고 싶으면 원리금균등을 선택하면 됩니다. 위에서 직접 비교해보세요.</p>
      </div>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">대출할 때 궁금한 것들</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">결국 어떤 방식이 이득인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">총 이자만 보면 원금균등이 확실히 유리해요. 근데 초반에 납입액이 커서 생활비가 빠듯할 수 있거든요. 본인 소득 상황에 맞춰서 고르는 게 맞아요. 솔직히 여유가 되면 원금균등 추천합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">거치기간은 쓰는 게 좋나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">거치기간 동안은 이자만 내니까 월 부담이 적어 보여요. 근데 그 기간 동안 원금이 안 줄어드니까 이자가 계속 쌓여요. 아쉽긴 하지만, 꼭 필요한 경우가 아니면 거치기간 없이 바로 상환 시작하는 게 낫습니다.</div></div>
      </div>
    </Card>

    <CtaButton label="월 납입액 계산하기" onClick={calc}/>
  </>);
}
