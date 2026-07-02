'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';

const NPS_CONST=1.29, NPS_A=3193511, NPS_CAP=6370000, NPS_FLOOR=400000;
function pensionAge(by:number){if(by<=1952)return 60;if(by<=1956)return 61;if(by<=1960)return 62;if(by<=1964)return 63;if(by<=1968)return 64;return 65;}

export default function PensionCalculator(){
  const [age,setAge]=useState(35);
  const [income,setIncome]=useState(300);
  const [years,setYears]=useState(30);
  const [result,setResult]=useState<{monthly:number;basicYear:number;replaceRate:number;startAge:number;birthYear:number;tooShort:boolean}|null>(null);

  const calc=()=>{
    const B=Math.min(Math.max(income*10000,NPS_FLOOR),NPS_CAP);
    const n=Math.max(0,(years-20))*12;
    const basicYear=NPS_CONST*(NPS_A+B)*(1+0.05*n/12);
    const monthly=basicYear/12;
    const replaceRate=income>0?(monthly/(income*10000)*100):0;
    const birthYear=2026-age;
    const startAge=pensionAge(birthYear);
    setResult({monthly,basicYear,replaceRate,startAge,birthYear,tooShort:years<10});
  };

  return (<>
    <Card>
      <SectionTitle num="1">가입 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">현재 나이 <span className="text-xs text-[var(--sub)] font-medium ml-1">만 나이</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={age} min={18} max={64} onChange={e=>setAge(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/>
          <span className="text-sm font-bold text-[var(--sub)]">세</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">월 평균소득 <span className="text-xs text-[var(--sub)] font-medium ml-1">{income.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={income} min={0} onChange={e=>setIncome(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/>
          <span className="text-sm font-bold text-[var(--sub)]">만원/월</span>
        </div>
        <input type="range" min={0} max={700} step={10} value={income} onChange={e=>setIncome(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">총 가입(예정) 기간 <span className="text-xs text-[var(--sub)] font-medium ml-1">{years}년</span></label>
        <input type="range" min={1} max={45} step={1} value={years} onChange={e=>setYears(+e.target.value)} className="w-full"/>
        <div className="text-xs text-[var(--sub)] mt-1">10년 이상이어야 노령연금 수급</div>
      </div>
    </Card>

    {result && (
      <div>
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">예상 노령연금</div>
        {result.tooShort ? (
          <div className="bg-[#FFF4E5] rounded-xl p-3.5 text-[13px] text-[#B26A00] font-semibold mb-3.5">가입기간이 10년 미만이면 노령연금 대상이 아니에요. 최소 10년 이상 납입해야 합니다.</div>
        ) : (
          <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
            <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">{result.startAge}세부터 평생 수령</span>
            <div className="text-center py-2">
              <div className="text-sm font-bold text-[var(--sub)]">예상 월 연금액 (현재가치)</div>
              <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.monthly)}<span className="text-base font-bold ml-1">/월</span></div>
              <div className="text-sm text-[var(--sub)]">총 {years}년 가입 · 소득대체율 43% 기준</div>
            </div>
            <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">연 환산 수령액</span><span className="font-bold">{won(result.basicYear)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">내 소득 대비</span><span className="font-bold">{result.replaceRate.toFixed(0)}%</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">20년 초과 가산</span><span className="font-bold">{years>20?'+'+((years-20)*5)+'%':'없음'}</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">수급 개시 연령</span><span className="font-bold">{result.startAge}세 ({result.birthYear}년생)</span></div>
            </div>
            <div className="mt-3.5 bg-[var(--primary-weak)] rounded-xl p-3.5">
              <div className="text-xs font-bold text-[var(--primary-dark)]">{result.startAge}세부터 20년 수령 가정 시</div>
              <div className="text-[22px] font-extrabold text-[var(--primary-dark)]">총 약 {won(result.basicYear*20)}</div>
              <div className="text-[11px] text-[var(--sub)] mt-1">물가상승률 미반영 현재가치</div>
            </div>
          </div>
        )}
      </div>
    )}

    {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 예상 월 수령액을 계산해 드려요.</Card>}

    <Card>
      <div className="text-[13px] font-extrabold mb-2">🎂 노령연금 수급 개시 연령</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">출생연도</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">개시 연령</th></tr></thead>
        <tbody>
          {[['~1952',60],['1953~1956',61],['1957~1960',62],['1961~1964',63],['1965~1968',64],['1969~',65]].map(([y,a])=>(
            <tr key={y as string} className="border-b border-[var(--line)]"><td className="py-2 font-bold">{y}</td><td className="text-right py-2 font-bold">{a}세</td></tr>
          ))}
        </tbody>
      </table>
      <div className="text-[11px] text-[var(--sub)] mt-2">소득대체율 43%(비례상수 1.29) · A값 319만원</div>
    </Card>

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <b className="text-[#6B7684]">계산 가정</b><br/>· 예상 연금 = 1.29 × (A값 + 본인 소득) × (1 + 5%×20년 초과) ÷ 12<br/>· 10년 미만 가입 시 반환일시금
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">참고용 추정 도구입니다. 정확한 예상연금은 국민연금공단(nps.or.kr)에서 확인하세요.</div>
    </footer>

    <CtaButton label="예상 연금 계산하기" onClick={calc}/>
  </>);
}
