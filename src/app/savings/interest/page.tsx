import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import InterestCalc from "./InterestCalc";

export const metadata: Metadata = {
  title: "적금 이자 계산기 - 예금·적금 만기 수령액",
  description: "적금·예금 만기 수령액을 자동 계산합니다. 월 납입액, 이자율, 기간, 이자과세를 입력하면 세후 수령액을 바로 확인하세요.",
  alternates: { canonical: "https://moduncalc.com/savings/interest" },
  openGraph: { title: "적금·예금 이자 계산기 - 만기 수령액 자동 계산 (2026)", description: "월 납입액, 이자율, 기간 입력하면 세후 만기 수령액을 바로 계산. 단리·복리, 일반과세·비과세 지원.", url: "https://moduncalc.com/savings/interest" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 이자 계산" title="적금·예금 이자 계산기" description="적금·예금 만기 시 세후 수령액을 바로 계산해 드려요.">
      <CalculatorJsonLd name="적금 이자 계산기" description="적금·예금 만기 수령액을 자동 계산합니다. 월 납입액, 이자율, 기간, 이자과세 적용." url="https://moduncalc.com/savings/interest" />
      <FaqJsonLd items={[{q:"단리와 복리의 차이는 무엇인가요?",a:"단리는 원금에 대해서만 이자를 계산하고, 복리는 이자에 대한 이자까지 계산합니다. 일반적인 은행 적금·예금은 단리로 계산됩니다."},{q:"비과세 혜택은 누가 받을 수 있나요?",a:"비과세종합저축은 만 65세 이상, 장애인, 국가유공자 등이 가입할 수 있으며, 1인당 5,000만원 한도 내에서 이자소득세가 면제됩니다."},{q:"적금과 예금의 차이는 무엇인가요?",a:"적금은 매달 일정 금액을 납입하는 방식이고, 예금은 목돈을 한 번에 맡기는 방식입니다. 같은 금리라면 예금이 이자가 더 많습니다."}]} />
      <InterestCalc />
    </PageLayout>
  );
}
