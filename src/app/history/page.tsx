import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import HistoryClient from './HistoryClient';

export const metadata: Metadata = {
  title: '계산 기록 - 모든 계산기',
  description: '지금까지 사용한 계산 기록을 확인하고, 이전 결과를 복원하거나 비교해 보세요.',
  alternates: { canonical: 'https://moduncalc.com/history' },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="내 기록"
      title="계산 기록"
      description="이전 계산 결과를 복원하거나 비교할 수 있어요."
    >
      <HistoryClient />
    </PageLayout>
  );
}
