import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import BodyFatCalc from "./BodyFatCalc";
export const metadata: Metadata = { title: "체지방률 계산기 - 미 해군 공식 기반 체지방 측정", description: "내 체지방률은 몇 %? 허리·목 둘레만 재면 바로 측정. BMI보다 정확한 US Navy 공식.", alternates: { canonical: "https://moduncalc.com/health/bodyfat" },
  openGraph: {
    title: "체지방률 계산기 - 미 해군 공식 기반 체지방 측정",
    description: "내 체지방률은 몇 %? 허리·목 둘레만 재면 바로 측정. BMI보다 정확한 US Navy 공식.",
    url: "https://moduncalc.com/health/bodyfat",
  },};
export default function Page() {
  return (
    <PageLayout eyebrow="US Navy 공식 기반" title="체지방률 계산기" description="키, 허리둘레, 목둘레로 체지방률을 추정합니다. BMI보다 정확한 비만도 판정.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '건강', href: '/health' }, { name: '체지방률', href: '/health/bodyfat' }]} />
      <CalculatorJsonLd name="체지방률 계산기" description="키, 허리둘레, 목둘레로 체지방률을 추정합니다. 미 해군(US Navy) 공식 기반. BMI보다 정확한 비만도 판정." url="https://moduncalc.com/health/bodyfat" />
      <FaqJsonLd items={[{q:"체지방률과 BMI 중 어떤 것이 더 정확한가요?",a:"체지방률이 실제 비만도를 더 정확하게 반영합니다. BMI는 근육량과 체지방을 구분하지 못합니다."},{q:"허리둘레는 어디서 재야 하나요?",a:"배꼽 높이에서 줄자를 수평으로 돌려, 숨을 편하게 내쉰 상태에서 측정합니다."},{q:"체지방률을 얼마나 빨리 줄일 수 있나요?",a:"건강한 감량 속도는 주당 0.5~1%입니다. 3~6개월에 걸쳐 꾸준히 관리하는 것이 효과적입니다."}]} />
      <BodyFatCalc />

      <SeoSection title="인바디 없이도 체지방률 확인하는 법">
        <p>헬스장 가면 인바디 측정 해주는데, 매번 가기 귀찮잖아요. 줄자 하나면 집에서도 충분히 확인할 수 있습니다. 이 계산기는 미 해군에서 실제로 신체 적합성 평가에 쓰는 공식이라 정확도가 꽤 괜찮아요. 인바디랑 비교하면 2~3% 정도 차이 납니다.</p>
        <p>남성은 체지방률 15~20%가 건강한 범위이고, 복근이 보이려면 12% 이하로 내려가야 해요. 여성은 20~25%가 건강한 범위입니다. 근데 여성이 18% 미만으로 내려가면 호르몬 불균형이 올 수 있어서 너무 낮추는 건 좋지 않습니다.</p>
      </SeoSection>

      <SeoFaq
        title="체지방률 관련 궁금한 점"
        items={[
          { q: '줄자로 재면 정확한가요?', a: '인바디 대비 2~3% 오차가 있지만 변화 추이를 보기엔 충분합니다. 매번 같은 조건(아침 공복, 같은 위치)에서 재는 게 중요해요.' },
          { q: '체지방률이 높은데 마른 체형이에요', a: '마른 비만이라고 합니다. 근육량이 적고 내장지방이 많은 경우인데, 겉으로 안 보여서 더 위험해요. 근력 운동을 시작하는 게 좋습니다.' },
          { q: '엉덩이 둘레는 왜 여성만 재나요?', a: 'US Navy 공식이 성별에 따라 다른 변수를 사용합니다. 여성은 체지방 분포가 엉덩이 쪽에 많아서 정확도를 높이기 위해 추가로 측정해요.' },
        ]}
      />
    </PageLayout>
  );
}
