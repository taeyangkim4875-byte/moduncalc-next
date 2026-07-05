import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import SeveranceCalc from "./SeveranceCalc";

export const metadata: Metadata = {
  title: "퇴직금 계산기 - 예상 퇴직금 조회 | 모든 계산기",
  description: "입사일·퇴사일·월급만 입력하면 예상 퇴직금을 바로 계산합니다. 1일 평균임금, 재직기간 자동 산출.",
  alternates: { canonical: "https://moduncalc.com/salary/severance" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="근로기준법 기준" title="퇴직금 계산기" description="재직기간과 급여 정보를 입력하면 예상 퇴직금을 계산해 드려요.">
      <SeveranceCalc />
    </PageLayout>
  );
}
