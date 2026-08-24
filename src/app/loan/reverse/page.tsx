import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoLink } from "@/components/SeoContent";
import LoanReverse from "./LoanReverse";

export const metadata: Metadata = {
  title: "월 상환액으로 대출 한도 역산 - 대출 역방향 계산기",
  description: "월 납입 가능 금액으로 대출 한도를 역산합니다. 원리금균등 기준 최대 대출 금액을 바로 확인.",
  alternates: { canonical: "https://moduncalc.com/loan/reverse" },
  openGraph: { title: "월 상환액으로 대출 한도 역산하기 (2026)", description: "내가 낼 수 있는 월 상환액으로 대출 가능 금액을 역산. 금리·기간 조건별 비교.", url: "https://moduncalc.com/loan/reverse" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="역방향 계산" title="월 상환액 → 대출 한도" description="매달 낼 수 있는 금액으로 빌릴 수 있는 최대 대출 금액을 역산해 드려요.">
      <CalculatorJsonLd name="대출 한도 역산 계산기" description="월 상환 가능 금액, 금리, 기간을 입력하면 원리금균등 기준 최대 대출 한도를 역산합니다." url="https://moduncalc.com/loan/reverse" />
      <FaqJsonLd items={[{q:"월 100만원이면 얼마까지 빌릴 수 있나요?",a:"금리와 기간에 따라 다릅니다. 연 3.5%, 30년 기준 약 2억 2천만원까지 가능합니다."},{q:"거치기간이 있으면 한도가 달라지나요?",a:"거치기간은 상환 기간을 줄이므로 같은 월 납입액 대비 대출 한도가 줄어듭니다."}]} />
      <LoanReverse />

      <SeoSection title="월 상환액으로 대출 한도를 역산하는 방법">
        <p>
          보통 대출 계산기는 &quot;얼마를 빌리면 월 얼마?&quot;를 알려주지만,
          실제로 궁금한 건 <strong>&quot;월 100만원 낼 수 있으면 최대 얼마까지?&quot;</strong>입니다.
          이 계산기는 그 질문에 바로 답합니다.
        </p>
        <SeoFormula>
          <div><strong>원리금균등 역산 공식</strong></div>
          <div>대출 한도 P = M × ((1+r)ⁿ − 1) ÷ (r × (1+r)ⁿ)</div>
          <div>M = 월 상환 가능액, r = 월이자율, n = 상환 개월 수</div>
        </SeoFormula>
        <p>
          같은 월 납입액이라도 금리가 1%p 내려가면 대출 한도가 수천만원 올라갑니다.
          여러 금리·기간 조합을 넣어보면서 가장 유리한 조건을 찾아보세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="대출 한도 역산 관련 질문"
        items={[
          { q: '이 계산 결과대로 대출받을 수 있나요?', a: '이 결과는 원리금균등 상환 기준 산술적 한도입니다. 실제 대출 한도는 DSR, LTV, DTI 등 금융 규제와 신용점수에 따라 결정됩니다. DSR 계산기로 규제 한도도 확인해 보세요.' },
          { q: '거치기간을 두면 한도가 줄어드는 이유는?', a: '거치기간만큼 원금 상환 기간이 줄어들기 때문입니다. 같은 월 납입액으로 더 짧은 기간에 원금을 갚아야 하므로 빌릴 수 있는 금액이 줄어듭니다.' },
        ]}
      />

      <SeoSection title="함께 확인하면 좋은 계산기">
        <p>
          역산 결과를 확인했다면 <SeoLink href="/loan">대출 이자 계산기</SeoLink>에서 상환 방식별 상세 비교도 해보세요.
          실제 대출 가능 금액은 <SeoLink href="/loan/dsr">DSR 계산기</SeoLink>로 확인할 수 있고,
          주택 구입이라면 <SeoLink href="/realestate/acqtax">취득세 계산기</SeoLink>로 부대비용까지 잡아두세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
