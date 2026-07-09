import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ElectricCalc from "./ElectricCalc";

export const metadata: Metadata = {
  title: "전기요금 계산기 - 2026 누진제 요금 계산",
  description: "2026년 전기요금 누진제 기준으로 월 전기요금을 계산합니다. 사용량과 시기를 입력하면 구간별 요금과 총 납부액을 확인하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/electric" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 전기요금 기준" title="전기요금 계산기" description="월 사용량을 입력하면 누진제 적용 전기요금을 바로 계산해 드려요.">
      <ElectricCalc />
    </PageLayout>
  );
}
