'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;
export default function DutchCalc(){
  const [total,setTotal]=useState(150000);const [people,setPeople]=useState(4);
  const [tipTotal,setTipTotal]=useState(100000);const [tipRate,setTipRate]=useState(10);
  return(<>
    <Card><SectionTitle num="🍽️">N분의1 더치페이</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">총 금액</label><div className="flex items-center gap-2.5"><input type="number" value={total} onChange={e=>setTotal(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">원</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">인원 수 <span className="text-xs text-[var(--sub)] font-medium ml-1">{people}명</span></label><input type="range" min={2} max={20} value={people} onChange={e=>setPeople(+e.target.value)} className="w-full"/></div>
      <R v={`${people>0?Math.ceil(total/people).toLocaleString():0}원`} l={`1인당 (${people}명)`}/>
    </Card>
    <Card><SectionTitle num="💸">팁 계산기</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">결제 금액</label><div className="flex items-center gap-2.5"><input type="number" value={tipTotal} onChange={e=>setTipTotal(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">원</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">팁 비율</label><div className="flex gap-2">{[5,10,15,20].map(r=><button key={r} onClick={()=>setTipRate(r)} className={`flex-1 py-2.5 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer ${tipRate===r?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{r}%</button>)}</div></div>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <R v={`${Math.round(tipTotal*tipRate/100).toLocaleString()}원`} l={`팁 (${tipRate}%)`}/>
        <R v={`${Math.round(tipTotal*(1+tipRate/100)).toLocaleString()}원`} l="총 결제액"/>
      </div>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 더치페이·팁 계산이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">더치페이(Dutch Pay)는 식사나 모임 비용을 참석자가 균등하게 나누어 내는 방식입니다. 1인당 금액 = 총 금액 ÷ 인원 수로 간단히 계산합니다. 나누어떨어지지 않으면 올림 처리하여 한 사람이 약간 더 내는 것이 일반적입니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">팁 계산기는 해외 여행이나 호텔 등에서 팁을 포함한 결제 금액을 미리 계산할 때 유용합니다. 미국은 15~20%, 유럽은 5~10% 정도가 일반적인 팁 비율입니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 나누어떨어지지 않으면 어떻게 하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 계산기에서는 올림 처리하여 1인당 금액을 보여줍니다. 실제로는 한 명이 약간 더 내거나, 소수점 이하를 무시하는 방식으로 정리합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 해외에서 팁은 꼭 줘야 하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 나라마다 다릅니다. 미국·캐나다는 팁이 관행(15~20%)이고, 일본·한국은 팁 문화가 없습니다. 유럽은 서비스에 만족하면 5~10% 정도를 남기는 것이 일반적입니다.</div></div>
      </div>
    </Card>
  </>);
}
