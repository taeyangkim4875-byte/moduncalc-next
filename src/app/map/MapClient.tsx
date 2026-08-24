'use client';

import Link from 'next/link';
import { CHAIN_LINKS, JOURNEYS } from '@/data/chains';
import { getCalc } from '@/data/calculators';

export default function MapClient() {
  return (
    <>
      <div className="text-sm text-[var(--sub)] mb-4 px-1">
        계산기끼리 연결된 여정을 따라가 보세요. 한 계산기의 결과가 다음
        계산기의 입력으로 자동 전달됩니다.
      </div>
      {JOURNEYS.map(journey => (
        <div
          key={journey.title}
          className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5"
        >
          <div className="text-base font-extrabold mb-1">{journey.title}</div>
          <div className="text-xs text-[var(--sub)] mb-4">{journey.desc}</div>
          <div className="flex flex-col gap-0">
            {journey.calcs.map((href, i) => {
              const calc = getCalc(href);
              if (!calc) return null;
              const outLinks = CHAIN_LINKS.filter(
                l => l.from === href && journey.calcs.includes(l.to),
              );
              return (
                <div key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2.5 p-3.5 rounded-xl border-[1.5px] border-[var(--line)] hover:border-[var(--primary)] transition-colors"
                  >
                    <span className="text-xl">{calc.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-bold">{calc.title}</div>
                      <div className="text-xs text-[var(--sub)]">
                        {calc.desc}
                      </div>
                    </div>
                    <span className="text-[var(--sub)] text-sm">→</span>
                  </Link>
                  {i < journey.calcs.length - 1 && outLinks.length > 0 && (
                    <div className="flex items-center gap-2 py-2 pl-6">
                      <div className="w-px h-4 bg-[var(--primary)] opacity-40" />
                      <span className="text-[10px] text-[var(--sub)]">
                        {outLinks[0].desc}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5">
        <div className="text-base font-extrabold mb-3">이용 방법</div>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2.5">
          <p>
            1. 위 여정 중 하나를 골라 첫 번째 계산기에서 시작하세요.
          </p>
          <p>
            2. 계산 결과 아래에 &ldquo;다음 단계&rdquo; 카드가 나타납니다.
          </p>
          <p>
            3. 카드를 탭하면 결과 값이 다음 계산기에 자동 입력됩니다.
          </p>
        </div>
      </div>
    </>
  );
}
