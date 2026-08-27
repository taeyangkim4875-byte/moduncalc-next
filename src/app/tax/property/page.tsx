import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import { ogImageUrl } from "@/utils/og";
import { won } from "@/utils/format";
import PropertyTaxCalc from "./PropertyTaxCalc";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const price = sp.price ? +sp.price : 0;
  const type = sp.type === 'general' ? 'general' : 'single';

  const base: Metadata = {
    title: "종합부동산세 계산기 - 1주택·다주택 종부세 시뮬레이션 (2026)",
    description: "공시가격 입력하면 종부세 바로 계산. 1세대 1주택 공제 12억, 일반 9억. 공정시장가액비율 60% 반영.",
    alternates: { canonical: "https://moduncalc.com/tax/property" },
    openGraph: {
      title: "종합부동산세 계산기 - 1주택·다주택 종부세 시뮬레이션 (2026)",
      description: "주택 공시가격을 입력하면 종합부동산세와 농어촌특별세를 자동 계산. 2026년 공정시장가액비율 60% 반영.",
      url: "https://moduncalc.com/tax/property",
    },
  };

  if (price > 0) {
    const deduction = type === 'single' ? 120000 : 90000;
    const taxableMan = Math.max(0, price - deduction);
    const taxBase = taxableMan * 0.6;

    if (taxBase > 0) {
      let mainTax: number;
      if (type === 'single') {
        if (taxBase <= 30000) mainTax = taxBase * 0.005;
        else if (taxBase <= 60000) mainTax = 150 + (taxBase - 30000) * 0.007;
        else if (taxBase <= 120000) mainTax = 360 + (taxBase - 60000) * 0.01;
        else if (taxBase <= 250000) mainTax = 960 + (taxBase - 120000) * 0.013;
        else if (taxBase <= 500000) mainTax = 2650 + (taxBase - 250000) * 0.015;
        else if (taxBase <= 940000) mainTax = 6400 + (taxBase - 500000) * 0.02;
        else mainTax = 15200 + (taxBase - 940000) * 0.027;
      } else {
        if (taxBase <= 30000) mainTax = taxBase * 0.005;
        else if (taxBase <= 60000) mainTax = 150 + (taxBase - 30000) * 0.007;
        else if (taxBase <= 120000) mainTax = 360 + (taxBase - 60000) * 0.01;
        else if (taxBase <= 250000) mainTax = 960 + (taxBase - 120000) * 0.013;
        else if (taxBase <= 500000) mainTax = 2650 + (taxBase - 250000) * 0.02;
        else if (taxBase <= 940000) mainTax = 7650 + (taxBase - 500000) * 0.03;
        else mainTax = 20850 + (taxBase - 940000) * 0.05;
      }
      mainTax = Math.round(mainTax * 10000);
      const total = mainTax + Math.round(mainTax * 0.2);
      const priceUk = (price / 10000).toFixed(1);

      base.openGraph = {
        ...base.openGraph,
        images: [{ url: ogImageUrl({ title: '종합부동산세 계산기', result: won(total), inputs: `공시가격 ${priceUk}억원 · ${type === 'single' ? '1주택' : '다주택'}`, desc: '종부세+농특세 합계' }), width: 1200, height: 630 }],
      };
    }
  }

  return base;
}

export default function Page() {
  return (
    <PageLayout eyebrow="2026 과세 기준" title="종합부동산세 계산기" description="공시가격을 입력하면 종부세와 농어촌특별세를 계산해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '세금', href: '/tax/income' }, { name: '종부세', href: '/tax/property' }]} />
      <CalculatorJsonLd name="종합부동산세 계산기" description="주택 공시가격을 입력하면 종합부동산세와 농어촌특별세를 자동 계산합니다. 2026년 공정시장가액비율 60% 반영." url="https://moduncalc.com/tax/property" />
      <FaqJsonLd items={[
        { q: "종합부동산세는 누가 내나요?", a: "매년 6월 1일 기준 공시가격 합계가 공제 금액(1세대 1주택 12억원, 일반 9억원)을 초과하는 주택 소유자가 납부합니다." },
        { q: "공정시장가액비율이란 무엇인가요?", a: "과세표준을 정할 때 공시가격에서 공제를 뺀 금액에 곱하는 비율입니다. 2026년 기준 60%입니다." },
        { q: "종부세는 언제 납부하나요?", a: "매년 12월 1일~15일까지 납부합니다. 납부세액이 300만원을 초과하면 분납이 가능합니다." },
      ]} />
      <PropertyTaxCalc />

      <SeoSection title="종합부동산세란?">
        <p>
          종합부동산세(종부세)는 일정 금액을 초과하는 부동산을 보유한 사람에게 부과되는 <strong>국세</strong>입니다.
          재산세(지방세)와 별도로 부과되며, 매년 6월 1일 기준으로 소유 주택의 공시가격 합계를 기준으로 과세합니다.
        </p>
        <SeoList>
          <li><strong>1세대 1주택자</strong> — 공시가격 합계에서 <strong>12억원</strong>을 공제한 후 과세</li>
          <li><strong>일반(다주택자 등)</strong> — 공시가격 합계에서 <strong>9억원</strong>을 공제한 후 과세</li>
          <li><strong>공정시장가액비율</strong> — 2026년 기준 <strong>60%</strong>를 적용</li>
        </SeoList>
        <p>
          예를 들어 1주택자가 공시가격 15억원인 주택을 보유하고 있다면,
          과세표준은 (15억 − 12억) × 60% = <strong>1.8억원</strong>이 됩니다.
        </p>
      </SeoSection>

      <SeoSection title="2026년 종부세 세율표">
        <p>과세표준 구간에 따라 누진세율이 적용됩니다. 1세대 1주택과 일반은 높은 구간에서 세율이 다릅니다.</p>
        <SeoFormula>
          <div><strong>과세표준 산식</strong></div>
          <div>과세표준 = (공시가격 합계 − 공제금액) × 공정시장가액비율(60%)</div>
          <div>종부세 = 과세표준 × 누진세율 (구간별)</div>
          <div>농어촌특별세 = 종부세 × 20%</div>
          <div>합계 납부액 = 종부세 + 농어촌특별세</div>
        </SeoFormula>
        <SeoList>
          <li>3억 이하: <strong>0.5%</strong> (1주택·일반 동일)</li>
          <li>3~6억: <strong>0.7%</strong></li>
          <li>6~12억: <strong>1.0%</strong></li>
          <li>12~25억: <strong>1.3%</strong></li>
          <li>25~50억: 1주택 <strong>1.5%</strong> / 일반 <strong>2.0%</strong></li>
          <li>50~94억: 1주택 <strong>2.0%</strong> / 일반 <strong>3.0%</strong></li>
          <li>94억 초과: 1주택 <strong>2.7%</strong> / 일반 <strong>5.0%</strong></li>
        </SeoList>
      </SeoSection>

      <SeoSection title="세부담 상한과 합산 배제">
        <p>
          종부세에는 <strong>세부담 상한</strong> 제도가 있어, 전년도 종부세의 일정 비율을 초과하는 세액은 부과되지 않습니다.
          1세대 1주택자는 전년도 대비 <strong>150%</strong>, 일반은 <strong>300%</strong>까지가 상한입니다.
        </p>
        <p>
          또한 일정 요건을 충족하는 <strong>합산 배제 주택</strong>(등록 임대주택, 사원용 주택, 기숙사 등)은
          종부세 과세표준 계산 시 합산에서 제외됩니다.
          합산 배제 신고 기간은 매년 9월 16일~30일이므로 해당 시기에 놓치지 마세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="종부세, 이런 점도 궁금하실 거예요"
        items={[
          { q: '공시가격은 어디서 확인하나요?', a: '국토교통부 부동산공시가격 알리미(realtyprice.kr)에서 확인할 수 있습니다. 매년 4월경 공동주택(아파트) 공시가격이 발표되고, 5~6월경 단독주택·토지 공시가격이 나옵니다. 공시가격에 이의가 있으면 이의신청 기간 내 신청할 수 있습니다.' },
          { q: '부부 공동명의면 유리한가요?', a: '부부 공동명의(각 50%)는 각자 9억원씩 총 18억원이 공제됩니다. 단독명의 1세대 1주택의 공제액 12억원보다 큽니다. 다만 1세대 1주택의 고령자·장기보유 세액공제(최대 80%)를 받을 수 없으므로, 공시가격과 보유기간에 따라 유불리가 달라집니다.' },
          { q: '종부세와 재산세의 차이는 무엇인가요?', a: '재산세는 모든 부동산 소유자에게 부과되는 지방세이고, 종부세는 공제 금액을 초과하는 고가 부동산 소유자에게만 부과되는 국세입니다. 재산세는 7월과 9월에, 종부세는 12월에 납부합니다. 종부세를 계산할 때 이미 낸 재산세 중 일정액이 공제됩니다.' },
          { q: '종부세를 분납할 수 있나요?', a: '납부세액이 300만원을 초과하면 최대 6개월까지 분납이 가능합니다. 300만~600만원이면 300만원을 초과하는 부분을, 600만원 이상이면 50%를 나눠 낼 수 있습니다. 분납 기간에는 별도의 이자(가산금)가 붙지 않으므로 적극 활용하는 것이 유리합니다.' },
        ]}
      />

      <SeoSection title="함께 확인하면 좋은 계산기">
        <p>
          주택 구입 시 발생하는 세금은 <SeoLink href="/realestate/acqtax">취득세 계산기</SeoLink>에서 확인하세요.
          매도 시 차익에 대한 세금은 <SeoLink href="/realestate/transfer">양도소득세 계산기</SeoLink>로 미리 계산할 수 있습니다.
          부동산 증여를 고려 중이라면 <SeoLink href="/tax/gift">증여세 계산기</SeoLink>로 세액을 비교해 보세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
