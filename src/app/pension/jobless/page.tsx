import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import JoblessCalculator from "./JoblessCalculator";

export const metadata: Metadata = {
  title: "2026 실업급여 계산기 - 구직급여 예상 수령액",
  description: "퇴사하면 실업급여 얼마 받을 수 있을까? 나이·근무기간 입력하면 예상 수령액·기간 바로 계산. 2026 상한 반영.",
  alternates: { canonical: "https://moduncalc.com/pension/jobless" },
  openGraph: { title: "2026 실업급여 계산기 - 구직급여 예상 수령액 조회", description: "퇴사 후 받을 수 있는 실업급여 금액과 수급 기간을 계산. 2026년 상한·하한 반영. 자발적 퇴사 수급 조건도 안내.", url: "https://moduncalc.com/pension/jobless" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 고용보험 기준" title="실업급여 계산기" description="퇴사 후 받을 구직급여 1일액과 총 지급액을 미리 계산해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연금', href: '/pension' }, { name: '실업급여', href: '/pension/jobless' }]} />
      <CalculatorJsonLd name="실업급여 계산기" description="2026년 기준 실업급여(구직급여) 1일액, 소정급여일수, 총 수령액을 계산하세요." url="https://moduncalc.com/pension/jobless" />
      <FaqJsonLd items={[{q:"자발적 퇴사도 실업급여를 받을 수 있나요?",a:"원칙적으로 불가하지만, 임금체불·직장 내 괴롭힘·통근 곤란 등 정당한 사유가 있으면 수급 가능합니다."},{q:"실업급여는 얼마나 오래 받을 수 있나요?",a:"나이와 고용보험 가입기간에 따라 120~270일입니다."},{q:"실업급여 신청은 어디서 하나요?",a:"거주지 관할 고용센터에 방문하거나, 고용24 온라인으로 신청할 수 있습니다."}]} />
      <JoblessCalculator />

      <SeoSection title="실업급여, 받기 전에 이것만은 알아두세요">
        <p>
          회사를 나오고 나서야 실업급여 조건을 찾아보는 사람이 대부분인데, 사실 퇴사 전에 확인해야 할 게 있습니다.
          가장 중요한 건 피보험단위기간 180일인데, 이게 단순히 6개월 근무가 아니에요.
          주말·공휴일·유급휴일을 포함해서 실제 보수 지급 기준일 180일을 채워야 합니다.
        </p>
        <p>
          자발적 퇴사는 원칙적으로 실업급여 대상이 아닙니다.
          근데 임금체불, 최저임금 미달, 직장 내 괴롭힘, 통근 시간 3시간 이상 같은 정당한 사유가 있으면
          자발적 퇴사도 수급 가능해요. 이직확인서에 퇴사 사유가 어떻게 적히느냐가 핵심입니다.
        </p>
        <p>
          2026년 기준 실업급여 1일 상한액은 66,000원이고, 하한액은 최저임금의 80%인 63,104원입니다.
          사실상 대부분의 사람이 하한액과 상한액 사이에서 받게 되는 구조예요.
          수급 기간은 나이와 가입기간에 따라 120일에서 최대 270일까지 차이가 납니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="실업급여 실무 Q&A"
        items={[
          { q: '권고사직이면 무조건 실업급여를 받을 수 있나요?', a: '권고사직은 비자발적 퇴사로 분류되므로 기본 수급 요건(피보험단위기간 180일)만 충족하면 받을 수 있습니다. 다만 중대한 귀책사유로 해고된 경우는 제외될 수 있어요.' },
          { q: '실업급여 받으면서 알바를 해도 되나요?', a: '주 15시간 미만, 월 60시간 미만의 단시간 근로는 가능합니다. 다만 취업한 날은 실업급여가 지급되지 않고, 미신고 시 부정수급으로 3배 환수될 수 있어요.' },
          { q: '신청은 퇴사 후 언제까지 해야 하나요?', a: '퇴사일 다음 날부터 12개월 이내에 신청해야 합니다. 이 기간이 지나면 남은 수급일수가 있어도 받을 수 없으니 빨리 신청하세요.' },
          { q: '실업급여 수급 중 취업하면 나머지는 못 받나요?', a: '조기에 재취업하면 남은 수급일수의 절반을 조기재취업수당으로 일시금 수령할 수 있습니다. 남은 일수가 많을수록 유리해요.' },
        ]}
      />
    </PageLayout>
  );
}
