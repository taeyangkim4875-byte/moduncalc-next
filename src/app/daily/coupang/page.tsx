import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import CoupangCalc from "./CoupangCalc";

export const metadata: Metadata = {
  title: "쿠팡 파트너스 수익 계산기 - 예상 수익 시뮬레이션",
  description: "클릭 수, 전환율, 평균 주문액으로 쿠팡 파트너스 예상 수익을 계산하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/coupang" },
  openGraph: {
    title: "쿠팡 파트너스 수익 계산기 - 예상 수익 시뮬레이션",
    description: "클릭 수, 전환율, 평균 주문액으로 쿠팡 파트너스 예상 수익을 계산하세요.",
    url: "https://moduncalc.com/daily/coupang",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="블로그 수익"
      title="쿠팡 파트너스 수익 계산기"
      description="클릭 수와 전환율로 쿠팡 파트너스 예상 수익을 시뮬레이션하세요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '쿠팡 파트너스', href: '/daily/coupang' }]} />
      <CalculatorJsonLd name="쿠팡 파트너스 수익 계산기" description="클릭 수, 전환율, 평균 주문액으로 쿠팡 파트너스 예상 수익을 계산하세요." url="https://moduncalc.com/daily/coupang" />
      <FaqJsonLd items={[
        { q: "쿠팡 파트너스 수수료는 언제 지급되나요?", a: "매월 말 정산 후 익월 25일경에 지급됩니다. 최소 출금 금액은 1만원입니다." },
        { q: "전환율 3%는 현실적인가요?", a: "블로그 품질과 상품 관련성에 따라 1~10%까지 다양합니다. 상품 리뷰 글은 5% 이상도 가능하며, 일반 배너는 1~2% 정도입니다." },
        { q: "쿠팡 파트너스와 애드센스를 동시에 할 수 있나요?", a: "네, 동시 운영이 가능합니다. 애드센스로 광고 수익을, 쿠팡 파트너스로 제휴 수익을 함께 올릴 수 있습니다." },
      ]} />
      <CoupangCalc />

      <SeoSection title="쿠팡 파트너스, 현실적인 수익은 얼마일까">
        <p>
          블로그에서 &quot;쿠팡 파트너스로 월 100만원&quot; 같은 글 많이 보셨죠? 솔직히 말하면,
          <strong>초보 블로거 기준 월 5~10만원이 현실적인 목표</strong>입니다.
          월 100만원 이상은 일 방문자 3,000명 이상 되는 블로그에서나 가능해요.
        </p>
        <SeoFormula>
          <div>일일 수익 = 일일 클릭 수 × 전환율 × 평균 주문액 × 수수료율(3%)</div>
          <div>월 수익 = 일일 수익 × 30</div>
          <div>예시) 100클릭 × 3% × 30,000원 × 3% = 2,700원/일 = 약 81,000원/월</div>
        </SeoFormula>
      </SeoSection>

      <SeoSection title="수익 높이는 현실적인 방법">
        <SeoList>
          <li><strong>고단가 상품 노리기</strong> — 가전, 전자기기, 유아용품 등 주문 단가 높은 카테고리가 유리</li>
          <li><strong>리뷰 글 쓰기</strong> — 상품 리뷰 글의 전환율은 5~10%, 일반 배너는 1~2%. 차이가 큽니다</li>
          <li><strong>24시간 쿠키 활용</strong> — 링크 클릭 후 24시간 내 구매하면 다른 상품이라도 수수료 발생</li>
          <li><strong>시즌 키워드 공략</strong> — 여름 선풍기, 겨울 난방기구 등 시즌 상품은 전환율이 2~3배 높음</li>
        </SeoList>
        <p>
          애드센스 수익도 함께 계산하고 싶으면 <SeoLink href="/daily/adsense">애드센스 수익 계산기</SeoLink>를 확인하세요.
          쿠팡 파트너스 + 애드센스 병행이 블로그 수익화의 기본 조합입니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="쿠팡 파트너스 궁금증"
        items={[
          { q: '쿠팡 파트너스 승인 조건이 있나요?', a: '네. 블로그나 웹사이트, SNS 채널이 필요합니다. 가입 후 링크를 생성하고, 실제 매출이 발생해야 활동이 유지됩니다. 사기성 트래픽이 감지되면 계정이 정지될 수 있습니다.' },
          { q: '수수료율 3%가 너무 낮은 거 아닌가요?', a: '3%가 기본이지만, 쿠팡의 강점은 전환율입니다. 쿠팡 로켓배송 신뢰도가 높아 다른 제휴 프로그램보다 실제 구매 전환이 잘 일어나요. 그리고 24시간 쿠키 덕분에 의외의 상품에서 수익이 발생하기도 합니다.' },
          { q: '쿠팡 파트너스 수익도 세금 신고해야 하나요?', a: '네. 기타소득 또는 사업소득으로 종합소득세 신고 대상입니다. 연 수익이 300만원 이하이면 기타소득으로 분리과세(8.8%)가 가능하고, 초과하면 종합과세됩니다.' },
        ]}
      />
    </PageLayout>
  );
}
