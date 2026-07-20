import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SalaryCalendar from "./SalaryCalendar";

export const metadata: Metadata = {
  title: "월급 달력 - 월급날 D-day & 오늘까지 번 돈",
  description: "월급날까지 D-몇일? 이번 달 지금까지 번 돈은? 월급 달력으로 매일 확인하세요.",
  alternates: { canonical: "https://moduncalc.com/salary/calendar" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="연봉"
      title="월급 달력"
      description="월급날까지 D-day와 오늘까지 번 돈을 확인하세요."
    >
      <CalculatorJsonLd name="월급 달력" description="월급날까지 며칠 남았는지, 이번 달 지금까지 얼마를 벌었는지 확인하세요." url="https://moduncalc.com/salary/calendar" />
      <FaqJsonLd items={[{q:"근무일은 어떻게 계산하나요?",a:"해당 월의 주말(토·일)을 제외한 평일 수를 기준으로 합니다. 공휴일은 포함하지 않습니다."},{q:"데이터는 어디에 저장되나요?",a:"브라우저의 로컬 스토리지에만 저장되며, 서버로 전송되지 않습니다."}]} />
      <SalaryCalendar />
    </PageLayout>
  );
}
