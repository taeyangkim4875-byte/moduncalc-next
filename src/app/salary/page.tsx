import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { FaqJsonLd, CalculatorJsonLd } from '@/components/JsonLd';
import SalaryCalculator from './SalaryCalculator';

export const metadata: Metadata = {
  title: '연봉 실수령액 계산기 · 2026',
  description: '2026년 연봉 실수령액과 급여 백분위를 한번에 계산하세요. 4대보험·소득세 공제 내역까지 확인할 수 있습니다.',
};

export default function SalaryPage() {
  return (
    <PageLayout
      eyebrow="연봉 계산기"
      title="연봉 실수령액 · 백분위"
      description="연봉과 나이를 입력하면 실수령액과 동 연령대 급여 백분위를 알려드려요."
    >
      <CalculatorJsonLd name="연봉 실수령액 계산기" description="2026년 연봉 실수령액과 급여 백분위를 한번에 계산하세요." url="https://moduncalc.com/salary" />
      <FaqJsonLd items={[{q:"4대보험은 어떻게 계산되나요?",a:"국민연금 4.5%, 건강보험 3.545%, 장기요양 0.4591%, 고용보험 0.9%가 적용됩니다."},{q:"연봉 백분위는 무엇인가요?",a:"같은 연령대에서 내 연봉이 상위 몇 %인지 보여주는 지표입니다."}]} />
      <SalaryCalculator />
    </PageLayout>
  );
}
