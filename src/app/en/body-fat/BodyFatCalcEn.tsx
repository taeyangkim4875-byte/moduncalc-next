'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function BodyFatCalcEn() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState(175);
  const [waist, setWaist] = useState(85);
  const [neck, setNeck] = useState(38);
  const [hip, setHip] = useState(95);

  const h = height || 0;
  const w = waist || 0;
  const n = neck || 0;
  const hp = hip || 0;

  let bodyFat = 0;
  if (gender === 'male') {
    bodyFat = w > n
      ? 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
      : 0;
  } else {
    bodyFat = (w + hp - n) > 0
      ? 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450
      : 0;
  }
  bodyFat = Math.max(0, bodyFat);

  const getCategory = (bf: number, g: string) => {
    if (g === 'male') {
      if (bf < 6) return { label: 'Essential Fat', color: 'text-red-500' };
      if (bf < 14) return { label: 'Athletes', color: 'text-blue-600' };
      if (bf < 18) return { label: 'Fitness', color: 'text-green-600' };
      if (bf < 25) return { label: 'Average', color: 'text-yellow-600' };
      return { label: 'Obese', color: 'text-red-600' };
    } else {
      if (bf < 14) return { label: 'Essential Fat', color: 'text-red-500' };
      if (bf < 21) return { label: 'Athletes', color: 'text-blue-600' };
      if (bf < 25) return { label: 'Fitness', color: 'text-green-600' };
      if (bf < 32) return { label: 'Average', color: 'text-yellow-600' };
      return { label: 'Obese', color: 'text-red-600' };
    }
  };

  const category = getCategory(bodyFat, gender);

  return (
    <>
      <Card>
        <SectionTitle num="1">Gender</SectionTitle>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setGender('male')}
            className={`py-3 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${gender === 'male' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}
          >
            Male
          </button>
          <button
            onClick={() => setGender('female')}
            className={`py-3 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${gender === 'female' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}
          >
            Female
          </button>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">Measurements (cm)</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Height</label>
            <input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Waist circumference (at navel level)</label>
            <input type="number" value={waist} onChange={e => setWaist(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Neck circumference (below Adam&apos;s apple)</label>
            <input type="number" value={neck} onChange={e => setNeck(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
          {gender === 'female' && (
            <div>
              <label className="block text-xs font-bold text-[var(--sub)] mb-1">Hip circumference (widest point)</label>
              <input type="number" value={hip} onChange={e => setHip(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
            </div>
          )}
        </div>
      </Card>

      <Card className="!p-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Body Fat</div>
            <div className="text-[36px] font-extrabold text-[var(--primary-dark)]">{bodyFat.toFixed(1)}%</div>
            <div className={`text-xs font-bold ${category.color}`}>{category.label}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Method</div>
            <div className="text-[20px] font-extrabold text-[var(--primary-dark)] mt-2">US Navy</div>
            <div className="text-xs text-[var(--sub)]">3-site formula</div>
          </div>
        </div>

        <div className="mt-4 bg-[var(--bg)] rounded-xl p-4">
          <div className="text-xs font-bold text-[var(--sub)] mb-2 uppercase">Body Fat Categories ({gender === 'male' ? 'Men' : 'Women'})</div>
          <div className="text-sm flex flex-col gap-1">
            {gender === 'male' ? (
              <>
                <div className="flex justify-between"><span>Essential Fat</span><span className="font-bold">2-5%</span></div>
                <div className="flex justify-between"><span>Athletes</span><span className="font-bold">6-13%</span></div>
                <div className="flex justify-between"><span>Fitness</span><span className="font-bold">14-17%</span></div>
                <div className="flex justify-between"><span>Average</span><span className="font-bold">18-24%</span></div>
                <div className="flex justify-between"><span>Obese</span><span className="font-bold">25%+</span></div>
              </>
            ) : (
              <>
                <div className="flex justify-between"><span>Essential Fat</span><span className="font-bold">10-13%</span></div>
                <div className="flex justify-between"><span>Athletes</span><span className="font-bold">14-20%</span></div>
                <div className="flex justify-between"><span>Fitness</span><span className="font-bold">21-24%</span></div>
                <div className="flex justify-between"><span>Average</span><span className="font-bold">25-31%</span></div>
                <div className="flex justify-between"><span>Obese</span><span className="font-bold">32%+</span></div>
              </>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📏 How to Measure Correctly</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Waist (허리둘레):</b> Measure at your navel level, not at your belt line. Stand relaxed, don&apos;t suck in your stomach. The tape should be snug but not compressing the skin. Take the measurement after a normal exhale.</p>
          <p><b>Neck (목둘레):</b> Measure just below the Adam&apos;s apple (larynx). Keep the tape level around the neck. Don&apos;t flex your neck muscles.</p>
          <p><b>Hip (엉덩이둘레, women only):</b> Measure at the widest point of your hips/buttocks. Stand with feet together and keep the tape level.</p>
          <p><b>Tips:</b> Use a flexible measuring tape. Take each measurement 2-3 times and use the average. Measure at the same time of day for consistency. Morning before eating gives the most consistent results.</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📊 Body Fat vs BMI: Which is Better?</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>BMI (체질량지수)</b> only uses height and weight, so it cannot distinguish between muscle and fat. A bodybuilder and an overweight person can have the same BMI but very different health profiles.</p>
          <p><b>Body fat percentage (체지방률)</b> directly measures fat proportion, making it a better indicator of health risk. The US Navy formula uses circumference measurements to estimate body density, then converts to body fat percentage.</p>
          <p><b>Other methods:</b> DEXA scans (가장 정확한 체지방 측정) are the gold standard but expensive. Bioelectrical impedance (인바디, InBody) is popular in Korean gyms and health checkups (건강검진) but can be affected by hydration levels. The US Navy method is free, requires no equipment beyond a tape measure, and is surprisingly accurate.</p>
          <p><b>For health in Korea:</b> Korean health checkups (건강검진) typically include InBody measurements. If your body fat is in the &quot;average&quot; or higher range, your doctor may recommend dietary changes. Korean fitness culture emphasizes body composition over weight, and most gyms (헬스장) offer regular InBody tests as part of membership.</p>
        </div>
      </Card>
    </>
  );
}
