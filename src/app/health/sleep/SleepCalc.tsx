'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Mode = 'sleep' | 'wake';

const CYCLES = [4, 5, 6] as const;
const CYCLE_MIN = 90;

function formatTime(totalMin: number): string {
  const normalized = ((totalMin % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  const period = h < 12 ? '오전' : '오후';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${period} ${displayH}:${String(m).padStart(2, '0')}`;
}

function getSleepHours(cycles: number): string {
  const totalMin = cycles * CYCLE_MIN;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m > 0 ? `${h}시간 ${m}분` : `${h}시간`;
}

function getRecommendation(cycles: number): { label: string; color: string } {
  if (cycles <= 3) return { label: '부족', color: '#E5484D' };
  if (cycles === 4) return { label: '최소', color: '#F59E0B' };
  if (cycles === 5) return { label: '권장', color: '#10B981' };
  return { label: '충분', color: '#059669' };
}

export default function SleepCalc() {
  const [mode, setMode] = useState<Mode>('sleep');
  const [inputH, setInputH] = useState(23);
  const [inputM, setInputM] = useState(0);
  const [fallAsleepMin, setFallAsleepMin] = useState(15);

  const results = useMemo(() => {
    const inputMin = (inputH || 0) * 60 + (inputM || 0);
    const fallAsleep = fallAsleepMin || 0;

    if (mode === 'sleep') {
      // 잠드는 시간 기준 → 기상 시간 추천
      const sleepStart = inputMin + fallAsleep;
      return CYCLES.map((c) => {
        const wakeMin = sleepStart + c * CYCLE_MIN;
        return { cycles: c, time: formatTime(wakeMin), sleepHours: getSleepHours(c), rec: getRecommendation(c) };
      });
    } else {
      // 기상 시간 기준 → 취침 시간 추천
      return [...CYCLES].reverse().map((c) => {
        const bedMin = inputMin - (c * CYCLE_MIN) - fallAsleep;
        return { cycles: c, time: formatTime(bedMin), sleepHours: getSleepHours(c), rec: getRecommendation(c) };
      });
    }
  }, [mode, inputH, inputM, fallAsleepMin]);

  return (
    <>
      {/* 모드 선택 */}
      <Card className="!p-3">
        <div className="flex gap-1">
          <button
            onClick={() => { setMode('sleep'); setInputH(23); setInputM(0); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${mode === 'sleep' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
          >
            지금 자면?
          </button>
          <button
            onClick={() => { setMode('wake'); setInputH(7); setInputM(0); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${mode === 'wake' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
          >
            이 시간에 일어나야 하면?
          </button>
        </div>
      </Card>

      {/* 입력 */}
      <Card>
        <SectionTitle num="1">{mode === 'sleep' ? '취침 시간' : '기상 시간'}</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">{mode === 'sleep' ? '몇 시에 자나요?' : '몇 시에 일어나야 하나요?'}</label>
            <div className="flex gap-2 items-center">
              <input type="number" min={0} max={23} value={inputH} onChange={(e) => setInputH(+e.target.value)} className="flex-1 py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums text-center" />
              <span className="text-sm font-bold text-[var(--sub)]">시</span>
              <input type="number" min={0} max={59} value={inputM} onChange={(e) => setInputM(+e.target.value)} className="flex-1 py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums text-center" />
              <span className="text-sm font-bold text-[var(--sub)]">분</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">잠드는 데 걸리는 시간</label>
            <div className="flex gap-2">
              {[10, 15, 20, 30].map((m) => (
                <button
                  key={m}
                  onClick={() => setFallAsleepMin(m)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${fallAsleepMin === m ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
                >
                  {m}분
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 결과 */}
      <Card className="!p-5">
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">
            {mode === 'sleep' ? '추천 기상 시간' : '추천 취침 시간'}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {results.map((r, i) => (
            <div key={i} className={`rounded-xl p-4 text-center ${r.rec.label === '권장' ? 'bg-[var(--primary-weak)] border-2 border-[var(--primary)]' : 'bg-[var(--bg)]'}`}>
              <div className="text-[28px] font-extrabold text-[var(--ink)] tracking-tight leading-none tabular-nums">
                {r.time}
              </div>
              <div className="flex justify-center items-center gap-2 mt-2">
                <span className="text-xs text-[var(--sub)] font-bold">{r.sleepHours} ({r.cycles}사이클)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold text-white" style={{ backgroundColor: r.rec.color }}>
                  {r.rec.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-[var(--sub)] text-center mt-3">
          수면 주기(90분) 기준 · 잠드는 시간 {fallAsleepMin}분 포함 · 성인 권장 7~9시간(5사이클)
        </div>
      </Card>

      {/* 나이별 권장 수면시간 */}
      <Card>
        <SectionTitle num="2">나이별 권장 수면시간</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b-2 border-[var(--line)]">
                <th className="py-2 text-left text-[var(--sub)] font-bold">연령대</th>
                <th className="py-2 text-right text-[var(--sub)] font-bold">권장 수면</th>
                <th className="py-2 text-right text-[var(--sub)] font-bold">수면 주기</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['신생아 (0~3개월)', '14~17시간', '-'],
                ['영아 (4~11개월)', '12~15시간', '-'],
                ['유아 (1~2세)', '11~14시간', '-'],
                ['미취학 (3~5세)', '10~13시간', '-'],
                ['학령기 (6~13세)', '9~11시간', '6~7사이클'],
                ['청소년 (14~17세)', '8~10시간', '5~6사이클'],
                ['청년 (18~25세)', '7~9시간', '5~6사이클'],
                ['성인 (26~64세)', '7~9시간', '5~6사이클'],
                ['노인 (65세 이상)', '7~8시간', '5사이클'],
              ].map(([age, time, cycle]) => (
                <tr key={age as string} className="border-b border-[var(--line)]">
                  <td className="py-1.5 font-semibold">{age}</td>
                  <td className="py-1.5 text-right font-bold">{time}</td>
                  <td className="py-1.5 text-right text-[var(--sub)]">{cycle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-[10px] text-[var(--sub)] mt-2">출처: 미국수면재단(National Sleep Foundation)</div>
      </Card>

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">수면 가이드</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>수면 주기란:</b> 수면은 NREM(비렘수면) 1~3단계와 REM(렘수면)으로 구성된 약 90분 단위의 사이클이 반복됩니다. NREM 3단계(깊은 수면)에서는 신체 회복이, REM 수면에서는 기억 정리와 학습이 이루어집니다. 수면 주기가 완료되는 시점(REM 수면 직후)에 일어나면 개운하고, 깊은 수면 중 일어나면 몽롱합니다.</p>
          <p><b>수면의 질 높이는 방법:</b> 매일 같은 시간에 자고 일어나는 규칙적인 수면 습관이 가장 중요합니다. 취침 2시간 전 카페인, 알코올, 과식을 피하고, 침실은 어둡고 시원하게(18~20도) 유지하세요. 자기 전 1시간은 스마트폰, TV 등 블루라이트를 차단하고 독서나 스트레칭으로 대체하면 좋습니다.</p>
          <p><b>수면 부족의 영향:</b> 만성적인 수면 부족은 집중력 저하, 면역력 약화, 비만, 심혈관 질환 위험 증가와 연관됩니다. 하루 6시간 미만 수면이 2주 이상 지속되면 48시간 수면 박탈과 비슷한 인지 저하가 나타납니다. 주말 몰아자기는 수면 부채를 완전히 해소하지 못하므로 평일 수면을 충분히 확보하세요.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 수면 주기란 무엇인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 수면 주기는 NREM(비렘수면)과 REM(렘수면)이 반복되는 약 90분 단위의 사이클입니다. 한 밤에 4~6회 반복되며, 수면 주기가 끝나는 시점에 일어나면 개운합니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 성인의 권장 수면 시간은 얼마인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 미국수면재단(NSF) 기준 성인(18~64세)은 7~9시간, 65세 이상은 7~8시간이 권장됩니다. 수면 주기(90분) 기준으로 5사이클(7.5시간)이 가장 이상적입니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 잠드는 데 걸리는 시간은 왜 고려하나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 보통 잠자리에 든 후 실제로 잠들기까지 평균 10~20분이 걸립니다. 이 시간을 고려하지 않으면 수면 주기 계산이 부정확해져 개운하게 일어나기 어렵습니다.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          수면 주기는 개인차가 있으며, 실제로는 80~120분 범위입니다. 이 계산기는 평균 90분을 기준으로 하며 참고용입니다.
        </div>
      </footer>
    </>
  );
}
