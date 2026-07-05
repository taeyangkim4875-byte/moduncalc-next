'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;
const ANIMALS=['원숭이','닭','개','돼지','쥐','소','호랑이','토끼','용','뱀','말','양'];
const SIGNS:[string,number][]=[['염소',119],['물병',218],['물고기',320],['양',419],['황소',520],['쌍둥이',620],['게',722],['사자',822],['처녀',922],['천칭',1022],['전갈',1121],['사수',1221],['염소',1231]];

export default function AgeCalc(){
  const [year,setYear]=useState('');
  const [month,setMonth]=useState('');
  const [day,setDay]=useState('');

  const calc=()=>{
    const y=+year, m=+month, d=+day;
    if(!y||!m||!d||y<1900||y>2030||m<1||m>12||d<1||d>31)return null;
    const birthStr=`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const b=new Date(birthStr+'T00:00:00'),now=new Date();
    if(isNaN(b.getTime()))return null;
    let manAge=now.getFullYear()-b.getFullYear();
    if(now.getMonth()<b.getMonth()||(now.getMonth()===b.getMonth()&&now.getDate()<b.getDate()))manAge--;
    const korAge=now.getFullYear()-b.getFullYear()+1;
    let nextBday=new Date(now.getFullYear(),b.getMonth(),b.getDate());
    if(nextBday<=now)nextBday=new Date(now.getFullYear()+1,b.getMonth(),b.getDate());
    const daysLeft=Math.ceil((nextBday.getTime()-now.getTime())/864e5);
    const animal=ANIMALS[b.getFullYear()%12];
    const md=b.getMonth()*100+b.getDate();
    let star='염소';for(const[s,dd]of SIGNS){if(md<=dd){star=s;break;}}
    return{manAge,korAge,daysLeft,nextBday:nextBday.toISOString().slice(0,10),animal,star,year:b.getFullYear()};
  };
  const r=calc();
  return(<>
    <Card><SectionTitle num="🎂">생년월일 입력</SectionTitle>
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">년</label>
          <input type="number" value={year} onChange={e=>setYear(e.target.value)} placeholder="1995" inputMode="numeric"
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
        </div>
        <div className="flex-none w-[72px]">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">월</label>
          <input type="number" value={month} onChange={e=>setMonth(e.target.value)} placeholder="1" min={1} max={12} inputMode="numeric"
            className="w-full py-3 px-2 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
        </div>
        <div className="flex-none w-[72px]">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">일</label>
          <input type="number" value={day} onChange={e=>setDay(e.target.value)} placeholder="1" min={1} max={31} inputMode="numeric"
            className="w-full py-3 px-2 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
        </div>
      </div>
      {r&&<>
        <div className="grid grid-cols-2 gap-2.5 mt-3"><R v={`${r.manAge}세`} l="만 나이"/><R v={`${r.korAge}세`} l="한국 나이(연 나이)"/></div>
        <R v={`${r.daysLeft}일`} l={`다음 생일까지 (${r.nextBday})`}/>
      </>}
    </Card>
    {r&&<Card><SectionTitle num="🐲">띠 · 별자리</SectionTitle>
      <R v={`${r.animal}띠 · ${r.star}자리`} l={`${r.year}년생`}/>
    </Card>}
  </>);
}
