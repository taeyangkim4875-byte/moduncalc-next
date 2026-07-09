import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import RentalCalc from "./RentalCalc";

export const metadata: Metadata = {
  title: "임대수익률 계산기 - 부동산 투자 수익률",
  description: "매매가, 보증금, 월세, 대출 조건을 입력하면 총수익률·순수익률·투자금 회수기간을 자동 계산합니다.",
  alternates: { canonical: "https://moduncalc.com/realestate/rental" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="부동산 투자 분석" title="임대수익률 계산기" description="매매가와 월세를 입력하면 총수익률·순수익률을 바로 계산해 드려요.">
      <RentalCalc />
    </PageLayout>
  );
}
