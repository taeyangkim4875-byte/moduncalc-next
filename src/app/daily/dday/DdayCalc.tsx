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
  </>);
}
