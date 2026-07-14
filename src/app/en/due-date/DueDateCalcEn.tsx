'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const TRIMESTER_MILESTONES = [
  { week: 4, label: 'Implantation complete' },
  { week: 8, label: 'Heartbeat detectable (초음파)' },
  { week: 12, label: 'End of 1st trimester, NT scan' },
  { week: 16, label: 'Gender may be visible' },
  { week: 20, label: 'Anatomy scan (정밀초음파)' },
  { week: 24, label: 'Viability milestone' },
  { week: 28, label: 'Start of 3rd trimester' },
  { week: 32, label: 'Baby is about 1.8kg' },
  { week: 36, label: 'Full-term soon, weekly checkups' },
  { week: 40, label: 'Estimated due date (예정일)' },
];

export default function DueDateCalcEn() {
  const today = new Date();
  const [lmpYear, setLmpYear] = useState(today.getFullYear());
  const [lmpMonth, setLmpMonth] = useState(today.getMonth() + 1);
  const [lmpDay, setLmpDay] = useState(today.getDate());

  const lmp = new Date(lmpYear, (lmpMonth || 1) - 1, lmpDay || 1);
  const dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);

  const diffMs = today.getTime() - lmp.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const currentWeek = Math.floor(diffDays / 7);
  const currentDay = diffDays % 7;
  const daysRemaining = Math.max(0, 280 - diffDays);
  const weeksRemaining = Math.floor(daysRemaining / 7);

  const trimester = currentWeek < 13 ? 1 : currentWeek < 28 ? 2 : 3;
  const progressPercent = Math.min(100, Math.max(0, (diffDays / 280) * 100));

  const formatDate = (d: Date) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

  return (
    <>
      <Card>
        <SectionTitle num="1">Last Menstrual Period (LMP)</SectionTitle>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Year</label>
            <input type="number" value={lmpYear} onChange={e => setLmpYear(+e.target.value || today.getFullYear())} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Month</label>
            <select value={lmpMonth} onChange={e => setLmpMonth(+e.target.value)} className="w-full py-3 px-2 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] bg-white text-center">
              {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Day</label>
            <input type="number" min={1} max={31} value={lmpDay} onChange={e => setLmpDay(+e.target.value || 1)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
        </div>
        <p className="text-[11px] text-[var(--sub)] mt-1">Enter the first day of your last menstrual period (마지막 생리 시작일)</p>
      </Card>

      <Card className="!p-6">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[var(--primary-weak)] rounded-xl p-4 text-center col-span-2">
            <div className="text-[10px] text-[var(--primary)] font-bold uppercase">Estimated Due Date (예정일)</div>
            <div className="text-[28px] font-extrabold text-[var(--primary-dark)]">{formatDate(dueDate)}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Current Week</div>
            <div className="text-[32px] font-extrabold text-[var(--primary-dark)]">{currentWeek}</div>
            <div className="text-xs text-[var(--sub)]">weeks + {currentDay} days</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Trimester</div>
            <div className="text-[32px] font-extrabold text-[var(--primary-dark)]">{trimester}</div>
            <div className="text-xs text-[var(--sub)]">{trimester === 1 ? '1st (1~12w)' : trimester === 2 ? '2nd (13~27w)' : '3rd (28~40w)'}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-[var(--sub)] font-bold mb-1">
            <span>LMP</span>
            <span>{daysRemaining} days remaining</span>
            <span>Due</span>
          </div>
          <div className="w-full h-3 bg-[var(--bg)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--primary)] rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">Week-by-Week Milestones</SectionTitle>
        <div className="flex flex-col gap-2">
          {TRIMESTER_MILESTONES.map(m => (
            <div key={m.week} className={`flex items-center gap-3 p-2.5 rounded-xl text-xs ${currentWeek >= m.week ? 'bg-[var(--primary-weak)]' : 'bg-[var(--bg)]'}`}>
              <span className={`w-10 text-center font-extrabold text-sm ${currentWeek >= m.week ? 'text-[var(--primary)]' : 'text-[var(--sub)]'}`}>{m.week}w</span>
              <span className={`flex-1 ${currentWeek >= m.week ? 'text-[var(--primary-dark)] font-bold' : 'text-[#4E5968]'}`}>{m.label}</span>
              {currentWeek >= m.week && <span className="text-[var(--primary)] text-xs font-bold">Done</span>}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Guide: Prenatal Care in Korea</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Korea offers excellent prenatal care,</b> and most of it is covered by National Health Insurance (국민건강보험, NHI). As soon as you confirm your pregnancy, visit your local community health center (보건소) or an OB-GYN clinic (산부인과) to register. The Korean term for OB-GYN is &quot;sanbu-ingwa&quot; (산부인과).</p>
          <p><b>Goun Mom Card (고운맘카드):</b> Pregnant women in Korea receive this special card loaded with 1,000,000 won (1,500,000 won for multiples) to cover prenatal medical expenses. Apply through your NHI branch or the National Health Insurance website. The card covers ultrasounds (초음파), blood tests, prenatal vitamins, and more.</p>
          <p><b>Prenatal checkup schedule in Korea:</b> Weeks 4-28: visit every 4 weeks. Weeks 28-36: visit every 2 weeks. Weeks 36-40: visit every week. Key tests include the NT scan (12w), anatomy scan (정밀초음파, 20w), glucose test (임신성당뇨검사, 24-28w), and Group B strep test (36w).</p>
          <p><b>Finding English-speaking hospitals:</b> Major hospitals with international clinics include Samsung Medical Center (삼성서울병원), Asan Medical Center (서울아산병원), Severance Hospital (세브란스병원), and CHA Gangnam Medical Center. Many OB-GYN clinics in Gangnam, Itaewon, and Yongsan also have English-speaking staff. Search &quot;산부인과&quot; on Naver Maps and check reviews for English availability.</p>
          <p><b>Useful Korean terms:</b> Pregnant (임신), Due date (예정일), Ultrasound (초음파), Morning sickness (입덧), Contractions (진통), Delivery (분만), C-section (제왕절개), Postpartum care center (산후조리원) — these centers are uniquely Korean and provide 2-week post-birth recovery care with meals, nursing support, and newborn care.</p>
        </div>
      </Card>
    </>
  );
}
