import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import SalaryCalendar from "./SalaryCalendar";

export const metadata: Metadata = {
  title: "월급 달력 - 월급날 D-day & 오늘까지 번 돈",
  description: "월급날까지 D-몇일? 이번 달 지금까지 번 돈은? 월급 달력으로 매일 확인하세요.",
  alternates: { canonical: "https://moduncalc.com/salary/calendar" },
  openGraph: {
    title: "월급 달력 - 월급날 D-day & 오늘까지 번 돈",
    description: "월급날까지 D-몇일? 이번 달 지금까지 번 돈은? 월급 달력으로 매일 확인하세요.",
    url: "https://moduncalc.com/salary/calendar",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="연봉"
      title="월급 달력"
      description="월급날까지 D-day와 오늘까지 번 돈을 확인하세요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }, { name: '월급 달력', href: '/salary/calendar' }]} />
      <CalculatorJsonLd name="월급 달력" description="월급날까지 며칠 남았는지, 이번 달 지금까지 얼마를 벌었는지 확인하세요." url="https://moduncalc.com/salary/calendar" />
      <FaqJsonLd items={[{q:"근무일은 어떻게 계산하나요?",a:"해당 월의 주말(토·일)을 제외한 평일 수를 기준으로 합니다. 공휴일은 포함하지 않습니다."},{q:"데이터는 어디에 저장되나요?",a:"브라우저의 로컬 스토리지에만 저장되며, 서버로 전송되지 않습니다."}]} />
      <SalaryCalendar />

      <SeoSection title="월급날까지 며칠, 생각보다 위로가 됩니다">
        <p>월초에 카드값 빠져나가고 나면 월급날이 기다려지잖아요. 25일 월급이면 매달 1일부터 카운트다운 시작인 거예요. 근데 진짜 재밌는 건, 오늘까지 내가 얼마를 벌었는지 보는 겁니다. 월급 300만원이면 근무일 22일 기준 하루에 약 13.6만원을 벌고 있거든요.</p>
        <p>월급날이 주말이나 공휴일이면 전 영업일에 지급되는 게 일반적입니다. 2026년에는 25일이 일요일인 달이 1번, 토요일인 달이 2번 있어요. 10월은 25일이 일요일이라 23일 금요일에 들어올 겁니다.</p>
      </SeoSection>

      <SeoFaq
        title="월급 관련 궁금한 점"
        items={[
          { q: '월급이 늦게 들어오면 어떻게 하나요?', a: '근로기준법상 임금은 정해진 날짜에 지급해야 합니다. 반복적으로 지연되면 노동청(1350)에 신고할 수 있어요.' },
          { q: '주말에 입금되는 경우도 있나요?', a: '은행 영업일 기준이라 주말이나 공휴일에는 입금 처리가 안 됩니다. 보통 전 영업일에 지급하지만, 회사 정책에 따라 다를 수 있어요.' },
          { q: '인턴이나 수습 기간에도 월급날이 같나요?', a: '네, 수습 기간이라도 급여 지급일은 동일합니다. 다만 수습 중 급여가 최저임금의 90%까지 감액될 수 있어요.' },
        ]}
      />
    </PageLayout>
  );
}
