'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import { won } from '@/utils/format';

type Season='normal'|'summer'|'winter';

const TIERS:{[k in Season]:{limit:number;base:number;unit:number}[]}={
  normal:[{limit:200,base:910,unit:120.0},{limit:400,base:1600,unit:214.6},{limit:Infinity,base:7300,unit:307.3}],
  summer:[{limit:300,base:910,unit:120.0},{limit:450,base:1600,unit:214.6},{limit:Infinity,base:7300,unit:307.3}],
  winter:[{limit:200,base:910,unit:120.0},{limit:400,base:1600,unit:214.6},{limit:Infinity,base:7300,unit:307.3}],
};

function calcElectric(kwh:number,season:Season){
  const tiers=TIERS[season];
  let remaining=kwh, tierIdx=0, energyCharge=0, baseCharge=0;
  const breakdown:{label:string;kwh:number;charge:number}[]=[];
  let prevLimit=0;
  for(let i=0;i<tiers.length&&remaining>0;i++){
    const t=tiers[i];
    const tierKwh=Math.min(remaining,t.limit-prevLimit);
    if(tierKwh>0){
      const charge=Math.round(tierKwh*t.unit);
      energyCharge+=charge;
      tierIdx=i;
      breakdown.push({label:`${i+1}구간 (${prevLimit}~${t.limit===Infinity?'':t.limit}kWh)`,kwh:tierKwh,charge});
    }
    remaining-=tierKwh;
    prevLimit=t.limit;
  }
  baseCharge=tiers[tierIdx].base;
  const subtotal=baseCharge+energyCharge;
  const vat=Math.round(subtotal*0.1);
  const fund=Math.round(subtotal*0.037);
  const total=subtotal+vat+fund;
  return {baseCharge,energyCharge,vat,fund,total,breakdown};
}

export default function ElectricCalc(){
  const [kwh,setKwh]=useState(300);
  const [season,setSeason]=useState<Season>('normal');

  const r=calcElectric(kwh,season);

  const seg=(opts:{label:string;value:string}[],current:string,set:(v:string)=>void)=>
    <div className="flex flex-wrap gap-2">{opts.map(o=><button key={o.value} onClick={()=>set(o.value)} className={`flex-1 min-w-[60px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${current===o.value?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{o.label}</button>)}</div>;

  return(<>
    <Card><SectionTitle num="1">사용량 입력</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">월 사용량 <span className="text-xs text-[var(--sub)] font-medium ml-1">{kwh.toLocaleString()}kWh</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={kwh} min={0} max={1000} onChange={e=>setKwh(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">kWh</span></div>
        <input type="range" min={0} max={1000} step={10} value={kwh} onChange={e=>setKwh(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">적용 시기</label>{seg([{label:'일반 (3~6,9~11월)',value:'normal'},{label:'하계 (7~8월)',value:'summer'},{label:'동계 (12~2월)',value:'winter'}],season,v=>setSeason(v as Season))}</div>
    </Card>

    <div className="text-lg font-extrabold mt-4 mb-3 px-1">예상 전기요금</div>
    <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
      <div className="text-center py-2">
        <div className="text-sm font-bold text-[var(--sub)]">총 전기요금</div>
        <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(r.total)}</div>
      </div>
      <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">기본요금</span><span className="font-bold">{won(r.baseCharge)}</span></div>
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">전력량요금</span><span className="font-bold">{won(r.energyCharge)}</span></div>
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">부가가치세 (10%)</span><span className="font-bold">{won(r.vat)}</span></div>
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">전력산업기반기금 (3.7%)</span><span className="font-bold">{won(r.fund)}</span></div>
      </div>
    </div>

    <Card>
      <div className="text-[13px] font-extrabold mb-2">📋 구간별 사용량</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">구간</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">사용량</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">요금</th></tr></thead>
        <tbody>
          {r.breakdown.map((b,i)=>(
            <tr key={i} className="border-b border-[var(--line)]"><td className="py-2 font-bold">{b.label}</td><td className="text-right py-2 font-bold">{b.kwh}kWh</td><td className="text-right py-2 font-bold">{won(b.charge)}</td></tr>
          ))}
        </tbody>
      </table>
    </Card>

    <Card>
      <div className="text-[13px] font-extrabold mb-2">📋 누진제 요금 구간표 ({season==='summer'?'하계':'일반/동계'})</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">구간</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">기본료</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">단가(원/kWh)</th></tr></thead>
        <tbody>
          {TIERS[season].map((t,i)=>(
            <tr key={i} className="border-b border-[var(--line)]"><td className="py-2 font-bold">{i+1}구간 ({i===0?'0':TIERS[season][i-1].limit+1}~{t.limit===Infinity?'':t.limit}kWh)</td><td className="text-right py-2 font-bold">{t.base.toLocaleString()}원</td><td className="text-right py-2 font-bold">{t.unit}원</td></tr>
          ))}
        </tbody>
      </table>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 전기요금 누진제란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">전기요금 누진제는 전기 사용량이 많을수록 높은 단가를 적용하는 요금 체계입니다. 사용량 구간에 따라 기본요금과 전력량 단가가 달라지며, 많이 쓸수록 요금이 급격히 올라갑니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">전기요금에는 기본요금과 전력량요금 외에 부가가치세(10%)와 전력산업기반기금(3.7%)이 추가로 부과됩니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 하계 요금이 완화되는 이유는 무엇인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 여름철(7~8월)에는 냉방 사용이 급증하므로 1구간 상한을 300kWh로 확대하고 2구간도 450kWh까지 확대하여 요금 부담을 줄여줍니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 전기요금을 절약하는 방법은?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 대기전력 차단, 에너지효율 1등급 가전 사용, 냉난방 적정 온도 유지(여름 26도, 겨울 20도) 등이 효과적입니다. 특히 누진제 상위 구간 진입을 피하면 큰 절약 효과가 있습니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 누진제는 모든 가정에 적용되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 주택용 전기에만 누진제가 적용됩니다. 산업용·교육용·일반용 전기에는 별도 요금 체계가 적용되며 누진제가 적용되지 않습니다.</div></div>
      </div>
    </Card>

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <b className="text-[#6B7684]">계산 가정</b><br/>· 주택용(저압) 전기요금 기준 · 부가세 10%, 기반기금 3.7%
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">참고용 추정 도구입니다. 정확한 요금은 한국전력공사(kepco.co.kr)에서 확인하세요.</div>
    </footer>
  </>);
}
