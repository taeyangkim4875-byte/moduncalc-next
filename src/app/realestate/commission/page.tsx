import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import CommissionCalc from "./CommissionCalc";

export const metadata: Metadata = {
  title: "복비 계산기 - 부동산 중개수수료 | 모든 계산기",
  description: "부동산 매매·전세·월세 중개수수료(복비)를 자동 계산하세요. 2026년 요율표 기준, 부가세 포함 총 비용까지 한눈에.",
  alternates: { canonical: "https://moduncalc.com/realestate/commission" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 요율 기준" title="복비 계산기" description="매매·전세·월세 거래 시 부동산 중개수수료를 계산해 드려요.">
      <CommissionCalc />
    </PageLayout>
  );
}
