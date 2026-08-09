import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import SeveranceCalc from "./SeveranceCalc";

export const metadata: Metadata = {
  title: "퇴직금 계산기 - 예상 퇴직금 조회",
  description: "퇴직금 얼마 받을 수 있을까? 입사일·퇴사일·월급 입력하면 예상 퇴직금 바로 계산.",
  alternates: { canonical: "https://moduncalc.com/salary/severance" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="근로기준법 기준" title="퇴직금 계산기" description="재직기간과 급여 정보를 입력하면 예상 퇴직금을 계산해 드려요.">
      <CalculatorJsonLd name="퇴직금 계산기" description="입사일·퇴사일·월급만 입력하면 예상 퇴직금을 바로 계산합니다." url="https://moduncalc.com/salary/severance" />
      <FaqJsonLd items={[{q:"1년 미만 근무해도 퇴직금을 받을 수 있나요?",a:"아니요, 퇴직금은 1년 이상 근무한 경우에만 발생합니다."},{q:"퇴직금에 세금이 얼마나 부과되나요?",a:"퇴직소득세가 부과되며, 근속연수와 퇴직금 규모에 따라 세율이 달라집니다."},{q:"상여금이나 성과급도 퇴직금 계산에 포함되나요?",a:"정기적으로 지급되는 상여금은 포함, 일시적 성과급은 제외될 수 있습니다."}]} />
      <SeveranceCalc />

      <SeoSection title="퇴직금 지급 요건과 법적 기준">
        <p>
          퇴직금은 <strong>근로자퇴직급여 보장법 제8조</strong>에 근거한 법정 수당입니다. 회사 규정이나
          근로계약서에 별도 언급이 없어도, 아래 두 요건을 모두 채우면 사업주는 반드시 지급해야 합니다.
        </p>
        <SeoList>
          <li><strong>계속근로기간 1년 이상</strong> — 수습기간과 휴직기간도 원칙적으로 계속근로기간에 포함됩니다.</li>
          <li><strong>4주 평균 주 15시간 이상 근무</strong> — 이 기준을 넘으면 아르바이트·계약직·일용직도 대상입니다.</li>
          <li><strong>지급기한 14일</strong> — 퇴직일로부터 14일 이내에 지급해야 하며, 당사자 합의로만 연장할 수 있습니다.</li>
          <li><strong>소멸시효 3년</strong> — 퇴직일로부터 3년 안에 청구하지 않으면 권리가 소멸합니다.</li>
        </SeoList>
        <p>
          5인 미만 사업장도 예외가 아닙니다. 2010년 12월부터 전 사업장에 퇴직급여 제도가 적용되고 있습니다.
        </p>
      </SeoSection>

      <SeoSection title="퇴직금 계산 공식">
        <p>
          퇴직금의 핵심은 <strong>평균임금</strong>입니다. 퇴직일 직전 3개월(약 92일) 동안 지급받은
          임금 총액을 그 기간의 총 일수로 나눈 값입니다.
        </p>
        <SeoFormula>
          <div>① 3개월 임금총액 = 기본급·수당 3개월분 + 연간 상여금 × (3/12) + 연차수당 × (3/12)</div>
          <div>② 1일 평균임금 = 3개월 임금총액 ÷ 그 기간의 총 일수(약 92일)</div>
          <div>③ 퇴직금 = 1일 평균임금 × 30일 × (총 재직일수 ÷ 365)</div>
        </SeoFormula>
        <p>
          쉽게 말해 <strong>1년 근무당 약 한 달치 월급</strong>이 쌓이는 구조입니다.
          단, 계산된 평균임금이 통상임금보다 적으면 통상임금을 기준으로 계산해야 합니다.
          퇴직 직전 무급휴직이나 결근이 많았다면 평균임금이 낮아질 수 있으니 이 규정을 꼭 확인하세요.
          단계별 예시는 <SeoLink href="/guide/severance-pay">퇴직금 계산법 정리</SeoLink>에서 볼 수 있습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="퇴직금, 이런 점도 확인하세요"
        items={[
          { q: '퇴직금에서 세금은 얼마나 떼나요?', a: '퇴직소득세가 원천징수됩니다. 퇴직소득은 근속연수공제와 환산급여공제를 거친 뒤 연분연승법으로 계산해, 같은 금액이라도 근속연수가 길수록 세부담이 크게 줄어듭니다. 근속 10년 안팎의 일반적인 경우 실효세율은 대체로 2~5% 수준이며, IRP 계좌로 이체받으면 수령 시점까지 과세가 이연되고 연금으로 받으면 세액의 30~40%를 감면받습니다.' },
          { q: '상여금과 연차수당도 퇴직금에 포함되나요?', a: '정기적·일률적으로 지급되는 상여금은 연간 지급액의 3/12을 평균임금에 산입합니다. 퇴직 전전년도에 발생해 미사용한 연차에 대한 수당도 같은 방식으로 3/12만 반영됩니다. 반면 경영성과에 따라 지급 여부가 달라지는 일시적 성과급, 실비 변상 성격의 출장비·경조사비는 제외됩니다.' },
          { q: '퇴직연금(DB·DC) 가입자도 계산이 같나요?', a: 'DB형은 확정급여형이라 법정 퇴직금과 동일한 산식으로 계산되므로 이 계산기 결과와 유사합니다. DC형은 회사가 매년 연간 임금총액의 1/12 이상을 적립하고 그 운용 성과에 따라 최종 수령액이 달라지므로, 운용 수익률에 따라 결과가 달라집니다. 본인 가입 유형은 급여명세서나 인사팀을 통해 확인하세요.' },
          { q: '퇴직금을 못 받으면 어떻게 해야 하나요?', a: '퇴직일로부터 14일이 지나도 지급되지 않으면 임금체불에 해당합니다. 고용노동부 고객상담센터(1350)나 노동포털에서 진정을 제기할 수 있고, 사업주가 도산해 받지 못한 경우에는 근로복지공단의 대지급금(구 체당금) 제도를 이용할 수 있습니다. 미지급 기간에는 연 20%의 지연이자도 청구 가능합니다.' },
        ]}
      />

      <SeoSection title="퇴사 전후로 함께 확인할 것들">
        <p>
          퇴직금 외에도 퇴사 시점에는 챙길 것이 많습니다. 미사용 연차가 남아 있다면{' '}
          <SeoLink href="/salary/annual">연차 계산기</SeoLink>로 잔여 일수를 확인해 연차수당을 청구하고,
          비자발적 퇴사라면 <SeoLink href="/pension/jobless">실업급여 계산기</SeoLink>로 예상 수급액과 기간을 확인해 보세요.
          재취업 시 연봉 협상에 참고할 세후 금액은 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>에서 볼 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
