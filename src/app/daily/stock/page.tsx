import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import StockCalc from "./StockCalc";

export const metadata: Metadata = {
  title: "주식 수익률 계산기 - 손익·물타기 계산",
  description: "내 주식 수익률은 몇 %? 매수가·현재가 입력하면 손익 + 물타기 시뮬레이션까지 바로.",
  alternates: { canonical: "https://moduncalc.com/daily/stock" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="주식 · 투자" title="주식 수익률 계산기" description="수익률 계산과 물타기 시뮬레이션을 한 번에.">
      <CalculatorJsonLd name="주식 수익률 계산기" description="주식 매수가와 현재가로 수익률을 계산하고 물타기 시뮬레이션까지." url="https://moduncalc.com/daily/stock" />
      <FaqJsonLd items={[{q:"물타기는 언제 하는 게 좋나요?",a:"기업 펀더멘털이 건전한데 일시적 하락일 때 유효합니다. 하락 추세에서 무작정 물타기는 손실을 키울 수 있습니다."},{q:"손익분기 단가란?",a:"투자 원금을 회수하기 위해 주가가 올라야 하는 최소 가격입니다."},{q:"세금과 수수료는 반영되나요?",a:"이 계산기는 세전 수익률 기준입니다. 실제로는 증권거래세 0.18%와 양도소득세(대주주)가 부과됩니다."}]} />
      <StockCalc />
    </PageLayout>
  );
}
