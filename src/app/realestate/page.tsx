import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { HubGroups, HubGuides } from '@/components/CategoryHub';
import { SeoSection, SeoFaq, SeoList, SeoLink } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: '부동산 계산기 모음 - 취득세·등기비용·복비·양도세·전월세 전환',
  description: '취득세, 등기비용, 중개수수료(복비), 양도소득세, 전월세 전환율, 임대수익률, 청약 가점까지. 집을 사고 팔 때 필요한 계산을 한 곳에서.',
  alternates: { canonical: 'https://moduncalc.com/realestate' },
  openGraph: {
    title: '부동산 계산기 모음 (2026년 기준)',
    description: '취득세·등기비용·복비·양도세·전월세 전환까지 한 번에 계산하세요.',
    url: 'https://moduncalc.com/realestate',
  },
};

const GROUPS = [
  {
    title: '🏠 집을 살 때',
    note: '매매가 외에 붙는 부대비용입니다. 5억 아파트라면 취득세·등기·복비만으로 1,000만원 안팎이 더 듭니다.',
    items: ['/realestate/acqtax', '/realestate/registration', '/realestate/commission', '/loan', '/loan/dsr'],
  },
  {
    title: '🏢 집을 팔 때',
    note: '보유 기간과 주택 수에 따라 세금이 수천만원 단위로 갈립니다. 팔기 전에 반드시 확인하세요.',
    items: ['/realestate/transfer', '/tax/property'],
  },
  {
    title: '🔑 전세·월세·임대',
    note: '전세와 월세 중 무엇이 유리한지, 임대를 놓으면 수익률이 얼마인지 따져볼 때 씁니다.',
    items: ['/realestate/convert', '/realestate/rental', '/realestate/subscription', '/daily/pyeong'],
  },
];

const GUIDES = [
  { href: '/guide/jeonse', title: '전세 계약 안전하게 하는 법', desc: '등기부등본 확인부터 확정일자·전세보증보험까지' },
  { href: '/guide/loan-comparison', title: '대출 상환 방식 비교', desc: '원리금균등·원금균등·만기일시, 총이자가 얼마나 다를까' },
];

export default function Page() {
  return (
    <PageLayout
      eyebrow="부동산"
      title="부동산 계산기 모음"
      description="집을 사고, 갖고, 팔 때 드는 돈을 미리 계산해 보세요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '부동산', href: '/realestate' }]} />
      <FaqJsonLd items={[
        { q: '5억짜리 아파트를 사면 취득세가 얼마인가요?', a: '1주택·85㎡ 이하 기준 취득세율은 1%로 500만원이며, 지방교육세 50만원이 더해져 총 550만원입니다. 85㎡를 넘으면 농어촌특별세 0.2%(100만원)가 추가됩니다.' },
        { q: '6억을 넘으면 취득세율이 갑자기 오르나요?', a: '아닙니다. 6억 초과 9억 이하 구간은 세율이 1%에서 3%까지 연속적으로 올라가는 구조(세율 = 매매가(억) × 2/3 − 3, %)라 계단식 급등이 없습니다. 9억을 넘으면 3%로 고정됩니다.' },
        { q: '전월세 전환율은 어떻게 계산하나요?', a: '전환율 = (월세 × 12) ÷ (전세보증금 − 월세보증금) × 100입니다. 주택임대차보호법상 법정 전환율 상한이 있으므로 계약 전에 확인하세요.' },
      ]} />

      <SeoSection title="집값 외에 얼마가 더 들까">
        <p>
          집을 살 때 실제로 필요한 돈은 매매가만이 아닙니다.
          <strong> 취득세, 지방교육세, 법무사 등기 비용, 중개수수료(복비), 인지세, 국민주택채권 매입</strong>까지 붙습니다.
          매매가 5억, 85㎡ 이하 1주택 기준으로 대략 다음과 같습니다.
        </p>
        <SeoList>
          <li><strong>취득세 1%</strong> — 500만원 (6억 이하 1주택 기준)</li>
          <li><strong>지방교육세</strong> — 취득세의 10%인 50만원</li>
          <li><strong>중개수수료</strong> — 5억 구간 상한요율 0.4% 적용 시 최대 200만원 (협의 가능)</li>
          <li><strong>등기 비용</strong> — 법무사 보수와 채권 할인료를 합쳐 통상 50~100만원</li>
        </SeoList>
        <p>
          합치면 <strong>800만~850만원</strong> 정도가 매매가 위에 추가로 필요합니다.
          대출 한도를 계산할 때 이 부대비용을 빼먹으면 잔금 날 자금이 모자라는 일이 생깁니다.
          <SeoLink href="/realestate/acqtax">취득세 계산기</SeoLink>와 <SeoLink href="/realestate/registration">등기비용 계산기</SeoLink>로 미리 잡아두세요.
        </p>
      </SeoSection>

      <HubGroups groups={GROUPS} />

      <SeoSection title="다주택자는 세율이 완전히 달라집니다">
        <p>
          취득세율은 주택 수에 따라 크게 뜁니다.
          1주택은 매매가에 따라 1~3%지만, <strong>2주택은 8%, 3주택 이상은 12%</strong>입니다.
          5억짜리 집이라면 1주택일 때 총 550만원, 2주택이 되는 순간 4,400만원으로 여덟 배가 됩니다.
        </p>
        <p>
          양도소득세도 마찬가지입니다. 1세대 1주택은 12억까지 비과세(2년 이상 보유 등 요건 충족 시)지만,
          다주택자는 비과세가 없고 중과세율이 적용될 수 있습니다.
          보유 기간에 따른 장기보유특별공제도 1주택과 다주택이 다릅니다.
          두 번째 집을 살지 말지 고민 중이라면 <SeoLink href="/realestate/acqtax">취득세</SeoLink>와
          <SeoLink href="/realestate/transfer"> 양도소득세</SeoLink>를 함께 시뮬레이션해 보세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="부동산 계산, 이런 게 궁금하실 거예요"
        items={[
          { q: '복비(중개수수료)는 깎을 수 있나요?', a: '요율표의 숫자는 상한이지 정가가 아닙니다. 법정 상한 안에서 중개사와 협의해 정하는 것이 원칙이며, 실제로 조정되는 경우가 많습니다. 계약 전에 수수료를 먼저 정하고 계약서에 명시해 두는 편이 안전합니다.' },
          { q: '생애최초 주택 구입 취득세 감면은 얼마나 되나요?', a: '요건을 충족하면 취득세를 최대 200만원까지 감면받을 수 있습니다. 소득·주택가격 요건과 실거주 의무가 있으므로 관할 시군구청이나 위택스에서 본인 해당 여부를 확인하세요. 이 사이트의 계산기는 감면 전 법정 기본 세율을 기준으로 합니다.' },
          { q: '전세와 월세 중 뭐가 유리한가요?', a: '전세보증금을 예금이나 투자로 굴렸을 때의 수익률과 월세 전환율을 비교하면 됩니다. 전환율이 예금금리보다 높으면 전세가, 낮으면 월세가 유리합니다. 전월세 전환 계산기로 두 경우를 나란히 놓고 비교해 보세요.' },
          { q: '임대수익률은 어떻게 보나요?', a: '표면수익률은 연 임대료 ÷ 매입가이고, 실질수익률은 여기서 대출이자·재산세·관리비·공실률을 뺀 값입니다. 표면수익률만 보고 판단하면 실제 손에 쥐는 돈과 크게 차이가 납니다.' },
        ]}
      />

      <HubGuides guides={GUIDES} />
    </PageLayout>
  );
}
