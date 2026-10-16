import type { Metadata } from "next";
import { KO_OPEN_GRAPH } from "@/app/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import FireCalc from "./FireCalc";
export const metadata: Metadata = { title: "FIRE 계산기 - 조기 은퇴 시뮬레이션", description: "현재 소득·지출·자산으로 몇 살에 경제적 자유(FIRE)를 달성할 수 있는지 계산하세요. 저축률·투자 수익률 반영.", alternates: { canonical: "https://moduncalc.com/daily/fire" },
  openGraph: {
    ...KO_OPEN_GRAPH,
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

      <SeoSection title="저축률 하나로 은퇴 시점이 50년씩 갈립니다">
        <p>
          FIRE까지 걸리는 시간은 <strong>저축률만 알면 거의 정해집니다</strong>. 연봉이 얼마든
          소득의 몇 %를 남기느냐가 기간을 결정하기 때문입니다. 자산 0에서 시작해 실질 수익률
          4%를 가정하고, 연 지출의 25배를 모으는 데 걸리는 기간은 이렇습니다.
        </p>
        <SeoFormula>
          <div>저축률 10% → 약 59년 (사실상 불가능)</div>
          <div>저축률 20% → 약 41년</div>
          <div>저축률 30% → 약 31년</div>
          <div>저축률 40% → 약 23년</div>
          <div>저축률 50% → 약 18년</div>
          <div>저축률 60% → 약 13년</div>
          <div>저축률 70% → 약 9년</div>
        </SeoFormula>
        <p>
          저축률을 20%에서 40%로 올리면 기간이 41년에서 23년으로 <strong>절반 가까이</strong> 줄어듭니다.
          두 배 저축했을 때 기간이 두 배가 아니라 그 이상 줄어드는 이유는, 저축을 늘리면 모을 돈이
          늘어나는 동시에 <strong>목표 금액 자체가 작아지기</strong> 때문입니다. 지출이 줄면 필요 자산
          25배도 같이 줄어드니까요.
        </p>
        <p>
          그래서 FIRE에서는 연봉 인상보다 고정지출 절감이 더 강하게 작동합니다. 월 지출을
          250만원에서 150만원으로 줄이면 필요 자산이 7.5억에서 4.5억으로 <strong>3억</strong> 내려갑니다.
          내 연봉의 실수령액부터 확인하려면{' '}
          <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>를 먼저 써보세요.
        </p>
      </SeoSection>

      <SeoSection title="FIRE 계산에서 자주 틀리는 세 가지">
        <SeoList>
          <li>
            <strong>명목 수익률을 그대로 넣는 것</strong> — 연 7% 수익을 기대하면서 지출은 오늘
            물가로 두면, 20년 뒤 구매력을 크게 과대평가합니다. 수익률에서 물가상승률을 뺀
            실질 수익률(7% − 3% = 4%)을 쓰거나, 지출도 함께 올려야 앞뒤가 맞습니다.
          </li>
          <li>
            <strong>건강보험료를 빼먹는 것</strong> — 퇴사하면 직장가입자에서 지역가입자로 바뀌고,
            보험료가 소득뿐 아니라 <strong>재산</strong>에도 붙습니다. FIRE를 위해 모은 자산이
            그대로 보험료 산정 대상이 되는 구조라, 연간 지출에 미리 넣어두지 않으면 계산이 틀어집니다.
          </li>
          <li>
            <strong>4% 룰을 보증으로 읽는 것</strong> — 4% 룰은 미국 주식·채권의 과거 30년
            구간을 근거로 한 &ldquo;성공 확률이 높았다&rdquo;는 관찰이지, 원금 보전 약속이 아닙니다.
            은퇴 직후 몇 년간 하락장을 만나면 같은 인출률이라도 결과가 크게 나빠집니다.
          </li>
        </SeoList>
        <p>
          계산기의 숫자는 &ldquo;지금 속도를 유지하면&rdquo;이라는 가정 위에 있습니다. 승진·이직·출산처럼
          소득과 지출이 바뀌는 사건이 있을 때마다 다시 넣어보는 쪽이, 한 번 나온 나이를 믿는 것보다
          훨씬 도움이 됩니다.
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
