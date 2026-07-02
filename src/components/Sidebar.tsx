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

const MENUS: MenuItem[] = [
  { href: '/calc', ico: '🧮', label: '스마트 계산기', sub: [
    { label: '수식 입력 계산기', href: '/calc' }
  ]},
  { href: '/', ico: '🏦', label: '도약·미래적금', sub: [
    { label: '도약 vs 미래 비교', href: '/' }
  ]},
  { href: '/salary', ico: '💰', label: '연봉/급여', sub: [
    { label: '연봉 상위%', href: '/salary' },
    { label: '실수령액 표', href: '/salary/table' },
    { label: '최저시급·주휴수당', href: '/salary/minimum' }
  ]},
  { href: '/pension', ico: '👵', label: '연금/보험', sub: [
    { label: '실업급여', href: '/pension/jobless' },
    { label: '국민연금', href: '/pension/nps' }
  ]},
  { href: '/loan', ico: '🏠', label: '대출/이자', sub: [
    { label: '원리금균등 vs 원금균등', href: '/loan' }
  ]},
  { href: '/health', ico: '💪', label: '건강', sub: [
    { label: 'BMI', href: '/health/bmi' },
    { label: '기초대사량', href: '/health/bmr' }
  ]},
  { href: '/daily', ico: '📅', label: '일상', sub: [
    { label: '퍼센트', href: '/daily/percent' },
    { label: '할인가', href: '/daily/discount' },
    { label: '더치페이', href: '/daily/dutch' },
    { label: 'D-day', href: '/daily/dday' },
    { label: '나이', href: '/daily/age' },
    { label: '단위변환', href: '/daily/unit' },
    { label: '속도·시간', href: '/daily/speed' },
    { label: '연비', href: '/daily/fuel' }
  ]},
  { href: '/realestate', ico: '🏢', label: '부동산', sub: [
    { label: '취득세', href: '/realestate/acqtax' },
    { label: '전월세 전환', href: '/realestate/convert' }
  ]},
  { href: '/tax', ico: '🧾', label: '세금', sub: [
    { label: '부가세', href: '/tax/vat' },
    { label: '종합소득세', href: '/tax/income' }
  ]},
  { href: '/handwriting', ico: '✏️', label: '손글씨 계산기', sub: [
    { label: 'AI 손글씨 인식 (Beta)', href: '/handwriting' }
  ]},
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const isActive = (menu: MenuItem) => {
    if (menu.href === '/') return pathname === '/';
    return pathname.startsWith(menu.href);
  };

  const toggleGroup = (href: string) => {
    setExpandedGroup(expandedGroup === href ? null : href);
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
          <span className="text-[17px] font-extrabold text-[var(--ink)]">모든 계산기</span>
          <button className="bg-transparent border-none text-xl text-[var(--sub)] cursor-pointer lg:hidden" onClick={() => setOpen(false)}>×</button>
        </div>

        <nav className="flex-1 p-2.5 flex flex-col gap-0.5">
          {MENUS.map((menu) => {
            const active = isActive(menu);
            const expanded = active || expandedGroup === menu.href;
            const hasSub = menu.sub.length > 1;

            return (
              <div key={menu.href} className="mb-0.5">
                <div
                  className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl cursor-pointer text-sm font-semibold transition-colors ${active ? 'bg-[var(--primary-weak)] text-[var(--primary-dark)] font-extrabold' : 'text-[var(--ink)] hover:bg-[var(--bg)]'}`}
                  onClick={() => hasSub ? toggleGroup(menu.href) : undefined}
                >
                  <span className="text-lg w-6 text-center">{menu.ico}</span>
                  {!hasSub ? (
                    <Link href={menu.sub[0].href} className="flex-1 no-underline text-inherit" onClick={() => setOpen(false)}>
                      {menu.label}
                    </Link>
                  ) : (
                    <span className="flex-1">{menu.label}</span>
                  )}
                  {hasSub && (
                    <span className={`text-sm text-[var(--sub)] transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}>›</span>
                  )}
                </div>

                {hasSub && expanded && (
                  <div className="flex flex-col gap-0.5 pl-12 py-1">
                    {menu.sub.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`block px-3.5 py-2 rounded-lg text-[13px] font-semibold no-underline transition-colors ${pathname === sub.href ? 'text-[var(--primary-dark)] bg-[var(--primary-weak)]' : 'text-[var(--sub)] hover:bg-[var(--bg)] hover:text-[var(--ink)]'}`}
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

        <div className="mt-auto px-4 py-3.5 border-t border-[var(--line)] flex gap-3.5">
          <Link href="/about" className="text-xs text-[var(--sub)] no-underline font-semibold hover:text-[var(--ink)]">소개</Link>
          <Link href="/privacy" className="text-xs text-[var(--sub)] no-underline font-semibold hover:text-[var(--ink)]">개인정보처리방침</Link>
        </div>
      </aside>
    </>
  );
}
