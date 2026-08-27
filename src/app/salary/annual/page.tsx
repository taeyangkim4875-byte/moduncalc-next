import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import AnnualCalc from "./AnnualCalc";

export const metadata: Metadata = {
  title: "연차 계산기 - 입사일 기준 연차 일수 자동 계산",
  description: "내 연차 며칠 남았을까? 입사일만 입력하면 발생 연차·잔여 연차 바로 확인. 근로기준법 기준.",
  alternates: { canonical: "https://moduncalc.com/salary/annual" },
  openGraph: {
    title: "연차 계산기 - 입사일 기준 연차 일수 자동 계산",
    description: "내 연차 며칠 남았을까? 입사일만 입력하면 발생 연차·잔여 연차 바로 확인. 근로기준법 기준.",
    url: "https://moduncalc.com/salary/annual",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="근로기준법 기준" title="연차 계산기" description="입사일을 입력하면 발생 연차 일수를 알려드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }, { name: '연차', href: '/salary/annual' }]} />
      <CalculatorJsonLd name="연차 계산기" description="입사일만 입력하면 현재 발생 연차 일수를 자동 계산. 근로기준법 기준." url="https://moduncalc.com/salary/annual" />
      <FaqJsonLd items={[{q:"1년 미만인데 연차가 있나요?",a:"네, 1개월 개근 시 1일의 유급휴가(월차)가 발생합니다. 최대 11일."},{q:"연차는 언제 소멸하나요?",a:"발생일로부터 1년 이내에 사용하지 않으면 소멸됩니다."},{q:"연차수당은 어떻게 계산하나요?",a:"미사용 연차 × 1일 통상임금으로 계산됩니다."}]} />
      <AnnualCalc />

      <SeoSection title="근로기준법이 정한 연차 발생 기준">
        <p>
          연차유급휴가는 <strong>근로기준법 제60조</strong>에 규정된 법정 휴가입니다.
          상시 5인 이상 사업장에서 4주 평균 주 15시간 이상 근무하는 근로자라면
          정규직·계약직·아르바이트를 가리지 않고 모두 대상입니다.
        </p>
        <SeoList>
          <li><strong>입사 1년 미만</strong> — 1개월 개근할 때마다 1일씩, 최대 11일이 발생합니다.</li>
          <li><strong>1년 이상 (출근율 80% 이상)</strong> — 연 15일이 한 번에 발생합니다.</li>
          <li><strong>3년 이상</strong> — 매 2년마다 1일씩 가산됩니다(3년차 16일, 5년차 17일···).</li>
          <li><strong>상한 25일</strong> — 근속 21년 이상이면 25일에서 더 늘지 않습니다.</li>
        </SeoList>
        <p>
          출근율이 80% 미만이면 연 15일이 아니라 개근한 1개월당 1일씩만 발생합니다.
          다만 육아휴직 기간과 업무상 재해로 인한 휴업기간은 출근한 것으로 간주합니다.
        </p>
      </SeoSection>

      <SeoSection title="연차수당 계산 공식">
        <p>
          연차를 다 쓰지 못하고 소멸했거나 퇴사하게 되면, 남은 일수만큼 <strong>연차미사용수당</strong>을
          금전으로 받습니다. 기준이 되는 것은 평균임금이 아니라 <strong>통상임금</strong>입니다.
        </p>
        <SeoFormula>
          <div>① 시간당 통상임금 = 월 통상임금 ÷ 월 소정근로시간(주 40시간이면 209시간)</div>
          <div>② 1일 통상임금 = 시간당 통상임금 × 1일 소정근로시간(보통 8시간)</div>
          <div>③ 연차수당 = 1일 통상임금 × 미사용 연차 일수</div>
        </SeoFormula>
        <p>
          예를 들어 월 통상임금이 300만원인 근로자의 시간당 통상임금은 약 14,354원,
          1일 통상임금은 약 114,832원입니다. 연차 5일이 남았다면 약 57만원의 연차수당이 발생합니다.
          여기서 통상임금에는 기본급과 정기수당이 포함되지만, 연장·야간근로수당처럼
          실제 근로에 따라 변동하는 금액은 빠집니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="연차에 대해 이런 점도 궁금하실 거예요"
        items={[
          { q: '회사가 연차 사용을 강제로 지정할 수 있나요?', a: '근로기준법 제61조의 연차사용촉진제도를 적법하게 거친 경우에는 가능합니다. 회사가 연차 소멸 6개월 전에 미사용 일수를 서면으로 알리고 사용 시기 지정을 요구했는데도 근로자가 응하지 않으면, 회사가 사용 시기를 지정할 수 있고 그 후 남은 연차에 대해서는 수당 지급 의무가 사라집니다. 절차 중 하나라도 서면으로 이행되지 않았다면 수당을 청구할 수 있습니다.' },
          { q: '연차는 입사일 기준인가요, 회계연도 기준인가요?', a: '법 원칙은 입사일 기준입니다. 다만 노무 관리 편의를 위해 회계연도(보통 1월 1일) 기준으로 일괄 부여하는 회사도 많습니다. 회계연도 기준을 쓰더라도 퇴직 시점에는 입사일 기준으로 정산했을 때보다 근로자에게 불리해서는 안 되므로, 차이가 나면 그만큼 정산받을 수 있습니다.' },
          { q: '5인 미만 사업장도 연차가 있나요?', a: '아닙니다. 연차유급휴가는 상시 근로자 5인 이상 사업장에만 적용됩니다. 5인 미만 사업장은 연차, 연장·야간·휴일근로 가산수당, 부당해고 구제신청 규정이 적용되지 않습니다. 다만 주휴수당과 최저임금, 퇴직금은 사업장 규모와 무관하게 적용됩니다.' },
          { q: '퇴사할 때 남은 연차는 어떻게 되나요?', a: '퇴사 시점까지 미사용한 연차는 전부 연차수당으로 정산받아야 합니다. 회사가 연차 사용을 강요하며 수당 지급을 거부할 수는 없습니다. 미지급 시 임금체불에 해당하며, 퇴직일로부터 14일 이내에 지급되어야 합니다. 소멸시효는 3년입니다.' },
        ]}
      />

      <SeoSection title="함께 확인하면 좋은 계산기">
        <p>
          연차수당의 기준이 되는 통상임금은 급여 구성에 따라 달라집니다.
          내 세전·세후 급여 구조를 먼저 확인하려면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>가 도움이 되고,
          퇴사를 준비 중이라면 미사용 연차수당이 평균임금에 포함되므로{' '}
          <SeoLink href="/salary/severance">퇴직금 계산기</SeoLink>도 함께 돌려보세요.
          근로자의 법정 권리 전반은 <SeoLink href="/guide/4-insurance">4대보험 완전 정리</SeoLink>와{' '}
          <SeoLink href="/guide/severance-pay">퇴직금 계산법 정리</SeoLink>에서 이어서 확인할 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
