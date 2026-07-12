import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import MinWageCalculator from './MinWageCalculator';

export const metadata: Metadata = {
  title: '최저시급 계산기 · 2026',
  description: '2026년 최저시급 기준 월급과 주휴수당을 계산하세요. 시급, 근무시간, 근무일수를 입력하면 예상 월급을 알려드립니다.',
};

export default function MinWagePage() {
  return (
    <PageLayout
      eyebrow="최저시급 계산기"
      title="2026 최저시급 · 주휴수당"
      description="시급과 근무 조건을 입력하면 월 예상 급여와 주휴수당을 계산해 드려요."
    >
      <CalculatorJsonLd name="최저시급 계산기" description="2026년 최저시급 기준 월급과 주휴수당을 계산하세요." url="https://moduncalc.com/salary/minimum" />
      <FaqJsonLd items={[{q:"주휴수당 포함 시급은 얼마인가요?",a:"2026년 최저시급에 주휴수당을 포함하면 시간당 약 12,000원 이상이 됩니다."},{q:"주 15시간 미만 근무하면 주휴수당이 없나요?",a:"맞습니다. 주 15시간 미만 단시간 근로자는 주휴수당 대상이 아닙니다."},{q:"수습기간에도 최저임금을 받나요?",a:"1년 이상 계약 시 처음 3개월간 최저임금의 90%까지 감액 가능합니다."}]} />
      <MinWageCalculator />
    </PageLayout>
  );
}
