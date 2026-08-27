import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import SalaryConverter from "./SalaryConverter";

export const metadata: Metadata = {
  title: "연봉 환산기 - 내 월급으로 ___까지 얼마나 일해야 할까?",
  description: "내 월급으로 아이폰 사려면 며칠? 테슬라는? 연봉 입력하면 물건별 근무 일수 바로 계산.",
  alternates: { canonical: "https://moduncalc.com/salary/convert" },
  openGraph: {
    title: "연봉 환산기 - 내 월급으로 ___까지 얼마나 일해야 할까?",
    description: "내 월급으로 아이폰 사려면 며칠? 테슬라는? 연봉 입력하면 물건별 근무 일수 바로 계산.",
    url: "https://moduncalc.com/salary/convert",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="연봉"
      title="연봉 환산기"
      description="내 연봉으로 각종 물건을 사려면 얼마나 일해야 할까?"
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }, { name: '연봉 환산기', href: '/salary/convert' }]} />
      <CalculatorJsonLd name="연봉 환산기" description="연봉을 입력하면 아이폰, 테슬라, 아파트 등을 사려면 며칠을 일해야 하는지 계산합니다." url="https://moduncalc.com/salary/convert" />
      <FaqJsonLd items={[{q:"세후 기준으로 볼 수 있나요?",a:"현재는 세전 기준입니다. 실수령액 기준으로 보려면 연봉 실수령액 계산기에서 실수령액을 확인한 후 그 금액을 입력하세요."},{q:"근무일 252일은 어떤 기준인가요?",a:"연 365일에서 주말 104일, 공휴일 약 15일을 제외한 평균 근무일수입니다."}]} />
      <SalaryConverter />

      <SeoSection title="내 월급으로 아이폰 사려면 며칠을 일해야 할까">
        <p>연봉 3,600만원이면 세후 월급이 약 260만원이에요. 하루 일당으로 환산하면 약 11.8만원입니다. 아이폰 16 Pro가 155만원이니까 약 13일을 일해야 살 수 있는 거죠. 테슬라 모델 3가 5,500만원이면? 약 466일, 거의 2년 치 월급입니다.</p>
        <p>사실 이렇게 환산해보면 소비 습관이 바뀌어요. 10만원짜리 옷이 하루 일당이라고 생각하면 좀 아깝잖아요. 반대로 연봉이 올라갈수록 같은 물건의 근무일수가 줄어드니까 동기 부여도 됩니다. 연봉 5,000만원이면 아이폰이 9.5일로 줄거든요.</p>
      </SeoSection>

      <SeoFaq
        title="연봉 환산 관련 팁"
        items={[
          { q: '세후 기준으로 보는 게 맞지 않나요?', a: '맞습니다. 정확히 보려면 연봉 실수령액 계산기에서 세후 금액을 확인한 뒤 그 금액을 입력하세요. 세전 연봉 기준이면 실제보다 적게 일해야 하는 것처럼 보여요.' },
          { q: '시간당으로도 환산할 수 있나요?', a: '연봉을 2,016시간(252일 × 8시간)으로 나누면 됩니다. 연봉 4,000만원이면 시급 약 19,840원이에요.' },
          { q: '프리랜서는 어떻게 계산하나요?', a: '월 평균 수입을 12로 곱해서 연봉처럼 환산하면 됩니다. 다만 4대보험이나 퇴직금이 없으니 직장인 연봉과 단순 비교는 안 돼요.' },
        ]}
      />
    </PageLayout>
  );
}
