import Link from 'next/link';
import Card from './Card';
import { CALC_SOURCES, LAW_PORTAL } from '@/data/sources';

/**
 * 계산기 페이지 하단에 붙는 SEO 본문 블록용 프리미티브.
 * 서버 컴포넌트라 JS 없이도 그대로 렌더링됩니다.
 * 스타일은 기존 Card / 가이드 페이지 타이포그래피와 동일하게 맞춥니다.
 */

export function SeoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <h2 className="text-base font-extrabold mb-3">{title}</h2>
      <div className="flex flex-col gap-2.5 text-sm text-[#4E5968] leading-relaxed">{children}</div>
    </Card>
  );
}

export function SeoFaq({ title, items }: { title: string; items: { q: string; a: React.ReactNode }[] }) {
  return (
    <Card>
      <h2 className="text-base font-extrabold mb-3">{title}</h2>
      <div className="flex flex-col gap-4">
        {items.map(item => (
          <div key={item.q}>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. {item.q}</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. {item.a}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/** 계산 공식·산식을 강조해서 보여주는 박스 */
export function SeoFormula({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--bg)] rounded-xl p-3.5 flex flex-col gap-1 text-[13px] text-[var(--ink)] leading-relaxed">
      {children}
    </div>
  );
}

export function SeoList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5 flex flex-col gap-1.5">{children}</ul>;
}

/** 본문 문맥 안에 자연스럽게 들어가는 내부 링크 */
export function SeoLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-bold text-[var(--primary)] underline underline-offset-2 hover:opacity-80">
      {children}
    </Link>
  );
}

/**
 * 계산 근거와 소관 기관을 밝히는 블록.
 *
 * 세금·보험료처럼 결과가 돈에 직접 영향을 주는 계산기에서, 숫자가 어디서
 * 왔는지 밝히지 않으면 사용자가 검증할 방법이 없습니다. src/data/sources.ts
 * 에 등록된 경로에만 렌더링되고, 등록되지 않은 경로에서는 아무것도 그리지
 * 않습니다.
 */
export function SeoSource({ route }: { route: string }) {
  const entry = CALC_SOURCES[route];
  if (!entry) return null;

  return (
    <Card>
      <h2 className="text-base font-extrabold mb-3">계산 근거와 출처</h2>
      <dl className="flex flex-col gap-2.5 text-sm text-[#4E5968] leading-relaxed">
        {entry.laws.length > 0 && (
          <div className="flex gap-2">
            <dt className="font-bold text-[var(--ink)] flex-none">근거 법령</dt>
            <dd className="m-0">
              {entry.laws.join(' · ')}
              {' — 원문은 '}
              <ExtLink href={LAW_PORTAL.url}>{LAW_PORTAL.name}</ExtLink>
              에서 확인할 수 있습니다.
            </dd>
          </div>
        )}
        <div className="flex gap-2">
          <dt className="font-bold text-[var(--ink)] flex-none">소관 기관</dt>
          <dd className="m-0">
            {entry.authorities.map((a, i) => (
              <span key={a.url}>
                {i > 0 && ' · '}
                <ExtLink href={a.url}>{a.name}</ExtLink>
              </span>
            ))}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-bold text-[var(--ink)] flex-none">기준 시점</dt>
          <dd className="m-0">{entry.basis}</dd>
        </div>
      </dl>
      <p className="mt-3 text-[13px] text-[var(--sub)] leading-relaxed">
        계산 결과는 참고용 추정치입니다. 실제 신고·납부 금액은 개별 공제와 특례에 따라 달라지므로,
        최종 판단 전에 소관 기관 자료나 세무 전문가의 확인을 받으시기 바랍니다.
      </p>
    </Card>
  );
}

/** 외부 기관으로 나가는 링크 */
function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[var(--primary)] underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  );
}
