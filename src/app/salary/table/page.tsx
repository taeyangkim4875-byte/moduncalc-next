import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from '@/components/SeoContent';
import NetPayTable from './NetPayTable';

export const metadata: Metadata = {
  title: '연봉 실수령액표 · 2026',
  description: '연봉 2,000만~1.5억까지 월 실수령액을 한눈에 비교. 4대보험·소득세 공제 후 내 연봉은 월 얼마?',
  alternates: { canonical: "https://moduncalc.com/salary/table" },
  openGraph: { title: "2026 연봉 실수령액표 - 2천만~1.5억 한눈에 비교", description: "연봉별 월 실수령액을 한눈에 비교. 4대보험·소득세 공제 후 실수령액 표. 2026년 최신 요율 반영.", url: "https://moduncalc.com/salary/table" },
};

export default function NetPayTablePage() {
  return (
    <PageLayout
      eyebrow="연봉 실수령액표"
      title="2026 연봉 실수령액표"
      description="연봉별 월 실수령액을 한눈에 비교할 수 있어요. 행을 탭하면 공제 내역을 확인할 수 있습니다."
    >
      <CalculatorJsonLd name="연봉 실수령액표" description="2026년 연봉별 실수령액을 한눈에 비교하세요. 2,000만원부터 1억 5,000만원까지." url="https://moduncalc.com/salary/table" />
      <FaqJsonLd items={[{q:"표에서 내 연봉 구간을 어떻게 찾나요?",a:"연봉은 100만원 단위로 나열되어 있으며, Ctrl+F로 검색하거나 스크롤하세요."},{q:"부양가족이 많으면 실수령액이 달라지나요?",a:"네, 부양가족 수에 따라 소득세가 달라져 실수령액이 변합니다."}]} />
      <NetPayTable />

      <SeoSection title="2026년 실수령액표는 어떤 기준으로 만들어졌나요">
        <p>
          이 표의 모든 금액은 <strong>2026년 4대보험 요율과 소득세법</strong>을 그대로 적용해 계산했습니다.
          부양가족 1인(본인), 비과세 식대 월 20만원을 기본 가정으로 삼았습니다.
        </p>
        <SeoList>
          <li><strong>국민연금 4.75%</strong> — 기준소득월액 상한 659만원(2026년 7월 기준)까지만 부과.</li>
          <li><strong>건강보험 3.595% + 장기요양 13.14%</strong> — 장기요양보험료는 건강보험료에 곱해 산출합니다.</li>
          <li><strong>고용보험 0.9%</strong> — 실업급여 부담분만 반영.</li>
          <li><strong>소득세 6~45% 8구간 누진세율 + 지방소득세 10%</strong> — 근로소득공제와 근로소득세액공제 반영.</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="실수령률은 왜 연봉이 오를수록 떨어질까">
        <p>
          연봉 3,000만원대의 실수령률은 약 88~89%지만, 1억원대에서는 75% 안팎까지 내려갑니다.
          누진세율 구조 때문입니다.
        </p>
        <SeoFormula>
          <div>실수령률(%) = 연 실수령액 ÷ 세전 연봉 × 100</div>
          <div>과세표준 1,400만원 이하 6% · 5,000만원 이하 15% · 8,800만원 이하 24%</div>
          <div>1.5억 이하 35% · 3억 이하 38% · 5억 이하 40% · 10억 이하 42% · 초과 45%</div>
        </SeoFormula>
        <p>
          연봉이 세율 구간 경계를 넘어설 때 <strong>초과분에만 높은 세율</strong>이 적용되므로,
          구간을 넘었다고 실수령액이 갑자기 줄어드는 일은 없습니다. 다만 상승폭이 완만해질 뿐입니다.
          반대로 국민연금은 상한선이 있어 월 659만원을 넘는 구간에서는 더 이상 늘지 않습니다.
          이런 구조를 자세히 알고 싶다면 <SeoLink href="/guide/salary-net-pay">연봉 실수령액 완전 정리</SeoLink>와{' '}
          <SeoLink href="/guide/4-insurance">4대보험 완전 정리</SeoLink>를 함께 읽어보세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="실수령액표를 볼 때 알아두면 좋은 것"
        items={[
          { q: '표의 금액과 내 급여명세서가 다른데요?', a: '표는 연말정산 기준 산식으로 연간 세액을 계산한 뒤 12로 나눈 값입니다. 반면 회사는 매달 국세청 간이세액표에 따라 원천징수하므로 월별 금액에 차이가 생깁니다. 그 차액은 다음 해 2월 연말정산에서 환급 또는 추가 납부로 정산되므로, 연 단위로 보면 표의 금액에 수렴합니다.' },
          { q: '부양가족이 늘면 실수령액이 얼마나 늘어나나요?', a: '부양가족 1인당 기본공제 150만원이 과세표준에서 빠집니다. 세율 15% 구간이라면 지방소득세 포함 연 24만 7,500원, 24% 구간이라면 연 39만 6,000원가량 세금이 줄어듭니다. 여기에 자녀세액공제나 교육비·의료비 공제가 더해지면 차이는 더 커집니다.' },
          { q: '비과세 식대 20만원은 어떤 영향을 주나요?', a: '비과세 금액은 소득세뿐 아니라 4대보험 산정 기준에서도 제외됩니다. 연 240만원이 과세 대상에서 빠지므로 연봉 구간에 따라 실수령액이 연 40만~60만원 늘어납니다. 다만 국민연금 납부액이 줄어드는 만큼 장래 연금 수령액도 소폭 감소한다는 점은 감안하세요.' },
          { q: '성과급이나 상여금은 어떻게 반영해야 하나요?', a: '성과급도 근로소득이므로 연간 총액에 합산해서 보는 것이 정확합니다. 예를 들어 기본 연봉 5,000만원에 성과급 500만원을 받는다면 연봉 5,500만원 행을 보면 됩니다. 다만 성과급이 지급된 달에는 그 달 원천징수액이 크게 늘어 체감 실수령액이 일시적으로 달라 보일 수 있습니다.' },
        ]}
      />

      <SeoSection title="내 조건에 맞춰 더 정확히 계산하기">
        <p>
          표는 표준 조건 기준이라 부양가족 수나 비과세 항목이 다르면 오차가 생깁니다.
          본인 조건을 직접 넣어보려면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>를 이용하세요.
          시급이나 월급으로 계약했다면 <SeoLink href="/salary/convert">연봉·월급·시급 변환기</SeoLink>로 먼저 연봉을 환산하고,
          연말정산 환급액을 늘리는 방법은 <SeoLink href="/guide/year-end-tax">연말정산 초보 가이드</SeoLink>에서 확인할 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
