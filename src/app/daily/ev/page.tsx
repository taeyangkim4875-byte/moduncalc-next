import type { Metadata } from "next";
import { KO_OPEN_GRAPH } from "@/app/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import ShareButtons from "@/components/ShareButtons";
import EvCalc from "./EvCalc";

export const metadata: Metadata = {
  title: "전기차 전비 계산기 - 연비 측정 · 충전요금 · 내연차 비교 (2026)",
  description: "내 전기차 전비는 몇 km/kWh? 주행거리와 충전량을 넣으면 바로 측정. 완속·급속 충전요금과 내연차 대비 연간 절감액까지 비교합니다.",
  alternates: { canonical: "https://moduncalc.com/daily/ev" },
  openGraph: {
    ...KO_OPEN_GRAPH,
    title: "전기차 전비 계산기 - 충전요금 · 내연차 비교 (2026)",
    description: "전비(km/kWh) 측정 + 완속·급속 충전비 + 내연차 대비 연간 절감액.",
    url: "https://moduncalc.com/daily/ev",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="전기차 · 2026 충전요금 기준"
      title="전기차 전비 계산기"
      description="내 전기차의 실제 전비와 충전비, 내연차와의 차이를 확인하세요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '전기차 전비', href: '/daily/ev' }]} />
      <CalculatorJsonLd
        name="전기차 전비 계산기"
        description="전기차 전비(km/kWh) 측정, 완속·급속 충전요금 계산, 내연차 대비 연료비 비교."
        url="https://moduncalc.com/daily/ev"
      />
      <FaqJsonLd items={[
        { q: "전기차 전비는 어떻게 계산하나요?", a: "전비(km/kWh) = 주행 거리 ÷ 사용 전력량입니다. 300km를 달리고 54.5kWh를 충전했다면 300 ÷ 54.5 = 약 5.5km/kWh입니다. 내연차의 연비(km/L)와 같은 개념이고, 분모가 리터에서 kWh로 바뀐 것입니다." },
        { q: "전기차 연비와 전비는 다른 말인가요?", a: "같은 것을 가리킵니다. 전기차는 연료가 아니라 전기를 쓰므로 전비(電費)라고 부르는 것이 정확하지만, 일상적으로는 전기차 연비라고도 합니다. 공인 표기는 복합 전비이며 단위는 km/kWh입니다." },
        { q: "100km 주행에 충전비가 얼마나 드나요?", a: "전비 5.5km/kWh 차량을 집 완속(350원/kWh)으로 충전하면 100km당 약 6,400원입니다. 공용 완속(400원)은 약 7,300원, 급속(500원)은 약 9,100원입니다. 같은 거리를 연비 12km/L 내연차로 가면 1,650원/L 기준 약 13,750원입니다." },
        { q: "겨울에 전비가 떨어지는 이유는?", a: "배터리가 저온에서 효율이 낮아지고, 난방에 히트펌프나 PTC 히터가 전력을 쓰기 때문입니다. 통상 여름 대비 20~30% 떨어집니다. 실내 난방보다 시트·스티어링 열선이 전력을 훨씬 덜 씁니다." },
      ]} />
      <EvCalc />
      <ShareButtons title="전기차 전비 계산 결과" />

      <SeoSection title="전비와 연비, 같은 개념입니다">
        <p>
          전기차 이야기를 할 때 <strong>전비</strong>와 <strong>연비</strong>가 섞여 쓰입니다.
          가리키는 건 같습니다 — 에너지 1단위로 얼마나 멀리 가는지입니다.
          연료가 아니라 전기를 쓰니 전비(電費)가 정확한 표기지만, 검색할 때는 전기차 연비라고
          쓰는 쪽이 더 흔합니다.
        </p>
        <SeoFormula>
          <div>전비(km/kWh) = 주행 거리(km) ÷ 사용 전력량(kWh)</div>
          <div>충전비 = 주행 거리 ÷ 전비 × 충전 단가(원/kWh)</div>
          <div>예: 300km ÷ 54.5kWh = 약 5.5 km/kWh</div>
        </SeoFormula>
        <p>
          내연차 연비가 리터당 몇 km인지를 보는 것과 똑같이, 전비는 <strong>1kWh로 몇 km</strong>를
          가는지를 봅니다. 그래서 전비는 숫자가 클수록 좋습니다. 가끔 kWh/100km(100km를 가는 데
          쓰는 전력량)로 표기하는 차도 있는데, 이쪽은 숫자가 작을수록 좋습니다. 방향이 반대라
          헷갈리기 쉽습니다.
        </p>
        <p>
          공인 전비는 표준 시험 조건에서 측정한 값입니다. 실제로는 속도, 외기 온도, 공조 사용,
          타이어 공기압에 따라 달라지므로, 위 계산기로 <strong>충전 사이의 실제 주행거리와
          충전량</strong>을 넣어 직접 재보는 쪽이 정확합니다.
        </p>
      </SeoSection>

      <SeoSection title="충전 방식별 100km당 비용">
        <p>
          전기차 충전비는 <strong>어디서 충전하느냐</strong>에 따라 가장 크게 갈립니다.
          전비 5.5km/kWh 차량으로 100km를 달릴 때의 비용입니다.
        </p>
        <SeoList>
          <li><strong>집 완속 (350원/kWh)</strong> — 약 6,400원. 가장 저렴하고, 야간에 걸어두면 됩니다</li>
          <li><strong>공용 완속 (400원/kWh)</strong> — 약 7,300원. 아파트 주차장·공영주차장</li>
          <li><strong>급속 (500원/kWh)</strong> — 약 9,100원. 장거리 이동 중 보충용</li>
          <li><strong>참고: 내연차 (12km/L, 1,650원/L)</strong> — 약 13,750원</li>
        </SeoList>
        <p>
          집 완속과 급속의 차이가 100km당 2,700원입니다. 월 1,500km를 급속으로만 충전하면
          완속 대비 <strong>연간 약 49만원</strong>을 더 쓰게 됩니다. 전기차의 연료비 이점은
          상당 부분 <strong>집에서 완속으로 충전할 수 있느냐</strong>에 달려 있습니다.
        </p>
        <p>
          충전 단가는 사업자와 시간대에 따라 바뀌므로, 고지서나 충전 앱에 표시된 실제 단가를
          계산기에 넣어보세요. 집 충전이면 가정용 전기요금 누진 구간도 함께 봐야 합니다 —{' '}
          <SeoLink href="/daily/electric">전기요금 계산기</SeoLink>에서 기존 사용량에 충전량을
          더했을 때 구간이 올라가는지 확인할 수 있습니다.
        </p>
      </SeoSection>

      <SeoSection title="내연차와 비교하면 얼마나 차이 나나">
        <p>월 1,500km를 주행하는 경우입니다.</p>
        <SeoFormula>
          <div>내연차 (12km/L, 1,650원/L) → 월 약 206,000원</div>
          <div>전기차 (5.5km/kWh, 완속 350원) → 월 약 95,000원</div>
          <div>월 약 111,000원 차이 · 연간 약 133만원</div>
        </SeoFormula>
        <p>
          연료비만 보면 전기차가 분명히 유리합니다. 다만 <strong>차값과 세금까지 넣어야</strong>
          전체 그림이 나옵니다. 전기차는 같은 급 내연차보다 차값이 높고, 보조금을 받아도
          연료비 차이로 그 격차를 메우는 데 보통 5~7년이 걸립니다.
        </p>
        <SeoList>
          <li><strong>자동차세</strong> — 전기차는 배기량이 없어 영업용·비영업용 구분에 따른 정액이 적용되고, 같은 급 내연차보다 크게 저렴합니다. <SeoLink href="/daily/cartax">자동차세 계산기</SeoLink>에서 비교해 보세요</li>
          <li><strong>취득세</strong> — 전기차는 감면 한도가 있어 내연차보다 적게 냅니다. <SeoLink href="/loan/car">자동차 할부 계산기</SeoLink>에서 취등록세까지 포함한 총비용을 볼 수 있습니다</li>
          <li><strong>배터리 수명</strong> — 보증 기간과 조건을 반드시 확인하세요. 중고 가격에 가장 크게 작용하는 요소입니다</li>
          <li><strong>충전 환경</strong> — 집 완속 충전이 불가능하면 위 절감액 대부분이 사라집니다. 구매 전에 이걸 먼저 확인하는 게 순서입니다</li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="전기차 전비, 이런 점도 궁금하실 거예요"
        items={[
          { q: '공인 전비만큼 안 나오는데 고장인가요?', a: '정상입니다. 공인 전비는 표준 시험 조건의 값이고, 실제로는 고속 주행과 공조 사용에서 많이 깎입니다. 공인 전비의 75~90%가 일반적인 범위입니다. 고속도로 위주로 타면 전기차는 내연차와 반대로 전비가 나빠집니다 — 속도가 올라가면 공기 저항이 급격히 커지고, 내연차처럼 정속에서 효율이 좋아지는 구간이 없기 때문입니다.' },
          { q: '회생제동을 많이 쓰면 전비가 좋아지나요?', a: '좋아집니다. 감속할 때 운동에너지를 배터리로 되돌리기 때문입니다. 특히 도심 정체 구간에서 효과가 큽니다. 그래서 전기차는 고속도로보다 도심에서 전비가 더 잘 나오는 경우가 많습니다.' },
          { q: '급속 충전만 쓰면 배터리에 안 좋은가요?', a: '급속 충전은 발열이 커서 반복되면 배터리 열화에 불리하다고 알려져 있습니다. 평소에는 완속을 쓰고 장거리에서만 급속을 쓰는 패턴이 비용과 수명 양쪽에 유리합니다. 다만 최신 차종은 열관리가 개선되어 차이가 줄었습니다.' },
          { q: '충전량은 어디서 확인하나요?', a: '충전기 화면이나 충전 사업자 앱의 이용 내역에 kWh 단위로 표시됩니다. 집 완속이라면 충전기 앱이나 전기 고지서의 증가분으로 확인할 수 있습니다. 차량 계기판의 누적 전비 표시보다, 실제 충전량으로 직접 계산한 값이 정확합니다.' },
        ]}
      />

      <SeoSection title="함께 보면 좋은 계산기">
        <p>
          내연차 연비와 유류비는 <SeoLink href="/daily/fuel">자동차 연비 계산기</SeoLink>에서
          따로 계산할 수 있습니다. 집에서 충전한다면{' '}
          <SeoLink href="/daily/electric">전기요금 계산기</SeoLink>로 누진 구간을 확인하고,
          보유 비용은 <SeoLink href="/daily/cartax">자동차세</SeoLink>와{' '}
          <SeoLink href="/loan/car">할부 계산기</SeoLink>를 함께 보세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
