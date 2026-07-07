import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import GpaCalc from "./GpaCalc";

export const metadata: Metadata = {
  title: "학점 계산기 - GPA 평점 계산",
  description: "과목별 학점과 성적을 입력하면 4.5 만점 기준 평균 평점(GPA)을 자동 계산합니다.",
  alternates: { canonical: "https://moduncalc.com/daily/gpa" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="4.5 만점 기준" title="학점 계산기" description="과목별 성적을 입력하면 평균 평점(GPA)을 바로 계산해 드려요.">
      <GpaCalc />
    </PageLayout>
  );
}
