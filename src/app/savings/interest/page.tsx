import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import InterestCalc from "./InterestCalc";

export const metadata: Metadata = {
  title: "적금 이자 계산기 - 예금·적금 만기 수령액",
  description: "적금·예금 만기 수령액을 자동 계산합니다. 월 납입액, 이자율, 기간, 이자과세를 입력하면 세후 수령액을 바로 확인하세요.",
  alternates: { canonical: "https://moduncalc.com/savings/interest" },
  openGraph: { title: "적금·예금 이자 계산기 - 만기 수령액 자동 계산 (2026)", description: "월 납입액, 이자율, 기간 입력하면 세후 만기 수령액을 바로 계산. 단리·복리, 일반과세·비과세 지원.", url: "https://moduncalc.com/savings/interest" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 이자 계산" title="적금·예금 이자 계산기" description="적금·예금 만기 시 세후 수령액을 바로 계산해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '적금', href: '/savings' }, { name: '적금 이자', href: '/savings/interest' }]} />
      <CalculatorJsonLd name="적금 이자 계산기" description="적금·예금 만기 수령액을 자동 계산합니다. 월 납입액, 이자율, 기간, 이자과세 적용." url="https://moduncalc.com/savings/interest" />
      <FaqJsonLd items={[{q:"단리와 복리의 차이는 무엇인가요?",a:"단리는 원금에 대해서만 이자를 계산하고, 복리는 이자에 대한 이자까지 계산합니다. 일반적인 은행 적금·예금은 단리로 계산됩니다."},{q:"비과세 혜택은 누가 받을 수 있나요?",a:"비과세종합저축은 만 65세 이상, 장애인, 국가유공자 등이 가입할 수 있으며, 1인당 5,000만원 한도 내에서 이자소득세가 면제됩니다."},{q:"적금과 예금의 차이는 무엇인가요?",a:"적금은 매달 일정 금액을 납입하는 방식이고, 예금은 목돈을 한 번에 맡기는 방식입니다. 같은 금리라면 예금이 이자가 더 많습니다."}]} />
      <InterestCalc />

      <SeoSection title="적금 이자가 생각보다 적은 이유">
        <p>
          연 4% 적금에 매달 100만원씩 1년을 넣으면 원금 1,200만원에 이자 48만원을 기대하기 쉽지만,
          실제 세전 이자는 <strong>26만원</strong>입니다. 은행 적금은 <strong>월 단리</strong> 방식이라
          납입한 돈마다 <strong>예치된 개월 수만큼만</strong> 이자가 붙기 때문입니다.
        </p>
        <SeoList>
          <li>첫 달에 넣은 100만원은 12개월치 이자를 받습니다.</li>
          <li>둘째 달에 넣은 돈은 11개월치, 셋째 달은 10개월치···</li>
          <li>마지막 달에 넣은 돈은 1개월치 이자만 받습니다.</li>
        </SeoList>
        <p>
          즉 표시된 금리는 &lsquo;평균 약 6.5개월 예치&rsquo;에 적용되는 셈이라,
          체감 수익률은 표면 금리의 <strong>절반가량</strong>이 됩니다.
          같은 금리라면 목돈을 한 번에 맡기는 예금이 적금보다 이자가 훨씬 많은 이유이기도 합니다.
        </p>
      </SeoSection>

      <SeoSection title="적금·예금 이자 계산 공식">
        <p>이 계산기는 은행권 표준인 월 단리 방식으로 계산합니다.</p>
        <SeoFormula>
          <div><strong>적금</strong> 세전 이자 = 월납입액 × (연이율 ÷ 12) × (n × (n+1) ÷ 2)</div>
          <div><strong>예금</strong> 세전 이자 = 원금 × 연이율 × (n ÷ 12)</div>
          <div>이자소득세 = 세전 이자 × 세율(일반 15.4% · 세금우대 9.5% · 비과세 0%)</div>
          <div>만기 수령액 = 원금 합계 + (세전 이자 − 이자소득세)</div>
        </SeoFormula>
        <p>
          이자소득세 <strong>15.4%</strong>는 소득세 14%에 지방소득세 1.4%를 더한 값입니다.
          만기 때 이자에서 원천징수된 뒤 입금되므로, 통장에 찍히는 금액은 항상 세전 이자보다 적습니다.
          목돈을 굴릴 때 복리 효과가 얼마나 커지는지는{' '}
          <SeoLink href="/daily/compound">복리 계산기</SeoLink>에서 비교해 볼 수 있습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="적금 가입 전에 이런 점도 확인하세요"
        items={[
          { q: '비과세와 세금우대는 누가 받을 수 있나요?', a: '비과세종합저축은 만 65세 이상, 장애인, 국가유공자, 기초생활수급자 등이 대상이며 1인당 5,000만원 한도로 이자소득세가 전액 면제됩니다. 세금우대(9.5%)는 새마을금고·신협·농협 등 상호금융의 조합원 예탁금에 적용되며, 1인당 3,000만원 한도로 소득세 없이 농어촌특별세 1.4%만 부담합니다. 같은 금리라면 세금우대 상품의 실수령 이자가 약 7% 더 많습니다.' },
          { q: '금리가 높은 특판 적금은 무조건 좋은가요?', a: '표면 금리만 보면 안 됩니다. 우대금리 조건(급여이체, 카드 실적, 마케팅 동의 등)을 모두 충족해야 최고 금리를 받을 수 있고, 월 납입 한도가 20만~50만원으로 낮은 경우가 많습니다. 연 10% 적금이라도 월 20만원 한도라면 1년 세후 이자는 약 11만원에 그칩니다. 금리보다 총 이자 금액으로 비교하세요.' },
          { q: '중도해지하면 이자는 어떻게 되나요?', a: '약정 금리가 아닌 중도해지 이율이 적용되는데, 보통 연 0.1~1% 수준으로 매우 낮습니다. 만기를 며칠 앞두고 해지해도 마찬가지입니다. 급전이 필요하다면 해지 대신 예적금담보대출을 알아보세요. 통상 약정 금리에 1~1.5%p를 더한 금리로 최대 95%까지 빌릴 수 있어 해지보다 유리한 경우가 많습니다.' },
          { q: '예금자보호는 얼마까지 되나요?', a: '금융기관 한 곳당 원금과 이자를 합쳐 1인 1억원까지 보호됩니다(2025년 9월 상향). 여러 은행에 나눠 예치하면 각각 보호받을 수 있습니다. 새마을금고와 신협은 예금보험공사가 아닌 자체 기금으로 같은 한도를 보호합니다.' },
        ]}
      />

      <SeoSection title="목적에 맞는 적금 상품 비교하기">
        <p>
          목돈 마련이 목표라면 정부 지원 상품을 먼저 검토하는 편이 유리합니다.
          <SeoLink href="/savings/doyak">청년도약계좌 계산기</SeoLink>와{' '}
          <SeoLink href="/savings/mirae">청년미래적금 계산기</SeoLink>로 정부기여금까지 포함한 수령액을 확인해 보고,
          두 상품의 조건 차이는 <SeoLink href="/guide/doyak-vs-mirae">도약 vs 미래적금 비교</SeoLink>에 정리해 두었습니다.
          은퇴 자금 목표를 세우는 중이라면 <SeoLink href="/guide/fire-retirement">FIRE 조기 은퇴 가이드</SeoLink>도 참고하세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
