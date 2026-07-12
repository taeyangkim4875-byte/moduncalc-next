import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import ElectricCalc from "./ElectricCalc";

export const metadata: Metadata = {
  title: "전기요금 계산기 - 2026 누진제 요금 계산",
  description: "2026년 전기요금 누진제 기준으로 월 전기요금을 계산합니다. 사용량과 시기를 입력하면 구간별 요금과 총 납부액을 확인하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/electric" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 전기요금 기준" title="전기요금 계산기" description="월 사용량을 입력하면 누진제 적용 전기요금을 바로 계산해 드려요.">
      <CalculatorJsonLd name="전기요금 계산기" description="2026년 전기요금 누진제 기준으로 월 전기요금을 계산합니다." url="https://moduncalc.com/daily/electric" />
      <FaqJsonLd items={[{q:"하계 요금이 완화되는 이유는 무엇인가요?",a:"여름철 냉방으로 전력 사용량이 급증하므로, 정부가 가계 부담 완화를 위해 하계 구간을 완화합니다."},{q:"전기요금을 절약하는 방법은?",a:"대기전력 차단, 에어컨 적정 온도(26도) 설정, LED 조명 교체, 에너지 효율 1등급 가전 사용이 효과적입니다."},{q:"누진제는 모든 가정에 적용되나요?",a:"주거용(주택용) 전력에만 적용됩니다. 상업·산업용은 별도 요금체계입니다."}]} />
      <ElectricCalc />
    </PageLayout>
  );
}
