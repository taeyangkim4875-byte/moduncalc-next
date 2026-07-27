'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
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

    </>}

    <Card>
      <h2 className="text-base font-extrabold mb-3">복리, 한번 계산해보면 놀랍습니다</h2>
      <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2.5">
        <p>복리의 힘을 한번 계산해보면 놀랍습니다. 1,000만원을 연 7%로 10년 놔두면 거의 2,000만원이 돼요. 이자에 이자가 붙으니까, 시간이 길어질수록 차이가 엄청나게 벌어지거든요.</p>
        <p>72의 법칙이라는 게 있는데, 72를 수익률로 나누면 원금이 2배 되는 시간이 나와요. 연 6%면 12년, 8%면 9년. 암산으로 빠르게 감 잡을 때 진짜 유용합니다.</p>
        <p>참고로 은행 예금은 연 3~4%, 국내 주식은 장기 평균 7~8%, 미국 S&P 500은 약 10% 정도예요. 당연히 수익률 높으면 리스크도 크고요. 분산 투자하고 오래 들고 있는 게 결국 제일 낫더라고요.</p>
      </div>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">궁금하실 만한 것들</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">단리랑 복리 차이가 뭐예요?</div><div className="text-sm text-[#4E5968] leading-relaxed">단리는 원금에만 이자가 붙어요. 복리는 이자에도 이자가 붙고요. 5년 정도까진 별 차이 없는데, 10년 넘어가면 복리가 압도적으로 커져요. 위에서 단리 vs 복리 비교 확인해보세요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">목돈 없이 매달 적립만 해도 되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">그럼요. 매달 넣는 돈에도 복리가 붙거든요. 초기 원금 0원으로 놓고 월 50만원씩 연 7%로 20년 넣어보세요. 생각보다 큰 금액이 됩니다. 일찍 시작하는 게 핵심이에요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">세금은 안 빠지나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">이 계산기는 세전 기준이에요. 실제로는 이자·배당에 15.4% 세금이 붙습니다. ISA나 연금저축 같은 절세 계좌를 활용하면 세금을 줄이거나 미룰 수 있어요.</div></div>
      </div>
    </Card>
  </>);
}
