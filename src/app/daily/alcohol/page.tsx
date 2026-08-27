import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList } from "@/components/SeoContent";
import AlcoholCalc from "./AlcoholCalc";
export const metadata: Metadata = { title: "음주 후 운전 가능 시간 계산기 - 혈중알코올 분해 시간", description: "소주 한 병 마셨는데 언제 운전 가능? 음주량·체중 입력하면 혈중알코올 분해 시간 바로 계산.", alternates: { canonical: "https://moduncalc.com/daily/alcohol" },
  openGraph: {
    title: "음주 후 운전 가능 시간 계산기 - 혈중알코올 분해 시간",
    description: "소주 한 병 마셨는데 언제 운전 가능? 음주량·체중 입력하면 혈중알코올 분해 시간 바로 계산.",
    url: "https://moduncalc.com/daily/alcohol",
  },};
export default function Page() { return <PageLayout eyebrow="음주 계산" title="음주 후 운전 가능 시간 계산기" description="음주량, 체중, 성별을 입력하면 혈중알코올농도와 운전 가능 시간을 추정합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '음주 운전', href: '/daily/alcohol' }]} /><CalculatorJsonLd name="음주 후 운전 가능 시간 계산기" description="술 마신 후 운전 가능한 시간을 계산하세요. 음주량, 체중, 성별 기반 혈중알코올농도 추정 및 분해 시간 계산." url="https://moduncalc.com/daily/alcohol" /><FaqJsonLd items={[{q:"혈중알코올농도 0.03%면 어떤 처벌을 받나요?",a:"혈중알코올농도 0.03% 이상 0.08% 미만은 면허정지 처분을 받으며, 1년 이하의 징역 또는 500만원 이하의 벌금이 부과됩니다."},{q:"음주 후 해장국을 먹으면 알코올이 빨리 분해되나요?",a:"해장국은 위장을 보호하고 수분을 보충해 숙취 해소에 도움이 되지만, 알코올 분해 속도 자체를 빠르게 하지는 않습니다. 시간만이 유일한 해결책입니다."},{q:"이 계산기의 결과를 법적 근거로 사용할 수 있나요?",a:"아닙니다. 이 계산기는 Widmark 공식에 기반한 추정치이며, 실제 혈중알코올농도는 체질, 음식 섭취, 컨디션 등에 따라 크게 달라질 수 있습니다. 참고용으로만 사용하세요."}]} /><AlcoholCalc />

      <SeoSection title="2026년 음주운전 처벌 기준, 이거 모르면 면허 날립니다">
        <p>
          &quot;소주 한 잔이면 괜찮겠지&quot; — 이 생각이 가장 위험합니다.
          2019년 윤창호법 이후 <strong>혈중알코올농도 0.03%만 넘어도 면허정지</strong>입니다.
          소주 한 잔(50ml)이면 체중 70kg 남성 기준으로 대략 0.02~0.03% 나오는데, 컨디션에 따라 0.03% 넘을 수 있어요.
        </p>
        <SeoList>
          <li><strong>0.03~0.08%</strong> — 면허정지 100일 + 1년 이하 징역 또는 500만원 이하 벌금</li>
          <li><strong>0.08~0.2%</strong> — 면허취소 + 1~2년 징역 또는 500~1,000만원 벌금</li>
          <li><strong>0.2% 이상</strong> — 면허취소 + 2~5년 징역 또는 1,000~2,000만원 벌금</li>
          <li><strong>음주 사망사고</strong> — 무기 또는 3년 이상 징역 (윤창호법)</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="알코올 분해 속도, 사람마다 다릅니다">
        <SeoFormula>
          <div>혈중알코올농도(BAC) = 음주량(ml) × 알코올도수 × 0.7894 / (체중(kg) × 성별계수 × 10)</div>
          <div>성별계수: 남성 0.86, 여성 0.64</div>
          <div>분해 속도: 시간당 약 0.015%</div>
        </SeoFormula>
        <p>
          평균 분해 속도가 시간당 0.015%이긴 한데, 이건 <strong>딱 평균</strong>입니다.
          피곤하거나, 공복이거나, 간 기능이 안 좋으면 훨씬 느릴 수 있어요.
          &quot;어제 저녁에 마셨으니 아침엔 괜찮겠지&quot; 하다가 출근길에 걸리는 경우가 진짜 많습니다.
        </p>
        <p>
          확실한 건 <strong>대리운전비가 벌금보다 훨씬 쌈</strong>. 카카오T 대리 평균 1~2만원 vs 음주운전 벌금 최소 300만원.
        </p>
      </SeoSection>

      <SeoFaq
        title="음주 운전 관련 궁금증"
        items={[
          { q: '숙취해소제 먹으면 알코올이 빨리 빠지나요?', a: '숙취해소제는 아세트알데히드 분해를 돕는 것이지, 알코올 자체의 분해 속도를 높이지는 않습니다. 컨디셔닝엔 도움이 되지만 운전 가능 시간에는 영향 없습니다.' },
          { q: '맥주 500cc 한 잔이면 몇 시간 후에 운전 가능한가요?', a: '체중 70kg 남성 기준으로 약 2~3시간, 체중 55kg 여성 기준으로 약 3~4시간 후 운전 가능합니다. 하지만 개인차가 크니 넉넉하게 잡으세요.' },
          { q: '자전거도 음주운전에 해당되나요?', a: '네. 도로교통법상 자전거도 "차"에 해당하며, 음주 상태로 운전하면 20만원 이하의 벌금·구류에 처해질 수 있습니다. 전동킥보드도 마찬가지입니다.' },
        ]}
      />
    </PageLayout>; }
