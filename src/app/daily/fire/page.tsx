import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import FireCalc from "./FireCalc";
export const metadata: Metadata = { title: "FIRE 계산기 - 조기 은퇴 시뮬레이션", description: "현재 소득·지출·자산으로 몇 살에 경제적 자유(FIRE)를 달성할 수 있는지 계산하세요. 저축률·투자 수익률 반영.", alternates: { canonical: "https://moduncalc.com/daily/fire" },
  openGraph: {
    title: "FIRE 계산기 - 조기 은퇴 시뮬레이션",
    description: "현재 소득·지출·자산으로 몇 살에 경제적 자유(FIRE)를 달성할 수 있는지 계산하세요. 저축률·투자 수익률 반영.",
    url: "https://moduncalc.com/daily/fire",
  },};
export default function Page() { return <PageLayout eyebrow="경제적 자유" title="FIRE 계산기" description="현재 속도라면 몇 살에 조기 은퇴가 가능할까요?">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: 'FIRE', href: '/daily/fire' }]} /><CalculatorJsonLd name="FIRE 계산기" description="현재 소득·지출·자산으로 몇 살에 경제적 자유를 달성할 수 있는지 계산하세요." url="https://moduncalc.com/daily/fire" /><FaqJsonLd items={[{q:"4% 룰이란?",a:"은퇴 자산의 4%를 매년 인출하면 30년 이상 자산이 유지된다는 연구 결과입니다. 필요 자산 = 연 지출 × 25."},{q:"인플레이션은 반영되나요?",a:"실질 수익률(명목 수익률 - 인플레이션)로 계산하면 자동 반영됩니다."},{q:"국민연금은 포함되나요?",a:"이 계산기에서는 별도로 포함하지 않습니다. 국민연금 수령 시 필요 자산이 줄어드는 효과가 있습니다."}]} /><FireCalc />

      <SeoSection title="FIRE, 연봉 높아야만 가능한 거 아닙니다">
        <p>
          FIRE(Financial Independence, Retire Early)에서 가장 중요한 숫자는 연봉이 아니라 <strong>저축률</strong>입니다.
          연봉 1억인데 다 쓰는 사람보다, 연봉 5천만원인데 절반 저축하는 사람이 훨씬 빨리 FIRE에 도달합니다.
        </p>
        <SeoFormula>
          <div>FIRE 필요 자산 = 연간 생활비 × 25 (4% 룰 기준)</div>
          <div>월 지출 200만원 → 연 2,400만원 → 필요 자산 6억원</div>
          <div>월 지출 150만원 → 연 1,800만원 → 필요 자산 4.5억원</div>
        </SeoFormula>
        <p>
          지출을 50만원 줄이면 필요 자산이 1.5억 줄어듭니다.
          &quot;더 벌기&quot;보다 &quot;덜 쓰기&quot;가 FIRE까지의 시간을 2배 이상 당길 수 있어요.
        </p>
      </SeoSection>

      <SeoSection title="한국에서 현실적인 FIRE 전략">
        <SeoList>
          <li><strong>청년도약계좌 + ISA</strong> — 비과세·감세 혜택 먼저 활용. <SeoLink href="/savings/doyak">도약계좌 시뮬레이션</SeoLink></li>
          <li><strong>연금저축 + IRP</strong> — 세액공제(최대 148.5만원) + 과세이연으로 복리 극대화</li>
          <li><strong>인덱스 투자</strong> — S&P 500 ETF, 국내 KOSPI 200 ETF 등 장기 적립식</li>
          <li><strong>부동산 레버리지</strong> — 전세 레버리지 또는 소형 아파트 갭투자. 리스크 관리 필수</li>
        </SeoList>
        <p>
          복리의 위력을 직접 확인하려면 <SeoLink href="/daily/compound">복리 계산기</SeoLink>에서 시뮬레이션해 보세요.
          국민연금 예상 수령액은 <SeoLink href="/pension/nps">국민연금 계산기</SeoLink>에서 확인 가능합니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="FIRE 관련 궁금증"
        items={[
          { q: '4% 룰이 한국에서도 통하나요?', a: '4% 룰은 미국 S&P 500 역사적 수익률 기준입니다. 한국 주식만으로는 변동성이 크기 때문에, 글로벌 분산투자 + 3~3.5% 인출률이 더 안전합니다. 국민연금 수령 시 인출 필요액이 줄어드는 것도 고려하세요.' },
          { q: '인플레이션은 어떻게 반영하나요?', a: '연 수익률에서 인플레이션(약 2~3%)을 뺀 실질 수익률로 계산하면 됩니다. 명목 수익률 7%에 인플레 3%이면 실질 4%입니다.' },
          { q: 'FIRE 후 의료비가 걱정됩니다', a: '한국은 국민건강보험이 있어서 미국만큼 걱정할 필요는 없습니다. 다만 지역가입자 건보료(재산+소득 기준)가 나오므로, 이 비용도 연간 지출에 포함시켜 계산하세요.' },
        ]}
      />
    </PageLayout>; }
