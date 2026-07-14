'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';

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

  useEffect(()=>{
    const p=getParams();
    if(!Object.keys(p).length)return;
    if(p.gender)setGender(p.gender as 'male'|'female');
    if(p.height)setHeight(+p.height);
    if(p.waist)setWaist(+p.waist);
    if(p.neck)setNeck(+p.neck);
    if(p.hip)setHip(+p.hip);
    if(p.weight)setWeight(+p.weight);
    setAutoCalc(true);
  },[]);

  useEffect(()=>{
    if(autoCalc){calc();setAutoCalc(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[autoCalc]);

  const calc=()=>{
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
    setParams({gender,height,waist,neck,hip,weight});
    scrollToResult();
  };

  return(<>
    <Card><SectionTitle num="1">신체 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">성별</label>
        <div className="flex gap-2">
          {(['male','female'] as const).map(g=><button key={g} onClick={()=>setGender(g)} className={`flex-1 py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${gender===g?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{g==='male'?'남성':'여성'}</button>)}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">키 <span className="text-xs text-[var(--sub)] font-medium ml-1">{height}cm</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={height} onChange={e=>setHeight(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">cm</span></div>
        <input type="range" min={140} max={200} value={height} onChange={e=>setHeight(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">체중 <span className="text-xs text-[var(--sub)] font-medium ml-1">{weight}kg</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={weight} onChange={e=>setWeight(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">kg</span></div>
        <input type="range" min={30} max={150} value={weight} onChange={e=>setWeight(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">허리둘레 (배꼽 높이) <span className="text-xs text-[var(--sub)] font-medium ml-1">{waist}cm</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={waist} onChange={e=>setWaist(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">cm</span></div>
        <input type="range" min={50} max={150} value={waist} onChange={e=>setWaist(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">목둘레 <span className="text-xs text-[var(--sub)] font-medium ml-1">{neck}cm</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={neck} onChange={e=>setNeck(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">cm</span></div>
        <input type="range" min={25} max={55} value={neck} onChange={e=>setNeck(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      {gender==='female'&&<div className="mb-0">
        <label className="block text-sm font-bold mb-2">엉덩이둘레 <span className="text-xs text-[var(--sub)] font-medium ml-1">{hip}cm</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={hip} onChange={e=>setHip(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">cm</span></div>
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
      <h2 className="text-base font-extrabold mb-3">📖 체지방률 측정 방법 비교</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">체지방률을 측정하는 방법은 여러 가지가 있습니다. 인바디(BIA, 생체전기저항법)는 가장 접근성이 좋은 방법으로, 체성분 분석기에 올라서면 미세 전류를 통해 체지방률을 추정합니다. 정확도는 3~5% 오차가 있을 수 있으며, 수분 섭취량에 따라 결과가 달라질 수 있습니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">캘리퍼(피부주름두께) 측정법은 집게 형태의 도구로 피하지방 두께를 측정하는 방법입니다. 숙련된 측정자가 사용하면 비교적 정확하지만, 측정 부위와 기술에 따라 오차가 발생합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">미 해군(US Navy) 공식은 줄자만 있으면 쉽게 측정할 수 있는 방법입니다. 허리둘레, 목둘레, 키(여성은 엉덩이둘레 추가)를 이용해 체지방률을 추정합니다. 인바디와 비슷한 정확도를 보이며, 장비 없이 집에서 간편하게 측정할 수 있다는 장점이 있습니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">BMI는 체중과 키만으로 비만도를 판정하므로, 근육량이 많은 사람은 BMI가 높아도 실제 체지방률은 낮을 수 있습니다. 체지방률은 BMI보다 실질적인 건강 상태를 더 정확하게 반영합니다.</p>
      <h3 className="text-sm font-extrabold mt-4 mb-2">체지방 줄이는 방법</h3>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">체지방을 효과적으로 줄이려면 유산소 운동과 근력 운동을 병행하는 것이 가장 좋습니다. 유산소 운동(달리기, 수영, 자전거)은 직접적으로 지방을 태우고, 근력 운동은 근육량을 늘려 기초대사량을 높여줍니다. 식단에서는 가공식품과 당분을 줄이고, 단백질 섭취를 늘리며, 전체 칼로리를 TDEE 대비 300~500kcal 정도 줄이는 것이 건강한 감량 속도입니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">충분한 수면(7~8시간)과 스트레스 관리도 체지방 감량에 중요합니다. 수면 부족과 만성 스트레스는 코르티솔 분비를 증가시켜 복부 지방 축적을 촉진합니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 체지방률과 BMI 중 어떤 것이 더 정확한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 체지방률이 실제 비만도를 더 정확하게 반영합니다. BMI는 근육량과 체지방을 구분하지 못하므로, 근육이 많은 사람은 BMI가 높아도 건강할 수 있습니다. 반면 마른 비만(BMI 정상이지만 체지방률이 높은 경우)은 BMI로는 발견하기 어렵습니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 허리둘레는 어디서 재야 하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 배꼽 높이에서 줄자를 수평으로 돌려 측정합니다. 숨을 편하게 내쉰 상태에서, 줄자가 피부에 살짝 닿을 정도로 감아주세요. 너무 조이거나 느슨하지 않게 측정하는 것이 중요합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 체지방률을 얼마나 빨리 줄일 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 건강하게 체지방을 줄이는 속도는 주당 0.5~1% 정도입니다. 급격한 감량은 근손실과 요요현상을 유발하므로, 3~6개월에 걸쳐 꾸준히 관리하는 것이 효과적입니다.</div></div>
      </div>
    </Card>

    <CtaButton label="체지방률 계산하기" onClick={calc}/>
  </>);
}
