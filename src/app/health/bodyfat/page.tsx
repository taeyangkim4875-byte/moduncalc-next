import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
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

      <SeoSection title="남녀별 이상 체지방률 — 내 숫자는 어느 구간?">
        <SeoList>
          <li><strong>남성 필수 지방</strong> — 2~5%. 이 아래로 내려가면 장기 기능에 문제가 생김</li>
          <li><strong>남성 운동선수</strong> — 6~13%. 복근이 선명하게 보이는 구간</li>
          <li><strong>남성 건강 범위</strong> — 14~17%. 가장 이상적인 건강 상태</li>
          <li><strong>남성 허용 범위</strong> — 18~24%. 약간 과체중이지만 당장 위험은 아님</li>
          <li><strong>여성 필수 지방</strong> — 10~13%. 호르몬 균형에 필요한 최소량</li>
          <li><strong>여성 운동선수</strong> — 14~20%. 탄탄한 바디라인이 보이는 구간</li>
          <li><strong>여성 건강 범위</strong> — 21~24%. 가장 이상적</li>
          <li><strong>여성 허용 범위</strong> — 25~31%. 평균적인 수준</li>
        </SeoList>
        <p>
          체지방률 10% 줄이려면 현실적으로 얼마나 걸릴까요? 건강하게 빼면 한 달에 체지방 1~2%가 한계입니다.
          체지방률 30%에서 20%로 내리려면 최소 5~10개월은 잡아야 해요. 근육량을 유지하면서 빼려면 단백질 충분히 먹고 근력 운동 병행이 필수입니다.
        </p>
      </SeoSection>

      <SeoSection title="인바디 vs 해군 공식 vs 캘리퍼 — 뭘 믿어야 하나">
        <p>
          솔직히 가장 정확한 건 DEXA 스캔(뼈 밀도 검사)인데, 비용이 10만원 이상이라 매번 할 수는 없어요.
          일상적으로 쓸 수 있는 방법 중에서는 인바디가 가장 나은데, 수분 상태에 따라 2~5% 오차가 있습니다.
          아침에 재면 낮보다 체지방이 낮게 나오는 이유가 이거예요.
        </p>
        <p>
          해군 공식(이 계산기)은 줄자만 있으면 되니까 접근성이 좋고, 인바디와 비교해도 오차가 ±3% 수준입니다.
          중요한 건 어떤 방법이든 <strong>같은 조건에서 같은 방법으로</strong> 주기적으로 재는 겁니다. 절대값보다 변화 추이가 더 중요해요.
          <SeoLink href="/health/bmi">BMI</SeoLink>와 같이 보면 전체적인 체형 판단에 도움이 됩니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="체지방률 관련 궁금한 점"
        items={[
          { q: '줄자로 재면 정확한가요?', a: '인바디 대비 2~3% 오차가 있지만 변화 추이를 보기엔 충분합니다. 매번 같은 조건(아침 공복, 같은 위치)에서 재는 게 중요해요.' },
          { q: '체지방률이 높은데 마른 체형이에요', a: '마른 비만이라고 합니다. 근육량이 적고 내장지방이 많은 경우인데, 겉으로 안 보여서 더 위험해요. 근력 운동을 시작하는 게 좋습니다.' },
          { q: '엉덩이 둘레는 왜 여성만 재나요?', a: 'US Navy 공식이 성별에 따라 다른 변수를 사용합니다. 여성은 체지방 분포가 엉덩이 쪽에 많아서 정확도를 높이기 위해 추가로 측정해요.' },
          { q: '헬스장 인바디에서 골격근량이랑 체지방량 뭐가 더 중요한가요?', a: '둘 다 중요하지만 변화를 볼 때는 골격근량 대비 체지방량 비율(근지방비)을 보세요. 골격근이 늘고 체지방이 줄면 체중이 그대로여도 몸이 확 달라져요.' },
          { q: '체지방률이 낮을수록 건강한 건가요?', a: '아닙니다. 남성 5% 미만, 여성 13% 미만은 호르몬 문제, 면역력 저하, 여성은 생리 불순까지 올 수 있어요. 건강한 범위 내에서 유지하는 게 가장 좋습니다.' },
        ]}
      />
    </PageLayout>
  );
}
