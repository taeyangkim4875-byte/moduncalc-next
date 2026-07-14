import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import BmiChildCalc from "./BmiChildCalc";

export const metadata: Metadata = {
  title: "어린이 BMI 계산기 - 소아 청소년 성장 백분위 (2026)",
  description: "어린이·청소년의 BMI를 계산하고 성장 백분위를 확인하세요. 2~18세 소아 비만도 판정.",
  alternates: { canonical: "https://moduncalc.com/daily/bmi-child" },
  openGraph: {
    title: "어린이 BMI 계산기 - 소아 청소년 성장 백분위 (2026)",
    description: "어린이·청소년의 BMI를 계산하고 성장 백분위를 확인하세요. 2~18세 소아 비만도 판정.",
    url: "https://moduncalc.com/daily/bmi-child",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="건강" title="어린이 BMI 계산기" description="2~18세 소아·청소년의 BMI와 성장 백분위를 확인합니다.">
      <CalculatorJsonLd name="어린이 BMI 계산기" description="어린이·청소년의 BMI를 계산하고 성장 백분위를 확인하세요. 2~18세 소아 비만도 판정." url="https://moduncalc.com/daily/bmi-child" />
      <FaqJsonLd items={[
        { q: "어린이 BMI는 성인과 다른가요?", a: "네, 어린이는 성별·나이에 따라 BMI 기준이 다릅니다. 같은 BMI라도 나이와 성별에 따라 정상일 수도, 비만일 수도 있어 백분위로 판정합니다." },
        { q: "소아 비만 기준은 무엇인가요?", a: "같은 성별·나이 집단에서 BMI가 85~95백분위이면 과체중, 95백분위 이상이면 비만으로 판정합니다. 5백분위 미만은 저체중입니다." },
        { q: "성장기에 다이어트를 해도 되나요?", a: "성장기에는 극단적인 식이제한보다 균형 잡힌 영양 섭취와 규칙적인 신체활동이 권장됩니다. 소아 비만이 걱정된다면 소아과 전문의와 상담하세요." },
      ]} />
      <BmiChildCalc />
    </PageLayout>
  );
}
