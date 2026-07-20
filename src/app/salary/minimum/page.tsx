import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import MinWageCalculator from './MinWageCalculator';

export const metadata: Metadata = {
  title: '2026 최저시급 계산기 - 시급 10,320원 · 주휴수당 · 월급 환산',
  description: '2026 최저시급 10,320원, 주휴수당 포함하면 월급 얼마? 시급·근무시간 입력하면 월 예상 급여 바로 계산.',
  alternates: { canonical: "https://moduncalc.com/salary/minimum" },
  openGraph: { title: "2026 최저시급 계산기 - 시급 10,320원 · 월급 215만원 · 주휴수당", description: "시급 10,320원 기준 월급 215만원. 주휴수당·수습 감액까지 1초 만에 계산.", url: "https://moduncalc.com/salary/minimum" },
};

export default function MinWagePage() {
  return (
    <PageLayout
      eyebrow="최저시급 계산기"
      title="2026 최저시급 · 주휴수당"
      description="시급과 근무 조건을 입력하면 월 예상 급여와 주휴수당을 계산해 드려요."
    >
      <CalculatorJsonLd name="최저시급 계산기" description="2026년 최저시급 기준 월급과 주휴수당을 계산하세요." url="https://moduncalc.com/salary/minimum" />
      <FaqJsonLd items={[{q:"2026년 최저시급은 얼마인가요?",a:"2026년 최저시급은 10,320원입니다. 주 40시간(월 209시간) 근무 시 월급은 약 2,156,880원, 연봉으로 환산하면 약 25,882,560원입니다."},{q:"주휴수당 포함 시급은 얼마인가요?",a:"2026년 최저시급 10,320원에 주휴수당을 포함하면 실질 시급은 약 12,384원입니다. 주 40시간 근무 기준 주휴 8시간이 추가됩니다."},{q:"주 15시간 미만 근무하면 주휴수당이 없나요?",a:"맞습니다. 주 소정근로시간이 15시간 미만인 초단시간 근로자에게는 주휴수당, 연차유급휴가, 퇴직금이 적용되지 않습니다."},{q:"수습기간에도 최저임금을 받나요?",a:"1년 이상 근로계약 시 수습 3개월간 최저임금의 90%(9,288원)까지 감액 가능합니다. 단순노무직은 감액 불가합니다."},{q:"최저임금 위반 시 처벌은?",a:"최저임금법 위반 시 3년 이하 징역 또는 2,000만원 이하 벌금에 처해질 수 있습니다."}]} />
      <MinWageCalculator />
    </PageLayout>
  );
}
