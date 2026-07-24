'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

interface MonthData {
  month: string;
  monthKr: string;
  highC: number;
  lowC: number;
  rainMm: number;
  humidity: number;
  season: string;
  whatToWear: string;
  highlight: string;
  color: string;
}

const MONTHS: MonthData[] = [
  { month: 'January', monthKr: '1월', highC: -1, lowC: -9, rainMm: 20, humidity: 55, season: 'Winter', whatToWear: 'Heavy padded coat (패딩/롱패딩), thermal layers, scarf, gloves, warm boots. Indoor heating is strong so dress in removable layers.', highlight: 'Ski season peak. Beautiful snow scenery at palaces. Hot street food season (호떡, 붕어빵, 어묵).', color: '#60A5FA' },
  { month: 'February', monthKr: '2월', highC: 2, lowC: -7, rainMm: 25, humidity: 55, season: 'Winter', whatToWear: 'Heavy coat still needed. Late February may warm slightly. Layering essential.', highlight: 'Seollal (Lunar New Year) celebrations. Still ski season. Cherry blossom forecasts start appearing.', color: '#60A5FA' },
  { month: 'March', monthKr: '3월', highC: 9, lowC: -1, rainMm: 45, humidity: 55, season: 'Spring', whatToWear: 'Medium jacket, layers. Temperature varies widely day-to-day. Yellow dust mask recommended.', highlight: 'Yellow dust (황사/미세먼지) season begins. Independence Movement Day (3/1). University semester starts.', color: '#34D399' },
  { month: 'April', monthKr: '4월', highC: 16, lowC: 6, rainMm: 65, humidity: 58, season: 'Spring', whatToWear: 'Light jacket, long sleeves. Comfortable walking shoes for cherry blossom viewing.', highlight: 'CHERRY BLOSSOM season! Yeouido, Jinhae, Gyeongju are stunning. Best month for outdoor sightseeing.', color: '#34D399' },
  { month: 'May', monthKr: '5월', highC: 22, lowC: 12, rainMm: 80, humidity: 62, season: 'Spring', whatToWear: 'T-shirts and light layers. Sunscreen starts becoming important.', highlight: "Children's Day (5/5), Buddha's Birthday lantern festivals. Perfect hiking weather. Last comfortable month before summer heat.", color: '#34D399' },
  { month: 'June', monthKr: '6월', highC: 27, lowC: 18, rainMm: 130, humidity: 72, season: 'Summer', whatToWear: 'Light, breathable clothing. Umbrella essential. Humidity-friendly fabrics.', highlight: 'Monsoon season (장마) begins mid-June. Hot and humid. Memorial Day (6/6). Good month for museum visits.', color: '#F59E0B' },
  { month: 'July', monthKr: '7월', highC: 29, lowC: 22, rainMm: 350, humidity: 80, season: 'Summer', whatToWear: 'Lightest clothes, rain jacket, waterproof shoes. High UV — sunscreen and hat essential.', highlight: 'Peak monsoon (장마). Heavy rainfall, occasional flooding. Beach season starts. Boryeong Mud Festival.', color: '#EF4444' },
  { month: 'August', monthKr: '8월', highC: 30, lowC: 23, rainMm: 280, humidity: 78, season: 'Summer', whatToWear: 'Light, moisture-wicking clothes. Sun protection. Portable fan useful.', highlight: 'Hottest month — feels like 35-40°C with humidity. Liberation Day (8/15). Beach and water park season. Monsoon usually ends mid-August.', color: '#EF4444' },
  { month: 'September', monthKr: '9월', highC: 26, lowC: 16, rainMm: 130, humidity: 68, season: 'Autumn', whatToWear: 'Light layers, long sleeves. Temperatures cool significantly by late September.', highlight: 'Summer heat breaks. Chuseok (Korean Thanksgiving). Autumn begins — pleasant temperatures return.', color: '#F97316' },
  { month: 'October', monthKr: '10월', highC: 19, lowC: 8, rainMm: 45, humidity: 60, season: 'Autumn', whatToWear: 'Medium jacket, sweaters. Perfect layering weather. Comfortable walking shoes for foliage hikes.', highlight: 'AUTUMN FOLIAGE peak! Seoraksan, Naejangsan, Bukhansan are spectacular. Best hiking month. Many holidays (National Foundation, Chuseok, Hangeul Day).', color: '#F97316' },
  { month: 'November', monthKr: '11월', highC: 10, lowC: 1, rainMm: 50, humidity: 58, season: 'Autumn', whatToWear: 'Warm coat, scarf. Winter gear needed by late November. Layers important.', highlight: 'Late autumn foliage in southern regions. First cold waves arrive. Kimjang (김장) season — families make winter kimchi together.', color: '#F97316' },
  { month: 'December', monthKr: '12월', highC: 2, lowC: -6, rainMm: 20, humidity: 55, season: 'Winter', whatToWear: 'Heavy winter coat (패딩), thermal underwear, warm accessories. Similar to January.', highlight: 'Christmas (couples holiday). Ski season begins. Beautiful holiday illuminations in Seoul (Cheonggyecheon, Starfield). Year-end parties (송년회).', color: '#60A5FA' },
];

type Season = 'all' | 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export default function WeatherGuide() {
  const [season, setSeason] = useState<Season>('all');
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const toF = (c: number) => Math.round(c * 9 / 5 + 32);
  const temp = (c: number) => unit === 'C' ? `${c}°C` : `${toF(c)}°F`;

  const filtered = season === 'all' ? MONTHS : MONTHS.filter(m => m.season === season);

  const currentMonth = new Date().getMonth();

  return (
    <>
      <Card>
        <SectionTitle num="1">Season Filter</SectionTitle>
        <div className="grid grid-cols-5 gap-1.5 mb-4">
          {(['all', 'Spring', 'Summer', 'Autumn', 'Winter'] as Season[]).map(s => (
            <button key={s} onClick={() => setSeason(s)} className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${season === s ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>

        <SectionTitle num="2">Temperature Unit</SectionTitle>
        <div className="grid grid-cols-2 gap-1.5">
          {(['C', 'F'] as const).map(u => (
            <button key={u} onClick={() => setUnit(u)} className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${unit === u ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
              {u === 'C' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Monthly Weather Guide</h2>
        <div className="space-y-2">
          {filtered.map((m, idx) => {
            const monthIdx = MONTHS.indexOf(m);
            const isCurrent = monthIdx === currentMonth;
            return (
              <details key={idx} className={`p-3 rounded-xl border-[1.5px] ${isCurrent ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)]'}`} open={isCurrent}>
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-none" style={{ backgroundColor: m.color }} />
                    <span className="text-sm font-bold">{m.month}</span>
                    <span className="text-xs text-[#8B95A1]">({m.monthKr})</span>
                    {isCurrent && <span className="text-[10px] font-bold text-white bg-[var(--primary)] px-1.5 py-0.5 rounded">NOW</span>}
                  </div>
                  <span className="text-xs font-bold" style={{ color: m.color }}>{temp(m.lowC)} ~ {temp(m.highC)}</span>
                </summary>
                <div className="mt-2 pt-2 border-t border-[var(--line)] space-y-2">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-white rounded-lg">
                      <div className="text-[10px] text-[#8B95A1]">High / Low</div>
                      <div className="text-sm font-bold">{temp(m.highC)} / {temp(m.lowC)}</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg">
                      <div className="text-[10px] text-[#8B95A1]">Rainfall</div>
                      <div className="text-sm font-bold">{m.rainMm}mm</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg">
                      <div className="text-[10px] text-[#8B95A1]">Humidity</div>
                      <div className="text-sm font-bold">{m.humidity}%</div>
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded-lg">
                    <span className="text-xs font-bold text-[#4E5968]">What to wear: </span>
                    <span className="text-xs text-[#4E5968]">{m.whatToWear}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg">
                    <span className="text-xs font-bold text-[var(--primary)]">Highlights: </span>
                    <span className="text-xs text-[#4E5968]">{m.highlight}</span>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Korea&apos;s 4 Distinct Seasons</h2>
        <div className="space-y-3">
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1" style={{ color: '#34D399' }}>Spring (봄) - March to May</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">Cherry blossoms (벚꽃) bloom from late March (Jeju) to mid-April (Seoul). Temperatures are mild but variable. <b>Yellow dust (황사)</b> and <b>fine dust (미세먼지)</b> are significant concerns — check the air quality app (에어코리아) daily and wear KF94 masks when levels are high. Despite the dust, spring is one of the most beautiful seasons for sightseeing.</p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1" style={{ color: '#EF4444' }}>Summer (여름) - June to August</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">Hot and humid with temperatures reaching 33-38°C (feels like 40°C+ with humidity). The monsoon season (장마) typically runs mid-June to late July with heavy rainfall. <b>Preparation tips:</b> portable fan (휴대용 선풍기), sunscreen, waterproof bag, and a light rain jacket. Stay hydrated — every convenience store sells iced drinks. Air conditioning is strong everywhere indoors.</p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1" style={{ color: '#F97316' }}>Autumn (가을) - September to November</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">The most pleasant season. Cool, dry weather with stunning autumn foliage (단풍) peaking in mid-October to early November. Best national parks for foliage: Seoraksan (설악산), Naejangsan (내장산), Bukhansan (북한산), and Gyeongju. This is the ideal time for hiking, temple stays, and outdoor activities.</p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1" style={{ color: '#60A5FA' }}>Winter (겨울) - December to February</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">Cold and dry with temperatures dropping to -10 to -15°C. Snowfall is common but usually light in Seoul. <b>Ondol (온돌)</b> floor heating keeps Korean apartments very warm — you may find yourself wearing shorts indoors. <b>Must-haves:</b> a long padded coat (롱패딩, Korea&apos;s signature winter gear), thermal underwear (내복), and hand warmers (핫팩, ₩500 at convenience stores).</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Packing Guide by Season</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[#34D399] whitespace-nowrap">Spring</span>
            <span className="text-sm text-[#4E5968]">Light jacket, layers, comfortable walking shoes, KF94 masks for yellow dust, allergy medicine, sunglasses, umbrella</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[#EF4444] whitespace-nowrap">Summer</span>
            <span className="text-sm text-[#4E5968]">Light breathable clothes, rain jacket, waterproof shoes, sunscreen SPF50+, hat, portable fan, mosquito repellent, deodorant (hard to find in Korea)</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[#F97316] whitespace-nowrap">Autumn</span>
            <span className="text-sm text-[#4E5968]">Medium jacket, sweaters, layers, hiking boots (if planning mountain visits), camera for foliage, light scarf</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[#60A5FA] whitespace-nowrap">Winter</span>
            <span className="text-sm text-[#4E5968]">Heavy padded coat (or buy 롱패딩 in Korea for ~₩100-300K), thermal underwear, warm boots, gloves, scarf, beanie, lip balm, hand cream</span>
          </div>
        </div>
      </Card>
    </>
  );
}
