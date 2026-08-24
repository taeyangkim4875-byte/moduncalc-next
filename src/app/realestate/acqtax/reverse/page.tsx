import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { CalculatorJsonLd, FaqJsonLd } from '@/components/JsonLd';
import AcqTaxReverse from './AcqTaxReverse';

export const metadata: Metadata = {
  title: '취득세 예산으로 매수 가능 금액 역산 - 취득세 역방향 계산기',
  description: '준비한 취득세 예산으로 살 수 있는 최대 집값을 역산합니다. 주택 수·면적별 세율 자동 적용.',
  alternates: { canonical: 'https://moduncalc.com/realestate/acqtax/reverse' },
  openGraph: {
    title: '취득세 예산으로 매수 한도 역산하기 (2026)',
    description: '취득세 예산 입력 → 매수 가능 최대 금액 역산. 1~3주택 세율 자동 반영.',
    url: 'https://moduncalc.com/realestate/acqtax/reverse',
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="역방향 계산"
      title="취득세 → 매수 한도 역산"
      description="취득세 예산으로 살 수 있는 최대 집값을 역산해 드려요."
    >
      <CalculatorJsonLd
        name="취득세 역방향 계산기"
        description="취득세 예산으로 매수 가능 최대 금액을 역산하세요. 주택 수·면적별 세율 자동 적용."
        url="https://moduncalc.com/realestate/acqtax/reverse"
      />
      <FaqJsonLd items={[
        { q: '취득세 예산은 어떻게 잡아야 하나요?', a: '일반적으로 매매가의 1~3% 수준입니다. 다주택자는 8~12%까지 올라갑니다.' },
        { q: '생애 첫 주택 감면은 반영되나요?', a: '법정 기본 세율 기준입니다. 감면 대상이면 실제로는 더 비싼 집을 살 수 있습니다.' },
      ]} />
      <AcqTaxReverse />
    </PageLayout>
  );
}
