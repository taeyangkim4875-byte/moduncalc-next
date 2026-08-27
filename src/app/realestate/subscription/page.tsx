import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import SubscriptionCalc from "./SubscriptionCalc";

export const metadata: Metadata = {
  title: "청약 가점 계산기 - 무주택 · 부양가족 · 청약통장 가점 (2026)",
  description: "청약 가점을 자동 계산합니다. 무주택 기간, 부양가족 수, 청약통장 가입 기간별 점수 확인.",
  alternates: { canonical: "https://moduncalc.com/realestate/subscription" },
  openGraph: {
    title: "청약 가점 계산기 - 무주택 · 부양가족 · 청약통장 가점 (2026)",
    description: "청약 가점을 자동 계산합니다. 무주택 기간, 부양가족 수, 청약통장 가입 기간별 점수 확인.",
    url: "https://moduncalc.com/realestate/subscription",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="부동산" title="청약 가점 계산기" description="무주택 기간, 부양가족 수, 청약통장 가입 기간으로 가점을 계산합니다. (84점 만점)">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '부동산', href: '/realestate' }, { name: '청약 가점', href: '/realestate/subscription' }]} />
      <CalculatorJsonLd name="청약 가점 계산기" description="청약 가점을 자동 계산합니다. 무주택 기간, 부양가족 수, 청약통장 가입 기간별 점수 확인. 2026년 기준." url="https://moduncalc.com/realestate/subscription" />
      <FaqJsonLd items={[
        {q:"청약 가점제란 무엇인가요?",a:"청약 가점제는 무주택 기간(32점), 부양가족 수(35점), 청약통장 가입 기간(17점) 등 3개 항목의 점수를 합산하여 총 84점 만점으로 당첨자를 선정하는 제도입니다."},
        {q:"가점제와 추첨제의 차이는 무엇인가요?",a:"가점제는 무주택 기간, 부양가족 수, 통장 가입 기간의 점수 합계가 높은 순으로 당첨자를 선정합니다. 추첨제는 신청자 중 무작위로 당첨자를 선정합니다. 전용 85m2 이하 민영주택은 가점제 40~100% 적용됩니다."},
        {q:"부양가족 수는 어떻게 산정하나요?",a:"배우자, 직계존속(부모·조부모), 직계비속(자녀) 중 세대원으로 등록된 가족 수입니다. 배우자는 주민등록 분리 시에도 인정됩니다. 직계존속은 3년 이상 동일 세대, 미혼 자녀는 30세 미만이어야 합니다."},
      ]} />
      <SubscriptionCalc />

      <SeoSection title="청약 가점, 1점 차이로 떨어지는 현실">
        <p>
          서울 인기 단지 청약 결과를 보면 커트라인이 60점대 후반에서 70점대인 경우가 많습니다.
          84점 만점에서 이 정도면 사실상 무주택 기간 15년 이상, 부양가족 4~5명, 통장 15년 이상은 있어야 되는 수준이에요.
          1점 차이로 당락이 갈리는 걸 보면 점수 관리가 진짜 중요하다는 걸 느낍니다.
        </p>
        <p>
          무주택 기간은 만 30세부터 기산하는데, 결혼한 경우 혼인신고일부터 인정돼요.
          15년 이상이면 최대 32점. 부양가족은 배우자 포함해서 세대원으로 등록된 직계존비속을 세는 건데,
          부모님은 3년 이상 같은 세대에 살아야 인정됩니다. 6명 이상이면 만점 35점.
        </p>
        <p>
          청약통장 점수는 가입 기간으로만 결정되고, 납입 금액은 상관없습니다.
          15년 이상이면 만점 17점인데, 이건 일찍 만들어둬야 유리한 항목이에요.
          자녀 명의로 미리 만들어두는 분들도 많습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="청약 가점 실전 Q&A"
        items={[
          { q: '부양가족에 배우자 부모님도 포함되나요?', a: '배우자의 직계존속(장인·장모, 시부모)도 3년 이상 같은 세대에 등재되어 있으면 부양가족으로 인정됩니다. 다만 배우자 부모가 주택을 소유하고 있으면 제외돼요.' },
          { q: '미성년 자녀도 부양가족에 들어가나요?', a: '네. 만 30세 미만 미혼 자녀는 세대원이면 부양가족으로 인정됩니다. 태아는 포함되지 않고, 출생신고 후부터 적용돼요.' },
          { q: '가점이 낮으면 아예 방법이 없나요?', a: '추첨제 물량을 노리면 됩니다. 전용 85㎡ 이하 민영주택도 가점제 비율이 40~75%이므로 나머지는 추첨입니다. 가점이 낮다면 비인기 지역이나 대형 평형을 노려보세요.' },
          { q: '청약통장 금액을 매달 얼마씩 넣어야 하나요?', a: '가점 점수에는 납입 금액이 영향을 주지 않습니다. 다만 국민주택 청약 시에는 납입 횟수와 총액이 중요하므로, 매달 최소 2만원이라도 빠지지 않게 넣어두는 게 좋아요.' },
        ]}
      />
    </PageLayout>
  );
}
