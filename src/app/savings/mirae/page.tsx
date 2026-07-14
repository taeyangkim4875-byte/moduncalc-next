import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import MiraeCalculator from "./MiraeCalculator";

export const metadata: Metadata = {
  title: "청년미래적금 계산기 - 현재 잔액 확인 · 은행별 우대금리 비교 · 만기 수령액",
  description: "청년미래적금 현재까지 쌓인 원금+이자+기여금 확인. 은행별 우대금리 비교, 3년 만기 실수령액 시뮬레이션. KB국민, NH농협, 신한, 하나, 우리, 기업, 우체국.",
  alternates: { canonical: "https://moduncalc.com/savings/mirae" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 최신 금리 반영" title="청년미래적금 계산기" description="현재 잔액 확인 + 은행별 우대금리 비교 + 만기 수령액 계산">
      <CalculatorJsonLd name="청년미래적금 계산기" description="2026 청년미래적금 은행별 우대금리 비교와 3년 만기 실수령액 시뮬레이션." url="https://moduncalc.com/savings/mirae" />
      <FaqJsonLd items={[{q:"우대금리를 중간에 못 채우면?",a:"충족하지 못한 항목의 우대금리만 빠지고, 기본금리 5%와 나머지 우대금리는 유지됩니다."},{q:"도약계좌에서 환승할 수 있나요?",a:"환승은 최초 신청 기간(2026.6.22~7.3)에 단 한 번만 가능했습니다. 미래적금 가입 신청 → 계좌 개설 후 도약계좌를 특별중도해지하는 순서입니다."},{q:"어떤 은행이 가장 유리한가요?",a:"금리 자체는 1그룹 은행이 동일(최대 8%)이지만, 우대 조건 달성 난이도가 다릅니다. 주거래 은행을 선택하는 것이 가장 현실적입니다."}]} />
      <MiraeCalculator />
    </PageLayout>
  );
}
