import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import SavingsCalculator from "./SavingsCalculator";

export const metadata: Metadata = {
  title: "도약계좌 vs 미래적금 비교 계산기",
  description: "청년도약계좌 만기 유지와 청년미래적금 환승, 어느 쪽이 더 유리한지 실수령액으로 비교해 보세요. 2026 최신 정책 반영.",
  alternates: { canonical: "https://moduncalc.com" },
};

export default function Home() {
  return (
    <PageLayout
      eyebrow="2026 최신 정책 반영"
      title="도약계좌 vs 미래적금"
      description="청년도약계좌 유지와 청년미래적금 환승, 어느 쪽이 더 유리한지 비교해 드려요."
    >
      <SavingsCalculator />
    </PageLayout>
  );
}
