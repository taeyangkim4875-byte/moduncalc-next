import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import TravelCalc from "./TravelCalc";

export const metadata: Metadata = {
  title: "여행 경비 계산기 - 국내·해외 여행 예산 짜기 (2026)",
  description:
    "여행 일수, 인원, 목적지를 선택하면 예상 경비를 자동 계산. 항공, 숙소, 식비, 교통, 관광 비용 포함.",
  alternates: { canonical: "https://moduncalc.com/daily/travel" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="생활 계산"
      title="여행 경비 계산기"
      description="목적지, 일수, 인원, 스타일을 선택하면 예상 여행 경비를 자동으로 계산해요."
    >
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
    </PageLayout>
  );
}
