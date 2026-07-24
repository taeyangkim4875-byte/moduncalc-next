'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';

interface Holiday {
  name: string;
  nameKr: string;
  dates: string;
  startDate: Date;
  endDate: Date;
  description: string;
  whatsOpen: string;
  substitute: boolean;
}

const HOLIDAYS_2026: Holiday[] = [
  { name: "New Year's Day", nameKr: '신정', dates: 'January 1 (Thu)', startDate: new Date(2026, 0, 1), endDate: new Date(2026, 0, 1), description: "Western New Year. Most Koreans celebrate Seollal (Lunar New Year) more, but Jan 1 is still a public holiday.", whatsOpen: "Most shops and restaurants are open. Some government offices closed.", substitute: false },
  { name: 'Seollal (Lunar New Year)', nameKr: '설날', dates: 'February 17-19 (Tue-Thu)', startDate: new Date(2026, 1, 17), endDate: new Date(2026, 1, 19), description: "Korea's biggest holiday along with Chuseok. Families gather, eat tteokguk (떡국), perform ancestral rites (세배), and children receive money (세뱃돈).", whatsOpen: "Many restaurants, shops, and markets CLOSED for 3 days. Tourist areas and convenience stores usually open. Public transit runs on reduced schedule.", substitute: true },
  { name: 'Independence Movement Day', nameKr: '삼일절', dates: 'March 1 (Sun)', startDate: new Date(2026, 2, 1), endDate: new Date(2026, 2, 1), description: "Commemorates the March 1, 1919 independence movement against Japanese colonial rule. National flags (태극기) displayed everywhere.", whatsOpen: "Most businesses open. Government offices and banks closed. Special ceremonies at historical sites.", substitute: true },
  { name: "Children's Day", nameKr: '어린이날', dates: 'May 5 (Tue)', startDate: new Date(2026, 4, 5), endDate: new Date(2026, 4, 5), description: "A day dedicated to children's happiness and welfare. Parks, zoos, and amusement parks are extremely crowded. Many parents take the day off.", whatsOpen: "Tourist attractions very crowded. Most businesses open. Theme parks at maximum capacity — book in advance.", substitute: true },
  { name: "Buddha's Birthday", nameKr: '부처님 오신 날 (석가탄신일)', dates: 'May 24 (Sun)', startDate: new Date(2026, 4, 24), endDate: new Date(2026, 4, 24), description: "Celebration of Buddha's birth. Beautiful lantern festivals (연등회) at temples across Korea. Jogyesa Temple in Seoul is spectacular.", whatsOpen: "Most businesses open. Temples hold special events. Lantern parade in Seoul (usually the weekend before).", substitute: true },
  { name: 'Memorial Day', nameKr: '현충일', dates: 'June 6 (Sat)', startDate: new Date(2026, 5, 6), endDate: new Date(2026, 5, 6), description: "Honors those who died in service to the nation. A siren sounds at 10:00 AM for one minute of silence nationwide.", whatsOpen: "Government offices and banks closed. Most shops and restaurants open. National Cemetery holds ceremony.", substitute: false },
  { name: 'Liberation Day', nameKr: '광복절', dates: 'August 15 (Sat)', startDate: new Date(2026, 7, 15), endDate: new Date(2026, 7, 15), description: "Celebrates Korea's liberation from Japanese colonial rule in 1945. National flags displayed. Patriotic events and ceremonies held nationwide.", whatsOpen: "Government offices closed. Most businesses open. Some free admission to national museums and palaces.", substitute: false },
  { name: 'National Foundation Day', nameKr: '개천절', dates: 'October 3 (Sat)', startDate: new Date(2026, 9, 3), endDate: new Date(2026, 9, 3), description: "Commemorates the legendary founding of Gojoseon (고조선), the first Korean kingdom, by Dangun in 2333 BC.", whatsOpen: "Government offices closed. Most businesses open. Ceremony held at Chamseongdan altar on Ganghwado island.", substitute: false },
  { name: 'Chuseok (Korean Thanksgiving)', nameKr: '추석', dates: 'October 4-6 (Sun-Tue)', startDate: new Date(2026, 9, 4), endDate: new Date(2026, 9, 6), description: "Harvest festival and major family holiday. Families gather, visit ancestral graves (성묘), eat songpyeon (송편) rice cakes, and share food.", whatsOpen: "Many restaurants, shops, and markets CLOSED for 3 days. Highways extremely congested. Tourist areas and convenience stores usually open.", substitute: true },
  { name: 'Hangeul Day', nameKr: '한글날', dates: 'October 9 (Fri)', startDate: new Date(2026, 9, 9), endDate: new Date(2026, 9, 9), description: "Celebrates the creation of the Korean alphabet (한글) by King Sejong the Great in 1443. Cultural events and exhibitions throughout the country.", whatsOpen: "Government offices closed. Most businesses open. Special events at the National Hangeul Museum and Gwanghwamun Square.", substitute: false },
  { name: 'Christmas', nameKr: '크리스마스', dates: 'December 25 (Fri)', startDate: new Date(2026, 11, 25), endDate: new Date(2026, 11, 25), description: "Celebrated widely in Korea despite being a minority Christian country. More of a couples' holiday (like Valentine's Day) than a family gathering.", whatsOpen: "Most businesses and restaurants open. Shopping areas very busy. Couples crowd cafes and restaurants.", substitute: false },
];

export default function PublicHolidayCalc() {
  const [filter, setFilter] = useState<'all' | 'upcoming'>('all');

  const now = new Date();
  const today = useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate()), []);

  const nextHoliday = useMemo(() => {
    return HOLIDAYS_2026.find(h => h.endDate >= today) || HOLIDAYS_2026[HOLIDAYS_2026.length - 1];
  }, [today]);

  const daysUntilNext = useMemo(() => {
    if (!nextHoliday) return 0;
    const diff = nextHoliday.startDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [nextHoliday, today]);

  const displayHolidays = useMemo(() => {
    if (filter === 'upcoming') return HOLIDAYS_2026.filter(h => h.endDate >= today);
    return HOLIDAYS_2026;
  }, [filter, today]);

  const isPast = (h: Holiday) => h.endDate < today;
  const isCurrent = (h: Holiday) => h.startDate <= today && h.endDate >= today;

  return (
    <>
      {nextHoliday && (
        <Card>
          <div className="text-center py-2">
            <div className="text-xs font-bold text-[var(--primary)] mb-1">Next Holiday</div>
            <div className="text-xl font-extrabold mb-1">{nextHoliday.name}</div>
            <div className="text-sm text-[#4E5968] mb-2">{nextHoliday.nameKr} · {nextHoliday.dates}</div>
            {daysUntilNext === 0 ? (
              <div className="inline-block px-3 py-1.5 bg-[var(--primary)] text-white text-sm font-bold rounded-full">Today!</div>
            ) : (
              <div className="inline-block px-3 py-1.5 bg-[var(--primary-weak)] text-[var(--primary)] text-sm font-bold rounded-full">D-{daysUntilNext}</div>
            )}
          </div>
        </Card>
      )}

      <Card>
        <SectionTitle num="📅">2026 Korean Public Holidays</SectionTitle>
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          <button onClick={() => setFilter('all')} className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${filter === 'all' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
            All holidays ({HOLIDAYS_2026.length})
          </button>
          <button onClick={() => setFilter('upcoming')} className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${filter === 'upcoming' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
            Upcoming only
          </button>
        </div>

        <div className="space-y-2">
          {displayHolidays.map((h, i) => (
            <details key={i} className={`p-3 rounded-xl border-[1.5px] ${isCurrent(h) ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : isPast(h) ? 'border-[var(--line)] opacity-60' : 'border-[var(--line)]'}`}>
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold">{h.name}</span>
                  <span className="text-xs text-[#8B95A1] ml-2">({h.nameKr})</span>
                </div>
                <span className="text-xs font-bold text-[var(--primary)]">{h.dates.split(' (')[0]}</span>
              </summary>
              <div className="mt-2 pt-2 border-t border-[var(--line)]">
                <p className="text-sm text-[#4E5968] leading-relaxed mb-2">{h.description}</p>
                <div className="p-2 bg-white rounded-lg">
                  <span className="text-xs font-bold text-[#4E5968]">What&apos;s open/closed: </span>
                  <span className="text-xs text-[#4E5968]">{h.whatsOpen}</span>
                </div>
                {h.substitute && (
                  <p className="text-[10px] text-[var(--primary)] font-bold mt-1.5">* Substitute holiday (대체공휴일) applies if this falls on a weekend.</p>
                )}
              </div>
            </details>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Substitute Holidays (대체공휴일)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Since 2023, Korea&apos;s substitute holiday system (대체공휴일 제도) was expanded to cover most public holidays. If a holiday falls on a Saturday or Sunday, the following Monday becomes a substitute holiday. This applies to: Seollal, Chuseok, Independence Movement Day, Children&apos;s Day, Buddha&apos;s Birthday, Liberation Day, National Foundation Day, Hangeul Day, and Christmas.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>For workers:</b> Public holidays are guaranteed paid days off under the Labor Standards Act (근로기준법). If you must work on a holiday, your employer should pay 150% of your regular wage (holiday premium pay / 휴일 근로수당). This applies to companies with 5 or more employees.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Vacation Planning Tips</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Golden weeks:</b> Look for holidays near weekends to maximize time off. In 2026, Seollal (Feb 17-19, Tue-Thu) plus 2 annual leave days gives you 9 days off. The October cluster (National Foundation Oct 3 + Chuseok Oct 4-6 + Hangeul Day Oct 9) is another great opportunity for extended travel.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Travel warnings:</b> During Seollal and Chuseok, highways are extremely congested (sometimes 6-8 hours for normally 3-hour trips). KTX and bus tickets sell out weeks in advance. Flights within Asia also spike in price. Book early or stay in the cities — Seoul becomes pleasantly empty during these holidays.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Annual leave (연차):</b> Under Korean labor law, employees receive 15 days of paid annual leave after 1 year of employment (11 days for the first year, earned monthly). Many companies also offer additional leave around Seollal and Chuseok. Some companies close entirely during these periods.
        </p>
      </Card>
    </>
  );
}
