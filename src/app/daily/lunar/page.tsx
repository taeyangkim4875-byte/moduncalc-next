import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import LunarCalc from "./LunarCalc";

export const metadata: Metadata = {
  title: "음력 양력 변환기 - 음력 양력 날짜 변환 (2026)",
  description: "음력 날짜를 양력으로, 양력 날짜를 음력으로 변환. 설날, 추석, 음력 생일 양력 날짜를 확인하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/lunar" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="날짜 변환" title="음력 양력 변환기" description="설날, 추석 등 주요 음력 명절 날짜와 음력 생일의 양력 변환을 확인하세요.">
      <CalculatorJsonLd name="음력 양력 변환기" description="음력 날짜를 양력으로, 양력 날짜를 음력으로 변환하세요." url="https://moduncalc.com/daily/lunar" />
      <FaqJsonLd items={[{q:"윤달이 있는 해에 음력 생일은 어떻게 되나요?",a:"원래 달(정달)의 날짜를 생일로 보며, 윤달의 같은 날은 윤달 생일이라고 합니다."},{q:"음력 30일생인데 29일까지만 있는 달이면?",a:"관례적으로 그 달의 마지막 날인 29일을 생일로 봅니다."}]} />
      <LunarCalc />

      <SeoSection title="음력과 양력의 차이">
        <p>
          <strong>양력(태양력)</strong>은 지구가 태양을 한 바퀴 도는 약 365.25일을 기준으로 만든 달력이고,
          <strong>음력(태음태양력)</strong>은 달의 위상 변화(약 29.5일)를 기준으로 합니다.
        </p>
        <SeoList>
          <li><strong>양력</strong> — 1년 = 365일(윤년 366일). 전 세계 공통 사용. 그레고리력.</li>
          <li><strong>음력</strong> — 1년 = 354일 정도. 양력과 약 11일 차이가 나서 2~3년에 한 번 윤달을 넣어 보정.</li>
          <li><strong>윤달</strong> — 음력과 계절이 어긋나지 않게 추가하는 달. 윤달이 든 해는 음력으로 13개월.</li>
        </SeoList>
        <p>
          한국에서는 명절(설날, 추석), 제사, 생일 등에 음력을 사용하는 경우가 많습니다.
          음력 날짜는 매년 양력 기준 날짜가 달라지기 때문에, 변환기로 확인하는 것이 정확합니다.
        </p>
      </SeoSection>

      <SeoSection title="2026년 주요 음력 명절">
        <SeoList>
          <li><strong>설날</strong> — 음력 1월 1일 (양력으로 확인하려면 위 변환기를 이용하세요)</li>
          <li><strong>정월 대보름</strong> — 음력 1월 15일</li>
          <li><strong>단오</strong> — 음력 5월 5일</li>
          <li><strong>칠석</strong> — 음력 7월 7일</li>
          <li><strong>추석</strong> — 음력 8월 15일</li>
          <li><strong>동지</strong> — 양력 12월 22일경 (절기 기준)</li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="음력 양력 변환, 이런 점도 궁금하실 거예요"
        items={[
          { q: '부모님 음력 생일을 양력으로 알려면?', a: '위 변환기에 부모님의 음력 생일을 입력하면 올해 양력 날짜가 나옵니다. 음력 생일은 매년 양력 날짜가 바뀌므로, 매년 초에 한 번 확인해 두면 좋습니다.' },
          { q: '윤달에 태어난 사람은 생일이 언제인가요?', a: '관례적으로 정달(윤달이 아닌 원래 달)의 같은 날을 생일로 봅니다. 예를 들어 윤4월 15일생이면 매년 음력 4월 15일(정달)을 생일로 쇱니다.' },
          { q: '음력 30일생인데 어떤 달은 29일까지만 있어요', a: '음력은 큰달(30일)과 작은달(29일)이 번갈아 나옵니다. 30일생인데 해당 연도의 그 달이 29일까지만 있으면 29일을 생일로 봅니다.' },
          { q: '제사 날짜는 음력과 양력 중 어떤 것으로 지내나요?', a: '전통적으로 제사는 음력 날짜를 기준으로 지냅니다. 다만 최근에는 가족 편의상 양력으로 통일하는 경우도 늘고 있습니다. 가문마다 다르므로 어른께 확인하세요.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          날짜 차이를 계산하려면 <SeoLink href="/daily/dday">D-day 계산기</SeoLink>,
          만 나이가 궁금하면 <SeoLink href="/daily/age">나이 계산기</SeoLink>를 이용하세요.
          기념일은 <SeoLink href="/daily/anniversary">기념일 계산기</SeoLink>에서 100일·200일을 한번에 확인할 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
