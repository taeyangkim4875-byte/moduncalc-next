import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SalaryConverter from "./SalaryConverter";

export const metadata: Metadata = {
  title: "연봉 환산기 - 내 월급으로 ___까지 얼마나 일해야 할까?",
  description: "내 월급으로 아이폰 사려면 며칠? 테슬라는? 연봉 입력하면 물건별 근무 일수 바로 계산.",
  alternates: { canonical: "https://moduncalc.com/salary/convert" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="연봉"
      title="연봉 환산기"
      description="내 연봉으로 각종 물건을 사려면 얼마나 일해야 할까?"
    >
      <CalculatorJsonLd name="연봉 환산기" description="연봉을 입력하면 아이폰, 테슬라, 아파트 등을 사려면 며칠을 일해야 하는지 계산합니다." url="https://moduncalc.com/salary/convert" />
      <FaqJsonLd items={[{q:"세후 기준으로 볼 수 있나요?",a:"현재는 세전 기준입니다. 실수령액 기준으로 보려면 연봉 실수령액 계산기에서 실수령액을 확인한 후 그 금액을 입력하세요."},{q:"근무일 252일은 어떤 기준인가요?",a:"연 365일에서 주말 104일, 공휴일 약 15일을 제외한 평균 근무일수입니다."}]} />
      <SalaryConverter />
    </PageLayout>
  );
}
