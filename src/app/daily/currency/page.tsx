import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import CurrencyCalc from "./CurrencyCalc";

export const metadata: Metadata = {
  title: "환율 계산기 - 실시간 환율 변환 | 모든 계산기",
  description: "USD, EUR, JPY, CNY, GBP 주요 통화를 원화로 빠르게 변환하세요. 고시환율 기준 참고용 계산기.",
  alternates: { canonical: "https://moduncalc.com/daily/currency" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="고시환율 기준" title="환율 계산기" description="금액과 통화를 선택하면 원화 변환 결과를 바로 확인할 수 있어요.">
      <CurrencyCalc />
    </PageLayout>
  );
}
