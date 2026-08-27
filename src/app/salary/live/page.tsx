import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import LiveCounter from "./LiveCounter";
export const metadata: Metadata = { title: "월급 카운터 - 지금 이 순간 벌고 있는 돈", description: "지금 이 순간에도 돈을 벌고 있다! 연봉 입력하면 초당 버는 돈을 실시간으로 보여드려요.", alternates: { canonical: "https://moduncalc.com/salary/live" },
  openGraph: {
    title: "월급 카운터 - 지금 이 순간 벌고 있는 돈",
    description: "지금 이 순간에도 돈을 벌고 있다! 연봉 입력하면 초당 버는 돈을 실시간으로 보여드려요.",
    url: "https://moduncalc.com/salary/live",
  },};
export default function Page() {
  return (
    <PageLayout eyebrow="연봉" title="월급 카운터" description="지금 이 순간에도 얼마를 벌고 있는지 확인해 보세요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }, { name: '월급 카운터', href: '/salary/live' }]} />
      <CalculatorJsonLd name="월급 카운터" description="연봉을 입력하면 초 단위로 돈이 올라갑니다." url="https://moduncalc.com/salary/live" />
      <FaqJsonLd items={[{q:"세전 기준인가요?",a:"네, 세전 연봉 기준입니다. 실수령 기준으로 보려면 연봉 실수령액 계산기를 먼저 이용하세요."},{q:"근무일수 252일은 어떻게 나온 건가요?",a:"연 365일에서 주말(104일)과 공휴일(약 15일)을 제외한 일반적인 근무일수입니다."}]} />
      <LiveCounter />

      <SeoSection title="화장실 가는 동안에도 돈을 벌고 있어요">
        <p>연봉 4,000만원이면 초당 약 5.5원을 벌고 있습니다. 화장실 다녀오는 5분 동안 1,650원, 점심시간 1시간이면 19,800원이에요. 솔직히 이렇게 보면 야근할 때 위로가 좀 됩니다.</p>
        <p>재밌는 건, 회의 시간을 돈으로 환산해보면 생각이 달라져요. 5명이 1시간 회의하면 인건비만 최소 10만원 이상입니다. 그 회의가 이메일 하나로 대체됐으면 10만원을 아낀 거예요. 회사 입장에서 회의를 줄이려는 이유가 있습니다.</p>
      </SeoSection>

      <SeoFaq
        title="월급 카운터 관련 궁금한 점"
        items={[
          { q: '근무시간 외에도 돈이 올라가나요?', a: '이 카운터는 연봉을 365일 24시간으로 나눈 개념이에요. 실제로는 근무일 기준이지만, 재미로 보는 용도라 24시간 돌아갑니다.' },
          { q: '연봉 1억이면 초당 얼마인가요?', a: '초당 약 13.7원입니다. 1분에 822원, 1시간에 49,300원이에요. 커피 한 잔(5,000원)을 벌려면 약 6분이 걸립니다.' },
          { q: '이거 보면서 뭐 하나요?', a: '월급날까지 카운터 틀어놓는 분들이 많아요. 숫자가 올라가는 걸 보면 나름 동기부여가 된다는 후기가 있습니다. 연봉 협상 전에 현실 체감용으로도 써보세요.' },
        ]}
      />
    </PageLayout>
  );
}
