import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import DsrCalc from "./DsrCalc";

export const metadata: Metadata = {
  title: "DSR 계산기 - 대출 한도 확인 · 총부채원리금상환비율 (2026)",
  description: "내 DSR은 몇 %? 대출 얼마까지 가능할까? 연소득·기존 대출 입력하면 한도 바로 확인.",
  alternates: { canonical: "https://moduncalc.com/loan/dsr" },
  openGraph: {
    title: "DSR 계산기 - 대출 한도 확인 · 총부채원리금상환비율 (2026)",
    description: "내 DSR은 몇 %? 대출 얼마까지 가능할까? 연소득·기존 대출 입력하면 한도 바로 확인.",
    url: "https://moduncalc.com/loan/dsr",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="대출" title="DSR 계산기" description="연소득과 대출 정보로 DSR을 계산하고 대출 가능 한도를 확인하세요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '대출', href: '/loan' }, { name: 'DSR', href: '/loan/dsr' }]} />
      <CalculatorJsonLd name="DSR 계산기" description="연소득과 기존 대출로 DSR을 계산하고 대출 가능 한도를 확인하세요. 40% / 50% / 60% 규제 기준 반영." url="https://moduncalc.com/loan/dsr" />
      <FaqJsonLd items={[{q:"DSR과 DTI의 차이는?",a:"DTI는 주담대의 원리금 + 기타 대출의 이자만 합산하지만, DSR은 모든 대출의 원리금을 합산합니다. DSR이 더 엄격한 기준입니다."},{q:"전세자금대출도 DSR에 포함되나요?",a:"네, 전세자금대출의 원리금 상환액도 DSR 계산에 포함됩니다. 다만 일부 정책 대출은 예외가 있을 수 있습니다."},{q:"카드론·마이너스통장도 포함되나요?",a:"네, 카드론은 만기 일시상환으로 간주해 원리금을 계산하며, 마이너스통장 한도도 DSR에 포함됩니다."}]} />
      <DsrCalc />

      <SeoSection title="DSR이 대출 한도를 결정하는 방식">
        <p>
          DSR(총부채원리금상환비율)은 <strong>연소득 대비 모든 대출의 연간 원리금 상환액 비율</strong>입니다.
          주택담보대출뿐 아니라 신용대출, 자동차 할부, 카드론, 마이너스통장, 학자금대출까지
          거의 모든 빚의 <strong>원금과 이자를 함께</strong> 계산에 넣기 때문에 가장 강력한 규제로 작동합니다.
        </p>
        <SeoList>
          <li><strong>DSR 40%</strong> — 은행권에 적용되는 기본 기준선입니다. 이 선을 넘으면 대출이 거절되거나 한도가 깎입니다.</li>
          <li><strong>DSR 50%</strong> — 저축은행·상호금융 등 제2금융권에 적용되는 기준입니다. 대신 금리가 높습니다.</li>
          <li><strong>DSR 60%</strong> — 일부 예외 상품이나 특례 대출에서 참고하는 상한선입니다.</li>
        </SeoList>
        <p>
          LTV·DTI·DSR 세 규제가 동시에 적용될 때 <strong>가장 낮게 계산된 금액</strong>이 실제 한도가 됩니다.
          담보 가치가 충분해도 소득이 뒷받침되지 않으면 원하는 금액을 빌릴 수 없는 이유입니다.
        </p>
      </SeoSection>

      <SeoSection title="DSR 계산 공식">
        <SeoFormula>
          <div>DSR(%) = (기존 대출 연간 원리금 + 신규 대출 연간 원리금) ÷ 연소득 × 100</div>
          <div>신규 대출 연간 원리금 = 월 상환액 × 12</div>
          <div>대출 가능 한도 ← (연소득 × DSR 한도 − 기존 연간 원리금)에서 역산</div>
        </SeoFormula>
        <p>
          예를 들어 연소득 5,000만원, 기존 대출 연간 원리금 500만원인 사람이 DSR 40% 안에서
          쓸 수 있는 신규 대출의 연간 원리금은 <strong>2,000만원 − 500만원 = 1,500만원</strong>,
          즉 월 125만원입니다. 여기에 금리 4%·30년 원리금균등을 적용하면 약 2억 6,000만원까지 가능합니다.
        </p>
        <p>
          중요한 점은 <strong>실제 대출 기간이 아닌 규제상 만기</strong>로 계산된다는 것입니다.
          신용대출은 실제 만기와 무관하게 통상 5년, 마이너스통장은 한도 전액을 빌린 것으로 보고 계산합니다.
          그래서 쓰지 않는 마이너스통장만 정리해도 DSR이 눈에 띄게 내려갑니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="DSR, 이런 점도 확인하세요"
        items={[
          { q: 'DSR을 낮추는 가장 빠른 방법은 무엇인가요?', a: '첫째, 쓰지 않는 마이너스통장을 해지하거나 한도를 줄이는 것입니다. 잔액이 0원이어도 한도 전액이 대출로 잡히기 때문에 효과가 즉각적입니다. 둘째, 금리가 높고 만기가 짧은 카드론·신용대출을 먼저 상환하면 연간 원리금이 크게 줄어듭니다. 셋째, 신규 대출의 만기를 늘리면 연간 원리금이 줄어 DSR이 내려갑니다.' },
          { q: '스트레스 DSR은 무엇인가요?', a: '변동금리 대출을 심사할 때 실제 금리에 일정 폭의 가산금리(스트레스 금리)를 더해 DSR을 계산하는 제도입니다. 향후 금리가 올라도 상환 능력이 유지되는지 보기 위한 장치로, 같은 소득이어도 한도가 줄어듭니다. 고정금리나 혼합형 상품을 택하면 가산 폭이 작게 적용되어 한도가 덜 깎입니다.' },
          { q: '소득 증빙은 무엇으로 하나요?', a: '근로자는 원천징수영수증, 소득금액증명원, 건강보험료 납부확인서 등을 사용합니다. 사업자는 종합소득세 신고서상 소득금액이 기준입니다. 프리랜서나 신설 사업자처럼 증빙이 어려운 경우 신용카드 사용액이나 국민연금 납부액으로 소득을 추정하는 인정소득·신고소득 방식이 쓰이지만, 실제 소득보다 낮게 잡히는 경우가 많습니다.' },
          { q: 'DSR에서 제외되는 대출도 있나요?', a: '서민금융 상품(햇살론 등), 300만원 이하 소액 신용대출, 전세자금대출의 원금(이자는 포함), 중도금·이주비 대출 등은 산정에서 제외되거나 일부만 반영됩니다. 다만 예외 범위는 정책에 따라 자주 바뀌므로 실행 시점에 금융기관에 직접 확인하는 것이 정확합니다.' },
        ]}
      />

      <SeoSection title="한도를 확인했다면 다음 단계">
        <p>
          가능 한도를 확인했다면 <SeoLink href="/loan">대출 이자 계산기</SeoLink>에서
          상환 방식별 월 납입액과 총 이자를 비교해 보세요. 원리금균등과 원금균등의 차이는{' '}
          <SeoLink href="/guide/loan-comparison">원리금균등 vs 원금균등 비교 가이드</SeoLink>에 정리되어 있습니다.
          주택 구입이라면 <SeoLink href="/realestate/acqtax">취득세 계산기</SeoLink>로 부대비용을,
          자동차 구입이라면 <SeoLink href="/loan/car">자동차 할부 계산기</SeoLink>를 함께 확인하는 것이 좋습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
