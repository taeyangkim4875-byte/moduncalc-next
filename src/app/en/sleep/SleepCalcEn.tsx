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
  const period = h < 12 ? 'AM' : 'PM';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${String(m).padStart(2, '0')} ${period}`;
}

function getSleepHours(cycles: number): string {
  const totalMin = cycles * CYCLE_MIN;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function getRecommendation(cycles: number): { label: string; color: string } {
  if (cycles <= 3) return { label: 'Insufficient', color: '#E5484D' };
  if (cycles === 4) return { label: 'Minimum', color: '#F59E0B' };
  if (cycles === 5) return { label: 'Recommended', color: '#10B981' };
  return { label: 'Optimal', color: '#059669' };
}

export default function SleepCalcEn() {
  const [mode, setMode] = useState<Mode>('sleep');
  const [inputH, setInputH] = useState(23);
  const [inputM, setInputM] = useState(0);
  const [fallAsleepMin, setFallAsleepMin] = useState(15);

  const results = useMemo(() => {
    const inputMin = (inputH || 0) * 60 + (inputM || 0);
    const fallAsleep = fallAsleepMin || 0;

    if (mode === 'sleep') {
      const sleepStart = inputMin + fallAsleep;
      return CYCLES.map((c) => {
        const wakeMin = sleepStart + c * CYCLE_MIN;
        return { cycles: c, time: formatTime(wakeMin), sleepHours: getSleepHours(c), rec: getRecommendation(c) };
      });
    } else {
      return [...CYCLES].reverse().map((c) => {
        const bedMin = inputMin - (c * CYCLE_MIN) - fallAsleep;
        return { cycles: c, time: formatTime(bedMin), sleepHours: getSleepHours(c), rec: getRecommendation(c) };
      });
    }
  }, [mode, inputH, inputM, fallAsleepMin]);

  return (
    <>
      {/* Mode Selection */}
      <Card className="!p-3">
        <div className="flex gap-1">
          <button
            onClick={() => { setMode('sleep'); setInputH(23); setInputM(0); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${mode === 'sleep' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
          >
            I want to sleep at...
          </button>
          <button
            onClick={() => { setMode('wake'); setInputH(7); setInputM(0); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${mode === 'wake' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
          >
            I need to wake up at...
          </button>
        </div>
      </Card>

      {/* Input */}
      <Card>
        <SectionTitle num="1">{mode === 'sleep' ? 'Bedtime' : 'Wake-up Time'}</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">{mode === 'sleep' ? 'What time are you going to bed?' : 'What time do you need to wake up?'}</label>
            <div className="flex gap-2 items-center">
              <input type="number" min={0} max={23} value={inputH} onChange={(e) => setInputH(+e.target.value)} className="flex-1 py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums text-center" />
              <span className="text-sm font-bold text-[var(--sub)]">:</span>
              <input type="number" min={0} max={59} value={inputM} onChange={(e) => setInputM(+e.target.value)} className="flex-1 py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums text-center" />
              <span className="text-xs font-bold text-[var(--sub)]">(24h)</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">Time to fall asleep</label>
            <div className="flex gap-2">
              {[10, 15, 20, 30].map((m) => (
                <button
                  key={m}
                  onClick={() => setFallAsleepMin(m)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${fallAsleepMin === m ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
                >
                  {m} min
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card className="!p-5">
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">
            {mode === 'sleep' ? 'Recommended Wake-up Times' : 'Recommended Bedtimes'}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {results.map((r, i) => (
            <div key={i} className={`rounded-xl p-4 text-center ${r.rec.label === 'Recommended' ? 'bg-[var(--primary-weak)] border-2 border-[var(--primary)]' : 'bg-[var(--bg)]'}`}>
              <div className="text-[28px] font-extrabold text-[var(--ink)] tracking-tight leading-none tabular-nums">
                {r.time}
              </div>
              <div className="flex justify-center items-center gap-2 mt-2">
                <span className="text-xs text-[var(--sub)] font-bold">{r.sleepHours} ({r.cycles} cycles)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold text-white" style={{ backgroundColor: r.rec.color }}>
                  {r.rec.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-[var(--sub)] text-center mt-3">
          Based on 90-min cycles &middot; Includes {fallAsleepMin} min to fall asleep &middot; Adults need 7-9 hours (5 cycles)
        </div>
      </Card>

      {/* Sleep Duration by Age */}
      <Card>
        <SectionTitle num="2">Recommended Sleep by Age</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b-2 border-[var(--line)]">
                <th className="py-2 text-left text-[var(--sub)] font-bold">Age Group</th>
                <th className="py-2 text-right text-[var(--sub)] font-bold">Sleep</th>
                <th className="py-2 text-right text-[var(--sub)] font-bold">Cycles</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Newborn (0-3 mo)', '14-17h', '-'],
                ['Infant (4-11 mo)', '12-15h', '-'],
                ['Toddler (1-2 yr)', '11-14h', '-'],
                ['Preschool (3-5 yr)', '10-13h', '-'],
                ['School age (6-13 yr)', '9-11h', '6-7'],
                ['Teen (14-17 yr)', '8-10h', '5-6'],
                ['Young adult (18-25)', '7-9h', '5-6'],
                ['Adult (26-64)', '7-9h', '5-6'],
                ['Older adult (65+)', '7-8h', '5'],
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
        <div className="text-[10px] text-[var(--sub)] mt-2">Source: National Sleep Foundation</div>
      </Card>

      {/* Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Sleep Guide</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Understanding Sleep Cycles:</b> Sleep consists of repeating ~90-minute cycles of NREM stages 1-3 and REM sleep. Deep sleep (NREM 3) is for physical recovery, while REM sleep handles memory consolidation and learning. Waking at the end of a cycle (after REM) feels refreshing; waking during deep sleep causes grogginess.</p>
          <p><b>Improving Sleep Quality:</b> The most important factor is a consistent sleep schedule - go to bed and wake up at the same time daily. Avoid caffeine, alcohol, and heavy meals 2 hours before bed. Keep your bedroom dark and cool (65-68°F / 18-20°C). Replace screen time with reading or stretching in the last hour before sleep.</p>
          <p><b>Effects of Sleep Deprivation:</b> Chronic sleep deprivation is linked to reduced concentration, weakened immunity, obesity, and increased cardiovascular risk. Sleeping under 6 hours for 2+ weeks causes cognitive decline similar to 48 hours without sleep. Weekend catch-up sleep does not fully repay sleep debt.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. What is a sleep cycle?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. A sleep cycle is approximately 90 minutes of alternating NREM and REM sleep. You go through 4-6 cycles per night. Waking at the end of a cycle feels more refreshing than waking mid-cycle.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. How many hours of sleep do adults need?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. The National Sleep Foundation recommends 7-9 hours for adults aged 18-64, and 7-8 hours for those 65+. Five 90-minute cycles (7.5 hours) is often considered the sweet spot.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. Why does the calculator account for falling asleep time?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. It typically takes 10-20 minutes to fall asleep. Without this buffer, sleep cycle timing would be off, causing you to wake during deep sleep and feel groggy instead of refreshed.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          Sleep cycles vary between individuals (80-120 minutes). This calculator uses the average of 90 minutes and is for reference only.
        </div>
      </footer>
    </>
  );
}
