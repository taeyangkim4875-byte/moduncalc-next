import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import LifetimeCalc from "./LifetimeCalc";
export const metadata: Metadata = { title: "평생 근로소득 계산기 - 나는 평생 얼마를 벌까?", description: "은퇴까지 총 얼마를 벌 수 있을까? 현재 월급 기준 평생 근로소득 시뮬레이션. 세전·세후 모두.", alternates: { canonical: "https://moduncalc.com/salary/lifetime" },
  openGraph: {
    title: "평생 근로소득 계산기 - 나는 평생 얼마를 벌까?",
    description: "은퇴까지 총 얼마를 벌 수 있을까? 현재 월급 기준 평생 근로소득 시뮬레이션. 세전·세후 모두.",
    url: "https://moduncalc.com/salary/lifetime",
  },};
export default function Page() {
  return (
    <PageLayout eyebrow="평생 소득 시뮬레이션" title="평생 근로소득 계산기" description="나는 은퇴까지 총 얼마를 벌 수 있을까요?">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }, { name: '평생 근로소득', href: '/salary/lifetime' }]} />
      <CalculatorJsonLd name="평생 근로소득 계산기" description="현재 월급과 임금 상승률로 은퇴까지 총 얼마를 벌 수 있는지 계산하세요." url="https://moduncalc.com/salary/lifetime" />
      <FaqJsonLd items={[{q:"임금 상승률은 어느 정도가 현실적인가요?",a:"한국 평균 임금상승률은 연 3~5% 수준입니다. 보수적으로 3%를 추천합니다."},{q:"세후 실수령은 정확한가요?",a:"간이세율 기반 추정치입니다. 정확한 세후 금액은 매년 소득에 따라 달라집니다."},{q:"이직하면 어떻게 되나요?",a:"이직 시 연봉 상승을 반영하려면 현재 연봉을 이직 후 기준으로 입력하세요."}]} />
      <LifetimeCalc />

      <SeoSection title="평생 번 돈, 생각보다 많을까 적을까">
        <p>30세에 연봉 4,000만원으로 시작해서 60세까지 일한다고 해봐요. 임금 상승률 3%를 적용하면 평생 근로소득이 세전 약 19억원입니다. 많아 보이지만 세금, 4대보험 떼면 14억원 정도고, 여기서 주거비·생활비·교육비 빼면 순수 저축은 3~4억이 현실이에요.</p>
        <p>근데 이직하면 달라집니다. 한국 직장인 평균 이직 시 연봉 상승률이 10~15%라는 통계가 있어요. 3년마다 이직으로 15% 올리면 같은 기간에 평생 소득이 30% 이상 차이 납니다. 물론 이직이 항상 정답은 아니지만, 숫자로 보면 커리어 관리가 왜 중요한지 체감돼요.</p>
      </SeoSection>

      <SeoFaq
        title="평생 소득 관련 궁금한 점"
        items={[
          { q: '퇴직금은 포함되어 있나요?', a: '이 계산기는 월급 기준이라 퇴직금은 별도입니다. 퇴직금은 연봉의 약 8.3%(1/12)이니까 평생 소득의 8% 정도를 추가로 받는다고 보면 돼요.' },
          { q: '공무원이나 교사도 같은 방식으로 계산되나요?', a: '공무원은 호봉제라 임금 상승 패턴이 다릅니다. 초반에는 민간보다 적지만 후반에 안정적이라, 평생 소득 총액은 비슷한 경우가 많아요.' },
          { q: '인플레이션을 고려하면 실질 가치는 다르지 않나요?', a: '맞습니다. 물가 상승률 2.5%를 빼면 실질 임금 상승률은 0.5~2.5%예요. 30년 후 1억은 지금의 4,500만원 정도 가치입니다.' },
        ]}
      />
    </PageLayout>
  );
}
