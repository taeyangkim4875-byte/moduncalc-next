import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { HubGroups } from '@/components/CategoryHub';
import { SeoSection, SeoFaq, SeoFormula, SeoLink } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: '건강 계산기 모음 - BMI·기초대사량·체지방률·칼로리·수면',
  description: 'BMI 체질량지수, 기초대사량(BMR), 체지방률, 하루 칼로리, 수면 사이클, 물 섭취량까지. 아시아태평양 기준을 적용한 무료 건강 계산기.',
  alternates: { canonical: 'https://moduncalc.com/health' },
  openGraph: {
    title: '건강 계산기 모음',
    description: 'BMI·기초대사량·체지방률·칼로리·수면·물 섭취량을 한 곳에서.',
    url: 'https://moduncalc.com/health',
  },
};

const GROUPS = [
  {
    title: '⚖️ 체중·체형',
    note: '다이어트를 시작하기 전에 현재 위치와 목표를 숫자로 정해두면 계획이 훨씬 구체적이 됩니다.',
    items: ['/health/bmi', '/health/bmi/reverse', '/health/bodyfat', '/daily/bmi-child'],
  },
  {
    title: '🔥 에너지·식단',
    note: '기초대사량을 먼저 구하고, 활동량을 곱해 하루 필요 열량을 잡는 순서로 보세요.',
    items: ['/health/bmr', '/daily/calorie', '/daily/airfryer'],
  },
  {
    title: '😴 생활 습관',
    note: '잠과 물은 체중만큼이나 컨디션에 직접 영향을 줍니다.',
    items: ['/health/sleep', '/health/water', '/daily/alcohol'],
  },
];

export default function Page() {
  return (
    <PageLayout
      eyebrow="건강"
      title="건강 계산기 모음"
      description="BMI, 기초대사량, 체지방률, 칼로리를 한 곳에서 확인하세요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '건강', href: '/health' }]} />
      <FaqJsonLd items={[
        { q: '한국인 BMI 정상 범위는 얼마인가요?', a: 'WHO 아시아태평양 기준으로 18.5~22.9가 정상, 23~24.9가 과체중, 25 이상이 비만입니다. 서양 기준(25 이상 과체중, 30 이상 비만)보다 엄격합니다.' },
        { q: 'BMI만으로 비만을 판단할 수 있나요?', a: 'BMI는 키와 몸무게만 사용하므로 근육량을 구분하지 못합니다. 근육이 많은 사람은 BMI가 높게 나옵니다. 체지방률과 허리둘레를 함께 보는 것이 정확합니다.' },
        { q: '기초대사량은 어떻게 계산하나요?', a: '해리스-베네딕트 개정 공식을 주로 씁니다. 남성은 88.362 + (13.397 × 체중kg) + (4.799 × 키cm) − (5.677 × 나이), 여성은 447.593 + (9.247 × 체중kg) + (3.098 × 키cm) − (4.330 × 나이)입니다.' },
      ]} />

      <SeoSection title="한국 기준 BMI는 서양과 다릅니다">
        <p>
          BMI는 체중(kg)을 키(m)의 제곱으로 나눈 값입니다.
          그런데 <strong>같은 BMI라도 한국에서는 비만, 미국에서는 정상</strong>으로 분류될 수 있습니다.
          아시아인은 같은 BMI에서도 내장지방과 당뇨·심혈관 질환 위험이 더 높다는 연구 결과에 따라
          WHO가 아시아태평양 기준을 따로 두었기 때문입니다.
        </p>
        <SeoFormula>
          <div>BMI = 체중(kg) ÷ 키(m)²</div>
          <div>예: 170cm 70kg → 70 ÷ (1.7 × 1.7) = 24.2 (과체중)</div>
        </SeoFormula>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">분류</th>
                <th className="text-left p-2 font-bold">아시아태평양 기준</th>
                <th className="text-left p-2 font-bold">170cm 기준 체중</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--line)]"><td className="p-2">저체중</td><td className="p-2">18.5 미만</td><td className="p-2">53.5kg 미만</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">정상</td><td className="p-2">18.5 ~ 23</td><td className="p-2">53.5 ~ 66.5kg</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">과체중</td><td className="p-2">23 ~ 25</td><td className="p-2">66.5 ~ 72.2kg</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">비만 1단계</td><td className="p-2">25 ~ 30</td><td className="p-2">72.2 ~ 86.7kg</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">비만 2단계 이상</td><td className="p-2">30 이상</td><td className="p-2">86.7kg 이상</td></tr>
            </tbody>
          </table>
        </div>
      </SeoSection>

      <HubGroups groups={GROUPS} />

      <SeoSection title="다이어트 계획, 이 순서로 세우세요">
        <p>
          <strong>1단계.</strong> <SeoLink href="/health/bmi">BMI 계산기</SeoLink>로 현재 위치를 확인합니다.
          그다음 <SeoLink href="/health/bmi/reverse">목표 BMI 역산 계산기</SeoLink>로 목표 체중을 정합니다.
          170cm라면 BMI 22 기준 목표 체중은 63.6kg입니다.
        </p>
        <p>
          <strong>2단계.</strong> <SeoLink href="/health/bmr">기초대사량 계산기</SeoLink>로 가만히 있어도 쓰는 열량을 구합니다.
          여기에 활동계수(좌식 1.2 ~ 고강도 1.9)를 곱하면 하루 유지 칼로리가 나옵니다.
        </p>
        <p>
          <strong>3단계.</strong> 유지 칼로리에서 하루 300~500kcal를 뺀 값이 감량 목표입니다.
          체지방 1kg을 빼려면 약 7,700kcal의 적자가 필요하므로, 하루 500kcal씩이면 <strong>주당 약 0.45kg</strong> 감량 속도가 됩니다.
          <SeoLink href="/daily/calorie">칼로리 계산기</SeoLink>에서 목표 열량을 잡아보세요.
        </p>
        <p>
          <strong>4단계.</strong> 체중계 숫자만 보지 말고 <SeoLink href="/health/bodyfat">체지방률</SeoLink>을 함께 확인하세요.
          근력운동을 병행하면 체중은 그대로인데 체지방만 줄어드는 시기가 반드시 옵니다.
          그때 체중만 보면 &ldquo;정체기&rdquo;로 오해하고 포기하기 쉽습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="건강 계산, 자주 묻는 질문"
        items={[
          { q: '체지방률은 어떻게 구하나요?', a: '이 사이트는 미 해군(US Navy) 둘레법을 사용합니다. 남성은 목·허리둘레와 키, 여성은 목·허리·엉덩이둘레와 키로 계산합니다. 인바디 같은 생체전기저항 측정과는 몇 %p 차이가 날 수 있지만, 같은 방법으로 꾸준히 측정하면 변화 추세를 보는 데는 충분합니다.' },
          { q: '하루 물 섭취량은 얼마가 적당한가요?', a: '일반적으로 체중 1kg당 30~35ml를 권장합니다. 70kg이면 2.1~2.45L입니다. 다만 운동량, 기온, 카페인 섭취량에 따라 달라지고, 음식으로 섭취하는 수분도 포함되므로 절대 기준으로 삼기보다 참고치로 보세요. 신장 질환이 있다면 반드시 의사와 상의해야 합니다.' },
          { q: '수면 계산기는 어떤 원리인가요?', a: '수면은 약 90분 주기로 얕은 잠과 깊은 잠을 오갑니다. 주기가 끝나는 시점에 깨면 같은 시간을 자도 훨씬 개운합니다. 잠드는 데 걸리는 시간(보통 14분)을 더해 90분 배수로 기상 시각을 역산합니다.' },
          { q: '어린이도 같은 BMI 기준을 쓰나요?', a: '아닙니다. 성장기 어린이·청소년은 나이와 성별에 따른 백분위수(percentile)로 판단합니다. 5백분위 미만은 저체중, 85백분위 이상은 과체중, 95백분위 이상은 비만으로 봅니다. 어린이 BMI 계산기를 따로 이용하세요.' },
        ]}
      />

      <SeoSection title="⚠️ 참고해 주세요">
        <p>
          이 페이지의 계산기는 공개된 공식과 기준을 적용한 <strong>참고용 추정치</strong>이며 의학적 진단이 아닙니다.
          체중 변화가 급격하거나, 지병이 있거나, 임신 중이라면 반드시 의료 전문가와 상담하세요.
          자세한 내용은 <SeoLink href="/disclaimer">면책조항</SeoLink>을 확인해 주세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
