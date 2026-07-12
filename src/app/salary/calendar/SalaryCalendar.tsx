'use client';

import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';

function getWorkDaysInMonth(year: number, month: number) {
  let count = 0;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const day = new Date(year, month, d).getDay();
    if (day !== 0 && day !== 6) count++;
  }
  return count;
}

function getWorkDaysBetween(year: number, month: number, fromDay: number, toDay: number) {
  let count = 0;
  for (let d = fromDay; d <= toDay; d++) {
    const day = new Date(year, month, d).getDay();
    if (day !== 0 && day !== 6) count++;
  }
  return count;
}

export default function SalaryCalendar() {
  const [salary, setSalary] = useState(4500);
  const [payday, setPayday] = useState(25);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('salary-calendar');
    if (saved) {
      try {
        const { salary: s, payday: p } = JSON.parse(saved);
        if (s) setSalary(s);
        if (p) setPayday(p);
      } catch {}
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('salary-calendar', JSON.stringify({ salary, payday }));
    }
  }, [salary, payday, mounted]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  const monthlyPay = (salary * 10000) / 12;
  const workDaysTotal = getWorkDaysInMonth(year, month);
  const dailyPay = monthlyPay / workDaysTotal;

  // D-day 계산
  let nextPayday: Date;
  const paydayThisMonth = Math.min(payday, new Date(year, month + 1, 0).getDate());
  if (day <= paydayThisMonth) {
    nextPayday = new Date(year, month, paydayThisMonth);
  } else {
    const nextMonth = month + 1;
    const nextYear = nextMonth > 11 ? year + 1 : year;
    const actualMonth = nextMonth > 11 ? 0 : nextMonth;
    const paydayNext = Math.min(payday, new Date(nextYear, actualMonth + 1, 0).getDate());
    nextPayday = new Date(nextYear, actualMonth, paydayNext);
  }

  const diffMs = nextPayday.getTime() - today.getTime();
  const dDay = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // 이번 기간 동안 번 돈 계산
  let lastPayday: number;
  if (day > paydayThisMonth) {
    lastPayday = paydayThisMonth;
  } else {
    const prevMonth = month - 1;
    const prevYear = prevMonth < 0 ? year - 1 : year;
    const actualPrevMonth = prevMonth < 0 ? 11 : prevMonth;
    lastPayday = Math.min(payday, new Date(prevYear, actualPrevMonth + 1, 0).getDate());
  }

  const startDay = day > paydayThisMonth ? paydayThisMonth + 1 : 1;
  const workDaysElapsed = getWorkDaysBetween(year, month, startDay, day);
  const earnedSoFar = workDaysElapsed * dailyPay;
  const progress = Math.min((earnedSoFar / monthlyPay) * 100, 100);

  // 달력 데이터
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=일
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  if (!mounted) return null;

  return (
    <>
      <Card>
        <SectionTitle num="⚙️">설정</SectionTitle>
        <div className="mb-3">
          <label className="block text-sm font-bold mb-2">
            세전 연봉 <span className="text-xs text-[var(--sub)] font-medium ml-1">{salary.toLocaleString()}만원</span>
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="number"
              value={salary}
              onChange={e => setSalary(+e.target.value || 0)}
              className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"
            />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input type="range" min={2000} max={15000} step={100} value={salary} onChange={e => setSalary(+e.target.value)} className="w-full mt-3.5" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">월급날</label>
          <div className="flex items-center gap-2.5">
            <select
              value={payday}
              onChange={e => setPayday(+e.target.value)}
              className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] bg-white"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>{d}일</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* D-day 히어로 */}
      <Card className="!p-6">
        <div className="text-center">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">월급날까지</div>
          <div className="text-[56px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-tight">
            {dDay === 0 ? '🎉 오늘!' : `D-${dDay}`}
          </div>
          <div className="text-sm text-[var(--sub)] mt-2">
            {nextPayday.getMonth() + 1}월 {nextPayday.getDate()}일 ({weekdays[nextPayday.getDay()]})
          </div>
          {dDay <= 3 && dDay > 0 && (
            <div className="mt-3 text-sm font-bold text-[var(--green)]">곧 월급날이에요! 💪</div>
          )}
          {dDay === 0 && (
            <div className="mt-3 text-sm font-bold text-[var(--green)]">오늘 월급이 들어옵니다! 🎊</div>
          )}
        </div>
      </Card>

      {/* 수입 진행률 */}
      <Card>
        <SectionTitle num="📊">이번 달 수입 현황</SectionTitle>
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="font-semibold text-[var(--sub)]">진행률</span>
            <span className="font-extrabold text-[var(--primary-dark)]">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full h-4 bg-[var(--bg)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold">지금까지 번 돈</div>
            <div className="text-lg font-extrabold text-[var(--primary-dark)]">{Math.round(earnedSoFar).toLocaleString()}원</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold">이번 달 월급</div>
            <div className="text-lg font-extrabold text-[var(--primary-dark)]">{Math.round(monthlyPay).toLocaleString()}원</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold">오늘 일당</div>
            <div className="text-lg font-extrabold text-[var(--primary-dark)]">{Math.round(dailyPay).toLocaleString()}원</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold">근무일 경과</div>
            <div className="text-lg font-extrabold text-[var(--primary-dark)]">{workDaysElapsed}/{workDaysTotal}일</div>
          </div>
        </div>
      </Card>

      {/* 미니 달력 */}
      <Card>
        <SectionTitle num="📅">{year}년 {monthNames[month]}</SectionTitle>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {weekdays.map(w => (
            <div key={w} className={`font-bold py-1 ${w === '일' ? 'text-red-400' : w === '토' ? 'text-blue-400' : 'text-[var(--sub)]'}`}>{w}</div>
          ))}
          {calendarDays.map((d, i) => {
            if (d === null) return <div key={`empty-${i}`} />;
            const isToday = d === day;
            const isPayday = d === paydayThisMonth;
            const isWeekend = new Date(year, month, d).getDay() === 0 || new Date(year, month, d).getDay() === 6;
            const isPast = d < day && !isWeekend;

            return (
              <div
                key={d}
                className={`py-1.5 rounded-lg text-[12px] font-semibold relative
                  ${isToday ? 'bg-[var(--primary)] text-white' : ''}
                  ${isPayday && !isToday ? 'bg-[var(--green-weak)] text-[var(--green)] ring-1 ring-[var(--green)]' : ''}
                  ${isPast && !isToday && !isPayday ? 'text-[var(--sub)]' : ''}
                  ${isWeekend && !isToday ? 'text-[var(--line)]' : ''}
                  ${!isToday && !isPayday && !isWeekend && !isPast ? 'text-[var(--ink)]' : ''}
                `}
              >
                {d}
                {isPayday && !isToday && <span className="absolute -top-0.5 -right-0.5 text-[8px]">💰</span>}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-3 text-[11px] text-[var(--sub)]">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[var(--primary)]" /> 오늘</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[var(--green-weak)] ring-1 ring-[var(--green)]" /> 월급날</span>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 월급 달력이란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          월급날까지 남은 날을 카운트다운하고, 이번 달 지금까지 얼마를 벌었는지 시각적으로 보여줍니다.
          매일 접속하면 진행률이 올라가는 걸 확인할 수 있어요.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          설정한 연봉과 월급날은 브라우저에 저장되어 다음에 방문해도 유지됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 근무일은 어떻게 계산하나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 해당 월의 주말(토·일)을 제외한 평일 수를 기준으로 합니다. 공휴일은 포함하지 않습니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 데이터는 어디에 저장되나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 브라우저의 로컬 스토리지에만 저장되며, 서버로 전송되지 않습니다.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          세전 연봉 기준이며, 실제 수령액과 다를 수 있습니다.
        </div>
      </footer>
    </>
  );
}
