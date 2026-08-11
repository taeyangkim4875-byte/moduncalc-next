'use client';
import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ShareButtons from '@/components/ShareButtons';

const HOLIDAYS_2026=[
  {name:'설날',lunar:'1월 1일',solar:'2026-02-17',emoji:'🧧'},
  {name:'정월대보름',lunar:'1월 15일',solar:'2026-03-03',emoji:'🌕'},
  {name:'삼짇날',lunar:'3월 3일',solar:'2026-04-19',emoji:'🌸'},
  {name:'단오',lunar:'5월 5일',solar:'2026-06-24',emoji:'🎋'},
  {name:'칠석',lunar:'7월 7일',solar:'2026-08-22',emoji:'🌌'},
  {name:'백중',lunar:'7월 15일',solar:'2026-08-30',emoji:'🙏'},
  {name:'추석',lunar:'8월 15일',solar:'2026-10-04',emoji:'🌾'},
  {name:'중양절',lunar:'9월 9일',solar:'2026-10-27',emoji:'🏔️'},
  {name:'동지',lunar:'양력 고정',solar:'2026-12-22',emoji:'🥣'},
];

// 2026 lunar month start dates (solar dates when each lunar month begins)
// Lunar month 1 starts 2026-02-17, month 2 starts 2026-03-19, etc.
const LUNAR_MONTH_STARTS_2026=[
  {month:1,solar:'2026-02-17',days:29},
  {month:2,solar:'2026-03-18',days:30},
  {month:3,solar:'2026-04-17',days:29},
  {month:4,solar:'2026-05-16',days:30},
  {month:5,solar:'2026-06-15',days:29},
  {month:6,solar:'2026-07-14',days:30},
  {month:7,solar:'2026-08-13',days:29},
  {month:8,solar:'2026-09-11',days:30},
  {month:9,solar:'2026-10-11',days:29},
  {month:10,solar:'2026-11-09',days:30},
  {month:11,solar:'2026-12-09',days:29},
  {month:12,solar:'2027-01-07',days:30},
];

const DAYS=['일','월','화','수','목','금','토'];
const fmtDate=(s:string)=>{const d=new Date(s+'T00:00:00');return `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()} (${DAYS[d.getDay()]})`;}
const diffDays=(target:string)=>{const now=new Date();now.setHours(0,0,0,0);const t=new Date(target+'T00:00:00');return Math.ceil((t.getTime()-now.getTime())/864e5);};

export default function LunarCalc(){
  const [lunarMonth,setLunarMonth]=useState(1);
  const [lunarDay,setLunarDay]=useState(1);

  const nextHoliday=useMemo(()=>{
    const today=new Date();today.setHours(0,0,0,0);
    return HOLIDAYS_2026.find(h=>{const d=new Date(h.solar+'T00:00:00');return d>=today;})||HOLIDAYS_2026[HOLIDAYS_2026.length-1];
  },[]);

  const birthdaySolar=useMemo(()=>{
    const m=LUNAR_MONTH_STARTS_2026.find(x=>x.month===lunarMonth);
    if(!m)return null;
    const day=lunarDay||0;
    if(day<1||day>m.days)return null;
    const start=new Date(m.solar+'T00:00:00');
    start.setDate(start.getDate()+(day-1));
    return start.toISOString().slice(0,10);
  },[lunarMonth,lunarDay]);

  const daysUntilNext=diffDays(nextHoliday.solar);

  return(<>
    <Card>
      <div className="text-center py-3">
        <div className="text-sm text-[var(--sub)] font-bold mb-1">다음 음력 명절</div>
        <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{nextHoliday.emoji} {nextHoliday.name}</div>
        <div className="text-[44px] font-extrabold tracking-tight mt-1" style={{color:daysUntilNext>0?'var(--primary-dark)':'#00C271'}}>
          {daysUntilNext>0?`D-${daysUntilNext}`:daysUntilNext===0?'D-Day':`D+${Math.abs(daysUntilNext)}`}
        </div>
        <div className="text-sm text-[var(--sub)] mt-1">{fmtDate(nextHoliday.solar)} (음력 {nextHoliday.lunar})</div>
      </div>
    </Card>

    <Card><SectionTitle num="📅">2026년 주요 음력 날짜</SectionTitle>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">명절</th><th className="text-center py-2 text-xs text-[var(--sub)] font-bold">음력</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">양력</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">D-day</th></tr></thead>
        <tbody>{HOLIDAYS_2026.map(h=>{const dd=diffDays(h.solar);return <tr key={h.name} className="border-b border-[var(--line)]"><td className="py-2.5 font-bold">{h.emoji} {h.name}</td><td className="text-center py-2.5 text-[var(--sub)]">{h.lunar}</td><td className="text-right py-2.5 font-bold">{h.solar.slice(5).replace('-','.')}</td><td className="text-right py-2.5 font-bold" style={{color:dd>0?'var(--primary-dark)':dd===0?'#00C271':'var(--sub)'}}>{dd>0?`D-${dd}`:dd===0?'D-Day':`D+${Math.abs(dd)}`}</td></tr>})}</tbody>
      </table>
    </Card>

    <Card><SectionTitle num="🎂">음력 생일 → 2026년 양력 변환</SectionTitle>
      <p className="text-xs text-[var(--sub)] mb-3">음력 생일의 월/일을 입력하면 2026년 양력 날짜를 알려드려요.</p>
      <div className="flex gap-3 mb-3">
        <div className="flex-1">
          <label className="block text-sm font-bold mb-2">음력 월</label>
          <select value={lunarMonth} onChange={e=>setLunarMonth(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
            {Array.from({length:12},(_,i)=>i+1).map(m=><option key={m} value={m}>{m}월</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold mb-2">음력 일</label>
          <div className="flex items-center gap-2.5"><input type="number" value={lunarDay || ''} onChange={e=>setLunarDay(+e.target.value||0)} min={1} max={30} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">일</span></div>
        </div>
      </div>
      {birthdaySolar&&<div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center">
        <div className="text-xs text-[var(--sub)] font-bold">2026년 양력 날짜</div>
        <div className="text-xl font-extrabold text-[var(--primary-dark)] mt-1">{fmtDate(birthdaySolar)}</div>
        <div className="text-xs text-[var(--sub)] mt-1">음력 {lunarMonth}월 {lunarDay}일</div>
        {diffDays(birthdaySolar)>0&&<div className="text-sm font-bold text-[var(--primary-dark)] mt-2">D-{diffDays(birthdaySolar)}</div>}
      </div>}
      {!birthdaySolar&&lunarDay>0&&<div className="text-center text-sm text-[#E5484D] mt-2">해당 음력 날짜는 2026년에 존재하지 않습니다.</div>}
    </Card>

    <Card><SectionTitle num="📊">2026년 월별 음력 대조표</SectionTitle>
      <p className="text-xs text-[var(--sub)] mb-3">각 음력 월이 시작되는 양력 날짜입니다.</p>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">음력</th><th className="text-center py-2 text-xs text-[var(--sub)] font-bold">양력 시작일</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">일수</th></tr></thead>
        <tbody>{LUNAR_MONTH_STARTS_2026.map(m=><tr key={m.month} className="border-b border-[var(--line)]"><td className="py-2 font-bold">{m.month}월</td><td className="text-center py-2">{fmtDate(m.solar)}</td><td className="text-right py-2 font-bold">{m.days}일</td></tr>)}</tbody>
      </table>
    </Card>

    <ShareButtons title="음력 양력 변환 결과" />

    <Card>
      <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed">올해 설날, 추석 날짜 확인하고 음력 생일도 양력으로 바꿔보세요. 2026년 음력 데이터 기준이에요.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 음력 30일생인데 29일까지만 있는 달이면?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 관례적으로 그 달의 마지막 날인 29일을 생일로 봐요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 다른 연도 변환도 되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 이 페이지는 2026년 전용이에요. 다른 연도는 한국천문연구원 음양력 변환 서비스를 이용해보세요.</div></div>
      </div>
    </Card>
  </>);
}
