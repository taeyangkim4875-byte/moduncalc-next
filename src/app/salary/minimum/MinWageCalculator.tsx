'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';

const MIN_WAGE_2026 = 10320;

interface CalcResult {
  hourly: number;
  dailyHours: number;
  weekDays: number;
  weeklyHours: number;
  juhuyu: number;
  juhuyu_hours: number;
  basePay: number;
  juhuyuPay: number;
  totalMonth: number;
  isBelowMin: boolean;
}

export default function MinWageCalculator() {
  const [state, setState] = useState({
    hourly: 10320,
    dailyHours: 8,
    weekDays: 5,
  });
  const [result, setResult] = useState<CalcResult | null>(null);

  const update = (key: string, val: number) =>
    setState(prev => ({ ...prev, [key]: val }));

  const calculate = () => {
    const { hourly, dailyHours, weekDays } = state;
    const weeklyHours = dailyHours * weekDays;

    /* 주휴수당: 주 15시간 이상 근무 시 발생 */
    const qualifies = weeklyHours >= 15;
    const juhuyu_hours = qualifies ? (weeklyHours / 40) * 8 : 0;
    const juhuyu = qualifies ? hourly * juhuyu_hours : 0;

    /* 월 환산: (주 소정근로시간 + 주휴시간) × 4.345주 × 시급 */
    const weeksPerMonth = 4.345;
    const basePay = hourly * weeklyHours * weeksPerMonth;
    const juhuyuPay = juhuyu * weeksPerMonth;
    const totalMonth = basePay + juhuyuPay;

    const isBelowMin = hourly < MIN_WAGE_2026;

    setResult({
      hourly,
      dailyHours,
      weekDays,
      weeklyHours,
      juhuyu,
      juhuyu_hours,
      basePay,
      juhuyuPay,
      totalMonth,
      isBelowMin,
    });
    scrollToResult();
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">근무 조건</SectionTitle>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            시급 <span className="text-xs text-[var(--sub)] font-medium ml-1">{state.hourly.toLocaleString()}원</span>
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="number"
              value={state.hourly}
              onChange={e => update('hourly', +e.target.value || 0)}
              className="flex-1 w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold text-[var(--ink)] outline-none bg-white focus:border-[var(--primary)]"
            />
            <span className="text-sm font-bold text-[var(--sub)]">원</span>
          </div>
          <input
            type="range"
            min={5000}
            max={30000}
            step={10}
            value={state.hourly}
            onChange={e => update('hourly', +e.target.value)}
            className="w-full mt-3.5"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">일 근무시간</label>
          <div className="flex flex-wrap gap-2">
            {[4, 5, 6, 7, 8].map(n => (
              <button
                key={n}
                onClick={() => update('dailyHours', n)}
                className={`flex-1 min-w-[54px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${
                  state.dailyHours === n
                    ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]'
                    : 'bg-white border-[var(--line)] text-[var(--sub)] hover:border-[#C9D0D6]'
                }`}
              >
                {n}시간
              </button>
            ))}
          </div>
        </div>

        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">주 근무일수</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <button
                key={n}
                onClick={() => update('weekDays', n)}
                className={`flex-1 min-w-[54px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${
                  state.weekDays === n
                    ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]'
                    : 'bg-white border-[var(--line)] text-[var(--sub)] hover:border-[#C9D0D6]'
                }`}
              >
                {n}일
              </button>
            ))}
          </div>
        </div>
      </Card>

      {result ? (
        <div id="calc-result">
          {/* ── 최저시급 경고 ── */}
          {result.isBelowMin && (
            <div className="bg-[#FFF4E5] rounded-xl p-3.5 mb-3.5 text-[13px] text-[#B26A00] font-semibold leading-relaxed">
              입력하신 시급 {result.hourly.toLocaleString()}원은 2026년 최저시급 {MIN_WAGE_2026.toLocaleString()}원보다 낮습니다.
              최저임금법에 따라 최저시급 이상을 지급해야 합니다.
            </div>
          )}

          {/* ── 월 예상 급여 ── */}
          <Card>
            <SectionTitle num="2">월 예상 급여</SectionTitle>
            <div className="text-3xl font-extrabold tracking-tight">
              {won(result.totalMonth)}
            </div>
            <div className="text-[12.5px] text-[var(--sub)] mt-1 mb-3.5">
              세전 기준 · 주 {result.weeklyHours}시간 근무
            </div>

            <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">기본급</span>
                <span className="font-bold">{won(result.basePay)}</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">주휴수당</span>
                <span className="font-bold text-[var(--primary)]">{won(result.juhuyuPay)}</span>
              </div>
            </div>
          </Card>

          {/* ── 주휴수당 상세 ── */}
          <Card>
            <SectionTitle num="3">주휴수당 상세</SectionTitle>
            {result.weeklyHours >= 15 ? (
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-[13.5px]">
                  <span className="text-[var(--sub)] font-semibold">주 소정근로시간</span>
                  <span className="font-bold">{result.weeklyHours}시간</span>
                </div>
                <div className="flex justify-between items-center text-[13.5px]">
                  <span className="text-[var(--sub)] font-semibold">주휴 시간</span>
                  <span className="font-bold">{result.juhuyu_hours.toFixed(1)}시간</span>
                </div>
                <div className="flex justify-between items-center text-[13.5px]">
                  <span className="text-[var(--sub)] font-semibold">주휴수당 (주)</span>
                  <span className="font-bold text-[var(--primary)]">{won(result.juhuyu)}</span>
                </div>
                <div className="text-xs text-[var(--sub)] mt-1 leading-relaxed bg-[var(--primary-weak)] rounded-xl p-3.5">
                  주휴수당 = 시급 x (주 소정근로시간 / 40) x 8시간
                </div>
              </div>
            ) : (
              <div className="text-sm text-[var(--sub)] leading-relaxed">
                주 15시간 미만 근무 시 주휴수당이 발생하지 않습니다.
                <div className="text-xs mt-2 bg-[#FFF4E5] rounded-xl p-3.5 text-[#B26A00] font-medium">
                  현재 주 {result.weeklyHours}시간 — 주 15시간 이상 근무해야 주휴수당을 받을 수 있어요.
                </div>
              </div>
            )}
          </Card>

          {/* ── 2026 최저시급 기준 ── */}
          <Card>
            <SectionTitle num="4">2026 최저임금 기준</SectionTitle>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">최저시급</span>
                <span className="font-bold">{MIN_WAGE_2026.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">일급 (8시간)</span>
                <span className="font-bold">{won(MIN_WAGE_2026 * 8)}</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">월급 (209시간)</span>
                <span className="font-bold">{won(MIN_WAGE_2026 * 209)}</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">연봉 환산</span>
                <span className="font-bold">{won(MIN_WAGE_2026 * 209 * 12)}</span>
              </div>
            </div>
          </Card>

          <div className="text-[11.5px] text-[var(--sub)] leading-relaxed text-center py-1 mt-0.5">
            추정치예요. 실제 급여와 다를 수 있습니다.
          </div>
        </div>
      ) : (
        <Card className="text-center text-[var(--sub)] text-sm py-8">
          계산하기 버튼을 누르면 월 예상 급여와 주휴수당을 알려드려요.
        </Card>
      )}
      {result && <ShareButtons title="최저시급 계산 결과" />}

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <b className="text-[#6B7684]">계산 가정</b><br />
        · 2026년 최저시급 {MIN_WAGE_2026.toLocaleString()}원 기준<br />
        · 월 환산: (주 소정근로시간 + 주휴시간) x 4.345주<br />
        · 주휴수당: 주 15시간 이상 근무 시 발생
        <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1] leading-relaxed">
          세전 기준이며, 4대보험·세금 공제 전 금액입니다.
        </div>
      </footer>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 최저시급·주휴수당이란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">최저임금은 국가가 근로자의 생활 안정을 위해 정한 시간당 최소 급여입니다. 2026년 최저시급은 10,320원이며, 이를 월급으로 환산하면 약 215만 6,880원(주 40시간, 209시간 기준)입니다. 사업주가 최저임금 미만으로 급여를 지급하면 3년 이하 징역 또는 2,000만원 이하 벌금에 처해질 수 있습니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">주휴수당은 주 15시간 이상 근무하고 약정된 근무일을 모두 출근한 근로자에게 유급 휴일(주휴일)에 대해 지급하는 수당입니다. 주휴 시간은 &apos;주 소정근로시간 / 40 x 8시간&apos;으로 계산되며, 주 40시간 근무자의 경우 하루 8시간분이 추가 지급됩니다.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 주휴수당 포함 시급은 얼마인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 2026년 기준 주 40시간 근무 시 주휴수당을 포함한 실질 시급은 약 12,384원입니다. 주휴 8시간이 추가되어 주 48시간분의 급여를 40시간에 나누어 환산한 금액입니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 주 15시간 미만 근무하면 주휴수당이 없나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 근로기준법상 주 소정근로시간이 15시간 미만인 초단시간 근로자에게는 주휴수당 지급 의무가 없습니다. 또한 연차유급휴가, 퇴직금 규정도 적용되지 않습니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 수습기간에도 최저임금을 받나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 1년 이상 근로계약을 체결한 경우, 수습 시작일부터 3개월간 최저임금의 90%(2026년 기준 9,288원)까지 감액할 수 있습니다. 단, 단순노무직은 수습 감액이 적용되지 않으며 처음부터 100% 지급해야 합니다.</div></div>
        </div>
      </Card>

      <CtaButton label="계산하기" onClick={calculate} />
    </>
  );
}
