import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CarLoanCalc from "./CarLoanCalc";

export const metadata: Metadata = {
  title: "자동차 할부 계산기 - 월 납입액·취등록세·총 비용",
  description: "자동차 할부 월 납입액, 취등록세, 총 구매 비용을 한 번에 계산하세요. 선수금, 할부기간, 이자율 반영. 경차·전기차 감면 포함.",
  alternates: { canonical: "https://moduncalc.com/loan/car" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 취등록세 기준" title="자동차 할부 계산기" description="할부 월 납입액과 취등록세, 총 구매 비용을 계산해 드려요.">
      <CalculatorJsonLd name="자동차 할부 계산기" description="자동차 할부 월 납입액, 취등록세, 총 구매 비용을 한 번에 계산하세요." url="https://moduncalc.com/loan/car" />
      <FaqJsonLd items={[{q:"무이자 할부는 정말 이자가 0원인가요?",a:"캐피탈사 무이자 할부는 이자가 0이지만, 대신 차량 할인이 줄어들 수 있습니다."},{q:"할부 기간은 몇 개월이 적당한가요?",a:"36~48개월이 일반적입니다. 길수록 월 부담은 줄지만 총 이자가 늘어납니다."},{q:"취등록세 외에 또 드는 비용은?",a:"공채매입비, 보험료, 번호판 비용 등이 추가로 발생합니다."}]} />
      <CarLoanCalc />
    </PageLayout>
  );
}
