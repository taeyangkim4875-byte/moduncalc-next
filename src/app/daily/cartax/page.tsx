import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
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

      <SeoSection title="배기량별 자동차세, 얼마나 차이 날까">
        <p>
          자동차세는 배기량에 따라 세율이 크게 달라집니다. 1,600cc를 넘는 순간 cc당 세액이 80원에서 200원으로 2.5배 뛰어요.
          그래서 1,598cc(아반떼급)와 1,998cc(쏘나타급)의 세금 차이가 상당합니다.
        </p>
        <SeoList>
          <li><strong>경차 (1,000cc)</strong> — 연 약 10.4만원 (지방교육세 포함)</li>
          <li><strong>소형차 (1,598cc)</strong> — 연 약 16.6만원</li>
          <li><strong>중형차 (1,998cc)</strong> — 연 약 52만원 (1,600cc 초과분 적용)</li>
          <li><strong>대형차 (3,342cc)</strong> — 연 약 87만원</li>
          <li><strong>전기차</strong> — 배기량 무관 연 13만원 고정</li>
        </SeoList>
        <p>
          중형차가 소형차보다 세금이 3배 이상 나오는 거 보면, 차 살 때 배기량 차이도 생각해야 해요.
          유류비까지 비교하려면 <SeoLink href="/daily/fuel">연비 계산기</SeoLink>를 활용하세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="자동차세 궁금증"
        items={[
          { q: '차를 중간에 팔면 세금은 어떻게 되나요?', a: '이전등록일 기준으로 일할 계산됩니다. 연납을 했다면 남은 기간만큼 환급받을 수 있어요. 환급은 별도 신청 없이 자동으로 처리됩니다.' },
          { q: '하이브리드 차도 자동차세 할인이 있나요?', a: '하이브리드 차량은 일반 내연기관과 동일하게 배기량 기준으로 과세됩니다. 별도 감면은 없지만, 취득세 감면 혜택은 있을 수 있으니 구매 시 확인하세요.' },
          { q: '자동차세를 안 내면 어떻게 되나요?', a: '납부 기한 초과 시 3%의 가산금이 붙고, 체납이 계속되면 번호판 영치, 자동차 압류까지 될 수 있습니다. 납부가 어려우면 분할 납부 신청이 가능합니다.' },
          { q: '중고차 샀는데 자동차세가 왜 이렇게 적게 나오나요?', a: '3년 이상 된 차량은 매년 5%씩 경감됩니다. 12년 이상이면 최대 50% 할인이 적용돼서 신차 때의 절반만 내요. 중고차의 숨은 장점 중 하나입니다.' },
          { q: '법인 차량도 자동차세를 내나요?', a: '네, 법인 명의 차량도 동일하게 자동차세가 부과됩니다. 다만 영업용 차량은 비영업용보다 세율이 훨씬 낮습니다. 택시(영업용)는 같은 배기량이어도 비영업용의 약 1/5 수준이에요.' },
        ]}
      />
    </PageLayout>; }
