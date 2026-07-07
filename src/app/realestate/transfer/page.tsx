import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import TransferTaxCalc from "./TransferTaxCalc";

export const metadata: Metadata = {
  title: "양도소득세 계산기 - 부동산 양도세",
  description: "부동산 양도소득세를 간편 계산하세요. 1세대1주택 비과세, 장기보유특별공제, 누진세율 자동 적용.",
  alternates: { canonical: "https://moduncalc.com/realestate/transfer" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 세법 기준" title="양도소득세 계산기" description="부동산 매도 시 예상 양도소득세를 간편하게 계산해 드려요.">
      <TransferTaxCalc />
    </PageLayout>
  );
}
