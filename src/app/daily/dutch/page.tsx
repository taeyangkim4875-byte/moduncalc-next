import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import DutchCalc from "./DutchCalc";

export const metadata: Metadata = {
  title: "더치페이 계산기 - N분의1 · 팁 포함 정산",
  description: "모임 총 금액과 인원수를 입력하면 1인당 금액을 바로 계산. 팁 비율 적용, 10원·100원 단위 올림까지.",
  alternates: { canonical: "https://moduncalc.com/daily/dutch" },
  openGraph: {
    title: "더치페이 계산기 - N분의1 · 팁 포함 정산",
    description: "모임 총 금액과 인원수를 입력하면 1인당 금액을 바로 계산. 팁 비율 적용, 10원·100원 단위 올림까지.",
    url: "https://moduncalc.com/daily/dutch",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="모임 계산" title="더치페이 계산기" description="N분의1 금액과 팁을 계산해요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '더치페이', href: '/daily/dutch' }]} />
      <CalculatorJsonLd name="더치페이 계산기" description="N분의1 금액과 팁을 빠르게 계산하세요." url="https://moduncalc.com/daily/dutch" />
      <FaqJsonLd items={[{q:"나누어떨어지지 않으면 어떻게 하나요?",a:"보통 첫 번째 사람이 나머지를 부담하거나, 10원 단위로 올림합니다."},{q:"해외에서 팁은 꼭 줘야 하나요?",a:"미국은 15~20% 팁이 관례이고, 유럽은 5~10% 정도가 일반적입니다. 한국·일본은 팁 문화가 없습니다."}]} />
      <DutchCalc />

      <SeoSection title="더치페이 계산 방법">
        <p>
          더치페이(Dutch pay)는 각자 자기 몫을 내는 정산 방식입니다.
          가장 간단한 계산은 <strong>총 금액 ÷ 인원수</strong>이지만,
          실제로는 나누어떨어지지 않는 경우가 대부분입니다.
        </p>
        <SeoFormula>
          <div>1인당 금액 = 총 금액 ÷ 인원수</div>
          <div>팁 포함 = 총 금액 × (1 + 팁 비율) ÷ 인원수</div>
          <div>올림 정산 = 1인당 금액을 100원 또는 1,000원 단위로 올림</div>
        </SeoFormula>
        <p>
          예를 들어 87,000원을 4명이 나누면 21,750원인데,
          실제로는 1,000원 단위 올림해서 22,000원씩 내고
          나머지 1,000원은 한 명이 덜 내는 식으로 정산하는 게 보통입니다.
        </p>
      </SeoSection>

      <SeoSection title="나라별 팁 문화 비교">
        <p>해외여행 시 알아두면 좋은 팁 기준입니다.</p>
        <SeoList>
          <li><strong>미국·캐나다</strong> — 식당 15~20%, 바 1~2달러/잔, 택시 15%. 팁을 안 주면 실례.</li>
          <li><strong>유럽</strong> — 서유럽 5~10% 정도, 동유럽은 10~15%. 서비스료 포함이면 생략 가능.</li>
          <li><strong>일본·한국</strong> — 팁 문화 없음. 오히려 팁을 주면 어색하게 느낄 수 있음.</li>
          <li><strong>동남아</strong> — 관광지는 5~10% 정도. 로컬 식당은 필수 아님.</li>
        </SeoList>
        <p>
          해외 여행 경비를 미리 계산하고 싶다면 <SeoLink href="/daily/travel">여행 경비 계산기</SeoLink>를 함께 이용해 보세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="더치페이, 이런 점도 궁금하실 거예요"
        items={[
          { q: '카드 결제를 여러 장으로 나눠서 해도 되나요?', a: '대부분의 식당에서 카드 분할 결제가 가능합니다. 다만 일부 가맹점에서는 분할 결제를 거부하는 경우도 있으니, 미리 확인하는 게 좋습니다. 최근에는 카카오페이나 토스 같은 간편결제 송금이 더 편리합니다.' },
          { q: '술 안 마신 사람은 어떻게 정산하나요?', a: '음식값과 술값을 분리해서 음식값만 N분의1 하고, 술값은 마신 사람끼리 나누는 방식이 공평합니다. 차등 정산이 필요하면 모임 정산 계산기를 이용해 보세요.' },
          { q: '더치페이 대신 쓸 수 있는 한국어 표현이 있나요?', a: '각자 내기, 개별 결제, N분의1 등이 있습니다. "더치페이"는 네덜란드와 직접적 관련이 없는 콩글리시입니다. 영어로는 split the bill이라고 합니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          메뉴별 차등 정산이 필요하면 <SeoLink href="/daily/tip-split">모임 정산 계산기</SeoLink>가 편하고,
          할인 쿠폰 적용가를 먼저 구하려면 <SeoLink href="/daily/discount">할인가 계산기</SeoLink>를 이용해 보세요.
          비율 계산이 필요하면 <SeoLink href="/daily/percent">퍼센트 계산기</SeoLink>도 유용합니다.
        </p>
      </SeoSection>

      <SeoSection title="간편송금 시대의 정산 요령">
        <p>
          예전에는 현금을 걷어 나눴지만 요즘은 한 명이 카드로 결제하고 나머지가 송금하는 방식이 일반적입니다.
          이때 정산이 꼬이는 지점은 대부분 <strong>누가 얼마를 보냈는지 추적이 안 되는 것</strong>입니다.
        </p>
        <SeoList>
          <li><strong>결제 직후 바로 금액을 공유하세요.</strong> 하루만 지나도 &ldquo;이미 보냈다&rdquo;는 사람이 생깁니다.</li>
          <li><strong>1원 단위는 올림으로 정리하세요.</strong> 87,000원을 4명이 나누면 21,750원인데, 22,000원씩 받고 결제자가 1,000원 덜 내는 방식이 깔끔합니다.</li>
          <li><strong>메모를 남기세요.</strong> 송금할 때 &ldquo;3/15 회식&rdquo;처럼 적어두면 나중에 확인이 쉽습니다.</li>
        </SeoList>
        <p>
          술을 안 마신 사람이 있거나 메뉴 가격이 크게 다르면 균등 분배가 불공정해집니다.
          이런 경우에는 <SeoLink href="/daily/tip-split">모임 정산 계산기</SeoLink>의 차등 분배 모드를 쓰면
          각자 먹은 만큼만 나눠 계산할 수 있습니다.
        </p>
      </SeoSection>

      <SeoSection title="회식비와 경조사비는 조금 다릅니다">
        <p>
          회사 회식은 법인카드로 결제하는 경우가 많아 개인 정산이 필요 없지만,
          팀 자체 모임이나 부서 회비로 운영되는 경우에는 정산이 필요합니다.
          이때는 <strong>직급별 차등 부담</strong>을 적용하는 관행이 있는 곳도 있으므로
          모임 전에 기준을 정해두는 편이 뒤탈이 없습니다.
        </p>
        <p>
          여러 번 모이는 정기 모임이라면 회비를 미리 걷어 운영하고
          잔액을 공개하는 방식이 정산 스트레스를 가장 크게 줄여줍니다.
          한 번에 나가는 금액이 크다면 <SeoLink href="/daily/discount">할인가 계산기</SeoLink>로 쿠폰 적용가를 먼저 확인해 보세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
