'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import Link from 'next/link';

const won = (n: number) => '₩' + Math.round(n).toLocaleString();

type Industry = 'it' | 'teaching' | 'engineering' | 'finance' | 'marketing' | 'hospitality';
type Experience = '0-1' | '1-3' | '3-5' | '5-10' | '10+';

interface SalaryRange {
  min: number;
  max: number;
  median: number;
}

interface IndustryData {
  label: string;
  labelKr: string;
  visa: string;
  ranges: Record<Experience, SalaryRange>;
  benefits: string[];
  notes: string;
}

const DATA: Record<Industry, IndustryData> = {
  it: {
    label: 'IT / Tech',
    labelKr: 'IT/테크',
    visa: 'E-7 (Professional)',
    ranges: {
      '0-1': { min: 3000, max: 4500, median: 3500 },
      '1-3': { min: 3500, max: 5500, median: 4500 },
      '3-5': { min: 4500, max: 7500, median: 5800 },
      '5-10': { min: 6000, max: 10000, median: 7500 },
      '10+': { min: 8000, max: 15000, median: 10000 },
    },
    benefits: ['Stock options (RSU/SO) common at startups', 'Flexible working hours', 'Remote work options (재택근무)', 'Annual training/conference budget'],
    notes: 'Korean tech companies (Naver, Kakao, Coupang, Samsung) offer competitive salaries. Foreign companies (Google, Microsoft) in Korea pay 20-50% more. English-speaking roles in international teams are in demand.',
  },
  teaching: {
    label: 'English Teaching',
    labelKr: '영어교육',
    visa: 'E-2 (Language Instructor)',
    ranges: {
      '0-1': { min: 2100, max: 2500, median: 2300 },
      '1-3': { min: 2300, max: 2800, median: 2500 },
      '3-5': { min: 2500, max: 3200, median: 2800 },
      '5-10': { min: 2800, max: 3500, median: 3000 },
      '10+': { min: 3000, max: 4000, median: 3200 },
    },
    benefits: ['Free housing (single studio) or ₩400-600K housing allowance', 'Round-trip airfare (1x/year)', '₩1-2M completion bonus (퇴직금)', 'National pension + health insurance'],
    notes: 'EPIK (public schools) pays ₩2.1-2.8M based on qualifications. Hagwons (학원) vary widely — negotiate housing, hours, and severance carefully. International schools pay ₩3-5M+ but require teaching licenses.',
  },
  engineering: {
    label: 'Engineering',
    labelKr: '엔지니어링',
    visa: 'E-7 (Professional)',
    ranges: {
      '0-1': { min: 3000, max: 4000, median: 3500 },
      '1-3': { min: 3500, max: 5000, median: 4200 },
      '3-5': { min: 4500, max: 6500, median: 5500 },
      '5-10': { min: 5500, max: 8500, median: 7000 },
      '10+': { min: 7000, max: 12000, median: 9000 },
    },
    benefits: ['Performance bonus (성과급) 100-400% of monthly salary', 'Company housing support in some cases', 'Overtime pay for manufacturing roles', 'Technical certification allowances'],
    notes: 'Samsung, LG, Hyundai, and SK offer strong packages for engineers. Manufacturing/semiconductor roles may include shift premiums. R&D centers often have English-friendly environments.',
  },
  finance: {
    label: 'Finance',
    labelKr: '금융',
    visa: 'E-7 (Professional)',
    ranges: {
      '0-1': { min: 3500, max: 5000, median: 4000 },
      '1-3': { min: 4000, max: 6500, median: 5000 },
      '3-5': { min: 5500, max: 9000, median: 7000 },
      '5-10': { min: 7000, max: 13000, median: 9500 },
      '10+': { min: 9000, max: 20000, median: 12000 },
    },
    benefits: ['Large performance bonuses (상여금)', 'Financial product discounts', 'Professional certification support (CFA, CPA)', 'Meal and transportation allowances'],
    notes: 'Foreign banks and investment firms in Yeouido (여의도) pay premium salaries. Fintech companies (Toss, Kakao Pay) are competitive. Korean language ability significantly increases earning potential.',
  },
  marketing: {
    label: 'Marketing / Content',
    labelKr: '마케팅/콘텐츠',
    visa: 'E-7 (Professional)',
    ranges: {
      '0-1': { min: 2500, max: 3500, median: 3000 },
      '1-3': { min: 3000, max: 4500, median: 3800 },
      '3-5': { min: 3800, max: 6000, median: 4800 },
      '5-10': { min: 5000, max: 8000, median: 6000 },
      '10+': { min: 6000, max: 10000, median: 7500 },
    },
    benefits: ['Creative freedom in international teams', 'Event/conference attendance', 'Flexible hours common at agencies', 'Portfolio development opportunities'],
    notes: 'Global marketing roles value native English speakers highly. K-beauty, K-pop entertainment, and gaming companies actively recruit foreigners for international marketing. Content creation and social media roles growing.',
  },
  hospitality: {
    label: 'Hospitality / Tourism',
    labelKr: '관광/호텔',
    visa: 'E-7 or H-1 (Working Holiday)',
    ranges: {
      '0-1': { min: 2100, max: 2800, median: 2400 },
      '1-3': { min: 2500, max: 3200, median: 2800 },
      '3-5': { min: 2800, max: 3800, median: 3200 },
      '5-10': { min: 3200, max: 5000, median: 4000 },
      '10+': { min: 4000, max: 7000, median: 5000 },
    },
    benefits: ['Meal provided during shifts', 'Hotel/resort discounts', 'Tips (not standard in Korea but growing)', 'Language skill premiums for multilingual staff'],
    notes: 'International hotels (Marriott, Hilton, Grand Hyatt) pay better than Korean chains. Tourism recovery post-COVID has increased demand for multilingual staff. Seasonal work opportunities at ski resorts and beach towns.',
  },
};

const EXP_LABELS: Record<Experience, string> = {
  '0-1': 'Entry (0-1 yr)',
  '1-3': 'Junior (1-3 yr)',
  '3-5': 'Mid (3-5 yr)',
  '5-10': 'Senior (5-10 yr)',
  '10+': 'Expert (10+ yr)',
};

export default function SalaryNegotiationCalc() {
  const [industry, setIndustry] = useState<Industry>('it');
  const [experience, setExperience] = useState<Experience>('1-3');

  const data = DATA[industry];
  const range = data.ranges[experience];

  return (
    <>
      <Card>
        <SectionTitle num="1">Industry</SectionTitle>
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {(Object.keys(DATA) as Industry[]).map(ind => (
            <button key={ind} onClick={() => setIndustry(ind)} className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${industry === ind ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
              {DATA[ind].label}
            </button>
          ))}
        </div>

        <SectionTitle num="2">Experience Level</SectionTitle>
        <div className="grid grid-cols-3 gap-1.5">
          {(Object.keys(EXP_LABELS) as Experience[]).map(exp => (
            <button key={exp} onClick={() => setExperience(exp)} className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${experience === exp ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>
              {EXP_LABELS[exp]}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-extrabold">{data.label} ({data.labelKr})</h2>
          <span className="text-xs font-bold text-[var(--primary)]">{data.visa}</span>
        </div>
        <p className="text-xs text-[#8B95A1] mb-4">{EXP_LABELS[experience]} level · Monthly salary range</p>

        <div className="p-4 bg-[var(--bg)] rounded-xl mb-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-xs text-[#8B95A1]">Min</div>
              <div className="text-sm font-bold">{won(range.min * 10000)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-[var(--primary)] font-bold">Median</div>
              <div className="text-2xl font-extrabold text-[var(--primary)]">{won(range.median * 10000)}</div>
              <div className="text-xs text-[#8B95A1]">/month</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#8B95A1]">Max</div>
              <div className="text-sm font-bold">{won(range.max * 10000)}</div>
            </div>
          </div>
          <div className="w-full h-2 bg-[var(--line)] rounded-full relative">
            <div
              className="h-full bg-[var(--primary)] rounded-full"
              style={{ width: `${((range.median - range.min) / (range.max - range.min)) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-[#8B95A1] text-center">
            Annual: {won(range.median * 10000 * 12)}/year (before tax)
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2">Typical Benefits</h3>
          <ul className="text-sm text-[#4E5968] leading-relaxed space-y-1 list-disc pl-5">
            {data.benefits.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>

        <div className="p-3 bg-[var(--bg)] rounded-xl">
          <p className="text-sm text-[#4E5968] leading-relaxed">{data.notes}</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Salary Comparison by Experience</h2>
        <div className="space-y-1.5">
          {(Object.keys(EXP_LABELS) as Experience[]).map(exp => {
            const r = data.ranges[exp];
            const maxAll = Math.max(...Object.values(data.ranges).map(v => v.max));
            return (
              <div key={exp} className={`flex items-center gap-3 p-2.5 rounded-lg ${experience === exp ? 'bg-[var(--primary-weak)]' : 'bg-[var(--bg)]'}`}>
                <span className="text-xs font-bold w-20 flex-none">{EXP_LABELS[exp].split(' (')[0]}</span>
                <div className="flex-1 h-4 bg-[var(--line)] rounded-full relative overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      marginLeft: `${(r.min / maxAll) * 100}%`,
                      width: `${((r.max - r.min) / maxAll) * 100}%`,
                      backgroundColor: experience === exp ? 'var(--primary)' : '#8B95A1',
                    }}
                  />
                </div>
                <span className="text-xs font-bold w-24 text-right flex-none">{won(r.median * 10000)}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Salary Negotiation Tips in Korea</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Tip 1</span>
            <span className="text-sm text-[#4E5968]"><b>Ask about total compensation (연봉 패키지):</b> Korean salary offers typically quote the annual amount. Ask about bonuses (상여금/성과급), which can add 100-400% of monthly salary. The &quot;13th month bonus&quot; (명절 상여) is common — extra payments at Seollal and Chuseok.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Tip 2</span>
            <span className="text-sm text-[#4E5968]"><b>Negotiate benefits, not just salary:</b> Housing support (주거비 지원) is especially valuable — free housing or ₩500K-1M/month allowance saves ₩6-12M/year. Also negotiate: flight tickets home, moving allowance (이사비), Korean language classes, and flexible hours (유연근무).</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Tip 3</span>
            <span className="text-sm text-[#4E5968]"><b>Know your severance (퇴직금):</b> Korean law guarantees 1 month&apos;s salary for each year of employment as severance pay. This is separate from your salary and is legally required. Some companies offer a defined contribution pension (DC형 퇴직연금) instead.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Tip 4</span>
            <span className="text-sm text-[#4E5968]"><b>Check pension refund eligibility:</b> Workers from countries without a pension totalization agreement with Korea can claim a <b>pension lump-sum refund</b> (국민연금 반환일시금) when leaving Korea. This returns your National Pension contributions. Countries with agreements (USA, UK, etc.) transfer pension credits instead.</span>
          </div>
        </div>
        <p className="text-xs text-[#8B95A1] mt-3">
          Calculate your take-home pay: <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link>
        </p>
      </Card>
    </>
  );
}
