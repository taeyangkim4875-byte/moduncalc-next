import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { CalculatorJsonLd, FaqJsonLd } from '@/components/JsonLd';
import SalaryReverse from './SalaryReverse';

export const metadata: Metadata = {
  title: '실수령액으로 연봉 역산 - 희망 실수령 연봉 계산기',
  description: '원하는 실수령액을 입력하면 필요한 세전 연봉을 역산합니다. 2026년 4대보험·소득세 반영.',
  alternates: { canonical: 'https://moduncalc.com/salary/reverse' },
  openGraph: {
    title: '실수령액으로 필요 연봉 역산하기 (2026)',
    description: '희망 월 실수령액으로 세전 연봉 역산. 4대보험·소득세 자동 반영.',
    url: 'https://moduncalc.com/salary/reverse',
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="역방향 계산"
      title="실수령액 → 연봉 역산"
      description="원하는 월 실수령액을 입력하면 필요한 세전 연봉을 알려드려요."
    >
      <CalculatorJsonLd
        name="실수령액으로 연봉 역산 계산기"
        description="희망 월 실수령액을 입력하면 필요한 세전 연봉을 역산합니다. 2026년 4대보험·소득세 반영."
        url="https://moduncalc.com/salary/reverse"
      />
      <FaqJsonLd
        items={[
          { q: '실수령 300만원 받으려면 연봉이 얼마여야 하나요?', a: '부양가족 1인, 비과세 식대 적용 기준으로 약 4,300만원의 세전 연봉이 필요합니다.' },
          { q: '역산 결과가 정확한가요?', a: '2026년 4대보험 요율과 소득세 누진세율을 기반으로 계산한 추정치입니다. 실제 급여와 다를 수 있습니다.' },
        ]}
      />
      <SalaryReverse />
    </PageLayout>
  );
}
