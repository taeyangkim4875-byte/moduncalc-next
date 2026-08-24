'use client';

import Link from 'next/link';
import { getChainLinks, buildChainUrl } from '@/data/chains';
import { getCalc } from '@/data/calculators';
import { trackChainClick } from '@/utils/analytics';

interface NextStepCardsProps {
  from: string;
  outputs: Record<string, number | string>;
}

export default function NextStepCards({ from, outputs }: NextStepCardsProps) {
  const links = getChainLinks(from);
  if (!links.length) return null;

  return (
    <div className="mt-4 mb-3">
      <div className="text-sm font-extrabold text-[var(--ink)] mb-2.5 px-1">
        다음 단계
      </div>
      <div className="flex flex-col gap-2.5">
        {links.slice(0, 3).map(link => {
          const target = getCalc(link.to);
          const url = buildChainUrl(link, outputs);
          return (
            <Link
              key={link.to}
              href={url}
              onClick={() => trackChainClick(from, link.to)}
              className="block bg-white rounded-2xl border-[1.5px] border-[var(--line)] p-4 hover:border-[var(--primary)] hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{target?.icon ?? '🔗'}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-extrabold text-[var(--ink)] group-hover:text-[var(--primary-dark)]">
                    {link.label}
                  </div>
                  <div className="text-xs text-[var(--sub)] mt-0.5">
                    {link.desc}
                  </div>
                </div>
                <span className="text-[var(--sub)] text-lg group-hover:text-[var(--primary)] transition-colors">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
