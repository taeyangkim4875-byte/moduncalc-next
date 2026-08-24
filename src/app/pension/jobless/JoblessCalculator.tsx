'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';
import ChainBanner from '@/components/ChainBanner';
import JourneyBreadcrumb from '@/components/JourneyBreadcrumb';
import NextStepCards from '@/components/NextStepCards';

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
  const [autoCalc,setAutoCalc]=useState(false);

  /* URL 쿼리스트링(외부 시스템)에서 초기값을 복원하는 구간.
     브라우저 전용 값이라 렌더 중에는 읽을 수 없고(정적 프리렌더와 hydration 불일치),
     effect 안에서 state를 채우는 방법뿐이라 아래 두 effect에 한해 규칙을 해제한다. */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(()=>{
    const p=getParams();
    if(!Object.keys(p).length)return;
    if(p.age)setAge(+p.age);
    if(p.wage)setWage(+p.wage);
    if(p.years)setYears(+p.years);
    setAutoCalc(true);
  },[]);

  useEffect(()=>{
    if(autoCalc){calc();setAutoCalc(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[autoCalc]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function calc() {
    const wageM=wage*10000, dailyAvg=wageM/30.4, raw=dailyAvg*JB_RATE;
    const daily=Math.round(Math.min(Math.max(raw,JB_LOWER),JB_UPPER));
    const days=joblessDays(years,age), total=daily*days;
    const cap=raw>JB_UPPER?'상한 적용':raw<JB_LOWER?'하한 적용':'';
    setResult({daily,days,total,dailyAvg,cap});
    setParams({age,wage,years});
    scrollToResult();
  }

  return (<>
    <ChainBanner />
    <JourneyBreadcrumb currentHref="/pension/jobless" />
    <Card>
      <SectionTitle num="1">퇴사·고용보험 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">퇴사 당시 나이 <span className="text-xs text-[var(--sub)] font-medium ml-1">만 나이</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={age || ''} min={15} max={64} onChange={e=>setAge(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/>
          <span className="text-sm font-bold text-[var(--sub)]">세</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">퇴사 전 월 평균임금 <span className="text-xs text-[var(--sub)] font-medium ml-1">{wage.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={wage || ''} min={0} onChange={e=>setWage(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/>
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
      <div id="calc-result">
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
    {result && <NextStepCards from="/pension/jobless" outputs={{ wage, age }} />}
    {result && <ShareButtons title="실업급여 계산 결과" />}

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
      <h2 className="text-base font-extrabold mb-3">실업급여, 생각보다 계산이 복잡해요</h2>
      <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2.5">
        <p>퇴사하면 제일 먼저 드는 생각이 &apos;실업급여 얼마 받지?&apos;예요. 의외로 계산이 복잡해서 만들었습니다.</p>
        <p>기본 구조는 퇴직 전 평균임금의 60%를 받는 건데, 상한(68,100원/일)이랑 하한(66,048원/일)이 있어요. 솔직히 대부분의 직장인은 상한이든 하한이든 걸리기 때문에, 실제 수령액은 월 198만~204만원 사이예요.</p>
        <p>나이랑 고용보험 가입기간에 따라 받는 기간이 달라지는데, 최소 120일에서 최대 270일까지예요. 위에서 본인 조건 넣어보면 바로 나옵니다.</p>
      </div>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">많이 물어보시는 것들</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">자발적 퇴사인데 실업급여 받을 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">원칙적으로는 안 돼요. 근데 임금체불, 직장 내 괴롭힘, 통근 2시간 이상 같은 정당한 사유가 있으면 받을 수 있어요. 본인이 해당되는지 애매하면 고용센터에 먼저 상담해보세요. 의외로 되는 경우가 있거든요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">실업급여 얼마나 오래 받을 수 있어요?</div><div className="text-sm text-[#4E5968] leading-relaxed">가입기간이랑 나이에 따라 120일~270일(약 4~9개월)이에요. 50세 이상이면 같은 가입기간이라도 30일씩 더 받아요. 위에 표 있으니까 확인해보세요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">신청은 어디서 해요?</div><div className="text-sm text-[#4E5968] leading-relaxed">고용24(work24.go.kr)에서 온라인으로 하거나, 가까운 고용센터에 직접 가면 돼요. 퇴사 후 너무 늦게 신청하면 못 받는 기간이 생기니까, 퇴사하면 빨리 움직이는 게 좋습니다.</div></div>
      </div>
    </Card>

    <CtaButton label="구직급여 계산하기" onClick={calc}/>
  </>);
}
