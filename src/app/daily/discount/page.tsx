import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import DiscountCalc from "./DiscountCalc";

export const metadata: Metadata = {
  title: "할인가 계산기 - 할인율·이중할인·1+1 단가 비교",
  description: "정가와 할인율을 입력하면 할인가를 바로 계산. 이중 할인, 1+1·2+1 행사 단가 비교까지 한번에.",
  alternates: { canonical: "https://moduncalc.com/daily/discount" },
  openGraph: {
    title: "할인가 계산기 - 할인율·이중할인·1+1 단가 비교",
    description: "정가와 할인율을 입력하면 할인가를 바로 계산. 이중 할인, 1+1·2+1 행사 단가 비교까지 한번에.",
    url: "https://moduncalc.com/daily/discount",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="쇼핑 계산" title="할인가 계산기" description="할인율 적용가와 1+1/2+1 단가를 비교해요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '할인가', href: '/daily/discount' }]} />
      <CalculatorJsonLd name="할인가 계산기" description="할인율 적용가와 1+1, 2+1 단가를 비교하세요." url="https://moduncalc.com/daily/discount" />
      <FaqJsonLd items={[{q:"이중 할인은 어떻게 계산하나요?",a:"두 할인율을 순차 적용합니다. 20%+10%는 28% 할인이 됩니다 (1×0.8×0.9=0.72)."},{q:"1+1과 50% 할인 중 어느 게 유리한가요?",a:"결과적으로 동일합니다. 1+1은 2개 구매 시 개당 50% 할인과 같습니다."}]} />
      <DiscountCalc />

      <SeoSection title="할인가 계산 공식">
        <p>
          쇼핑할 때 가장 많이 하는 계산을 정리했습니다.
          마트 전단지나 온라인 쿠폰을 볼 때 바로 활용할 수 있습니다.
        </p>
        <SeoFormula>
          <div>할인가 = 정가 × (1 − 할인율 ÷ 100)</div>
          <div>이중 할인 = 정가 × (1 − 첫 할인율) × (1 − 두 번째 할인율)</div>
          <div>1+1 개당 단가 = 정가 ÷ 2</div>
          <div>2+1 개당 단가 = (정가 × 2) ÷ 3</div>
        </SeoFormula>
        <p>
          핵심은 <strong>이중 할인은 단순 합산이 아니라 순차 적용</strong>된다는 점입니다.
          20% + 10% 할인이면 30%가 아니라 28%입니다.
          정가 10만원 기준 이중 할인가는 72,000원이고, 단순 합산 30%보다 2,000원 더 비쌉니다.
        </p>
      </SeoSection>

      <SeoSection title="할인 행사 유형별 실제 할인율">
        <p>자주 보는 행사를 실제 할인율로 환산하면 어떤 게 유리한지 한눈에 비교됩니다.</p>
        <SeoList>
          <li><strong>1+1</strong> — 개당 50% 할인과 동일. 두 개 다 필요할 때만 이득.</li>
          <li><strong>2+1</strong> — 개당 약 33% 할인. 세 개를 쓸 수 있어야 이득.</li>
          <li><strong>3+1</strong> — 개당 25% 할인. 대가족이나 공동구매에 적합.</li>
          <li><strong>카드 즉시 할인 5% + 쿠폰 10%</strong> — 이중 할인으로 실제 14.5% 할인.</li>
        </SeoList>
        <p>
          1+1 행사가 무조건 이득은 아닙니다. 유통기한이 짧은 식품이면 남은 1개를 버릴 수 있어서,
          <strong>실제 소비할 수량 기준으로 개당 단가를 비교</strong>하는 게 합리적입니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="할인 계산, 이런 점도 궁금하실 거예요"
        items={[
          { q: '쿠폰 할인과 포인트 결제는 순서가 중요한가요?', a: '네, 대부분의 쇼핑몰에서 쿠폰 할인이 먼저 적용된 후 남은 금액에 포인트가 차감됩니다. 순서가 달라지면 최종 결제금액이 달라질 수 있으니 결제 전 할인 적용 순서를 확인하세요.' },
          { q: '할인된 가격에서 원래 정가를 역산하려면?', a: '할인가 ÷ (1 − 할인율)로 구합니다. 예를 들어 30% 할인가가 35,000원이면 원래 정가는 35,000 ÷ 0.7 = 50,000원입니다.' },
          { q: '멤버십 등급 할인과 쿠폰을 동시에 쓸 수 있나요?', a: '쇼핑몰마다 다릅니다. 일부는 중복 적용이 가능하고(이중 할인), 일부는 더 큰 할인만 적용되는 정책을 씁니다. 결제 전에 "할인 중복 적용" 여부를 확인하세요.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          비율 계산이 헷갈리면 <SeoLink href="/daily/percent">퍼센트 계산기</SeoLink>로 빠르게 확인하고,
          모임 비용을 인원수로 나누려면 <SeoLink href="/daily/dutch">더치페이 계산기</SeoLink>를 이용하세요.
          부가세 포함가 역산이 필요하면 <SeoLink href="/tax/vat">부가세 계산기</SeoLink>가 편합니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
