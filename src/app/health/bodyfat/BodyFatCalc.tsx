'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParamsWithProfile, setParams } from '@/utils/params';
import ChainBanner from '@/components/ChainBanner';
import JourneyBreadcrumb from '@/components/JourneyBreadcrumb';
import ProfileBanner from '@/components/ProfileBanner';
import SavePrompt from '@/components/SavePrompt';
import NextStepCards from '@/components/NextStepCards';

const MALE_CATS=[{min:2,max:5,label:'필수지방',color:'#3182F6'},{min:6,max:13,label:'운동선수',color:'#00C271'},{min:14,max:17,label:'보통',color:'#22C55E'},{min:18,max:24,label:'평균',color:'#F59E0B'},{min:25,max:Infinity,label:'비만',color:'#E5484D'}];
const FEMALE_CATS=[{min:10,max:13,label:'필수지방',color:'#3182F6'},{min:14,max:20,label:'운동선수',color:'#00C271'},{min:21,max:24,label:'보통',color:'#22C55E'},{min:25,max:31,label:'평균',color:'#F59E0B'},{min:32,max:Infinity,label:'비만',color:'#E5484D'}];

export default function BodyFatCalc(){
  const [gender,setGender]=useState<'male'|'female'>('male');
  const [height,setHeight]=useState(175);
  const [waist,setWaist]=useState(85);
  const [neck,setNeck]=useState(37);
  const [hip,setHip]=useState(95);
  const [weight,setWeight]=useState(75);
  const [result,setResult]=useState<{bf:number;category:string;color:string;leanMass:number;fatMass:number}|null>(null);
  const [autoCalc,setAutoCalc]=useState(false);
  const [profileFilled, setProfileFilled] = useState<string[]>([]);

  /* URL 쿼리스트링(외부 시스템)에서 초기값을 복원하는 구간.
     브라우저 전용 값이라 렌더 중에는 읽을 수 없고(정적 프리렌더와 hydration 불일치),
     effect 안에서 state를 채우는 방법뿐이라 아래 두 effect에 한해 규칙을 해제한다. */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(()=>{
    const { params: p, profileKeys }=getParamsWithProfile();
    if(!Object.keys(p).length)return;
    if(p.gender)setGender(p.gender as 'male'|'female');
    if(p.height)setHeight(+p.height);
    if(p.waist)setWaist(+p.waist);
    if(p.neck)setNeck(+p.neck);
    if(p.hip)setHip(+p.hip);
    if(p.weight)setWeight(+p.weight);
    setProfileFilled(profileKeys.filter(k => ['height','weight'].includes(k)));
    setAutoCalc(true);
  },[]);

  useEffect(()=>{
    if(autoCalc){calc();setAutoCalc(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[autoCalc]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function calc() {
    const h=height||0,w=waist||0,n=neck||0,hp=hip||0,wt=weight||0;
    if(h<=0||w<=0||n<=0||wt<=0)return;
    if(w-n<=0)return;
    let bf:number;
    if(gender==='male'){
      bf=495/(1.0324-0.19077*Math.log10(w-n)+0.15456*Math.log10(h))-450;
    }else{
      if(w+hp-n<=0)return;
      bf=495/(1.29579-0.35004*Math.log10(w+hp-n)+0.22100*Math.log10(h))-450;
    }
    bf=Math.max(0,bf);
    const cats=gender==='male'?MALE_CATS:FEMALE_CATS;
    const cat=cats.find(c=>bf>=c.min&&bf<=c.max)||cats[cats.length-1];
    const fatMass=Math.round(wt*bf/100*10)/10;
    const leanMass=Math.round((wt-fatMass)*10)/10;
    setResult({bf:Math.round(bf*10)/10,category:cat.label,color:cat.color,leanMass,fatMass});
    setParams({gender,height,waist,neck,hip,weight}, { primaryOutput: `${Math.round(bf*10)/10}%` });
    scrollToResult();
  }

  return(<>
    <ChainBanner />
    <JourneyBreadcrumb currentHref="/health/bodyfat" />
    <ProfileBanner filledKeys={profileFilled} />
    <Card><SectionTitle num="1">신체 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">성별</label>
        <div className="flex gap-2">
          {(['male','female'] as const).map(g=><button key={g} onClick={()=>setGender(g)} className={`flex-1 py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${gender===g?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{g==='male'?'남성':'여성'}</button>)}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">키 <span className="text-xs text-[var(--sub)] font-medium ml-1">{height}cm</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={height || ''} onChange={e=>setHeight(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">cm</span></div>
        <input type="range" min={140} max={200} value={height} onChange={e=>setHeight(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">체중 <span className="text-xs text-[var(--sub)] font-medium ml-1">{weight}kg</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={weight || ''} onChange={e=>setWeight(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">kg</span></div>
        <input type="range" min={30} max={150} value={weight} onChange={e=>setWeight(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">허리둘레 (배꼽 높이) <span className="text-xs text-[var(--sub)] font-medium ml-1">{waist}cm</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={waist || ''} onChange={e=>setWaist(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">cm</span></div>
        <input type="range" min={50} max={150} value={waist} onChange={e=>setWaist(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">목둘레 <span className="text-xs text-[var(--sub)] font-medium ml-1">{neck}cm</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={neck || ''} onChange={e=>setNeck(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">cm</span></div>
        <input type="range" min={25} max={55} value={neck} onChange={e=>setNeck(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      {gender==='female'&&<div className="mb-0">
        <label className="block text-sm font-bold mb-2">엉덩이둘레 <span className="text-xs text-[var(--sub)] font-medium ml-1">{hip}cm</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={hip || ''} onChange={e=>setHip(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">cm</span></div>
        <input type="range" min={60} max={150} value={hip} onChange={e=>setHip(+e.target.value)} className="w-full mt-3.5"/>
      </div>}
    </Card>
    {result&&<div id="calc-result">
      <div className="text-lg font-extrabold mt-4 mb-3 px-1">체지방률 결과</div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <div className="text-center py-2">
          <div className="text-[44px] font-extrabold tracking-tight" style={{color:result.color}}>{result.bf}%</div>
          <div className="text-base font-extrabold mt-1" style={{color:result.color}}>{result.category}</div>
        </div>
        <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">체지방량</span><span className="font-bold">{result.fatMass}kg</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">제지방량 (근육+뼈 등)</span><span className="font-bold">{result.leanMass}kg</span></div>
        </div>
      </div>
    </div>}
    {result && <NextStepCards from="/health/bodyfat" outputs={{ height, weight }} />}
    <SavePrompt />
    {result && <ShareButtons title="체지방률 결과" />}
    {!result&&<Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 체지방률을 계산해 드려요.</Card>}
    <Card>
      <div className="text-[13px] font-extrabold mb-2">📊 체지방률 분류 ({gender==='male'?'남성':'여성'} 기준)</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">분류</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">체지방률</th></tr></thead>
        <tbody>{(gender==='male'?MALE_CATS:FEMALE_CATS).map(c=><tr key={c.label} className="border-b border-[var(--line)]"><td className="py-2 font-bold" style={{color:c.color}}>{c.label}</td><td className="text-right py-2 font-bold">{c.max===Infinity?`${c.min}% 이상`:`${c.min}~${c.max}%`}</td></tr>)}</tbody>
      </table>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-2">이 계산기는요</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed">BMI보다 체지방률이 더 정확해요. 허리랑 목 둘레만 재면 됩니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 허리둘레는 어디서 재야 하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 배꼽 높이에서 줄자를 수평으로 돌려서 재세요. 숨을 편하게 내쉰 상태에서 측정하면 돼요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 체지방률은 얼마나 빨리 줄일 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 건강하게 줄이려면 주당 0.5~1% 정도가 적당해요. 급하게 빼면 요요가 오거든요.</div></div>
      </div>
    </Card>

    <CtaButton label="체지방률 계산하기" onClick={calc}/>
  </>);
}
