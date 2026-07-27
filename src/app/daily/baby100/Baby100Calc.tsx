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

export default function Baby100Calc() {
  const [birthStr, setBirthStr] = useState('');

  const result = useMemo(() => {
    if (!birthStr) return null;
    const birth = new Date(birthStr + 'T00:00:00');
    if (isNaN(birth.getTime())) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysSinceBirth = diffDays(birth, today) + 1;

    const totalMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    const monthDay = today.getDate() - birth.getDate();
    const months = monthDay < 0 ? totalMonths - 1 : totalMonths;
    const days = monthDay < 0 ? (() => {
      const prev = new Date(today.getFullYear(), today.getMonth(), 0);
      return prev.getDate() + monthDay;
    })() : monthDay;

    const milestones = [
      { label: '100일', days: 100 },
      { label: '200일', days: 200 },
      { label: '돌 (365일)', days: 365 },
      { label: '500일', days: 500 },
      { label: '1000일', days: 1000 },
      { label: '2000일', days: 2000 },
    ].map(m => {
      const date = addDays(birth, m.days - 1);
      const dday = diffDays(today, date);
      return { ...m, date, dday, passed: dday < 0 };
    });

    const nextMilestone = milestones.find(m => m.dday >= 0);

    return { birth, daysSinceBirth, months, days, milestones, nextMilestone };
  }, [birthStr]);

  return (
    <>
      <Card>
        <SectionTitle num="1">아기 생년월일</SectionTitle>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">생년월일 선택</label>
          <input type="date" value={birthStr} onChange={e => setBirthStr(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
        </div>
      </Card>

      {result && (
        <div id="calc-result">
          <div className="text-lg font-extrabold mt-4 mb-3 px-1">👶 기념일 계산 결과</div>
          <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
            <div className="text-center py-2">
              <div className="text-5xl mb-2">👶</div>
              <div className="text-sm font-bold text-[var(--sub)]">태어난 지</div>
              <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{result.daysSinceBirth}일째</div>
              <div className="text-sm text-[var(--sub)]">{result.months}개월 {result.days}일</div>
            </div>

            {result.nextMilestone && (
              <div className="mt-3 bg-[var(--primary-bg)] rounded-xl p-3 text-center">
                <div className="text-xs text-[var(--sub)] font-bold">다음 기념일</div>
                <div className="text-base font-extrabold text-[var(--primary-dark)] mt-1">{result.nextMilestone.label}까지 D-{result.nextMilestone.dday}</div>
                <div className="text-xs text-[var(--sub)] mt-0.5">{formatDate(result.nextMilestone.date)} ({getDayOfWeek(result.nextMilestone.date)}요일)</div>
              </div>
            )}

            <div className="mt-4 border-t border-[var(--line)] pt-3.5">
              <div className="text-xs font-bold text-[var(--sub)] mb-2.5">주요 기념일</div>
              <div className="flex flex-col gap-2">
                {result.milestones.map(m => (
                  <div key={m.label} className={`flex items-center justify-between rounded-xl p-3 ${m.passed ? 'bg-[#F0F0F0]' : 'bg-[var(--bg)]'}`}>
                    <div className="flex items-center gap-2">
                      {m.passed ? <span className="text-[var(--green)] text-lg">&#10003;</span> : <span className="text-lg">📅</span>}
                      <div>
                        <div className={`text-sm font-bold ${m.passed ? 'text-[var(--sub)]' : ''}`}>{m.label}</div>
                        <div className="text-[11px] text-[var(--sub)]">{formatDate(m.date)} ({getDayOfWeek(m.date)})</div>
                      </div>
                    </div>
                    <div className={`text-sm font-extrabold ${m.passed ? 'text-[var(--sub)]' : m.dday === 0 ? 'text-[var(--primary)]' : 'text-[var(--primary-dark)]'}`}>
                      {m.dday === 0 ? 'D-Day!' : m.dday > 0 ? `D-${m.dday}` : '지남'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {result && <ShareButtons title="아기 기념일 계산 결과" />}

      {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">아기 생년월일을 입력하면 기념일을 자동 계산합니다.</Card>}

      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">아기 백일, 돌 날짜가 헷갈릴 때 생년월일만 넣으면 됩니다. 태어난 날을 1일로 세서 계산해요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 백일은 어떻게 세나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 태어난 날을 1일로 세서 100번째 날이에요. 1월 1일생이면 4월 10일이 백일입니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 돌과 첫 번째 생일은 같은 건가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 보통 같지만, 윤년 등에 의해 하루 차이가 날 수 있어요.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">발달 단계는 일반적인 기준이며 개인차가 있습니다. 걱정되는 부분이 있으면 소아과 전문의와 상담하세요.</div>
      </footer>
    </>
  );
}
