'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';

export default function InheritTaxCalc() {
  const [totalAsset, setTotalAsset] = useState(100000); // 만원 단위 (10억)
  const [debt, setDebt] = useState(0);
  const [hasSpouse, setHasSpouse] = useState(true);
  const [children, setChildren] = useState(2);

  // 과세가액
  const taxableValue = Math.max(0, ((totalAsset || 0) - (debt || 0)) * 10000); // 원 단위

  // 공제 계산
  const basicDeduction = 200000000; // 2억
  const childDeduction = (children || 0) * 50000000; // 1인당 5000만
  const personalTotal = basicDeduction + childDeduction;
  const lumpSumDeduction = 500000000; // 5억 일괄공제

  // 기초+인적 vs 일괄공제 중 큰 것
  const basicAndPersonal = Math.max(personalTotal, lumpSumDeduction);

  // 배우자 공제: 최소 5억, 법정상속분 한도 (최대 30억)
  // 법정상속분: 배우자 1.5 / (1.5 + 자녀수*1) of 과세가액
  const spouseRatio = (children || 0) > 0 ? 1.5 / (1.5 + (children || 0)) : 1;
  const spouseLegalShare = taxableValue * spouseRatio;
  const spouseDeduction = hasSpouse
    ? Math.min(3000000000, Math.max(500000000, spouseLegalShare))
    : 0;

  const totalDeduction = basicAndPersonal + spouseDeduction;

  // 과세표준
  const taxBase = Math.max(0, taxableValue - totalDeduction);

  // 세율 계산 (누진세)
  const calcTax = (base: number): number => {
    if (base <= 0) return 0;
    if (base <= 100000000) return base * 0.1;
    if (base <= 500000000) return base * 0.2 - 10000000;
    if (base <= 1000000000) return base * 0.3 - 60000000;
    if (base <= 3000000000) return base * 0.4 - 160000000;
    return base * 0.5 - 460000000;
  };

  const calculatedTax = calcTax(taxBase);
  const filingDiscount = calculatedTax * 0.03; // 신고세액공제 3%
  const finalTax = Math.max(0, calculatedTax - filingDiscount);
  const effectiveRate = taxableValue > 0 ? (finalTax / taxableValue) * 100 : 0;

  const fmt = (n: number) => Math.round(n).toLocaleString();
  const fmtMan = (n: number) => {
    if (n >= 100000000) {
      const uk = Math.floor(n / 100000000);
      const man = Math.round((n % 100000000) / 10000);
      return man > 0 ? `${uk}억 ${man.toLocaleString()}만원` : `${uk}억원`;
    }
    if (n >= 10000) return `${Math.round(n / 10000).toLocaleString()}만원`;
    return `${fmt(n)}원`;
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">상속 재산</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">상속재산 총액</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={totalAsset} onChange={e => setTotalAsset(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <div className="text-xs text-[var(--sub)] mt-1">{fmtMan((totalAsset || 0) * 10000)}</div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">채무 (빚)</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={debt} onChange={e => setDebt(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">상속인 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">배우자 유무</label>
          <div className="flex gap-2">
            <button onClick={() => setHasSpouse(true)} className={`flex-1 py-3 rounded-xl text-sm font-bold border-[1.5px] ${hasSpouse ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>있음</button>
            <button onClick={() => setHasSpouse(false)} className={`flex-1 py-3 rounded-xl text-sm font-bold border-[1.5px] ${!hasSpouse ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>없음</button>
          </div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">자녀 수 <span className="text-xs text-[var(--sub)] font-medium ml-1">{children}명</span></label>
          <input type="range" min={0} max={5} step={1} value={children} onChange={e => setChildren(+e.target.value)} className="w-full" />
          <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1"><span>0명</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5명</span></div>
        </div>
      </Card>

      <div className="text-lg font-extrabold mt-4 mb-3 px-1">📋 상속세 계산 결과</div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <div className="text-center py-2">
          <div className="text-sm font-bold text-[var(--sub)]">납부할 상속세</div>
          <div className="text-[40px] font-extrabold text-[var(--primary-dark)] tracking-tight">{fmtMan(finalTax)}</div>
          <div className="text-sm text-[var(--sub)]">실효세율 {effectiveRate.toFixed(1)}%</div>
        </div>

        <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">상속재산 총액</span><span className="font-bold">{fmtMan(taxableValue)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">채무 차감</span><span className="font-bold">-{fmtMan((debt || 0) * 10000)}</span></div>
        </div>

        <div className="mt-3 border-t border-[var(--line)] pt-3.5">
          <div className="text-xs font-bold text-[var(--sub)] mb-2">공제 내역</div>
          <div className="flex flex-col gap-1.5 text-[13px]">
            {personalTotal >= lumpSumDeduction ? (
              <>
                <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">기초공제</span><span className="font-bold">{fmtMan(basicDeduction)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">인적공제 (자녀 {children}명)</span><span className="font-bold">{fmtMan(childDeduction)}</span></div>
              </>
            ) : (
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">일괄공제</span><span className="font-bold">{fmtMan(lumpSumDeduction)}</span></div>
            )}
            {hasSpouse && (
              <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">배우자공제</span><span className="font-bold">{fmtMan(spouseDeduction)}</span></div>
            )}
            <div className="flex justify-between font-bold border-t border-dashed border-[var(--line)] pt-1.5"><span>공제 합계</span><span>{fmtMan(totalDeduction)}</span></div>
          </div>
        </div>

        <div className="mt-3 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">과세표준</span><span className="font-bold">{fmtMan(taxBase)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">산출세액</span><span className="font-bold">{fmtMan(calculatedTax)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">신고세액공제 (3%)</span><span className="font-bold text-[var(--green)]">-{fmtMan(filingDiscount)}</span></div>
          <div className="flex justify-between font-extrabold text-base border-t border-[var(--line)] pt-2"><span>납부할 상속세</span><span className="text-[var(--primary-dark)]">{fmtMan(finalTax)}</span></div>
        </div>
      </div>

      <ShareButtons title="상속세 계산 결과" />

      <Card>
        <SectionTitle num="📋">상속세 세율표 (2026)</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-2 border-[var(--line)]">
              <th className="py-2 text-left text-xs text-[var(--sub)] font-bold">과세표준</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">세율</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">누진공제</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1억 이하', '10%', '-'],
              ['1억~5억', '20%', '1,000만원'],
              ['5억~10억', '30%', '6,000만원'],
              ['10억~30억', '40%', '1억 6,000만원'],
              ['30억 초과', '50%', '4억 6,000만원'],
            ].map(([bracket, rate, deduction]) => (
              <tr key={bracket} className="border-b border-[var(--line)]">
                <td className="py-2 font-bold">{bracket}</td>
                <td className="py-2 text-right">{rate}</td>
                <td className="py-2 text-right">{deduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">상속세가 생각보다 많이 나와요. 공제 잘 활용하면 줄일 수 있어요. 배우자 유무와 자녀 수에 따라 공제액이 달라져요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 상속세 신고 기한은?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 사망일이 속하는 달의 말일부터 6개월 이내예요. 기한 내 신고 시 3% 공제 혜택이 있어요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 분할 납부가 가능한가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 1,000만원 초과 시 2개월 분납, 2,000만원 초과 시 최대 5년 연부연납이 가능해요.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          계산 결과는 참고용이며, 정확한 상속세 산정은 세무사와 상담하세요. 기타 공제(금융재산 공제, 동거주택 상속공제 등)는 반영되지 않았습니다.
        </div>
      </footer>
    </>
  );
}
