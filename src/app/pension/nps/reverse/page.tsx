import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { CalculatorJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from '@/components/SeoContent';
import PensionReverse from './PensionReverse';

export const metadata: Metadata = {
  title: '목표 연금액으로 필요 가입기간 역산 - 국민연금 역방향 계산기',
  description: '월 100만원 연금을 받으려면 몇 년 납입해야 할까? 소득 300만원이면 30년. 목표 연금액으로 필요 가입기간을 역산합니다.',
  alternates: { canonical: 'https://moduncalc.com/pension/nps/reverse' },
  openGraph: {
    title: '국민연금 목표액 역산하기 (2026)',
    description: '희망 월 연금액 입력 → 필요 가입기간 역산. 소득별 시뮬레이션 표 포함.',
    url: 'https://moduncalc.com/pension/nps/reverse',
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="국민연금 역방향"
      title="목표 연금액 → 필요 가입기간"
      description="원하는 월 연금액을 입력하면 몇 년 동안 납입해야 하는지 역산해 드려요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연금', href: '/pension' }, { name: '국민연금', href: '/pension/nps' }, { name: '가입기간 역산', href: '/pension/nps/reverse' }]} />
      <CalculatorJsonLd
        name="국민연금 역방향 계산기"
        description="희망 월 연금액을 입력하면 필요한 국민연금 가입기간을 역산합니다."
        url="https://moduncalc.com/pension/nps/reverse"
      />
      <FaqJsonLd items={[
        { q: '월 100만원 연금을 받으려면 몇 년 내야 하나요?', a: '월 소득 300만원 기준으로 약 30년 가입이 필요합니다. 소득이 400만원이면 약 26년, 200만원이면 약 36년입니다.' },
        { q: '국민연금 최대 얼마까지 받을 수 있나요?', a: '기준소득월액 상한이 659만원(2026.7~2027.6)이라 소득이 아무리 높아도 연금 산정에 반영되는 소득에는 한계가 있습니다. 40년 가입에 상한 소득이라도 월 200만원 안팎이 현실적인 상한선입니다.' },
        { q: '10년 미만 가입하면 어떻게 되나요?', a: '노령연금 수급 요건인 최소 가입기간 10년을 채우지 못하면 매달 받는 연금 대신 반환일시금으로 돌려받습니다. 낸 보험료에 이자를 더한 금액입니다.' },
        { q: '가입기간을 늘리는 방법이 있나요?', a: '추후납부(추납), 임의가입, 임의계속가입, 실업크레딧·군복무크레딧·출산크레딧 등이 있습니다. 경력 단절 기간이 있다면 추납으로 메울 수 있습니다.' },
      ]} />
      <PensionReverse />

      <SeoSection title="소득별 필요 가입기간 (목표 연금액 기준)">
        <p>
          이 계산기와 같은 산식으로 미리 계산한 결과입니다.
          <strong>가로는 목표 월 연금액, 세로는 현재 월 소득</strong>입니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">월 소득</th>
                <th className="text-right p-2 font-bold">월 80만원</th>
                <th className="text-right p-2 font-bold">월 100만원</th>
                <th className="text-right p-2 font-bold">월 120만원</th>
                <th className="text-right p-2 font-bold">월 150만원</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">200만원</td><td className="p-2 text-right">약 29년</td><td className="p-2 text-right">약 36년</td><td className="p-2 text-right">약 43년</td><td className="p-2 text-right text-[var(--sub)]">45년으로도 불가</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">300만원</td><td className="p-2 text-right">약 24년</td><td className="p-2 text-right">약 30년</td><td className="p-2 text-right">약 36년</td><td className="p-2 text-right text-[var(--sub)]">45년으로도 불가</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">400만원</td><td className="p-2 text-right">약 21년</td><td className="p-2 text-right">약 26년</td><td className="p-2 text-right">약 31년</td><td className="p-2 text-right">약 39년</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">500만원</td><td className="p-2 text-right">약 18년</td><td className="p-2 text-right">약 23년</td><td className="p-2 text-right">약 27년</td><td className="p-2 text-right">약 34년</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          표를 가로로 보면 <strong>소득이 두 배여도 필요 기간이 절반으로 줄지 않는다</strong>는 점이 눈에 띕니다.
          월 소득 200만원과 500만원은 2.5배 차이지만, 월 100만원 연금에 필요한 기간은 36년과 23년으로 1.6배 차이에 그칩니다.
          국민연금에 소득재분배 기능이 들어 있기 때문입니다.
        </p>
      </SeoSection>

      <SeoSection title="연금액은 이렇게 계산됩니다">
        <p>
          국민연금 수령액은 <strong>내 소득(B값)</strong>과 <strong>전체 가입자 평균소득(A값)</strong>을 반씩 반영합니다.
          A값이 절반 들어가기 때문에 소득이 두 배라고 연금이 두 배가 되지 않는 것입니다.
        </p>
        <SeoFormula>
          <div>기본연금액(연) = 1.29 × (A값 + B값) × (가입기간 ÷ 20) × (1 + 0.05 × 20년 초과 연수)</div>
          <div>A값 = 전체 가입자 평균소득월액 3년 평균 (2026년 3,193,511원)</div>
          <div>B값 = 본인의 가입기간 중 기준소득월액 평균 (상한 659만원, 하한 41만원)</div>
        </SeoFormula>
        <p>
          여기서 중요한 것이 마지막 항입니다. <strong>가입기간이 20년을 넘으면 1년마다 5%씩 가산</strong>됩니다.
          30년 가입은 20년 가입의 1.5배가 아니라, 기본 산식에 더해 50% 가산이 붙어 실제로는 훨씬 유리합니다.
          연금을 늘리는 가장 확실한 방법이 &lsquo;오래 내는 것&rsquo;인 이유입니다.
        </p>
      </SeoSection>

      <SeoSection title="가입기간이 모자랄 때 쓸 수 있는 방법">
        <SeoList>
          <li><strong>추후납부(추납)</strong> — 실직·휴직 등으로 납부예외였던 기간의 보험료를 나중에 내서 가입기간으로 인정받습니다. 최대 119개월까지 가능하며 분할납부도 됩니다.</li>
          <li><strong>임의가입</strong> — 소득이 없는 전업주부·학생도 본인 희망으로 가입할 수 있습니다. 10년을 채워 연금 수급권을 확보하려는 목적으로 많이 씁니다.</li>
          <li><strong>임의계속가입</strong> — 만 60세가 되어 의무가입이 끝났지만 10년을 못 채웠거나 더 늘리고 싶을 때, 만 65세까지 계속 낼 수 있습니다.</li>
          <li><strong>크레딧 제도</strong> — 출산(둘째부터), 군복무, 실업 기간에 대해 가입기간을 일부 인정해 줍니다. 신청해야 반영되는 경우가 있으니 확인하세요.</li>
          <li><strong>연기연금</strong> — 수급 시기를 최대 5년 미루면 1년당 7.2%씩 늘어납니다. 5년을 미루면 36% 증액됩니다.</li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="국민연금 역산, 자주 묻는 질문"
        items={[
          { q: '이 계산 결과가 실제 수령액과 같나요?', a: '아닙니다. 이 계산은 현재 소득이 은퇴까지 유지된다는 가정 아래 현재 가치로 계산한 추정치입니다. 실제 연금액은 매년 재평가되는 A값, 가입 기간 중 소득 변동, 물가상승률에 따른 연금액 조정에 따라 달라집니다. 정확한 예상액은 국민연금공단 내 연금 알아보기 서비스에서 확인하세요.' },
          { q: '목표 연금액을 얼마로 잡아야 하나요?', a: '흔히 은퇴 전 소득의 60~70%를 노후 필요 소득으로 봅니다. 국민연금만으로 이를 채우기는 어렵기 때문에 퇴직연금과 개인연금을 함께 쌓는 3층 구조가 권장됩니다. 국민연금으로 기본 생활비를 깔고 나머지를 보완하는 식으로 목표를 잡으면 현실적입니다.' },
          { q: '소득이 아무리 높아도 연금이 늘지 않는 구간이 있나요?', a: '있습니다. 기준소득월액 상한이 659만원(2026.7~2027.6)이라 월 소득이 그 이상이면 초과분은 보험료 산정에도, 연금 산정에도 반영되지 않습니다. 이 상한액은 매년 7월에 조정됩니다.' },
          { q: '연금을 일찍 받으면 얼마나 깎이나요?', a: '조기노령연금은 최대 5년 앞당길 수 있고 1년당 6%씩 감액되어 5년이면 30%가 줄어듭니다. 한 번 줄어든 금액은 평생 유지되므로, 다른 소득원이 있다면 서둘러 받지 않는 편이 총액 기준으로 유리한 경우가 많습니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          가입기간을 정해두고 연금액을 보려면 <SeoLink href="/pension/nps">국민연금 예상수령액 계산기</SeoLink>를,
          매달 내는 보험료가 궁금하면 <SeoLink href="/salary/insurance">4대보험 계산기</SeoLink>를 이용하세요.
          은퇴까지 벌어들일 총 소득은 <SeoLink href="/salary/lifetime">평생 근로소득 계산기</SeoLink>,
          연금 개시 전까지 필요한 자산은 <SeoLink href="/daily/fire">FIRE 계산기</SeoLink>에서 확인할 수 있습니다.
          제도 전반은 <SeoLink href="/guide/4-insurance">4대보험 완전 정리</SeoLink>에 정리해 두었습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
