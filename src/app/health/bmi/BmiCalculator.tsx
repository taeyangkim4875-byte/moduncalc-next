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
import ModeToggle from '@/components/ModeToggle';
import TrustBadge from '@/components/TrustBadge';
import EmbedCode from '@/components/EmbedCode';

const CATEGORIES=[{max:18.5,label:'저체중',color:'#3182F6'},{max:23,label:'정상',color:'#00C271'},{max:25,label:'과체중',color:'#F59E0B'},{max:30,label:'비만 1단계',color:'#E5484D'},{max:35,label:'비만 2단계',color:'#E5484D'},{max:Infinity,label:'고도비만',color:'#C62828'}];

export default function BmiCalculator(){
  const [height,setHeight]=useState(170);
  const [weight,setWeight]=useState(70);
  const [result,setResult]=useState<{bmi:number;category:string;color:string;normalRange:[number,number];standard:number}|null>(null);
  const [autoCalc,setAutoCalc]=useState(false);
  const [profileFilled, setProfileFilled] = useState<string[]>([]);

  /* URL 쿼리스트링(외부 시스템)에서 초기값을 복원하는 구간.
     브라우저 전용 값이라 렌더 중에는 읽을 수 없고(정적 프리렌더와 hydration 불일치),
     effect 안에서 state를 채우는 방법뿐이라 아래 두 effect에 한해 규칙을 해제한다. */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(()=>{
    const { params: p, profileKeys } = getParamsWithProfile();
    if(!Object.keys(p).length)return;
    if(p.height)setHeight(+p.height);
    if(p.weight)setWeight(+p.weight);
    setProfileFilled(profileKeys.filter(k => ['height', 'weight'].includes(k)));
    setAutoCalc(true);
  },[]);

  useEffect(()=>{
    if(autoCalc){calc();setAutoCalc(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[autoCalc]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function calc() {
    if(height<=0||weight<=0)return;
    const h=height/100,bmi=weight/(h*h);
    const cat=CATEGORIES.find(c=>bmi<c.max)||CATEGORIES[CATEGORIES.length-1];
    const normalRange:[number,number]=[Math.round(18.5*h*h*10)/10,Math.round(22.9*h*h*10)/10];
    const standard=Math.round((height-100)*0.9*10)/10;
    setResult({bmi,category:cat.label,color:cat.color,normalRange,standard});
    setParams({height,weight}, { primaryOutput: `BMI ${bmi.toFixed(1)}` });
    scrollToResult();
  }

  return(<>
    <ChainBanner />
    <JourneyBreadcrumb currentHref="/health/bmi" />
    <ProfileBanner filledKeys={profileFilled} />
    <ModeToggle forwardHref="/health/bmi" reverseHref="/health/bmi/reverse" mode="forward" forwardLabel="체중 → BMI" reverseLabel="목표 BMI → 체중" />
    <TrustBadge />
    <Card><SectionTitle num="1">신체 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">키 <span className="text-xs text-[var(--sub)] font-medium ml-1">{height}cm</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={height || ''} onChange={e=>setHeight(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">cm</span></div>
        <input type="range" min={130} max={210} value={height} onChange={e=>setHeight(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">체중 <span className="text-xs text-[var(--sub)] font-medium ml-1">{weight}kg</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={weight || ''} onChange={e=>setWeight(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">kg</span></div>
        <input type="range" min={30} max={150} value={weight} onChange={e=>setWeight(+e.target.value)} className="w-full mt-3.5"/>
      </div>
    </Card>
    {result&&<div id="calc-result">
      <div className="text-lg font-extrabold mt-4 mb-3 px-1">BMI 결과</div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <div className="text-center py-2">
          <div className="text-[44px] font-extrabold tracking-tight" style={{color:result.color}}>{result.bmi.toFixed(1)}</div>
          <div className="text-base font-extrabold mt-1" style={{color:result.color}}>{result.category}</div>
        </div>
        <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">정상 체중 범위</span><span className="font-bold">{result.normalRange[0]}~{result.normalRange[1]}kg</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">표준 체중</span><span className="font-bold">{result.standard}kg</span></div>
        </div>
      </div>
    </div>}
    {result && <NextStepCards from="/health/bmi" outputs={{ height, weight }} />}
    <SavePrompt />
    {result && <ShareButtons title="BMI 결과" />}
    <EmbedCode href="/health/bmi" />
    {!result&&<Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 BMI를 계산해 드려요.</Card>}
    <Card>
      <div className="text-[13px] font-extrabold mb-2">📊 BMI 분류 (WHO 아시아태평양)</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">분류</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">BMI</th></tr></thead>
        <tbody>{CATEGORIES.map(c=><tr key={c.label} className="border-b border-[var(--line)]"><td className="py-2 font-bold" style={{color:c.color}}>{c.label}</td><td className="text-right py-2 font-bold">{c.max===Infinity?'35 이상':c.max===18.5?'18.5 미만':`${c.max===23?'18.5':c.max===25?'23':c.max===30?'25':'30'}~${c.max}`}</td></tr>)}</tbody>
      </table>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">BMI, 참고는 하되 맹신은 금물</h2>
      <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2.5">
        <p>건강검진 받으면 BMI가 나오는데, 그게 뭔지 정확히 아는 사람이 별로 없더라고요. 간단해요. 체중(kg)을 키(m)의 제곱으로 나눈 거예요.</p>
        <p>한국 기준으로는 23 넘으면 과체중, 25 넘으면 비만이에요. 서양 기준(25부터 과체중)이랑 다르니까, 인터넷에서 본 기준이랑 헷갈리지 마세요.</p>
        <p>근데 솔직히 BMI만으로 건강을 판단하긴 어려워요. 헬스 다니는 분들은 근육 때문에 BMI가 높게 나오는데 비만은 아니잖아요. 정확하게 알려면 인바디 같은 체성분 분석을 받아보는 게 좋습니다.</p>
      </div>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">많이 물어보시는 것</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">정상 BMI가 어디부터 어디까지예요?</div><div className="text-sm text-[#4E5968] leading-relaxed">한국(WHO 아시아태평양) 기준 18.5~22.9가 정상이에요. 서양 기준은 24.9까지 정상인데, 우리는 기준이 더 엄격하거든요. 검진 결과지에 과체중이라고 나와도 서양 기준으로는 정상인 경우도 있어요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">과체중이면 어떻게 해야 하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">급하게 빼려고 하지 마세요. 주당 0.5~1kg씩 천천히 줄이는 게 요요도 안 오고 건강에도 좋아요. 식단 조절이 70%, 운동이 30%라는 말이 있는데 실제로 그렇더라고요.</div></div>
      </div>
    </Card>

    <CtaButton label="BMI 계산하기" onClick={calc}/>
  </>);
}
