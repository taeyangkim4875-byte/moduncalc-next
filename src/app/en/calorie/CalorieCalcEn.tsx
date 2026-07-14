'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function CalorieCalcEn() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(1.55);

  // Mifflin-St Jeor
  const bmr = gender === 'male'
    ? 10 * (weight || 0) + 6.25 * (height || 0) - 5 * (age || 0) + 5
    : 10 * (weight || 0) + 6.25 * (height || 0) - 5 * (age || 0) - 161;

  const tdee = Math.round(bmr * activity);
  const lossSlow = Math.round(tdee - 250);
  const lossFast = Math.round(tdee - 500);
  const gain = Math.round(tdee + 300);

  const activityLevels = [
    { value: 1.2, label: 'Sedentary', desc: 'Little or no exercise, desk job' },
    { value: 1.375, label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
    { value: 1.55, label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
    { value: 1.725, label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
    { value: 1.9, label: 'Extremely Active', desc: 'Intense daily exercise or physical job' },
  ];

  const koreanFoods = [
    { name: 'Bibimbap (비빔밥)', cal: '~500 kcal', note: 'per serving' },
    { name: 'Samgyeopsal (삼겹살)', cal: '~350 kcal', note: 'per 100g' },
    { name: 'Kimbap (김밥)', cal: '~250 kcal', note: 'per roll' },
    { name: 'Kimchi Jjigae (김치찌개)', cal: '~150 kcal', note: 'per serving' },
    { name: 'Tteokbokki (떡볶이)', cal: '~380 kcal', note: 'per serving' },
    { name: 'Japchae (잡채)', cal: '~270 kcal', note: 'per serving' },
  ];

  const inputClass = "w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center";

  return (
    <>
      <Card>
        <SectionTitle num="1">Your Information</SectionTitle>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setGender('male')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${gender === 'male' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}>Male</button>
          <button onClick={() => setGender('female')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${gender === 'female' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}>Female</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Age</label>
            <input type="number" value={age} onChange={e => setAge(+e.target.value || 0)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Height (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(+e.target.value || 0)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(+e.target.value || 0)} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">Activity Level</label>
          <div className="flex flex-col gap-1.5">
            {activityLevels.map(lv => (
              <button key={lv.value} onClick={() => setActivity(lv.value)} className={`text-left px-3 py-2.5 rounded-xl border-[1.5px] transition-colors ${activity === lv.value ? 'bg-[var(--primary-weak)] border-[var(--primary)]' : 'border-[var(--line)]'}`}>
                <div className="text-sm font-bold">{lv.label}</div>
                <div className="text-xs text-[var(--sub)]">{lv.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="!p-6">
        <SectionTitle num="2">Your Daily Calorie Needs</SectionTitle>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">BMR</div>
            <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{Math.round(bmr).toLocaleString()}</div>
            <div className="text-xs text-[var(--sub)]">kcal/day at rest</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">TDEE (Maintenance)</div>
            <div className="text-[36px] font-extrabold text-[var(--primary-dark)]">{tdee.toLocaleString()}</div>
            <div className="text-xs text-[var(--sub)]">kcal/day</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <div className="text-[10px] text-green-600 font-bold uppercase">Mild Loss</div>
            <div className="text-xl font-extrabold text-green-700">{lossSlow.toLocaleString()}</div>
            <div className="text-[10px] text-green-600">-0.25 kg/wk</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <div className="text-[10px] text-orange-600 font-bold uppercase">Weight Loss</div>
            <div className="text-xl font-extrabold text-orange-700">{lossFast.toLocaleString()}</div>
            <div className="text-[10px] text-orange-600">-0.5 kg/wk</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <div className="text-[10px] text-blue-600 font-bold uppercase">Weight Gain</div>
            <div className="text-xl font-extrabold text-blue-700">{gain.toLocaleString()}</div>
            <div className="text-[10px] text-blue-600">+0.3 kg/wk</div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="3">Korean Food Calorie Reference</SectionTitle>
        <div className="flex flex-col gap-1.5">
          {koreanFoods.map(f => (
            <div key={f.name} className="flex items-center justify-between bg-[var(--bg)] rounded-lg px-3 py-2.5">
              <span className="text-sm font-bold">{f.name}</span>
              <div className="text-right">
                <span className="text-sm font-bold text-[var(--primary)]">{f.cal}</span>
                <span className="text-xs text-[var(--sub)] ml-1">{f.note}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 Understanding TDEE & Healthy Eating</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>What is TDEE?</b> Your Total Daily Energy Expenditure (TDEE) is the total number of calories you burn each day. It includes your Basal Metabolic Rate (BMR) -- the energy your body needs at complete rest -- plus the calories burned through physical activity and digesting food.</p>
          <p><b>The Mifflin-St Jeor equation</b> is used here because it is the most widely validated formula for estimating BMR. For men: 10 x weight(kg) + 6.25 x height(cm) - 5 x age + 5. For women: the same formula but minus 161 instead of plus 5.</p>
          <p><b>Healthy weight loss:</b> A safe rate of weight loss is 0.5-1 kg (1-2 lbs) per week, achieved by a daily deficit of 500-1,000 calories. Losing weight too quickly can lead to muscle loss, nutritional deficiencies, and metabolic slowdown. Never go below 1,200 kcal (women) or 1,500 kcal (men) without medical guidance.</p>
          <p><b>Korean diet tips:</b> Traditional Korean cuisine (한식) is generally well-balanced with plenty of vegetables, fermented foods like kimchi, and moderate portions of protein. A typical Korean meal with rice, soup, and side dishes (반찬) is around 500-700 kcal. Be mindful of high-calorie items like fried chicken (치킨), instant ramyeon (~500 kcal), and sugary drinks.</p>
          <p><b>Macronutrient balance:</b> A balanced diet typically consists of 45-65% carbohydrates, 20-35% fat, and 10-35% protein. For weight loss, slightly increasing protein intake (to about 1.6-2.2g per kg body weight) can help preserve muscle mass and improve satiety.</p>
        </div>
      </Card>
    </>
  );
}
