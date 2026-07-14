import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import DoyakCalculator from "./DoyakCalculator";

export const metadata: Metadata = {
  title: "청년도약계좌 계산기 - 만기 수령액 · 현재 잔액 확인 · 변동금리 반영",
  description: "청년도약계좌 만기 수령액과 현재까지 쌓인 원금+이자+기여금을 계산하세요. 3년차 변동금리 전환, 소득 구간별 정부기여금, 우대금리 시점 반영.",
  alternates: { canonical: "https://moduncalc.com/savings/doyak" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 변동금리 반영" title="청년도약계좌 계산기" description="만기 수령액 + 현재까지 쌓인 금액을 한눈에 확인하세요.">
      <CalculatorJsonLd name="청년도약계좌 계산기" description="청년도약계좌 5년 만기 실수령액을 계산하세요. 소득 구간별 정부 기여금, 은행별 우대금리 적용." url="https://moduncalc.com/savings/doyak" />
      <FaqJsonLd items={[{q:"현재까지 쌓인 금액을 어떻게 확인하나요?",a:"계산기에서 경과 개월 수를 입력하면 지금까지의 원금+이자+정부기여금 합계를 확인할 수 있습니다. 변동금리 전환 시점도 자동 반영됩니다."},{q:"3년차 이후 변동금리는 얼마인가요?",a:"KB국민·신한·우리은행 기준 연 3.0%로, 고정금리(4.5%) 대비 1.5%p 낮아집니다. 우대금리 1.5%p를 합해도 최고 4.5%입니다."},{q:"중도해지하면 어떻게 되나요?",a:"정부 기여금 반환 + 이자 과세(15.4%). 특별중도해지 사유(결혼, 출산, 청년미래적금 환승 등) 시 기여금 유지 가능."},{q:"우대금리는 언제부터 적용되나요?",a:"소급 적용이 안 됩니다. 조건을 충족한 시점부터 우대금리가 적용되며, 그 이전 기간에는 기본금리만 적용됩니다."}]} />
      <DoyakCalculator />
    </PageLayout>
  );
}
