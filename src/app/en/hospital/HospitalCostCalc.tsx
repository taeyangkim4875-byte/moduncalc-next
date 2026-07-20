'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Category = 'clinic' | 'hospital' | 'dental' | 'emergency' | 'pharmacy';

interface CostItem {
  service: string;
  serviceKr: string;
  withNHI: [number, number];
  withoutNHI: [number, number];
  note?: string;
}

const costData: Record<Category, { label: string; labelKr: string; items: CostItem[] }> = {
  clinic: {
    label: 'General Clinic',
    labelKr: '의원/병원',
    items: [
      { service: 'Basic consultation', serviceKr: '일반 진료', withNHI: [5000, 10000], withoutNHI: [15000, 30000] },
      { service: 'Cold/flu treatment', serviceKr: '감기 치료', withNHI: [8000, 15000], withoutNHI: [20000, 50000] },
      { service: 'Blood test', serviceKr: '혈액 검사', withNHI: [5000, 15000], withoutNHI: [20000, 50000] },
      { service: 'X-ray', serviceKr: 'X선 촬영', withNHI: [5000, 10000], withoutNHI: [15000, 40000] },
      { service: 'Health checkup (basic)', serviceKr: '건강검진 (기본)', withNHI: [0, 0], withoutNHI: [50000, 150000], note: 'Free every 2 years with NHI (40+: every year)' },
    ],
  },
  hospital: {
    label: 'Hospital Outpatient',
    labelKr: '종합병원 외래',
    items: [
      { service: 'Specialist consultation', serviceKr: '전문의 진료', withNHI: [10000, 20000], withoutNHI: [30000, 80000] },
      { service: 'CT scan', serviceKr: 'CT 촬영', withNHI: [30000, 80000], withoutNHI: [150000, 400000] },
      { service: 'MRI scan', serviceKr: 'MRI 촬영', withNHI: [50000, 150000], withoutNHI: [300000, 800000] },
      { service: 'Ultrasound', serviceKr: '초음파', withNHI: [10000, 30000], withoutNHI: [50000, 150000] },
      { service: 'Minor surgery', serviceKr: '소수술', withNHI: [30000, 100000], withoutNHI: [100000, 500000] },
    ],
  },
  dental: {
    label: 'Dental',
    labelKr: '치과',
    items: [
      { service: 'Dental cleaning (scaling)', serviceKr: '스케일링', withNHI: [0, 15000], withoutNHI: [50000, 80000], note: 'Free 1x/year with NHI (19+ age)' },
      { service: 'Dental filling', serviceKr: '충치 치료', withNHI: [10000, 30000], withoutNHI: [50000, 150000] },
      { service: 'Tooth extraction', serviceKr: '발치', withNHI: [10000, 20000], withoutNHI: [30000, 100000] },
      { service: 'Root canal', serviceKr: '신경치료', withNHI: [20000, 50000], withoutNHI: [100000, 300000] },
      { service: 'Crown (ceramic)', serviceKr: '크라운', withNHI: [200000, 400000], withoutNHI: [400000, 800000], note: 'Partially covered by NHI' },
      { service: 'Dental implant', serviceKr: '임플란트', withNHI: [500000, 800000], withoutNHI: [1000000, 2000000], note: 'NHI covers 65+ only (partially)' },
    ],
  },
  emergency: {
    label: 'Emergency Room',
    labelKr: '응급실',
    items: [
      { service: 'ER visit (mild)', serviceKr: '응급 진료 (경증)', withNHI: [20000, 50000], withoutNHI: [100000, 200000] },
      { service: 'ER visit (moderate)', serviceKr: '응급 진료 (중등도)', withNHI: [50000, 100000], withoutNHI: [200000, 500000] },
      { service: 'Ambulance (119)', serviceKr: '구급차', withNHI: [0, 0], withoutNHI: [0, 0], note: 'Free - call 119' },
      { service: 'ER + X-ray/CT', serviceKr: '응급 + 영상검사', withNHI: [50000, 150000], withoutNHI: [200000, 500000] },
      { service: 'ER hospitalization (per day)', serviceKr: '응급 입원 (1일)', withNHI: [30000, 80000], withoutNHI: [100000, 300000] },
    ],
  },
  pharmacy: {
    label: 'Pharmacy',
    labelKr: '약국',
    items: [
      { service: 'Prescription medicine (common)', serviceKr: '처방약 (일반)', withNHI: [3000, 5000], withoutNHI: [10000, 20000] },
      { service: 'Prescription medicine (specialist)', serviceKr: '처방약 (전문)', withNHI: [5000, 10000], withoutNHI: [15000, 30000] },
      { service: 'OTC cold medicine', serviceKr: '감기약 (일반의약품)', withNHI: [3000, 8000], withoutNHI: [3000, 8000], note: 'Same price (no prescription needed)' },
      { service: 'Prescription antibiotics', serviceKr: '항생제', withNHI: [3000, 7000], withoutNHI: [10000, 25000] },
    ],
  },
};

function fmt(n: number) {
  if (n === 0) return 'Free';
  return '₩' + n.toLocaleString();
}

function fmtRange(range: [number, number]) {
  if (range[0] === 0 && range[1] === 0) return 'Free';
  if (range[0] === 0) return 'Free ~ ' + fmt(range[1]);
  return fmt(range[0]) + ' ~ ' + fmt(range[1]);
}

export default function HospitalCostCalc() {
  const [category, setCategory] = useState<Category>('clinic');
  const data = costData[category];

  const tabs: { key: Category; label: string; icon: string }[] = [
    { key: 'clinic', label: 'Clinic', icon: '🏥' },
    { key: 'hospital', label: 'Hospital', icon: '🏨' },
    { key: 'dental', label: 'Dental', icon: '🦷' },
    { key: 'emergency', label: 'ER', icon: '🚑' },
    { key: 'pharmacy', label: 'Pharmacy', icon: '💊' },
  ];

  return (
    <>
      {/* Category Tabs */}
      <Card>
        <SectionTitle num="📋">Select Category</SectionTitle>
        <div className="grid grid-cols-5 gap-1.5">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setCategory(tab.key)}
              className={`py-2.5 px-1 rounded-xl text-center cursor-pointer transition-all border-[1.5px] ${
                category === tab.key
                  ? 'border-[var(--primary)] bg-[var(--primary-weak)]'
                  : 'border-[var(--line)]'
              }`}
            >
              <div className="text-lg">{tab.icon}</div>
              <div className="text-[10px] font-bold mt-0.5">{tab.label}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Cost Table */}
      <Card>
        <h2 className="text-base font-extrabold mb-1">{data.label}</h2>
        <p className="text-xs text-[var(--sub)] mb-4">{data.labelKr} &middot; Approximate 2026 prices</p>

        <div className="flex flex-col gap-3">
          {data.items.map((item, i) => (
            <div key={i} className="border-[1.5px] border-[var(--line)] rounded-xl p-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-bold">{item.service}</div>
                  <div className="text-[10px] text-[var(--sub)]">{item.serviceKr}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 rounded-lg p-2.5 text-center">
                  <div className="text-[10px] font-bold text-blue-600 uppercase">With NHI</div>
                  <div className="text-sm font-extrabold text-blue-700 mt-0.5">{fmtRange(item.withNHI)}</div>
                  <div className="text-[9px] text-blue-500">30% copay</div>
                </div>
                <div className="bg-red-50 rounded-lg p-2.5 text-center">
                  <div className="text-[10px] font-bold text-red-600 uppercase">Without NHI</div>
                  <div className="text-sm font-extrabold text-red-700 mt-0.5">{fmtRange(item.withoutNHI)}</div>
                  <div className="text-[9px] text-red-500">100% self-pay</div>
                </div>
              </div>
              {item.note && (
                <div className="text-[11px] text-[var(--primary)] font-semibold mt-2">{item.note}</div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* NHI Info */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">National Health Insurance (국민건강보험) for Foreigners</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Who is covered?</b> All foreigners staying in Korea for 6+ months are required to enroll in NHI (국민건강보험). This includes workers, students, and residents. Your employer handles enrollment if you are employed (they pay 50% of the premium).</p>
          <p><b>Monthly premium:</b> About ₩130,000/month (2026) for self-employed or students. Employed workers pay ~₩100,000~200,000 split 50/50 with employer, based on salary.</p>
          <p><b>What is covered?</b> NHI covers about 60-70% of most medical expenses. You pay the copay (본인부담금): 30% at clinics, 40-50% at hospitals, and 20% for pharmacy prescriptions. Some treatments like cosmetic surgery and non-essential dental work are not covered.</p>
        </div>
      </Card>

      {/* Hospital Visit Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">How to Visit a Hospital in Korea</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Step 1 - Registration (접수):</b> Go to the reception desk and present your ARC (외국인등록증) and insurance card (건강보험증). Fill out a basic form with your name, phone number, and symptoms. For large hospitals, you may need a referral letter (진료의뢰서) from a local clinic.</p>
          <p><b>Step 2 - Wait and Consult:</b> Wait for your number to be called. Consultation times are short (5-10 minutes is typical). The doctor may order tests (blood work, X-ray) which are done in the same building.</p>
          <p><b>Step 3 - Payment (수납):</b> After consultation, go to the payment counter (수납 창구). Pay your copay. You will receive a receipt and prescription if needed.</p>
          <p><b>Step 4 - Pharmacy (약국):</b> Take your prescription to any nearby pharmacy (약국). Pharmacies are everywhere in Korea, often right outside hospitals. Present the prescription and pay the pharmacy copay.</p>
          <p><b>What to bring:</b> ARC (외국인등록증), insurance card (건강보험증), cash or card for copay, any previous medical records or test results.</p>
          <p><b>Useful Korean phrases:</b></p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>&quot;접수하려고요&quot; - I want to register (at reception)</li>
            <li>&quot;여기가 아파요&quot; - It hurts here (while pointing)</li>
            <li>&quot;열이 나요&quot; - I have a fever</li>
            <li>&quot;알레르기가 있어요&quot; - I have allergies</li>
            <li>&quot;처방전 주세요&quot; - Please give me a prescription</li>
            <li>&quot;영어 되는 의사 있나요?&quot; - Is there an English-speaking doctor?</li>
          </ul>
          <p><b>International Clinics in Seoul:</b> Severance Hospital (세브란스병원), Samsung Medical Center (삼성서울병원), Seoul National University Hospital (서울대학교병원), and Asan Medical Center (아산병원) all have international clinics with English-speaking staff. These clinics cater to foreigners and accept NHI.</p>
        </div>
      </Card>
    </>
  );
}
