import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import WaterIntakeCalc from "./WaterIntakeCalc";

export const metadata: Metadata = {
  title: "물 섭취량 계산기 - 하루 권장 물 섭취량",
  description: "체중과 활동량으로 하루 권장 물 섭취량을 계산합니다. 컵 수로도 안내.",
  alternates: { canonical: "https://moduncalc.com/health/water" },
  openGraph: {
    title: "물 섭취량 계산기 - 하루 권장 물 섭취량",
    description: "체중과 활동량으로 하루 권장 물 섭취량을 계산합니다. 컵 수로도 안내.",
    url: "https://moduncalc.com/health/water",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="건강" title="물 섭취량 계산기" description="체중과 활동량으로 하루 권장 물 섭취량을 계산합니다.">
      <CalculatorJsonLd name="물 섭취량 계산기" description="체중과 활동량으로 하루 권장 물 섭취량을 계산합니다. 컵 수로도 안내." url="https://moduncalc.com/health/water" />
      <FaqJsonLd items={[
        { q: "하루에 물을 얼마나 마셔야 하나요?", a: "체중 1kg당 약 30ml가 기본이며, 활동량에 따라 보정됩니다. 예를 들어 70kg 성인은 하루 약 2,100ml(약 10컵)이 권장됩니다." },
        { q: "커피나 차도 수분 섭취에 포함되나요?", a: "네, 커피와 차도 수분 섭취에 포함됩니다. 다만 카페인에 약한 이뇨 작용이 있으므로, 카페인 음료 외에 순수 물도 충분히 마시는 것이 좋습니다." },
        { q: "물을 너무 많이 마시면 해로운가요?", a: "극단적으로 과다 섭취하면 저나트륨혈증(물중독)이 발생할 수 있습니다. 일반적으로 하루 3~4리터 이내라면 건강한 성인에게 문제가 되지 않습니다." },
      ]} />
      <WaterIntakeCalc />
    </PageLayout>
  );
}
