import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import CarLoanCalc from "./CarLoanCalc";

export const metadata: Metadata = {
  title: "자동차 할부 계산기 - 월 납입액·취등록세·총 비용",
  description: "자동차 할부 월 납입액, 취등록세, 총 구매 비용을 한 번에 계산하세요. 선수금, 할부기간, 이자율 반영. 경차·전기차 감면 포함.",
  alternates: { canonical: "https://moduncalc.com/loan/car" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 취등록세 기준" title="자동차 할부 계산기" description="할부 월 납입액과 취등록세, 총 구매 비용을 계산해 드려요.">
      <CarLoanCalc />
    </PageLayout>
  );
}
