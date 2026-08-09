import Link from 'next/link';
import Card from './Card';

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
