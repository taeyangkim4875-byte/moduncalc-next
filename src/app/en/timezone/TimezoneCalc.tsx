'use client';

import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const cities = [
  { name: 'New York', tz: 'America/New_York', diff: -14 },
  { name: 'Los Angeles', tz: 'America/Los_Angeles', diff: -17 },
  { name: 'Chicago', tz: 'America/Chicago', diff: -15 },
  { name: 'London', tz: 'Europe/London', diff: -9 },
  { name: 'Paris', tz: 'Europe/Paris', diff: -8 },
  { name: 'Berlin', tz: 'Europe/Berlin', diff: -8 },
  { name: 'Moscow', tz: 'Europe/Moscow', diff: -6 },
  { name: 'Dubai', tz: 'Asia/Dubai', diff: -5 },
  { name: 'Mumbai', tz: 'Asia/Kolkata', diff: -3.5 },
  { name: 'Bangkok', tz: 'Asia/Bangkok', diff: -2 },
  { name: 'Singapore', tz: 'Asia/Singapore', diff: -1 },
  { name: 'Tokyo', tz: 'Asia/Tokyo', diff: 0 },
  { name: 'Sydney', tz: 'Australia/Sydney', diff: 2 },
  { name: 'Auckland', tz: 'Pacific/Auckland', diff: 3 },
  { name: 'Honolulu', tz: 'Pacific/Honolulu', diff: -19 },
  { name: 'Toronto', tz: 'America/Toronto', diff: -14 },
  { name: 'Vancouver', tz: 'America/Vancouver', diff: -17 },
  { name: 'Sao Paulo', tz: 'America/Sao_Paulo', diff: -12 },
];

function formatTime(date: Date, tz: string): string {
  try {
    return date.toLocaleTimeString('en-US', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  } catch {
    return '--:--:--';
  }
}

function formatDate(date: Date, tz: string): string {
  try {
    return date.toLocaleDateString('en-US', {
      timeZone: tz,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '---';
  }
}

const businessHours = [
  { kst: '9:00 AM', label: 'Office opens' },
  { kst: '12:00 PM', label: 'Lunch' },
  { kst: '2:00 PM', label: 'Afternoon' },
  { kst: '6:00 PM', label: 'Office closes' },
  { kst: '9:00 PM', label: 'Evening' },
];

export default function TimezoneCalc() {
  const [now, setNow] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('America/New_York');

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const selectedCityData = cities.find(c => c.tz === selectedCity);

  function getConvertedHour(kstHour: number, diffHours: number): string {
    let h = kstHour + diffHours;
    if (h < 0) h += 24;
    if (h >= 24) h -= 24;
    const suffix = h >= 12 ? 'PM' : 'AM';
    const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${displayH}:00 ${suffix}`;
  }

  return (
    <>
      <Card className="!p-6">
        <div className="text-center mb-2">
          <div className="text-[10px] text-[var(--sub)] font-bold uppercase tracking-wider">Current Time in Seoul, Korea (KST)</div>
          <div className="text-[42px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-tight mt-1">
            {formatTime(now, 'Asia/Seoul')}
          </div>
          <div className="text-sm text-[var(--sub)]">{formatDate(now, 'Asia/Seoul')} &middot; UTC+9</div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="1">Convert to Your Time Zone</SectionTitle>
        <div className="mb-4">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">Select City</label>
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            className="w-full py-3 px-2 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] bg-white text-center"
          >
            {cities.map(c => (
              <option key={c.tz} value={c.tz}>{c.name}</option>
            ))}
          </select>
        </div>
        {selectedCityData && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
              <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Seoul (KST)</div>
              <div className="text-[24px] font-extrabold text-[var(--primary-dark)]">{formatTime(now, 'Asia/Seoul')}</div>
              <div className="text-xs text-[var(--sub)]">{formatDate(now, 'Asia/Seoul')}</div>
            </div>
            <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
              <div className="text-[10px] text-[var(--sub)] font-bold uppercase">{selectedCityData.name}</div>
              <div className="text-[24px] font-extrabold text-[var(--primary-dark)]">{formatTime(now, selectedCity)}</div>
              <div className="text-xs text-[var(--sub)]">{formatDate(now, selectedCity)}</div>
            </div>
          </div>
        )}
      </Card>

      <Card>
        <SectionTitle num="2">World Clock from Seoul</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {cities.slice(0, 12).map(c => (
            <div key={c.tz} className="bg-[var(--bg)] rounded-xl p-3 text-center">
              <div className="text-[10px] text-[var(--sub)] font-bold uppercase">{c.name}</div>
              <div className="text-base font-extrabold text-[var(--primary-dark)]">{formatTime(now, c.tz)}</div>
              <div className="text-[10px] text-[var(--sub)]">
                {c.diff === 0 ? 'Same as KST' : `KST ${c.diff > 0 ? '+' : ''}${c.diff}h`}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle num="3">Business Hours Helper</SectionTitle>
        <p className="text-xs text-[var(--sub)] mb-3">When it&apos;s a certain time in Seoul, here&apos;s what time it is in {selectedCityData?.name || 'your city'}:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] text-[var(--sub)] uppercase">
                <th className="pb-2">Seoul (KST)</th>
                <th className="pb-2 text-center">Activity</th>
                <th className="pb-2 text-right">{selectedCityData?.name}</th>
              </tr>
            </thead>
            <tbody>
              {businessHours.map((bh, i) => {
                const kstHour = parseInt(bh.kst);
                const isPM = bh.kst.includes('PM') && kstHour !== 12;
                const hour24 = isPM ? kstHour + 12 : kstHour === 12 && bh.kst.includes('PM') ? 12 : kstHour;
                const diff = selectedCityData?.diff || 0;
                return (
                  <tr key={i} className="border-t border-[var(--line)]">
                    <td className="py-2 text-xs font-bold">{bh.kst}</td>
                    <td className="py-2 text-xs text-center text-[var(--sub)]">{bh.label}</td>
                    <td className="py-2 text-xs text-right font-bold">{getConvertedHour(hour24, diff)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Guide: Korea Standard Time (KST)</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>KST = UTC+9</b>: Korea Standard Time is 9 hours ahead of Coordinated Universal Time (UTC). It is the same time zone as Japan Standard Time (JST). Korea uses a single time zone for the entire country.</p>
          <p><b>No Daylight Saving Time</b>: South Korea does not observe daylight saving time (DST). This means the time difference with countries that DO use DST (like the US and UK) changes twice a year. For example, New York is 14 hours behind Seoul in winter but 13 hours behind in summer.</p>
          <p><b>Best times to call home</b>: If calling the US East Coast from Korea, try 9-10 PM KST (8-9 AM EST). For the West Coast, 6-7 AM KST works well (2-3 PM PST previous day). For Europe, 5-6 PM KST is ideal (8-9 AM GMT).</p>
          <p><b>Business hours in Korea</b>: Standard Korean business hours are 9:00 AM to 6:00 PM, Monday through Friday. Banks typically open 9:00 AM to 4:00 PM. Government offices run 9:00 AM to 6:00 PM. Many restaurants stay open until 10:00 PM or later.</p>
          <p><b>Date format</b>: Korea uses the Year-Month-Day format (YYYY-MM-DD or YYYY.MM.DD). For example, July 4, 2026 is written as 2026-07-04 or 2026.07.04. This is different from the US format (MM/DD/YYYY) and the European format (DD/MM/YYYY).</p>
          <p><b>24-hour vs 12-hour clock</b>: Korea commonly uses the 12-hour clock in daily conversation with AM/PM markers (오전/오후). However, transportation schedules, military time, and formal contexts use the 24-hour format. Both are widely understood.</p>
        </div>
      </Card>
    </>
  );
}
