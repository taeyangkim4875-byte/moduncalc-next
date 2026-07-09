import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import InterestCalc from "./InterestCalc";

export const metadata: Metadata = {
  title: "적금 이자 계산기 - 예금·적금 만기 수령액",
  description: "적금·예금 만기 수령액을 자동 계산합니다. 월 납입액, 이자율, 기간, 이자과세를 입력하면 세후 수령액을 바로 확인하세요.",
  alternates: { canonical: "https://moduncalc.com/savings/interest" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 이자 계산" title="적금·예금 이자 계산기" description="적금·예금 만기 시 세후 수령액을 바로 계산해 드려요.">
      <InterestCalc />
    </PageLayout>
  );
}
