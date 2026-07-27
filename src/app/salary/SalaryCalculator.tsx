'use client';

import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won, fmtSalary } from '@/utils/format';
import { netPay, type NetPayResult } from '@/utils/tax';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';

/* ── 연령대 구간 ── */
const AGE5 = ['20~24', '25~29', '30~34', '35~39', '40~44', '45~49', '50~54', '55~59'] as const;
type AgeBand = (typeof AGE5)[number];

function ageBand(age: number): AgeBand | null {
  if (age < 20 || age >= 60) return null;
  const idx = Math.floor((age - 20) / 5);
  return AGE5[idx] ?? null;
}

/* ── 백분위 앵커 (2024 귀속 국세청 전체 근로자 기준, 연 만원) ── */
/* 전체 평균 4,500만, 중위 3,417만 (출처: 국회 기재위 박성훈 의원실) */
const PCT_ANCHORS: Record<AgeBand, [number, number, number, number, number]> = {
  '20~24': [1300, 1800, 2400, 3000, 3800],
  '25~29': [2100, 2700, 3400, 4100, 5200],
  '30~34': [2500, 3200, 4000, 5000, 6800],
  '35~39': [2600, 3400, 4400, 5600, 7800],
  '40~44': [2400, 3200, 4400, 5800, 8200],
  '45~49': [2200, 3100, 4300, 5800, 8500],
  '50~54': [2000, 2800, 4000, 5500, 8100],
  '55~59': [1800, 2500, 3500, 5000, 7500],
};

/* ── 구간별 백분위 보간 ── */
const BAND_ANCHORS = [10, 25, 50, 75, 90] as const;

function calcPercentile(band: AgeBand, salaryMan: number): number {
  const a = PCT_ANCHORS[band];
  if (salaryMan <= a[0]) return Math.max(1, (salaryMan / a[0]) * BAND_ANCHORS[0]);
  for (let i = 0; i < a.length - 1; i++) {
    if (salaryMan <= a[i + 1]) {
      const ratio = (salaryMan - a[i]) / (a[i + 1] - a[i]);
      return BAND_ANCHORS[i] + ratio * (BAND_ANCHORS[i + 1] - BAND_ANCHORS[i]);
    }
  }
  return Math.min(99, BAND_ANCHORS[4] + ((salaryMan - a[4]) / a[4]) * 10);
}

function pctLabel(p: number): string {
  if (p >= 90) return '상위 10% 이내';
  if (p >= 75) return '상위 25% 이내';
  if (p >= 50) return '중위 이상';
  if (p >= 25) return '하위 50% 이내';
  return '하위 25% 이내';
}

function pctColor(p: number): string {
  if (p >= 75) return 'var(--primary)';
  if (p >= 50) return 'var(--green)';
  return 'var(--sub)';
}

interface CalcResult {
  pay: NetPayResult;
  percentile: number | null;
  band: AgeBand | null;
}

export default function SalaryCalculator() {
  const [state, setState] = useState({
    age: 30,
    salary: 3600,
    nontax: true,
    dependents: 1,
  });
  const [result, setResult] = useState<CalcResult | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  useEffect(() => {
    const p = getParams();
    if (!Object.keys(p).length) return;
    setState(prev => ({
      ...prev,
      ...(p.age ? { age: +p.age } : {}),
      ...(p.salary ? { salary: +p.salary } : {}),
      ...(p.nontax !== undefined ? { nontax: p.nontax === 'true' } : {}),
      ...(p.dependents ? { dependents: +p.dependents } : {}),
    }));
    setAutoCalc(true);
  }, []);

  useEffect(() => {
    if (autoCalc) { calculate(); setAutoCalc(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCalc]);

  const update = (key: string, val: number | boolean) =>
    setState(prev => ({ ...prev, [key]: val }));

  const calculate = () => {
    const pay = netPay(state.salary, state.dependents, state.nontax);
    const band = ageBand(state.age);
    const percentile = band ? calcPercentile(band, state.salary) : null;
    setResult({ pay, percentile, band });
    setParams({ age: state.age, salary: state.salary, nontax: state.nontax, dependents: state.dependents });
    scrollToResult();
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">기본 정보</SectionTitle>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            나이 (만) <span className="text-xs text-[var(--sub)] font-medium ml-1">{state.age}세</span>
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="number"
              value={state.age}
              onChange={e => update('age', +e.target.value)}
              className="flex-1 w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold text-[var(--ink)] outline-none bg-white focus:border-[var(--primary)]"
            />
            <span className="text-sm font-bold text-[var(--sub)]">세</span>
          </div>
          <input
            type="range"
            min={20}
            max={59}
            step={1}
            value={state.age}
            onChange={e => update('age', +e.target.value)}
            className="w-full mt-3.5"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            연봉 (세전) <span className="text-xs text-[var(--sub)] font-medium ml-1">{fmtSalary(state.salary)}원</span>
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="number"
              value={state.salary}
              onChange={e => update('salary', +e.target.value)}
              className="flex-1 w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold text-[var(--ink)] outline-none bg-white focus:border-[var(--primary)]"
            />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input
            type="range"
            min={2000}
            max={15000}
            step={100}
            value={state.salary}
            onChange={e => update('salary', +e.target.value)}
            className="w-full mt-3.5"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">부양가족 수 (본인 포함)</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <button
                key={n}
                onClick={() => update('dependents', n)}
                className={`flex-1 min-w-[54px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${
                  state.dependents === n
                    ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]'
                    : 'bg-white border-[var(--line)] text-[var(--sub)] hover:border-[#C9D0D6]'
                }`}
              >
                {n}인
              </button>
            ))}
          </div>
        </div>

        <div className="mb-0">
          <div
            className={`flex items-center justify-between gap-3 p-3.5 border-[1.5px] rounded-xl transition-colors ${
              state.nontax
                ? 'border-[var(--primary)] bg-[var(--primary-weak)]'
                : 'border-[var(--line)]'
            }`}
          >
            <div>
              <div className="text-sm font-bold">비과세 식대 적용</div>
              <div className="text-xs text-[var(--sub)] font-medium mt-0.5">월 20만원 비과세 식대 포함</div>
            </div>
            <label className="relative w-12 h-7 cursor-pointer flex-none">
              <input
                type="checkbox"
                checked={state.nontax}
                onChange={e => update('nontax', e.target.checked)}
                className="opacity-0 w-0 h-0 absolute"
              />
              <span
                className={`absolute inset-0 rounded-full transition-colors ${
                  state.nontax ? 'bg-[var(--primary)]' : 'bg-[#D1D6DB]'
                }`}
              >
                <span
                  className={`absolute w-[22px] h-[22px] left-[3px] top-[3px] bg-white rounded-full shadow-sm transition-transform ${
                    state.nontax ? 'translate-x-5' : ''
                  }`}
                />
              </span>
            </label>
          </div>
        </div>
      </Card>

      {result ? (
        <div id="calc-result">
          {/* ── 백분위 게이지 ── */}
          {result.percentile !== null && result.band && (
            <Card>
              <SectionTitle num="✦">급여 백분위</SectionTitle>
              <div className="text-[12.5px] text-[var(--sub)] mb-3.5">
                {result.band}세 근로자 기준
              </div>

              {/* gauge bar */}
              <div className="relative h-5 bg-[#F2F4F6] rounded-full overflow-hidden mb-2">
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(result.percentile, 100)}%`,
                    background: pctColor(result.percentile),
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[var(--sub)] mb-3.5">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>

              <div className="text-center">
                <div
                  className="text-3xl font-extrabold tracking-tight"
                  style={{ color: pctColor(result.percentile) }}
                >
                  상위 {Math.max(1, Math.round(100 - result.percentile))}%
                </div>
                <div className="text-sm font-bold text-[var(--sub)] mt-1">
                  {pctLabel(result.percentile)}
                </div>
              </div>

              {/* chips */}
              <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
                {BAND_ANCHORS.map((pct, i) => (
                  <span
                    key={pct}
                    className="inline-flex items-center gap-1 text-[11px] font-extrabold py-1 px-2.5 rounded-lg bg-[var(--primary-weak)] text-[var(--primary-dark)]"
                  >
                    {pct}%: {fmtSalary(PCT_ANCHORS[result.band!][i])}원
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* ── 실수령액 결과 ── */}
          <Card>
            <SectionTitle num="2">실수령액</SectionTitle>
            <div className="text-3xl font-extrabold tracking-tight">
              월 {won(result.pay.netMonth)}
            </div>
            <div className="text-[12.5px] text-[var(--sub)] mt-1 mb-3.5">
              연 {won(result.pay.netYear)}
            </div>

            <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">세전 월급</span>
                <span className="font-bold">{won((state.salary * 10000) / 12)}</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">공제 합계</span>
                <span className="font-bold text-[#E8344E]">-{won(result.pay.deductMonth)}</span>
              </div>
            </div>
          </Card>

          {/* ── 공제 내역 ── */}
          <Card>
            <SectionTitle num="3">공제 내역 (월)</SectionTitle>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">국민연금</span>
                <span className="font-bold">{won(result.pay.np / 12)}</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">건강보험 + 장기요양</span>
                <span className="font-bold">{won(result.pay.hi / 12)}</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">고용보험</span>
                <span className="font-bold">{won(result.pay.ei / 12)}</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px] border-t border-[var(--line)] pt-2.5">
                <span className="text-[var(--sub)] font-semibold">4대보험 소계</span>
                <span className="font-bold">{won(result.pay.insurance / 12)}</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">소득세</span>
                <span className="font-bold">{won(result.pay.incomeTax / 12)}</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[var(--sub)] font-semibold">지방소득세</span>
                <span className="font-bold">{won(result.pay.localTax / 12)}</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px] border-t border-[var(--line)] pt-2.5">
                <span className="font-bold">공제 합계</span>
                <span className="font-extrabold text-[#E8344E]">-{won(result.pay.deductMonth)}</span>
              </div>
            </div>
          </Card>

          {/* ── 참고 테이블 ── */}
          {result.band && (
            <Card>
              <SectionTitle num="4">연령대별 백분위 참고표</SectionTitle>
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-[12px] text-center border-collapse">
                  <thead>
                    <tr>
                      <th className="py-2 px-1.5 text-[var(--sub)] font-bold border-b border-[var(--line)]">연령</th>
                      {BAND_ANCHORS.map(p => (
                        <th key={p} className="py-2 px-1.5 text-[var(--sub)] font-bold border-b border-[var(--line)]">
                          {p}%
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {AGE5.map(band => (
                      <tr key={band} className={band === result.band ? 'bg-[var(--primary-weak)]' : ''}>
                        <td className="py-2 px-1.5 font-bold border-b border-[var(--line)]">{band}</td>
                        {PCT_ANCHORS[band].map((v, i) => (
                          <td key={i} className="py-2 px-1.5 font-medium border-b border-[var(--line)]">
                            {fmtSalary(v)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-[11px] text-[var(--sub)] mt-2.5 leading-relaxed">
                출처: 2024 귀속 국세청 근로소득 백분위 · 전체 근로자 기준 (평균 4,500만, 중위 3,417만)
              </div>
            </Card>
          )}

          <div className="text-[11.5px] text-[var(--sub)] leading-relaxed text-center py-1 mt-0.5">
            추정치예요. 실제 급여명세서와 다를 수 있습니다.
          </div>

        </div>
      ) : (
        <Card className="text-center text-[var(--sub)] text-sm py-8">
          계산하기 버튼을 누르면 실수령액과 백분위를 알려드려요.
        </Card>
      )}
      {result && <ShareButtons title="연봉 분석 결과" />}

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <b className="text-[#6B7684]">계산 가정</b><br />
        · 2026년 4대보험 요율 적용 (국민연금 4.75%, 건강 3.595%, 고용 0.9%)<br />
        · 근로소득공제, 근로소득세액공제 반영<br />
        · 비과세 식대 월 20만원 선택 적용
        <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1] leading-relaxed">
          이 계산기는 공개된 세법·요율을 기반으로 한 추정치를 제공하며, 실제 급여와 다를 수 있습니다.
        </div>
      </footer>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 이 계산기를 만든 이유</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">연봉 협상을 앞두고 &quot;세후로 얼마를 받게 되지?&quot;가 가장 궁금했습니다. 세전 금액만 들으면 감이 안 오거든요. 4대보험에 소득세까지 빠지면 생각보다 많이 줄어들어요.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">특히 2026년부터 국민연금 보험료율이 9%에서 9.5%로 올라서 실수령액이 더 줄었습니다. 이게 월급에서 얼마나 빠지는지 바로 확인하고 싶어서 만들었어요. 연봉별로 표로 한눈에 비교할 수 있는 <a href="/salary/table" className="text-[var(--primary)] font-bold no-underline hover:underline">실수령액 표</a>도 같이 만들었습니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">연봉 5,000만원이면 월 세전 약 417만원인데, 4대보험과 세금을 빼면 실제로 받는 건 월 350만원 정도입니다. 이 차이를 모르고 있으면 지출 계획을 세울 때 문제가 생겨요.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">💡 실수령액을 늘리는 현실적인 방법</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed list-disc pl-5 flex flex-col gap-2">
          <li><b>비과세 식대(월 20만원):</b> 회사에서 별도로 지급받으면 연 240만원이 과세 대상에서 빠집니다. 안 받고 있다면 회사에 문의해보세요. 생각보다 많은 회사가 해주는데 신청을 안 해서 못 받는 경우가 있어요.</li>
          <li><b>부양가족 등록:</b> 부모님이나 배우자를 부양가족으로 등록하면 1인당 150만원씩 인적공제를 받을 수 있습니다. 연말정산 때 깜빡하기 쉬운 부분이에요.</li>
          <li><b>국민연금 상한:</b> 월 소득 659만원을 넘으면 더 이상 국민연금이 안 올라갑니다. 고소득자에게는 그나마 다행인 부분이죠.</li>
        </ul>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 세전 세후 차이가 왜 이렇게 커요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 4대보험만 9% 넘게 빠지고, 거기에 소득세·지방소득세까지 더해집니다. 연봉 5,000만원이면 약 16%가 공제돼요. 연봉이 높을수록 누진세율 때문에 공제 비율이 더 커집니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 국민연금 인상이 월급에 얼마나 영향 있어요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 2026년부터 본인 부담이 4.5%에서 4.75%로 올랐습니다. 연봉 4,000만원이면 월 약 8,000원 정도 더 빠져요. 크지 않아 보이지만 연간으로 치면 약 10만원입니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 연봉 상위 %는 정확한 건가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 국세청 근로소득 자료를 기반으로 추정한 거라 참고용입니다. 재미로 보세요. 전체 근로소득자 평균은 약 4,500만원, 중위는 3,417만원 정도예요.</div></div>
        </div>
      </Card>

      <CtaButton label="계산하기" onClick={calculate} />
    </>
  );
}
