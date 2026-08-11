'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ShareButtons from '@/components/ShareButtons';
import { won } from '@/utils/format';

export default function DsrCalc() {
  const [income, setIncome] = useState(5000);
  const [existingPayment, setExistingPayment] = useState(500);
  const [loanAmount, setLoanAmount] = useState(30000);
  const [rate, setRate] = useState(4.0);
  const [term, setTerm] = useState(30);
  const [method, setMethod] = useState<'equal' | 'principal'>('equal');

  const result = useMemo(() => {
    const annualIncome = (income || 0) * 10000;
    const existingAnnual = (existingPayment || 0) * 10000;
    const principal = (loanAmount || 0) * 10000;
    const monthlyRate = (rate || 0) / 100 / 12;
    const months = (term || 1) * 12;

    let monthlyPayment = 0;
    if (method === 'equal') {
      if (monthlyRate > 0) {
        monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
      } else {
        monthlyPayment = principal / months;
      }
    } else {
      const principalPart = principal / months;
      monthlyPayment = principalPart + principal * monthlyRate;
    }

    const newAnnual = monthlyPayment * 12;
    const dsr = annualIncome > 0 ? ((existingAnnual + newAnnual) / annualIncome) * 100 : 0;

    const calcMaxLoan = (dsrLimit: number) => {
      const maxAnnualPayment = annualIncome * dsrLimit / 100 - existingAnnual;
      if (maxAnnualPayment <= 0) return 0;
      const maxMonthly = maxAnnualPayment / 12;
      if (method === 'equal') {
        if (monthlyRate > 0) {
          return maxMonthly * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));
        }
        return maxMonthly * months;
      } else {
        return maxMonthly / (1 / months + monthlyRate) ;
      }
    };

    return {
      dsr,
      monthlyPayment,
      newAnnual,
      max40: calcMaxLoan(40),
      max50: calcMaxLoan(50),
      max60: calcMaxLoan(60),
    };
  }, [income, existingPayment, loanAmount, rate, term, method]);

  const fmtAmt = (n: number) => {
    if (n >= 100000000) return `${(n / 100000000).toFixed(1)}억원`;
    if (n >= 10000) return `${Math.round(n / 10000).toLocaleString()}만원`;
    return n.toLocaleString() + '원';
  };

  const dsrStatus = (dsr: number) => {
    if (dsr <= 40) return { label: '통과', color: 'text-[var(--green)]', bg: 'bg-[#E8F5E9]' };
    if (dsr <= 50) return { label: '주의', color: 'text-[#F59E0B]', bg: 'bg-[#FFF8E1]' };
    return { label: '초과', color: 'text-[#E5484D]', bg: 'bg-[#FFEBEE]' };
  };

  const status = dsrStatus(result.dsr);

  return (
    <>
      <Card>
        <SectionTitle num="1">소득 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">연소득 (세전) <span className="text-xs text-[var(--sub)] font-medium ml-1">{(income || 0).toLocaleString()}만원</span></label>
          <input type="range" min={1000} max={30000} step={100} value={income} onChange={e => setIncome(+e.target.value)} className="w-full" />
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">기존 대출 연간 원리금 상환액</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={existingPayment || ''} onChange={e => setExistingPayment(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">신규 대출 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">신규 대출 희망액</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={loanAmount || ''} onChange={e => setLoanAmount(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <div className="text-xs text-[var(--sub)] mt-1">{fmtAmt((loanAmount || 0) * 10000)}</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">대출 금리 <span className="text-xs text-[var(--sub)] font-medium ml-1">연 {rate}%</span></label>
          <input type="range" min={1} max={10} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} className="w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">대출 기간 <span className="text-xs text-[var(--sub)] font-medium ml-1">{term}년</span></label>
          <input type="range" min={5} max={40} step={1} value={term} onChange={e => setTerm(+e.target.value)} className="w-full" />
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">상환 방식</label>
          <div className="flex gap-2">
            {[{ v: 'equal' as const, l: '원리금균등' }, { v: 'principal' as const, l: '원금균등' }].map(o => (
              <button key={o.v} onClick={() => setMethod(o.v)} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-all ${method === o.v ? 'border-[var(--primary)] bg-[var(--primary)] text-white' : 'border-[var(--line)] text-[var(--sub)]'}`}>{o.l}</button>
            ))}
          </div>
        </div>
      </Card>

      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">📊 DSR 계산 결과</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">현재 DSR</div>
            <div className={`text-[44px] font-extrabold tracking-tight ${status.color}`}>{result.dsr.toFixed(1)}%</div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.color}`}>DSR 40% 기준 {status.label}</div>
          </div>

          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">월 상환액</span><span className="font-bold">{won(result.monthlyPayment)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">신규 대출 연간 원리금</span><span className="font-bold">{won(result.newAnnual)}</span></div>
          </div>

          <div className="mt-4 border-t border-[var(--line)] pt-3.5">
            <div className="text-xs font-bold text-[var(--sub)] mb-2.5">DSR 규제 기준별 최대 대출 가능액</div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'DSR 40%', value: result.max40, desc: '1금융권 주담대' },
                { label: 'DSR 50%', value: result.max50, desc: '2금융권' },
                { label: 'DSR 60%', value: result.max60, desc: '특례' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between bg-[var(--bg)] rounded-xl p-3">
                  <div>
                    <div className="text-sm font-bold">{item.label}</div>
                    <div className="text-[11px] text-[var(--sub)]">{item.desc}</div>
                  </div>
                  <div className="text-sm font-extrabold text-[var(--primary-dark)]">{item.value > 0 ? fmtAmt(item.value) : '불가'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DSR 게이지 바 */}
          <div className="mt-4">
            <div className="text-xs font-bold text-[var(--sub)] mb-2">DSR 게이지</div>
            <div className="relative h-6 bg-[var(--bg)] rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--green)] via-[#F59E0B] to-[#E5484D] opacity-20 w-full" />
              <div className={`absolute left-0 top-0 h-full rounded-full ${result.dsr <= 40 ? 'bg-[var(--green)]' : result.dsr <= 50 ? 'bg-[#F59E0B]' : 'bg-[#E5484D]'}`} style={{ width: `${Math.min(100, result.dsr)}%` }} />
              <div className="absolute left-[40%] top-0 h-full w-[1.5px] bg-[var(--ink)] opacity-30" />
              <div className="absolute left-[50%] top-0 h-full w-[1.5px] bg-[var(--ink)] opacity-20" />
            </div>
            <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1">
              <span>0%</span><span>40%</span><span>50%</span><span>100%</span>
            </div>
          </div>
        </div>
      </div>
      <ShareButtons title="DSR 계산 결과" />

      <Card>
        <h2 className="text-base font-extrabold mb-2">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">대출 얼마까지 받을 수 있는지 DSR로 확인해보세요. 40% 넘으면 은행에서 안 해줘요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. DSR이랑 DTI 차이가 뭔가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. DSR은 모든 대출의 원리금을 합산하고, DTI는 주담대 원리금만 봐요. DSR이 더 엄격하거든요.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 카드론이나 마이너스통장도 포함되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 다 포함돼요. 기존 대출을 먼저 갚으면 DSR 여유가 생겨요.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">이 계산기는 참고용이며, 실제 대출 심사 시 은행별 DSR 계산 방식이 다를 수 있습니다. 정확한 대출 한도는 금융기관에 문의하세요.</div>
      </footer>
    </>
  );
}
