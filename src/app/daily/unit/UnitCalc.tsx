'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-3 text-center"><div className="text-xl font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-[10px] text-[var(--sub)] mt-0.5">{l}</div></div>;
const fmt=(n:number)=>parseFloat(n.toFixed(4)).toLocaleString('ko-KR',{maximumFractionDigits:4});
export default function UnitCalc(){
  const [len,setLen]=useState(1);const [wt,setWt]=useState(1);const [temp,setTemp]=useState(36.5);const [area,setArea]=useState(33);
  return(<>
    <Card><SectionTitle num="📏">길이</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={len} onChange={e=>setLen(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">m</span></div>
      <div className="grid grid-cols-2 gap-2"><R v={fmt(len*100)} l="cm"/><R v={fmt(len*3.28084)} l="ft"/><R v={fmt(len*39.3701)} l="inch"/><R v={fmt(len/1000)} l="km"/></div>
    </Card>
    <Card><SectionTitle num="⚖️">무게</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={wt} onChange={e=>setWt(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">kg</span></div>
      <div className="grid grid-cols-2 gap-2"><R v={fmt(wt*1000)} l="g"/><R v={fmt(wt*2.20462)} l="lb"/><R v={fmt(wt*35.274)} l="oz"/></div>
    </Card>
    <Card><SectionTitle num="🌡️">온도</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={temp} step={0.1} onChange={e=>setTemp(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">℃</span></div>
      <div className="grid grid-cols-2 gap-2"><R v={fmt(temp*9/5+32)} l="℉ (화씨)"/><R v={fmt(temp+273.15)} l="K (절대온도)"/></div>
    </Card>
    <Card><SectionTitle num="📐">면적</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={area} onChange={e=>setArea(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">㎡</span></div>
      <div className="grid grid-cols-2 gap-2"><R v={fmt(area/3.3058)} l="평"/><R v={fmt(area*10.7639)} l="ft²"/></div>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 단위 변환이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">단위 변환은 같은 물리량을 다른 단위 체계로 환산하는 것입니다. 길이(m, cm, ft, inch), 무게(kg, g, lb, oz), 온도(℃, ℉, K), 면적(㎡, 평, ft²) 등 일상에서 자주 사용하는 단위들을 즉시 변환할 수 있습니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">한국에서는 부동산 면적에 &apos;평&apos;(1평 = 약 3.3058㎡)을 많이 사용하며, 미국은 피트(ft)와 파운드(lb)를 주로 씁니다. 해외 쇼핑이나 여행 시 단위 변환이 유용합니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 1평은 몇 ㎡인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 1평은 약 3.3058㎡입니다. 아파트 전용면적 84㎡는 약 25.4평, 59㎡는 약 17.8평에 해당합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 화씨를 섭씨로 빠르게 환산하려면?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 정확한 공식은 ℃ = (℉ - 32) × 5/9이지만, 대략적으로 (℉ - 30) ÷ 2로 암산할 수 있습니다. 예를 들어 72℉는 대략 (72-30)÷2 = 21℃입니다.</div></div>
      </div>
    </Card>
  </>);
}
