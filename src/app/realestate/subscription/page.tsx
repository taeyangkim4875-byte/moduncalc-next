import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SubscriptionCalc from "./SubscriptionCalc";

export const metadata: Metadata = {
  title: "청약 가점 계산기 - 무주택 · 부양가족 · 청약통장 가점 (2026)",
  description: "청약 가점을 자동 계산합니다. 무주택 기간, 부양가족 수, 청약통장 가입 기간별 점수 확인.",
  alternates: { canonical: "https://moduncalc.com/realestate/subscription" },
  openGraph: {
    title: "청약 가점 계산기 - 무주택 · 부양가족 · 청약통장 가점 (2026)",
    description: "청약 가점을 자동 계산합니다. 무주택 기간, 부양가족 수, 청약통장 가입 기간별 점수 확인.",
    url: "https://moduncalc.com/realestate/subscription",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="부동산" title="청약 가점 계산기" description="무주택 기간, 부양가족 수, 청약통장 가입 기간으로 가점을 계산합니다. (84점 만점)">
      <CalculatorJsonLd name="청약 가점 계산기" description="청약 가점을 자동 계산합니다. 무주택 기간, 부양가족 수, 청약통장 가입 기간별 점수 확인. 2026년 기준." url="https://moduncalc.com/realestate/subscription" />
      <FaqJsonLd items={[
        {q:"청약 가점제란 무엇인가요?",a:"청약 가점제는 무주택 기간(32점), 부양가족 수(35점), 청약통장 가입 기간(17점) 등 3개 항목의 점수를 합산하여 총 84점 만점으로 당첨자를 선정하는 제도입니다."},
        {q:"가점제와 추첨제의 차이는 무엇인가요?",a:"가점제는 무주택 기간, 부양가족 수, 통장 가입 기간의 점수 합계가 높은 순으로 당첨자를 선정합니다. 추첨제는 신청자 중 무작위로 당첨자를 선정합니다. 전용 85m2 이하 민영주택은 가점제 40~100% 적용됩니다."},
        {q:"부양가족 수는 어떻게 산정하나요?",a:"배우자, 직계존속(부모·조부모), 직계비속(자녀) 중 세대원으로 등록된 가족 수입니다. 배우자는 주민등록 분리 시에도 인정됩니다. 직계존속은 3년 이상 동일 세대, 미혼 자녀는 30세 미만이어야 합니다."},
      ]} />
      <SubscriptionCalc />
    </PageLayout>
  );
}
