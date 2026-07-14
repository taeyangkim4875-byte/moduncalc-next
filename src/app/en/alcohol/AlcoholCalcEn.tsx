'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const DRINK_PRESETS = [
  { label: 'Soju shot', ml: 50, abv: 17 },
  { label: 'Soju bottle', ml: 360, abv: 17 },
  { label: 'Beer 500ml', ml: 500, abv: 5 },
  { label: 'Beer pint', ml: 473, abv: 5 },
  { label: 'Wine glass', ml: 150, abv: 13 },
  { label: 'Custom', ml: 0, abv: 0 },
];

export default function AlcoholCalcEn() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState(70);
  const [preset, setPreset] = useState(0);
  const [drinks, setDrinks] = useState(1);
  const [ml, setMl] = useState(DRINK_PRESETS[0].ml);
  const [abv, setAbv] = useState(DRINK_PRESETS[0].abv);
  const [elapsed, setElapsed] = useState(0);

  const handlePreset = (idx: number) => {
    setPreset(idx);
    if (idx < DRINK_PRESETS.length - 1) {
      setMl(DRINK_PRESETS[idx].ml);
      setAbv(DRINK_PRESETS[idx].abv);
    }
  };

  // Widmark formula
  const r = gender === 'male' ? 0.68 : 0.55;
  const alcoholGrams = (ml || 0) * (drinks || 0) * ((abv || 0) / 100) * 0.789;
  const rawBac = alcoholGrams / ((weight || 70) * r * 10);
  const metabolized = (elapsed || 0) * 0.015;
  const currentBac = Math.max(0, rawBac - metabolized);
  const hoursToSafe = currentBac > 0 ? Math.ceil((currentBac / 0.015) * 10) / 10 : 0;
  const hoursToZero = currentBac > 0 ? Math.ceil((currentBac / 0.015) * 10) / 10 : 0;

  const penaltyLevel = currentBac >= 0.08 ? 'revocation' : currentBac >= 0.03 ? 'suspension' : 'safe';

  return (
    <>
      <Card>
        <SectionTitle num="1">Your Info</SectionTitle>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Gender</label>
            <div className="flex gap-2">
              <button onClick={() => setGender('male')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${gender === 'male' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>Male</button>
              <button onClick={() => setGender('female')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${gender === 'female' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>Female</button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">What Did You Drink?</SectionTitle>
        <div className="mb-3">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">Drink Type</label>
          <div className="grid grid-cols-3 gap-1.5">
            {DRINK_PRESETS.map((d, i) => (
              <button key={i} onClick={() => handlePreset(i)} className={`py-2 rounded-lg text-xs font-bold border-[1.5px] transition-colors ${preset === i ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>{d.label}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Qty</label>
            <input type="number" min={1} value={drinks} onChange={e => setDrinks(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">ml each</label>
            <input type="number" value={ml} onChange={e => setMl(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">ABV %</label>
            <input type="number" step={0.1} value={abv} onChange={e => setAbv(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">Hours since first drink</label>
          <input type="number" step={0.5} min={0} value={elapsed} onChange={e => setElapsed(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
        </div>
      </Card>

      <Card className="!p-6">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`rounded-xl p-4 text-center ${penaltyLevel === 'safe' ? 'bg-green-50' : penaltyLevel === 'suspension' ? 'bg-yellow-50' : 'bg-red-50'}`}>
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Current BAC</div>
            <div className={`text-[32px] font-extrabold ${penaltyLevel === 'safe' ? 'text-green-600' : penaltyLevel === 'suspension' ? 'text-yellow-600' : 'text-red-600'}`}>{currentBac.toFixed(3)}%</div>
            <div className={`text-xs font-bold ${penaltyLevel === 'safe' ? 'text-green-600' : penaltyLevel === 'suspension' ? 'text-yellow-600' : 'text-red-600'}`}>
              {penaltyLevel === 'safe' ? 'Below limit' : penaltyLevel === 'suspension' ? 'License suspension' : 'License revocation'}
            </div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Safe to Drive In</div>
            <div className="text-[32px] font-extrabold text-[var(--primary-dark)]">{hoursToZero.toFixed(1)}</div>
            <div className="text-xs text-[var(--sub)]">hours</div>
          </div>
        </div>

        <div className="rounded-xl border-[1.5px] border-[var(--line)] p-3">
          <div className="text-xs font-bold text-[var(--sub)] mb-2">Korean DUI Penalties</div>
          <div className="flex flex-col gap-1.5 text-xs">
            <div className={`flex justify-between ${currentBac >= 0.03 ? 'font-bold text-yellow-700' : 'text-[#4E5968]'}`}>
              <span>0.03% ~ 0.08%</span>
              <span>License suspension + fine (음주운전)</span>
            </div>
            <div className={`flex justify-between ${currentBac >= 0.08 ? 'font-bold text-red-700' : 'text-[#4E5968]'}`}>
              <span>0.08% and above</span>
              <span>License revocation + criminal charges</span>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Guide: Korea&apos;s Strict DUI Laws</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Korea has some of the strictest DUI laws in the world.</b> The legal BAC limit was lowered from 0.05% to 0.03% in June 2019 (the so-called &quot;Yoon Chang-ho Act&quot;, 윤창호법). This means even 1-2 drinks can put you over the limit.</p>
          <p><b>Soju and BAC:</b> A standard bottle of soju (소주, 360ml) is typically 16-17% ABV. For a 70kg male, just one bottle can raise your BAC to roughly 0.07% — well above the legal limit. Popular brands include Chamisul (참이슬), Chum Churum (처음처럼), and Jinro (진로).</p>
          <p><b>Designated driver services (대리운전):</b> Korea has a unique and affordable designated driver service called &quot;daeri-unjeon&quot; (대리운전). Instead of leaving your car behind, you call a service (through apps like Kakao T or T Map), and a professional driver comes to drive YOUR car home while you ride as a passenger. It typically costs 15,000~30,000 won depending on distance — far cheaper than a DUI fine of 3~5 million won.</p>
          <p><b>What happens if you get caught:</b> At 0.03% BAC, you face license suspension (100 days), a fine of 3~5 million won, and possible criminal record. At 0.08%, your license is revoked, you face 1~5 years in prison, and up to 20 million won in fines. Repeat offenders face even harsher penalties.</p>
          <p><b>Disclaimer:</b> This calculator provides estimates only. Actual BAC varies based on food intake, metabolism, body composition, and other factors. When in doubt, always use a designated driver service or take a taxi.</p>
        </div>
      </Card>
    </>
  );
}
