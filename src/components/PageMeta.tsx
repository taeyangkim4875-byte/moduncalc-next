import Link from 'next/link';
import { LAST_REVIEWED_LABEL } from '@/data/constants';

/**
 * 모든 페이지 하단에 붙는 작성자·검토일·출처 블록.
 *
 * 세금·연금·건강처럼 판단에 영향을 주는 정보를 다루는 사이트에서는
 * "누가 만들었고, 언제 확인했고, 무엇을 근거로 했는가"가 드러나야 합니다.
 */
export default function PageMeta() {
  return (
    <section className="mt-6 rounded-[var(--radius)] border border-[var(--line)] bg-white p-4">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-[var(--green)] mb-2.5">
        <span className="inline-flex items-center gap-1 bg-[#E6F8F0] py-1 px-2.5 rounded-lg">
          <span>✓</span>
          <span>2026년 기준 적용</span>
        </span>
        <span className="text-[var(--sub)] font-medium">최종 검토 {LAST_REVIEWED_LABEL}</span>
        <Link
          href="/changelog"
          className="text-[var(--sub)] font-medium no-underline hover:text-[var(--ink)] underline-offset-2 hover:underline"
        >
          변경 이력 보기
        </Link>
      </div>
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
    </section>
  );
}
