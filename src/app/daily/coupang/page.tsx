import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CoupangCalc from "./CoupangCalc";

export const metadata: Metadata = {
  title: "쿠팡 파트너스 수익 계산기 - 예상 수익 시뮬레이션",
  description: "클릭 수, 전환율, 평균 주문액으로 쿠팡 파트너스 예상 수익을 계산하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/coupang" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="블로그 수익"
      title="쿠팡 파트너스 수익 계산기"
      description="클릭 수와 전환율로 쿠팡 파트너스 예상 수익을 시뮬레이션하세요."
    >
      <CalculatorJsonLd name="쿠팡 파트너스 수익 계산기" description="클릭 수, 전환율, 평균 주문액으로 쿠팡 파트너스 예상 수익을 계산하세요." url="https://moduncalc.com/daily/coupang" />
      <FaqJsonLd items={[
        { q: "쿠팡 파트너스 수수료는 언제 지급되나요?", a: "매월 말 정산 후 익월 25일경에 지급됩니다. 최소 출금 금액은 1만원입니다." },
        { q: "전환율 3%는 현실적인가요?", a: "블로그 품질과 상품 관련성에 따라 1~10%까지 다양합니다. 상품 리뷰 글은 5% 이상도 가능하며, 일반 배너는 1~2% 정도입니다." },
        { q: "쿠팡 파트너스와 애드센스를 동시에 할 수 있나요?", a: "네, 동시 운영이 가능합니다. 애드센스로 광고 수익을, 쿠팡 파트너스로 제휴 수익을 함께 올릴 수 있습니다." },
      ]} />
      <CoupangCalc />
    </PageLayout>
  );
}
