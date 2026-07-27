'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Tab = 'diff' | 'add' | 'work';

function parseTime(h: number, m: number): number {
  return (h || 0) * 60 + (m || 0);
}

function formatMinutes(totalMin: number): string {
  const h = Math.floor(Math.abs(totalMin) / 60);
  const m = Math.abs(totalMin) % 60;
  const sign = totalMin < 0 ? '-' : '';
  return `${sign}${h}시간 ${m}분`;
}

function formatDecimal(totalMin: number): string {
  return (totalMin / 60).toFixed(1);
}

export default function TimeCalc() {
  const [tab, setTab] = useState<Tab>('diff');

  // 시간 차이
  const [startH, setStartH] = useState(9);
  const [startM, setStartM] = useState(0);
  const [endH, setEndH] = useState(18);
  const [endM, setEndM] = useState(0);

  // 시간 더하기/빼기
  const [baseH, setBaseH] = useState(9);
  const [baseM, setBaseM] = useState(0);
  const [addH, setAddH] = useState(3);
  const [addM, setAddM] = useState(30);
  const [addMode, setAddMode] = useState<'add' | 'sub'>('add');

  // 근무시간
  const [workStartH, setWorkStartH] = useState(9);
  const [workStartM, setWorkStartM] = useState(0);
  const [workEndH, setWorkEndH] = useState(18);
  const [workEndM, setWorkEndM] = useState(0);
  const [breakMin, setBreakMin] = useState(60);
  const [hourlyWage, setHourlyWage] = useState(10030);

  const diffResult = useMemo(() => {
    let diff = parseTime(endH, endM) - parseTime(startH, startM);
    if (diff < 0) diff += 24 * 60; // 자정 넘김
    return diff;
  }, [startH, startM, endH, endM]);

  const addResult = useMemo(() => {
    const base = parseTime(baseH, baseM);
    const delta = parseTime(addH, addM);
    let result = addMode === 'add' ? base + delta : base - delta;
    result = ((result % (24 * 60)) + 24 * 60) % (24 * 60);
    const rH = Math.floor(result / 60);
    const rM = result % 60;
    return { h: rH, m: rM };
  }, [baseH, baseM, addH, addM, addMode]);

  const workResult = useMemo(() => {
    let totalMin = parseTime(workEndH, workEndM) - parseTime(workStartH, workStartM);
    if (totalMin < 0) totalMin += 24 * 60;
    const actualMin = Math.max(0, totalMin - (breakMin || 0));
    const weeklyMin = actualMin * 5;
    const monthlyPay = Math.round((actualMin / 60) * (hourlyWage || 0));
    const weeklyPay = Math.round((weeklyMin / 60) * (hourlyWage || 0));

    // 야간근로 시간 (22~06시)
    const start = parseTime(workStartH, workStartM);
    const end = parseTime(workEndH, workEndM);
    let nightMin = 0;
    const nightStart = 22 * 60;
    const nightEnd = 6 * 60;

    if (end < start) {
      // 자정 넘김
      // start ~ 24:00
      if (start < nightStart) nightMin += Math.min(24 * 60, end > 0 ? 24 * 60 : end) - nightStart;
      else nightMin += 24 * 60 - start;
      // 00:00 ~ end
      nightMin += Math.min(end, nightEnd);
    } else {
      // 같은 날
      if (start < nightEnd) nightMin += Math.min(end, nightEnd) - start;
      if (end > nightStart) nightMin += end - Math.max(start, nightStart);
    }
    nightMin = Math.max(0, nightMin);

    // 연장근로 (8시간 초과분)
    const overMin = Math.max(0, actualMin - 8 * 60);

    return { totalMin, actualMin, weeklyMin, monthlyPay, weeklyPay, nightMin, overMin };
  }, [workStartH, workStartM, workEndH, workEndM, breakMin, hourlyWage]);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'diff', label: '시간 차이' },
    { key: 'add', label: '더하기/빼기' },
    { key: 'work', label: '근무시간' },
  ];

  const timeInput = (label: string, h: number, setH: (v: number) => void, m: number, setM: (v: number) => void) => (
    <div>
      <label className="text-xs font-bold text-[var(--sub)] block mb-1">{label}</label>
      <div className="flex gap-2 items-center">
        <input type="number" min={0} max={23} value={h} onChange={(e) => setH(+e.target.value)} className="flex-1 py-2 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] tabular-nums text-center" />
        <span className="text-sm font-bold text-[var(--sub)]">시</span>
        <input type="number" min={0} max={59} value={m} onChange={(e) => setM(+e.target.value)} className="flex-1 py-2 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] tabular-nums text-center" />
        <span className="text-sm font-bold text-[var(--sub)]">분</span>
      </div>
    </div>
  );

  return (
    <>
      {/* 탭 */}
      <Card className="!p-3">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${tab === t.key ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      {/* 시간 차이 */}
      {tab === 'diff' && (
        <>
          <Card>
            <SectionTitle num="1">시간 차이 계산</SectionTitle>
            <div className="flex flex-col gap-3">
              {timeInput('시작 시간', startH, setStartH, startM, setStartM)}
              {timeInput('종료 시간', endH, setEndH, endM, setEndM)}
            </div>
          </Card>
          <Card className="!p-5">
            <div className="text-center">
              <div className="text-xs font-bold text-[var(--sub)] mb-1">시간 차이</div>
              <div className="text-[36px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none">
                {formatMinutes(diffResult)}
              </div>
              <div className="text-sm text-[var(--sub)] font-bold mt-1">({formatDecimal(diffResult)}시간)</div>
            </div>
          </Card>
        </>
      )}

      {/* 시간 더하기/빼기 */}
      {tab === 'add' && (
        <>
          <Card>
            <SectionTitle num="2">시간 더하기 / 빼기</SectionTitle>
            <div className="flex flex-col gap-3">
              {timeInput('기준 시간', baseH, setBaseH, baseM, setBaseM)}
              <div className="flex gap-2">
                <button onClick={() => setAddMode('add')} className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${addMode === 'add' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}>+ 더하기</button>
                <button onClick={() => setAddMode('sub')} className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${addMode === 'sub' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}>- 빼기</button>
              </div>
              {timeInput(addMode === 'add' ? '더할 시간' : '뺄 시간', addH, setAddH, addM, setAddM)}
            </div>
          </Card>
          <Card className="!p-5">
            <div className="text-center">
              <div className="text-xs font-bold text-[var(--sub)] mb-1">결과 시간</div>
              <div className="text-[36px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none tabular-nums">
                {String(addResult.h).padStart(2, '0')}:{String(addResult.m).padStart(2, '0')}
              </div>
              <div className="text-sm text-[var(--sub)] font-bold mt-1">
                {baseH}시 {baseM}분 {addMode === 'add' ? '+' : '-'} {addH}시간 {addM}분
              </div>
            </div>
          </Card>
        </>
      )}

      {/* 근무시간 */}
      {tab === 'work' && (
        <>
          <Card>
            <SectionTitle num="3">근무시간 계산</SectionTitle>
            <div className="flex flex-col gap-3">
              {timeInput('출근 시간', workStartH, setWorkStartH, workStartM, setWorkStartM)}
              {timeInput('퇴근 시간', workEndH, setWorkEndH, workEndM, setWorkEndM)}
              <div>
                <label className="text-xs font-bold text-[var(--sub)] block mb-1">휴게시간 (분)</label>
                <input type="number" min={0} value={breakMin} onChange={(e) => setBreakMin(+e.target.value)} className="w-full py-2 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] tabular-nums" />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--sub)] block mb-1">시급 (원)</label>
                <input type="number" min={0} value={hourlyWage} onChange={(e) => setHourlyWage(+e.target.value)} className="w-full py-2 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] tabular-nums" />
              </div>
            </div>
          </Card>

          <Card className="!p-5">
            <div className="text-center mb-3">
              <div className="text-xs font-bold text-[var(--sub)] mb-1">실 근무시간</div>
              <div className="text-[36px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none">
                {formatMinutes(workResult.actualMin)}
              </div>
              <div className="text-sm text-[var(--sub)] font-bold mt-1">({formatDecimal(workResult.actualMin)}시간)</div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: '총 근무시간', value: formatMinutes(workResult.totalMin) },
                { label: '휴게시간', value: `${breakMin}분` },
                { label: '주간 근무(x5)', value: formatMinutes(workResult.weeklyMin) },
                { label: '연장근로', value: formatMinutes(workResult.overMin) },
              ].map((item) => (
                <div key={item.label} className="bg-[var(--bg)] rounded-xl p-2.5 text-center">
                  <div className="text-[14px] font-extrabold text-[var(--ink)] tabular-nums">{item.value}</div>
                  <div className="text-[10px] text-[var(--sub)] font-bold">{item.label}</div>
                </div>
              ))}
            </div>

            {(hourlyWage || 0) > 0 && (
              <div className="mt-3 bg-[var(--bg)] rounded-xl p-3">
                <div className="text-xs font-bold text-[var(--sub)] mb-1.5">급여 환산 (시급 {(hourlyWage || 0).toLocaleString()}원)</div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <div className="text-[15px] font-extrabold text-[var(--ink)]">{workResult.monthlyPay.toLocaleString()}원</div>
                    <div className="text-[10px] text-[var(--sub)]">일급</div>
                  </div>
                  <div>
                    <div className="text-[15px] font-extrabold text-[var(--ink)]">{workResult.weeklyPay.toLocaleString()}원</div>
                    <div className="text-[10px] text-[var(--sub)]">주급(5일)</div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </>
      )}

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">출퇴근 시간 차이나 알바 근무시간 계산할 때 편해요. 시급 넣으면 일급·주급도 바로 나와요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 야간수당은 어떻게 계산하나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 22시~06시 근로에 통상임금 50% 가산이에요. 시급 1만원이면 야간은 1.5만원이 돼요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 휴게시간은 법적으로 얼마인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 4시간 근무 시 30분, 8시간 근무 시 1시간 이상이에요. 근로시간에 포함되지 않아요.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          이 계산기는 참고용이며, 정확한 급여 계산은 근로계약서와 회사 규정을 기준으로 하세요.
        </div>
      </footer>
    </>
  );
}
