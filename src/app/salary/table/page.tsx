import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
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
      <CalculatorJsonLd name="연봉 실수령액표" description="2026년 연봉별 실수령액을 한눈에 비교하세요. 2,000만원부터 1억 5,000만원까지." url="https://moduncalc.com/salary/table" />
      <FaqJsonLd items={[{q:"표에서 내 연봉 구간을 어떻게 찾나요?",a:"연봉은 100만원 단위로 나열되어 있으며, Ctrl+F로 검색하거나 스크롤하세요."},{q:"부양가족이 많으면 실수령액이 달라지나요?",a:"네, 부양가족 수에 따라 소득세가 달라져 실수령액이 변합니다."}]} />
      <NetPayTable />
    </PageLayout>
  );
}
