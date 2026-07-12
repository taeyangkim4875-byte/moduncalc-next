'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const won = (n: number) => '₩' + Math.round(n).toLocaleString();

type City = 'seoul-central' | 'seoul-outer' | 'busan' | 'other';
type Lifestyle = 'budget' | 'moderate' | 'comfortable';

const COSTS: Record<City, Record<Lifestyle, {
  rent: number; utilities: number; food: number; transport: number; phone: number; entertainment: number;
}>> = {
  'seoul-central': {
    budget:      { rent: 600000,  utilities: 100000, food: 400000, transport: 65000,  phone: 35000, entertainment: 150000 },
    moderate:    { rent: 900000,  utilities: 130000, food: 600000, transport: 65000,  phone: 50000, entertainment: 300000 },
    comfortable: { rent: 1400000, utilities: 160000, food: 800000, transport: 100000, phone: 65000, entertainment: 500000 },
  },
  'seoul-outer': {
    budget:      { rent: 400000,  utilities: 90000,  food: 350000, transport: 70000,  phone: 35000, entertainment: 100000 },
    moderate:    { rent: 650000,  utilities: 120000, food: 500000, transport: 70000,  phone: 50000, entertainment: 250000 },
    comfortable: { rent: 1000000, utilities: 150000, food: 700000, transport: 100000, phone: 65000, entertainment: 400000 },
  },
  'busan': {
    budget:      { rent: 350000,  utilities: 80000,  food: 300000, transport: 55000,  phone: 35000, entertainment: 100000 },
    moderate:    { rent: 550000,  utilities: 110000, food: 450000, transport: 55000,  phone: 50000, entertainment: 200000 },
    comfortable: { rent: 900000,  utilities: 140000, food: 650000, transport: 80000,  phone: 65000, entertainment: 350000 },
  },
  'other': {
    budget:      { rent: 300000,  utilities: 75000,  food: 280000, transport: 50000,  phone: 35000, entertainment: 80000 },
    moderate:    { rent: 450000,  utilities: 100000, food: 400000, transport: 50000,  phone: 50000, entertainment: 180000 },
    comfortable: { rent: 750000,  utilities: 130000, food: 600000, transport: 70000,  phone: 65000, entertainment: 300000 },
  },
};

const CITY_LABELS: Record<City, string> = {
  'seoul-central': 'Seoul (Gangnam, Mapo, Yongsan)',
  'seoul-outer': 'Seoul (Guro, Gwanak, Nowon)',
  'busan': 'Busan / Incheon',
  'other': 'Other cities',
};

const LIFESTYLE_LABELS: Record<Lifestyle, string> = {
  budget: 'Budget',
  moderate: 'Moderate',
  comfortable: 'Comfortable',
};

export default function CostOfLivingCalc() {
  const [city, setCity] = useState<City>('seoul-central');
  const [lifestyle, setLifestyle] = useState<Lifestyle>('moderate');

  const costs = COSTS[city][lifestyle];
  const total = costs.rent + costs.utilities + costs.food + costs.transport + costs.phone + costs.entertainment;

  const items = [
    { label: 'Rent (studio/1BR wolse)', amount: costs.rent, color: '#3182F6' },
    { label: 'Food & groceries', amount: costs.food, color: '#FF6B35' },
    { label: 'Entertainment & social', amount: costs.entertainment, color: '#7C3AED' },
    { label: 'Utilities (elec/gas/water)', amount: costs.utilities, color: '#10B981' },
    { label: 'Transport (subway/bus)', amount: costs.transport, color: '#F59E0B' },
    { label: 'Phone (mobile plan)', amount: costs.phone, color: '#6B7280' },
  ];

  return (
    <>
      <Card>
        <SectionTitle num="1">City</SectionTitle>
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {(Object.keys(CITY_LABELS) as City[]).map(c => (
            <button key={c} onClick={() => setCity(c)} className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${city === c ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
              {CITY_LABELS[c]}
            </button>
          ))}
        </div>

        <SectionTitle num="2">Lifestyle</SectionTitle>
        <div className="grid grid-cols-3 gap-1.5">
          {(Object.keys(LIFESTYLE_LABELS) as Lifestyle[]).map(l => (
            <button key={l} onClick={() => setLifestyle(l)} className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${lifestyle === l ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
              {LIFESTYLE_LABELS[l]}
            </button>
          ))}
        </div>
      </Card>

      <Card className="!p-6">
        <div className="text-center">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">Estimated Monthly Cost</div>
          <div className="text-[42px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(total)}</div>
          <div className="text-sm text-[var(--sub)] mt-1">~${Math.round(total / 1380).toLocaleString()} USD</div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="3">Breakdown</SectionTitle>
        <div className="flex flex-col gap-2">
          {items.map(item => (
            <div key={item.label}>
              <div className="flex justify-between items-center text-[13px] mb-1">
                <span className="font-semibold text-[var(--sub)]">{item.label}</span>
                <span className="font-bold">{won(item.amount)}</span>
              </div>
              <div className="w-full h-2 bg-[var(--bg)] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(item.amount / total) * 100}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center text-[13px] border-t border-[var(--line)] pt-2.5 mt-1">
            <span className="font-bold">Total</span>
            <span className="font-extrabold text-[var(--primary-dark)]">{won(total)}</span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 Cost of Living Tips</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2">
          <p><b>Rent:</b> Wolse (monthly rent + small deposit) is most common for foreigners. Expect ₩300K-500K deposit. Officetels near subway stations offer the best value.</p>
          <p><b>Food:</b> Eating out is affordable (₩7,000-12,000 per meal). Cooking at home with local ingredients is even cheaper. Imported groceries cost 2-3x.</p>
          <p><b>Transport:</b> T-money card gives you free transfers between subway and bus. Monthly pass available for ₩65,000.</p>
          <p><b>Phone:</b> Budget MVNOs (알뜰폰) like Mint Mobile KR or KT M offer unlimited data from ₩30,000/month.</p>
        </div>
      </Card>
    </>
  );
}
