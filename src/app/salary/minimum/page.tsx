import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
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
      <MinWageCalculator />
    </PageLayout>
  );
}
