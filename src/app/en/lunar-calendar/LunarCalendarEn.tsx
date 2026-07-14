'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';

interface Holiday {
  name: string;
  korean: string;
  solarDate: string;
  lunarDate: string;
  description: string;
  daysOff: number;
}

const holidays2026: Holiday[] = [
  { name: 'Seollal (Korean New Year)', korean: '설날', solarDate: '2026-02-17', lunarDate: '1/1', description: 'Korean Lunar New Year. Families gather, perform ancestral rites (차례), eat tteokguk (떡국), and play traditional games.', daysOff: 3 },
  { name: 'Independence Movement Day', korean: '삼일절', solarDate: '2026-03-01', lunarDate: '-', description: 'Commemorates the March 1, 1919 independence movement against Japanese colonial rule.', daysOff: 1 },
  { name: 'Buddha\'s Birthday', korean: '부처님 오신 날', solarDate: '2026-05-24', lunarDate: '4/8', description: 'Celebrates the birth of Buddha. Temples are decorated with colorful lanterns. Lotus lantern festival in Seoul.', daysOff: 1 },
  { name: 'Memorial Day', korean: '현충일', solarDate: '2026-06-06', lunarDate: '-', description: 'Honors those who died in military service. A moment of silence is observed at 10 AM nationwide.', daysOff: 1 },
  { name: 'Liberation Day', korean: '광복절', solarDate: '2026-08-15', lunarDate: '-', description: 'Celebrates Korea\'s liberation from Japanese colonial rule in 1945.', daysOff: 1 },
  { name: 'Chuseok', korean: '추석', solarDate: '2026-10-04', lunarDate: '8/15', description: 'Korean harvest thanksgiving. Families visit hometowns, perform ancestral rites, eat songpyeon (송편). Biggest travel season.', daysOff: 3 },
  { name: 'National Foundation Day', korean: '개천절', solarDate: '2026-10-03', lunarDate: '-', description: 'Celebrates the legendary founding of Gojoseon, the first Korean kingdom, in 2333 BC.', daysOff: 1 },
  { name: 'Hangeul Day', korean: '한글날', solarDate: '2026-10-09', lunarDate: '-', description: 'Celebrates the creation of the Korean alphabet by King Sejong the Great in 1443.', daysOff: 1 },
  { name: 'Christmas', korean: '크리스마스', solarDate: '2026-12-25', lunarDate: '-', description: 'A public holiday in Korea. More of a couples\' date holiday than a family gathering day.', daysOff: 1 },
];

const lunarMonths2026 = [
  { lunar: '1/1', solar: 'Feb 17', label: '1st Month (정월)' },
  { lunar: '2/1', solar: 'Mar 19', label: '2nd Month' },
  { lunar: '3/1', solar: 'Apr 17', label: '3rd Month' },
  { lunar: '4/1', solar: 'May 17', label: '4th Month' },
  { lunar: '5/1', solar: 'Jun 15', label: '5th Month' },
  { lunar: '6/1', solar: 'Jul 15', label: '6th Month' },
  { lunar: '7/1', solar: 'Aug 13', label: '7th Month' },
  { lunar: '8/1', solar: 'Sep 12', label: '8th Month' },
  { lunar: '9/1', solar: 'Oct 11', label: '9th Month' },
  { lunar: '10/1', solar: 'Nov 10', label: '10th Month' },
  { lunar: '11/1', solar: 'Dec 9', label: '11th Month' },
  { lunar: '12/1', solar: 'Jan 8 (2027)', label: '12th Month' },
];

export default function LunarCalendarEn() {
  const [selectedHoliday, setSelectedHoliday] = useState<number | null>(null);

  const today = useMemo(() => new Date(), []);

  const getDday = (dateStr: string) => {
    const target = new Date(dateStr + 'T00:00:00');
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today!';
    if (diff > 0) return `D-${diff}`;
    return `D+${Math.abs(diff)}`;
  };

  const nextHoliday = useMemo(() => {
    return holidays2026.find(h => new Date(h.solarDate + 'T00:00:00') >= today) || null;
  }, [today]);

  return (
    <>
      {nextHoliday && (
        <Card className="!p-6">
          <div className="text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase mb-1">Next Holiday</div>
            <div className="text-lg font-extrabold text-[var(--primary-dark)]">{nextHoliday.name}</div>
            <div className="text-[36px] font-extrabold text-[var(--primary)]">{getDday(nextHoliday.solarDate)}</div>
            <div className="text-sm text-[var(--sub)]">{new Date(nextHoliday.solarDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', weekday: 'long' })}</div>
          </div>
        </Card>
      )}

      <Card>
        <SectionTitle num="1">2026 Korean Holidays</SectionTitle>
        <div className="flex flex-col gap-2">
          {holidays2026.map((h, i) => {
            const isPast = new Date(h.solarDate + 'T00:00:00') < today;
            return (
              <button
                key={i}
                onClick={() => setSelectedHoliday(selectedHoliday === i ? null : i)}
                className={`w-full text-left p-3 rounded-xl border-[1.5px] transition-colors ${selectedHoliday === i ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)]'} ${isPast ? 'opacity-50' : ''}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold">{h.name}</div>
                    <div className="text-xs text-[var(--sub)]">{h.korean} {h.lunarDate !== '-' && `(Lunar ${h.lunarDate})`}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[var(--primary)]">{getDday(h.solarDate)}</div>
                    <div className="text-[10px] text-[var(--sub)]">{new Date(h.solarDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </div>
                </div>
                {selectedHoliday === i && (
                  <div className="mt-2 pt-2 border-t border-[var(--line)] text-xs text-[#4E5968] leading-relaxed">
                    <p>{h.description}</p>
                    <p className="mt-1 font-bold">Days off: {h.daysOff} day{h.daysOff > 1 ? 's' : ''}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">Lunar Month Start Dates (2026)</SectionTitle>
        <div className="text-sm">
          <div className="grid grid-cols-3 gap-1 text-xs font-bold text-[var(--sub)] mb-2 px-1">
            <span>Lunar Month</span>
            <span className="text-center">Solar Date</span>
            <span className="text-right">Lunar 1st</span>
          </div>
          {lunarMonths2026.map((m, i) => (
            <div key={i} className="grid grid-cols-3 gap-1 py-1.5 px-1 border-b border-[var(--line)] last:border-b-0 text-xs">
              <span className="font-bold">{m.label}</span>
              <span className="text-center text-[var(--sub)]">{m.solar}</span>
              <span className="text-right text-[var(--sub)]">{m.lunar}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📅 Why Korea Uses the Lunar Calendar</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Historical background:</b> Korea used the lunisolar calendar (음력, eumnyeok) for over 2,000 years. The Gregorian calendar (양력, yangnyeok) was officially adopted in 1896, but traditional customs remain tied to lunar dates. Many older Koreans still celebrate their birthday on the lunar calendar date.</p>
          <p><b>How the lunar calendar works:</b> The lunar calendar follows moon phases. Each month begins on a new moon and lasts about 29.5 days. To keep seasons aligned, a leap month (윤달) is added roughly every 3 years. This is why Seollal and Chuseok fall on different Gregorian dates each year.</p>
          <p><b>Holidays you need to know:</b> Seollal (설날) and Chuseok (추석) are the two biggest holidays. Each is a 3-day break. Expect extreme traffic, sold-out trains and flights, and many businesses to be closed. Book travel weeks in advance if you plan to go anywhere during these periods.</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">🎁 What Foreigners Should Know</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Traffic (교통 대란):</b> During Seollal and Chuseok, millions of Koreans travel to their hometowns. A normally 3-hour drive from Seoul to Busan can take 8-12 hours. KTX (고속열차) tickets sell out weeks in advance. Airports and bus terminals are extremely crowded.</p>
          <p><b>Businesses closed:</b> Most restaurants, shops, and small businesses close during Seollal and Chuseok. Large chain stores and convenience stores (편의점) usually stay open. Tourist areas in Seoul may have reduced hours. Hospitals and clinics also close for the holiday.</p>
          <p><b>Gift-giving culture (선물 문화):</b> Koreans exchange gifts before major holidays. Popular gifts include fruit sets (과일 세트), Korean beef (한우), spam gift sets (스팸 선물세트), and health supplements (건강식품). If invited to a Korean family gathering, bring a gift. Department stores have dedicated holiday gift sections.</p>
          <p><b>Lunar birthdays:</b> If your Korean friend celebrates their birthday on the lunar calendar (음력 생일), the date changes every year on the Gregorian calendar. Ask which date they celebrate to avoid confusion. Most younger Koreans use the solar calendar for birthdays.</p>
        </div>
      </Card>
    </>
  );
}
