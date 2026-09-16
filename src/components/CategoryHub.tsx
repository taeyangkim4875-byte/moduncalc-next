import Link from 'next/link';
import Card from './Card';
import { getCalc } from '@/data/calculators';

export interface HubGroup {
  title: string;
  /** 이 묶음을 왜 함께 봐야 하는지 한 줄 설명 */
  note: string;
  items: string[];
}

export interface HubGuide {
  href: string;
  title: string;
  desc: string;
}

/**
 * 카테고리 허브(/salary, /tax, /daily …)에서 공통으로 쓰는 계산기 목록 블록.
 * 서버 컴포넌트라 JS 없이도 링크가 그대로 렌더링됩니다.
 */
export function HubGroups({ groups }: { groups: HubGroup[] }) {
  return (
    <>
      {groups.map(group => (
        <Card key={group.title}>
          <h2 className="text-base font-extrabold mb-1">{group.title}</h2>
          <p className="text-sm text-[var(--sub)] leading-relaxed mb-3">{group.note}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {group.items.map(href => {
              const c = getCalc(href);
              if (!c) return null;
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl no-underline text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--primary-weak)] hover:border-[var(--primary)] transition-all"
                >
                  <span className="text-lg flex-none">{c.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-bold truncate">{c.title}</span>
                    <span className="block text-[11px] text-[var(--sub)] font-medium truncate">{c.desc}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Card>
      ))}
    </>
  );
}

export function HubGuides({ guides }: { guides: HubGuide[] }) {
  if (!guides.length) return null;
  return (
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 함께 읽으면 좋은 가이드</h2>
      <div className="flex flex-col gap-2">
        {guides.map(g => (
          <Link
            key={g.href}
            href={g.href}
            className="block px-3.5 py-3 rounded-xl no-underline text-[var(--ink)] bg-[var(--bg)] hover:bg-[var(--primary-weak)] transition-all"
          >
            <span className="block text-sm font-bold">{g.title}</span>
            <span className="block text-xs text-[var(--sub)] mt-0.5 leading-relaxed">{g.desc}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
