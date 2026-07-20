import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import MinWageCalculator from './MinWageCalculator';

export const metadata: Metadata = {
  title: '최저시급 계산기 - 2027 시급 10,700원 확정 · 2026 시급 10,320원',
  description: '2027 최저시급 10,700원 확정! 2026 대비 380원(3.7%) 인상. 시급 입력하면 주휴수당 포함 월급·연봉 바로 계산.',
  alternates: { canonical: "https://moduncalc.com/salary/minimum" },
  openGraph: { title: "최저시급 계산기 - 2027년 10,700원 확정 · 2026년 10,320원", description: "2027 최저시급 10,700원 확정! 월급 223만원. 2026 대비 +380원. 주휴수당·수습 감액까지 바로 계산.", url: "https://moduncalc.com/salary/minimum" },
};

export default function MinWagePage() {
  return (
    <PageLayout
      eyebrow="최저시급 계산기"
      title="2026 최저시급 · 주휴수당"
      description="시급과 근무 조건을 입력하면 월 예상 급여와 주휴수당을 계산해 드려요."
    >
      <CalculatorJsonLd name="최저시급 계산기" description="2026년 최저시급 기준 월급과 주휴수당을 계산하세요." url="https://moduncalc.com/salary/minimum" />
      <FaqJsonLd items={[{q:"2027년 최저시급은 얼마인가요?",a:"2027년 최저시급은 10,700원으로 확정되었습니다. 2026년(10,320원) 대비 380원(3.7%) 인상. 주 40시간 기준 월급은 약 2,236,300원이며, 2027년 1월 1일부터 적용됩니다."},{q:"2026년 최저시급은 얼마인가요?",a:"2026년 최저시급은 10,320원입니다. 주 40시간(월 209시간) 근무 시 월급은 약 2,156,880원입니다."},{q:"주휴수당 포함 시급은 얼마인가요?",a:"2026년 기준 주휴수당을 포함하면 실질 시급은 약 12,384원입니다. 2027년은 약 12,840원입니다."},{q:"수습기간에도 최저임금을 받나요?",a:"1년 이상 근로계약 시 수습 3개월간 최저임금의 90%까지 감액 가능합니다. 2026년 기준 9,288원, 2027년 기준 9,630원."},{q:"최저임금 위반 시 처벌은?",a:"최저임금법 위반 시 3년 이하 징역 또는 2,000만원 이하 벌금에 처해질 수 있습니다."}]} />
      <MinWageCalculator />
    </PageLayout>
  );
}
