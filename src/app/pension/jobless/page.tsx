import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import JoblessCalculator from "./JoblessCalculator";

export const metadata: Metadata = {
  title: "2026 실업급여 계산기 - 구직급여 예상 수령액",
  description: "2026년 기준 실업급여(구직급여) 1일액, 소정급여일수, 총 수령액을 계산하세요. 상한 68,100원·하한 66,048원 자동 반영.",
  alternates: { canonical: "https://moduncalc.com/pension/jobless" },
  openGraph: { title: "2026 실업급여 계산기 - 구직급여 예상 수령액 조회", description: "퇴사 후 받을 수 있는 실업급여 금액과 수급 기간을 계산. 2026년 상한·하한 반영. 자발적 퇴사 수급 조건도 안내.", url: "https://moduncalc.com/pension/jobless" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 고용보험 기준" title="실업급여 계산기" description="퇴사 후 받을 구직급여 1일액과 총 지급액을 미리 계산해 드려요.">
      <CalculatorJsonLd name="실업급여 계산기" description="2026년 기준 실업급여(구직급여) 1일액, 소정급여일수, 총 수령액을 계산하세요." url="https://moduncalc.com/pension/jobless" />
      <FaqJsonLd items={[{q:"자발적 퇴사도 실업급여를 받을 수 있나요?",a:"원칙적으로 불가하지만, 임금체불·직장 내 괴롭힘·통근 곤란 등 정당한 사유가 있으면 수급 가능합니다."},{q:"실업급여는 얼마나 오래 받을 수 있나요?",a:"나이와 고용보험 가입기간에 따라 120~270일입니다."},{q:"실업급여 신청은 어디서 하나요?",a:"거주지 관할 고용센터에 방문하거나, 고용24 온라인으로 신청할 수 있습니다."}]} />
      <JoblessCalculator />
    </PageLayout>
  );
}
