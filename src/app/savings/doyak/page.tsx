import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import DoyakCalculator from "./DoyakCalculator";

export const metadata: Metadata = {
  title: "청년도약계좌 계산기 - 실수령액 · 정부기여금 시뮬레이션",
  description: "청년도약계좌 5년 만기 실수령액을 계산하세요. 소득 구간별 정부 기여금, 은행별 우대금리, 년차별 금리 적용까지 한 번에.",
  alternates: { canonical: "https://moduncalc.com/savings/doyak" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 최신 정책 반영" title="청년도약계좌 계산기" description="5년 만기 실수령액과 정부 기여금을 계산해 드려요.">
      <DoyakCalculator />
    </PageLayout>
  );
}
