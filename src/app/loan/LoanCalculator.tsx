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
      <h2 className="text-base font-extrabold mb-3">📖 대출 상환 방식 비교</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3"><b>원리금균등상환</b>은 매월 동일한 금액(원금+이자)을 납부하는 방식입니다. 초기 부담이 적고 예측 가능하지만, 총 이자가 더 많습니다. <b>원금균등상환</b>은 매월 동일한 원금에 잔액 이자를 더해 납부합니다. 초기 부담이 크지만 총 이자가 적어 장기적으로 유리합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">일반적으로 대출 기간이 길수록 두 방식의 총 이자 차이가 커집니다. 30년 3억원 대출 시 원금균등이 수백만원 이상 이자를 절약할 수 있습니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 어떤 상환 방식이 유리한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 총 이자만 보면 원금균등이 유리하지만, 초기 납입 부담이 크므로 소득 상황에 따라 선택하세요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 거치기간이란 무엇인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 원금 상환 없이 이자만 납부하는 기간입니다. 거치기간 동안은 월 부담이 적지만, 이후 원금 상환 시 부담이 커집니다.</div></div>
      </div>
    </Card>

    <CtaButton label="월 납입액 계산하기" onClick={calc}/>
  </>);
}
