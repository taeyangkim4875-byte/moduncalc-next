'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;
const DAYS=['일','월','화','수','목','금','토'];
const today=()=>new Date().toISOString().slice(0,10);
export default function DdayCalc(){
  const [from,setFrom]=useState(today());const [to,setTo]=useState('');
  const [addFrom,setAddFrom]=useState(today());const [addDays,setAddDays]=useState(100);
  const dday=()=>{if(!from||!to)return null;const a=new Date(from+'T00:00:00'),b=new Date(to+'T00:00:00');const diff=Math.round((b.getTime()-a.getTime())/864e5);const abs=Math.abs(diff),w=Math.floor(abs/7),r=abs%7;return{diff,abs,w,r,day:DAYS[b.getDay()],date:to};};
  const dateAdd=()=>{const d=new Date(addFrom+'T00:00:00');d.setDate(d.getDate()+addDays);return{date:d.toISOString().slice(0,10),day:DAYS[d.getDay()]};};
  const dd=dday();const da=dateAdd();
  return(<>
    <Card><SectionTitle num="📅">D-day 계산</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">기준 날짜</label><input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none focus:border-[var(--primary)]"/></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">목표 날짜</label><input type="date" value={to} onChange={e=>setTo(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none focus:border-[var(--primary)]"/></div>
      {dd&&<R v={dd.diff>0?`D-${dd.diff}`:dd.diff<0?`D+${dd.abs}`:'D-Day'} l={`${dd.abs}일 (${dd.w}주 ${dd.r}일) · ${dd.date} (${dd.day}요일)`}/>}
    </Card>
    <Card><SectionTitle num="📆">날짜 더하기/빼기</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">시작 날짜</label><input type="date" value={addFrom} onChange={e=>setAddFrom(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none focus:border-[var(--primary)]"/></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">더할 일수</label><div className="flex items-center gap-2.5"><input type="number" value={addDays} onChange={e=>setAddDays(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">일</span></div></div>
      <R v={da.date} l={`${da.day}요일`}/>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 D-day 계산이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">D-day는 특정 날짜까지 남은 일수 또는 경과한 일수를 나타내는 표현입니다. D-0은 당일, D-30은 30일 남았다는 뜻이며, D+100은 100일이 지났다는 뜻입니다. 시험, 기념일, 프로젝트 마감 등 중요한 날짜를 관리할 때 유용합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">날짜 더하기/빼기 기능을 이용하면 특정 날짜로부터 며칠 후 또는 며칠 전의 날짜를 쉽게 구할 수 있습니다. 100일 기념일, 출산 예정일 등을 계산할 때 편리합니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. D-day와 D+day의 차이는?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. D-day(D-0)는 당일이며, D-30은 30일 남았다는 뜻입니다. D+100은 기준일로부터 100일이 지났다는 의미로, 커플 기념일이나 출생 후 일수를 셀 때 사용합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 음수 일수를 입력하면?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 날짜 더하기에 음수를 입력하면 과거 날짜를 계산할 수 있습니다. 예를 들어 -100을 입력하면 100일 전 날짜를 알 수 있습니다.</div></div>
      </div>
    </Card>
  </>);
}
