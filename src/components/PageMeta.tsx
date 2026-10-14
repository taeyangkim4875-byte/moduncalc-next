'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CURRENT_YEAR, LAST_REVIEWED_LABEL, LAST_REVIEWED_LABEL_EN } from '@/data/constants';
import { isEnPath } from '@/utils/locale';

/**
 * 모든 페이지 하단에 붙는 작성자·검토일·출처 블록.
 *
 * 세금·연금·건강처럼 판단에 영향을 주는 정보를 다루는 사이트에서는
 * "누가 만들었고, 언제 확인했고, 무엇을 근거로 했는가"가 드러나야 합니다.
 *
 * 이 블록은 영문 페이지 78개에도 그대로 붙기 때문에 경로로 언어를 갈라야 합니다.
 * (예전에는 한국어만 내보내서 영문 가이드 전체에 한국어 문단이 노출됐습니다.)
 */
export default function PageMeta() {
  const isEn = isEnPath(usePathname());

  return (
    <section className="mt-6 rounded-[var(--radius)] border border-[var(--line)] bg-white p-4">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-[var(--green)] mb-2.5">
        <span className="inline-flex items-center gap-1 bg-[#E6F8F0] py-1 px-2.5 rounded-lg">
          <span>✓</span>
          <span>{isEn ? `Updated for ${CURRENT_YEAR}` : `${CURRENT_YEAR}년 기준 적용`}</span>
        </span>
        <span className="text-[var(--sub)] font-medium">
          {isEn ? `Last reviewed ${LAST_REVIEWED_LABEL_EN}` : `최종 검토 ${LAST_REVIEWED_LABEL}`}
        </span>
        <Link
          href="/changelog"
          className="text-[var(--sub)] font-medium no-underline hover:text-[var(--ink)] underline-offset-2 hover:underline"
        >
          {isEn ? 'See what changed' : '변경 이력 보기'}
        </Link>
      </div>

      {isEn ? (
        <p className="text-xs text-[var(--sub)] leading-relaxed m-0">
          Written and reviewed by{' '}
          <Link href="/about" className="font-bold text-[var(--ink)] no-underline hover:underline">
            Taeyang Kim
          </Link>
          {' · '}
          Rates and thresholds are taken directly from the official notices of Korea&apos;s National Tax
          Service, National Pension Service, National Health Insurance Service, Ministry of Employment and
          Labor, and Minimum Wage Commission. Results are non-binding estimates for reference only and may
          differ from the actual amount depending on your circumstances. Found a mistake? Tell us through{' '}
          <Link href="/contact" className="font-bold text-[var(--ink)] no-underline hover:underline">
            Contact
          </Link>
          .
        </p>
      ) : (
        <p className="text-xs text-[var(--sub)] leading-relaxed m-0">
          작성·검토{' '}
          <Link href="/about" className="font-bold text-[var(--ink)] no-underline hover:underline">
            김태양
          </Link>
          {' · '}
          세율과 요율은 국세청, 국민연금공단, 국민건강보험공단, 고용노동부, 최저임금위원회의 공식 고시를 직접 확인해 반영합니다.
          계산 결과는 법적 효력이 없는 참고용 추정치이며, 개인별 조건에 따라 실제 금액과 다를 수 있습니다.
          오류를 발견하시면{' '}
          <Link href="/contact" className="font-bold text-[var(--ink)] no-underline hover:underline">
            문의하기
          </Link>
          로 알려주세요.
        </p>
      )}
    </section>
  );
}
