import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import JoblessCalculator from "./JoblessCalculator";

export const metadata: Metadata = {
  title: "2026 실업급여 계산기 - 구직급여 예상 수령액",
  description: "2026년 기준 실업급여(구직급여) 1일액, 소정급여일수, 총 수령액을 계산하세요. 상한 68,100원·하한 66,048원 자동 반영.",
  alternates: { canonical: "https://moduncalc.com/pension/jobless" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 고용보험 기준" title="실업급여 계산기" description="퇴사 후 받을 구직급여 1일액과 총 지급액을 미리 계산해 드려요.">
      <JoblessCalculator />
    </PageLayout>
  );
}
