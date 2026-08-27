import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import DoyakCalculator from "./DoyakCalculator";

export const metadata: Metadata = {
  title: "청년도약계좌 계산기 - 지금까지 모은 돈 · 만기 수령액 · 특별중도해지",
  description: "내 도약계좌에 지금까지 얼마 모였을까? 원금+이자+정부기여금 적립액 바로 확인. 변동금리 반영, 특별중도해지 사유 안내.",
  alternates: { canonical: "https://moduncalc.com/savings/doyak" },
  openGraph: { title: "청년도약계좌 계산기 - 지금까지 모은 돈 · 특별중도해지 (2026)", description: "도약계좌 적립액 조회 + 만기 수령액 + 특별중도해지 9가지 사유. 2026 변동금리 반영.", url: "https://moduncalc.com/savings/doyak" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="가입자가 직접 만든 계산기" title="청년도약계좌 계산기" description="은행 앱에서 안 보여주는 이자+기여금까지. 해지할지 유지할지 판단하세요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '적금', href: '/savings' }, { name: '청년도약계좌', href: '/savings/doyak' }]} />
      <CalculatorJsonLd name="청년도약계좌 계산기" description="청년도약계좌 5년 만기 실수령액을 계산하세요. 소득 구간별 정부 기여금, 은행별 우대금리 적용." url="https://moduncalc.com/savings/doyak" />
      <FaqJsonLd items={[{q:"청년도약계좌 지금까지 얼마 모았는지 어떻게 확인하나요?",a:"이 계산기에서 경과 개월 수를 입력하면 지금까지의 원금+이자+정부기여금 적립액을 확인할 수 있습니다. 3년차 변동금리 전환도 자동 반영됩니다."},{q:"3년차 이후 변동금리는 얼마인가요?",a:"KB국민·신한·우리은행 기준 연 3.0%로, 고정금리(4.5%) 대비 1.5%p 낮아집니다. 우대금리 1.5%p를 합해도 최고 4.5%입니다."},{q:"특별중도해지 사유는 무엇인가요?",a:"혼인, 출산, 생애최초 주택구입, 퇴직, 폐업, 3개월 이상 장기치료, 천재지변, 사망·해외이주, 청년미래적금 환승이 해당됩니다. 특별중도해지 시 정부기여금과 비과세 혜택이 유지됩니다."},{q:"일반 중도해지하면 어떻게 되나요?",a:"정부 기여금 전액 반환 + 이자소득 과세(15.4%). 원금과 이자는 돌려받지만 혜택이 사라집니다."},{q:"우대금리는 언제부터 적용되나요?",a:"소급 적용이 안 됩니다. 조건을 충족한 시점부터 적용되며, 일부 은행은 만기 시 소급 적용합니다."}]} />
      <DoyakCalculator />

      <SeoSection title="도약계좌 3년차, 변동금리 전환 후 현실">
        <p>
          2024년 6월에 가입해서 지금 37개월째 납입 중인데, 솔직히 3년차부터 금리가 확 떨어지는 게 체감됩니다.
          처음 2년은 고정금리 4.5%였는데, 37개월차부터 변동금리로 전환되면서 연 3.0%로 내려갔어요.
          우대금리 1.5%를 더해도 4.5%가 최고인데, 우대 조건 다 채우기가 쉽지 않습니다.
        </p>
        <p>
          이쯤 되면 &quot;해지하고 미래적금으로 갈아탈까&quot; 고민하는 사람이 많은데,
          일반 해지를 하면 정부기여금 전액 반환에 이자소득세(15.4%)까지 떼이니까 손해가 커요.
          특별중도해지 사유에 해당하면 기여금과 비과세 혜택이 유지되므로, 본인 상황을 먼저 확인하세요.
        </p>
        <p>
          만기까지 유지하면 5년간 원금 최대 4,200만원 + 이자 + 정부기여금으로
          총 4,600만원 이상을 비과세로 받을 수 있습니다.
          남은 2년을 버틸 수 있는 상황이라면 유지하는 게 유리한 경우가 대부분이에요.
        </p>
      </SeoSection>

      <SeoFaq
        title="청년도약계좌 실전 Q&A"
        items={[
          { q: '변동금리가 더 내려갈 수도 있나요?', a: '네. 변동금리는 기준금리에 연동되므로 한국은행 기준금리가 내리면 같이 떨어집니다. 반대로 금리가 오르면 올라갈 수도 있어요. 은행별 변동금리 산정 기준이 조금씩 다릅니다.' },
          { q: '납입을 몇 달 쉬어도 계좌가 유지되나요?', a: '6개월 연속 미납하면 계좌가 해지될 수 있습니다. 형편이 어려우면 최소 1만원이라도 넣어서 연속 미납을 피하세요. 납입 금액은 월 1천원~70만원까지 자유롭게 조절 가능해요.' },
          { q: '결혼하면 특별중도해지가 되나요?', a: '네. 혼인은 특별중도해지 9가지 사유 중 하나입니다. 혼인신고일 전후 2년 이내에 신청하면 정부기여금과 비과세 혜택을 유지한 채 해지할 수 있어요.' },
        ]}
      />
    </PageLayout>
  );
}
