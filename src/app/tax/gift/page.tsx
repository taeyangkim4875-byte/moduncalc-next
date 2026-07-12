import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import GiftTaxCalc from "./GiftTaxCalc";

export const metadata: Metadata = {
  title: "증여세 계산기 - 가족 간 증여세 자동 계산",
  description: "증여재산가액과 증여자 관계를 입력하면 증여세를 자동 계산합니다. 배우자·자녀 공제와 혼인출산공제, 신고세액공제까지 반영.",
  alternates: { canonical: "https://moduncalc.com/tax/gift" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 증여세 기준" title="증여세 계산기" description="증여 재산가액과 관계를 입력하면 납부할 증여세를 계산해 드려요.">
      <CalculatorJsonLd name="증여세 계산기" description="증여재산가액과 증여자 관계를 입력하면 증여세를 자동 계산합니다." url="https://moduncalc.com/tax/gift" />
      <FaqJsonLd items={[{q:"10년 합산이란 무엇인가요?",a:"같은 사람에게 10년간 받은 증여를 합산하여 세금을 계산합니다. 10년이 지나면 공제 한도가 리셋됩니다."},{q:"혼인·출산 공제는 어떤 경우에 적용되나요?",a:"혼인신고일 또는 출생일 전후 2년 이내 증여 시 1억원을 추가 공제받을 수 있습니다."},{q:"증여세 신고기한은 언제인가요?",a:"증여받은 달의 말일부터 3개월 이내에 신고해야 합니다."}]} />
      <GiftTaxCalc />
    </PageLayout>
  );
}
