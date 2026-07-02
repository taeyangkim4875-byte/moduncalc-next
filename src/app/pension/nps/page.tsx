import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PensionCalculator from "./PensionCalculator";

export const metadata: Metadata = {
  title: "2026 국민연금 계산기 - 예상 월 수령액",
  description: "지금 소득과 가입기간으로 노후에 매달 받을 국민연금 예상액을 계산하세요. 2026 연금개혁 반영.",
  alternates: { canonical: "https://moduncalc.com/pension/nps" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 국민연금 개혁 반영" title="국민연금 계산기" description="지금 소득·가입기간으로 노후에 매월 받을 예상 연금액을 알려드려요.">
      <PensionCalculator />
    </PageLayout>
  );
}
