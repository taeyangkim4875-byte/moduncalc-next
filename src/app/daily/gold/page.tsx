import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import GoldCalc from "./GoldCalc";

export const metadata: Metadata = {
  title: "금 시세 계산기 - 금 1돈·1g 가격 환산 (2026)",
  description: "금 무게(돈, g, oz)를 입력하면 현재 시세 기준 금액을 환산합니다. 1돈=3.75g. 금 투자 참고용.",
  alternates: { canonical: "https://moduncalc.com/daily/gold" },
  openGraph: { title: "금 시세 계산기 - 금 1돈·1g 가격 환산 (2026)", description: "금 무게(돈, g, oz)를 입력하면 현재 시세 기준 금액을 환산합니다.", url: "https://moduncalc.com/daily/gold" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="투자" title="금 시세 계산기" description="금 무게와 시세를 입력하면 금액을 환산합니다.">
      <CalculatorJsonLd name="금 시세 계산기" description="금 무게(돈, g, oz)를 입력하면 현재 시세 기준 금액을 환산합니다." url="https://moduncalc.com/daily/gold" />
      <FaqJsonLd items={[
        { q: "금 1돈은 몇 그램인가요?", a: "금 1돈은 3.75g입니다. 1냥은 10돈(37.5g)이며, 국제 단위 1트로이온스(oz)는 31.1035g입니다." },
        { q: "금 거래 시 세금이 있나요?", a: "금 거래 시 부가가치세 10%가 부과됩니다. 다만 KRX 금시장을 통해 거래하면 부가세가 면제되고 양도소득세도 비과세입니다." },
        { q: "금 투자 방법에는 어떤 것이 있나요?", a: "골드바 구매, KRX 금시장, 금 ETF, 금 통장(골드뱅킹), 금 펀드 등이 있습니다. 실물 보유를 원하면 골드바, 세금 혜택을 원하면 KRX 금시장을 추천합니다." },
      ]} />
      <GoldCalc />

      <SeoSection title="금 무게 단위 정리">
        <p>금을 거래할 때는 다양한 무게 단위가 혼용됩니다. 핵심 단위만 정리하면:</p>
        <SeoList>
          <li><strong>1돈</strong> = 3.75g — 한국에서 가장 흔히 쓰는 단위. 금반지 1개가 보통 1~3돈.</li>
          <li><strong>1냥</strong> = 10돈 = 37.5g — 골드바 소형 단위.</li>
          <li><strong>1트로이온스(oz)</strong> = 31.1035g — 국제 금 시세의 기본 단위.</li>
          <li><strong>1kg</strong> = 266.67돈 — 대형 골드바 단위.</li>
        </SeoList>
        <p>
          주의할 점은 금에서 말하는 온스(트로이온스)는 일반 온스(28.35g)와 다릅니다.
          트로이온스는 31.1g으로 약 10% 더 무겁습니다.
        </p>
      </SeoSection>

      <SeoSection title="금 투자 방법별 비교">
        <SeoList>
          <li><strong>골드바/금괴</strong> — 실물 보유. 부가세 10% 부과, 보관 비용 발생.</li>
          <li><strong>KRX 금시장</strong> — 한국거래소에서 거래. 부가세 면제, 양도세 비과세. 가장 유리.</li>
          <li><strong>금 ETF</strong> — 주식처럼 거래. 배당소득세 15.4%. 소액 투자에 적합.</li>
          <li><strong>골드뱅킹(금 통장)</strong> — 은행에서 0.01g 단위로 매매. 매매 차익에 배당소득세.</li>
        </SeoList>
        <p>
          세금 면에서는 KRX 금시장이 가장 유리하고, 소액 분산 투자에는 금 ETF가 편합니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="금 투자, 이런 점도 궁금하실 거예요"
        items={[
          { q: '금은방에서 금을 사면 시세보다 비싼 이유는?', a: '금은방 판매가에는 부가세 10%와 공임비(세공비)가 포함됩니다. 순금 시세 대비 20~30% 정도 높은 가격으로 팔리는 게 일반적입니다. 투자 목적이라면 KRX 금시장이 훨씬 저렴합니다.' },
          { q: '금값은 어떤 요인으로 움직이나요?', a: '달러 약세, 인플레이션 우려, 지정학적 불안(전쟁·분쟁), 중앙은행 금리 정책 등이 주요 변수입니다. 금은 전통적으로 안전자산으로 분류되어 불확실성이 커지면 금값이 오르는 경향이 있습니다.' },
          { q: '14K, 18K, 24K의 차이는?', a: '24K가 순금(99.9%)이고, 18K는 75%, 14K는 58.5%의 금이 포함된 합금입니다. 24K는 부드러워서 장신구에는 18K가 많이 쓰이고, 투자용은 24K(순금)가 기본입니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          주식 투자 수익률은 <SeoLink href="/daily/stock">주식 수익률 계산기</SeoLink>,
          가상자산은 <SeoLink href="/daily/crypto">가상자산 수익률 계산기</SeoLink>를 이용하세요.
          무게 단위 변환이 필요하면 <SeoLink href="/daily/unit">단위 변환기</SeoLink>도 유용합니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
