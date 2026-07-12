import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SeveranceCalc from "./SeveranceCalc";

export const metadata: Metadata = {
  title: "퇴직금 계산기 - 예상 퇴직금 조회",
  description: "입사일·퇴사일·월급만 입력하면 예상 퇴직금을 바로 계산합니다. 1일 평균임금, 재직기간 자동 산출.",
  alternates: { canonical: "https://moduncalc.com/salary/severance" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="근로기준법 기준" title="퇴직금 계산기" description="재직기간과 급여 정보를 입력하면 예상 퇴직금을 계산해 드려요.">
      <CalculatorJsonLd name="퇴직금 계산기" description="입사일·퇴사일·월급만 입력하면 예상 퇴직금을 바로 계산합니다." url="https://moduncalc.com/salary/severance" />
      <FaqJsonLd items={[{q:"1년 미만 근무해도 퇴직금을 받을 수 있나요?",a:"아니요, 퇴직금은 1년 이상 근무한 경우에만 발생합니다."},{q:"퇴직금에 세금이 얼마나 부과되나요?",a:"퇴직소득세가 부과되며, 근속연수와 퇴직금 규모에 따라 세율이 달라집니다."},{q:"상여금이나 성과급도 퇴직금 계산에 포함되나요?",a:"정기적으로 지급되는 상여금은 포함, 일시적 성과급은 제외될 수 있습니다."}]} />
      <SeveranceCalc />
    </PageLayout>
  );
}
