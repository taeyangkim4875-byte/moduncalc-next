'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SubItem {
  label: string;
  href: string;
}

interface MenuItem {
  href: string;
  ico: string;
  label: string;
  sub: SubItem[];
}

const MENUS_KO: MenuItem[] = [
  { href: '/calc', ico: '🧮', label: '스마트 계산기', sub: [
    { label: '수식 입력 계산기', href: '/calc' }
  ]},
  { href: '/savings', ico: '🏦', label: '적금/예금', sub: [
    { label: '적금·예금 이자', href: '/savings/interest' },
    { label: '청년도약계좌', href: '/savings/doyak' },
    { label: '청년미래적금', href: '/savings/mirae' },
  ]},
  { href: '/salary', ico: '💰', label: '연봉/급여', sub: [
    { label: '연봉 상위%', href: '/salary' },
    { label: '실수령액 표', href: '/salary/table' },
    { label: '최저시급·주휴수당', href: '/salary/minimum' },
    { label: '퇴직금', href: '/salary/severance' },
    { label: '월급 카운터', href: '/salary/live' },
    { label: '연봉 환산기', href: '/salary/convert' },
    { label: '월급 달력', href: '/salary/calendar' },
    { label: '평생 근로소득', href: '/salary/lifetime' },
    { label: '육아휴직 급여', href: '/salary/parental' },
    { label: '연차 계산기', href: '/salary/annual' },
  ]},
  { href: '/pension', ico: '👵', label: '연금/보험', sub: [
    { label: '실업급여', href: '/pension/jobless' },
    { label: '국민연금', href: '/pension/nps' }
  ]},
  { href: '/loan', ico: '🏠', label: '대출/이자', sub: [
    { label: '원리금균등 vs 원금균등', href: '/loan' },
    { label: '자동차 할부', href: '/loan/car' },
    { label: 'DSR 계산기', href: '/loan/dsr' },
  ]},
  { href: '/health', ico: '💪', label: '건강', sub: [
    { label: 'BMI', href: '/health/bmi' },
    { label: '체지방률', href: '/health/bodyfat' },
    { label: '물 섭취량', href: '/health/water' },
    { label: '어린이 BMI', href: '/daily/bmi-child' },
    { label: '기초대사량', href: '/health/bmr' }
  ]},
  { href: '/daily/charcount', ico: '🔧', label: '도구', sub: [
    { label: '글자수 세기', href: '/daily/charcount' },
    { label: '비밀번호 생성', href: '/daily/password' },
    { label: '랜덤 뽑기', href: '/daily/random' },
    { label: '시간 계산기', href: '/daily/time' },
    { label: '퍼센트', href: '/daily/percent' },
    { label: '할인가', href: '/daily/discount' },
    { label: '단위변환', href: '/daily/unit' },
    { label: '평수 변환', href: '/daily/pyeong' },
  ]},
  { href: '/daily/dday', ico: '📅', label: '날짜/기념일', sub: [
    { label: 'D-day', href: '/daily/dday' },
    { label: '나이', href: '/daily/age' },
    { label: '기념일', href: '/daily/anniversary' },
    { label: '아기 100일·돌', href: '/daily/baby100' },
    { label: '출산 예정일', href: '/daily/due-date' },
    { label: '음력 양력', href: '/daily/lunar' },
    { label: '전역일', href: '/daily/military' },
  ]},
  { href: '/daily/fuel', ico: '🚗', label: '자동차/생활비', sub: [
    { label: '연비·전비', href: '/daily/fuel' },
    { label: '자동차세', href: '/daily/cartax' },
    { label: '에어컨 전기요금', href: '/daily/aircon' },
    { label: '전기요금', href: '/daily/electric' },
    { label: '수도요금', href: '/daily/water' },
    { label: '가스요금', href: '/daily/gas' },
    { label: '에어프라이어', href: '/daily/airfryer' },
    { label: '페인트·벽지', href: '/daily/paint' },
    { label: '여행 경비', href: '/daily/travel' },
  ]},
  { href: '/daily/stock', ico: '💹', label: '투자/부업', sub: [
    { label: '주식 수익률', href: '/daily/stock' },
    { label: '가상자산', href: '/daily/crypto' },
    { label: '금 시세', href: '/daily/gold' },
    { label: '복리 계산기', href: '/daily/compound' },
    { label: 'FIRE', href: '/daily/fire' },
    { label: '애드센스 수익', href: '/daily/adsense' },
    { label: '쿠팡 파트너스', href: '/daily/coupang' },
    { label: '유튜브 수익', href: '/daily/youtube' },
  ]},
  { href: '/daily/calorie', ico: '🍎', label: '기타', sub: [
    { label: '칼로리', href: '/daily/calorie' },
    { label: '수면 계산기', href: '/health/sleep' },
    { label: '더치페이', href: '/daily/dutch' },
    { label: '모임 정산', href: '/daily/tip-split' },
    { label: '음주 운전', href: '/daily/alcohol' },
    { label: '학점(GPA)', href: '/daily/gpa' },
    { label: '속도·시간', href: '/daily/speed' },
  ]},
  { href: '/realestate', ico: '🏢', label: '부동산', sub: [
    { label: '취득세', href: '/realestate/acqtax' },
    { label: '전월세 전환', href: '/realestate/convert' },
    { label: '임대수익률', href: '/realestate/rental' },
    { label: '복비(중개수수료)', href: '/realestate/commission' },
    { label: '양도소득세', href: '/realestate/transfer' },
    { label: '청약 가점', href: '/realestate/subscription' },
    { label: '등기비용', href: '/realestate/registration' },
  ]},
  { href: '/tax', ico: '🧾', label: '세금', sub: [
    { label: '부가세', href: '/tax/vat' },
    { label: '종합소득세', href: '/tax/income' },
    { label: '증여세', href: '/tax/gift' },
    { label: '상속세', href: '/tax/inherit' },
  ]},
  { href: '/guide', ico: '📖', label: '가이드', sub: [
    { label: '연봉 실수령액 정리', href: '/guide/salary-net-pay' },
    { label: '도약 vs 미래적금', href: '/guide/doyak-vs-mirae' },
    { label: '4대보험 총정리', href: '/guide/4-insurance' },
    { label: '전세 계약 가이드', href: '/guide/jeonse' },
    { label: '연말정산 가이드', href: '/guide/year-end-tax' },
    { label: '퇴직금 정리', href: '/guide/severance-pay' },
    { label: '최저시급 정리', href: '/guide/minimum-wage' },
    { label: '대출 상환 비교', href: '/guide/loan-comparison' },
    { label: '주식 세금 총정리', href: '/guide/investment-tax' },
    { label: 'FIRE 조기 은퇴', href: '/guide/fire-retirement' },
  ]},
];

const MENUS_EN: MenuItem[] = [
  { href: '/en/salary', ico: '💰', label: 'Salary & Tax', sub: [
    { label: 'Salary Calculator', href: '/en/salary' },
    { label: 'Flat vs Progressive Tax', href: '/en/tax-comparison' },
    { label: 'Severance Pay', href: '/en/severance' },
  ]},
  { href: '/en/pension-refund', ico: '👵', label: 'Insurance & Pension', sub: [
    { label: 'Pension Refund', href: '/en/pension-refund' },
    { label: 'Health Insurance', href: '/en/health-insurance' },
  ]},
  { href: '/en/rent', ico: '🏠', label: 'Housing & Living', sub: [
    { label: 'Jeonse vs Wolse', href: '/en/rent' },
    { label: 'Cost of Living', href: '/en/cost-of-living' },
  ]},
  { href: '/en/cost-of-living', ico: '🏠', label: 'Living in Korea', sub: [
    { label: 'Cost of Living', href: '/en/cost-of-living' },
    { label: 'Jeonse vs Wolse', href: '/en/rent' },
    { label: 'Subway Fare', href: '/en/subway' },
    { label: 'Electricity Bill', href: '/en/electricity' },
    { label: 'Grocery Prices', href: '/en/grocery' },
    { label: 'Internet Plans', href: '/en/internet-speed' },
    { label: 'Pyeong Converter', href: '/en/pyeong' },
    { label: 'Gold Price (돈)', href: '/en/gold' },
  ]},
  { href: '/en/korean-age', ico: '🇰🇷', label: 'Korean Culture', sub: [
    { label: 'Korean Age', href: '/en/korean-age' },
    { label: 'Size Converter', href: '/en/size-converter' },
    { label: 'Tipping Guide', href: '/en/tip-calculator' },
    { label: 'Time Zone (KST)', href: '/en/timezone' },
    { label: 'Date Converter', href: '/en/date-converter' },
    { label: 'Lunar Calendar', href: '/en/lunar-calendar' },
    { label: 'Blood Alcohol (DUI)', href: '/en/alcohol' },
    { label: 'Visa Checker', href: '/en/visa-check' },
    { label: 'Hospital Costs', href: '/en/hospital' },
    { label: 'Phone Plans', href: '/en/phone-cost' },
    { label: 'Delivery Cost', href: '/en/delivery-fee' },
  ]},
  { href: '/en/guide/tax-guide', ico: '📖', label: 'Guides', sub: [
    { label: 'Income Tax Guide', href: '/en/guide/tax-guide' },
    { label: 'Payslip Explained', href: '/en/guide/salary-guide' },
    { label: 'Pension & Refund', href: '/en/guide/pension-guide' },
    { label: 'Health Insurance', href: '/en/guide/health-insurance-guide' },
    { label: 'Renting in Korea', href: '/en/guide/housing-guide' },
    { label: 'Cost of Living', href: '/en/guide/cost-of-living-guide' },
    { label: 'Severance Pay', href: '/en/guide/severance-guide' },
    { label: 'Worker Rights', href: '/en/guide/working-rights' },
    { label: 'Korean Age System', href: '/en/guide/korean-age-guide' },
    { label: 'Banking Guide', href: '/en/guide/banking-guide' },
    { label: 'Visa & Work Permits', href: '/en/guide/visa-guide' },
    { label: 'Sending Money Home', href: '/en/guide/remittance-guide' },
    { label: "Driver's License", href: '/en/guide/drivers-license' },
    { label: 'Phone & SIM Card', href: '/en/guide/phone-guide' },
    { label: 'Delivery Apps', href: '/en/guide/delivery-apps' },
    { label: 'Tax Refund (Leaving)', href: '/en/guide/tax-refund-leaving' },
    { label: 'Year-End Settlement', href: '/en/guide/year-end-settlement' },
    { label: 'Freelancer Tax', href: '/en/guide/freelancer-tax' },
  ]},
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isEn = pathname.startsWith('/en');
  const menus = isEn ? MENUS_EN : MENUS_KO;
  const isActive = (menu: MenuItem) => {
    if (menu.href === '/') return pathname === '/';
    return pathname.startsWith(menu.href);
  };

  return (
    <>
      {/* 햄버거 */}
      <button
        className="fixed top-3.5 left-3.5 z-[100] w-10 h-10 rounded-xl border border-[var(--line)] bg-white text-lg cursor-pointer flex items-center justify-center shadow-sm text-[var(--ink)] lg:hidden"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/35 z-[199] lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside className={`fixed top-0 left-0 w-[var(--sb-w)] h-full bg-white border-r border-[var(--line)] z-[200] flex flex-col overflow-y-auto transition-transform duration-250 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--line)]">
          <span className="text-[17px] font-extrabold text-[var(--ink)]">{isEn ? 'Calculators' : '모든 계산기'}</span>
          <button className="bg-transparent border-none text-xl text-[var(--sub)] cursor-pointer lg:hidden" onClick={() => setOpen(false)}>×</button>
        </div>

        <nav className="flex-1 p-2.5 flex flex-col gap-0.5">
          {menus.map((menu) => {
            const active = isActive(menu);
            const hasSub = menu.sub.length > 1;

            return (
              <div key={menu.href} className="mb-1">
                <div className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-sm font-semibold ${active ? 'text-[var(--primary-dark)] font-extrabold' : 'text-[var(--ink)]'}`}>
                  <span className="text-lg w-6 text-center">{menu.ico}</span>
                  {!hasSub ? (
                    <Link href={menu.sub[0].href} className="flex-1 no-underline text-inherit" onClick={() => setOpen(false)}>
                      {menu.label}
                    </Link>
                  ) : (
                    <span className="flex-1 text-xs font-bold text-[var(--sub)] uppercase tracking-wide">{menu.label}</span>
                  )}
                </div>

                {hasSub && (
                  <div className="flex flex-col gap-0.5 pl-12 pb-1">
                    {menu.sub.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`block px-3.5 py-1.5 rounded-lg text-[13px] font-semibold no-underline transition-colors ${pathname === sub.href ? 'text-[var(--primary-dark)] bg-[var(--primary-weak)]' : 'text-[var(--sub)] hover:bg-[var(--bg)] hover:text-[var(--ink)]'}`}
                        onClick={() => setOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-auto px-4 py-3.5 border-t border-[var(--line)] flex flex-col gap-2">
          {isEn && (
            <Link href="/" className="text-xs text-[var(--primary)] no-underline font-bold hover:text-[var(--primary-dark)]">🇰🇷 한국어로 보기</Link>
          )}
          {!isEn && (
            <Link href="/en" className="text-xs text-[var(--primary)] no-underline font-bold hover:text-[var(--primary-dark)]">🌍 English</Link>
          )}
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/about" className="text-[11px] text-[var(--sub)] no-underline font-semibold hover:text-[var(--ink)]">{isEn ? 'About' : '소개'}</Link>
            <Link href="/contact" className="text-[11px] text-[var(--sub)] no-underline font-semibold hover:text-[var(--ink)]">{isEn ? 'Contact' : '문의'}</Link>
            <Link href="/privacy" className="text-[11px] text-[var(--sub)] no-underline font-semibold hover:text-[var(--ink)]">{isEn ? 'Privacy' : '개인정보'}</Link>
            <Link href="/terms" className="text-[11px] text-[var(--sub)] no-underline font-semibold hover:text-[var(--ink)]">{isEn ? 'Terms' : '약관'}</Link>
            <Link href="/disclaimer" className="text-[11px] text-[var(--sub)] no-underline font-semibold hover:text-[var(--ink)]">{isEn ? 'Disclaimer' : '면책'}</Link>
          </div>
        </div>
      </aside>
    </>
  );
}
