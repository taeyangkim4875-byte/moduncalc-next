'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;
const ANIMALS=['원숭이','닭','개','돼지','쥐','소','호랑이','토끼','용','뱀','말','양'];
const SIGNS:[string,number][]=[['염소',119],['물병',218],['물고기',320],['양',419],['황소',520],['쌍둥이',620],['게',722],['사자',822],['처녀',922],['천칭',1022],['전갈',1121],['사수',1221],['염소',1231]];

export default function AgeCalc(){
  const [birth,setBirth]=useState('');
  const calc=()=>{
    if(!birth)return null;
    const b=new Date(birth+'T00:00:00'),now=new Date();
    let manAge=now.getFullYear()-b.getFullYear();
    if(now.getMonth()<b.getMonth()||(now.getMonth()===b.getMonth()&&now.getDate()<b.getDate()))manAge--;
    const korAge=now.getFullYear()-b.getFullYear()+1;
    let nextBday=new Date(now.getFullYear(),b.getMonth(),b.getDate());
    if(nextBday<=now)nextBday=new Date(now.getFullYear()+1,b.getMonth(),b.getDate());
    const daysLeft=Math.ceil((nextBday.getTime()-now.getTime())/864e5);
    const animal=ANIMALS[b.getFullYear()%12];
    const md=b.getMonth()*100+b.getDate();
    let star='염소';for(const[s,d]of SIGNS){if(md<=d){star=s;break;}}
    return{manAge,korAge,daysLeft,nextBday:nextBday.toISOString().slice(0,10),animal,star,year:b.getFullYear()};
  };
  const r=calc();
  return(<>
    <Card><SectionTitle num="🎂">생년월일 입력</SectionTitle>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">생년월일</label><input type="date" value={birth} onChange={e=>setBirth(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none focus:border-[var(--primary)]"/></div>
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
