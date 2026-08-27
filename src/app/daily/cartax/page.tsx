import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList } from "@/components/SeoContent";
import CarTaxCalc from "./CarTaxCalc";
export const metadata: Metadata = { title: "자동차세 계산기 - 2026 배기량·연식별 자동차세 계산", description: "내 차 자동차세 얼마? 배기량·연식 입력하면 연간 세금 바로 계산. 연납 할인까지.", alternates: { canonical: "https://moduncalc.com/daily/cartax" },
  openGraph: {
    title: "자동차세 계산기 - 2026 배기량·연식별 자동차세 계산",
    description: "내 차 자동차세 얼마? 배기량·연식 입력하면 연간 세금 바로 계산. 연납 할인까지.",
    url: "https://moduncalc.com/daily/cartax",
  },};
export default function Page() { return <PageLayout eyebrow="생활" title="자동차세 계산기" description="배기량과 연식을 입력하면 연간 자동차세를 실시간으로 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '자동차세', href: '/daily/cartax' }]} /><CalculatorJsonLd name="자동차세 계산기" description="차량 배기량과 연식으로 연간 자동차세를 자동 계산합니다. 비영업용 승용차 기준. 경감률 반영." url="https://moduncalc.com/daily/cartax" /><FaqJsonLd items={[{q:"자동차세 연납 신청은 어떻게 하나요?",a:"위택스(wetax.go.kr) 또는 관할 구청 세무과에서 신청할 수 있습니다. 1월에 신청하면 약 4.58% 할인됩니다."},{q:"차량을 중간에 팔면 자동차세는?",a:"이전등록일 기준으로 소유 기간에 따라 일할 계산됩니다. 연납 시 남은 기간 세액이 환급됩니다."},{q:"전기차 자동차세는 얼마인가요?",a:"비영업용 전기차의 자동차세는 연 10만원(지방교육세 3만원 별도)으로 고정되어 있습니다."}]} /><CarTaxCalc />

      <SeoSection title="자동차세 연납 신청, 1월에 해야 가장 이득">
        <p>
          자동차세는 매년 6월, 12월에 나뉘어 나옵니다. 근데 <strong>1월에 연납 신청하면 약 4.58% 할인</strong>받을 수 있어요.
          2,000cc 차량 기준 연간 52만원인데, 연납하면 약 2만 4천원을 아끼는 셈입니다.
        </p>
        <SeoList>
          <li><strong>1월 연납</strong> — 약 4.58% 할인 (2~12월분 5% 감면)</li>
          <li><strong>3월 연납</strong> — 약 3.75% 할인</li>
          <li><strong>6월 연납</strong> — 약 2.52% 할인</li>
          <li><strong>9월 연납</strong> — 약 1.25% 할인</li>
        </SeoList>
        <p>
          신청은 위택스(wetax.go.kr)에서 온라인으로 가능합니다. 한 번 신청하면 매년 자동 적용돼서 까먹을 일도 없어요.
        </p>
      </SeoSection>

      <SeoSection title="자동차세 계산 방법">
        <SeoFormula>
          <div>자동차세 = 배기량(cc) × cc당 세액 × 경감률</div>
          <div>1,600cc 이하: cc당 80원 / 1,600cc 초과: cc당 200원</div>
          <div>지방교육세: 자동차세의 30% 별도 부과</div>
        </SeoFormula>
        <p>
          3년 이상 된 차는 매년 5%씩 경감되어 최대 50%까지 줄어듭니다.
          그래서 10년 넘은 차는 자동차세가 처음의 절반밖에 안 나와요.
          전기차는 배기량이 없어서 연 10만원 고정(+지방교육세 3만원)입니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="자동차세 궁금증"
        items={[
          { q: '차를 중간에 팔면 세금은 어떻게 되나요?', a: '이전등록일 기준으로 일할 계산됩니다. 연납을 했다면 남은 기간만큼 환급받을 수 있어요. 환급은 별도 신청 없이 자동으로 처리됩니다.' },
          { q: '하이브리드 차도 자동차세 할인이 있나요?', a: '하이브리드 차량은 일반 내연기관과 동일하게 배기량 기준으로 과세됩니다. 별도 감면은 없지만, 취득세 감면 혜택은 있을 수 있으니 구매 시 확인하세요.' },
          { q: '자동차세를 안 내면 어떻게 되나요?', a: '납부 기한 초과 시 3%의 가산금이 붙고, 체납이 계속되면 번호판 영치, 자동차 압류까지 될 수 있습니다. 납부가 어려우면 분할 납부 신청이 가능합니다.' },
        ]}
      />
    </PageLayout>; }
