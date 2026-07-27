'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ShareButtons from '@/components/ShareButtons';

function formatDate(d: Date) {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function getDayOfWeek(d: Date) {
  return ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
}

function diffDays(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function addYears(d: Date, n: number) {
  const r = new Date(d);
  r.setFullYear(r.getFullYear() + n);
  return r;
}

export default function AnniversaryCalc() {
  const [startStr, setStartStr] = useState('');

  const result = useMemo(() => {
    if (!startStr) return null;
    const start = new Date(startStr + 'T00:00:00');
    if (isNaN(start.getTime())) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysSinceStart = diffDays(start, today) + 1;

    const dayMilestones = [100, 200, 300, 500, 1000, 2000, 3000].map(d => {
      const date = addDays(start, d - 1);
      const dday = diffDays(today, date);
      return { label: `${d}일`, days: d, date, dday, passed: dday < 0, isToday: dday === 0 };
    });

    const yearMilestones = [1, 2, 3, 5, 10].map(y => {
      const date = addYears(start, y);
      const dday = diffDays(today, date);
      return { label: `${y}주년`, years: y, date, dday, passed: dday < 0, isToday: dday === 0 };
    });

    const allMilestones = [
      ...dayMilestones.map(m => ({ ...m, type: 'day' as const })),
      ...yearMilestones.map(m => ({ ...m, type: 'year' as const })),
    ].sort((a, b) => a.date.getTime() - b.date.getTime());

    const nextMilestone = allMilestones.find(m => m.dday >= 0);

    return { start, daysSinceStart, dayMilestones, yearMilestones, allMilestones, nextMilestone };
  }, [startStr]);

  return (
    <>
      <Card>
        <SectionTitle num="1">시작 날짜</SectionTitle>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">사귄 날짜 (시작일)</label>
          <input type="date" value={startStr} onChange={e => setStartStr(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
        </div>
      </Card>

      {result && (
        <div id="calc-result">
          <div className="text-lg font-extrabold mt-4 mb-3 px-1">💕 기념일 계산 결과</div>
          <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
            <div className="text-center py-2">
              <div className="text-5xl mb-2">💕</div>
              <div className="text-sm font-bold text-[var(--sub)]">만난 지</div>
              <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{result.daysSinceStart}일째</div>
              <div className="text-sm text-[var(--sub)]">{formatDate(result.start)} ({getDayOfWeek(result.start)}) ~</div>
            </div>

            {result.nextMilestone && (
              <div className="mt-3 bg-[var(--primary-bg)] rounded-xl p-3 text-center">
                <div className="text-xs text-[var(--sub)] font-bold">다음 기념일</div>
                <div className="text-base font-extrabold text-[var(--primary-dark)] mt-1">
                  {result.nextMilestone.isToday ? `오늘이 ${result.nextMilestone.label}!` : `${result.nextMilestone.label}까지 D-${result.nextMilestone.dday}`}
                </div>
                <div className="text-xs text-[var(--sub)] mt-0.5">{formatDate(result.nextMilestone.date)} ({getDayOfWeek(result.nextMilestone.date)}요일)</div>
              </div>
            )}

            <div className="mt-4 border-t border-[var(--line)] pt-3.5">
              <div className="text-xs font-bold text-[var(--sub)] mb-2.5">일 수 기념일</div>
              <div className="flex flex-col gap-2">
                {result.dayMilestones.map(m => (
                  <div key={m.label} className={`flex items-center justify-between rounded-xl p-3 ${m.passed ? 'bg-[#F0F0F0]' : m.isToday ? 'bg-[#FFF0F0]' : 'bg-[var(--bg)]'}`}>
                    <div className="flex items-center gap-2">
                      {m.passed ? <span className="text-[var(--green)] text-lg">&#10003;</span> : m.isToday ? <span className="text-lg">🎉</span> : <span className="text-lg">💝</span>}
                      <div>
                        <div className={`text-sm font-bold ${m.passed ? 'text-[var(--sub)]' : ''}`}>{m.label}</div>
                        <div className="text-[11px] text-[var(--sub)]">{formatDate(m.date)} ({getDayOfWeek(m.date)})</div>
                      </div>
                    </div>
                    <div className={`text-sm font-extrabold ${m.passed ? 'text-[var(--sub)]' : m.isToday ? 'text-[#E5484D]' : 'text-[var(--primary-dark)]'}`}>
                      {m.isToday ? 'D-Day!' : m.dday > 0 ? `D-${m.dday}` : '지남'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t border-[var(--line)] pt-3.5">
              <div className="text-xs font-bold text-[var(--sub)] mb-2.5">주년 기념일</div>
              <div className="flex flex-col gap-2">
                {result.yearMilestones.map(m => (
                  <div key={m.label} className={`flex items-center justify-between rounded-xl p-3 ${m.passed ? 'bg-[#F0F0F0]' : m.isToday ? 'bg-[#FFF0F0]' : 'bg-[var(--bg)]'}`}>
                    <div className="flex items-center gap-2">
                      {m.passed ? <span className="text-[var(--green)] text-lg">&#10003;</span> : m.isToday ? <span className="text-lg">🎉</span> : <span className="text-lg">🎂</span>}
                      <div>
                        <div className={`text-sm font-bold ${m.passed ? 'text-[var(--sub)]' : ''}`}>{m.label}</div>
                        <div className="text-[11px] text-[var(--sub)]">{formatDate(m.date)} ({getDayOfWeek(m.date)})</div>
                      </div>
                    </div>
                    <div className={`text-sm font-extrabold ${m.passed ? 'text-[var(--sub)]' : m.isToday ? 'text-[#E5484D]' : 'text-[var(--primary-dark)]'}`}>
                      {m.isToday ? 'D-Day!' : m.dday > 0 ? `D-${m.dday}` : '지남'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {result && <ShareButtons title="기념일 계산 결과" />}

      {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">시작 날짜를 입력하면 기념일을 자동 계산합니다.</Card>}

      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">100일, 200일, 1000일 기념일 언제인지 자동으로 알려드려요. 사귄 날을 1일로 세는 한국식 기준이에요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 기념일은 사귄 날을 1일로 세나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 1월 1일에 사귀면 4월 10일이 100일이에요.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 1000일은 몇 년인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 약 2년 8~9개월이에요. 시작일에 따라 달라지는데 여기서 바로 확인할 수 있어요.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">기념일 계산은 사귄 날을 1일로 세는 한국식 기준입니다.</div>
      </footer>
    </>
  );
}
