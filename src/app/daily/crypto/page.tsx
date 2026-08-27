import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import CryptoCalc from "./CryptoCalc";

export const metadata: Metadata = {
  title: "비트코인 수익률 계산기 - 가상자산 투자 손익 계산",
  description: "매수가와 현재가로 비트코인·가상자산 수익률을 계산하세요. 투자금, 수량, 수수료 반영.",
  alternates: { canonical: "https://moduncalc.com/daily/crypto" },
  openGraph: {
    title: "비트코인 수익률 계산기 - 가상자산 투자 손익 계산",
    description: "매수가와 현재가로 비트코인·가상자산 수익률을 계산하세요. 투자금, 수량, 수수료 반영.",
    url: "https://moduncalc.com/daily/crypto",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="생활" title="비트코인 수익률 계산기" description="매수가, 수량, 현재가를 입력하면 수익률과 실수익을 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '가상자산', href: '/daily/crypto' }]} />
      <CalculatorJsonLd name="비트코인 수익률 계산기" description="매수가와 현재가로 비트코인·가상자산 수익률을 계산하세요. 투자금, 수량, 수수료 반영." url="https://moduncalc.com/daily/crypto" />
      <FaqJsonLd items={[
        { q: "가상자산 수익에 세금이 부과되나요?", a: "가상자산 과세는 여러 차례 유예되어 2027년 시행 예정이었으나 추가 유예 가능성이 있습니다. 시행 시 연 250만원 초과 수익에 22%(지방세 포함)가 과세됩니다." },
        { q: "거래소 수수료는 얼마인가요?", a: "업비트 0.05%, 빗썸 0.04%(쿠폰 적용 시 0.01%), 코인원 0.2%, 바이낸스 0.1%가 기본입니다. 거래소와 결제 수단에 따라 다를 수 있습니다." },
        { q: "수익률은 어떻게 계산하나요?", a: "수익률 = (현재가 - 매수가) / 매수가 × 100입니다. 수수료를 반영한 실수익은 매수·매도 수수료를 차감한 후 계산됩니다." },
      ]} />
      <CryptoCalc />

      <SeoSection title="가상자산 수익 계산, 수수료까지 빼야 진짜 수익입니다">
        <p>
          &quot;30% 올랐으니까 30% 벌었겠지&quot; — 틀렸습니다.
          매수할 때 수수료, 매도할 때 수수료, 거기에 원화 출금 수수료까지 빼면 <strong>실수익은 생각보다 적어요</strong>.
        </p>
        <SeoFormula>
          <div>실수익 = (매도가 × 수량) - (매수가 × 수량) - 매수수수료 - 매도수수료</div>
          <div>수익률(%) = 실수익 ÷ 총 투자금 × 100</div>
        </SeoFormula>
        <p>
          업비트 기준 매수·매도 수수료가 각 0.05%이니, 왕복 0.1%. 1,000만원 투자하면 수수료만 1만원입니다.
          단타를 자주 하면 수수료가 무시 못 할 수준으로 쌓입니다.
        </p>
      </SeoSection>

      <SeoSection title="2026년 가상자산 과세, 지금 알아둬야 할 것들">
        <SeoList>
          <li><strong>과세 시행</strong> — 여러 차례 유예 끝에 2027년 시행 예정 (추가 유예 가능성 있음)</li>
          <li><strong>과세 기준</strong> — 연 250만원 초과 수익분에 22%(소득세 20% + 지방세 2%)</li>
          <li><strong>손익통산</strong> — 같은 해 A코인 수익 + B코인 손실 합산 가능</li>
          <li><strong>취득가 산정</strong> — 시행일 전일 시가와 실제 매수가 중 높은 금액 적용</li>
        </SeoList>
        <p>
          주식 수익률도 비교해 보고 싶으면 <SeoLink href="/daily/stock">주식 수익률 계산기</SeoLink>를 활용하세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="가상자산 투자 궁금증"
        items={[
          { q: '업비트와 빗썸 수수료 차이가 크나요?', a: '업비트 0.05%, 빗썸 0.04%(쿠폰 적용 시 0.01%). 소액 투자에서는 큰 차이 없지만, 거래가 잦거나 금액이 크면 빗썸 쿠폰이 유리할 수 있습니다. 해외 거래소(바이낸스)는 0.1%입니다.' },
          { q: '비트코인 평단가는 어떻게 계산하나요?', a: '총 매수금액 ÷ 총 보유 수량 = 평균 매수가. 예를 들어 5,000만원에 0.5개, 4,000만원에 0.5개 매수했으면 평단은 (5,000+4,000)만원 ÷ 1개 = 4,500만원입니다.' },
          { q: '김치 프리미엄이 수익에 영향을 주나요?', a: '김치 프리미엄(국내 시세가 해외보다 높은 현상)이 있을 때 국내에서 매도하면 추가 수익이 생기지만, 프리미엄이 줄어들면 손실로 이어질 수 있습니다. 해외 거래소 이용 시에는 환전 비용도 고려해야 합니다.' },
        ]}
      />
    </PageLayout>
  );
}
