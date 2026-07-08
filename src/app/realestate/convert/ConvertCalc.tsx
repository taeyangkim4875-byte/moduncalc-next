'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';

export default function ConvertCalc(){
  const [dir,setDir]=useState<'j2m'|'m2j'>('j2m');
  const [jeonse,setJeonse]=useState(30000);
  const [deposit,setDeposit]=useState(5000);
  const [rent,setRent]=useState(50);
  const [rate,setRate]=useState(4.5);
  const [result,setResult]=useState<{value:number;label:string;annual:number}|null>(null);
  const [autoCalc,setAutoCalc]=useState(false);

  useEffect(()=>{
    const p=getParams();
    if(!Object.keys(p).length)return;
    if(p.dir)setDir(p.dir as 'j2m'|'m2j');
    if(p.jeonse)setJeonse(+p.jeonse);
    if(p.deposit)setDeposit(+p.deposit);
    if(p.rent)setRent(+p.rent);
    if(p.rate)setRate(+p.rate);
    setAutoCalc(true);
  },[]);

  useEffect(()=>{
    if(autoCalc){calc();setAutoCalc(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[autoCalc]);

  const calc=()=>{
    if(dir==='j2m'){
      const monthly=(jeonse-deposit)*10000*rate/100/12;
      setResult({value:monthly,label:'월세',annual:monthly*12});
      setParams({dir,jeonse,deposit,rate});
      scrollToResult();
    }else{
      const r=rate>0?rate/100:0.01;
      const total=deposit*10000+rent*10000*12/r;
      setResult({value:total,label:'전세 환산금',annual:rent*10000*12});
      setParams({dir,deposit,rent,rate});
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
    {result && <ShareButtons title="전월세 전환 결과" />}
    {!result&&<Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 전환 결과를 알려드려요.</Card>}
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 전월세 전환이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">전월세 전환은 전세보증금을 월세로, 또는 월세를 전세보증금으로 환산하는 것을 말합니다. 임대차 계약에서 임대인과 임차인 간의 보증금·월세 비율을 조정할 때 활용되며, 전환율(전월세 전환율)을 기준으로 계산합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">주택임대차보호법에 따라 전월세 전환 시 적용할 수 있는 상한이 있으며, 이를 &apos;법정전환율&apos;이라 합니다. 법정전환율은 한국은행 기준금리 + 대통령령으로 정한 이율(현재 2%)로 정해지며, 임대인은 이 상한을 초과하여 월세를 전환할 수 없습니다. 시장 전환율은 지역과 시기에 따라 다르므로 실거래 데이터를 함께 참고하는 것이 좋습니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 법정전환율이란 무엇인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 법정전환율은 전세보증금을 월세로 전환할 때 적용할 수 있는 최대 비율로, 한국은행 기준금리에 2%를 더한 값입니다. 예를 들어 기준금리가 2.5%라면 법정전환율은 4.5%가 됩니다. 이 상한을 초과하는 전환은 법적으로 허용되지 않습니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 임대인이 마음대로 전환율을 올릴 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 아닙니다. 주택임대차보호법에 따라 법정전환율을 초과하여 보증금을 월세로 전환할 수 없습니다. 만약 상한을 초과하는 경우, 임차인은 초과분에 대해 무효를 주장할 수 있으며 차액 반환을 청구할 수 있습니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 전세와 월세 중 어느 쪽이 유리한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 보유 자금이 충분하다면 전세가 월 고정지출이 없어 유리할 수 있습니다. 반면, 전세 자금이 부족하거나 금리가 높은 시기에는 보증금을 낮추고 월세로 전환하는 것이 전세대출 이자보다 저렴할 수 있습니다. 금리 수준과 개인 자금 상황을 함께 고려하세요.</div></div>
      </div>
    </Card>

    <CtaButton label="전환 계산하기" onClick={calc}/>
  </>);
}
