import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import { ogImageUrl } from "@/utils/og";
import { won } from "@/utils/format";
import AcqTaxCalc from "./AcqTaxCalc";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const price = sp.price ? +sp.price : 0;
  const houseCount = sp.houseCount ? +sp.houseCount : 1;
  const area = sp.area ? +sp.area : 85;

  const base: Metadata = {
    title: "취득세 계산기 - 주택 매매 취득세·농특세·교육세",
    description: "집 사면 취득세 얼마? 매매가·주택 수 입력하면 취득세+농특세+교육세 바로 계산.",
    alternates: { canonical: "https://moduncalc.com/realestate/acqtax" },
    openGraph: {
      title: "취득세 계산기 - 주택 매매 취득세·농특세·교육세 (2026)",
      description: "주택 매매가와 주택 수를 입력하면 취득세·농어촌특별세·지방교육세를 자동 계산. 다주택 중과세율 반영.",
      url: "https://moduncalc.com/realestate/acqtax",
    },
  };

  if (price > 0) {
    const priceWon = price * 10000;
    let rate: number;
    if (houseCount === 1) {
      if (price <= 60000) rate = 0.01;
      else if (price <= 90000) { const r = (price / 10000 * 2 / 3 - 3) / 100; rate = Math.max(0.01, Math.min(0.03, r)); }
      else rate = 0.03;
    } else if (houseCount === 2) rate = 0.08;
    else rate = 0.12;
    const acqTax = Math.round(priceWon * rate);
    const nongTax = area <= 85 ? 0 : Math.round(priceWon * 0.002);
    const eduTax = Math.round(acqTax * 0.1);
    const total = acqTax + nongTax + eduTax;

    base.openGraph = {
      ...base.openGraph,
      images: [{ url: ogImageUrl({ title: '취득세 계산기', result: won(total), inputs: `매매가 ${price.toLocaleString()}만원 · ${houseCount}주택` }), width: 1200, height: 630 }],
    };
  }

  return base;
}

export default function Page() {
  return (
    <PageLayout eyebrow="2026 세율 기준" title="취득세 계산기" description="주택 매매 시 납부할 취득세를 계산해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '부동산', href: '/realestate' }, { name: '취득세', href: '/realestate/acqtax' }]} />
      <CalculatorJsonLd name="취득세 계산기" description="주택 매매 시 납부할 취득세, 농어촌특별세, 지방교육세를 계산하세요." url="https://moduncalc.com/realestate/acqtax" />
      <FaqJsonLd items={[{q:"생애 첫 주택 취득세 감면이 있나요?",a:"생애최초로 주택을 취득하는 경우 요건을 충족하면 취득세를 최대 200만원까지 감면받을 수 있습니다. 소득·주택가액 요건이 적용되며 감면 요건은 수시로 바뀌므로 계약 전 관할 시군구청에 확인해야 합니다."},{q:"다주택자 중과세율은 어떻게 되나요?",a:"조정대상지역 2주택은 8%, 3주택 이상은 12%가 적용됩니다."},{q:"전용면적 85㎡ 이하이면 어떤 혜택이 있나요?",a:"농어촌특별세 0.2%가 면제됩니다."}]} />
      <AcqTaxCalc />

      <SeoSection title="2026년 주택 취득세율 기준">
        <p>
          취득세는 부동산을 <strong>취득한 사실 자체</strong>에 부과되는 지방세입니다.
          주택 유상거래의 세율은 <strong>가격과 보유 주택 수</strong>에 따라 달라집니다.
        </p>
        <SeoList>
          <li><strong>1주택 · 6억원 이하 → 1%</strong></li>
          <li><strong>1주택 · 6억~9억원 → 1~3% 구간별 비례</strong> (가격이 오를수록 세율이 완만하게 상승)</li>
          <li><strong>1주택 · 9억원 초과 → 3%</strong></li>
          <li><strong>조정대상지역 2주택 → 8%</strong>, <strong>3주택 이상 → 12%</strong></li>
        </SeoList>
        <p>
          여기에 <strong>지방교육세</strong>(취득세액의 10%)와, 전용면적 85㎡를 넘는 주택에 한해{' '}
          <strong>농어촌특별세</strong>(취득가액의 0.2%)가 더해집니다.
          85㎡ 이하 국민주택 규모라면 농특세가 면제되므로, 같은 가격이라도 실부담이 줄어듭니다.
        </p>
      </SeoSection>

      <SeoSection title="6억~9억 구간 세율 계산 공식">
        <p>
          2020년부터 6억~9억원 구간에는 <strong>가격에 따라 연속적으로 변하는 세율</strong>이 적용됩니다.
          예전처럼 6억원을 1원이라도 넘으면 세율이 급등하는 문턱 효과를 없애기 위한 장치입니다.
        </p>
        <SeoFormula>
          <div>세율(%) = (취득가액(억원) × 2 ÷ 3) − 3</div>
          <div>총 납부액 = 취득세 + 지방교육세(취득세 × 10%) + 농특세(85㎡ 초과 시 가액 × 0.2%)</div>
        </SeoFormula>
        <p>
          예를 들어 7억 5,000만원짜리 85㎡ 이하 아파트를 1주택자로 취득하면
          세율은 2%, 취득세는 1,500만원, 지방교육세 150만원을 더해 <strong>총 1,650만원</strong>입니다.
          같은 집을 3주택자로 취득하면 12%가 적용돼 취득세만 9,000만원으로 뛰어오릅니다.
          주택 수 산정에는 분양권·입주권·주거용 오피스텔도 포함되므로 계약 전에 반드시 확인하세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="취득세, 이런 점도 확인하세요"
        items={[
          { q: '취득세는 언제까지 내야 하나요?', a: '잔금 지급일(또는 등기접수일 중 빠른 날)로부터 60일 이내에 신고·납부해야 합니다. 기한을 넘기면 무신고가산세 20%와 납부지연가산세(1일 0.022%)가 붙습니다. 실무에서는 소유권이전등기를 접수할 때 법무사가 함께 처리하는 경우가 대부분입니다.' },
          { q: '증여나 상속으로 받은 집도 취득세를 내나요?', a: '네, 무상취득도 취득세 과세 대상입니다. 상속은 2.8%(무주택 가구가 상속받는 경우 0.8%), 증여는 3.5%가 기본 세율이며, 조정대상지역의 공시가격 3억원 이상 주택을 증여받으면 12%의 중과세율이 적용될 수 있습니다. 이 계산기는 유상 매매 기준이므로 증여·상속에는 적용되지 않습니다.' },
          { q: '오피스텔도 취득세율이 같나요?', a: '아닙니다. 오피스텔은 주택이 아닌 건축물로 분류되어 용도와 무관하게 4.6%(취득세 4% + 지방교육세 0.4% + 농특세 0.2%)가 적용됩니다. 다만 주거용으로 사용하며 주택분 재산세를 내는 오피스텔은 다른 주택을 살 때 주택 수에 포함되어 중과세율을 유발할 수 있습니다.' },
          { q: '일시적 2주택도 중과되나요?', a: '이사 등의 이유로 새 집을 먼저 산 경우, 종전 주택을 정해진 기한(일반적으로 3년) 안에 처분하면 1주택 세율을 적용받을 수 있습니다. 다만 먼저 8% 세율로 납부한 뒤 처분 후 환급받는 방식이 아니라, 신고 시점에 일시적 2주택임을 소명하는 절차가 필요합니다. 기한 내 처분하지 못하면 차액과 가산세를 추징당합니다.' },
        ]}
      />

      <SeoSection title="집 살 때 드는 다른 비용도 계산해 보세요">
        <p>
          주택 구입 시 실제 지출은 취득세로 끝나지 않습니다.
          <SeoLink href="/realestate/commission">부동산 중개수수료(복비) 계산기</SeoLink>로 중개보수를,{' '}
          <SeoLink href="/realestate/registration">등기비용 계산기</SeoLink>로 채권매입비와 법무사 보수를 확인해 보세요.
          대출을 낀다면 <SeoLink href="/loan/dsr">DSR 계산기</SeoLink>로 한도를,{' '}
          <SeoLink href="/loan">대출 이자 계산기</SeoLink>로 월 상환액을 미리 잡아두는 것이 좋습니다.
          전세로 방향을 잡았다면 <SeoLink href="/guide/jeonse">전세 계약 완전 가이드</SeoLink>가 도움이 됩니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
