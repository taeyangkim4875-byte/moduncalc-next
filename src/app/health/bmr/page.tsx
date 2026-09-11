import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import BmrCalculator from "./BmrCalculator";
export const metadata: Metadata = { title: "기초대사량 계산기 - 일일 권장 칼로리", description: "하루에 가만히 있어도 소모되는 칼로리는? 기초대사량 + 활동별 권장 칼로리 바로 계산.", alternates: { canonical: "https://moduncalc.com/health/bmr" },
  openGraph: {
    title: "기초대사량 계산기 - 일일 권장 칼로리",
    description: "하루에 가만히 있어도 소모되는 칼로리는? 기초대사량 + 활동별 권장 칼로리 바로 계산.",
    url: "https://moduncalc.com/health/bmr",
  },};
export default function Page() {
  return (
    <PageLayout eyebrow="Mifflin-St Jeor 공식" title="기초대사량 계산기" description="기초대사량(BMR)과 일일 권장 칼로리(TDEE)를 계산해요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '건강', href: '/health' }, { name: '기초대사량', href: '/health/bmr' }]} />
      <CalculatorJsonLd name="기초대사량 계산기" description="성별, 나이, 키, 체중으로 기초대사량(BMR)과 일일 권장 칼로리를 계산하세요." url="https://moduncalc.com/health/bmr" />
      <FaqJsonLd items={[{q:"기초대사량을 높이려면 어떻게 해야 하나요?",a:"근력 운동으로 근육량을 늘리는 것이 가장 효과적입니다."},{q:"TDEE란 무엇인가요?",a:"Total Daily Energy Expenditure의 약자로, 기초대사량에 활동량을 곱한 하루 총 소모 칼로리입니다."},{q:"다이어트 시 얼마나 줄여야 하나요?",a:"TDEE에서 300~500kcal 정도 줄이는 것이 건강한 감량 속도입니다."}]} />
      <BmrCalculator />

      <SeoSection title="다이어트할 때 이 숫자부터 알아야 하는 이유">
        <p>밥을 줄이면 살이 빠진다고 생각하잖아요. 근데 기초대사량보다 적게 먹으면 몸이 에너지 절약 모드로 바뀌어서 오히려 살이 안 빠집니다. 30대 여성 기준 기초대사량이 보통 1,200~1,400kcal인데, 이것보다 적게 먹는 극단적 다이어트는 요요가 올 확률이 높아요.</p>
        <p>TDEE에서 300~500kcal만 빼는 게 정석입니다. 예를 들어 TDEE가 2,000kcal이면 1,500~1,700kcal을 먹는 거예요. 이러면 한 달에 1.5~2kg씩 빠지는데, 느린 것 같아도 근손실 없이 체지방만 빠지니까 실질적으로 가장 효과적입니다.</p>
      </SeoSection>

      <SeoSection title="근육 1kg의 값어치 — 대사량으로 따져보면">
        <p>
          근육 1kg이 하루에 추가로 소모하는 칼로리는 약 13kcal입니다. 적어 보이죠? 근데 근육 5kg을 늘리면 하루 65kcal, 1년이면 약 23,700kcal이에요. 체지방 약 3kg에 해당하는 양입니다. 운동 안 해도 알아서 빠지는 셈이니까, 장기적으로는 근력 운동이 유산소보다 다이어트에 유리합니다.
        </p>
        <p>
          반대로 극단적 다이어트를 하면 근육이 먼저 빠지면서 기초대사량이 뚝 떨어져요. 그래서 이전과 같은 양을 먹어도 살이 찌는 &quot;요요&quot;가 옵니다.
          다이어트 중에도 단백질을 체중 1kg당 1.2~1.6g은 섭취하고, 주 2~3회 근력 운동을 하면 기초대사량 방어가 됩니다.
        </p>
      </SeoSection>

      <SeoSection title="운동별 칼로리 소모, 생각보다 차이 큽니다">
        <SeoList>
          <li><strong>걷기 (시속 5km)</strong> — 30분에 약 120kcal. 살 빼려고 걷기만 하면 솔직히 효율이 낮음</li>
          <li><strong>달리기 (시속 8km)</strong> — 30분에 약 280kcal. 밥 한 공기(300kcal)도 안 됨</li>
          <li><strong>수영 (자유형)</strong> — 30분에 약 250kcal. 전신 운동이라 관절 부담 적음</li>
          <li><strong>웨이트 트레이닝</strong> — 30분에 약 150kcal + 운동 후 48시간 추가 소모 (EPOC 효과)</li>
          <li><strong>HIIT</strong> — 20분에 약 200kcal. 시간 대비 효율 최고, 근데 체력 소모도 큼</li>
        </SeoList>
        <p>
          사실 운동만으로 살 빼기는 어렵습니다. 달리기 30분 해봐야 아메리카노 한 잔에 넣은 시럽 칼로리예요.
          정확한 하루 섭취량이 궁금하면 <SeoLink href="/daily/calorie">칼로리 계산기</SeoLink>에서 TDEE 기준으로 확인하세요.
          <SeoLink href="/health/bmi">BMI</SeoLink>와 함께 보면 현재 상태를 더 잘 파악할 수 있습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="기초대사량 관련 궁금한 점"
        items={[
          { q: '나이 들면 기초대사량이 줄어드나요?', a: '네, 30대부터 10년마다 약 2~3%씩 감소합니다. 근육량이 줄어드는 게 주요 원인이라 근력 운동을 하면 감소 속도를 늦출 수 있어요.' },
          { q: '같은 체중인데 왜 대사량이 다른가요?', a: '근육량 차이입니다. 근육은 지방보다 3배 더 많은 에너지를 소모해요. 그래서 같은 70kg이라도 근육질인 사람이 기초대사량이 더 높습니다.' },
          { q: '인바디 기계랑 이 계산기 중 뭐가 정확한가요?', a: '인바디가 더 정확합니다. 이 계산기는 Mifflin-St Jeor 공식 기반 추정치인데, 오차가 5~10% 정도 있어요. 근데 트렌드를 보는 용도로는 충분합니다.' },
          { q: '기초대사량이 낮으면 어떻게 올리나요?', a: '근력 운동이 가장 확실합니다. 스쿼트, 데드리프트 같은 대근육 운동을 주 3회 하면 3개월 안에 기초대사량이 50~100kcal 올라가는 게 보통이에요. 단백질 섭취도 체중 1kg당 1.2g 이상은 챙기세요.' },
          { q: '기초대사량보다 적게 먹으면 어떻게 되나요?', a: '단기적으로 체중은 빠지지만, 몸이 에너지 절약 모드로 전환됩니다. 근육이 빠지고 호르몬 균형이 깨져서 탈모, 생리불순, 면역력 저하가 올 수 있어요. 최소 기초대사량만큼은 먹어야 합니다.' },
        ]}
      />
    </PageLayout>
  );
}
