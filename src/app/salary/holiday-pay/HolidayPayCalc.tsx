'use client';

import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import ResultPanel from '@/components/ResultPanel';
import ResultRow from '@/components/ResultRow';
import ShareButtons from '@/components/ShareButtons';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import { getParams, setParams } from '@/utils/params';
import { calcWeeklyHolidayPay, type HolidayPayResult } from '@/utils/holidayPay';
import {
  MINIMUM_WAGE_YEARS,
  minimumWageOf,
  WEEKLY_HOLIDAY_MIN_HOURS,
  WEEKS_PER_MONTH,
} from '@/data/labor';
import { CURRENT_YEAR } from '@/data/constants';

type InputMode = 'daily' | 'weekly';

const REASON_TEXT: Record<string, { title: string; detail: string }> = {
  'under-15-hours': {
    title: '주휴수당 지급 대상이 아닙니다',
    detail: `1주 소정근로시간이 ${WEEKLY_HOLIDAY_MIN_HOURS}시간 미만이면 주휴수당이 발생하지 않습니다. 연차와 퇴직금도 같은 기준이 적용됩니다.`,
  },
  absence: {
    title: '이번 주는 주휴수당이 발생하지 않습니다',
    detail: '주휴수당은 그 주의 소정근로일을 모두 개근해야 발생합니다. 결근이 있으면 그 주에 한해 지급 의무가 없습니다.',
  },
  'no-hours': {
    title: '근무시간을 입력해 주세요',
    detail: '1주 소정근로시간이 0입니다.',
  },
};

export default function HolidayPayCalc() {
  const [mode, setMode] = useState<InputMode>('daily');
  const [state, setState] = useState({
    hourly: minimumWageOf(CURRENT_YEAR),
    dailyHours: 6,
    weekDays: 3,
    weeklyHoursDirect: 18,
    year: CURRENT_YEAR,
  });
  const [attended, setAttended] = useState(true);
  const [result, setResult] = useState<HolidayPayResult | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  /* URL 쿼리에서 초기값 복원. 브라우저 전용 값이라 effect 안에서만 읽을 수 있다. */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const p = getParams();
    if (!Object.keys(p).length) return;
    setState(prev => ({
      ...prev,
      ...(p.hourly ? { hourly: +p.hourly } : {}),
      ...(p.dailyHours ? { dailyHours: +p.dailyHours } : {}),
      ...(p.weekDays ? { weekDays: +p.weekDays } : {}),
      ...(p.weeklyHours ? { weeklyHoursDirect: +p.weeklyHours } : {}),
      ...(p.year ? { year: +p.year } : {}),
    }));
    if (p.mode === 'weekly') setMode('weekly');
    if (p.attended === 'false') setAttended(false);
    setAutoCalc(true);
  }, []);

  useEffect(() => {
    if (autoCalc) { calculate(); setAutoCalc(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCalc]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const update = (key: keyof typeof state, val: number) =>
    setState(prev => ({ ...prev, [key]: val }));

  const weeklyHours = mode === 'daily'
    ? (state.dailyHours || 0) * (state.weekDays || 0)
    : (state.weeklyHoursDirect || 0);

  function calculate() {
    const hours = mode === 'daily'
      ? (state.dailyHours || 0) * (state.weekDays || 0)
      : (state.weeklyHoursDirect || 0);

    setResult(calcWeeklyHolidayPay({
      hourlyWage: state.hourly || 0,
      weeklyHours: hours,
      isFullAttendance: attended,
      year: state.year,
    }));

    setParams({
      hourly: state.hourly,
      ...(mode === 'daily'
        ? { dailyHours: state.dailyHours, weekDays: state.weekDays }
        : { weeklyHours: state.weeklyHoursDirect }),
      mode,
      attended: String(attended),
      year: state.year,
    });
    scrollToResult();
  }

  const numberField = (
    label: string,
    value: number,
    key: keyof typeof state,
    unit: string,
    hint?: string,
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          value={value === 0 ? '' : value}
          onChange={e => update(key, e.target.value === '' ? 0 : +e.target.value)}
          className="flex-1 min-w-0 px-3.5 py-3 rounded-xl border border-[var(--line)] text-base font-bold text-[var(--ink)] outline-none focus:border-[var(--primary)]"
        />
        <span className="text-sm font-bold text-[var(--sub)] flex-none">{unit}</span>
      </div>
      {hint && <p className="text-xs text-[var(--sub)] mt-1.5 m-0">{hint}</p>}
    </div>
  );

  return (
    <>
      <Card>
        <SectionTitle num="1">근무 조건</SectionTitle>

        {/* 연도 선택 — 최저임금 비교 기준 */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">기준 연도</label>
          <div className="flex gap-1.5">
            {MINIMUM_WAGE_YEARS.map(y => (
              <button
                key={y}
                type="button"
                onClick={() => update('year', y)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  state.year === y
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--bg)] text-[var(--sub)]'
                }`}
              >
                {y}년
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--sub)] mt-1.5 m-0">
            최저시급 {won(minimumWageOf(state.year))} 기준으로 미달 여부를 확인합니다.
          </p>
        </div>

        {numberField('시급', state.hourly, 'hourly', '원')}

        {/* 입력 방식 전환 */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">근무시간 입력 방식</label>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setMode('daily')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                mode === 'daily' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--sub)]'
              }`}
            >
              요일수 × 시간
            </button>
            <button
              type="button"
              onClick={() => setMode('weekly')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                mode === 'weekly' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--sub)]'
              }`}
            >
              주 시간 직접 입력
            </button>
          </div>
        </div>

        {mode === 'daily' ? (
          <>
            {numberField('1일 근무시간', state.dailyHours, 'dailyHours', '시간')}
            {numberField('주당 근무일수', state.weekDays, 'weekDays', '일')}
          </>
        ) : (
          numberField('1주 소정근로시간', state.weeklyHoursDirect, 'weeklyHoursDirect', '시간')
        )}

        <div className="bg-[var(--bg)] rounded-xl p-3 mb-4 text-sm">
          <span className="text-[var(--sub)] font-semibold">1주 소정근로시간 </span>
          <strong className="text-[var(--ink)]">{weeklyHours}시간</strong>
          {weeklyHours > 0 && weeklyHours < WEEKLY_HOLIDAY_MIN_HOURS && (
            <span className="text-[#E5484D] font-bold"> · 15시간 미만</span>
          )}
        </div>

        {/* 개근 여부 */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">해당 주 개근 여부</label>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setAttended(true)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                attended ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--sub)]'
              }`}
            >
              개근했어요
            </button>
            <button
              type="button"
              onClick={() => setAttended(false)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                !attended ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--sub)]'
              }`}
            >
              결근이 있어요
            </button>
          </div>
          <p className="text-xs text-[var(--sub)] mt-1.5 m-0">
            지각·조퇴는 결근이 아닙니다. 소정근로일에 출근하지 않은 날이 있을 때만 결근입니다.
          </p>
        </div>

        <CtaButton label="주휴수당 계산하기" onClick={calculate} />
      </Card>

      {result && (
        <>
          <Card>
            <SectionTitle num="2">판정 결과</SectionTitle>

            {result.eligible ? (
              <>
                <div className="bg-[#E6F8F0] rounded-xl p-3.5 mb-4">
                  <div className="text-sm font-extrabold text-[var(--green)] mb-1">
                    ✓ 주휴수당 지급 대상입니다
                  </div>
                  <p className="text-[13px] text-[#4E5968] leading-relaxed m-0">
                    1주 소정근로시간 {result.weeklyHours}시간으로 15시간 이상이고, 해당 주를 개근했습니다.
                    사업장 규모와 관계없이 지급해야 합니다.
                  </p>
                </div>

                <ResultPanel
                  label="주휴수당 (1주)"
                  value={won(result.weeklyPay)}
                  sub={`주휴시간 ${result.holidayHours}시간 × 시급 ${won(result.hourlyWage)}`}
                  size="lg"
                  className="mb-4"
                />

                <ResultRow label="주휴시간" value={`${result.holidayHours}시간`} />
                <ResultRow label="주휴수당 (주)" value={won(result.weeklyPay)} />
                <ResultRow label="주휴수당 (월 환산)" value={won(result.monthlyPay)} bold />
                <ResultRow label="주휴수당 포함 실질 시급" value={won(result.effectiveHourlyWage)} bold separator />

                {result.cappedByMaxHours && (
                  <div className="bg-[#FFF4E5] rounded-xl p-3.5 mt-4">
                    <div className="text-sm font-bold text-[#B86E00] mb-1">주휴시간은 8시간이 상한입니다</div>
                    <p className="text-[13px] text-[#4E5968] leading-relaxed m-0">
                      주 {result.weeklyHours}시간을 일해도 소정근로시간은 1주 40시간을 넘을 수 없어
                      (근로기준법 제50조) 주휴시간은 8시간에서 멈춥니다.
                      40시간 초과분은 주휴가 아니라 <strong>연장근로</strong>로 따로 계산해야 합니다.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-[#FFE5E5] rounded-xl p-3.5">
                <div className="text-sm font-extrabold text-[#E5484D] mb-1">
                  {REASON_TEXT[result.reason ?? 'no-hours'].title}
                </div>
                <p className="text-[13px] text-[#4E5968] leading-relaxed m-0">
                  {REASON_TEXT[result.reason ?? 'no-hours'].detail}
                </p>
              </div>
            )}

            {result.belowMinimumWage && (
              <div className="bg-[#FFE5E5] rounded-xl p-3.5 mt-4">
                <div className="text-sm font-extrabold text-[#E5484D] mb-1">⚠️ 최저임금 미달입니다</div>
                <p className="text-[13px] text-[#4E5968] leading-relaxed m-0">
                  입력하신 시급이 {state.year}년 최저시급 {won(result.minimumWage)}보다 낮습니다.
                  최저임금에 미달하는 근로계약은 그 부분이 무효이며, 최저임금과 같은 금액을 지급한 것으로 봅니다.
                  차액을 청구할 수 있습니다.
                </p>
              </div>
            )}
          </Card>

          <Card>
            <SectionTitle num="3">월 급여 환산</SectionTitle>
            <ResultRow label="기본 임금 (월)" value={won(result.monthlyBasePay)} />
            <ResultRow label="주휴수당 (월)" value={won(result.monthlyPay)} />
            <ResultRow label="합계" value={won(result.monthlyTotalPay)} bold separator />

            <div className="bg-[var(--bg)] rounded-xl p-3.5 mt-4 text-[13px] text-[var(--ink)] leading-relaxed">
              <div className="font-bold mb-1.5">계산식</div>
              <div>주휴시간 = (1주 소정근로시간 ÷ 40) × 8 (최대 8시간)</div>
              <div>주휴수당 = 주휴시간 × 시급</div>
              <div>1개월 평균 주수 = 365 ÷ 7 ÷ 12 = {WEEKS_PER_MONTH.toFixed(4)}주</div>
              <div>월 환산 = (1주 소정근로시간 + 주휴시간) × {WEEKS_PER_MONTH.toFixed(4)} × 시급</div>
            </div>

            {result.eligible && result.weeklyHours === 40 && (
              <p className="text-xs text-[var(--sub)] leading-relaxed mt-3 m-0">
                고용노동부 고시 월 환산액({won(209 * result.hourlyWage)})과
                약간 다를 수 있습니다. 고시는 48시간 × 4.3452주 = 208.57시간을 <strong>209시간으로 반올림</strong>해
                쓰기 때문입니다. 둘 다 통용되는 값이며, 급여명세서가 209시간 기준이면 그쪽이 맞습니다.
              </p>
            )}

            <ShareButtons title="주휴수당 계산 결과" />
          </Card>
        </>
      )}

      <div className="bg-[var(--bg)] rounded-xl p-3.5 text-xs text-[var(--sub)] leading-relaxed mb-3.5">
        입력값은 브라우저에서만 계산되며 서버로 전송되지 않습니다.
        이 계산은 <strong>참고용 추정치</strong>로 실제 지급액과 다를 수 있습니다.
        교대제·격주 근무·단시간 근로자의 소정근로일 산정처럼 사안마다 판단이 갈리는 부분이 있으니,
        금액이 크거나 분쟁이 예상되면 공인노무사 상담 또는 고용노동부 상담(☎ 1350)을 권합니다.
      </div>
    </>
  );
}
