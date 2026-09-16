import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
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

      <SeoSection title="면허 정지와 취소 기준">
        <p>
          도로교통법상 음주운전 단속 기준은 <strong>혈중알코올농도 0.03%</strong>입니다.
          이른바 윤창호법 시행으로 2019년부터 기준이 대폭 강화됐습니다.
        </p>
        <SeoList>
          <li><strong>0.03% 이상 0.08% 미만</strong> — 면허 정지(100일). 1년 이하 징역 또는 500만원 이하 벌금.</li>
          <li><strong>0.08% 이상 0.2% 미만</strong> — 면허 취소. 1년 이상 2년 이하 징역 또는 500만원 이상 1천만원 이하 벌금.</li>
          <li><strong>0.2% 이상</strong> — 면허 취소. 2년 이상 5년 이하 징역 또는 1천만원 이상 2천만원 이하 벌금.</li>
          <li><strong>측정 거부</strong> — 면허 취소. 1년 이상 5년 이하 징역 또는 500만원 이상 2천만원 이하 벌금.</li>
        </SeoList>
        <p>
          0.03%는 <strong>소주 한 잔으로도 넘길 수 있는 수치</strong>입니다.
          체중이 가볍거나 공복이면 더 쉽게 도달합니다. &ldquo;한 잔은 괜찮다&rdquo;는 말은 법적으로 성립하지 않습니다.
        </p>
      </SeoSection>

      <SeoSection title="이 계산기가 쓰는 공식과 그 한계">
        <p>
          혈중알코올농도 추정에는 <strong>위드마크(Widmark) 공식</strong>이 널리 쓰입니다.
          마신 술의 알코올 양을 체중과 체수분 비율로 나눈 뒤, 시간이 지나며 분해되는 양을 빼는 방식입니다.
        </p>
        <SeoFormula>
          <div>알코올량(g) = 음주량(ml) × 도수(%) ÷ 100 × 0.7894</div>
          <div>최고 혈중농도(%) = 알코올량 ÷ (체중kg × r) ÷ 10</div>
          <div>r = 체내 알코올 분포 계수 (남성 약 0.68, 여성 약 0.55)</div>
          <div>현재 농도 = 최고 농도 − (경과 시간 × 시간당 분해율 약 0.015%)</div>
        </SeoFormula>
        <p>
          문제는 이 값들이 <strong>사람마다 크게 다르다</strong>는 점입니다.
          알코올 분해 효소(ALDH2) 활성도는 유전적으로 차이가 크고,
          공복 여부, 간 기능, 복용 중인 약, 수면 상태, 체지방률에 따라 실제 수치가 달라집니다.
          같은 사람도 컨디션에 따라 다릅니다.
        </p>
      </SeoSection>

      <SeoSection title="숙취운전이 더 위험한 이유">
        <p>
          음주 단속에 걸리는 상당수가 <strong>다음 날 아침</strong>입니다.
          밤 12시까지 소주 두 병을 마셨다면 이론적으로도 아침 8~9시까지 알코올이 남아 있을 수 있습니다.
          잠을 자는 동안에는 분해 속도가 오히려 느려진다는 연구도 있습니다.
        </p>
        <p>
          더 위험한 것은 <strong>본인이 멀쩡하다고 느낀다</strong>는 점입니다.
          취기는 사라졌지만 혈중알코올농도는 여전히 기준을 넘는 상태가 흔합니다.
          전날 과음했다면 다음 날 오전은 대중교통을 이용하시길 권합니다.
        </p>
        <p className="text-xs text-[var(--sub)]">
          ※ 이 계산기의 결과는 통계적 평균에 기반한 <strong>참고용 추정치</strong>이며,
          실제 혈중알코올농도나 법적 판단의 근거가 될 수 없습니다.
          음주 후에는 시간 계산과 무관하게 운전하지 마세요.
        </p>
      </SeoSection>

      <SeoSection title="함께 보면 좋은 계산기">
        <p>
          모임 비용 정산은 <SeoLink href="/daily/dutch">더치페이 계산기</SeoLink>,
          숙취 해소에 도움이 되는 수분 섭취량은 <SeoLink href="/health/water">물 섭취량 계산기</SeoLink>에서 확인해 보세요.
          대리운전 대신 첫차를 기다린다면 <SeoLink href="/daily/time">시간 계산기</SeoLink>가 유용합니다.
        </p>
      </SeoSection>
    </PageLayout>; }
