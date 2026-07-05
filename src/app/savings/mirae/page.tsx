import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import MiraeCalculator from "./MiraeCalculator";

export const metadata: Metadata = {
  title: "청년미래적금 계산기 - 은행별 우대금리 비교 · 실수령액",
  description: "2026 청년미래적금 은행별 우대금리 비교표와 실수령액 시뮬레이션. KB국민, NH농협, 신한, 하나, 우리, 기업, 우체국 금리 한눈에 비교.",
  alternates: { canonical: "https://moduncalc.com/savings/mirae" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 최신 금리 반영" title="청년미래적금 계산기" description="은행별 우대금리를 비교하고 3년 만기 실수령액을 계산해 드려요.">
      <MiraeCalculator />
    </PageLayout>
  );
}
