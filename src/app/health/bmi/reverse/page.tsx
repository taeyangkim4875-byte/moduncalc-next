import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { CalculatorJsonLd, FaqJsonLd } from '@/components/JsonLd';
import BmiReverse from './BmiReverse';

export const metadata: Metadata = {
  title: '목표 BMI 달성 체중 계산기 - BMI 역방향 계산',
  description: '원하는 BMI를 달성하려면 몇 kg이어야 하는지 계산합니다. 정상·과체중 기준 목표 체중 확인.',
  alternates: { canonical: 'https://moduncalc.com/health/bmi/reverse' },
  openGraph: { title: '목표 BMI 달성 체중 계산 (2026)', description: '목표 BMI 입력 → 필요 체중 역산. 정상 범위 체중도 함께 확인.', url: 'https://moduncalc.com/health/bmi/reverse' },
};

export default function Page() {
  return (
    <PageLayout eyebrow="BMI 역방향 계산" title="목표 BMI → 체중 계산기" description="원하는 BMI를 달성하려면 체중이 몇 kg이어야 하는지 역산해 드려요.">
      <CalculatorJsonLd name="목표 BMI 달성 체중 계산기" description="목표 BMI를 입력하면 필요한 체중을 역산합니다." url="https://moduncalc.com/health/bmi/reverse" />
      <FaqJsonLd items={[{ q: '정상 BMI가 되려면 몇 kg이어야 하나요?', a: '키에 따라 다릅니다. 170cm 기준 정상 BMI(18.5~22.9) 체중은 약 53.5~66.1kg입니다.' }, { q: '목표 체중은 어떻게 설정하면 좋나요?', a: 'BMI 22.0을 기준으로 삼는 것이 일반적이며, 현재 체중에서 주당 0.5~1kg씩 줄이는 것이 건강합니다.' }]} />
      <BmiReverse />
    </PageLayout>
  );
}
