import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import DoyakCalculator from "./DoyakCalculator";

export const metadata: Metadata = {
  title: "청년도약계좌 계산기 - 지금까지 모은 돈 · 만기 수령액 · 특별중도해지",
  description: "청년도약계좌 지금까지 얼마 모았는지 확인하세요. 원금+이자+정부기여금 적립액 조회, 3년차 변동금리 반영 만기 수령액, 특별중도해지 사유 안내.",
  alternates: { canonical: "https://moduncalc.com/savings/doyak" },
  openGraph: { title: "청년도약계좌 계산기 - 지금까지 모은 돈 · 특별중도해지 (2026)", description: "청년도약계좌 적립액 조회. 원금+이자+정부기여금, 3년차 변동금리 반영, 특별중도해지 9가지 사유 안내.", url: "https://moduncalc.com/savings/doyak" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 변동금리 반영" title="청년도약계좌 계산기" description="지금까지 모은 돈 + 만기 수령액 + 특별중도해지 안내">
      <CalculatorJsonLd name="청년도약계좌 계산기" description="청년도약계좌 5년 만기 실수령액을 계산하세요. 소득 구간별 정부 기여금, 은행별 우대금리 적용." url="https://moduncalc.com/savings/doyak" />
      <FaqJsonLd items={[{q:"청년도약계좌 지금까지 얼마 모았는지 어떻게 확인하나요?",a:"이 계산기에서 경과 개월 수를 입력하면 지금까지의 원금+이자+정부기여금 적립액을 확인할 수 있습니다. 3년차 변동금리 전환도 자동 반영됩니다."},{q:"3년차 이후 변동금리는 얼마인가요?",a:"KB국민·신한·우리은행 기준 연 3.0%로, 고정금리(4.5%) 대비 1.5%p 낮아집니다. 우대금리 1.5%p를 합해도 최고 4.5%입니다."},{q:"특별중도해지 사유는 무엇인가요?",a:"혼인, 출산, 생애최초 주택구입, 퇴직, 폐업, 3개월 이상 장기치료, 천재지변, 사망·해외이주, 청년미래적금 환승이 해당됩니다. 특별중도해지 시 정부기여금과 비과세 혜택이 유지됩니다."},{q:"일반 중도해지하면 어떻게 되나요?",a:"정부 기여금 전액 반환 + 이자소득 과세(15.4%). 원금과 이자는 돌려받지만 혜택이 사라집니다."},{q:"우대금리는 언제부터 적용되나요?",a:"소급 적용이 안 됩니다. 조건을 충족한 시점부터 적용되며, 일부 은행은 만기 시 소급 적용합니다."}]} />
      <DoyakCalculator />
    </PageLayout>
  );
}
