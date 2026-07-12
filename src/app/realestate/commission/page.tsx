import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CommissionCalc from "./CommissionCalc";

export const metadata: Metadata = {
  title: "복비 계산기 - 부동산 중개수수료",
  description: "부동산 매매·전세·월세 중개수수료(복비)를 자동 계산하세요. 2026년 요율표 기준, 부가세 포함 총 비용까지 한눈에.",
  alternates: { canonical: "https://moduncalc.com/realestate/commission" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 요율 기준" title="복비 계산기" description="매매·전세·월세 거래 시 부동산 중개수수료를 계산해 드려요.">
      <CalculatorJsonLd name="복비 계산기" description="부동산 매매·전세·월세 중개수수료를 자동 계산하세요." url="https://moduncalc.com/realestate/commission" />
      <FaqJsonLd items={[{q:"복비(중개수수료)를 깎을 수 있나요?",a:"요율 상한 내에서 협의 가능합니다. 법정 상한은 최대치이지, 반드시 그만큼 내야 하는 것은 아닙니다."},{q:"부가세는 별도인가요?",a:"일반과세 중개사는 부가세 10%가 별도이고, 간이과세자는 포함입니다."},{q:"요율 상한은 법적 기준인가요?",a:"네, 공인중개사법 시행규칙에서 정한 법정 상한입니다."}]} />
      <CommissionCalc />
    </PageLayout>
  );
}
