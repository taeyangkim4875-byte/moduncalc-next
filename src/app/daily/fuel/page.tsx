import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import FuelCalc from "./FuelCalc";

export const metadata: Metadata = {
  title: "자동차 연비 계산기 - 연비 측정 · 유류비 · 전기차 전비 비교 (2026)",
  description: "내 차 실제 연비는? 주행거리·주유량 입력하면 바로 측정. 서울→부산 유류비 + 전기차 비용 비교까지 무료.",
  alternates: { canonical: "https://moduncalc.com/daily/fuel" },
  openGraph: {
    title: "자동차 연비 계산기 - 연비·유류비·전기차 전비 비교 (2026)",
    description: "연비 측정 + 유류비 계산 + 전기차 충전비 비교. 내연차 vs 전기차 연간 절약액까지.",
    url: "https://moduncalc.com/daily/fuel",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="자동차 · 전기차 전비 포함" title="자동차 연비 · 전비 계산기" description="내연차 연비 + 전기차 전비 + 비용 비교까지 한번에.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '연비', href: '/daily/fuel' }]} />
      <CalculatorJsonLd name="자동차 연비·전비 계산기" description="내연차 연비(km/L) 측정, 유류비 계산, 전기차 전비(km/kWh) 충전비 계산, 내연차 vs 전기차 비용 비교." url="https://moduncalc.com/daily/fuel" />
      <FaqJsonLd items={[
        {q:"자동차 연비는 어떻게 계산하나요?",a:"연비(km/L) = 주행 거리(km) ÷ 사용 연료(L)입니다. 주유 후 트립미터를 0으로 초기화하고, 다음 주유 시 주행거리와 주유량을 기록하면 실제 연비를 측정할 수 있습니다."},
        {q:"실제 연비가 공인연비보다 낮은 이유는?",a:"공인연비는 표준 시험실 조건에서 측정됩니다. 실제 도로에서는 에어컨, 급가속, 도심 정체, 오르막길 등으로 공인연비의 70~85% 수준이 나옵니다."},
        {q:"연비를 높이는 방법은?",a:"경제속도(60~80km/h) 유지, 급가속·급제동 자제, 타이어 공기압 적정 유지(월 1회 점검), 불필요한 짐 줄이기, 에어컨 적정 사용이 효과적입니다. 이것만으로 연비가 10~20% 개선됩니다."},
        {q:"서울에서 부산까지 유류비는 얼마인가요?",a:"서울-부산 약 400km 기준, 연비 12km/L 차량에 리터당 1,650원이면 약 55,000원입니다. 고속도로 통행료(약 25,000원)는 별도입니다."},
        {q:"전기차 전비는 어떻게 계산하나요?",a:"전비(km/kWh) = 주행 거리 ÷ 사용 전력량입니다. 아이오닉5 기준 복합 전비 약 5.5~6.0km/kWh이며, 완속 충전(350원/kWh) 기준 100km당 약 6,000원입니다."},
        {q:"내연차와 전기차 연료비 차이는?",a:"월 1,500km 주행 기준 내연차는 약 20만원, 전기차는 약 9.5만원으로 월 약 11만원, 연간 약 130만원 절약됩니다."},
      ]} />
      <FuelCalc />

      <SeoSection title="내 차 실연비, 직접 측정하는 법">
        <p>
          공인연비와 실연비는 평균 15~30% 차이납니다. 내 차의 <strong>진짜 연비</strong>를 알아야 유류비 예산을 제대로 잡을 수 있어요.
        </p>
        <SeoFormula>
          <div>실연비(km/L) = 주행 거리(km) ÷ 주유량(L)</div>
          <div>유류비 = 주행 거리 ÷ 연비 × 리터당 기름값</div>
          <div>전기차 충전비 = 주행 거리 ÷ 전비(km/kWh) × kWh당 단가</div>
        </SeoFormula>
        <p>
          측정법: 주유소에서 가득 넣고, 트립미터 리셋. 다음 주유 시 주행거리와 넣은 양을 이 계산기에 입력하세요.
          3~4번 반복하면 꽤 정확한 내 차 평균 연비가 나옵니다.
        </p>
      </SeoSection>

      <SeoSection title="내연차 vs 전기차, 연간 연료비 비교">
        <SeoList>
          <li><strong>내연차 (연비 12km/L)</strong> — 월 1,500km 주행 시 약 20만원 (리터당 1,600원 기준)</li>
          <li><strong>전기차 (전비 5.5km/kWh)</strong> — 같은 거리 완속충전 시 약 9.5만원 (kWh당 350원)</li>
          <li><strong>연간 차이</strong> — 약 126만원 절약. 10년이면 1,260만원</li>
        </SeoList>
        <p>
          근데 전기차는 차 값이 더 비싸죠. 보조금 고려하면 5~7년 타야 손익분기가 나옵니다.
          자동차세도 전기차가 유리해요 — 내연차 대비 연 40~50만원 저렴. <SeoLink href="/daily/cartax">자동차세 계산기</SeoLink>에서 비교해 보세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="연비 관련 궁금증"
        items={[
          { q: '연비가 갑자기 나빠졌는데 원인이 뭔가요?', a: '에어컨 과다 사용, 타이어 공기압 부족, 에어필터 오염, 엔진오일 교체 시기 초과가 흔한 원인입니다. 공기압만 체크해도 연비가 3~5% 개선될 수 있어요.' },
          { q: '고속도로가 시내보다 연비가 좋은가요?', a: '일반적으로 그렇습니다. 80~100km/h 정속 주행이 가장 연비가 좋고, 시내 정체 구간은 연비가 30~50% 떨어집니다. 다만 120km/h 이상에서는 공기 저항이 급증해 연비가 다시 나빠져요.' },
          { q: '셀프 주유소가 얼마나 저렴한가요?', a: '일반 주유소 대비 리터당 50~100원 정도 저렴합니다. 월 100L 주유하면 5,000~10,000원 절약. 오피넷(opinet.co.kr)에서 주변 최저가 주유소를 확인할 수 있어요.' },
        ]}
      />
    </PageLayout>
  );
}
