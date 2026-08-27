import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import TravelCalc from "./TravelCalc";

export const metadata: Metadata = {
  title: "여행 경비 계산기 - 국내·해외 여행 예산 짜기 (2026)",
  description:
    "여행 일수, 인원, 목적지를 선택하면 예상 경비를 자동 계산. 항공, 숙소, 식비, 교통, 관광 비용 포함.",
  alternates: { canonical: "https://moduncalc.com/daily/travel" },
  openGraph: {
    title: "여행 경비 계산기 - 국내·해외 여행 예산 짜기 (2026)",
    description: "여행 일수, 인원, 목적지를 선택하면 예상 경비를 자동 계산. 항공, 숙소, 식비, 교통, 관광 비용 포함.",
    url: "https://moduncalc.com/daily/travel",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="생활 계산"
      title="여행 경비 계산기"
      description="목적지, 일수, 인원, 스타일을 선택하면 예상 여행 경비를 자동으로 계산해요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '여행 경비', href: '/daily/travel' }]} />
      <CalculatorJsonLd
        name="여행 경비 계산기"
        description="여행 일수, 인원, 목적지를 선택하면 예상 경비를 자동 계산. 항공, 숙소, 식비, 교통, 관광 비용 포함."
        url="https://moduncalc.com/daily/travel"
      />
      <FaqJsonLd
        items={[
          {
            q: "여행 경비를 줄이는 가장 효과적인 방법은?",
            a: "항공권은 2~3개월 전 예약, 숙소는 에어비앤비나 호스텔 이용, 현지 대중교통 활용이 가장 효과적입니다. 비수기 여행도 30~50% 절약 가능합니다.",
          },
          {
            q: "해외여행 시 환전은 어떻게 하는 게 유리한가요?",
            a: "트래블월렛, 트래블로그 등 여행 카드를 사용하면 환전 수수료를 절약할 수 있습니다. 현지 ATM 인출도 환율이 유리한 경우가 많습니다.",
          },
          {
            q: "여행자 보험은 꼭 가입해야 하나요?",
            a: "해외여행 시 의료비가 매우 비쌀 수 있으므로 여행자 보험 가입을 강력히 권장합니다. 1만 원대부터 가입 가능하며, 신용카드 부가 보험도 확인해 보세요.",
          },
        ]}
      />
      <TravelCalc />

      <SeoSection title="여행 예산, 현실적으로 짜는 법">
        <p>일본 3박 4일 예산 잡을 때 항공+숙소만 계산하고 가면 진짜 큰일 납니다. 현지 교통비, 밥값, 입장료, 쇼핑 이런 거 다 합치면 보통 예상의 1.5배는 나와요. 특히 2026년 엔화가 100엔에 900원대라 일본 물가가 체감상 꽤 올랐습니다.</p>
        <p>숙소는 에어비앤비보다 부킹닷컴 무료 취소 옵션이 편해요. 항공권은 스카이스캐너로 가격 비교하되, 출발 8주 전이 평균적으로 가장 싼 시점이라는 통계가 있습니다. 근데 제주도 같은 국내 여행은 렌트비가 큰 비중을 차지하니까 쏘카나 제주패스 할인도 꼭 확인하세요.</p>
      </SeoSection>

      <SeoFaq
        title="여행 경비 관련 궁금한 점"
        items={[
          { q: '해외여행 시 현금은 얼마나 가져가야 하나요?', a: '트래블월렛이나 트래블로그 카드로 대부분 해결됩니다. 현금은 비상용으로 10~20만원 정도면 충분해요. 일본 시골 마을이나 야시장은 현금만 받는 곳이 있긴 합니다.' },
          { q: '여행자 보험 안 들면 어떻게 되나요?', a: '해외 병원비가 무섭습니다. 일본에서 골절 치료하면 200~300만원, 미국은 수천만원 나옵니다. 1만원대면 가입되니까 그냥 드세요.' },
          { q: '성수기 피하면 얼마나 아끼나요?', a: '항공권은 30~50%, 숙소는 20~40% 정도 저렴해집니다. 6월 초, 9월 중순이 비수기인데 날씨도 괜찮아서 개인적으로 추천하는 시기예요.' },
        ]}
      />
    </PageLayout>
  );
}
