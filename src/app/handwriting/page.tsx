import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import HandwritingCalc from "./HandwritingCalc";

export const metadata: Metadata = {
  title: "손글씨 계산기 - 마우스로 수식을 그려 계산",
  description: "마우스나 터치로 수식을 직접 그리면 AI가 인식해서 계산해 드려요. MyScript 기반 수학 전문 인식.",
  alternates: { canonical: "https://moduncalc.com/handwriting" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="AI 수학 인식 (Beta)"
      title="손글씨 계산기"
      description="마우스나 손가락으로 수식을 그리면 AI가 인식해서 계산해 드려요."
    >
      <HandwritingCalc />
    </PageLayout>
  );
}
