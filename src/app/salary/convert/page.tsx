import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import SalaryConverter from "./SalaryConverter";

export const metadata: Metadata = {
  title: "연봉 환산기 - 내 월급으로 ___까지 얼마나 일해야 할까?",
  description: "연봉을 입력하면 아이폰, 테슬라, 아파트 등을 사려면 며칠을 일해야 하는지 계산해 드립니다.",
  alternates: { canonical: "https://moduncalc.com/salary/convert" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="연봉"
      title="연봉 환산기"
      description="내 연봉으로 각종 물건을 사려면 얼마나 일해야 할까?"
    >
      <SalaryConverter />
    </PageLayout>
  );
}
