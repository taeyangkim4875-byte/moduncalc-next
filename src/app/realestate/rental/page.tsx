import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import RentalCalc from "./RentalCalc";

export const metadata: Metadata = {
  title: "임대수익률 계산기 - 부동산 투자 수익률",
  description: "매매가, 보증금, 월세, 대출 조건을 입력하면 총수익률·순수익률·투자금 회수기간을 자동 계산합니다.",
  alternates: { canonical: "https://moduncalc.com/realestate/rental" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="부동산 투자 분석" title="임대수익률 계산기" description="매매가와 월세를 입력하면 총수익률·순수익률을 바로 계산해 드려요.">
      <CalculatorJsonLd name="임대수익률 계산기" description="매매가, 보증금, 월세, 대출 조건으로 총수익률·순수익률·회수기간을 계산합니다." url="https://moduncalc.com/realestate/rental" />
      <FaqJsonLd items={[{q:"총수익률과 순수익률의 차이는?",a:"총수익률은 연 임대료÷매매가, 순수익률은 경비·대출이자를 뺀 실질 수익률입니다."},{q:"적정 임대수익률은 어느 정도인가요?",a:"일반적으로 연 4~6%면 양호, 3% 미만은 은행 금리 대비 메리트가 낮습니다."},{q:"공실 리스크는 어떻게 대비하나요?",a:"연 1~2개월 공실을 감안하여 수익률을 산정하는 것이 현실적입니다."}]} />
      <RentalCalc />
    </PageLayout>
  );
}
