'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCalc } from '@/data/calculators';

export default function ChainBanner() {
  const [fromCalc, setFromCalc] = useState<{
    href: string;
    title: string;
    icon: string;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('_from');
    if (!from) return;
    const calc = getCalc(from);
    if (calc) setFromCalc({ href: from, title: calc.title, icon: calc.icon });
  }, []);

  if (!fromCalc) return null;

  return (
    <div className="bg-[var(--primary-weak)] border border-[var(--primary)] rounded-xl p-3 mb-3 flex items-center gap-2.5">
      <span className="text-lg">{fromCalc.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-[var(--primary-dark)]">
          {fromCalc.title}에서 가져온 값이 입력되었습니다
        </div>
      </div>
      <Link
        href={fromCalc.href}
        className="text-xs font-bold text-[var(--primary)] hover:underline shrink-0"
      >
        돌아가기
      </Link>
    </div>
  );
}
