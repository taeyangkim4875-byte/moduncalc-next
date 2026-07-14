'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const PYEONG_TO_SQM = 3.3058;

export default function PyeongCalcEn() {
  const [mode, setMode] = useState<'toSqm' | 'toPyeong'>('toSqm');
  const [value, setValue] = useState(33);

  const sqm = mode === 'toSqm' ? (value || 0) * PYEONG_TO_SQM : (value || 0);
  const pyeong = mode === 'toPyeong' ? (value || 0) : (value || 0);
  const resultSqm = mode === 'toSqm' ? (value || 0) * PYEONG_TO_SQM : (value || 0);
  const resultPyeong = mode === 'toPyeong' ? (value || 0) : (value || 0);
  const converted = mode === 'toSqm' ? resultSqm : (value || 0) / PYEONG_TO_SQM;
  const sqft = mode === 'toSqm' ? resultSqm * 10.7639 : (value || 0) * 10.7639;

  const displaySqm = mode === 'toSqm' ? resultSqm : (value || 0);
  const displayPyeong = mode === 'toSqm' ? (value || 0) : converted;
  const displaySqft = mode === 'toSqm' ? resultSqm * 10.7639 : (value || 0) * 10.7639;

  const commonSizes = [
    { pyeong: 15, type: 'Studio / Officetel', rooms: 'Studio/1BR' },
    { pyeong: 24, type: 'Small Apartment', rooms: '1-2 BR' },
    { pyeong: 33, type: 'Standard Apartment', rooms: '2-3 BR' },
    { pyeong: 43, type: 'Large Apartment', rooms: '3-4 BR' },
    { pyeong: 55, type: 'Premium Apartment', rooms: '4+ BR' },
  ];

  const inputClass = "w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center";

  return (
    <>
      <Card>
        <SectionTitle num="1">Convert</SectionTitle>
        <div className="flex gap-2 mb-4">
          <button onClick={() => { setMode('toSqm'); setValue(33); }} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${mode === 'toSqm' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}>Pyeong → ㎡</button>
          <button onClick={() => { setMode('toPyeong'); setValue(109); }} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${mode === 'toPyeong' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}>㎡ → Pyeong</button>
        </div>
        <div>
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">{mode === 'toSqm' ? 'Pyeong (평)' : 'Square Meters (㎡)'}</label>
          <input type="number" value={value} onChange={e => setValue(+e.target.value || 0)} className={inputClass} />
        </div>
      </Card>

      <Card className="!p-6">
        <SectionTitle num="2">Result</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Pyeong (평)</div>
            <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{displayPyeong.toFixed(1)}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">㎡</div>
            <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{displaySqm.toFixed(1)}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">sq ft</div>
            <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{displaySqft.toFixed(0)}</div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="3">Common Korean Apartment Sizes</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--line)]">
                <th className="text-left py-2 text-xs font-bold text-[var(--sub)]">Pyeong</th>
                <th className="text-center py-2 text-xs font-bold text-[var(--sub)]">㎡</th>
                <th className="text-center py-2 text-xs font-bold text-[var(--sub)]">sq ft</th>
                <th className="text-right py-2 text-xs font-bold text-[var(--sub)]">Type</th>
              </tr>
            </thead>
            <tbody>
              {commonSizes.map(s => (
                <tr key={s.pyeong} className="border-b border-[var(--line)] last:border-0">
                  <td className="py-2.5 font-bold">{s.pyeong}평</td>
                  <td className="py-2.5 text-center">{(s.pyeong * PYEONG_TO_SQM).toFixed(0)} ㎡</td>
                  <td className="py-2.5 text-center">{(s.pyeong * PYEONG_TO_SQM * 10.7639).toFixed(0)} ft²</td>
                  <td className="py-2.5 text-right text-xs text-[var(--sub)]">{s.type} ({s.rooms})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionTitle num="4">Exclusive vs Gross Area</SectionTitle>
        <div className="flex flex-col gap-2">
          <div className="bg-[var(--bg)] rounded-xl p-3">
            <div className="text-sm font-bold mb-1">Exclusive Area (전용면적)</div>
            <div className="text-xs text-[var(--sub)]">The actual livable space inside your apartment unit. This is what you can use -- bedrooms, living room, kitchen, and bathrooms. This is the number used in official listings.</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3">
            <div className="text-sm font-bold mb-1">Gross/Supply Area (공급면적)</div>
            <div className="text-xs text-[var(--sub)]">Includes your exclusive area plus your share of common spaces (hallways, elevator lobbies, stairs). Typically 25-35% larger than the exclusive area. When Koreans casually say &quot;33-pyeong,&quot; they usually mean this number.</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-3">
            <div className="text-sm font-bold mb-1">Example</div>
            <div className="text-xs text-[var(--sub)]">A &quot;33-pyeong&quot; apartment (공급면적 109㎡) typically has an exclusive area of about 84㎡ (~25 pyeong). Always check the 전용면적 to know your actual living space.</div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 Understanding Korean Real Estate</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Why pyeong still matters:</b> Although Korea officially adopted the metric system, pyeong (평) remains deeply embedded in real estate culture. All listings show square meters, but almost everyone discusses apartment sizes in pyeong. Understanding this unit is essential for apartment hunting in Korea.</p>
          <p><b>Apartment size by lifestyle:</b> Studios and officetels (오피스텔) range from 10-20 pyeong, suitable for singles. The most common family apartment is the 33-pyeong (109㎡ gross, ~84㎡ exclusive) with 3 bedrooms. Premium apartments at 43+ pyeong offer spacious living with 3-4 bedrooms and separate living/dining areas.</p>
          <p><b>Reading Korean listings:</b> Look for 전용면적 (exclusive area) in listings -- this is your actual space. The 공급면적 (gross area) includes shared building areas. Some listings also show 계약면적 (contract area) which includes even more shared spaces. Always compare exclusive areas when comparing apartments.</p>
          <p><b>Common Korean apartment terms:</b> 아파트 (apartment complex), 빌라 (villa/low-rise), 오피스텔 (officetel/studio), 원룸 (one-room/studio), 전세 (jeonse/deposit lease), 월세 (wolse/monthly rent). For more on rent types, check our <a href="/en/rent" className="text-[var(--primary)] font-bold hover:underline">rent calculator</a>.</p>
          <p><b>Price context:</b> Korean apartment prices are often quoted per pyeong. For example, if an apartment costs 50만원/평, a 33-pyeong apartment would cost about 1.65억원. This per-pyeong price helps compare apartments of different sizes.</p>
        </div>
      </Card>
    </>
  );
}
