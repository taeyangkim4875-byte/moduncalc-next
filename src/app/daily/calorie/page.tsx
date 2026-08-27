import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import CalorieCalc from "./CalorieCalc";
export const metadata: Metadata = { title: "칼로리 계산기 - 일일 권장 칼로리 · 다이어트 목표 (2026)", description: "하루에 몇 칼로리 먹어야 할까? 성별·나이·체중·활동량 입력하면 TDEE + 다이어트 목표 칼로리 바로 계산.", alternates: { canonical: "https://moduncalc.com/daily/calorie" },
  openGraph: {
    title: "칼로리 계산기 - 일일 권장 칼로리 · 다이어트 목표 (2026)",
    description: "하루에 몇 칼로리 먹어야 할까? 성별·나이·체중·활동량 입력하면 TDEE + 다이어트 목표 칼로리 바로 계산.",
    url: "https://moduncalc.com/daily/calorie",
  },};
export default function Page() { return <PageLayout eyebrow="건강" title="칼로리 계산기" description="성별, 나이, 키, 체중, 활동량으로 일일 권장 칼로리(TDEE)를 실시간 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '칼로리', href: '/daily/calorie' }]} /><CalculatorJsonLd name="칼로리 계산기" description="성별, 나이, 키, 체중, 활동량으로 일일 권장 칼로리(TDEE)를 계산. 감량·유지·증량 목표별 칼로리 안내." url="https://moduncalc.com/daily/calorie" /><FaqJsonLd items={[{q:"하루 1,200kcal만 먹어도 괜찮나요?",a:"성인 여성의 최소 권장 섭취량이 1,200kcal이며, 남성은 1,500kcal입니다. 이보다 적게 먹으면 영양 결핍이 발생할 수 있습니다."},{q:"운동 없이 식단만으로 감량 가능한가요?",a:"가능하지만 근손실이 동반될 수 있습니다. 근력 운동을 병행하면 효과적입니다."},{q:"BMR 계산 공식은 정확한가요?",a:"Mifflin-St Jeor 공식은 가장 널리 인정받는 추정식이지만, 개인 차이로 10~15% 오차가 있을 수 있습니다."},{q:"활동량 선택 기준은?",a:"사무직으로 따로 운동하지 않으면 비활동적, 주 1~3회 가벼운 운동은 가벼운 활동, 주 3~5회 중강도 운동은 보통 활동을 선택하세요."}]} /><CalorieCalc />

      <SeoSection title="TDEE, 이거 하나만 알면 다이어트 절반은 끝">
        <p>
          다이어트 앱 깔고 식단 기록하고… 솔직히 귀찮아서 3일 만에 포기하잖아요.
          근데 딱 하나만 기억하면 됩니다 — <strong>TDEE(총 소비 칼로리)</strong>.
          내 몸이 하루에 쓰는 총 에너지이고, 이것보다 적게 먹으면 빠지고, 많이 먹으면 찝니다.
        </p>
        <SeoFormula>
          <div>TDEE = BMR(기초대사량) × 활동계수</div>
          <div>감량 목표: TDEE - 500kcal/일 → 주당 약 0.5kg 감량</div>
          <div>증량 목표: TDEE + 300~500kcal/일</div>
        </SeoFormula>
        <p>
          기초대사량이 궁금하면 <SeoLink href="/health/bmr">기초대사량 계산기</SeoLink>에서 정확히 확인하세요.
          체지방률까지 알면 더 정밀한 계산이 가능합니다.
        </p>
      </SeoSection>

      <SeoSection title="한국인이 자주 먹는 음식 칼로리">
        <SeoList>
          <li><strong>공기밥 1그릇</strong> — 약 300kcal</li>
          <li><strong>라면 1봉지</strong> — 약 500kcal (국물까지 마시면 +50kcal)</li>
          <li><strong>치킨 1마리</strong> — 약 1,800~2,200kcal (후라이드 기준)</li>
          <li><strong>김밥 1줄</strong> — 약 400~450kcal</li>
          <li><strong>아메리카노</strong> — 약 5kcal (카페라떼는 약 150kcal)</li>
          <li><strong>소주 1병</strong> — 약 400kcal (안주 별도)</li>
        </SeoList>
        <p>
          치킨 한 마리가 성인 여성 하루 권장 칼로리의 거의 전부라는 게 충격적이죠.
          근데 다 끊을 필요는 없어요. TDEE 범위 안에서 먹으면 됩니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="칼로리 관련 궁금증"
        items={[
          { q: '하루 1,200kcal 다이어트는 괜찮은가요?', a: '성인 여성 최소 1,200kcal, 남성 최소 1,500kcal는 섭취해야 합니다. 이 이하로 내려가면 근손실, 탈모, 면역력 저하 등의 부작용이 생길 수 있어요. 장기간 극저칼로리는 오히려 요요를 부릅니다.' },
          { q: '운동 안 하고 식단만으로 뺄 수 있나요?', a: '가능은 하지만 추천하지 않습니다. 식단만 줄이면 근육도 같이 빠져서 기초대사량이 줄어들고, 결국 더 적게 먹어야 유지가 됩니다. 주 2~3회 근력 운동을 병행하면 체중 유지가 훨씬 쉬워집니다.' },
          { q: '활동량 선택을 뭘로 해야 할지 모르겠어요', a: '사무직이고 따로 운동 안 하면 "비활동적". 주 1~3회 가벼운 운동(걷기, 요가 등)은 "가벼운 활동". 주 3~5회 중강도 운동(러닝, 헬스 등)은 "보통 활동"을 선택하세요. 애매하면 한 단계 낮춰 잡는 게 안전합니다.' },
        ]}
      />
    </PageLayout>; }
