'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const GUIDES: Record<string, { href: string; title: string }[]> = {
  '/salary': [
    { href: '/guide/salary-net-pay', title: '📖 연봉 실수령액 완전 정리' },
    { href: '/guide/4-insurance', title: '📖 4대보험 완전 정리' },
    { href: '/guide/year-end-tax', title: '📖 연말정산 초보 가이드' },
  ],
  '/salary/table': [
    { href: '/guide/salary-net-pay', title: '📖 연봉 실수령액 완전 정리' },
  ],
  '/salary/minimum': [
    { href: '/guide/minimum-wage', title: '📖 2026 최저시급 완전 정리' },
  ],
  '/salary/severance': [
    { href: '/guide/severance-pay', title: '📖 퇴직금 계산법 정리' },
  ],
  '/salary/live': [
    { href: '/guide/salary-net-pay', title: '📖 연봉 실수령액 완전 정리' },
  ],
  '/salary/convert': [
    { href: '/guide/salary-net-pay', title: '📖 연봉 실수령액 완전 정리' },
  ],
  '/salary/lifetime': [
    { href: '/guide/fire-retirement', title: '📖 FIRE 조기 은퇴 가이드' },
  ],
  '/savings/doyak': [
    { href: '/guide/doyak-vs-mirae', title: '📖 도약 vs 미래적금 비교' },
  ],
  '/savings/mirae': [
    { href: '/guide/doyak-vs-mirae', title: '📖 도약 vs 미래적금 비교' },
  ],
  '/savings/interest': [
    { href: '/guide/doyak-vs-mirae', title: '📖 도약 vs 미래적금 비교' },
  ],
  '/pension/jobless': [
    { href: '/guide/severance-pay', title: '📖 퇴직금 계산법 정리' },
    { href: '/guide/4-insurance', title: '📖 4대보험 완전 정리' },
  ],
  '/pension/nps': [
    { href: '/guide/4-insurance', title: '📖 4대보험 완전 정리' },
    { href: '/guide/fire-retirement', title: '📖 FIRE 조기 은퇴 가이드' },
  ],
  '/loan': [
    { href: '/guide/loan-comparison', title: '📖 원리금균등 vs 원금균등 비교' },
  ],
  '/loan/car': [
    { href: '/guide/loan-comparison', title: '📖 대출 상환 방식 비교' },
  ],
  '/realestate/acqtax': [
    { href: '/guide/jeonse', title: '📖 전세 계약 가이드' },
  ],
  '/realestate/convert': [
    { href: '/guide/jeonse', title: '📖 전세 계약 완전 가이드' },
  ],
  '/realestate/commission': [
    { href: '/guide/jeonse', title: '📖 전세 계약 가이드' },
  ],
  '/realestate/transfer': [
    { href: '/guide/investment-tax', title: '📖 주식·부동산 세금 정리' },
  ],
  '/tax/income': [
    { href: '/guide/year-end-tax', title: '📖 연말정산 초보 가이드' },
    { href: '/guide/salary-net-pay', title: '📖 연봉 실수령액 정리' },
  ],
  '/tax/gift': [
    { href: '/guide/year-end-tax', title: '📖 연말정산 가이드' },
  ],
  '/daily/stock': [
    { href: '/guide/investment-tax', title: '📖 주식·ETF 세금 총정리' },
  ],
  '/daily/fire': [
    { href: '/guide/fire-retirement', title: '📖 FIRE 조기 은퇴 가이드' },
  ],
  '/daily/electric': [
    { href: '/guide/jeonse', title: '📖 전세 계약·주거 가이드' },
  ],
  '/daily/fuel': [
    { href: '/guide/loan-comparison', title: '📖 자동차 할부·대출 비교' },
  ],
  '/daily/aircon': [
    { href: '/guide/jeonse', title: '📖 전세 계약·주거 가이드' },
  ],
};

export default function RelatedGuides() {
  const pathname = usePathname();
  const items = GUIDES[pathname];
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-3 mb-2">
      <div className="text-xs font-bold text-[var(--sub)] mb-2 px-1">📚 관련 가이드</div>
      <div className="flex flex-col gap-1.5">
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between px-3.5 py-2.5 bg-[var(--bg)] rounded-xl no-underline text-[var(--ink)] hover:bg-[var(--primary-weak)] transition-colors"
          >
            <span className="text-sm font-semibold">{item.title}</span>
            <span className="text-xs text-[var(--sub)]">읽기 →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
