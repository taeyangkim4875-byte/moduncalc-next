import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { HubGroups, HubGuides } from '@/components/CategoryHub';
import { SeoSection, SeoFaq, SeoList, SeoLink } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: '세금 계산기 모음 - 부가세·종합소득세·증여세·상속세·종부세',
  description: '부가세, 종합소득세, 증여세, 상속세, 종합부동산세, 근로장려금, 자동차세까지. 2026년 세법 기준 무료 세금 계산기 7종을 한 곳에서.',
  alternates: { canonical: 'https://moduncalc.com/tax' },
  openGraph: {
    title: '세금 계산기 모음 (2026년 세법 기준)',
    description: '부가세·종합소득세·증여세·상속세·종부세·근로장려금을 한 곳에서 계산하세요.',
    url: 'https://moduncalc.com/tax',
  },
};

const GROUPS = [
  {
    title: '🧾 사업·소득 관련 세금',
    note: '사업자나 프리랜서라면 1년에 최소 두 번(부가세·종소세) 마주치는 세금입니다.',
    items: ['/tax/vat', '/tax/income', '/tax/eitc'],
  },
  {
    title: '🎁 재산을 주고받을 때 내는 세금',
    note: '증여와 상속은 공제 한도와 세율 구조가 비슷하지만, 언제 주느냐에 따라 세금이 크게 달라집니다.',
    items: ['/tax/gift', '/tax/inherit'],
  },
  {
    title: '🏢 보유·처분 단계의 세금',
    note: '집과 차는 살 때, 가지고 있을 때, 팔 때 각각 다른 세금이 붙습니다.',
    items: ['/tax/property', '/daily/cartax', '/realestate/acqtax', '/realestate/transfer'],
  },
];

const GUIDES = [
  { href: '/guide/year-end-tax', title: '연말정산 초보 가이드', desc: '13월의 월급을 놓치지 않는 공제 항목 정리' },
  { href: '/guide/investment-tax', title: '주식·투자 세금 총정리', desc: '국내주식·해외주식·배당·가상자산 과세 기준' },
  { href: '/guide/salary-net-pay', title: '연봉 실수령액 완전 정리', desc: '원천징수부터 연말정산까지 이어지는 흐름' },
];

export default function Page() {
  return (
    <PageLayout
      eyebrow="세금"
      title="세금 계산기 모음"
      description="부가세부터 상속세까지, 2026년 세법 기준으로 계산해 드려요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '세금', href: '/tax' }]} />
      <FaqJsonLd items={[
        { q: '종합소득세는 누가 신고하나요?', a: '사업소득, 프리랜서 소득(3.3% 원천징수), 임대소득, 금융소득 2천만원 초과 등 근로소득 외 소득이 있는 사람이 매년 5월에 신고합니다. 근로소득만 있고 연말정산을 마쳤다면 따로 신고하지 않아도 됩니다.' },
        { q: '증여세는 얼마까지 안 내나요?', a: '10년 합산 기준으로 성인 자녀는 5천만원, 미성년 자녀는 2천만원, 배우자는 6억원까지 공제됩니다. 이 한도를 넘는 금액에 10~50% 누진세율이 적용됩니다.' },
        { q: '부가세 신고는 몇 번 하나요?', a: '법인은 연 4회(예정·확정 각 2회), 개인 일반과세자는 연 2회(1월·7월) 신고합니다. 간이과세자는 연 1회(1월) 신고합니다.' },
      ]} />

      <SeoSection title="어떤 세금부터 확인해야 할까요">
        <p>
          세금은 <strong>소득에 붙는 세금</strong>과 <strong>재산에 붙는 세금</strong>으로 크게 나뉩니다.
          직장인이라면 회사가 매달 원천징수하고 2월에 연말정산으로 정산하기 때문에 따로 신고할 일이 거의 없습니다.
          반면 프리랜서·사업자·임대소득자는 5월 종합소득세 신고가 의무입니다.
        </p>
        <p>
          재산 쪽은 <strong>취득 → 보유 → 처분</strong>의 세 단계마다 다른 세금이 붙습니다.
          집을 살 때 취득세, 가지고 있는 동안 재산세와 종합부동산세, 팔 때 양도소득세입니다.
          단계마다 세율과 공제가 완전히 달라서, 매매 계획이 있다면 세 가지를 미리 함께 계산해 보는 편이 좋습니다.
        </p>
      </SeoSection>

      <HubGroups groups={GROUPS} />

      <SeoSection title="2026년 달라진 세금 기준">
        <SeoList>
          <li><strong>종합소득세 누진세율</strong> — 8구간 6~45% 구조가 유지됩니다. 과세표준 1,400만원 이하 6%, 5,000만원 이하 15%, 8,800만원 이하 24% 순으로 올라갑니다.</li>
          <li><strong>국민연금 보험료율</strong> — 9%에서 9.5%로 올랐습니다(근로자 부담 4.75%). 납부한 보험료는 종합소득세 신고 시 전액 소득공제됩니다.</li>
          <li><strong>건강보험료율</strong> — 7.19%(근로자 3.595%)가 적용되며, 장기요양보험료는 건강보험료의 13.14%입니다.</li>
          <li><strong>가상자산 과세</strong> — 여러 차례 유예를 거쳐 2027년 시행 예정이며, 추가 유예 가능성이 남아 있습니다.</li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="세금 계산, 자주 헷갈리는 것들"
        items={[
          { q: '세율이 24% 구간이면 소득 전체에 24%를 내나요?', a: '아닙니다. 누진세는 구간별로 나눠서 계산합니다. 과세표준이 6,000만원이라면 1,400만원까지는 6%, 1,400만~5,000만원 구간은 15%, 5,000만~6,000만원 구간만 24%가 적용됩니다. 그래서 실효세율은 표시된 세율보다 훨씬 낮습니다.' },
          { q: '부가세 포함가에서 공급가액을 어떻게 구하나요?', a: '부가세율이 10%이므로 부가세 포함가를 1.1로 나누면 공급가액이 나옵니다. 11,000원의 공급가액은 10,000원, 부가세는 1,000원입니다. 1.1을 곱하는 것과 0.1을 더하는 것은 방향이 반대이니 주의하세요.' },
          { q: '증여를 미리 나눠서 하면 세금이 줄어드나요?', a: '증여재산 공제는 10년 단위로 합산됩니다. 성인 자녀 기준 10년에 5천만원까지 공제되므로, 10년 간격을 두고 나눠서 증여하면 공제를 두 번 받을 수 있습니다. 다만 상속개시 전 10년 이내의 증여는 상속재산에 합산되므로, 상속세까지 고려한 설계가 필요합니다.' },
          { q: '근로장려금은 세금인가요?', a: '세금이 아니라 저소득 근로자·사업자에게 지급하는 환급형 세액공제입니다. 가구 유형과 총소득, 재산 요건을 모두 충족해야 받을 수 있으며, 신청하지 않으면 지급되지 않습니다.' },
        ]}
      />

      <HubGuides guides={GUIDES} />

      <SeoSection title="세금 계산 결과는 어디까지 믿어도 될까요">
        <p>
          이 사이트의 세금 계산기는 소득세법·상속세및증여세법·부가가치세법에 명시된 세율과 공제 한도를 그대로 적용합니다.
          다만 실제 세액은 개인별 공제 항목(의료비·교육비·기부금·연금저축 등), 감면 요건, 가산세 여부에 따라 달라집니다.
          큰 금액이 걸린 결정이라면 계산 결과를 출발점으로 삼고, 세무사나 국세청 상담(☎ 126)으로 확인하시길 권합니다.
        </p>
        <p>
          연봉에서 세금이 얼마나 빠지는지 먼저 보고 싶다면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>가 가장 빠르고,
          부동산 관련 세금은 <SeoLink href="/realestate">부동산 계산기 모음</SeoLink>에 모아두었습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
