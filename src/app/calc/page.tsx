import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import SmartCalc from "./SmartCalc";

export const metadata: Metadata = {
  title: "스마트 계산기 - 수식 입력·공학 계산 | 모든 계산기",
  description: "cos, sin, sqrt, log 등 공학 함수를 텍스트로 입력하면 실시간으로 계산해 드려요. 한국어 입력도 지원.",
  alternates: { canonical: "https://moduncalc.com/calc" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="공학 · 일반 계산"
      title="스마트 계산기"
      description="수식을 입력하면 실시간으로 계산해 드려요. 한국어도 지원!"
    >
      <SmartCalc />
    </PageLayout>
  );
}
