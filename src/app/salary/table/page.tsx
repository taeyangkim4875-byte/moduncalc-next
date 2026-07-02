import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import NetPayTable from './NetPayTable';

export const metadata: Metadata = {
  title: '연봉 실수령액표 · 2026',
  description: '2026년 연봉별 실수령액을 한눈에 비교하세요. 2,000만원부터 1억 5,000만원까지 4대보험·세금 공제 후 월 실수령액을 확인할 수 있습니다.',
};

export default function NetPayTablePage() {
  return (
    <PageLayout
      eyebrow="연봉 실수령액표"
      title="2026 연봉 실수령액표"
      description="연봉별 월 실수령액을 한눈에 비교할 수 있어요. 행을 탭하면 공제 내역을 확인할 수 있습니다."
    >
      <NetPayTable />
    </PageLayout>
  );
}
