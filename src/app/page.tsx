import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { getCalc, HOMEPAGE_HOT, HOMEPAGE_CATEGORIES } from "@/data/calculators";

export const metadata: Metadata = {
  title: "모든 계산기 - 연봉, 적금, 대출, 부동산, 건강, 세금 무료 계산기",
  description: "연봉 실수령액, 청년도약계좌, 미래적금, 대출이자, 취득세, 복비, BMI, 퇴직금, 최저시급까지. 2026년 최신 정책 반영 무료 계산기 모음 82종.",
  alternates: { canonical: "https://moduncalc.com" },
  openGraph: {
    title: "모든 계산기 - 연봉, 적금, 대출, 건강 무료 계산기 82종",
    description: "2026년 최신 정책 반영. 연봉, 적금, 대출, 부동산, 건강, 세금, 일상 계산기를 한 곳에서 무료로.",
    url: "https://moduncalc.com",
  },
};

export default function Home() {
  return (
    <PageLayout
      eyebrow="무료 계산기 82종"
      title="모든 계산기"
      description="필요한 계산기를 찾아보세요. 2026년 최신 정책 반영."
    >
      {/* 인기 / 추천 */}
      <div className="mb-5">
        <div className="text-xs font-bold text-[var(--primary)] mb-2 px-1">🔥 인기 계산기</div>
        <div className="grid grid-cols-2 gap-2">
          {HOMEPAGE_HOT.map(hot => {
            const c = getCalc(hot.href);
            if (!c) return null;
            return (
              <Link
                key={c.href}
                href={c.href}
                className="flex items-start gap-2.5 p-3 bg-white rounded-xl shadow-[var(--shadow)] no-underline text-[var(--ink)] transition-all hover:translate-y-[-1px] hover:shadow-[var(--shadow-h)] border-[1.5px] border-[var(--primary-weak)]"
              >
                <span className="text-xl flex-none mt-0.5">{c.icon}</span>
                <div className="min-w-0">
                  <div className="text-sm font-bold truncate">{c.title}</div>
                  <div className="text-[11px] text-[var(--sub)] font-medium">{hot.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 카테고리별 */}
      {HOMEPAGE_CATEGORIES.map(cat => (
        <div key={cat.title} className="mb-4">
          <div className="text-sm font-extrabold text-[var(--ink)] mb-2 px-1">{cat.title}</div>
          <div className="grid grid-cols-2 gap-1.5">
            {cat.items.map(href => {
              const c = getCalc(href);
              if (!c) return null;
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl no-underline text-[var(--ink)] transition-all hover:bg-[var(--primary-weak)] border border-[var(--line)]"
                >
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold truncate">{c.title}</div>
                    <div className="text-[10px] text-[var(--sub)] font-medium">{c.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-4 text-center">
        <Link href="/en" className="text-sm font-bold text-[var(--primary)] no-underline hover:text-[var(--primary-dark)]">
          🌍 English Calculators for Foreigners →
        </Link>
      </div>

      <Card className="mt-4">
        <h2 className="text-base font-extrabold mb-3">📖 모든 계산기란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">모든 계산기(moduncalc.com)는 연봉, 적금, 대출, 부동산, 건강, 세금 등 일상에서 자주 필요한 계산을 한 곳에서 무료로 이용할 수 있는 웹 서비스입니다. 2026년 최신 정책·세율·요율이 반영되어 있으며, 모든 계산은 브라우저에서 즉시 처리됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">청년도약계좌·미래적금, 연봉 실수령액, 최저시급·주휴수당, 실업급여, 국민연금, DSR, 취득세, 양도소득세, BMI, 퇴직금, 에어컨 전기요금 등 82종의 계산기와 28편의 가이드 글을 제공합니다.</p>
      </Card>
    </PageLayout>
  );
}
