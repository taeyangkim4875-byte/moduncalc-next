import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import PercentCalc from "./PercentCalc";

export const metadata: Metadata = {
  title: "퍼센트 계산기 - 비율·변화율·할인율 계산",
  description: "100의 25%는? 80에서 120으로 변하면 몇 %? 비율, 변화율, 할인율, 역산까지 한번에 계산하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/percent" },
  openGraph: {
    title: "퍼센트 계산기 - 비율·변화율·할인율 계산",
    description: "100의 25%는? 80에서 120으로 변하면 몇 %? 비율, 변화율, 할인율, 역산까지 한번에 계산하세요.",
    url: "https://moduncalc.com/daily/percent",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="간편 계산" title="퍼센트 계산기" description="비율, 변화율을 빠르게 계산해요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '퍼센트', href: '/daily/percent' }]} />
      <CalculatorJsonLd name="퍼센트 계산기" description="비율, 변화율, 할인율을 빠르게 계산해요." url="https://moduncalc.com/daily/percent" />
      <FaqJsonLd items={[{q:"퍼센트포인트(%p)와 퍼센트(%)의 차이는?",a:"퍼센트포인트는 두 비율의 절대적 차이, 퍼센트는 상대적 변화율입니다. 예: 3%→5%는 2%p 증가, 약 66.7% 증가."},{q:"할인된 가격에서 원래 가격을 구하려면?",a:"할인된 가격 ÷ (1 - 할인율)로 역산합니다."}]} />
      <PercentCalc />

      <SeoSection title="퍼센트 계산 공식 정리">
        <p>
          퍼센트(%)는 <strong>전체를 100으로 놓았을 때의 비율</strong>입니다.
          일상에서 가장 많이 쓰이는 퍼센트 계산 유형 세 가지를 정리하면 다음과 같습니다.
        </p>
        <SeoFormula>
          <div>A의 B% = A × (B ÷ 100)</div>
          <div>A가 B의 몇 %? = (A ÷ B) × 100</div>
          <div>변화율 = (새 값 − 원래 값) ÷ 원래 값 × 100</div>
        </SeoFormula>
        <p>
          예를 들어 50,000원짜리 상품이 30% 할인이면 50,000 × 0.3 = 15,000원 할인,
          실결제가는 35,000원입니다. 반대로 할인가 35,000원에서 원가를 구하려면
          35,000 ÷ (1 − 0.3) = 50,000원으로 역산합니다.
        </p>
      </SeoSection>

      <SeoSection title="퍼센트와 퍼센트포인트(%p)의 차이">
        <p>
          뉴스에서 <strong>&ldquo;금리가 3%에서 5%로 2%p 인상&rdquo;</strong>이라는 표현을 자주 봅니다.
          여기서 2%p(퍼센트포인트)와 2%는 전혀 다릅니다.
        </p>
        <SeoList>
          <li><strong>퍼센트포인트(%p)</strong> — 두 비율의 절대적 차이. 3%에서 5%로 변하면 <strong>2%p 증가</strong>.</li>
          <li><strong>퍼센트(%)</strong> — 상대적 변화율. 3%에서 5%로 변하면 (5−3)÷3×100 = <strong>약 66.7% 증가</strong>.</li>
        </SeoList>
        <p>
          투자 수익률, 세율 변동, 지지율 변화 등을 볼 때 이 차이를 알면 수치를 정확하게 해석할 수 있습니다.
          <SeoLink href="/daily/stock">주식 수익률 계산기</SeoLink>에서 투자 수익률을 직접 계산해 볼 수도 있습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="퍼센트 계산, 이런 것도 궁금하실 거예요"
        items={[
          { q: '이중 할인(중복 할인)은 어떻게 계산하나요?', a: '20% 할인 후 추가 10% 할인이면 1 × 0.8 × 0.9 = 0.72, 즉 총 28% 할인입니다. 20% + 10% = 30%가 아니라는 점에 주의하세요. 두 번째 할인은 이미 할인된 가격에 적용되기 때문입니다.' },
          { q: '부가세 포함가에서 공급가액을 구하려면?', a: '부가세율이 10%인 경우, 부가세 포함가 ÷ 1.1 = 공급가액입니다. 예를 들어 11,000원의 공급가액은 10,000원이고 부가세는 1,000원입니다. 더 정확한 계산은 부가세 계산기를 이용해 보세요.' },
          { q: '전년 대비 성장률이 마이너스인 경우 어떻게 해석하나요?', a: '변화율이 음수이면 감소를 의미합니다. 예를 들어 매출이 1억에서 8천만 원으로 줄었다면 변화율은 (8000−10000)÷10000×100 = −20%, 즉 20% 감소입니다.' },
          { q: '마크업(Mark-up)과 마진(Margin)의 차이는?', a: '마크업은 원가 대비 이익 비율(이익÷원가×100)이고, 마진은 판매가 대비 이익 비율(이익÷판매가×100)입니다. 원가 1만원에 판매가 1.5만원이면 마크업 50%, 마진 33.3%입니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          쇼핑 할인가를 구체적으로 비교하고 싶다면 <SeoLink href="/daily/discount">할인가 계산기</SeoLink>가 편하고,
          부가세 역산이 필요하면 <SeoLink href="/tax/vat">부가세 계산기</SeoLink>를 이용해 보세요.
          모임 비용을 인원수로 나누려면 <SeoLink href="/daily/dutch">더치페이 계산기</SeoLink>가 빠릅니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
