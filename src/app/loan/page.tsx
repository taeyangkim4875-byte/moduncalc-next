import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import { ogImageUrl } from "@/utils/og";
import { won } from "@/utils/format";
import LoanCalculator from "./LoanCalculator";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const amount = sp.amount ? +sp.amount : 0;
  const rate = sp.rate ? +sp.rate : 0;
  const term = sp.term ? +sp.term : 0;

  const base: Metadata = {
    title: "대출 이자 계산기 - 원리금균등·원금균등 상환",
    description: "대출 월 납입액 얼마? 원리금균등 vs 원금균등 비교, 총 이자 차이까지 한눈에. 거치기간 포함.",
    alternates: { canonical: "https://moduncalc.com/loan" },
    openGraph: {
      title: "대출 이자 계산기 - 원리금균등 vs 원금균등 비교 (2026)",
      description: "대출 금액·금리·기간 입력하면 월 납입액과 총 이자를 원리금균등·원금균등으로 비교. 거치기간 포함.",
      url: "https://moduncalc.com/loan",
    },
  };

  if (amount > 0 && rate > 0 && term > 0) {
    const P = amount * 10000;
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthly = r > 0 ? P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : P / n;
    const resultText = `월 ${won(monthly)}`;
    const inputsText = `${amount.toLocaleString()}만원 · 연 ${rate}% · ${term}년`;
    base.openGraph = {
      ...base.openGraph,
      images: [{ url: ogImageUrl({ title: '대출 이자 계산기', result: resultText, inputs: inputsText, desc: '원리금균등 월 상환액' }), width: 1200, height: 630 }],
    };
  }

  return base;
}

export default function Page() {
  return (
    <PageLayout eyebrow="2026 금리 기준" title="대출 이자 계산기" description="원리금균등·원금균등 상환 방식별 월 납입액과 총 이자를 비교해 드려요.">
      <CalculatorJsonLd name="대출 이자 계산기" description="대출 금액, 금리, 기간으로 원리금균등·원금균등 상환 방식별 월 납입액과 총 이자를 비교하세요." url="https://moduncalc.com/loan" />
      <FaqJsonLd items={[{q:"어떤 상환 방식이 유리한가요?",a:"총 이자를 줄이려면 원금균등, 초기 부담을 낮추려면 원리금균등이 유리합니다."},{q:"거치기간이란 무엇인가요?",a:"원금 상환을 유예하고 이자만 납부하는 기간입니다. 거치기간이 길수록 총 이자가 늘어납니다."}]} />
      <LoanCalculator />

      <SeoSection title="상환 방식에 따라 총 이자가 달라지는 이유">
        <p>
          같은 금액을 같은 금리로 빌려도 <strong>어떤 방식으로 갚느냐</strong>에 따라 총 이자가 수백만원 차이 납니다.
          이자는 언제나 <strong>남아 있는 원금</strong>에 붙기 때문에, 원금을 빨리 줄일수록 이자 총액이 줄어듭니다.
        </p>
        <SeoList>
          <li><strong>원리금균등상환</strong> — 매달 내는 금액이 끝까지 같습니다. 초기에는 납입액 중 이자 비중이 크고, 후반으로 갈수록 원금 비중이 커집니다. 가계 예산 관리가 쉬워 주택담보대출에서 가장 많이 쓰입니다.</li>
          <li><strong>원금균등상환</strong> — 매달 갚는 원금이 일정하고 이자는 잔액에 따라 줄어듭니다. 첫 달 부담이 가장 크지만 원금이 빨리 줄어 총 이자가 가장 적습니다.</li>
          <li><strong>만기일시상환</strong> — 기간 내내 이자만 내고 만기에 원금을 한 번에 갚습니다. 월 부담은 가장 낮지만 총 이자는 가장 많습니다.</li>
        </SeoList>
        <p>
          3억원을 연 4%, 30년으로 빌린다면 원리금균등의 총 이자는 약 2억 1,500만원,
          원금균등은 약 1억 8,000만원으로 <strong>3,000만원 이상</strong> 차이가 납니다.
          방식별 장단점은 <SeoLink href="/guide/loan-comparison">원리금균등 vs 원금균등 비교 가이드</SeoLink>에 더 자세히 정리했습니다.
        </p>
      </SeoSection>

      <SeoSection title="대출 이자 계산 공식">
        <p>계산기가 사용하는 산식입니다. r은 월이자율(연이율 ÷ 12 ÷ 100), n은 총 상환 개월 수입니다.</p>
        <SeoFormula>
          <div><strong>원리금균등</strong> 월 납입액 = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)</div>
          <div><strong>원금균등</strong> 월 납입액 = (P ÷ n) + (잔여원금 × r)</div>
          <div><strong>거치기간 중</strong> 월 납입액 = P × r (이자만 납부)</div>
          <div>총 이자 = 전체 납입액 합계 − 원금 P</div>
        </SeoFormula>
        <p>
          거치기간은 원금 상환을 미루고 이자만 내는 구간입니다. 당장 월 부담은 줄지만
          <strong> 원금이 전혀 줄지 않아</strong> 거치 개월 수만큼의 이자가 고스란히 추가됩니다.
          3억원·연 4%라면 거치 1년마다 약 1,200만원의 이자가 더 붙는 셈이니,
          꼭 필요한 기간만 설정하는 편이 좋습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="대출받기 전에 확인할 것들"
        items={[
          { q: '중도상환수수료 때문에 미리 갚는 게 손해일 수도 있나요?', a: '보통 대출 실행 후 3년까지 잔여 원금의 0.5~1.4% 수준의 중도상환수수료가 부과되며, 3년이 지나면 면제되는 상품이 대부분입니다. 남은 기간이 길고 금리가 높다면 수수료를 물더라도 조기 상환이 유리한 경우가 많습니다. 절감되는 이자와 수수료를 직접 비교해 보세요.' },
          { q: '변동금리와 고정금리 중 무엇을 골라야 하나요?', a: '금리 하락이 예상되면 변동금리, 상승이 예상되면 고정금리가 유리합니다. 다만 예측은 빗나가기 마련이므로, 상환 기간이 5년 이내로 짧다면 통상 금리가 낮은 변동금리를, 30년 주택담보대출처럼 길고 월 부담을 확정하고 싶다면 고정금리나 혼합형을 택하는 편이 안전합니다.' },
          { q: '대출 한도는 어떻게 정해지나요?', a: 'LTV(담보인정비율), DTI(총부채상환비율), DSR(총부채원리금상환비율) 세 가지 규제가 동시에 적용되고, 이 중 가장 낮은 금액이 실제 한도가 됩니다. 최근에는 DSR이 가장 강한 제약으로 작용하는 경우가 많으니 DSR 계산기로 먼저 확인해 보세요.' },
          { q: '금리가 1%p 오르면 부담이 얼마나 늘어나나요?', a: '3억원을 30년 원리금균등으로 빌린 경우 연 4%에서 5%로 오르면 월 납입액이 약 143만원에서 161만원으로 18만원가량 늘고, 총 이자는 약 3,600만원 증가합니다. 변동금리를 선택할 때는 금리가 2%p 올라도 감당 가능한지 미리 계산해 보는 것이 안전합니다.' },
        ]}
      />

      <SeoSection title="대출 실행 전에 함께 확인하세요">
        <p>
          월 납입액을 확인했다면 다음은 한도입니다.{' '}
          <SeoLink href="/loan/dsr">DSR 계산기</SeoLink>로 연소득 대비 대출 가능 금액을 먼저 확인하고,
          차량 구매 목적이라면 취등록세까지 포함한 <SeoLink href="/loan/car">자동차 할부 계산기</SeoLink>가 더 정확합니다.
          주택 구입이라면 <SeoLink href="/realestate/acqtax">취득세 계산기</SeoLink>로 부대비용까지 미리 잡아두고,
          전세 자금이 필요하다면 <SeoLink href="/guide/jeonse">전세 계약 완전 가이드</SeoLink>를 참고하세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
