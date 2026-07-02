import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import HandwritingCalc from "./HandwritingCalc";

export const metadata: Metadata = {
  title: "손글씨 계산기 - 마우스로 수식을 그려 계산 | 모든 계산기",
  description: "마우스나 터치로 수식을 직접 그리면 AI가 인식해서 계산해 드려요. 덧셈, 뺄셈, 곱셈, 나눗셈, 제곱근까지.",
  alternates: { canonical: "https://moduncalc.com/calc" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="AI 손글씨 인식"
      title="손글씨 계산기"
      description="마우스나 손가락으로 수식을 그리면 인식해서 계산해 드려요."
    >
      <HandwritingCalc />
    </PageLayout>
  );
}
