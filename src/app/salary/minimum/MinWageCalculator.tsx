'use client';

import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';

const MIN_WAGE_2026 = 10320;
const MIN_WAGE_2027 = 10700;

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
  const [autoCalc, setAutoCalc] = useState(false);

  /* URL 쿼리스트링(외부 시스템)에서 초기값을 복원하는 구간.
     브라우저 전용 값이라 렌더 중에는 읽을 수 없고(정적 프리렌더와 hydration 불일치),
     effect 안에서 state를 채우는 방법뿐이라 아래 두 effect에 한해 규칙을 해제한다. */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const p = getParams();
    if (!Object.keys(p).length) return;
    setState(prev => ({
      ...prev,
      ...(p.hourly ? { hourly: +p.hourly } : {}),
      ...(p.dailyHours ? { dailyHours: +p.dailyHours } : {}),
      ...(p.weekDays ? { weekDays: +p.weekDays } : {}),
    }));
    setAutoCalc(true);
  }, []);

  useEffect(() => {
    if (autoCalc) { calculate(); setAutoCalc(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCalc]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const update = (key: string, val: number) =>
    setState(prev => ({ ...prev, [key]: val }));

  function calculate() {
    const hourly = state.hourly || 0, dailyHours = state.dailyHours || 0, weekDays = state.weekDays || 0;
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
    setParams({ hourly, dailyHours, weekDays });
    scrollToResult();
  }

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
              onChange={e => update('hourly', +e.target.value)}
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

          {/* ── 2027 최저시급 비교 ── */}
          <Card>
            <SectionTitle num="5">2027년 최저임금 확정 (내년)</SectionTitle>
            <div className="bg-[var(--primary-weak)] rounded-xl p-3.5 mb-3 text-center">
              <div className="text-xs font-bold text-[var(--primary-dark)]">2027년 최저시급</div>
              <div className="text-[28px] font-extrabold text-[var(--primary-dark)]">{MIN_WAGE_2027.toLocaleString()}원</div>
              <div className="text-xs text-[var(--sub)] mt-1">2026년 대비 +{(MIN_WAGE_2027 - MIN_WAGE_2026).toLocaleString()}원 ({((MIN_WAGE_2027 - MIN_WAGE_2026) / MIN_WAGE_2026 * 100).toFixed(1)}% 인상)</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px]">
                <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-xs text-[var(--sub)] font-bold">구분</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">2026년</th><th className="py-2 text-right text-xs text-[var(--primary-dark)] font-bold">2027년</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">차이</th></tr></thead>
                <tbody>
                  <tr className="border-b border-[var(--line)]"><td className="py-2 font-semibold">시급</td><td className="py-2 text-right">{MIN_WAGE_2026.toLocaleString()}원</td><td className="py-2 text-right font-bold text-[var(--primary-dark)]">{MIN_WAGE_2027.toLocaleString()}원</td><td className="py-2 text-right text-[var(--green)] font-bold">+{(MIN_WAGE_2027 - MIN_WAGE_2026).toLocaleString()}원</td></tr>
                  <tr className="border-b border-[var(--line)]"><td className="py-2 font-semibold">일급 (8h)</td><td className="py-2 text-right">{won(MIN_WAGE_2026 * 8)}</td><td className="py-2 text-right font-bold text-[var(--primary-dark)]">{won(MIN_WAGE_2027 * 8)}</td><td className="py-2 text-right text-[var(--green)] font-bold">+{won((MIN_WAGE_2027 - MIN_WAGE_2026) * 8)}</td></tr>
                  <tr className="border-b border-[var(--line)]"><td className="py-2 font-semibold">월급 (209h)</td><td className="py-2 text-right">{won(MIN_WAGE_2026 * 209)}</td><td className="py-2 text-right font-bold text-[var(--primary-dark)]">{won(MIN_WAGE_2027 * 209)}</td><td className="py-2 text-right text-[var(--green)] font-bold">+{won((MIN_WAGE_2027 - MIN_WAGE_2026) * 209)}</td></tr>
                  <tr className="border-b border-[var(--line)]"><td className="py-2 font-semibold">연봉</td><td className="py-2 text-right">{won(MIN_WAGE_2026 * 209 * 12)}</td><td className="py-2 text-right font-bold text-[var(--primary-dark)]">{won(MIN_WAGE_2027 * 209 * 12)}</td><td className="py-2 text-right text-[var(--green)] font-bold">+{won((MIN_WAGE_2027 - MIN_WAGE_2026) * 209 * 12)}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="text-[11px] text-[var(--sub)] mt-2 leading-relaxed">2027년 최저임금은 2027.1.1부터 적용됩니다. 최저임금위원회 2026.7.15 의결.</div>
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
        <h2 className="text-base font-extrabold mb-3">왜 이 계산기를 만들었냐면</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2.5">
          <p>알바할 때 가장 궁금한 게 주휴수당이에요. 주 15시간 넘게 일하면 받을 수 있는데, 모르고 못 받는 사람이 많더라고요. 사장님이 알아서 안 줘요.</p>
          <p>2026년 최저시급은 10,320원이고, 주 40시간 풀타임이면 월급이 약 215만원 정도 됩니다. 근데 여기에 주휴수당이 포함된 건지 아닌 건지, 계산이 은근 헷갈리거든요.</p>
          <p>솔직히 최저시급 받으면서 주휴수당까지 안 주는 곳이 꽤 있어요. 법적으로는 3년 이하 징역이나 2,000만원 벌금인데, 몰라서 못 받는 경우가 대부분이죠. 본인이 직접 계산해보고 확인하는 게 제일 확실합니다.</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">이것도 궁금하실 거예요</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">주휴수당 포함하면 실질 시급이 얼마예요?</div><div className="text-sm text-[#4E5968] leading-relaxed">주 40시간 기준으로 주휴 8시간이 추가되니까, 실질 시급은 약 12,384원이에요. 시급 10,320원인데 실제로는 48시간분을 받는 셈이거든요. 알바 구할 때 &apos;주휴수당 포함 시급&apos;이라고 쓰여 있으면 이 금액 맞는지 꼭 확인해보세요.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">주 15시간 미만이면 진짜 주휴수당 못 받나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">네, 아쉽긴 하지만 법적으로 주 15시간 미만은 주휴수당 대상이 아니에요. 연차나 퇴직금도 안 나옵니다. 그래서 일부러 주 14시간으로 쪼개서 계약하는 곳도 있는데, 이런 경우 노동청에 상담받아보는 게 좋아요.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">수습기간이면 최저시급보다 적게 받아도 되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">1년 이상 계약일 때만 수습 3개월간 90%(9,288원)까지 깎을 수 있어요. 근데 단순노무직(편의점, 카페, 식당 서빙 등)은 수습 감액 자체가 안 됩니다. 이것도 모르고 당하는 분들이 꽤 있더라고요.</div></div>
        </div>
      </Card>

      <CtaButton label="계산하기" onClick={calculate} />
    </>
  );
}
