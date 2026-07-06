'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';

export default function BmrCalculator(){
  const [gender,setGender]=useState<'male'|'female'>('male');
  const [age,setAge]=useState(30);
  const [height,setHeight]=useState(170);
  const [weight,setWeight]=useState(70);
  const [activity,setActivity]=useState(1.55);
  const [result,setResult]=useState<{bmr:number;tdee:number;diet:number}|null>(null);
  const [autoCalc,setAutoCalc]=useState(false);

  useEffect(()=>{
    const p=getParams();
    if(!Object.keys(p).length)return;
    if(p.gender)setGender(p.gender as 'male'|'female');
    if(p.age)setAge(+p.age);
    if(p.height)setHeight(+p.height);
    if(p.weight)setWeight(+p.weight);
    if(p.activity)setActivity(+p.activity);
    setAutoCalc(true);
  },[]);

  useEffect(()=>{
    if(autoCalc){calc();setAutoCalc(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[autoCalc]);

  const calc=()=>{
    const bmr=gender==='male'?10*weight+6.25*height-5*age+5:10*weight+6.25*height-5*age-161;
    const tdee=bmr*activity;
    setResult({bmr:Math.round(bmr),tdee:Math.round(tdee),diet:Math.round(tdee-500)});
    setParams({gender,age,height,weight,activity});
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
        <label className="block text-sm font-bold mb-2">나이</label>
        <div className="flex items-center gap-2.5"><input type="number" value={age} onChange={e=>setAge(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">세</span></div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">키</label>
        <div className="flex items-center gap-2.5"><input type="number" value={height} onChange={e=>setHeight(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">cm</span></div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">체중</label>
        <div className="flex items-center gap-2.5"><input type="number" value={weight} onChange={e=>setWeight(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">kg</span></div>
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">활동량</label>
        <select value={activity} onChange={e=>setActivity(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
          <option value={1.2}>거의 없음 (좌식)</option><option value={1.375}>가벼운 운동 (주 1~3회)</option><option value={1.55}>보통 운동 (주 3~5회)</option><option value={1.725}>활발한 운동 (주 6~7회)</option><option value={1.9}>매우 활발 (운동선수급)</option>
        </select>
      </div>
    </Card>
    {result&&<div id="calc-result">
      <div className="text-lg font-extrabold mt-4 mb-3 px-1">칼로리 결과</div>
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">기초대사량</div><div className="text-xl font-extrabold text-[var(--primary-dark)] mt-1">{result.bmr}</div><div className="text-[10px] text-[var(--sub)]">kcal</div></div>
        <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">일일 권장</div><div className="text-xl font-extrabold text-[var(--green)] mt-1">{result.tdee}</div><div className="text-[10px] text-[var(--sub)]">kcal</div></div>
        <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">다이어트</div><div className="text-xl font-extrabold text-[#E5484D] mt-1">{result.diet}</div><div className="text-[10px] text-[var(--sub)]">kcal (-500)</div></div>
      </div>
    </div>}
    {result && <ShareButtons title="칼로리 결과" />}
    {!result&&<Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 칼로리를 계산해 드려요.</Card>}
    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">Mifflin-St Jeor 공식 기준 추정치입니다.</div>
    </footer>
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 기초대사량(BMR)이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">기초대사량(BMR, Basal Metabolic Rate)은 생명을 유지하기 위해 최소한으로 필요한 에너지량을 말합니다. 심장 박동, 호흡, 체온 유지, 세포 활동 등 아무런 활동을 하지 않고 가만히 있어도 소모되는 칼로리입니다. 전체 에너지 소비의 약 60~75%를 차지하며, 성별·나이·키·체중에 따라 달라집니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">이 계산기는 정확도가 높은 Mifflin-St Jeor 공식을 사용합니다. 남성은 (10 x 체중kg) + (6.25 x 키cm) - (5 x 나이) + 5, 여성은 같은 공식에서 +5 대신 -161을 적용합니다. 기초대사량에 활동계수를 곱하면 하루 총 에너지 소비량(TDEE)을 구할 수 있습니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 기초대사량을 높이려면 어떻게 해야 하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 근육량을 늘리는 것이 가장 효과적입니다. 근육은 지방보다 약 3배 많은 에너지를 소비하므로, 웨이트 트레이닝 등 근력 운동을 꾸준히 하면 기초대사량이 증가합니다. 충분한 단백질 섭취와 규칙적인 식사, 충분한 수면도 중요합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. TDEE란 무엇인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. TDEE(Total Daily Energy Expenditure)는 하루 총 에너지 소비량으로, 기초대사량에 신체 활동량을 반영한 값입니다. 활동 수준에 따라 기초대사량의 1.2배(좌식)~1.9배(매우 활발)까지 차이가 납니다. 체중 유지를 위해서는 TDEE만큼 섭취해야 합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 다이어트 시 얼마나 줄여야 하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 건강한 감량을 위해서는 TDEE에서 하루 300~500kcal 정도 적게 섭취하는 것이 권장됩니다. 이 경우 주당 약 0.3~0.5kg 감량이 가능합니다. 기초대사량 이하로 섭취하면 근손실과 요요현상이 올 수 있으므로, BMR 이상은 반드시 섭취하세요.</div></div>
      </div>
    </Card>

    <CtaButton label="칼로리 계산하기" onClick={calc}/>
  </>);
}
