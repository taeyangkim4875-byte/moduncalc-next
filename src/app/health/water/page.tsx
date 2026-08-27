import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
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
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '건강', href: '/health' }, { name: '물 섭취량', href: '/health/water' }]} />
      <CalculatorJsonLd name="물 섭취량 계산기" description="체중과 활동량으로 하루 권장 물 섭취량을 계산합니다. 컵 수로도 안내." url="https://moduncalc.com/health/water" />
      <FaqJsonLd items={[
        { q: "하루에 물을 얼마나 마셔야 하나요?", a: "체중 1kg당 약 30ml가 기본이며, 활동량에 따라 보정됩니다. 예를 들어 70kg 성인은 하루 약 2,100ml(약 10컵)이 권장됩니다." },
        { q: "커피나 차도 수분 섭취에 포함되나요?", a: "네, 커피와 차도 수분 섭취에 포함됩니다. 다만 카페인에 약한 이뇨 작용이 있으므로, 카페인 음료 외에 순수 물도 충분히 마시는 것이 좋습니다." },
        { q: "물을 너무 많이 마시면 해로운가요?", a: "극단적으로 과다 섭취하면 저나트륨혈증(물중독)이 발생할 수 있습니다. 일반적으로 하루 3~4리터 이내라면 건강한 성인에게 문제가 되지 않습니다." },
      ]} />
      <WaterIntakeCalc />

      <SeoSection title="하루 물 8잔, 사실 정확한 기준이 아닙니다">
        <p>하루에 물 2리터 마시라는 말 많이 들어봤죠? 근데 이게 1945년 미국 식품영양위원회 권장 사항에서 나온 건데, 음식에서 섭취하는 수분을 빼고 말한 거였어요. 국이나 과일, 채소에서 이미 하루 수분의 20~30%를 섭취하고 있거든요.</p>
        <p>체중에 따라 달라지는 게 현실적입니다. 50kg인 사람이랑 90kg인 사람이 같은 양의 물을 마실 이유가 없잖아요. 체중 1kg당 30ml가 기본이고, 운동하거나 여름에 땀을 많이 흘리면 더 마셔야 해요. 카페인 음료는 이뇨 작용이 있어서 물 대용으로 100% 인정되진 않습니다.</p>
      </SeoSection>

      <SeoFaq
        title="물 섭취 관련 궁금한 점"
        items={[
          { q: '물 대신 이온 음료를 마셔도 되나요?', a: '운동 후에는 괜찮지만, 평소에는 당분이 들어있어서 추천하지 않습니다. 순수한 물이 가장 좋고, 맛이 심심하면 레몬이나 오이를 넣어보세요.' },
          { q: '한 번에 많이 마시는 것과 나눠 마시는 것 중 뭐가 좋나요?', a: '한 번에 500ml 이상 벌컥 마시면 신장에 부담이 됩니다. 30분~1시간 간격으로 150~200ml씩 나눠 마시는 게 흡수도 잘 되고 몸에 좋아요.' },
          { q: '커피를 많이 마시면 물을 더 마셔야 하나요?', a: '커피 한 잔당 추가로 물 반 잔(100ml) 정도 더 마시면 됩니다. 하루 카페인 400mg(아메리카노 3~4잔) 이내라면 크게 걱정할 수준은 아니에요.' },
        ]}
      />
    </PageLayout>
  );
}
