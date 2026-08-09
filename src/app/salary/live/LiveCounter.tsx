'use client';

import { useState, useEffect, useRef } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function LiveCounter() {
  const [salary, setSalary] = useState(4500);
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds since start
  const [startTime, setStartTime] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 연봉 기준 초당 급여 (근무일 기준: 연 252일, 일 8시간)
  const workSecondsPerYear = 252 * 8 * 3600;
  const perSecond = ((salary || 0) * 10000) / workSecondsPerYear;
  const perMinute = perSecond * 60;
  const perHour = perSecond * 3600;
  const perDay = (salary || 0) * 10000 / 252;

  const earned = perSecond * elapsed;

  const start = () => {
    setStarted(true);
    setStartTime(Date.now());
    setElapsed(0);
  };

  const reset = () => {
    setStarted(false);
    setElapsed(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!started) return;
    intervalRef.current = setInterval(() => {
      setElapsed((Date.now() - startTime) / 1000);
    }, 50); // 20fps for smooth counter
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [started, startTime]);

  const fmtMoney = (n: number) => {
    if (n >= 10000) return `${Math.floor(n / 10000).toLocaleString()}만 ${Math.floor(n % 10000).toLocaleString()}`;
    return n < 1 ? n.toFixed(4) : n < 100 ? n.toFixed(2) : Math.floor(n).toLocaleString();
  };

  const fmtTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    if (h > 0) return `${h}시간 ${m}분 ${s}초`;
    if (m > 0) return `${m}분 ${s}초`;
    return `${s}초`;
  };

  // 재미 비교 데이터
  const comparisons = [
    { item: '☕ 아메리카노', price: 4500, icon: '☕' },
    { item: '🍜 점심 한 끼', price: 10000, icon: '🍜' },
    { item: '🚕 택시 기본요금', price: 4800, icon: '🚕' },
    { item: '🎬 영화 1편', price: 15000, icon: '🎬' },
    { item: '🍗 치킨 1마리', price: 22000, icon: '🍗' },
    { item: '📱 넷플릭스 1달', price: 17000, icon: '📱' },
  ];

  return (
    <>
      {!started ? (
        <>
          <Card>
            <SectionTitle num="💰">연봉 입력</SectionTitle>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">세전 연봉 <span className="text-xs text-[var(--sub)] font-medium ml-1">{salary.toLocaleString()}만원</span></label>
              <div className="flex items-center gap-2.5">
                <input type="number" value={salary} onChange={e => setSalary(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
                <span className="text-sm font-bold text-[var(--sub)]">만원</span>
              </div>
              <input type="range" min={2000} max={15000} step={100} value={salary} onChange={e => setSalary(+e.target.value)} className="w-full mt-3.5" />
            </div>

            {/* 미리보기 */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
                <div className="text-[10px] text-[var(--sub)] font-bold">초당</div>
                <div className="text-lg font-extrabold text-[var(--primary-dark)]">{perSecond.toFixed(2)}원</div>
              </div>
              <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
                <div className="text-[10px] text-[var(--sub)] font-bold">분당</div>
                <div className="text-lg font-extrabold text-[var(--primary-dark)]">{Math.round(perMinute).toLocaleString()}원</div>
              </div>
              <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
                <div className="text-[10px] text-[var(--sub)] font-bold">시간당</div>
                <div className="text-lg font-extrabold text-[var(--primary-dark)]">{Math.round(perHour).toLocaleString()}원</div>
              </div>
              <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
                <div className="text-[10px] text-[var(--sub)] font-bold">일당</div>
                <div className="text-lg font-extrabold text-[var(--primary-dark)]">{Math.round(perDay).toLocaleString()}원</div>
              </div>
            </div>

            <button onClick={start} className="w-full py-4 border-0 rounded-xl bg-[var(--primary)] text-white text-lg font-extrabold cursor-pointer shadow-[var(--shadow-h)] transition-all hover:bg-[var(--primary-dark)] active:scale-[.985]">
              💰 카운터 시작하기
            </button>
          </Card>
        </>
      ) : (
        <>
          {/* 실시간 카운터 */}
          <Card className="!p-6">
            <div className="text-center">
              <div className="text-xs font-bold text-[var(--sub)] mb-1">지금까지 번 돈</div>
              <div className="text-[48px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-tight tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                ₩{fmtMoney(earned)}
              </div>
              <div className="text-sm text-[var(--sub)] mt-2">경과 시간: {fmtTime(elapsed)}</div>

              {/* 실시간 증가 표시 */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 bg-[var(--green)] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[var(--green)]">초당 {perSecond.toFixed(2)}원 증가 중</span>
              </div>
            </div>
          </Card>

          {/* 재미 비교 */}
          <Card>
            <SectionTitle num="🎯">지금까지 번 돈으로...</SectionTitle>
            <div className="flex flex-col gap-2">
              {comparisons.map(c => {
                const count = earned / c.price;
                const canBuy = count >= 1;
                return (
                  <div key={c.item} className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${canBuy ? 'bg-[var(--green-weak)]' : 'bg-[var(--bg)]'}`}>
                    <span className="text-sm font-semibold">{c.item}</span>
                    <span className={`text-sm font-extrabold ${canBuy ? 'text-[var(--green)]' : 'text-[var(--sub)]'}`}>
                      {count >= 1 ? `${Math.floor(count)}개 가능` : `${(count * 100).toFixed(0)}%`}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 시간대별 수입 */}
          <Card>
            <SectionTitle num="⏰">활동별 수입</SectionTitle>
            <div className="flex flex-col gap-2 text-[13.5px]">
              {[
                ['🚶 화장실 다녀오기 (5분)', perMinute * 5],
                ['☕ 커피 타임 (15분)', perMinute * 15],
                ['🍽️ 점심시간 (1시간)', perHour],
                ['📊 회의 (2시간)', perHour * 2],
                ['😴 낮잠 (20분)', perMinute * 20],
                ['📱 유튜브 보기 (10분)', perMinute * 10],
              ].map(([label, amount]) => (
                <div key={label as string} className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2">
                  <span className="text-[var(--sub)] font-semibold">{label as string}</span>
                  <span className="font-bold text-[var(--primary-dark)]">{Math.round(amount as number).toLocaleString()}원</span>
                </div>
              ))}
            </div>
          </Card>

          <button onClick={reset} className="w-full py-3 mt-3 border-[1.5px] border-[var(--line)] rounded-xl bg-white text-sm font-bold text-[var(--sub)] cursor-pointer hover:bg-[var(--bg)]">
            ↩ 리셋하고 다시 설정
          </button>
        </>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-2">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">초당 얼마 벌고 있는지 실시간으로 보여드려요. 화장실 갔다 오는 5분 동안에도 돈은 벌리고 있거든요.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 세전 기준인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 세전 연봉 기준이에요. 실수령 기준으로 보려면 연봉 실수령액 계산기를 먼저 이용해보세요.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 근무일수 252일은 어떤 기준인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 연 365일에서 주말과 공휴일을 뺀 평균 근무일수예요. 회사마다 다를 수 있어요.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">재미용 계산이며, 실제 급여와 다를 수 있습니다.</div>
      </footer>
    </>
  );
}
