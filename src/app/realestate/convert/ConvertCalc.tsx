'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';
import ChainBanner from '@/components/ChainBanner';
import JourneyBreadcrumb from '@/components/JourneyBreadcrumb';
import NextStepCards from '@/components/NextStepCards';

export default function ConvertCalc(){
  const [dir,setDir]=useState<'j2m'|'m2j'>('j2m');
  const [jeonse,setJeonse]=useState(30000);
  const [deposit,setDeposit]=useState(5000);
  const [rent,setRent]=useState(50);
  const [rate,setRate]=useState(4.5);
  const [result,setResult]=useState<{value:number;label:string;annual:number}|null>(null);
  const [autoCalc,setAutoCalc]=useState(false);

  /* URL 쿼리스트링(외부 시스템)에서 초기값을 복원하는 구간.
     브라우저 전용 값이라 렌더 중에는 읽을 수 없고(정적 프리렌더와 hydration 불일치),
     effect 안에서 state를 채우는 방법뿐이라 아래 두 effect에 한해 규칙을 해제한다. */
  /* eslint-disable react-hooks/set-state-in-effect */
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
  /* eslint-enable react-hooks/set-state-in-effect */

  function calc() {
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
  }

  return(<>
    <ChainBanner />
    <JourneyBreadcrumb currentHref="/realestate/convert" />
    <Card><SectionTitle num="1">전환 정보</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">전환 방향</label>
        <div className="flex gap-2">
          {([['j2m','전세 → 월세'],['m2j','월세 → 전세']] as const).map(([v,l])=><button key={v} onClick={()=>setDir(v)} className={`flex-1 py-2.5 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer ${dir===v?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{l}</button>)}
        </div>
      </div>
      {dir==='j2m'?<>
        <div className="mb-4"><label className="block text-sm font-bold mb-2">전세보증금</label><div className="flex items-center gap-2.5"><input type="number" value={jeonse || ''} onChange={e=>setJeonse(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div></div>
        <div className="mb-4"><label className="block text-sm font-bold mb-2">월세 보증금</label><div className="flex items-center gap-2.5"><input type="number" value={deposit || ''} onChange={e=>setDeposit(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div></div>
      </>:<>
        <div className="mb-4"><label className="block text-sm font-bold mb-2">보증금</label><div className="flex items-center gap-2.5"><input type="number" value={deposit || ''} onChange={e=>setDeposit(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div></div>
        <div className="mb-4"><label className="block text-sm font-bold mb-2">월세</label><div className="flex items-center gap-2.5"><input type="number" value={rent || ''} onChange={e=>setRent(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div></div>
      </>}
      <div className="mb-0"><label className="block text-sm font-bold mb-2">전환율</label><div className="flex items-center gap-2.5"><input type="number" value={rate || ''} step={0.1} onChange={e=>setRate(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">%</span></div></div>
    </Card>
    {result&&<div id="calc-result" className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
      <div className="text-center py-2">
        <div className="text-sm font-bold text-[var(--sub)]">{result.label}</div>
        <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.value)}{dir==='j2m'&&<span className="text-base font-bold">/월</span>}</div>
        <div className="text-sm text-[var(--sub)]">연간 {won(result.annual)}</div>
      </div>
    </div>}
    {result && <NextStepCards from="/realestate/convert" outputs={{ jeonse }} />}
    {result && <ShareButtons title="전월세 전환 결과" />}
    {!result&&<Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 전환 결과를 알려드려요.</Card>}
    <Card>
      <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed">전세 3억이면 월세로 얼마인지 바로 변환돼요. 전환율 기준으로 계산하며, 반대 변환도 가능해요.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 법정전환율이란?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 한국은행 기준금리 + 2%예요. 임대인은 이 상한을 초과해서 전환할 수 없어요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 전세와 월세 중 어느 쪽이 유리한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 자금이 충분하면 전세가 유리하고, 전세대출 이자가 높으면 월세가 나을 수 있어요. 금리랑 자금 상황을 같이 봐야 해요.</div></div>
      </div>
    </Card>

    <CtaButton label="전환 계산하기" onClick={calc}/>
  </>);
}
