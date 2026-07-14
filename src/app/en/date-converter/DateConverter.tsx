'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const DAY_NAMES_KR = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const DAY_NAMES_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const HOLIDAYS_2026 = [
  { date: '2026-01-01', name: 'New Year\'s Day', kr: '신정' },
  { date: '2026-02-17', name: 'Lunar New Year (Day 1)', kr: '설날 연휴' },
  { date: '2026-02-18', name: 'Lunar New Year', kr: '설날' },
  { date: '2026-02-19', name: 'Lunar New Year (Day 3)', kr: '설날 연휴' },
  { date: '2026-03-01', name: 'Independence Movement Day', kr: '삼일절' },
  { date: '2026-05-05', name: 'Children\'s Day', kr: '어린이날' },
  { date: '2026-05-24', name: 'Buddha\'s Birthday', kr: '부처님 오신 날' },
  { date: '2026-06-06', name: 'Memorial Day', kr: '현충일' },
  { date: '2026-08-15', name: 'Liberation Day', kr: '광복절' },
  { date: '2026-09-24', name: 'Chuseok (Day 1)', kr: '추석 연휴' },
  { date: '2026-09-25', name: 'Chuseok', kr: '추석' },
  { date: '2026-09-26', name: 'Chuseok (Day 3)', kr: '추석 연휴' },
  { date: '2026-10-03', name: 'National Foundation Day', kr: '개천절' },
  { date: '2026-10-09', name: 'Hangul Day', kr: '한글날' },
  { date: '2026-12-25', name: 'Christmas', kr: '크리스마스' },
];

const ZODIAC = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];
const ZODIAC_KR = ['원숭이', '닭', '개', '돼지', '쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양'];

function pad(n: number) { return n.toString().padStart(2, '0'); }

export default function DateConverter() {
  const today = new Date();
  const [dateStr, setDateStr] = useState(`${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`);
  const [arrivalStr, setArrivalStr] = useState('');

  const date = new Date(dateStr + 'T00:00:00');
  const isValid = !isNaN(date.getTime());

  const y = isValid ? date.getFullYear() : 0;
  const m = isValid ? date.getMonth() : 0;
  const d = isValid ? date.getDate() : 0;
  const dow = isValid ? date.getDay() : 0;

  const koreanFormat = isValid ? `${y}년 ${m + 1}월 ${d}일 ${DAY_NAMES_KR[dow]}` : '-';
  const isoFormat = isValid ? `${y}-${pad(m + 1)}-${pad(d)}` : '-';
  const usFormat = isValid ? `${MONTH_NAMES[m]} ${d}, ${y}` : '-';

  const zodiacIndex = y % 12;
  const zodiac = ZODIAC[zodiacIndex];
  const zodiacKr = ZODIAC_KR[zodiacIndex];

  // Days in Korea calculation
  let daysInKorea = 0;
  if (arrivalStr) {
    const arrival = new Date(arrivalStr + 'T00:00:00');
    if (!isNaN(arrival.getTime())) {
      daysInKorea = Math.floor((today.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));
    }
  }

  // Next upcoming holiday
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  const nextHoliday = HOLIDAYS_2026.find(h => h.date >= todayStr);

  return (
    <>
      <Card>
        <SectionTitle num="1">Select a Date</SectionTitle>
        <input
          type="date"
          value={dateStr}
          onChange={e => setDateStr(e.target.value)}
          className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"
        />
      </Card>

      <Card className="!p-6">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center col-span-2">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Korean Format</div>
            <div className="text-[22px] font-extrabold text-[var(--primary-dark)] mt-1">{koreanFormat}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">ISO Format</div>
            <div className="text-lg font-extrabold text-[var(--primary-dark)] mt-1">{isoFormat}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">US Format</div>
            <div className="text-lg font-extrabold text-[var(--primary-dark)] mt-1">{usFormat}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Day of Week</div>
            <div className="text-lg font-extrabold text-[var(--primary-dark)] mt-1">{isValid ? DAY_NAMES_EN[dow] : '-'}</div>
            <div className="text-xs text-[var(--sub)]">{isValid ? DAY_NAMES_KR[dow] : ''}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Zodiac Year (띠)</div>
            <div className="text-lg font-extrabold text-[var(--primary-dark)] mt-1">{isValid ? zodiac : '-'}</div>
            <div className="text-xs text-[var(--sub)]">{isValid ? `${zodiacKr}띠` : ''}</div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">Days in Korea Counter</SectionTitle>
        <label className="block text-xs font-bold text-[var(--sub)] mb-1">Your Arrival Date in Korea</label>
        <input
          type="date"
          value={arrivalStr}
          onChange={e => setArrivalStr(e.target.value)}
          className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center mb-3"
        />
        {arrivalStr && (
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Days in Korea</div>
            <div className="text-[36px] font-extrabold text-[var(--primary-dark)]">D+{daysInKorea}</div>
            <div className="text-xs text-[var(--sub)]">{daysInKorea >= 0 ? `${Math.floor(daysInKorea / 365)} years, ${Math.floor((daysInKorea % 365) / 30)} months, ${daysInKorea % 30} days` : 'Future date'}</div>
          </div>
        )}
      </Card>

      <Card>
        <SectionTitle num="3">2026 Korean Holidays (공휴일)</SectionTitle>
        {nextHoliday && (
          <div className="bg-[var(--primary-weak)] rounded-xl p-3 mb-3 text-center">
            <div className="text-[10px] text-[var(--primary)] font-bold uppercase">Next Holiday</div>
            <div className="text-sm font-extrabold text-[var(--primary-dark)] mt-0.5">{nextHoliday.name} ({nextHoliday.kr})</div>
            <div className="text-xs text-[var(--sub)]">{nextHoliday.date}</div>
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          {HOLIDAYS_2026.map(h => {
            const isPast = h.date < todayStr;
            return (
              <div key={h.date} className={`flex justify-between items-center text-sm py-1.5 px-2 rounded-lg ${isPast ? 'opacity-40' : ''} ${h.date === todayStr ? 'bg-[var(--primary-weak)]' : ''}`}>
                <div>
                  <span className="font-bold">{h.name}</span>
                  <span className="text-[var(--sub)] ml-1.5">({h.kr})</span>
                </div>
                <span className="text-[var(--sub)] text-xs font-mono">{h.date}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Korean Calendar & Date Guide</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Korean calendar system:</b> Korea officially uses the Gregorian (solar) calendar (양력), but the traditional lunisolar calendar (음력) is still used for determining dates of traditional holidays. Lunar New Year (설날) and Chuseok (추석) follow the lunar calendar, which is why their Gregorian dates shift each year.</p>
          <p><b>Lunar calendar & 띠 (zodiac):</b> The Korean zodiac follows a 12-year cycle of animals, similar to Chinese zodiac. Your birth year determines your 띠. Koreans often ask &quot;What&apos;s your 띠?&quot; as an indirect way to ask your age. Each animal repeats every 12 years.</p>
          <p><b>Important dates for foreigners:</b> Tax filing deadline is May 31st (종합소득세). ARC (Alien Registration Card) renewal should be done 30 days before expiration. Visa extensions can be applied for at the Immigration Office (출입국관리사무소). National health insurance premiums are due monthly.</p>
          <p><b>Korean day names:</b> Monday through Sunday are 월(moon), 화(fire), 수(water), 목(wood), 금(gold), 토(earth), 일(sun) + 요일. These follow the same celestial body naming as Japanese weekdays.</p>
        </div>
      </Card>
    </>
  );
}
