'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import { won } from '@/utils/format';

export default function RentalCalc(){
  const [buyPrice,setBuyPrice]=useState(50000);
  const [deposit,setDeposit]=useState(10000);
  const [monthlyRent,setMonthlyRent]=useState(80);
  const [loan,setLoan]=useState(0);
  const [loanRate,setLoanRate]=useState(3.5);
  const [annualCost,setAnnualCost]=useState(200);

  const annualIncome=monthlyRent*12;
  const annualInterest=Math.round(loan*loanRate/100);
  const annualNet=annualIncome-annualInterest-annualCost;
  const investment=buyPrice-deposit-loan;
  const grossYield=buyPrice-deposit>0?((annualIncome/(buyPrice-deposit))*100):0;
  const netYield=investment>0?((annualNet/investment)*100):0;
  const monthlyNet=Math.round(annualNet/12);
  const paybackYears=annualNet>0?(investment/annualNet):Infinity;

  const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;

  return(<>
    <Card><SectionTitle num="1">매매·임대 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">매매가 <span className="text-xs text-[var(--sub)] font-medium ml-1">{buyPrice>=10000?`${Math.floor(buyPrice/10000)}억${buyPrice%10000?` ${(buyPrice%10000).toLocaleString()}만`:''}`:buyPrice.toLocaleString()+'만'}원</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={buyPrice} min={0} onChange={e=>setBuyPrice(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div>
        <input type="range" min={0} max={200000} step={1000} value={buyPrice} onChange={e=>setBuyPrice(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">보증금 <span className="text-xs text-[var(--sub)] font-medium ml-1">{deposit.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={deposit} min={0} onChange={e=>setDeposit(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div>
        <input type="range" min={0} max={100000} step={500} value={deposit} onChange={e=>setDeposit(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">월세 <span className="text-xs text-[var(--sub)] font-medium ml-1">{monthlyRent.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={monthlyRent} min={0} onChange={e=>setMonthlyRent(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원/월</span></div>
        <input type="range" min={0} max={500} step={5} value={monthlyRent} onChange={e=>setMonthlyRent(+e.target.value)} className="w-full mt-3.5"/>
      </div>
    </Card>

    <Card><SectionTitle num="2">대출·비용 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">대출금 <span className="text-xs text-[var(--sub)] font-medium ml-1">{loan.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={loan} min={0} onChange={e=>setLoan(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div>
        <input type="range" min={0} max={100000} step={500} value={loan} onChange={e=>setLoan(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">대출 금리 <span className="text-xs text-[var(--sub)] font-medium ml-1">{loanRate}%</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={loanRate} min={0} max={10} step={0.1} onChange={e=>setLoanRate(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">%</span></div>
        <input type="range" min={0} max={10} step={0.1} value={loanRate} onChange={e=>setLoanRate(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">연 관리비·세금 <span className="text-xs text-[var(--sub)] font-medium ml-1">{annualCost.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={annualCost} min={0} onChange={e=>setAnnualCost(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원/년</span></div>
        <input type="range" min={0} max={2000} step={10} value={annualCost} onChange={e=>setAnnualCost(+e.target.value)} className="w-full mt-3.5"/>
      </div>
    </Card>

    <div className="text-lg font-extrabold mt-4 mb-3 px-1">투자 수익 분석</div>
    <div className="grid grid-cols-2 gap-2.5 mb-3.5">
      <R v={`${grossYield.toFixed(1)}%`} l="총 수익률"/>
      <R v={`${netYield.toFixed(1)}%`} l="순 수익률"/>
      <R v={won(monthlyNet*10000)} l="월 순수익"/>
      <R v={paybackYears===Infinity?'-':`${paybackYears.toFixed(1)}년`} l="투자금 회수기간"/>
    </div>

    <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
      <div className="flex flex-col gap-2.5 text-[13.5px]">
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">연 임대소득 (월세x12)</span><span className="font-bold">{won(annualIncome*10000)}</span></div>
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">연 대출이자</span><span className="font-bold text-[var(--red)]">-{won(annualInterest*10000)}</span></div>
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">연 관리비·세금</span><span className="font-bold text-[var(--red)]">-{won(annualCost*10000)}</span></div>
        <div className="flex justify-between border-t border-[var(--line)] pt-2.5"><span className="text-[var(--sub)] font-semibold">연 순수익</span><span className="font-bold text-[var(--primary-dark)]">{won(annualNet*10000)}</span></div>
        <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">실투자금 (매매가-보증금-대출)</span><span className="font-bold">{won(investment*10000)}</span></div>
      </div>
    </div>

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 임대수익률이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">임대수익률은 부동산 투자 시 임대 소득이 투자금 대비 어느 정도인지를 나타내는 지표입니다. 총수익률은 매매가(보증금 제외) 대비 연 임대소득 비율이고, 순수익률은 실투자금 대비 대출이자·관리비를 차감한 순수익 비율입니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">일반적으로 순수익률이 연 5% 이상이면 양호한 수준으로 평가되며, 대출 레버리지를 활용하면 순수익률이 높아질 수 있지만 금리 상승 리스크도 커집니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 총수익률과 순수익률의 차이는?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 총수익률은 대출이자·관리비 등 비용을 고려하지 않은 단순 수익률이고, 순수익률은 모든 비용을 차감한 실질 수익률입니다. 투자 판단 시 순수익률이 더 중요합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 적정 임대수익률은 어느 정도인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 지역과 물건에 따라 다르지만, 서울 아파트 기준 총수익률 3~4%, 순수익률 2~3% 수준입니다. 오피스텔이나 지방 물건은 총수익률 5~8%까지 나오기도 합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 공실 리스크는 어떻게 대비하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 역세권, 대학가 등 임대 수요가 꾸준한 입지를 선택하고, 연 1~2개월 공실을 감안한 보수적 수익률로 판단하는 것이 안전합니다. 월세를 시세보다 약간 낮게 설정하면 공실 기간을 줄일 수 있습니다.</div></div>
      </div>
    </Card>

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <b className="text-[#6B7684]">계산 가정</b><br/>· 공실·수선유지비 미반영 · 대출 이자만 반영(원금상환 미포함)
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">참고용 추정 도구입니다. 실제 수익률은 공실률, 수선비, 세금 등에 따라 달라질 수 있습니다.</div>
    </footer>
  </>);
}
