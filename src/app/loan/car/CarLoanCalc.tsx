'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';

export default function CarLoanCalc() {
  const [price, setPrice] = useState(3000);
  const [carType, setCarType] = useState<'normal'|'light'|'ev'>('normal');
  const [downPay, setDownPay] = useState(500);
  const [rate, setRate] = useState(5.9);
  const [term, setTerm] = useState(48);
  const [result, setResult] = useState<{
    loanAmt: number; monthly: number; totalInt: number; totalRepay: number;
    acqTax: number; eduTax: number; totalTax: number; totalCost: number;
  } | null>(null);

  const calc = () => {
    const priceWon = price * 10000;
    const downWon = downPay * 10000;
    const loanAmt = Math.max(0, priceWon - downWon);

    // 취득세 계산 (2026 기준)
    let acqTaxRate = 0.07; // 일반 승용차 7%
    let acqTax = Math.round(priceWon * acqTaxRate);

    if (carType === 'light') {
      // 경차: 취득세 75만원까지 면제 (2027년까지)
      acqTax = Math.max(0, acqTax - 750000);
    } else if (carType === 'ev') {
      // 전기차: 취득세 140만원까지 면제 (2026년까지)
      acqTax = Math.max(0, acqTax - 1400000);
    }

    // 지방교육세: 취득세의 20% (경차·전기차 면제분 제외 후 계산)
    const eduTax = Math.round(acqTax * 0.2);
    const totalTax = acqTax + eduTax;

    // 할부 계산 (원리금균등)
    const r = rate / 100 / 12;
    let monthly: number, totalInt: number;
    if (r > 0 && loanAmt > 0) {
      monthly = loanAmt * r * Math.pow(1 + r, term) / (Math.pow(1 + r, term) - 1);
      totalInt = monthly * term - loanAmt;
    } else {
      monthly = term > 0 ? loanAmt / term : 0;
      totalInt = 0;
    }

    const totalRepay = loanAmt + totalInt;
    const totalCost = priceWon + totalTax + totalInt;

    setResult({ loanAmt, monthly: Math.round(monthly), totalInt: Math.round(totalInt), totalRepay: Math.round(totalRepay), acqTax, eduTax, totalTax, totalCost: Math.round(totalCost) });
    scrollToResult();
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">차량 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">차량 가격 <span className="text-xs text-[var(--sub)] font-medium ml-1">{price.toLocaleString()}만원</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={price} onChange={e => setPrice(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input type="range" min={500} max={15000} step={100} value={price} onChange={e => setPrice(+e.target.value)} className="w-full mt-3.5" />
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">차량 유형</label>
          <div className="flex gap-2">
            {([['normal', '일반 승용차'], ['light', '경차'], ['ev', '전기차']] as const).map(([v, l]) => (
              <button key={v} onClick={() => setCarType(v)} className={`flex-1 py-2.5 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${carType === v ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]' : 'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{l}</button>
            ))}
          </div>
          {carType === 'light' && <div className="text-xs text-[var(--green)] font-semibold mt-2">경차: 취득세 75만원까지 면제</div>}
          {carType === 'ev' && <div className="text-xs text-[var(--green)] font-semibold mt-2">전기차: 취득세 140만원까지 면제</div>}
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">할부 조건</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">선수금(다운페이) <span className="text-xs text-[var(--sub)] font-medium ml-1">{downPay.toLocaleString()}만원</span></label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={downPay} onChange={e => setDownPay(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input type="range" min={0} max={Math.max(price, 100)} step={50} value={downPay} onChange={e => setDownPay(+e.target.value)} className="w-full mt-3.5" />
          <div className="text-xs text-[var(--sub)] mt-1">할부 원금: {Math.max(0, price - downPay).toLocaleString()}만원</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">할부 이자율 (연)</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={rate} min={0} max={20} step={0.1} onChange={e => setRate(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">%</span>
          </div>
          <div className="text-xs text-[var(--sub)] mt-1">캐피탈사 5~8%, 은행 4~6%, 무이자 0%</div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">할부 기간</label>
          <select value={term} onChange={e => setTerm(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none appearance-none bg-white">
            <option value={12}>12개월 (1년)</option>
            <option value={24}>24개월 (2년)</option>
            <option value={36}>36개월 (3년)</option>
            <option value={48}>48개월 (4년)</option>
            <option value={60}>60개월 (5년)</option>
            <option value={72}>72개월 (6년)</option>
          </select>
        </div>
      </Card>

      {result && (
        <div id="calc-result">
          <div className="text-lg font-extrabold mt-4 mb-3 px-1">할부 납입 정보</div>
          <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
            <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">원리금균등 · {term}개월</span>
            <div className="text-center py-2">
              <div className="text-sm font-bold text-[var(--sub)]">월 납입액</div>
              <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.monthly)}</div>
            </div>
            <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">할부 원금</span><span className="font-bold">{won(result.loanAmt)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">총 이자</span><span className="font-bold text-[#E5484D]">{won(result.totalInt)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">총 상환액</span><span className="font-bold">{won(result.totalRepay)}</span></div>
            </div>
          </div>

          <div className="text-lg font-extrabold mt-4 mb-3 px-1">취등록세</div>
          <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5">
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">취득세 (7%){carType !== 'normal' ? ' - 감면' : ''}</span><span className="font-bold">{won(result.acqTax)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">지방교육세 (취득세×20%)</span><span className="font-bold">{won(result.eduTax)}</span></div>
              <div className="flex justify-between border-t border-[var(--line)] pt-2"><span className="font-extrabold">취등록세 합계</span><span className="font-extrabold">{won(result.totalTax)}</span></div>
            </div>
          </div>

          <div className="bg-[var(--primary-weak)] rounded-xl p-4 text-center mb-3.5">
            <div className="text-xs text-[var(--primary-dark)] font-bold">총 구매 비용 (차량가 + 취등록세 + 이자)</div>
            <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{won(result.totalCost)}</div>
          </div>
        </div>
      )}

      {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 할부 납입액과 취등록세를 계산해 드려요.</Card>}

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 자동차 할부 구매란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">자동차를 할부로 구매하면 차량 가격 외에 할부 이자, 취등록세(취득세 7% + 지방교육세), 공채 매입비 등 부대비용이 발생합니다. 할부 이자율은 캐피탈사(5~8%), 은행(4~6%), 제조사 무이자 프로모션(0%) 등 경로에 따라 크게 달라집니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">경차는 취득세 75만원까지, 전기차는 140만원까지 면제됩니다. 할부 기간이 길수록 월 부담은 줄지만 총 이자는 크게 늘어나므로 적정 기간을 선택하는 것이 중요합니다.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 무이자 할부는 정말 이자가 0원인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 제조사 프로모션 무이자 할부는 실제 이자 0%이지만, 대신 차량 할인이 적거나 없는 경우가 많습니다. 현금 구매 시 추가 할인과 비교해보세요.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 할부 기간은 몇 개월이 적당한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 일반적으로 36~48개월을 많이 선택합니다. 60개월 이상은 총 이자가 크게 늘어나므로 여유가 된다면 짧은 기간을 권장합니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 취등록세 외에 또 드는 비용은?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 공채 매입비(지역별 차이), 번호판 비용, 보험료 등이 추가로 발생합니다. 총 부대비용은 차량 가격의 약 10~12% 수준입니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          추정치입니다. 실제 할부 조건은 금융사·딜러마다 다르며, 공채 매입비·보험료 등 부대비용은 별도입니다.
        </div>
      </footer>

      <CtaButton label="할부 납입액 계산하기" onClick={calc} />
    </>
  );
}
