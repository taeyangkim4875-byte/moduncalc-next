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

      <SeoSection title="수익 구조를 결정하는 네 가지 숫자">
        <p>
          제휴 마케팅 수익은 결국 <strong>방문자 → 클릭 → 구매 → 수수료</strong>의 네 단계를 거칩니다.
          어느 한 단계가 0이면 전체가 0이 되고, 각 단계를 조금씩 개선하면 결과는 곱으로 늘어납니다.
        </p>
        <SeoFormula>
          <div>월 수익 = 일 클릭 수 × 전환율 × 평균 주문금액 × 수수료율 × 30</div>
          <div>예: 100클릭 × 3% × 30,000원 × 3% × 30일 = 81,000원</div>
        </SeoFormula>
        <p>
          위 예시에서 전환율만 3%에서 5%로 올리면 월 수익은 81,000원에서 135,000원이 됩니다.
          클릭 수를 늘리는 것보다 <strong>전환율을 올리는 편이 훨씬 효율적</strong>인 경우가 많습니다.
          &ldquo;아무 상품이나 많이 거는 것&rdquo;보다 &ldquo;글의 맥락에 맞는 상품을 정확히 거는 것&rdquo;이 전환율을 올립니다.
        </p>
      </SeoSection>

      <SeoSection title="놓치기 쉬운 운영 요건">
        <SeoList>
          <li>
            <strong>대가성 문구는 의무입니다.</strong> 공정거래위원회의 추천·보증 심사지침에 따라
            제휴 링크가 포함된 콘텐츠에는 &ldquo;이 포스팅은 쿠팡 파트너스 활동의 일환으로,
            이에 따른 일정액의 수수료를 제공받습니다&rdquo;와 같은 문구를 <strong>본문에서 잘 보이는 위치</strong>에 표시해야 합니다.
            글 맨 아래 흐린 글씨로 적어두는 것은 요건을 충족하지 못할 수 있습니다.
          </li>
          <li>
            <strong>수수료율은 카테고리마다 다릅니다.</strong> 상품군에 따라 요율이 달라지고 정책에 따라 변경될 수 있으므로,
            계산할 때는 파트너스 관리자 화면에서 해당 카테고리의 현재 요율을 확인해 넣으세요.
          </li>
          <li>
            <strong>본인 구매는 수익으로 인정되지 않습니다.</strong> 자기 링크로 직접 구매하는 행위는 정책 위반으로
            수익 취소나 계정 정지 사유가 됩니다.
          </li>
          <li>
            <strong>취소·반품분은 차감됩니다.</strong> 주문 시점에 잡힌 예상 수익이 그대로 지급되지 않습니다.
            반품률이 높은 카테고리는 실제 정산액이 예상보다 낮게 나옵니다.
          </li>
        </SeoList>
      </SeoSection>

      <SeoSection title="수익이 생기면 세금은 어떻게 되나">
        <p>
          제휴 수익은 대체로 <strong>사업소득</strong>으로 분류됩니다.
          지급 시 원천징수(지방소득세 포함 3.3%)가 이루어지는 경우가 일반적이고,
          다음 해 <strong>5월 종합소득세 신고</strong> 때 다른 소득과 합산해 정산합니다.
        </p>
        <p>
          직장에 다니면서 부수입이 있는 경우, 근로소득은 연말정산으로 끝나지만
          사업소득이 있으면 5월에 <strong>별도로 종합소득세를 신고</strong>해야 합니다.
          신고를 빠뜨리면 무신고가산세가 붙습니다.
        </p>
        <p>
          수입이 일정 규모를 넘어서면 사업자등록과 부가가치세 신고 의무가 생길 수 있습니다.
          본인 상황에 맞는 판단이 필요하니 국세청 상담(☎ 126)이나 세무 전문가에게 확인하세요.
          예상 세액은 <SeoLink href="/tax/income">종합소득세 계산기</SeoLink>에서 가늠해 볼 수 있습니다.
        </p>
      </SeoSection>

      <SeoSection title="함께 보면 좋은 계산기">
        <p>
          블로그·유튜브 광고 수익은 <SeoLink href="/daily/adsense">애드센스 수익 계산기</SeoLink>와
          <SeoLink href="/daily/youtube"> 유튜브 수익 계산기</SeoLink>에서 시뮬레이션할 수 있습니다.
          부수입을 모아 굴리는 계획은 <SeoLink href="/daily/compound">복리 계산기</SeoLink>로 그려보세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
