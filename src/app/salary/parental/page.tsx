import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import ParentalCalc from "./ParentalCalc";
export const metadata: Metadata = { title: "육아휴직 급여 계산기 - 6+6 부모육아휴직제 반영", description: "육아휴직하면 월급 얼마 받을까? 2026 하반기 상한 250만원 반영. 6+6 부모휴직 최대 450만원.", alternates: { canonical: "https://moduncalc.com/salary/parental" },
  openGraph: {
    title: "육아휴직 급여 계산기 - 6+6 부모육아휴직제 반영",
    description: "육아휴직하면 월급 얼마 받을까? 2026 하반기 상한 250만원 반영. 6+6 부모휴직 최대 450만원.",
    url: "https://moduncalc.com/salary/parental",
  },};
export default function Page() { return (<PageLayout eyebrow="2026 육아휴직 기준" title="육아휴직 급여 계산기" description="월 급여와 휴직 기간으로 예상 급여를 계산해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }, { name: '육아휴직', href: '/salary/parental' }]} /><CalculatorJsonLd name="육아휴직 급여 계산기" description="2026년 육아휴직 급여를 계산. 6+6 부모육아휴직제, 통상임금 기준." url="https://moduncalc.com/salary/parental" /><FaqJsonLd items={[{q:"6+6 부모육아휴직제란?",a:"부모 모두 육아휴직 사용 시 처음 6개월간 통상임금 100%(상한 월 450만원)를 지급하는 제도입니다."},{q:"사후지급금이 없어졌나요?",a:"2025년부터 사후지급금(25%) 제도가 폐지되어 매월 전액 수령합니다."},{q:"최대 몇 개월까지 가능한가요?",a:"자녀 1명당 부모 각각 최대 1년(12개월)까지 가능합니다."}]} /><ParentalCalc />

      <SeoSection title="육아휴직 급여, 생각보다 계산이 복잡하더라">
        <p>
          둘째 낳고 육아휴직 신청하면서 처음 알았는데, 급여가 매월 같은 금액이 아닙니다.
          처음 3개월은 통상임금의 80%(상한 150만원), 나머지 기간은 통상임금의 50%(상한 120만원)가 기본이에요.
          근데 6+6 부모육아휴직제를 쓰면 완전히 달라집니다.
        </p>
        <p>
          부부가 같은 자녀에 대해 육아휴직을 사용하면 처음 6개월간 통상임금 100%를 받을 수 있어요.
          상한액은 1개월차 200만원에서 6개월차 450만원까지 단계적으로 올라갑니다.
          솔직히 통상임금이 300만원 넘는 분은 상한에 걸려서 100% 다 못 받는 경우가 많긴 해요.
        </p>
        <p>
          2025년부터 사후지급금 제도가 폐지된 건 진짜 큰 변화입니다.
          예전에는 급여의 25%를 복직 후 6개월 뒤에 줬는데, 이제 매월 전액 바로 받아요.
          육아휴직 중에 생활비가 빠듯해서 대출까지 받았다는 사람 주변에 꽤 있었거든요.
        </p>
      </SeoSection>

      <SeoFaq
        title="육아휴직 급여 실무 Q&A"
        items={[
          { q: '6+6 부모육아휴직제, 아빠가 먼저 써도 되나요?', a: '네. 엄마·아빠 순서 상관없이 부모 모두 같은 자녀에 대해 육아휴직을 사용하면 6+6 혜택이 적용됩니다. 동시에 쓸 필요도 없어요.' },
          { q: '통상임금에 상여금도 포함되나요?', a: '정기적·일률적으로 지급되는 상여금은 통상임금에 포함됩니다. 명절 상여도 매년 고정 지급이면 포함될 수 있으니 회사 취업규칙을 확인하세요.' },
          { q: '육아휴직 중에 다른 일을 해도 되나요?', a: '원칙적으로 취업은 금지입니다. 적발되면 급여가 중단되고 환수될 수 있어요. 다만 주 15시간 미만의 단시간 근로는 사업주 동의 하에 가능합니다.' },
          { q: '1년 넘게 육아휴직을 쓸 수 있나요?', a: '자녀 1명당 부모 각각 최대 1년(12개월)까지 가능합니다. 자녀가 2명이면 각 자녀에 대해 별도로 1년씩 쓸 수 있어요.' },
        ]}
      />
    </PageLayout>
  );
}
