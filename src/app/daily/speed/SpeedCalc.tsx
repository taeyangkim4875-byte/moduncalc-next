'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;
const fmt=(n:number)=>parseFloat(n.toFixed(2)).toLocaleString('ko-KR',{maximumFractionDigits:2});
export default function SpeedCalc(){
  const [dist,setDist]=useState(300);const [speed,setSpeed]=useState(100);const [conv,setConv]=useState(100);
  const h=speed?dist/speed:0;const hr=Math.floor(h);const mn=Math.round((h-hr)*60);
  return(<>
    <Card><SectionTitle num="🚗">속도 · 거리 · 시간</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">거리</label><div className="flex items-center gap-2.5"><input type="number" value={dist} onChange={e=>setDist(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">속도</label><div className="flex items-center gap-2.5"><input type="number" value={speed} onChange={e=>setSpeed(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km/h</span></div></div>
      <R v={speed?`${hr}시간 ${mn}분`:'—'} l={`${fmt(dist)}km ÷ ${fmt(speed)}km/h`}/>
    </Card>
    <Card><SectionTitle num="🏃">속도 단위 변환</SectionTitle>
      <div className="flex items-center gap-2.5 mb-3"><input type="number" value={conv} onChange={e=>setConv(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km/h</span></div>
      <div className="grid grid-cols-2 gap-2.5"><R v={fmt(conv/3.6)} l="m/s"/><R v={fmt(conv*0.621371)} l="mph"/></div>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 속도·거리·시간 계산이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">속도·거리·시간은 물리학의 기본 공식(거리 = 속도 × 시간)으로 연결됩니다. 이동 시간 = 거리 ÷ 속도로 계산하며, 장거리 운전이나 여행 계획 시 소요 시간을 미리 계산할 때 유용합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">속도 단위 변환에서 1 km/h = 약 0.278 m/s = 약 0.621 mph입니다. 고속도로 제한속도 110km/h는 약 68mph, 마라톤 세계기록 페이스는 약 21km/h(5.8m/s)입니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 고속도로에서 평균 속도가 왜 낮게 나오나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 톨게이트 대기, 휴게소 정차, 정체 구간 등이 포함되면 평균 속도가 낮아집니다. 실제 운전 시에는 제한속도의 70~80% 수준을 평균 속도로 잡는 것이 현실적입니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. km/h를 m/s로 빠르게 환산하려면?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. km/h를 3.6으로 나누면 m/s가 됩니다. 예를 들어 36km/h = 10m/s, 100km/h = 약 27.8m/s입니다.</div></div>
      </div>
    </Card>
  </>);
}
