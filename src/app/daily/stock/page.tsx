import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import StockCalc from "./StockCalc";

export const metadata: Metadata = {
  title: "주식 수익률 계산기 - 손익·물타기 계산",
  description: "주식 매수가와 현재가로 수익률(%)을 계산하고, 물타기(평균단가 낮추기) 시뮬레이션까지 한 번에.",
  alternates: { canonical: "https://moduncalc.com/daily/stock" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="주식 · 투자" title="주식 수익률 계산기" description="수익률 계산과 물타기 시뮬레이션을 한 번에.">
      <StockCalc />
    </PageLayout>
  );
}
