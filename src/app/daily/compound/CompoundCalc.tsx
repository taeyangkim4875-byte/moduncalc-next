'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import AiAnalysis from '@/components/AiAnalysis';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;

const fmtW=(n:number)=>{
  if(n>=10000)return `${(n/10000).toFixed(1)}억원`;
  return `${Math.round(n).toLocaleString()}만원`;
};

export default function CompoundCalc(){
  const [principal,setPrincipal]=useState('1000');
  const [monthly,setMonthly]=useState('100');
  const [rate,setRate]=useState('7');
  const [years,setYears]=useState('10');

  const p=(+principal||0)*10000;
  const m=(+monthly||0)*10000;
  const r=(+rate||0)/100;
  const n=+years||0;
  const hasInput=p>0&&r>0&&n>0;

  // Compound interest calculation
  const compoundPrincipal=p*Math.pow(1+r,n);
  const compoundMonthly=r>0&&n>0?m*((Math.pow(1+r/12,n*12)-1)/(r/12)):m*n*12;
  const compoundTotal=compoundPrincipal+compoundMonthly;
  const totalInvested=p+m*n*12;
  const totalProfit=compoundTotal-totalInvested;
  const profitRate=totalInvested>0?(totalProfit/totalInvested)*100:0;

  // Simple interest
  const simpleTotal=p*(1+r*n)+m*n*12;

  // Rule of 72
  const doubleYears=r>0?72/(r*100):0;

  // Yearly table (every 5 years)
  const yearlyData:Array<{year:number;balance:number;invested:number}>=[];
  if(hasInput){
    for(let y=0;y<=n;y+=5){
      if(y===0){yearlyData.push({year:0,balance:p/10000,invested:p/10000});continue;}
      const bal=p*Math.pow(1+r,y)+(r>0?m*((Math.pow(1+r/12,y*12)-1)/(r/12)):m*y*12);
      const inv=(p+m*y*12)/10000;
      yearlyData.push({year:y,balance:Math.round(bal/10000),invested:Math.round(inv)});
    }
    if(n%5!==0){
      yearlyData.push({year:n,balance:Math.round(compoundTotal/10000),invested:Math.round(totalInvested/10000)});
    }
  }

  return(<>
    <Card><SectionTitle num="💰">투자 조건 입력</SectionTitle>
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">초기 원금 (만원)</label>
          <input type="number" value={principal} onChange={e=>setPrincipal(e.target.value)} min={0} max={100000} inputMode="numeric"
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">월 적립액 (만원)</label>
          <input type="number" value={monthly} onChange={e=>setMonthly(e.target.value)} min={0} max={1000} inputMode="numeric"
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">연 수익률 (%)</label>
          <input type="number" value={rate} onChange={e=>setRate(e.target.value)} min={1} max={30} step={0.1} inputMode="decimal"
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">투자 기간 (년)</label>
          <input type="number" value={years} onChange={e=>setYears(e.target.value)} min={1} max={40} inputMode="numeric"
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
        </div>
      </div>
    </Card>

    {hasInput&&<>
      <Card><SectionTitle num="📊">복리 수익 결과</SectionTitle>
        <R v={fmtW(Math.round(compoundTotal/10000))} l="최종 금액 (복리)"/>
        <div className="grid grid-cols-2 gap-2.5 mt-3">
          <R v={fmtW(Math.round(totalInvested/10000))} l="총 투자 원금"/>
          <R v={fmtW(Math.round(totalProfit/10000))} l="총 수익 (이자)"/>
        </div>
        <R v={`${profitRate.toFixed(1)}%`} l="수익률"/>

        <div className="mt-4 bg-gray-50 rounded-xl p-4">
          <h3 className="text-sm font-bold mb-2">단리 vs 복리 비교</h3>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[var(--sub)]">단리 최종 금액</span>
            <span className="font-bold">{fmtW(Math.round(simpleTotal/10000))}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[var(--sub)]">복리 최종 금액</span>
            <span className="font-bold text-[var(--primary)]">{fmtW(Math.round(compoundTotal/10000))}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--sub)]">복리 효과 (차이)</span>
            <span className="font-bold text-green-600">+{fmtW(Math.round((compoundTotal-simpleTotal)/10000))}</span>
          </div>
        </div>

        <div className="mt-3 bg-[var(--primary-weak)] rounded-xl p-4 text-center">
          <div className="text-xs text-[var(--sub)] mb-1">72의 법칙</div>
          <div className="text-lg font-extrabold text-[var(--primary-dark)]">원금이 2배가 되려면 약 {doubleYears.toFixed(1)}년</div>
          <div className="text-xs text-[var(--sub)] mt-1">72 / {(r*100).toFixed(1)}% = {doubleYears.toFixed(1)}년</div>
        </div>
      </Card>

      <Card><SectionTitle num="📈">연도별 잔액 추이</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b-2 border-[var(--line)]">
              <th className="text-left py-2 text-xs font-bold text-[var(--sub)]">연차</th>
              <th className="text-right py-2 text-xs font-bold text-[var(--sub)]">투자원금</th>
              <th className="text-right py-2 text-xs font-bold text-[var(--sub)]">잔액 (복리)</th>
              <th className="text-right py-2 text-xs font-bold text-[var(--sub)]">수익</th>
            </tr></thead>
            <tbody>
              {yearlyData.map(d=>(
                <tr key={d.year} className="border-b border-[var(--line)]">
                  <td className="py-2.5 font-bold">{d.year}년</td>
                  <td className="py-2.5 text-right text-xs">{fmtW(d.invested)}</td>
                  <td className="py-2.5 text-right text-xs font-bold text-[var(--primary)]">{fmtW(d.balance)}</td>
                  <td className="py-2.5 text-right text-xs text-green-600">{d.balance-d.invested>0?`+${fmtW(d.balance-d.invested)}`:'0만원'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AiAnalysis type="compound" data={{
        principal: +principal,
        monthly: +monthly,
        rate: +rate,
        years: +years,
        finalAmount: Math.round(compoundTotal / 10000),
        profit: Math.round(totalProfit / 10000),
      }} label="투자 전략 AI 분석 받기" />
    </>}

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 복리의 마법</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">복리(compound interest)는 원금뿐 아니라 이전에 발생한 이자에도 이자가 붙는 방식입니다. 아인슈타인이 "세상에서 가장 강력한 힘"이라 불렀다는 일화가 있을 만큼, 시간이 지날수록 그 효과는 기하급수적으로 커집니다. 10년보다 20년, 20년보다 30년 투자할 때 수익 차이가 크게 벌어지는 이유입니다.</p>
      <h3 className="text-sm font-bold mb-2">72의 법칙</h3>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">72의 법칙은 복리로 원금이 2배가 되는 시간을 빠르게 계산하는 방법입니다. 72를 연간 수익률(%)로 나누면 됩니다. 예: 연 6% → 12년, 연 8% → 9년, 연 12% → 6년. 실제 계산과 약간의 오차가 있지만 암산으로 빠르게 판단할 때 매우 유용합니다.</p>
      <h3 className="text-sm font-bold mb-2">투자 수익률 참고</h3>
      <p className="text-sm text-[#4E5968] leading-relaxed">은행 예금: 연 3~4% / 채권: 연 4~5% / 국내 주식(KOSPI): 장기 평균 연 7~8% / 미국 주식(S&P 500): 장기 평균 연 10% 내외 (인플레이션 고려 시 약 7%). 수익률이 높을수록 리스크도 크므로, 분산 투자와 장기 투자가 중요합니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 72의 법칙이란 무엇인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 72의 법칙은 투자 원금이 2배가 되는 데 걸리는 시간을 간단히 구하는 방법입니다. 72를 연이율(%)로 나누면 됩니다. 예를 들어 연 8% 수익률이면 72 / 8 = 약 9년이 걸립니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 단리와 복리의 차이는 무엇인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 단리는 원금에만 이자가 붙고, 복리는 원금 + 이전 이자에도 이자가 붙습니다. 기간이 길어질수록 복리의 효과가 기하급수적으로 커집니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 월 적립식 투자는 어떻게 계산되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 매월 일정 금액을 추가 투자하는 방식입니다. 각 월 적립금에도 복리가 적용되어, 초기 목돈 없이도 장기적으로 큰 자산을 만들 수 있습니다.</div></div>
      </div>
    </Card>
  </>);
}
