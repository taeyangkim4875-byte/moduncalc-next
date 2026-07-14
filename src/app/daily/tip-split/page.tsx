import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import TipSplitCalc from "./TipSplitCalc";

export const metadata: Metadata = {
  title: "모임 정산 계산기 - N분의1 · 차등 정산 · 송금 최소화",
  description: "모임비를 참석자별로 정산하세요. 균등 분배, 차등 분배, 송금 최소화 계산.",
  alternates: { canonical: "https://moduncalc.com/daily/tip-split" },
  openGraph: {
    title: "모임 정산 계산기 - N분의1 · 차등 정산 · 송금 최소화",
    description: "모임비를 참석자별로 정산하세요. 균등 분배, 차등 분배, 송금 최소화 계산.",
    url: "https://moduncalc.com/daily/tip-split",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="생활" title="모임 정산 계산기" description="균등 분배, 차등 분배, 송금 최소화로 모임비를 정산합니다.">
      <CalculatorJsonLd name="모임 정산 계산기" description="모임비를 참석자별로 정산. 균등 분배, 차등 분배, 송금 최소화 계산." url="https://moduncalc.com/daily/tip-split" />
      <FaqJsonLd items={[
        { q: "균등 분배와 차등 분배의 차이는 무엇인가요?", a: "균등 분배는 총 금액을 참석자 수로 나누는 N분의1 계산이고, 차등 분배는 각 참석자가 다른 금액을 부담하는 방식입니다. 예를 들어 술을 마신 사람과 안 마신 사람의 금액을 다르게 설정할 수 있습니다." },
        { q: "송금 최소화란 무엇인가요?", a: "한 사람이 먼저 결제했을 때, 나머지 참석자들이 결제자에게 보내야 할 금액을 계산합니다. 송금 횟수를 최소화하여 정산을 간편하게 합니다." },
        { q: "정산할 때 편리한 앱이 있나요?", a: "토스의 더치페이 기능, 카카오페이 송금, 네이버페이 정산하기 등을 활용하면 편리합니다. 링크를 공유하면 각자 자동으로 송금할 수 있습니다." },
      ]} />
      <TipSplitCalc />
    </PageLayout>
  );
}
