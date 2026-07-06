'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';

function toDateStr(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function SeveranceCalc() {
  const today = new Date();
  const twoYearsAgo = new Date(today);
  twoYearsAgo.setFullYear(today.getFullYear() - 2);

  const [startDate, setStartDate] = useState(toDateStr(twoYearsAgo));
  const [endDate, setEndDate] = useState(toDateStr(today));
  const [wage, setWage] = useState(300);
  const [bonus, setBonus] = useState(0);
  const [annualLeave, setAnnualLeave] = useState(0);
  const [result, setResult] = useState<{ severance: number; days: number; dailyAvg: number; years: number; months: number } | null>(null);

  const calc = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (totalDays <= 0) return;

    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);

    const wageTotal3m = wage * 10000 * 3;
    const bonusPortion = (bonus * 10000 / 12) * 3;
    const leavePortion = (annualLeave * 10000 / 12) * 3;
    const totalPay3m = wageTotal3m + bonusPortion + leavePortion;

    const dailyAvg = totalPay3m / 92;
    const severance = dailyAvg * 30 * (totalDays / 365);

    setResult({
      severance: Math.round(severance),
      days: totalDays,
      dailyAvg: Math.round(dailyAvg),
      years,
      months,
    });
    scrollToResult();
  };

  return (<>
    <Card>
      <SectionTitle num="1">재직 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">입사일</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">퇴사일</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
      </div>
    </Card>

    <Card>
      <SectionTitle num="2">급여 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">최근 3개월 월평균 임금 <span className="text-xs text-[var(--sub)] font-medium ml-1">{wage.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={wage} min={0} onChange={e => setWage(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
          <span className="text-sm font-bold text-[var(--sub)]">만원/월</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">연간 상여금 <span className="text-xs text-[var(--sub)] font-medium ml-1">{bonus.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={bonus} min={0} onChange={e => setBonus(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
          <span className="text-sm font-bold text-[var(--sub)]">만원/년</span>
        </div>
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">연차수당 <span className="text-xs text-[var(--sub)] font-medium ml-1">{annualLeave.toLocaleString()}만원</span></label>
        <div className="flex items-center gap-2.5">
          <input type="number" value={annualLeave} min={0} onChange={e => setAnnualLeave(+e.target.value || 0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
          <span className="text-sm font-bold text-[var(--sub)]">만원/년</span>
        </div>
      </div>
    </Card>

    {result && (
      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">예상 퇴직금</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">
            재직 {result.years}년 {result.months}개월
          </span>
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">예상 퇴직금</div>
            <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.severance)}</div>
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">재직기간</span><span className="font-bold">{result.days}일 ({result.years}년 {result.months}개월)</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">1일 평균임금</span><span className="font-bold">{won(result.dailyAvg)}</span></div>
          </div>
        </div>
      </div>
    )}
    {result && <ShareButtons title="퇴직금 계산 결과" />}

    {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 예상 퇴직금을 계산해 드려요.</Card>}

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <b className="text-[#6B7684]">계산 가정</b><br/>· 1일 평균임금 = (3개월 임금총액 + 상여금/12x3 + 연차수당/12x3) / 92일<br/>· 퇴직금 = 1일 평균임금 x 30 x (재직일수 / 365)
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">참고용 추정 도구입니다. 정확한 금액은 회사 인사팀에 문의하세요.</div>
    </footer>

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 퇴직금이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">퇴직금은 근로기준법에 따라 1년 이상 계속 근무한 근로자가 퇴직할 때 받는 금액입니다. 계산 방식은 &apos;30일분의 평균임금 x 재직연수&apos;이며, 평균임금은 퇴직 전 3개월간의 총 임금을 기준으로 산정합니다. 상여금, 연차수당 등 정기적으로 지급되는 금액도 평균임금에 포함됩니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">2012년부터 퇴직연금(DB형, DC형) 제도가 도입되어, 사업장에 따라 퇴직연금으로 수령하는 경우도 있습니다. 퇴직금은 퇴직일로부터 14일 이내에 지급해야 하며, 미지급 시 지연이자가 발생합니다. 퇴직소득세가 부과되나, 근속연수공제가 적용되어 장기 근무자일수록 세 부담이 줄어듭니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 1년 미만 근무해도 퇴직금을 받을 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 근로기준법상 퇴직금은 계속 근로기간 1년 이상인 근로자에게 지급됩니다. 1년 미만 근무 시 법적 지급 의무가 없지만, 회사 내규에 따라 지급하는 경우도 있으니 취업규칙을 확인하세요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 퇴직금에 세금이 얼마나 부과되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 퇴직소득세가 부과됩니다. 근속연수공제, 환산급여공제 등이 적용되어 근속기간이 길수록 세금이 줄어듭니다. 일반적으로 퇴직금의 2~10% 수준이며, IRP 계좌로 수령하면 퇴직소득세를 30~40% 감면받을 수 있습니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 상여금이나 성과급도 퇴직금 계산에 포함되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 정기적·일률적으로 지급되는 상여금은 평균임금에 포함됩니다. 연간 상여금 총액의 3/12을 퇴직 전 3개월 임금에 합산하여 계산합니다. 다만, 일시적이거나 은혜적으로 지급되는 경조금 등은 제외됩니다.</div></div>
      </div>
    </Card>

    <CtaButton label="퇴직금 계산하기" onClick={calc} />
  </>);
}
