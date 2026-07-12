import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import GpaCalc from "./GpaCalc";

export const metadata: Metadata = {
  title: "학점 계산기 - GPA 평점 계산",
  description: "과목별 학점과 성적을 입력하면 4.5 만점 기준 평균 평점(GPA)을 자동 계산합니다.",
  alternates: { canonical: "https://moduncalc.com/daily/gpa" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="4.5 만점 기준" title="학점 계산기" description="과목별 성적을 입력하면 평균 평점(GPA)을 바로 계산해 드려요.">
      <CalculatorJsonLd name="학점 계산기" description="과목별 학점과 성적을 입력하면 4.5 만점 기준 평균 평점을 자동 계산합니다." url="https://moduncalc.com/daily/gpa" />
      <FaqJsonLd items={[{q:"4.5 만점과 4.3 만점의 차이는?",a:"A+를 4.5로 보느냐 4.3으로 보느냐의 차이입니다. 대부분의 한국 대학은 4.5 만점제를 사용합니다."},{q:"재수강하면 성적이 어떻게 반영되나요?",a:"학교마다 다르지만, 대부분 새 성적으로 대체됩니다. 일부 학교는 평균 처리합니다."},{q:"졸업에 필요한 최소 평점은?",a:"보통 2.0 이상이며, 학교·학과에 따라 다릅니다."}]} />
      <GpaCalc />
    </PageLayout>
  );
}
