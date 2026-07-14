'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Activity = 'sedentary' | 'normal' | 'active' | 'athlete';
type Season = 'normal' | 'summer';

const ACTIVITY_LABELS: Record<Activity, string> = {
  sedentary: 'Sedentary',
  normal: 'Moderate',
  active: 'Active',
  athlete: 'Athlete',
};

const ACTIVITY_MULTIPLIER: Record<Activity, number> = {
  sedentary: 1.0,
  normal: 1.2,
  active: 1.4,
  athlete: 1.6,
};

export default function WaterIntakeEn() {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState<Activity>('normal');
  const [season, setSeason] = useState<Season>('normal');

  const weightNum = +weight || 0;
  const baseML = weightNum * 30;
  const adjustedML = Math.round(baseML * ACTIVITY_MULTIPLIER[activity]);
  const totalML = season === 'summer' ? adjustedML + 500 : adjustedML;
  const cups = Math.ceil(totalML / 250);
  const bottles = Math.round((totalML / 500) * 10) / 10;
  const oz = Math.round(totalML * 0.033814 * 10) / 10;

  return (
    <>
      {/* Input */}
      <Card>
        <SectionTitle num="1">Your Information</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">Weight (kg)</label>
            <input
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="e.g. 70"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">Activity Level</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['sedentary', 'normal', 'active', 'athlete'] as const).map(a => (
                <button
                  key={a}
                  onClick={() => setActivity(a)}
                  className={`py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${activity === a ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
                >
                  {ACTIVITY_LABELS[a]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">Season</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSeason('normal')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${season === 'normal' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
              >
                Spring/Fall/Winter
              </button>
              <button
                onClick={() => setSeason('summer')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${season === 'summer' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
              >
                Summer (+500ml)
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Result */}
      <Card className="!p-5">
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">Recommended Daily Water Intake</div>
          <div className="text-[40px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none tabular-nums">
            {totalML.toLocaleString()} ml
          </div>
          <div className="text-xs text-[var(--sub)] mt-2">
            {weightNum > 0 && `${weightNum}kg x 30ml x ${ACTIVITY_MULTIPLIER[activity]}${season === 'summer' ? ' + 500ml summer' : ''}`}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{totalML.toLocaleString()}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">ml</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{cups}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">Cups (250ml)</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{oz}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">fl oz</div>
          </div>
        </div>
      </Card>

      {/* Hydration Schedule */}
      <Card>
        <SectionTitle num="2">Hydration Schedule</SectionTitle>
        <div className="flex flex-col gap-1.5">
          {[
            { time: 'Upon waking', amount: '200-300ml', note: 'Rehydrate after sleep' },
            { time: '30 min before meals', amount: '200ml', note: 'Aids digestion' },
            { time: 'During/after meals', amount: 'Small sips', note: 'Too much may hinder digestion' },
            { time: 'Before exercise', amount: '300-500ml', note: '30-60 min before' },
            { time: 'During exercise', amount: '150-200ml/20min', note: 'Small amounts frequently' },
            { time: 'After exercise', amount: '500ml+', note: 'Replace lost fluids' },
            { time: 'Before bed', amount: '100-200ml', note: 'Too much may disrupt sleep' },
          ].map(item => (
            <div key={item.time} className="flex justify-between items-center bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <div>
                <span className="text-[13px] font-semibold">{item.time}</span>
                <span className="text-[10px] text-[var(--sub)] ml-1.5">{item.note}</span>
              </div>
              <span className="text-[13px] font-bold tabular-nums">{item.amount}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Hydration Guide</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Signs of Dehydration:</b> Even mild dehydration (1-2% body weight water loss) can cause fatigue, reduced concentration, headaches, and dizziness. If your urine is dark yellow, you need more water. Drink before you feel thirsty.</p>
          <p><b>Coffee &amp; Tea:</b> Yes, coffee and tea count toward water intake. The diuretic effect of caffeine is mild, so most of the liquid is absorbed. However, it is best to drink plain water alongside caffeinated beverages.</p>
          <p><b>Overhydration:</b> Drinking excessively (more than 1 liter per hour) can cause hyponatremia (water intoxication). For healthy adults, 3-4 liters per day is generally safe. After heavy sweating, replenish electrolytes (sodium, potassium) as well.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. How much water should I drink per day?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. A general guideline is 30ml per kg of body weight. For a 70kg person, that is about 2,100ml (roughly 8-9 cups). Adjust based on activity level and climate.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. Does coffee count as water intake?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. Yes, coffee and tea do count. While caffeine has a mild diuretic effect, most of the liquid is still absorbed. Still, pure water should be your primary source of hydration.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. Can you drink too much water?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. Extremely excessive intake can cause hyponatremia (water intoxication). For healthy adults, up to 3-4 liters per day is generally safe. If exercising heavily, replenish electrolytes too.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          Recommendations are general guidelines. Individual needs may vary based on health conditions (kidney disease, heart conditions, etc.). Consult your doctor for personalized advice.
        </div>
      </footer>
    </>
  );
}
