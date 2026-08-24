import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { CalculatorJsonLd, FaqJsonLd } from '@/components/JsonLd';
import PensionReverse from './PensionReverse';

export const metadata: Metadata = {
  title: '목표 연금액으로 필요 가입기간 역산 - 국민연금 역방향 계산기',
  description: '원하는 월 연금액을 받으려면 몇 년 납입해야 하는지 역산합니다. 소득 기준 자동 반영.',
  alternates: { canonical: 'https://moduncalc.com/pension/nps/reverse' },
  openGraph: {
    title: '국민연금 목표액 역산하기 (2026)',
    description: '희망 월 연금액 입력 → 필요 가입기간 역산. 소득대체율 43% 기준.',
    url: 'https://moduncalc.com/pension/nps/reverse',
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="국민연금 역방향"
      title="목표 연금액 → 필요 가입기간"
      description="원하는 월 연금액을 입력하면 몇 년 동안 납입해야 하는지 역산해 드려요."
    >
      <CalculatorJsonLd
        name="국민연금 역방향 계산기"
        description="희망 월 연금액을 입력하면 필요한 국민연금 가입기간을 역산합니다."
        url="https://moduncalc.com/pension/nps/reverse"
      />
      <FaqJsonLd items={[
        { q: '국민연금 최대 얼마까지 받을 수 있나요?', a: '45년 가입 기준 소득에 따라 월 최대 약 200만원대까지 가능하지만, 현실적으로는 30~40년 가입이 일반적입니다.' },
        { q: '10년 미만 가입하면 어떻게 되나요?', a: '월 연금을 받을 수 없고, 납부한 금액에 이자를 더해 일시불로 돌려받게 됩니다.' },
      ]} />
      <PensionReverse />
    </PageLayout>
  );
}
