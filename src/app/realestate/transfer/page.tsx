import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import TransferTaxCalc from "./TransferTaxCalc";

export const metadata: Metadata = {
  title: "양도소득세 계산기 - 부동산 양도세",
  description: "부동산 양도소득세를 간편 계산하세요. 1세대1주택 비과세, 장기보유특별공제, 누진세율 자동 적용.",
  alternates: { canonical: "https://moduncalc.com/realestate/transfer" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 세법 기준" title="양도소득세 계산기" description="부동산 매도 시 예상 양도소득세를 간편하게 계산해 드려요.">
      <CalculatorJsonLd name="양도소득세 계산기" description="부동산 양도소득세를 간편 계산. 1세대1주택 비과세, 장기보유특별공제 자동 적용." url="https://moduncalc.com/realestate/transfer" />
      <FaqJsonLd items={[{q:"1세대1주택 비과세 조건은 무엇인가요?",a:"2년 이상 보유(조정대상지역은 2년 거주 포함)하고 양도가 12억 이하이면 비과세입니다."},{q:"장기보유특별공제는 어떻게 적용되나요?",a:"3년 이상 보유 시 연 2%씩, 최대 30%(1주택 거주 포함 시 80%)까지 공제됩니다."},{q:"2년 미만 보유 시 세율이 높아지나요?",a:"1년 미만 보유 시 70%, 1~2년 보유 시 60%의 단일세율이 적용됩니다."}]} />
      <TransferTaxCalc />
    </PageLayout>
  );
}
