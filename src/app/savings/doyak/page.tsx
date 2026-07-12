import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import DoyakCalculator from "./DoyakCalculator";

export const metadata: Metadata = {
  title: "청년도약계좌 계산기 - 실수령액 · 정부기여금 시뮬레이션",
  description: "청년도약계좌 5년 만기 실수령액을 계산하세요. 소득 구간별 정부 기여금, 은행별 우대금리, 년차별 금리 적용까지 한 번에.",
  alternates: { canonical: "https://moduncalc.com/savings/doyak" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 최신 정책 반영" title="청년도약계좌 계산기" description="5년 만기 실수령액과 정부 기여금을 계산해 드려요.">
      <CalculatorJsonLd name="청년도약계좌 계산기" description="청년도약계좌 5년 만기 실수령액을 계산하세요. 소득 구간별 정부 기여금, 은행별 우대금리 적용." url="https://moduncalc.com/savings/doyak" />
      <FaqJsonLd items={[{q:"중도해지하면 어떻게 되나요?",a:"정부 기여금 반환 + 이자 과세(15.4%). 특별중도해지 사유(결혼, 출산, 청년미래적금 환승 등) 시 기여금 유지 가능."},{q:"미래적금으로 환승할 수 있나요?",a:"환승은 최초 신청 기간(2026.6.22~7.3)에 단 한 번만 가능했습니다. 미래적금 가입 신청 → 계좌 개설 후 도약계좌를 특별중도해지하는 순서입니다."},{q:"우대금리는 언제부터 적용되나요?",a:"소급 적용이 안 됩니다. 조건을 충족한 시점부터 우대금리가 적용되며, 그 이전 기간에는 기본금리만 적용됩니다."}]} />
      <DoyakCalculator />
    </PageLayout>
  );
}
