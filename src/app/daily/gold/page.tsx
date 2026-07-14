import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import GoldCalc from "./GoldCalc";

export const metadata: Metadata = {
  title: "금 시세 계산기 - 금 1돈·1g 가격 환산 (2026)",
  description: "금 무게(돈, g, oz)를 입력하면 현재 시세 기준 금액을 환산합니다. 1돈=3.75g.",
  alternates: { canonical: "https://moduncalc.com/daily/gold" },
  openGraph: {
    title: "금 시세 계산기 - 금 1돈·1g 가격 환산 (2026)",
    description: "금 무게(돈, g, oz)를 입력하면 현재 시세 기준 금액을 환산합니다. 1돈=3.75g.",
    url: "https://moduncalc.com/daily/gold",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="생활" title="금 시세 계산기" description="금 무게와 시세를 입력하면 금액을 환산합니다.">
      <CalculatorJsonLd name="금 시세 계산기" description="금 무게(돈, g, oz)를 입력하면 현재 시세 기준 금액을 환산합니다. 1돈=3.75g." url="https://moduncalc.com/daily/gold" />
      <FaqJsonLd items={[
        { q: "금 1돈은 몇 그램인가요?", a: "금 1돈은 3.75g입니다. 1냥은 10돈(37.5g)이며, 국제 단위 1트로이온스(oz)는 31.1035g입니다." },
        { q: "금 거래 시 세금이 있나요?", a: "금 거래 시 부가가치세 10%가 부과됩니다. 다만 KRX 금시장을 통해 거래하면 부가세가 면제되고 양도소득세도 비과세입니다." },
        { q: "금 투자 방법에는 어떤 것이 있나요?", a: "골드바 구매, KRX 금시장, 금 ETF, 금 통장(골드뱅킹), 금 펀드 등이 있습니다. 실물 보유를 원하면 골드바, 세금 혜택을 원하면 KRX 금시장을 추천합니다." },
      ]} />
      <GoldCalc />
    </PageLayout>
  );
}
