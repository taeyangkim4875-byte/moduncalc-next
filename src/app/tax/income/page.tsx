import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import IncomeTaxCalc from "./IncomeTaxCalc";

export const metadata: Metadata = {
  title: "종합소득세 계산기 - 2026 누진세율",
  description: "종합소득세 얼마 나올까? 소득 입력하면 8구간 누진세율 자동 적용. 실효세율·인적공제까지 바로 확인.",
  alternates: { canonical: "https://moduncalc.com/tax/income" },
  openGraph: { title: "종합소득세 계산기 - 2026 누진세율 8구간 자동 계산", description: "과세표준 입력하면 소득세·지방소득세를 8구간 누진세율로 자동 계산. 인적공제, 실효세율 확인.", url: "https://moduncalc.com/tax/income" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 세율 기준" title="종합소득세 계산기" description="누진세율을 적용한 예상 세액을 계산해요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '세금', href: '/tax' }, { name: '종합소득세', href: '/tax/income' }]} />
      <CalculatorJsonLd name="종합소득세 계산기" description="종합소득세 누진세율을 적용한 예상 세액을 계산하세요." url="https://moduncalc.com/tax/income" />
      <FaqJsonLd items={[{q:"종합소득세 세율은 어떻게 되나요?",a:"6%~45%까지 8단계 누진세율이 적용됩니다. 과세표준 1,400만원 이하 6%, 10억원 초과 45%."},{q:"인적공제란 무엇인가요?",a:"본인·배우자·부양가족 1인당 150만원씩 소득에서 공제해주는 제도입니다."}]} />
      <IncomeTaxCalc />

      <SeoSection title="2026년 종합소득세 세율표">
        <p>
          종합소득세는 <strong>이자·배당·사업·근로·연금·기타소득</strong>을 합산해 매기는 세금입니다.
          매년 <strong>5월 1일부터 31일까지</strong> 전년도 소득을 신고·납부하며,
          과세표준에 따라 8단계 누진세율이 적용됩니다.
        </p>
        <SeoList>
          <li>1,400만원 이하 → <strong>6%</strong> (누진공제 없음)</li>
          <li>1,400만~5,000만원 → <strong>15%</strong> (누진공제 126만원)</li>
          <li>5,000만~8,800만원 → <strong>24%</strong> (누진공제 576만원)</li>
          <li>8,800만~1억 5,000만원 → <strong>35%</strong> (누진공제 1,544만원)</li>
          <li>1억 5,000만~3억원 → <strong>38%</strong> (누진공제 1,994만원)</li>
          <li>3억~5억원 → <strong>40%</strong> (누진공제 2,594만원)</li>
          <li>5억~10억원 → <strong>42%</strong> (누진공제 3,594만원)</li>
          <li>10억원 초과 → <strong>45%</strong> (누진공제 6,594만원)</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="종합소득세 계산 공식">
        <p>
          많은 분들이 오해하는 부분인데, <strong>세율은 소득 전체가 아니라 구간별로 나뉘어 적용</strong>됩니다.
          과세표준이 5,000만원을 1원 넘겼다고 전액에 24%가 붙지 않습니다.
        </p>
        <SeoFormula>
          <div>① 소득금액 = 총수입금액 − 필요경비</div>
          <div>② 과세표준 = 소득금액 − 소득공제(인적공제 1인당 150만원 등)</div>
          <div>③ 산출세액 = (과세표준 × 세율) − 누진공제</div>
          <div>④ 결정세액 = 산출세액 − 세액공제·감면</div>
          <div>⑤ 총 납부세액 = 결정세액 + 지방소득세(결정세액의 10%)</div>
        </SeoFormula>
        <p>
          예를 들어 과세표준이 6,000만원이면 산출세액은 6,000만 × 24% − 576만 = <strong>864만원</strong>,
          지방소득세 86만 4천원을 더해 총 950만 4천원입니다.
          이때 <strong>실효세율</strong>은 950만 ÷ 6,000만 = 약 15.8%로, 명목세율 24%보다 훨씬 낮습니다.
          근로소득만 있다면 대부분 연말정산으로 끝나므로, 계산 구조는{' '}
          <SeoLink href="/guide/year-end-tax">연말정산 초보 가이드</SeoLink>를 함께 참고하세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="종합소득세, 이런 점도 확인하세요"
        items={[
          { q: '직장인도 종합소득세를 신고해야 하나요?', a: '근로소득만 있고 연말정산을 마쳤다면 별도 신고가 필요 없습니다. 다만 이자·배당소득 합계가 연 2,000만원을 넘거나, 부업·프리랜서 소득, 임대소득, 유튜브·블로그 수익 등 다른 소득이 있다면 5월에 합산 신고해야 합니다. 두 곳 이상에서 급여를 받고 합산 연말정산을 하지 않은 경우에도 신고 대상입니다.' },
          { q: '프리랜서 3.3% 원천징수는 무엇인가요?', a: '사업소득에 대한 소득세 3%와 지방소득세 0.3%를 미리 떼어 두는 것으로, 확정된 세금이 아니라 선납금입니다. 5월 종합소득세 신고 때 실제 소득과 필요경비를 반영해 정산하며, 소득이 적었다면 대부분 환급받습니다. 반대로 소득이 많으면 추가 납부가 발생합니다.' },
          { q: '필요경비는 어떻게 인정받나요?', a: '장부를 작성해 실제 지출을 증빙하는 것이 원칙이며, 이 방식이 가장 유리한 경우가 많습니다. 장부 작성이 어렵다면 업종별 경비율을 적용하는 추계신고(단순경비율·기준경비율)를 쓸 수 있습니다. 다만 수입금액이 일정 기준을 넘으면 단순경비율을 쓸 수 없고, 무기장 가산세 20%가 붙으므로 사업 규모가 커지면 장부 작성이 필수입니다.' },
          { q: '세금을 줄이는 합법적인 방법이 있나요?', a: '연금저축과 IRP는 합산 연 900만원까지 납입액의 13.2~16.5%를 세액공제받을 수 있어 효과가 가장 큽니다. 노란우산공제는 사업자의 소득공제 수단으로 연 최대 600만원까지 인정됩니다. 이 밖에 기부금 세액공제, 성실신고 확인 비용 세액공제 등이 있습니다. 신고 기한을 놓치면 가산세가 붙으므로 기한 준수 자체가 가장 확실한 절세입니다.' },
        ]}
      />

      <SeoSection title="관련 세금도 함께 계산해 보세요">
        <p>
          이 계산기는 과세표준 기준의 간편 계산이라, 실제 신고 세액과는 차이가 날 수 있습니다.
          급여소득자라면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>에서
          원천징수 기준 세액을 확인하는 편이 더 정확합니다.
          사업자라면 <SeoLink href="/tax/vat">부가세 계산기</SeoLink>로 부가가치세를 함께 챙기고,
          주식·펀드 수익이 있다면 <SeoLink href="/guide/investment-tax">주식·ETF 세금 총정리</SeoLink>에서
          금융소득 종합과세 기준을 확인하세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
