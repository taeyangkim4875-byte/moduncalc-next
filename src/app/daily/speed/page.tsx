import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import SpeedCalc from "./SpeedCalc";

export const metadata: Metadata = {
  title: "속도·시간 계산기 - 소요시간·평균속도·속도변환",
  description: "거리와 속도로 소요 시간을 계산하세요. 평균 속도 역산, km/h ↔ m/s 변환까지.",
  alternates: { canonical: "https://moduncalc.com/daily/speed" },
  openGraph: {
    title: "속도·시간 계산기 - 소요시간·평균속도·속도변환",
    description: "거리와 속도로 소요 시간을 계산하세요. 평균 속도 역산, km/h ↔ m/s 변환까지.",
    url: "https://moduncalc.com/daily/speed",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="이동 계산" title="속도·시간 계산기" description="거리와 속도로 소요 시간을 계산해요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '속도·시간', href: '/daily/speed' }]} />
      <CalculatorJsonLd name="속도·시간 계산기" description="거리와 속도로 소요 시간을 계산하세요." url="https://moduncalc.com/daily/speed" />
      <FaqJsonLd items={[{q:"고속도로에서 평균 속도가 왜 낮게 나오나요?",a:"정체, 휴게소 정차, 톨게이트 대기 시간이 포함되면 평균 속도가 크게 낮아집니다."},{q:"km/h를 m/s로 빠르게 환산하려면?",a:"km/h ÷ 3.6 = m/s입니다. 예: 72km/h = 20m/s."}]} />
      <SpeedCalc />

      <SeoSection title="속도·거리·시간 공식">
        <p>속도, 거리, 시간은 서로 밀접한 관계에 있습니다. 하나를 알면 나머지를 구할 수 있습니다.</p>
        <SeoFormula>
          <div>속도 = 거리 ÷ 시간</div>
          <div>거리 = 속도 × 시간</div>
          <div>시간 = 거리 ÷ 속도</div>
        </SeoFormula>
        <p>
          예를 들어 서울에서 부산까지 400km를 시속 100km로 달리면 4시간이 걸립니다.
          하지만 실제로는 정체, 휴게소, 톨게이트 등으로 <strong>평균 속도가 70~80km/h</strong> 정도 나오므로
          5~6시간이 소요됩니다.
        </p>
      </SeoSection>

      <SeoSection title="속도 단위 변환">
        <SeoList>
          <li><strong>km/h → m/s</strong>: ÷ 3.6 (예: 72km/h = 20m/s)</li>
          <li><strong>m/s → km/h</strong>: × 3.6 (예: 10m/s = 36km/h)</li>
          <li><strong>km/h → mph</strong>: ÷ 1.609 (예: 100km/h ≈ 62mph)</li>
          <li><strong>노트(knot)</strong>: 1노트 = 1.852km/h (해상·항공 속도)</li>
          <li><strong>마하(Mach)</strong>: 마하 1 = 약 1,225km/h (음속, 고도·온도에 따라 변동)</li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="속도·시간 계산, 이런 점도 궁금하실 거예요"
        items={[
          { q: '네비게이션 도착 예상 시간은 어떻게 계산되나요?', a: '구간별 실시간 교통 정보, 과거 평균 속도, 신호 대기 시간 등을 종합해 계산합니다. 이 계산기는 단순 평균 속도 기준이므로 네비 예상과 차이가 날 수 있습니다.' },
          { q: '러닝 페이스(min/km)는 어떻게 환산하나요?', a: '60 ÷ 속도(km/h) = 페이스(min/km)입니다. 예를 들어 시속 10km로 달리면 페이스는 6분/km입니다. 마라톤 풀코스(42.195km)를 6분 페이스로 뛰면 약 4시간 13분입니다.' },
          { q: '자전거 평균 속도는 얼마인가요?', a: '일반 자전거로 평지 주행 시 15~20km/h, 로드바이크는 25~35km/h 정도입니다. 출퇴근용이라면 평균 15km/h로 계산하면 현실적입니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          자동차 여행 유류비를 계산하려면 <SeoLink href="/daily/fuel">연비·유류비 계산기</SeoLink>가 편하고,
          단위 변환이 더 필요하면 <SeoLink href="/daily/unit">단위 변환기</SeoLink>를 이용하세요.
          이동 시간까지의 D-day는 <SeoLink href="/daily/dday">D-day 계산기</SeoLink>로 확인할 수 있습니다.
        </p>
      </SeoSection>

      <SeoSection title="평균 속도는 단순 평균이 아닙니다">
        <p>
          가장 흔한 착각입니다. 갈 때 시속 100km, 올 때 시속 50km로 같은 거리를 달렸다면
          평균 속도는 75km/h가 아니라 <strong>약 66.7km/h</strong>입니다.
          느린 구간에 시간을 더 많이 쓰기 때문입니다.
        </p>
        <SeoFormula>
          <div>평균 속도 = 총 거리 ÷ 총 소요 시간</div>
          <div>같은 거리를 두 속도로 달렸을 때 = 2 × v₁ × v₂ ÷ (v₁ + v₂)</div>
          <div>예: 2 × 100 × 50 ÷ 150 = 66.7km/h</div>
        </SeoFormula>
        <p>
          100km 구간을 100km/h로 가면 1시간, 50km/h로 오면 2시간이라 총 200km를 3시간에 이동한 셈입니다.
          200 ÷ 3 = 66.7km/h. 이것을 조화평균이라고 부릅니다.
        </p>
      </SeoSection>

      <SeoSection title="내비게이션 예상 시간이 자주 빗나가는 이유">
        <p>
          서울에서 부산까지 약 400km를 제한속도 100km/h로 달리면 산술적으로 4시간입니다.
          그런데 실제로는 5시간 안팎이 걸립니다. 순수 주행 외의 시간이 빠져 있기 때문입니다.
        </p>
        <SeoList>
          <li><strong>휴게소 정차</strong> — 한 번 들를 때마다 15~20분. 장거리에서는 두 번 이상 들르는 경우가 많습니다.</li>
          <li><strong>톨게이트·요금소</strong> — 하이패스라도 감속이 필요하고, 정체 시간대에는 더 걸립니다.</li>
          <li><strong>가감속 구간</strong> — 진출입로, 터널, 곡선 구간에서는 제한속도보다 느리게 달립니다.</li>
          <li><strong>정체</strong> — 시속 30km 구간이 20분만 있어도 전체 평균이 크게 떨어집니다.</li>
        </SeoList>
        <p>
          그래서 실무적으로는 <strong>제한속도의 80% 정도를 실질 평균 속도</strong>로 잡으면
          실제 도착 시간과 비슷하게 맞습니다.
          장거리 이동 비용까지 함께 계산하려면 <SeoLink href="/daily/fuel">연비 계산기</SeoLink>와
          <SeoLink href="/daily/travel"> 여행 경비 계산기</SeoLink>를 이용해 보세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
