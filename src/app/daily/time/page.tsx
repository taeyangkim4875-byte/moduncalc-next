import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import TimeCalc from "./TimeCalc";

export const metadata: Metadata = {
  title: "시간 계산기 - 시간 더하기 빼기 · 근무시간 · 시간 차이",
  description: "두 시간 사이의 차이를 계산하거나, 시간을 더하고 빼세요. 근무시간, 알바 시간 계산에 활용.",
  alternates: { canonical: "https://moduncalc.com/daily/time" },
  openGraph: {
    title: "시간 계산기 - 시간 더하기 빼기 · 근무시간 · 시간 차이",
    description: "두 시간 사이의 차이를 계산하거나, 시간을 더하고 빼세요. 근무시간, 알바 시간 계산에 활용.",
    url: "https://moduncalc.com/daily/time",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="일상 도구" title="시간 계산기" description="시간 차이, 시간 더하기/빼기, 근무시간 계산을 한번에.">
      <CalculatorJsonLd name="시간 계산기" description="두 시간 사이의 차이를 계산하거나, 시간을 더하고 빼세요. 근무시간, 알바 시간 계산에 활용." url="https://moduncalc.com/daily/time" />
      <FaqJsonLd items={[
        {q:"야간수당은 어떻게 계산하나요?",a:"근로기준법상 22시~06시 사이의 근로에 대해 통상임금의 50%를 가산하여 지급합니다. 시급 10,000원이면 야간 시간대는 15,000원이 됩니다."},
        {q:"주 52시간제란 무엇인가요?",a:"주 52시간제는 1주 법정근로시간 40시간 + 연장근로 12시간으로 최대 주 52시간까지 근무할 수 있는 제도입니다. 5인 이상 사업장에 적용됩니다."},
        {q:"휴게시간은 법적으로 어떻게 되나요?",a:"근로기준법상 4시간 근무 시 30분 이상, 8시간 근무 시 1시간 이상의 휴게시간을 부여해야 합니다. 휴게시간은 근로시간에 포함되지 않습니다."},
      ]} />
      <TimeCalc />
    </PageLayout>
  );
}
