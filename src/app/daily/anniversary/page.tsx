import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import AnniversaryCalc from "./AnniversaryCalc";

export const metadata: Metadata = {
  title: "기념일 계산기 - 연애 100일·200일·1000일 자동 계산",
  description: "사귄 날짜를 입력하면 100일, 200일, 300일, 500일, 1000일 기념일을 자동 계산합니다. 다음 기념일까지 남은 일수도 확인.",
  alternates: { canonical: "https://moduncalc.com/daily/anniversary" },
  openGraph: {
    title: "기념일 계산기 - 연애 100일·200일·1000일 자동 계산",
    description: "사귄 날짜를 입력하면 100일, 200일, 300일, 500일, 1000일 기념일을 자동 계산합니다. 다음 기념일까지 남은 일수도 확인.",
    url: "https://moduncalc.com/daily/anniversary",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="생활" title="기념일 계산기" description="사귄 날짜를 입력하면 주요 기념일을 자동 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '기념일', href: '/daily/anniversary' }]} />
      <CalculatorJsonLd name="기념일 계산기" description="사귄 날짜를 입력하면 100일, 200일, 300일, 500일, 1000일 기념일을 자동 계산합니다." url="https://moduncalc.com/daily/anniversary" />
      <FaqJsonLd items={[{q:"기념일은 사귄 날을 1일로 세나요?",a:"네, 한국에서는 사귄 날을 1일로 세는 것이 일반적입니다. 예를 들어 1월 1일에 사귀면 4월 10일이 100일입니다."},{q:"1000일은 몇 년 몇 개월인가요?",a:"1000일은 약 2년 8~9개월입니다. 정확한 날짜는 시작일에 따라 달라지며, 이 계산기에서 자동으로 확인할 수 있습니다."}]} />
      <AnniversaryCalc />

      <SeoSection title="기념일은 어떻게 세나요?">
        <p>
          한국에서 연애 기념일을 셀 때는 <strong>사귄 날을 1일</strong>로 봅니다.
          예를 들어 1월 1일에 사귀기 시작했다면, 그날이 1일째이므로
          100일째는 99일 후인 <strong>4월 10일</strong>이 됩니다.
        </p>
        <SeoList>
          <li><strong>100일</strong> — 시작일 + 99일. 한국 커플 문화의 대표 기념일.</li>
          <li><strong>200일</strong> — 시작일 + 199일. 100일 다음 주요 기념일.</li>
          <li><strong>300일</strong> — 시작일 + 299일. 1주년 전 마지막 백일 단위.</li>
          <li><strong>500일</strong> — 약 1년 4~5개월. 기념하는 커플이 많습니다.</li>
          <li><strong>1주년</strong> — 정확히 같은 월일 (365일 또는 366일 후).</li>
          <li><strong>1000일</strong> — 약 2년 9개월. 장기 연애의 상징적 날짜.</li>
        </SeoList>
        <p>
          주의할 점은 <strong>D-day 방식(0일 시작)과 기념일 방식(1일 시작)은 1일 차이</strong>가 있습니다.
          이 계산기는 한국식 기념일 방식(1일 시작)으로 계산합니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="기념일 계산, 이런 점도 궁금하실 거예요"
        items={[
          { q: '100일과 1주년 중 어떤 게 더 중요한가요?', a: '문화적으로 둘 다 중요합니다. 100일은 한국 특유의 기념일 문화이고, 1주년은 세계 공통입니다. 커플마다 의미를 부여하는 기준이 다르니 서로 대화로 정하는 게 좋습니다.' },
          { q: '기념일에 윤년은 어떻게 반영되나요?', a: '이 계산기는 윤년을 자동으로 반영합니다. 2월 29일이 포함된 기간이면 366일로, 아니면 365일로 정확하게 계산합니다.' },
          { q: '해외에서도 100일 기념일을 기념하나요?', a: '100일 기념일은 한국 특유의 문화입니다. 서양에서는 보통 월 단위(1개월, 6개월)나 연 단위(1주년)로 기념합니다. 일본에서도 100일 기념은 드뭅니다.' },
          { q: '결혼기념일도 같은 방식으로 계산하나요?', a: '결혼기념일은 보통 연 단위로 기념합니다(1주년, 5주년 등). 날짜 차이를 일 단위로 알고 싶으면 이 계산기를, 주년 단위 기념일은 D-day 계산기를 함께 활용하세요.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          두 날짜 사이의 정확한 일수를 구하려면 <SeoLink href="/daily/dday">D-day 계산기</SeoLink>가 편하고,
          아기 백일·돌 기념일이 궁금하면 <SeoLink href="/daily/baby100">아기 100일 계산기</SeoLink>를 이용하세요.
          만 나이가 헷갈릴 때는 <SeoLink href="/daily/age">나이 계산기</SeoLink>를 확인해 보세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
