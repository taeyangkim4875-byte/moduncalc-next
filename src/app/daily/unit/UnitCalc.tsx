'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ResultPanel from '@/components/ResultPanel';
import ShareButtons from '@/components/ShareButtons';
const fmt=(n:number)=>parseFloat(n.toFixed(4)).toLocaleString('ko-KR',{maximumFractionDigits:4});
export default function UnitCalc(){
  const [len,setLen]=useState(1);const [wt,setWt]=useState(1);const [temp,setTemp]=useState(36.5);const [area,setArea]=useState(33);
  return(<>
    <Card><SectionTitle num="📏">길이</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={len || ''} onChange={e=>setLen(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">m</span></div>
      <div className="grid grid-cols-2 gap-2"><ResultPanel size="sm" value={fmt(len*100)} sub="cm"/><ResultPanel size="sm" value={fmt(len*3.28084)} sub="ft"/><ResultPanel size="sm" value={fmt(len*39.3701)} sub="inch"/><ResultPanel size="sm" value={fmt(len/1000)} sub="km"/></div>
    </Card>
    <Card><SectionTitle num="⚖️">무게</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={wt || ''} onChange={e=>setWt(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">kg</span></div>
      <div className="grid grid-cols-2 gap-2"><ResultPanel size="sm" value={fmt(wt*1000)} sub="g"/><ResultPanel size="sm" value={fmt(wt*2.20462)} sub="lb"/><ResultPanel size="sm" value={fmt(wt*35.274)} sub="oz"/></div>
    </Card>
    <Card><SectionTitle num="🌡️">온도</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={temp || ''} step={0.1} onChange={e=>setTemp(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">℃</span></div>
      <div className="grid grid-cols-2 gap-2"><ResultPanel size="sm" value={fmt(temp*9/5+32)} sub="℉ (화씨)"/><ResultPanel size="sm" value={fmt(temp+273.15)} sub="K (절대온도)"/></div>
    </Card>
    <Card><SectionTitle num="📐">면적</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={area || ''} onChange={e=>setArea(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">㎡</span></div>
      <div className="grid grid-cols-2 gap-2"><ResultPanel size="sm" value={fmt(area/3.3058)} sub="평"/><ResultPanel size="sm" value={fmt(area*10.7639)} sub="ft²"/></div>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed">길이, 무게, 온도 단위 변환이 필요할 때 바로 쓰세요. 해외 쇼핑이나 여행할 때 특히 유용해요.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 1평은 몇 ㎡인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 1평은 약 3.3058㎡입니다. 아파트 전용면적 84㎡는 약 25.4평, 59㎡는 약 17.8평에 해당합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 화씨를 섭씨로 빠르게 환산하려면?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 정확한 공식은 ℃ = (℉ - 32) × 5/9이지만, 대략적으로 (℉ - 30) ÷ 2로 암산할 수 있습니다. 예를 들어 72℉는 대략 (72-30)÷2 = 21℃입니다.</div></div>
      </div>
    </Card>
  </>);
}
