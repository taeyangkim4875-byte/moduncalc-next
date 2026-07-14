import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import PensionCalculator from "./PensionCalculator";

export const metadata: Metadata = {
  title: "2026 국민연금 계산기 - 예상 월 수령액",
  description: "지금 소득과 가입기간으로 노후에 매달 받을 국민연금 예상액을 계산하세요. 2026 연금개혁 반영.",
  alternates: { canonical: "https://moduncalc.com/pension/nps" },
  openGraph: { title: "2026 국민연금 계산기 - 예상 월 수령액 조회", description: "현재 소득과 가입기간으로 노후 국민연금 예상 수령액을 계산. 2026 연금개혁 보험료율 9.5% 반영.", url: "https://moduncalc.com/pension/nps" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 국민연금 개혁 반영" title="국민연금 계산기" description="지금 소득·가입기간으로 노후에 매월 받을 예상 연금액을 알려드려요.">
      <CalculatorJsonLd name="국민연금 계산기" description="지금 소득과 가입기간으로 노후에 매달 받을 국민연금 예상액을 계산하세요." url="https://moduncalc.com/pension/nps" />
      <FaqJsonLd items={[{q:"10년 미만 가입하면 연금을 못 받나요?",a:"10년 미만이면 노령연금 대신 반환일시금으로 받게 됩니다."},{q:"연금을 조기에 받을 수 있나요?",a:"가입기간 10년 이상이면 최대 5년 앞당겨 받을 수 있지만, 연 6%씩 감액됩니다."},{q:"가입기간이 길수록 유리한가요?",a:"네, 가입기간이 길수록 연금액이 비례하여 증가합니다."}]} />
      <PensionCalculator />
    </PageLayout>
  );
}
