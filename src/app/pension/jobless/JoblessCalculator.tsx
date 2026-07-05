'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';

const JB_RATE=0.60, JB_UPPER=68100, JB_LOWER=66048, JB_WAIT=7;
function joblessDays(years:number, age:number){
  const old=age>=50;
  if(years<1)return 120; if(years<3)return old?180:150;
  if(years<5)return old?210:180; if(years<10)return old?240:210;
  return old?270:240;
}

export default function JoblessCalculator(){
  const [age,setAge]=useState(35);
  const [wage,setWage]=useState(300);
  const [years,setYears]=useState(2);
  const [result,setResult]=useState<{daily:number;days:number;total:number;dailyAvg:number;cap:string}|null>(null);

  const calc=()=>{
    const wageM=wage*10000, dailyAvg=wageM/30.4, raw=dailyAvg*JB_RATE;
    const daily=Math.round(Math.min(Math.max(raw,JB_LOWER),JB_UPPER));
    const days=joblessDays(years,age), total=daily*days;
    const cap=raw>JB_UPPER?'상한 적용':raw<JB_LOWER?'하한 적용':'';
    setResult({daily,days,total,dailyAvg,cap});
  };

  return (<>
    <Card>
      <SectionTitle num="1">퇴사·고용보험 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">퇴사 당시 나이 <span className="text-xs text-[var(--sub)] font-medium ml-1">만 나이</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={age} min={15} max={64} onChange={e=>setAge(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/>
          <span className="text-sm font-bold text-[var(--sub)]">세</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">퇴사 전 월 평균임금 <span className="text-xs text-[var(--sub)] font-medium ml-1">{wage.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={wage} min={0} onChange={e=>setWage(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/>
          <span className="text-sm font-bold text-[var(--sub)]">만원/월</span>
        </div>
        <input type="range" min={0} max={1000} step={10} value={wage} onChange={e=>setWage(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">고용보험 가입기간</label>
        <select value={years} onChange={e=>setYears(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
          <option value={0.5}>1년 미만</option>
          <option value={2}>1년 이상 ~ 3년 미만</option>
          <option value={4}>3년 이상 ~ 5년 미만</option>
          <option value={7}>5년 이상 ~ 10년 미만</option>
          <option value={12}>10년 이상</option>
        </select>
        <div className="text-xs text-[var(--sub)] mt-2">피보험 단위기간 180일 이상이어야 수급 자격</div>
      </div>
    </Card>

    {result && (
      <div>
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">예상 구직급여</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">
            {age>=50?'50세 이상':'50세 미만'} · 가입 {years<1?'1년 미만':years+'년'}
          </span>
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">예상 총 수령액</div>
            <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.total)}</div>
            <div className="text-sm text-[var(--sub)]">1일 {won(result.daily)} × {result.days}일 (약 {(result.days/30).toFixed(1)}개월)</div>
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">1일 구직급여 {result.cap&&<span className="text-xs font-extrabold text-[var(--violet)] ml-1">{result.cap}</span>}</span><span className="font-bold">{won(result.daily)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">소정급여일수</span><span className="font-bold">{result.days}일</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">평균임금(추정 일액)</span><span className="font-bold">{won(result.dailyAvg)}/일</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">대기기간</span><span className="font-bold">{JB_WAIT}일(미지급)</span></div>
          </div>
          <div className="mt-3.5 bg-[var(--primary-weak)] rounded-xl p-3.5">
            <div className="text-xs font-bold text-[var(--primary-dark)]">월 환산 시</div>
            <div className="text-[22px] font-extrabold text-[var(--primary-dark)]">약 {won(result.daily*30)}/월</div>
          </div>
        </div>
      </div>
    )}

    {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 예상 구직급여를 계산해 드려요.</Card>}

    <Card>
      <div className="text-[13px] font-extrabold mb-2">📋 소정급여일수 (고용보험법)</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">가입기간</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">50세 미만</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">50세↑</th></tr></thead>
        <tbody>
          {[{y:'1년 미만',a:120,b:120},{y:'1~3년',a:150,b:180},{y:'3~5년',a:180,b:210},{y:'5~10년',a:210,b:240},{y:'10년+',a:240,b:270}].map(r=>(
            <tr key={r.y} className="border-b border-[var(--line)]"><td className="py-2 font-bold">{r.y}</td><td className="text-right py-2 font-bold">{r.a}일</td><td className="text-right py-2 font-bold">{r.b}일</td></tr>
          ))}
        </tbody>
      </table>
      <div className="text-[11px] text-[var(--sub)] mt-2">2026년 기준 · 상한 68,100원 · 하한 66,048원</div>
    </Card>

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <b className="text-[#6B7684]">계산 가정</b><br/>· 구직급여 1일액 = 평균임금 × 60%, 상한·하한 클램프<br/>· 7일 대기기간 후 지급
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">참고용 추정 도구입니다. 정확한 내용은 고용24(work24.go.kr)에서 확인하세요.</div>
    </footer>

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 실업급여(구직급여)란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">실업급여는 고용보험에 가입한 근로자가 비자발적으로 실직했을 때 재취업 활동 기간 동안 지급되는 급여입니다. 정식 명칭은 &apos;구직급여&apos;이며, 퇴직 전 평균임금의 60%를 기준으로 산정됩니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">2026년 기준 1일 상한액은 68,100원, 하한액은 66,048원입니다. 대부분의 근로자는 하한액 또는 상한액이 적용되어 실제 수급액은 월 약 198만~204만원 수준입니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 자발적 퇴사도 실업급여를 받을 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 원칙적으로 자발적 퇴사는 수급 대상이 아닙니다. 다만 임금체불, 직장 내 괴롭힘, 통근 곤란 등 정당한 사유가 인정되면 수급 가능합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 실업급여는 얼마나 오래 받을 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 고용보험 가입기간과 나이에 따라 120일~270일(약 4~9개월)간 지급됩니다. 50세 이상이거나 장애인은 지급일수가 더 깁니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 실업급여 신청은 어디서 하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 고용24(work24.go.kr)에서 온라인으로 신청하거나, 가까운 고용센터를 방문하여 신청할 수 있습니다.</div></div>
      </div>
    </Card>

    <CtaButton label="구직급여 계산하기" onClick={calc}/>
  </>);
}
