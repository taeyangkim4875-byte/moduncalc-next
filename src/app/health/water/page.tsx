import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
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

      <SeoSection title="운동할 때 물, 얼마나 더 마셔야 하나">
        <p>
          운동하면 땀으로 시간당 500ml~1.5L가 빠집니다. 여름 야외 운동이면 2L까지도 나가요.
          근데 &quot;목마를 때 마시면 된다&quot;는 건 반만 맞습니다. 갈증을 느끼는 시점에는 이미 체수분의 1~2%가 빠진 상태라서, 운동 능력이 벌써 10% 이상 떨어져 있어요.
        </p>
        <SeoList>
          <li><strong>운동 2시간 전</strong> — 400~600ml 미리 마시기</li>
          <li><strong>운동 중</strong> — 15~20분 간격으로 150~200ml씩</li>
          <li><strong>운동 후</strong> — 빠진 체중 1kg당 물 1.5L 보충 (운동 전후 체중 재면 정확)</li>
          <li><strong>1시간 이상 고강도 운동</strong> — 전해질(나트륨) 보충도 필요. 이때는 이온 음료가 효과적</li>
        </SeoList>
        <p>
          마라톤이나 등산처럼 장시간 운동 시 물만 과다 섭취하면 나트륨 농도가 떨어져서 위험할 수 있습니다.
          운동 시간과 강도에 따라 <SeoLink href="/daily/calorie">칼로리 소모량</SeoLink>과 함께 수분 보충 계획을 세우세요.
        </p>
      </SeoSection>

      <SeoSection title="물중독, 정말로 위험한가요">
        <p>
          &quot;물을 많이 마시면 좋다&quot;는 말에 하루 5~6L 이상 마시는 분들이 있는데, 이건 오히려 위험합니다.
          과다한 수분 섭취로 혈중 나트륨 농도가 135mEq/L 아래로 떨어지면 저나트륨혈증(물중독)이 발생해요.
          두통, 구역, 근육 경련이 초기 증상이고, 심하면 의식 저하까지 갈 수 있습니다.
        </p>
        <p>
          건강한 성인의 신장은 시간당 약 800ml~1L의 수분을 처리할 수 있습니다. 그러니까 한 시간에 1L 이상을 벌컥벌컥 마시는 건 피해야 해요.
          하루 총량은 체중에 따라 다르지만, 보통 3~4L 이내면 문제가 되지 않습니다.
          계절에 따라서도 달라지는데, 여름에는 땀 배출이 많아서 평소보다 500ml~1L 정도 더 마셔야 하고,
          겨울에는 갈증을 잘 못 느껴서 오히려 탈수가 오는 경우가 많습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="물 섭취 관련 궁금한 점"
        items={[
          { q: '물 대신 이온 음료를 마셔도 되나요?', a: '운동 후에는 괜찮지만, 평소에는 당분이 들어있어서 추천하지 않습니다. 순수한 물이 가장 좋고, 맛이 심심하면 레몬이나 오이를 넣어보세요.' },
          { q: '한 번에 많이 마시는 것과 나눠 마시는 것 중 뭐가 좋나요?', a: '한 번에 500ml 이상 벌컥 마시면 신장에 부담이 됩니다. 30분~1시간 간격으로 150~200ml씩 나눠 마시는 게 흡수도 잘 되고 몸에 좋아요.' },
          { q: '커피를 많이 마시면 물을 더 마셔야 하나요?', a: '커피 한 잔당 추가로 물 반 잔(100ml) 정도 더 마시면 됩니다. 하루 카페인 400mg(아메리카노 3~4잔) 이내라면 크게 걱정할 수준은 아니에요.' },
          { q: '겨울에도 물을 많이 마셔야 하나요?', a: '네. 겨울엔 실내 난방 때문에 피부와 호흡으로 수분이 빠집니다. 갈증을 덜 느껴서 오히려 만성 탈수에 빠지기 쉬워요. 알람을 맞춰서라도 규칙적으로 마시세요.' },
          { q: '탄산수도 물 섭취에 포함되나요?', a: '네, 첨가물 없는 탄산수는 순수한 물과 동일하게 수분 보충이 됩니다. 다만 탄산이 위장을 자극할 수 있으니 속이 안 좋은 분은 무탄산을 추천해요.' },
        ]}
      />
    </PageLayout>
  );
}
