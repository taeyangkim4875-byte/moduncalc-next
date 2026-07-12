import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import SalaryCalendar from "./SalaryCalendar";

export const metadata: Metadata = {
  title: "월급 달력 - 월급날 D-day & 오늘까지 번 돈",
  description: "월급날까지 며칠 남았는지, 이번 달 지금까지 얼마를 벌었는지 한눈에 확인하세요.",
  alternates: { canonical: "https://moduncalc.com/salary/calendar" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="연봉"
      title="월급 달력"
      description="월급날까지 D-day와 오늘까지 번 돈을 확인하세요."
    >
      <SalaryCalendar />
    </PageLayout>
  );
}
