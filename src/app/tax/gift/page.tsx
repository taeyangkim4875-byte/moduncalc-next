import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import GiftTaxCalc from "./GiftTaxCalc";

export const metadata: Metadata = {
  title: "증여세 계산기 - 가족 간 증여세 자동 계산",
  description: "증여재산가액과 증여자 관계를 입력하면 증여세를 자동 계산합니다. 배우자·자녀 공제와 혼인출산공제, 신고세액공제까지 반영.",
  alternates: { canonical: "https://moduncalc.com/tax/gift" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 증여세 기준" title="증여세 계산기" description="증여 재산가액과 관계를 입력하면 납부할 증여세를 계산해 드려요.">
      <GiftTaxCalc />
    </PageLayout>
  );
}
