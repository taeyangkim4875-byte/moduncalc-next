'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function KoreanAgeCalc() {
  const today = new Date();
  const [year, setYear] = useState(1995);
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const birth = new Date(year, month - 1, day);
  const hadBirthday = today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

  const internationalAge = today.getFullYear() - year - (hadBirthday ? 0 : 1);
  const koreanAge = today.getFullYear() - year + 1;
  const yearAge = today.getFullYear() - year; // 연 나이 (만 나이 without month check)

  const zodiacAnimals = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];
  const zodiacEmojis = ['🐵', '🐔', '🐶', '🐷', '🐭', '🐮', '🐯', '🐰', '🐲', '🐍', '🐴', '🐐'];
  const zodiacIndex = year % 12;
  const zodiac = zodiacAnimals[zodiacIndex];
  const zodiacEmoji = zodiacEmojis[zodiacIndex];

  return (
    <>
      <Card>
        <SectionTitle num="🎂">Your Birthday</SectionTitle>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Year</label>
            <input type="number" value={year} onChange={e => setYear(+e.target.value || 1990)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Month</label>
            <select value={month} onChange={e => setMonth(+e.target.value)} className="w-full py-3 px-2 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] bg-white text-center">
              {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Day</label>
            <input type="number" min={1} max={31} value={day} onChange={e => setDay(+e.target.value || 1)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
        </div>
      </Card>

      <Card className="!p-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">International Age</div>
            <div className="text-[36px] font-extrabold text-[var(--primary-dark)]">{internationalAge}</div>
            <div className="text-xs text-[var(--sub)]">Legal standard</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Korean Age</div>
            <div className="text-[36px] font-extrabold text-[var(--primary-dark)]">{koreanAge}</div>
            <div className="text-xs text-[var(--sub)]">Traditional (세는 나이)</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Year Age</div>
            <div className="text-[36px] font-extrabold text-[var(--primary-dark)]">{yearAge}</div>
            <div className="text-xs text-[var(--sub)]">연 나이</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Chinese Zodiac</div>
            <div className="text-[36px]">{zodiacEmoji}</div>
            <div className="text-xs text-[var(--sub)]">{zodiac}</div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 Korean Age System Explained</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>International age</b> (만 나이): Your actual age based on your birthday. This is now the official legal standard in Korea since June 2023.</p>
          <p><b>Korean age</b> (세는 나이): You start at 1 when born, and gain a year every January 1st. This means you can be 1–2 years &quot;older&quot; than your international age. Still commonly used in casual Korean conversation.</p>
          <p><b>Year age</b> (연 나이): Simply current year minus birth year. Used in some contexts like school enrollment.</p>
          <p><b>Why it matters for foreigners:</b> When Koreans ask your age, they might expect Korean age. If someone says they&apos;re &quot;30&quot; in Korean age, they could be 28 or 29 internationally. Knowing the difference helps avoid confusion.</p>
        </div>
      </Card>
    </>
  );
}
