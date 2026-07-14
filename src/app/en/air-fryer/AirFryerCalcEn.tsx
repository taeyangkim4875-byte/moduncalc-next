'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const FOOD_PRESETS = [
  { label: 'Korean Fried Chicken (치킨)', temp: 200, time: 30 },
  { label: 'Samgyeopsal (삼겹살)', temp: 200, time: 20 },
  { label: 'Tteokbokki (떡볶이)', temp: 190, time: 15 },
  { label: 'Mandu / Dumplings (만두)', temp: 190, time: 15 },
  { label: 'Sweet Potato (고구마)', temp: 200, time: 40 },
  { label: 'Frozen Pizza', temp: 220, time: 15 },
  { label: 'French Fries', temp: 200, time: 20 },
  { label: 'Chicken Nuggets', temp: 200, time: 15 },
];

export default function AirFryerCalcEn() {
  const [ovenTemp, setOvenTemp] = useState(200);
  const [ovenTime, setOvenTime] = useState(25);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const airFryerTemp = (ovenTemp || 0) - 15;
  const airFryerTime = Math.round((ovenTime || 0) * 0.8);

  const handlePreset = (idx: number) => {
    const p = FOOD_PRESETS[idx];
    setOvenTemp(p.temp);
    setOvenTime(p.time);
    setSelectedPreset(idx);
  };

  const handleTempChange = (val: number) => {
    setOvenTemp(val);
    setSelectedPreset(null);
  };

  const handleTimeChange = (val: number) => {
    setOvenTime(val);
    setSelectedPreset(null);
  };

  return (
    <>
      <Card>
        <SectionTitle num="1">Oven Settings</SectionTitle>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Oven Temp (°C)</label>
            <input type="number" value={ovenTemp} onChange={e => handleTempChange(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Oven Time (min)</label>
            <input type="number" value={ovenTime} onChange={e => handleTimeChange(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">Quick Presets</SectionTitle>
        <div className="grid grid-cols-2 gap-1.5">
          {FOOD_PRESETS.map((f, i) => (
            <button key={i} onClick={() => handlePreset(i)} className={`py-2.5 px-2 rounded-xl text-xs font-bold border-[1.5px] transition-colors text-left ${selectedPreset === i ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>
              {f.label}
              <span className="block text-[10px] mt-0.5 opacity-70">{f.temp}°C / {f.time} min (oven)</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="!p-6">
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-[var(--sub)] uppercase mb-1">Oven (Original)</div>
          <div className="text-lg font-extrabold text-[#4E5968]">{ovenTemp || 0}°C for {ovenTime || 0} min</div>
        </div>
        <div className="flex justify-center my-2 text-2xl">↓</div>
        <div className="bg-[var(--primary-weak)] rounded-2xl p-5 text-center">
          <div className="text-xs font-bold text-[var(--primary)] uppercase mb-1">Air Fryer (Converted)</div>
          <div className="text-[36px] font-extrabold text-[var(--primary-dark)]">{airFryerTemp}°C</div>
          <div className="text-lg font-bold text-[var(--primary-dark)]">{airFryerTime} minutes</div>
        </div>
        <div className="mt-3 text-center text-xs text-[var(--sub)]">Temp -15°C, Time x 0.8</div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Guide: Air Fryer Tips</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>The basic conversion rule</b> is simple: reduce oven temperature by about 15°C (25°F) and cooking time by 20%. Air fryers circulate hot air more efficiently than conventional ovens, so food cooks faster and at lower temperatures.</p>
          <p><b>Korean dishes in the air fryer:</b> Air fryers have become incredibly popular in Korea (에어프라이어). They are perfect for reheating delivery fried chicken (치킨), crisping up samgyeopsal (삼겹살, pork belly), making crispy mandu (만두, dumplings), and roasting sweet potatoes (고구마) — a beloved Korean street food snack.</p>
          <p><b>Key tips for best results:</b> Don&apos;t overcrowd the basket — air needs to circulate. Shake or flip food halfway through cooking. Spray a light coat of cooking oil for extra crispiness. For frozen foods, add 2-3 extra minutes. Preheat for 2-3 minutes for crispier results.</p>
          <p><b>Korean kitchen essentials:</b> In Korea, air fryers are often used alongside rice cookers (밥솥), electric stoves (인덕션), and kimchi refrigerators (김치냉장고). If you are setting up a kitchen in Korea, an air fryer is one of the most versatile appliances you can own — great for everything from reheating convenience store foods to cooking full meals.</p>
          <p><b>Common mistakes:</b> Using too high a temperature (causes burning outside, raw inside), not preheating, forgetting to flip food, and not adjusting for frozen vs. fresh ingredients. When converting a recipe, always check food a few minutes early until you learn your specific air fryer&apos;s behavior.</p>
        </div>
      </Card>
    </>
  );
}
