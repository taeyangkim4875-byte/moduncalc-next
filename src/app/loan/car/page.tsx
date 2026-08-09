import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import CarLoanCalc from "./CarLoanCalc";

export const metadata: Metadata = {
  title: "자동차 할부 계산기 - 월 납입액·취등록세·총 비용",
  description: "자동차 할부 월 얼마? 차량가·선수금·금리 입력하면 월 납입액 + 취등록세 바로 계산.",
  alternates: { canonical: "https://moduncalc.com/loan/car" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 취등록세 기준" title="자동차 할부 계산기" description="할부 월 납입액과 취등록세, 총 구매 비용을 계산해 드려요.">
      <CalculatorJsonLd name="자동차 할부 계산기" description="자동차 할부 월 납입액, 취등록세, 총 구매 비용을 한 번에 계산하세요." url="https://moduncalc.com/loan/car" />
      <FaqJsonLd items={[{q:"무이자 할부는 정말 이자가 0원인가요?",a:"캐피탈사 무이자 할부는 이자가 0이지만, 대신 차량 할인이 줄어들 수 있습니다."},{q:"할부 기간은 몇 개월이 적당한가요?",a:"36~48개월이 일반적입니다. 길수록 월 부담은 줄지만 총 이자가 늘어납니다."},{q:"취등록세 외에 또 드는 비용은?",a:"공채매입비, 보험료, 번호판 비용 등이 추가로 발생합니다."}]} />
      <CarLoanCalc />

      <SeoSection title="2026년 자동차 취득세와 감면 기준">
        <p>
          자동차를 살 때는 차량 가격 외에 <strong>취득세와 등록 관련 비용</strong>이 반드시 따라붙습니다.
          이 계산기는 2026년 기준 세율과 감면 한도를 반영합니다.
        </p>
        <SeoList>
          <li><strong>일반 승용차 7%</strong> — 차량 취득가액 기준으로 부과됩니다.</li>
          <li><strong>경차</strong> — 취득세 75만원까지 감면됩니다(2027년까지 적용).</li>
          <li><strong>전기차·수소차</strong> — 취득세 140만원까지 감면됩니다(2026년까지 적용).</li>
          <li><strong>승합·화물차 5%</strong> — 승용차보다 낮은 세율이 적용됩니다.</li>
        </SeoList>
        <p>
          취득세 외에 <strong>공채매입비</strong>(지역·배기량별로 차량가의 3~12%를 채권으로 사고 즉시 할인 매도,
          실부담은 보통 차량가의 1% 안팎), 번호판 및 등록 대행 수수료, 자동차보험료가 추가됩니다.
          차량가 3,000만원 승용차라면 취득세 210만원에 부대비용을 더해 대략 250만원 안팎을 예산에 잡아야 합니다.
        </p>
      </SeoSection>

      <SeoSection title="할부 월 납입액 계산 공식">
        <p>자동차 할부는 대부분 원리금균등 방식입니다. r은 월이자율, n은 할부 개월 수입니다.</p>
        <SeoFormula>
          <div>① 할부원금 = 차량가격 − 선수금(계약금)</div>
          <div>② 월 납입액 = 할부원금 × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)</div>
          <div>③ 총 이자 = (월 납입액 × n) − 할부원금</div>
          <div>④ 총 구매비용 = 차량가격 + 총 이자 + 취득세 + 등록 부대비용</div>
        </SeoFormula>
        <p>
          <strong>선수금을 늘리면 할부원금이 줄어</strong> 월 납입액과 총 이자가 동시에 감소합니다.
          3,000만원 차량을 연 5.9%로 살 때 선수금 500만원·48개월이면 총 이자가 약 310만원이지만,
          선수금을 1,000만원으로 올리면 약 250만원으로 줄어듭니다.
          반대로 할부 기간을 60개월, 72개월로 늘리면 월 부담은 가벼워지지만 총 이자는 계속 불어납니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="차 살 때 이런 점도 확인하세요"
        items={[
          { q: '무이자 할부와 현금 할인 중 어느 쪽이 이득인가요?', a: '무이자 할부를 선택하면 대개 현금 구매 시 받을 수 있는 할인이 줄어듭니다. 판단 기준은 간단합니다. 포기하는 할인 금액이 할부 이자 총액보다 크면 현금·저리 대출이 유리하고, 작으면 무이자 할부가 유리합니다. 3,000만원 차량에서 할인 100만원을 포기하는 조건이라면, 이자 총액이 100만원을 넘는 경우에만 무이자가 이득입니다.' },
          { q: '리스와 장기렌트, 할부는 어떻게 다른가요?', a: '할부는 처음부터 내 명의의 자산이 되고 취득세도 내가 부담합니다. 리스와 장기렌트는 소유권이 금융사·렌터카사에 있어 초기 목돈이 적게 들고, 사업자라면 비용 처리가 가능합니다. 다만 총 지출은 대체로 할부가 가장 적습니다. 중도 해지 위약금과 주행거리 제한 조건도 함께 따져보세요.' },
          { q: '자동차 할부도 DSR에 포함되나요?', a: '네, 캐피탈사 할부금융은 대출로 분류되어 DSR에 포함됩니다. 차를 먼저 할부로 구입하면 이후 주택담보대출 한도가 줄어들 수 있습니다. 주택 구입 계획이 있다면 순서를 신중히 정하세요.' },
          { q: '취득세는 언제, 어떻게 내나요?', a: '차량 등록 시점에 지방자치단체에 납부합니다. 신차는 보통 영업사원이 등록을 대행하며 견적서에 포함되어 청구됩니다. 취득 후 60일 이내에 신고·납부하지 않으면 가산세가 붙습니다. 중고차도 매매가 기준으로 동일하게 취득세를 내야 합니다.' },
        ]}
      />

      <SeoSection title="차량 유지비까지 함께 계산해 보세요">
        <p>
          구매 비용만큼 중요한 것이 유지비입니다. 매년 내는 자동차세는{' '}
          <SeoLink href="/daily/cartax">자동차세 계산기</SeoLink>로, 연료비는{' '}
          <SeoLink href="/daily/fuel">유류비 계산기</SeoLink>로 미리 확인해 볼 수 있습니다.
          할부 한도가 다른 대출에 미칠 영향은 <SeoLink href="/loan/dsr">DSR 계산기</SeoLink>에서,
          상환 방식별 이자 차이는 <SeoLink href="/guide/loan-comparison">대출 상환 방식 비교 가이드</SeoLink>에서 확인하세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
