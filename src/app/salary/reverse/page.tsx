import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { CalculatorJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from '@/components/SeoContent';
import SalaryReverse from './SalaryReverse';

export const metadata: Metadata = {
  title: '실수령액으로 연봉 역산 - 희망 실수령 연봉 계산기',
  description: '원하는 월 실수령액을 입력하면 필요한 세전 연봉을 역산합니다. 실수령 300만원이면 연봉 4,140만원. 2026년 4대보험·소득세 반영.',
  alternates: { canonical: 'https://moduncalc.com/salary/reverse' },
  openGraph: {
    title: '실수령액으로 필요 연봉 역산하기 (2026)',
    description: '희망 월 실수령액으로 세전 연봉 역산. 4대보험·소득세 자동 반영.',
    url: 'https://moduncalc.com/salary/reverse',
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="역방향 계산"
      title="실수령액 → 연봉 역산"
      description="원하는 월 실수령액을 입력하면 필요한 세전 연봉을 알려드려요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }, { name: '실수령액 역산', href: '/salary/reverse' }]} />
      <CalculatorJsonLd
        name="실수령액으로 연봉 역산 계산기"
        description="희망 월 실수령액을 입력하면 필요한 세전 연봉을 역산합니다. 2026년 4대보험·소득세 반영."
        url="https://moduncalc.com/salary/reverse"
      />
      <FaqJsonLd
        items={[
          { q: '실수령 300만원 받으려면 연봉이 얼마여야 하나요?', a: '부양가족 1인, 비과세 식대 월 20만원 적용 기준으로 세전 연봉 약 4,140만원이 필요합니다. 월 공제액은 약 44만 8천원입니다.' },
          { q: '실수령 400만원이면 연봉은 얼마인가요?', a: '같은 조건에서 세전 연봉 약 5,700만원이 필요합니다. 실수령이 100만원 오르는 데 세전 연봉은 1,560만원이 더 필요합니다.' },
          { q: '역산 결과가 정확한가요?', a: '2026년 4대보험 요율(국민연금 4.75%, 건강보험 3.595%, 장기요양 13.14%, 고용보험 0.9%)과 소득세 누진세율을 기반으로 한 추정치입니다. 회사별 공제 항목에 따라 실제와 차이가 있을 수 있습니다.' },
          { q: '부양가족이 늘면 필요 연봉이 줄어드나요?', a: '네. 실수령 300만원 기준으로 부양가족 1인은 4,140만원, 4인은 4,040만원이 필요합니다. 1인당 약 30~40만원씩 줄어듭니다.' },
        ]}
      />
      <SalaryReverse />

      <SeoSection title="실수령액 → 연봉 역산표 (2026년 기준)">
        <p>
          부양가족 1인, 비과세 식대 월 20만원을 적용했을 때
          <strong> 원하는 월 실수령액별로 필요한 세전 연봉</strong>입니다.
          이 표는 이 페이지의 계산기와 똑같은 산식으로 만들어졌습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">희망 월 실수령액</th>
                <th className="text-right p-2 font-bold">필요 세전 연봉</th>
                <th className="text-right p-2 font-bold">월 공제액</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--line)]"><td className="p-2">200만원</td><td className="p-2 text-right font-bold">2,670만원</td><td className="p-2 text-right">약 22만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">250만원</td><td className="p-2 text-right font-bold">3,370만원</td><td className="p-2 text-right">약 31만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">300만원</td><td className="p-2 text-right font-bold">4,140만원</td><td className="p-2 text-right">약 45만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">350만원</td><td className="p-2 text-right font-bold">4,920만원</td><td className="p-2 text-right">약 60만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">400만원</td><td className="p-2 text-right font-bold">5,700만원</td><td className="p-2 text-right">약 75만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">500만원</td><td className="p-2 text-right font-bold">7,300만원</td><td className="p-2 text-right">약 108만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">600만원</td><td className="p-2 text-right font-bold">9,010만원</td><td className="p-2 text-right">약 151만원</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          표를 위에서 아래로 훑어보면 한 가지가 눈에 띕니다.
          실수령 200만원에서 300만원으로 <strong>100만원 올리는 데는 세전 연봉 1,470만원</strong>이 필요한데,
          500만원에서 600만원으로 올리는 데는 <strong>1,710만원</strong>이 필요합니다.
          누진세 구간이 올라가면서 같은 실수령 증가분에 더 많은 세전 연봉이 들어가는 구조입니다.
        </p>
      </SeoSection>

      <SeoSection title="역산은 왜 단순 나눗셈으로 안 되나">
        <p>
          &ldquo;실수령이 세전의 85% 정도니까 300만원 ÷ 0.85 = 353만원, 연봉 4,240만원&rdquo;
          같은 계산이 맞지 않는 이유는 <strong>공제율이 연봉 구간마다 달라지기 때문</strong>입니다.
          4대보험은 소득에 비례하지만 소득세는 누진 구조라, 공제율이 연봉이 오를수록 함께 올라갑니다.
        </p>
        <SeoFormula>
          <div>실수령액 = 세전 연봉 − (4대보험 + 소득세 + 지방소득세)</div>
          <div>4대보험 = 국민연금 4.75% + 건강보험 3.595% + 장기요양(건보료×13.14%) + 고용보험 0.9%</div>
          <div>소득세 = 누진세율(6~45%) 적용 후 근로소득세액공제 차감</div>
        </SeoFormula>
        <p>
          소득세가 연봉의 함수이고, 그 연봉이 다시 우리가 구하려는 미지수이기 때문에 역산은
          방정식을 직접 푸는 대신 <strong>이분법(bisection)으로 수치 해</strong>를 찾아야 합니다.
          이 계산기는 세전 연봉을 조금씩 조정해 가며 목표 실수령액과 일치하는 지점을 찾아냅니다.
        </p>
        <p>
          실제 공제 구조를 보면 이해가 빠릅니다. 연봉 4,300만원(부양가족 1인, 비과세 적용)의 월 공제 내역은
          국민연금 160,708원, 건강보험+장기요양 137,613원, 고용보험 30,450원, 소득세 136,084원, 지방소득세 13,608원입니다.
          <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>에서 항목별로 확인할 수 있습니다.
        </p>
      </SeoSection>

      <SeoSection title="같은 실수령액이라도 조건에 따라 연봉이 달라집니다">
        <SeoList>
          <li>
            <strong>부양가족 수</strong> — 실수령 300만원 기준으로 부양가족 1인은 4,140만원,
            2인 4,100만원, 3인 4,070만원, 4인 4,040만원이 필요합니다. 1인당 기본공제 150만원이
            과세표준에서 빠지기 때문입니다.
          </li>
          <li>
            <strong>비과세 식대</strong> — 월 20만원 비과세 식대를 적용하면 4,140만원,
            적용하지 않으면 4,210만원이 필요합니다. 같은 실수령액을 받는 데 세전 연봉이
            <strong> 70만원 차이</strong>가 납니다. 연봉 협상 시 식대를 비과세로 잡아달라고 요청할 만한 이유입니다.
          </li>
          <li>
            <strong>상여금·성과급 포함 여부</strong> — 이 계산기는 연봉을 12개월로 균등 분할한 기준입니다.
            상여금이 별도로 지급되는 구조라면 월 실수령액은 이보다 낮고, 상여금이 나오는 달에 몰립니다.
          </li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="연봉 협상 전에 꼭 확인할 것"
        items={[
          {
            q: '연봉 협상 자리에서 이 숫자를 그대로 말해도 되나요?',
            a: '실수령 기준으로 말하면 오히려 협상이 꼬이는 경우가 많습니다. 회사는 세전 연봉(계약 연봉) 기준으로 예산을 잡기 때문입니다. "실수령 300만원 원한다"보다 "세전 4,200만원 생각하고 있다"고 말하는 편이 대화가 빠릅니다. 이 계산기는 그 세전 숫자를 미리 정하는 용도로 쓰세요.',
          },
          {
            q: '계약 연봉에 퇴직금이 포함돼 있다고 하는데요?',
            a: '연봉에 퇴직금을 포함하는 이른바 13분할 계약은 실질 임금을 약 1/13(약 7.7%) 낮추는 효과가 있습니다. 세전 4,200만원이라도 퇴직금 포함이면 실제 급여는 약 3,877만원 수준입니다. 계약서에 "연봉에 퇴직금 포함" 문구가 있는지 반드시 확인하고, 퇴직금 규모는 퇴직금 계산기로 따로 확인하세요.',
          },
          {
            q: '연봉이 오르면 실수령액도 같은 비율로 오르나요?',
            a: '아닙니다. 과세표준 구간을 넘어서면 초과분에 더 높은 세율이 붙습니다. 예를 들어 과세표준 5,000만원을 넘는 순간 초과분 세율이 15%에서 24%로 올라갑니다. 연봉 인상률이 10%라도 실수령 인상률은 8% 안팎에 머무는 경우가 흔합니다.',
          },
          {
            q: '4대보험료는 매년 바뀌나요?',
            a: '네. 국민연금 보험료율은 2026년 9%에서 9.5%로 올랐고(근로자 부담 4.75%), 2033년까지 매년 0.5%p씩 올라 13%가 됩니다. 건강보험료율은 2026년 7.19%(근로자 3.595%)입니다. 국민연금 기준소득월액 상한은 매년 7월에 조정되며 2026년 7월부터 659만원입니다.',
          },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          역산한 연봉을 정방향으로 다시 확인하려면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>를,
          연봉 구간별로 한눈에 비교하려면 <SeoLink href="/salary/table">실수령액 표</SeoLink>를 보세요.
          공제 항목을 자세히 뜯어보려면 <SeoLink href="/salary/insurance">4대보험 계산기</SeoLink>를 이용하세요.
          퇴직금까지 포함한 총 보상을 따지려면 <SeoLink href="/salary/severance">퇴직금 계산기</SeoLink>도 함께 확인해 보시길 권합니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
