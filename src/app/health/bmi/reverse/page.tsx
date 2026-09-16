import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { CalculatorJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from '@/components/SeoContent';
import BmiReverse from './BmiReverse';

export const metadata: Metadata = {
  title: '목표 BMI 달성 체중 계산기 - BMI 역방향 계산',
  description: '원하는 BMI를 달성하려면 몇 kg이어야 하는지 계산합니다. 170cm 정상 체중은 53.5~66.5kg. 키별 목표 체중표 포함.',
  alternates: { canonical: 'https://moduncalc.com/health/bmi/reverse' },
  openGraph: { title: '목표 BMI 달성 체중 계산 (아시아태평양 기준)', description: '목표 BMI 입력 → 필요 체중 역산. 키별 정상 체중 범위도 함께 확인.', url: 'https://moduncalc.com/health/bmi/reverse' },
};

export default function Page() {
  return (
    <PageLayout eyebrow="BMI 역방향 계산" title="목표 BMI → 체중 계산기" description="원하는 BMI를 달성하려면 체중이 몇 kg이어야 하는지 역산해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '건강', href: '/health' }, { name: 'BMI', href: '/health/bmi' }, { name: '목표 체중 역산', href: '/health/bmi/reverse' }]} />
      <CalculatorJsonLd name="목표 BMI 달성 체중 계산기" description="목표 BMI를 입력하면 필요한 체중을 역산합니다. WHO 아시아태평양 기준 적용." url="https://moduncalc.com/health/bmi/reverse" />
      <FaqJsonLd items={[
        { q: '정상 BMI가 되려면 몇 kg이어야 하나요?', a: '키에 따라 다릅니다. 아시아태평양 기준 정상 BMI는 18.5~23이며, 170cm라면 53.5~66.5kg, 160cm라면 47.4~58.9kg입니다.' },
        { q: 'BMI 22가 왜 기준이 되나요?', a: 'BMI 22 부근에서 사망률과 만성질환 위험이 가장 낮다는 연구가 많아 표준체중 기준으로 널리 쓰입니다. 170cm라면 63.6kg입니다.' },
        { q: '목표 체중까지 얼마나 걸리나요?', a: '체지방 1kg을 빼려면 약 7,700kcal의 열량 적자가 필요합니다. 하루 500kcal씩 적자를 내면 주당 약 0.45kg, 5kg 감량에 약 11주가 걸립니다.' },
      ]} />
      <BmiReverse />

      <SeoSection title="키별 목표 체중표 (WHO 아시아태평양 기준)">
        <p>
          BMI는 체중을 키의 제곱으로 나눈 값이라, <strong>목표 BMI × 키(m)²</strong>로 목표 체중을 바로 구할 수 있습니다.
          자주 쓰이는 키에 대해 미리 계산해 두었습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">키</th>
                <th className="text-right p-2 font-bold">저체중 경계<br /><span className="font-normal text-[var(--sub)]">BMI 18.5</span></th>
                <th className="text-right p-2 font-bold">표준체중<br /><span className="font-normal text-[var(--sub)]">BMI 22</span></th>
                <th className="text-right p-2 font-bold">과체중 경계<br /><span className="font-normal text-[var(--sub)]">BMI 23</span></th>
                <th className="text-right p-2 font-bold">비만 경계<br /><span className="font-normal text-[var(--sub)]">BMI 25</span></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">155cm</td><td className="p-2 text-right">44.4kg</td><td className="p-2 text-right">52.9kg</td><td className="p-2 text-right">55.3kg</td><td className="p-2 text-right">60.1kg</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">160cm</td><td className="p-2 text-right">47.4kg</td><td className="p-2 text-right">56.3kg</td><td className="p-2 text-right">58.9kg</td><td className="p-2 text-right">64.0kg</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">165cm</td><td className="p-2 text-right">50.4kg</td><td className="p-2 text-right">59.9kg</td><td className="p-2 text-right">62.6kg</td><td className="p-2 text-right">68.1kg</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">170cm</td><td className="p-2 text-right">53.5kg</td><td className="p-2 text-right">63.6kg</td><td className="p-2 text-right">66.5kg</td><td className="p-2 text-right">72.2kg</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">175cm</td><td className="p-2 text-right">56.7kg</td><td className="p-2 text-right">67.4kg</td><td className="p-2 text-right">70.4kg</td><td className="p-2 text-right">76.6kg</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">180cm</td><td className="p-2 text-right">59.9kg</td><td className="p-2 text-right">71.3kg</td><td className="p-2 text-right">74.5kg</td><td className="p-2 text-right">81.0kg</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">185cm</td><td className="p-2 text-right">63.3kg</td><td className="p-2 text-right">75.3kg</td><td className="p-2 text-right">78.7kg</td><td className="p-2 text-right">85.6kg</td></tr>
            </tbody>
          </table>
        </div>
        <SeoFormula>
          <div>목표 체중(kg) = 목표 BMI × 키(m) × 키(m)</div>
          <div>예: BMI 22, 170cm → 22 × 1.7 × 1.7 = 63.6kg</div>
        </SeoFormula>
      </SeoSection>

      <SeoSection title="목표 BMI를 몇으로 잡아야 할까">
        <p>
          한국에서 쓰는 기준은 WHO <strong>아시아태평양 기준</strong>입니다.
          서양 기준(25 이상 과체중, 30 이상 비만)보다 엄격한데,
          아시아인은 같은 BMI에서도 내장지방 비율이 높고 당뇨·심혈관 질환 위험이 크다는 연구 결과 때문입니다.
        </p>
        <SeoList>
          <li><strong>BMI 22</strong> — 표준체중. 사망률과 만성질환 위험이 가장 낮은 구간으로 알려져 있어, 장기 목표로 삼기 좋습니다.</li>
          <li><strong>BMI 23</strong> — 과체중이 시작되는 경계. 현재 BMI가 25를 넘는다면 우선 이 선까지 내려오는 것을 1차 목표로 잡는 편이 현실적입니다.</li>
          <li><strong>BMI 25</strong> — 비만이 시작되는 경계. 건강검진에서 &lsquo;비만&rsquo; 판정이 나오는 지점입니다.</li>
          <li><strong>BMI 18.5 미만</strong> — 저체중. 면역력 저하, 골밀도 감소, 여성의 경우 생리불순 위험이 있어 무리한 감량 목표로 삼지 않는 것이 좋습니다.</li>
        </SeoList>
        <p>
          다만 BMI는 키와 몸무게만 쓰는 지표라 <strong>근육과 지방을 구분하지 못합니다.</strong>
          근력운동을 꾸준히 하는 사람은 BMI가 25를 넘어도 체지방률이 정상인 경우가 흔합니다.
          목표 체중을 정할 때 <SeoLink href="/health/bodyfat">체지방률 계산기</SeoLink>를 함께 보는 이유입니다.
        </p>
      </SeoSection>

      <SeoSection title="목표 체중까지 걸리는 시간 계산하기">
        <p>
          체지방 1kg을 줄이려면 약 <strong>7,700kcal의 열량 적자</strong>가 필요합니다.
          여기서 현실적인 감량 속도가 나옵니다.
        </p>
        <SeoFormula>
          <div>하루 적자 300kcal → 주당 약 0.27kg → 5kg 감량에 약 18주</div>
          <div>하루 적자 500kcal → 주당 약 0.45kg → 5kg 감량에 약 11주</div>
          <div>하루 적자 700kcal → 주당 약 0.64kg → 5kg 감량에 약 8주</div>
        </SeoFormula>
        <p>
          주당 0.5~1kg이 일반적으로 권장되는 속도입니다. 이보다 빠르면 근육 손실과 요요 위험이 커집니다.
          하루에 몇 kcal을 먹어야 적자가 나는지는 <SeoLink href="/health/bmr">기초대사량 계산기</SeoLink>로
          유지 칼로리를 먼저 구한 뒤 거기서 300~500kcal을 빼면 됩니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="목표 체중, 이런 점도 궁금하실 거예요"
        items={[
          { q: '체중은 그대로인데 옷이 헐렁해졌어요. 정체기인가요?', a: '아닙니다. 근력운동을 병행하면 지방이 줄고 근육이 느는 시기가 옵니다. 근육은 지방보다 밀도가 높아 같은 무게라도 부피가 작습니다. 체중계 숫자가 멈춰도 허리둘레와 체지방률이 줄고 있다면 잘 진행되고 있는 것입니다.' },
          { q: '아침과 저녁 체중이 1~2kg 차이 나는데 정상인가요?', a: '정상입니다. 수분, 음식물, 글리코겐 저장량에 따라 하루 안에도 1~2kg이 오르내립니다. 측정은 아침 기상 직후 화장실을 다녀온 뒤 같은 조건에서 하고, 하루 단위가 아니라 주 단위 평균으로 추세를 보세요.' },
          { q: '어린이도 이 기준을 쓰나요?', a: '아닙니다. 성장기 어린이·청소년은 성인 BMI 기준이 아니라 같은 나이·성별 집단 내 백분위수로 판단합니다. 5백분위 미만 저체중, 85백분위 이상 과체중, 95백분위 이상 비만입니다. 어린이 BMI 계산기를 따로 이용하세요.' },
          { q: '목표 체중에 도달한 뒤에는 어떻게 하나요?', a: '감량 중 줄여둔 섭취량을 한꺼번에 되돌리면 요요가 옵니다. 2~4주에 걸쳐 주당 100~200kcal씩 천천히 늘려 유지 칼로리에 복귀하는 방식이 권장됩니다. 감량기에 근력운동을 병행해 근육량을 지켜두면 유지 칼로리 자체가 높아져 훨씬 수월합니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          현재 BMI가 궁금하면 <SeoLink href="/health/bmi">BMI 계산기</SeoLink>,
          하루에 몇 kcal을 써야 하는지는 <SeoLink href="/health/bmr">기초대사량 계산기</SeoLink>,
          식단 목표 열량은 <SeoLink href="/daily/calorie">칼로리 계산기</SeoLink>에서 확인하세요.
          체중 대신 체성분을 보고 싶다면 <SeoLink href="/health/bodyfat">체지방률 계산기</SeoLink>가 유용하고,
          다른 건강 지표는 <SeoLink href="/health">건강 계산기 모음</SeoLink>에 모아두었습니다.
        </p>
      </SeoSection>

      <SeoSection title="⚠️ 참고해 주세요">
        <p>
          이 계산기는 공개된 공식과 WHO 아시아태평양 기준을 적용한 <strong>참고용 추정치</strong>이며 의학적 진단이 아닙니다.
          지병이 있거나 임신 중이거나 성장기라면 목표 체중을 스스로 정하기 전에 반드시 의료 전문가와 상담하세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
