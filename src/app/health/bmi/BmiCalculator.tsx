'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';

const CATEGORIES=[{max:18.5,label:'저체중',color:'#3182F6'},{max:23,label:'정상',color:'#00C271'},{max:25,label:'과체중',color:'#F59E0B'},{max:30,label:'비만 1단계',color:'#E5484D'},{max:35,label:'비만 2단계',color:'#E5484D'},{max:Infinity,label:'고도비만',color:'#C62828'}];

export default function BmiCalculator(){
  const [height,setHeight]=useState(170);
  const [weight,setWeight]=useState(70);
  const [result,setResult]=useState<{bmi:number;category:string;color:string;normalRange:[number,number];standard:number}|null>(null);

  const calc=()=>{
    const h=height/100,bmi=weight/(h*h);
    const cat=CATEGORIES.find(c=>bmi<c.max)||CATEGORIES[CATEGORIES.length-1];
    const normalRange:[number,number]=[Math.round(18.5*h*h*10)/10,Math.round(22.9*h*h*10)/10];
    const standard=Math.round((height-100)*0.9*10)/10;
    setResult({bmi,category:cat.label,color:cat.color,normalRange,standard});
  };

  return(<>
    <Card><SectionTitle num="1">신체 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">키 <span className="text-xs text-[var(--sub)] font-medium ml-1">{height}cm</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={height} onChange={e=>setHeight(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">cm</span></div>
        <input type="range" min={130} max={210} value={height} onChange={e=>setHeight(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">체중 <span className="text-xs text-[var(--sub)] font-medium ml-1">{weight}kg</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={weight} onChange={e=>setWeight(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">kg</span></div>
        <input type="range" min={30} max={150} value={weight} onChange={e=>setWeight(+e.target.value)} className="w-full mt-3.5"/>
      </div>
    </Card>
    {result&&<div>
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
    {!result&&<Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 BMI를 계산해 드려요.</Card>}
    <Card>
      <div className="text-[13px] font-extrabold mb-2">📊 BMI 분류 (WHO 아시아태평양)</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">분류</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">BMI</th></tr></thead>
        <tbody>{CATEGORIES.map(c=><tr key={c.label} className="border-b border-[var(--line)]"><td className="py-2 font-bold" style={{color:c.color}}>{c.label}</td><td className="text-right py-2 font-bold">{c.max===Infinity?'35 이상':c.max===18.5?'18.5 미만':`${c.max===23?'18.5':c.max===25?'23':c.max===30?'25':'30'}~${c.max}`}</td></tr>)}</tbody>
      </table>
    </Card>
    <CtaButton label="BMI 계산하기" onClick={calc}/>
  </>);
}
