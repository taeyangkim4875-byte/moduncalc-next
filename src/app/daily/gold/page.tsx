import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink, SeoFormula } from "@/components/SeoContent";
import GoldCalc from "./GoldCalc";
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: "금 시세 계산기 - 금 1돈·1g 가격 환산 (2026)",
  description: "금 무게(돈, g, oz)를 입력하면 현재 시세 기준 금액을 환산합니다. 1돈=3.75g. 금 투자 참고용.",
  alternates: { canonical: "https://moduncalc.com/daily/gold" },
  openGraph: { title: "금 시세 계산기 - 금 1돈·1g 가격 환산 (2026)", description: "금 무게(돈, g, oz)를 입력하면 현재 시세 기준 금액을 환산합니다.", url: "https://moduncalc.com/daily/gold" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="투자" title="금 시세 계산기" description="금 무게와 시세를 입력하면 금액을 환산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '금 시세', href: '/daily/gold' }]} />
      <CalculatorJsonLd name="금 시세 계산기" description="금 무게(돈, g, oz)를 입력하면 현재 시세 기준 금액을 환산합니다." url="https://moduncalc.com/daily/gold" />
      <FaqJsonLd items={[
        { q: "금 1돈은 몇 그램인가요?", a: "금 1돈은 3.75g입니다. 1냥은 10돈(37.5g)이며, 국제 단위 1트로이온스(oz)는 31.1035g입니다." },
        { q: "금 거래 시 세금이 있나요?", a: "금 거래 시 부가가치세 10%가 부과됩니다. 다만 KRX 금시장을 통해 거래하면 부가세가 면제되고 양도소득세도 비과세입니다." },
        { q: "금 투자 방법에는 어떤 것이 있나요?", a: "골드바 구매, KRX 금시장, 금 ETF, 금 통장(골드뱅킹), 금 펀드 등이 있습니다. 실물 보유를 원하면 골드바, 세금 혜택을 원하면 KRX 금시장을 추천합니다." },
      ]} />
      <GoldCalc />
      <ShareButtons title="금 시세 계산 결과" />

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

      <SeoSection title="금 무게 단위, 헷갈리지 않게 정리">
        <p>
          금은방에서는 &lsquo;돈&rsquo;을, 국제 시장에서는 &lsquo;트로이온스&rsquo;를 씁니다.
          2007년부터 돈은 법정 계량단위가 아니지만 거래 현장에서는 여전히 통용됩니다.
          공식 문서에는 그램으로 표기하고, 매장에서는 &ldquo;3.75g당 얼마&rdquo;라는 식으로 표현하는 경우가 많습니다.
        </p>
        <SeoFormula>
          <div>1푼 = 0.375g · 1돈 = 3.75g · 1냥 = 10돈 = 37.5g</div>
          <div>1트로이온스(oz t) = 31.1035g ≈ 8.29돈</div>
          <div>* 금·은 거래의 1온스는 일반 온스(28.35g)가 아니라 트로이온스입니다.</div>
        </SeoFormula>
        <p>
          돌반지 &lsquo;한 돈&rsquo;은 3.75g입니다. 최근에는 금값 부담 때문에
          반 돈(1.875g)이나 세 푼(1.125g) 제품도 많이 나옵니다.
          구매 전에 무게 표기를 꼭 확인하세요.
        </p>
      </SeoSection>

      <SeoSection title="순도(K)에 따라 가격이 달라집니다">
        <p>
          같은 무게라도 순도가 다르면 금 함량이 달라 가격이 다릅니다.
          K는 24분율이라 <strong>18K는 24분의 18, 즉 75%가 금</strong>이라는 뜻입니다.
        </p>
        <SeoList>
          <li><strong>24K(순금)</strong> — 금 99.9%. 투자용 골드바·돌반지에 주로 쓰입니다. 무르기 때문에 정교한 세공에는 부적합합니다.</li>
          <li><strong>18K</strong> — 금 75%. 나머지는 은·구리 등 합금입니다. 단단해서 예물·장신구에 널리 쓰입니다.</li>
          <li><strong>14K</strong> — 금 58.5%. 일상용 액세서리에 많이 쓰이며 가장 저렴합니다.</li>
        </SeoList>
        <p>
          그래서 18K 제품의 금 가치는 같은 무게 순금의 약 75%, 14K는 약 58.5% 수준입니다.
          다만 실제 매입가는 여기에서 가공비와 마진을 뺀 금액이라 더 낮습니다.
        </p>
      </SeoSection>

      <SeoSection title="살 때와 팔 때 가격이 다른 이유">
        <p>
          금을 샀다가 바로 되팔면 손해를 봅니다. <strong>매입가와 매도가 사이에 스프레드</strong>가 있기 때문입니다.
        </p>
        <SeoList>
          <li><strong>세공비(공임)</strong> — 반지·목걸이 등 장신구는 제작 비용이 가격에 포함되지만, 되팔 때는 금 무게만 쳐줍니다.</li>
          <li><strong>부가가치세 10%</strong> — 살 때 붙지만 개인이 되팔 때는 돌려받지 못합니다.</li>
          <li><strong>매장 마진</strong> — 살 때는 시세보다 높게, 팔 때는 시세보다 낮게 거래됩니다.</li>
        </SeoList>
        <p>
          이 때문에 장신구는 구입 직후 되팔면 <strong>20~30% 손실</strong>이 나는 경우가 흔합니다.
          투자 목적이라면 세공비가 거의 없는 골드바나, 부가세가 붙지 않는
          <strong> KRX 금시장·금 ETF·금 통장</strong> 같은 금융상품을 비교해 보는 편이 유리할 수 있습니다.
          다만 금융상품은 매매차익에 대한 과세 방식이 상품마다 다르므로 미리 확인하세요.
        </p>
        <p>
          국제 금 시세는 달러로 매겨지기 때문에 <strong>국내 금값은 환율의 영향</strong>을 크게 받습니다.
          국제 시세가 그대로여도 원/달러 환율이 오르면 국내 금값은 오릅니다.
        </p>
      </SeoSection>

      <SeoSection title="함께 보면 좋은 계산기">
        <p>
          다른 투자 자산의 수익률은 <SeoLink href="/daily/stock">주식 수익률 계산기</SeoLink>와
          <SeoLink href="/daily/crypto"> 가상자산 계산기</SeoLink>에서 확인할 수 있고,
          장기 복리 효과는 <SeoLink href="/daily/compound">복리 계산기</SeoLink>로 그려볼 수 있습니다.
          투자 수익에 붙는 세금은 <SeoLink href="/guide/investment-tax">주식·투자 세금 총정리</SeoLink>에 정리해 두었습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
