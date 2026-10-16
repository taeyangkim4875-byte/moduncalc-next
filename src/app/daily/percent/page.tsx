import type { Metadata } from "next";
import { KO_OPEN_GRAPH } from "@/app/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import PercentCalc from "./PercentCalc";

export const metadata: Metadata = {
  title: "퍼센트 계산기 - 비율·변화율·할인율 계산",
  description: "100의 25%는? 80에서 120으로 변하면 몇 %? 비율, 변화율, 할인율, 역산까지 한번에 계산하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/percent" },
  openGraph: {
    ...KO_OPEN_GRAPH,
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

      <SeoSection title="올랐다가 같은 % 내리면 제자리가 아닙니다">
        <p>
          퍼센트 계산에서 가장 많이 틀리는 지점은 <strong>기준값이 바뀐다는 사실</strong>을
          놓치는 것입니다. 오를 때의 기준과 내릴 때의 기준이 다르기 때문에, 같은 비율로
          올랐다 내려도 원래 자리로 돌아오지 않습니다.
        </p>
        <SeoFormula>
          <div>30% 상승 후 30% 하락 → 1 × 1.3 × 0.7 = 0.91 (9% 손실)</div>
          <div>50% 하락 후 50% 상승 → 1 × 0.5 × 1.5 = 0.75 (25% 손실)</div>
          <div>50% 하락을 복구하려면 → 100% 상승이 필요</div>
        </SeoFormula>
        <p>
          하락은 더 큰 기준값에 적용되고 회복은 더 작은 기준값에 적용되므로, 손실 쪽이 항상
          더 무겁습니다. 주가가 반토막 났을 때 &ldquo;50%만 오르면 본전&rdquo;이 아니라
          <strong>두 배가 되어야</strong> 본전인 이유가 이것입니다.
        </p>
      </SeoSection>

      <SeoSection title="퍼센트를 평균 내면 틀리는 경우">
        <p>
          비율은 서로 기준이 다르면 <strong>단순 평균을 낼 수 없습니다</strong>.
          다음 두 상황이 대표적입니다.
        </p>
        <SeoList>
          <li>
            <strong>수익률의 평균</strong> — 1년차 +50%, 2년차 −50%면 단순 평균은 0%지만
            실제 자산은 0.75배로 25% 줄어 있습니다. 여러 해를 묶어 볼 때는 산술평균이 아니라
            곱해서 기간으로 제곱근을 취하는 연평균 복리수익률을 써야 맞습니다.
          </li>
          <li>
            <strong>비율의 가중치</strong> — A매장 전환율 10%(방문 100명), B매장 전환율 2%(방문 1,000명)의
            전체 전환율은 (10+2)÷2 = 6%가 아닙니다. 전환 수를 합쳐 (10+20)÷1,100 = 약 2.7%가 실제 값입니다.
            분모가 다르면 분자와 분모를 각각 더한 뒤 나눠야 합니다.
          </li>
        </SeoList>
        <p>
          할인율도 같은 이유로 더하면 안 됩니다. 20% 할인에 추가 10% 할인은 30%가 아니라
          <strong>28% 할인</strong>입니다. 두 번째 할인은 이미 깎인 금액에 붙기 때문입니다.
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
