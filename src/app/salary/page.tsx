import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from '@/components/SeoContent';
import { ogImageUrl } from '@/utils/og';
import { won, fmtSalary } from '@/utils/format';
import { netPay } from '@/utils/tax';
import SalaryCalculator from './SalaryCalculator';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const salary = sp.salary ? +sp.salary : 0;
  const dependents = sp.dependents ? +sp.dependents : 1;
  const nontax = sp.nontax !== 'false';

  const base: Metadata = {
    title: '연봉 실수령액 계산기 · 2026',
    description: '내 연봉 실수령액은 얼마? 연봉 입력하면 4대보험·소득세 공제 후 월 실수령액과 상위 몇 %인지 바로 확인. 2026 최신 요율.',
    alternates: { canonical: "https://moduncalc.com/salary" },
    openGraph: {
      title: "2026 연봉 실수령액 계산기 - 4대보험 공제 후 실수령액",
      description: "연봉만 입력하면 실수령액 + 동 연령대 백분위 바로 확인. 2026 4대보험 요율 반영.",
      url: "https://moduncalc.com/salary",
    },
  };

  if (salary > 0) {
    const pay = netPay(salary, dependents, nontax);
    const resultText = `월 ${won(pay.netMonth)}`;
    const inputsText = `연봉 ${fmtSalary(salary)}원`;
    base.openGraph = {
      ...base.openGraph,
      images: [{ url: ogImageUrl({ title: '연봉 실수령액 계산기', result: resultText, inputs: inputsText, desc: '4대보험·소득세 공제 후' }), width: 1200, height: 630 }],
    };
  }

  return base;
}

export default function SalaryPage() {
  return (
    <PageLayout
      eyebrow="연봉 계산기"
      title="연봉 실수령액 · 백분위"
      description="연봉과 나이를 입력하면 실수령액과 동 연령대 급여 백분위를 알려드려요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }]} />
      <CalculatorJsonLd name="연봉 실수령액 계산기" description="2026년 연봉 실수령액과 급여 백분위를 한번에 계산하세요." url="https://moduncalc.com/salary" />
      <FaqJsonLd items={[{q:"4대보험은 어떻게 계산되나요?",a:"2026년 근로자 부담분 기준으로 국민연금 4.75%, 건강보험 3.595%, 장기요양보험 건강보험료의 13.14%, 고용보험 0.9%가 적용됩니다."},{q:"연봉 백분위는 무엇인가요?",a:"같은 연령대에서 내 연봉이 상위 몇 %인지 보여주는 지표입니다."}]} />
      <SalaryCalculator />

      <SeoSection title="2026년 4대보험 요율과 공제 기준">
        <p>
          연봉 실수령액은 세전 연봉에서 <strong>4대보험료와 소득세·지방소득세</strong>를 뺀 금액입니다.
          이 계산기는 2026년 근로자 부담분 요율을 그대로 반영합니다.
        </p>
        <SeoList>
          <li><strong>국민연금 4.75%</strong> — 기준소득월액 상한(2026년 7월 기준 659만원)까지만 부과되므로, 고연봉일수록 부담 비중이 줄어듭니다.</li>
          <li><strong>건강보험 3.595%</strong> — 소득 상한 없이 전 구간에 부과됩니다.</li>
          <li><strong>장기요양보험</strong> — 건강보험료의 13.14%가 추가로 붙습니다.</li>
          <li><strong>고용보험 0.9%</strong> — 실업급여 재원으로 쓰이는 부분만 근로자가 부담합니다.</li>
        </SeoList>
        <p>
          여기에 소득세는 과세표준에 따라 <strong>6%부터 45%까지 8단계 누진세율</strong>이 적용되고,
          지방소득세로 소득세의 10%가 더해집니다. 각 항목을 더 자세히 뜯어보고 싶다면{' '}
          <SeoLink href="/guide/4-insurance">4대보험 완전 정리 가이드</SeoLink>를 함께 읽어보세요.
        </p>
      </SeoSection>

      <SeoSection title="실수령액 계산 공식">
        <p>계산기가 내부적으로 밟는 순서는 다음과 같습니다.</p>
        <SeoFormula>
          <div>① 과세대상 급여 = 연봉 − 비과세액(식대 월 20만원 적용 시 연 240만원)</div>
          <div>② 근로소득금액 = 과세대상 급여 − 근로소득공제</div>
          <div>③ 과세표준 = 근로소득금액 − 인적공제(1인당 150만원) − 4대보험료</div>
          <div>④ 산출세액 = 과세표준 × 누진세율 − 누진공제</div>
          <div>⑤ 결정세액 = 산출세액 − 근로소득세액공제</div>
          <div>⑥ 월 실수령액 = (연봉 − 4대보험료 − 결정세액 − 지방소득세) ÷ 12</div>
        </SeoFormula>
        <p>
          같은 연봉이라도 <strong>부양가족 수와 비과세 식대 적용 여부</strong>에 따라 실수령액이 월 몇만원씩 달라집니다.
          부양가족 1명이 늘면 과세표준이 150만원 줄어들어, 세율 구간에 따라 연 9만원~67만원가량 세금이 감소합니다.
          연봉 구간별 실수령액을 한 번에 비교하려면 <SeoLink href="/salary/table">2026 연봉 실수령액표</SeoLink>가 편하고,
          개념 정리는 <SeoLink href="/guide/salary-net-pay">연봉 실수령액 완전 정리</SeoLink>에 자세히 담겨 있습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="실수령액에 대해 이런 점도 궁금하실 거예요"
        items={[
          { q: '계산기 금액과 실제 급여명세서가 다른 이유는 무엇인가요?', a: '이 계산기는 국세청 간이세액표가 아니라 연말정산 기준 산식으로 계산합니다. 회사는 매달 간이세액표로 원천징수하기 때문에 월별 금액에 차이가 생기고, 이 차이는 다음 해 연말정산에서 환급 또는 추가 납부로 정산됩니다. 또한 노조회비, 사우회비, 상조회비 같은 회사별 공제 항목은 반영되지 않습니다.' },
          { q: '비과세 식대는 어떻게 적용되나요?', a: '식대는 월 20만원까지 비과세입니다. 비과세 금액은 소득세와 4대보험 산정 기준에서 모두 빠지므로, 같은 연봉이라도 식대를 비과세로 잡으면 연간 실수령액이 대략 40만~60만원 늘어납니다. 다만 국민연금 납부액이 줄어드는 만큼 나중에 받을 연금액도 소폭 줄어듭니다.' },
          { q: '국민연금 상한선에 걸리면 어떻게 되나요?', a: '국민연금은 기준소득월액 상한(2026년 7월 기준 659만원)을 넘는 소득에는 부과되지 않습니다. 즉 월 급여가 659만원을 넘어가면 국민연금 보험료는 더 이상 늘지 않고 고정됩니다. 그래서 고연봉 구간에서는 연봉이 오를수록 실수령률이 조금씩 높아지는 구간이 나타납니다.' },
          { q: '연봉 백분위는 어떤 기준인가요?', a: '같은 연령대 임금근로자 소득 분포에서 내 연봉이 상위 몇 %에 해당하는지를 보여주는 참고 지표입니다. 통계 기반 추정치이므로 업종·지역·고용형태에 따라 체감과 다를 수 있으며, 절대적인 순위로 받아들이기보다 대략적인 위치를 가늠하는 용도로 활용하세요.' },
          { q: '연말정산에서 환급을 더 받으려면 무엇을 챙겨야 하나요?', a: '신용카드·체크카드 사용액 소득공제, 연금저축과 IRP 세액공제(합산 연 900만원 한도), 의료비·교육비·기부금 세액공제가 대표적입니다. 특히 연금저축·IRP는 공제율이 13.2~16.5%로 높아 효과가 큽니다. 자세한 준비 순서는 연말정산 초보 가이드에서 확인하세요.' },
        ]}
      />

      <SeoSection title="연말정산까지 이어서 확인하기">
        <p>
          실수령액을 확인했다면 다음 단계는 연말정산입니다. 매달 원천징수된 세금과 실제 부담해야 할 세금의 차액을
          정산하는 절차로, 공제 항목을 얼마나 챙겼느냐에 따라 환급액이 크게 달라집니다.{' '}
          <SeoLink href="/guide/year-end-tax">연말정산 초보 가이드</SeoLink>에서 준비 순서와 놓치기 쉬운 공제를 정리했고,
          퇴사를 앞두고 있다면 <SeoLink href="/salary/severance">퇴직금 계산기</SeoLink>로 예상 퇴직금도 함께 확인해 보세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
