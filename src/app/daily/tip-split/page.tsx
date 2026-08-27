import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
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
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '모임 정산', href: '/daily/tip-split' }]} />
      <CalculatorJsonLd name="모임 정산 계산기" description="모임비를 참석자별로 정산. 균등 분배, 차등 분배, 송금 최소화 계산." url="https://moduncalc.com/daily/tip-split" />
      <FaqJsonLd items={[
        { q: "균등 분배와 차등 분배의 차이는 무엇인가요?", a: "균등 분배는 총 금액을 참석자 수로 나누는 N분의1 계산이고, 차등 분배는 각 참석자가 다른 금액을 부담하는 방식입니다. 예를 들어 술을 마신 사람과 안 마신 사람의 금액을 다르게 설정할 수 있습니다." },
        { q: "송금 최소화란 무엇인가요?", a: "한 사람이 먼저 결제했을 때, 나머지 참석자들이 결제자에게 보내야 할 금액을 계산합니다. 송금 횟수를 최소화하여 정산을 간편하게 합니다." },
        { q: "정산할 때 편리한 앱이 있나요?", a: "토스의 더치페이 기능, 카카오페이 송금, 네이버페이 정산하기 등을 활용하면 편리합니다. 링크를 공유하면 각자 자동으로 송금할 수 있습니다." },
      ]} />
      <TipSplitCalc />

      <SeoSection title="회식비 정산, 매번 애매하죠">
        <p>4명이서 고깃집 갔는데 한 명은 술을 안 마셨어요. 총 24만원 나왔는데 N분의1로 하면 그 사람이 억울하잖아요. 근데 정확히 나누자니 또 쪼잔해 보이고. 솔직히 이런 상황 매번 있습니다.</p>
        <p>요즘은 토스 더치페이 기능이 편해요. 총무가 금액 넣고 링크 보내면 각자 알아서 송금하는 방식이라 잔돈까지 깔끔하게 정리됩니다. 카카오페이도 비슷한 기능 있는데, 차등 정산은 이 계산기에서 먼저 금액 정하고 토스나 카카오페이로 보내는 게 가장 현실적이에요.</p>
      </SeoSection>

      <SeoFaq
        title="모임 정산 꿀팁"
        items={[
          { q: '10원 단위는 어떻게 처리하나요?', a: '보통 100원 단위로 올림하거나 총무가 흡수합니다. 이 계산기는 10원 단위까지 정확히 나눠주니까 참고하고 100원 단위로 맞추면 돼요.' },
          { q: '선결제자가 여러 명이면요?', a: '각 결제자별로 따로 정산하는 게 깔끔합니다. 1차 고기, 2차 술집처럼 결제자가 다르면 각각 계산해서 합치세요.' },
          { q: '법인카드로 결제하면 정산 필요 없나요?', a: '회사 경비 처리면 정산이 필요 없지만, 개인 비용이 섞이면 그 부분만 따로 정산해야 합니다. 영수증은 꼭 챙기세요.' },
        ]}
      />
    </PageLayout>
  );
}
