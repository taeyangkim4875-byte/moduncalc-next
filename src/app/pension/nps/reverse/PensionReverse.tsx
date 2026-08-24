'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import SliderInput from '@/components/SliderInput';
import ResultRow from '@/components/ResultRow';
import ModeToggle from '@/components/ModeToggle';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import { setParams } from '@/utils/params';
import ShareButtons from '@/components/ShareButtons';
import SavePrompt from '@/components/SavePrompt';
import { bisect } from '@/utils/solver';

const NPS_CONST = 1.29;
const NPS_A = 3193511;
const NPS_CAP = 6370000;
const NPS_FLOOR = 400000;

function pensionAge(by: number) {
  if (by <= 1952) return 60;
  if (by <= 1956) return 61;
  if (by <= 1960) return 62;
  if (by <= 1964) return 63;
  if (by <= 1968) return 64;
  return 65;
}

function calcMonthly(income: number, years: number) {
  const B = Math.min(Math.max(income * 10000, NPS_FLOOR), NPS_CAP);
  const n = Math.max(0, (years - 20)) * 12;
  const baseRatio = Math.min(years, 20) / 20;
  const basicYear = NPS_CONST * (NPS_A + B) * baseRatio * (1 + 0.05 * n / 12);
  return basicYear / 12;
}

interface ReverseResult {
  years: number;
  monthlyCheck: number;
  startAge: number;
  birthYear: number;
  lateWarning: boolean;
}

export default function PensionReverse() {
  const [targetMonthly, setTargetMonthly] = useState(100);
  const [age, setAge] = useState(35);
  const [income, setIncome] = useState(300);
  const [result, setResult] = useState<ReverseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calc() {
    setError(null);
    const fn = (yrs: number) => calcMonthly(income, yrs) - targetMonthly * 10000;

    const { value: years, converged } = bisect(fn, 10, 45);

    if (!converged || isNaN(years)) {
      const maxPension = calcMonthly(income, 45);
      setError(`월 소득 ${income}만원으로는 월 ${targetMonthly}만원 연금이 어렵습니다. 45년 가입해도 월 ${won(maxPension)} 수준이에요. 소득을 높이거나 목표를 낮춰보세요.`);
      setResult(null);
      scrollToResult();
      return;
    }

    const roundedYears = Math.ceil(years);
    const monthlyCheck = calcMonthly(income, roundedYears);
    const birthYear = 2026 - age;
    const startAge = pensionAge(birthYear);
    const lateWarning = age + roundedYears > startAge;

    setResult({ years: roundedYears, monthlyCheck, startAge, birthYear, lateWarning });
    setParams({ targetMonthly, age, income }, { primaryOutput: `${roundedYears}년 필요` });
    scrollToResult();
  }

  return (
    <>
      <ModeToggle
        forwardHref="/pension/nps"
        reverseHref="/pension/nps/reverse"
        mode="reverse"
        forwardLabel="가입기간 → 연금액"
        reverseLabel="연금액 → 필요기간"
      />
      <Card>
        <SectionTitle num="1">목표 설정</SectionTitle>
        <SliderInput
          label="희망 월 연금액"
          hint={`${targetMonthly}만원/월`}
          value={targetMonthly}
          onChange={v => setTargetMonthly(v || 0)}
          min={30}
          max={300}
          step={5}
          unit="만원/월"
        />
        <SliderInput
          label="현재 나이 (만)"
          hint={`${age}세`}
          value={age}
          onChange={v => setAge(v || 0)}
          min={18}
          max={64}
          unit="세"
        />
        <SliderInput
          label="월 평균소득"
          hint={`${income}만원`}
          value={income}
          onChange={v => setIncome(v || 0)}
          min={0}
          max={700}
          step={10}
          unit="만원/월"
          className="mb-0"
        />
      </Card>

      <div id="calc-result">
        {error && (
          <div className="bg-[#FFF4E5] rounded-xl p-3.5 text-[13px] text-[#B26A00] font-semibold mb-3.5">
            {error}
          </div>
        )}

        {result && (
          <>
            <div className="text-lg font-extrabold mt-4 mb-3 px-1">역산 결과</div>
            <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
              <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 bg-[var(--primary-weak)] text-[var(--primary-dark)]">
                {result.startAge}세부터 수령
              </span>
              <div className="text-center py-2">
                <div className="text-sm font-bold text-[var(--sub)]">필요 가입기간</div>
                <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">
                  {result.years}<span className="text-base font-bold ml-1">년</span>
                </div>
                <div className="text-sm text-[var(--sub)]">
                  월 {won(result.monthlyCheck)} 수령 가능
                </div>
              </div>
              <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
                <ResultRow label="목표 연금액" value={`${targetMonthly}만원/월`} />
                <ResultRow label="월 소득 기준" value={`${income}만원`} />
                <ResultRow label="수급 개시 연령" value={`${result.startAge}세 (${result.birthYear}년생)`} />
                <ResultRow label="예상 시작 나이" value={`현재 ${age}세 + ${result.years}년 = ${age + result.years}세`} />
              </div>
            </div>

            {result.lateWarning && (
              <div className="bg-[#FFF4E5] rounded-xl p-3.5 text-[13px] text-[#B26A00] font-semibold mb-3.5">
                현재 나이({age}세)에서 {result.years}년 납입하면 {age + result.years}세까지 납입해야 합니다.
                연금 수급 개시 연령({result.startAge}세)을 넘으므로, 소득을 높이거나 일찍 시작하는 것을 고려해보세요.
              </div>
            )}
          </>
        )}
      </div>

      <SavePrompt />
      {result && <ShareButtons title="국민연금 역산 결과" />}

      {!result && !error && (
        <Card className="text-center text-[var(--sub)] text-sm py-8">
          버튼을 누르면 필요한 가입기간을 역산해 드려요.
        </Card>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          &quot;국민연금 월 100만원 받으려면 몇 년을 넣어야 하지?&quot; 이런 질문에 답하는 역방향 계산기예요.
          목표 금액을 정하면 필요한 가입기간을 수치 해석으로 정확하게 역산합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">최대 얼마까지 받을 수 있나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">
              45년 가입 기준으로 소득에 따라 월 최대 약 200만원대까지 가능하지만, 현실적으로는 30~40년 가입이 일반적이에요.
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">소득이 올라가면 연금도 비례해서 오르나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">
              기준소득월액 상한(637만원)까지만 반영돼요. 그 이상 소득은 연금 산정에 포함되지 않습니다.
            </div>
          </div>
        </div>
      </Card>

      <CtaButton label="필요 가입기간 역산하기" onClick={calc} />
    </>
  );
}
