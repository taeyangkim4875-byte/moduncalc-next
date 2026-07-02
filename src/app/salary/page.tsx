import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
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
      <SalaryCalculator />
    </PageLayout>
  );
}
