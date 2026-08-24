'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRelated } from '@/data/calculators';

export default function RelatedCalcs() {
  const pathname = usePathname();
  const items = getRelated(pathname);
  if (items.length === 0) return null;

  return (
    <div className="mt-4 mb-2">
      <div className="text-xs font-bold text-[var(--sub)] mb-2 px-1">📎 관련 계산기</div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex-none flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-[var(--line)] shadow-sm no-underline text-[var(--ink)] hover:border-[var(--primary)] hover:shadow-md transition-all min-w-[140px]"
          >
            <span className="text-lg">{item.icon}</span>
            <div>
              <div className="text-xs font-bold">{item.title}</div>
              <div className="text-[10px] text-[var(--sub)]">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
