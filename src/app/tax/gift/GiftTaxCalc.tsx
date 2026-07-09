'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';

type Relation='spouse'|'adult'|'minor'|'other';
const DEDUCTION:Record<Relation,number>={spouse:60000,adult:5000,minor:2000,other:1000};
const RELATION_LABEL:Record<Relation,string>={spouse:'배우자',adult:'직계존비속(성인)',minor:'직계존비속(미성년)',other:'기타친족'};

function calcGiftTax(amount:number,deduction:number){
  const taxBase=Math.max(0,amount-deduction);
  let tax:number;
  if(taxBase<=10000)tax=taxBase*0.1;
  else if(taxBase<=50000)tax=taxBase*0.2-1000;
  else if(taxBase<=100000)tax=taxBase*0.3-6000;
  else if(taxBase<=300000)tax=taxBase*0.4-16000;
  else tax=taxBase*0.5-46000;
  tax=Math.max(0,Math.floor(tax));
  const reportDiscount=Math.floor(tax*0.03);
  const finalTax=tax-reportDiscount;
  return {taxBase,tax,reportDiscount,finalTax};
}

export default function GiftTaxCalc(){
  const [amount,setAmount]=useState(10000);
  const [relation,setRelation]=useState<Relation>('adult');
  const [marriageBirth,setMarriageBirth]=useState(false);
  const [result,setResult]=useState<{taxBase:number;tax:number;reportDiscount:number;finalTax:number;deduction:number}|null>(null);

  const seg=(opts:{label:string;value:string}[],current:string,set:(v:string)=>void)=>
    <div className="flex flex-wrap gap-2">{opts.map(o=><button key={o.value} onClick={()=>set(o.value)} className={`flex-1 min-w-[60px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${current===o.value?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{o.label}</button>)}</div>;

  const calc=()=>{
    let deduction=DEDUCTION[relation];
    if(marriageBirth&&(relation==='adult'||relation==='minor'))deduction+=10000;
    const r=calcGiftTax(amount,deduction);
    setResult({...r,deduction});
    scrollToResult();
  };

  return(<>
    <Card><SectionTitle num="1">증여 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">증여재산가액 <span className="text-xs text-[var(--sub)] font-medium ml-1">{amount>=10000?`${Math.floor(amount/10000)}억${amount%10000?` ${(amount%10000).toLocaleString()}만`:''}`:amount.toLocaleString()+'만'}원</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={amount} min={0} onChange={e=>setAmount(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div>
        <input type="range" min={0} max={200000} step={1000} value={amount} onChange={e=>setAmount(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">증여자와의 관계</label>{seg([{label:'배우자',value:'spouse'},{label:'성인 자녀',value:'adult'},{label:'미성년 자녀',value:'minor'},{label:'기타 친족',value:'other'}],relation,v=>setRelation(v as Relation))}</div>
      <div className="mb-0">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <button onClick={()=>setMarriageBirth(!marriageBirth)} className={`relative w-[46px] h-[28px] rounded-full transition-colors flex-shrink-0 ${marriageBirth?'bg-[var(--primary)]':'bg-[#D1D6DB]'}`}>
            <span className={`absolute w-[22px] h-[22px] left-[3px] top-[3px] bg-white rounded-full shadow-sm transition-transform ${marriageBirth?'translate-x-5':''}`}/>
          </button>
          <span className="text-sm font-bold">혼인·출산 공제 적용</span>
          <span className="text-xs text-[var(--sub)] font-medium">직계존비속만, 추가 1억 공제</span>
        </label>
      </div>
    </Card>

    {result && (
      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">증여세 계산 결과</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">
            {RELATION_LABEL[relation]} · 공제 {won(result.deduction*10000)}
          </span>
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">최종 납부세액</div>
            <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.finalTax*10000)}</div>
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">증여재산가액</span><span className="font-bold">{won(amount*10000)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">증여공제</span><span className="font-bold">-{won(result.deduction*10000)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">과세표준</span><span className="font-bold">{won(result.taxBase*10000)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">산출세액</span><span className="font-bold">{won(result.tax*10000)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">신고세액공제 (3%)</span><span className="font-bold text-[var(--primary-dark)]">-{won(result.reportDiscount*10000)}</span></div>
          </div>
        </div>
      </div>
    )}
    {result && <ShareButtons title="증여세 계산 결과" />}

    {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 증여세를 계산해 드려요.</Card>}

    <Card>
      <div className="text-[13px] font-extrabold mb-2">📋 관계별 증여공제 한도 (10년 합산)</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">관계</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">공제 한도</th></tr></thead>
        <tbody>
          {([['배우자','6억원'],['직계존비속(성인)','5,000만원'],['직계존비속(미성년)','2,000만원'],['기타친족','1,000만원']] as const).map(([rel,amt])=>(
            <tr key={rel} className="border-b border-[var(--line)]"><td className="py-2 font-bold">{rel}</td><td className="text-right py-2 font-bold">{amt}</td></tr>
          ))}
        </tbody>
      </table>
    </Card>

    <Card>
      <div className="text-[13px] font-extrabold mb-2">📋 증여세율표</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">과세표준</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">세율</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">누진공제</th></tr></thead>
        <tbody>
          {([['1억 이하','10%','-'],['1~5억','20%','1,000만원'],['5~10억','30%','6,000만원'],['10~30억','40%','1억6,000만원'],['30억 초과','50%','4억6,000만원']] as const).map(([base,rate,ded])=>(
            <tr key={base} className="border-b border-[var(--line)]"><td className="py-2 font-bold">{base}</td><td className="text-right py-2 font-bold">{rate}</td><td className="text-right py-2 font-bold">{ded}</td></tr>
          ))}
        </tbody>
      </table>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 증여세란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">증여세는 타인으로부터 재산을 무상으로 받을 때 수증자(받는 사람)가 납부하는 세금입니다. 증여재산가액에서 관계에 따른 공제를 차감한 과세표준에 누진세율(10~50%)을 적용하여 계산합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">증여일로부터 3개월 이내에 자진 신고하면 산출세액의 3%를 공제받을 수 있습니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 10년 합산이란 무엇인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 동일인(배우자 포함)으로부터 10년 이내에 받은 증여재산은 모두 합산하여 과세합니다. 예를 들어 5년 전에 3,000만원을 받았다면 이번 증여와 합산하여 공제를 적용합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 혼인·출산 공제는 어떤 경우에 적용되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 2024년 1월 1일부터 시행된 제도로, 혼인신고일 전후 2년 이내 또는 자녀 출생일부터 2년 이내에 직계존속으로부터 증여받는 경우 기존 공제 외 1억원을 추가로 공제받을 수 있습니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 증여세 신고기한은 언제인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 증여받은 날이 속하는 달의 말일부터 3개월 이내에 신고·납부해야 합니다. 기한 내 자진 신고 시 3%의 신고세액공제를 받을 수 있습니다.</div></div>
      </div>
    </Card>

    <CtaButton label="증여세 계산하기" onClick={calc}/>

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <b className="text-[#6B7684]">계산 가정</b><br/>· 2026년 기준 세율 적용 · 신고세액공제 3% 반영 · 10년 합산 공제 기준
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">참고용 추정 도구입니다. 정확한 세액은 국세청(nts.go.kr) 또는 세무 전문가에게 확인하세요.</div>
    </footer>
  </>);
}
