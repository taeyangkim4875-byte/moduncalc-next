import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { HubGroups, HubGuides } from '@/components/CategoryHub';
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: '적금·예금 계산기 모음 - 청년도약계좌·청년미래적금·만기 이자',
  description: '청년도약계좌 만기 수령액, 청년미래적금 우대금리 비교, 적금·예금 이자, 복리 계산까지. 이자소득세 15.4%까지 반영한 무료 계산기.',
  alternates: { canonical: 'https://moduncalc.com/savings' },
  openGraph: {
    title: '적금·예금 계산기 모음',
    description: '청년도약계좌·청년미래적금·적금 이자·복리 계산을 한 곳에서.',
    url: 'https://moduncalc.com/savings',
  },
};

const GROUPS = [
  {
    title: '🏦 청년 정책금융 상품',
    note: '정부기여금과 비과세 혜택이 붙어 일반 적금보다 실질 수익률이 훨씬 높습니다. 자격이 된다면 1순위로 검토하세요.',
    items: ['/savings/doyak', '/savings/mirae'],
  },
  {
    title: '💵 일반 적금·예금',
    note: '단리·복리, 이자소득세 15.4%를 반영해 실제 손에 쥐는 만기 수령액을 계산합니다.',
    items: ['/savings/interest', '/daily/compound'],
  },
  {
    title: '📈 목돈을 굴릴 때',
    note: '모은 돈을 어디에 둘지 판단할 때 함께 보면 좋은 계산기입니다.',
    items: ['/daily/stock', '/daily/gold', '/daily/fire', '/daily/crypto'],
  },
];

const GUIDES = [
  { href: '/guide/doyak-vs-mirae', title: '청년도약계좌 vs 청년미래적금', desc: '둘 중 뭘 들어야 하나, 환승은 유리한가' },
  { href: '/guide/fire-retirement', title: 'FIRE 조기 은퇴 가이드', desc: '얼마를 모아야 일을 그만둘 수 있을까' },
  { href: '/guide/investment-tax', title: '주식·투자 세금 총정리', desc: '이자·배당소득세와 금융소득종합과세 기준' },
];

export default function Page() {
  return (
    <PageLayout
      eyebrow="적금 / 예금"
      title="적금·예금 계산기 모음"
      description="만기에 실제로 받는 금액을 세금까지 계산해서 알려드려요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '적금', href: '/savings' }]} />
      <FaqJsonLd items={[
        { q: '적금 금리 4%면 100만원씩 1년 넣으면 이자가 48만원인가요?', a: '아닙니다. 적금은 매달 넣은 돈이 예치되는 기간이 서로 달라서, 첫 달 납입금만 12개월치 이자를 받고 마지막 달 납입금은 1개월치만 받습니다. 연 4% 적금에 매달 100만원씩 12개월 넣으면 세전 이자는 약 26만원입니다.' },
        { q: '이자소득세는 얼마나 떼나요?', a: '일반 상품은 이자소득세 14% + 지방소득세 1.4%로 총 15.4%가 원천징수됩니다. 청년도약계좌 등 비과세 상품은 이 세금이 붙지 않습니다.' },
        { q: '단리와 복리는 얼마나 차이 나나요?', a: '기간이 짧으면 차이가 작지만 길어질수록 급격히 벌어집니다. 연 5%로 1,000만원을 20년 두면 단리는 2,000만원, 복리는 약 2,653만원이 됩니다.' },
      ]} />

      <SeoSection title="적금 이자는 왜 생각보다 적을까">
        <p>
          연 4% 적금에 매달 100만원씩 1년을 넣으면 원금은 1,200만원입니다.
          여기에 4%를 곱해 48만원을 기대하는 분이 많은데, 실제 세전 이자는 <strong>약 26만원</strong>입니다.
          적금은 매달 넣은 돈이 예치되는 기간이 다르기 때문입니다.
        </p>
        <SeoFormula>
          <div>적금 세전 이자 = 월납입액 × 이율 × (n × (n+1) ÷ 2) ÷ 12</div>
          <div>n = 납입 개월 수</div>
          <div>세후 이자 = 세전 이자 × (1 − 0.154)</div>
        </SeoFormula>
        <p>
          첫 달에 넣은 100만원은 12개월 동안 예치되지만, 마지막 달에 넣은 100만원은 1개월뿐입니다.
          평균 예치 기간이 대략 절반이라 이자도 절반 수준이 되는 것입니다.
          여기서 이자소득세 15.4%를 떼면 실수령 이자는 약 22만원이 됩니다.
          예금은 목돈을 처음부터 끝까지 맡기므로 같은 금리라도 이자가 훨씬 많습니다.
        </p>
      </SeoSection>

      <HubGroups groups={GROUPS} />

      <SeoSection title="청년 정책금융 상품이 유리한 이유">
        <SeoList>
          <li><strong>정부기여금</strong> — 소득 구간에 따라 납입액의 일정 비율을 정부가 얹어줍니다. 이 자체가 원금 대비 즉시 수익입니다.</li>
          <li><strong>이자소득 비과세</strong> — 일반 적금은 이자에서 15.4%를 떼지만, 요건을 충족하면 세금이 붙지 않습니다.</li>
          <li><strong>우대금리</strong> — 은행별 급여이체·카드실적 등 조건을 채우면 기본금리에 추가 금리가 붙습니다. 조건이 은행마다 달라 비교가 필요합니다.</li>
        </SeoList>
        <p>
          다만 <strong>중도해지하면 혜택 대부분을 잃습니다.</strong> 만기까지 유지할 수 있는 금액인지가 가장 중요합니다.
          매달 납입액을 무리하게 잡았다가 중간에 해지하면 일반 예금만 못한 결과가 나옵니다.
          <SeoLink href="/savings/doyak">청년도약계좌 계산기</SeoLink>에서는 특별중도해지 시 수령액도 함께 확인할 수 있습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="적금 들기 전에 확인할 것"
        items={[
          { q: '광고에 나온 금리와 실제 금리가 다른데요?', a: '광고에 표시되는 금리는 보통 최고 우대금리입니다. 급여이체, 카드 실적, 마케팅 동의, 첫 거래 등 조건을 전부 충족했을 때의 숫자예요. 기본금리가 얼마인지, 내가 실제로 채울 수 있는 조건이 무엇인지 따져서 계산해야 실제 수령액에 가깝습니다.' },
          { q: '만기가 되면 자동으로 재예치되나요?', a: '상품에 따라 다릅니다. 자동 재예치를 걸어두지 않으면 만기 다음 날부터는 매우 낮은 만기후이율이 적용됩니다. 만기일을 D-day 계산기에 등록해 두고 제때 처리하는 편이 좋습니다.' },
          { q: '금융소득종합과세는 언제 걱정해야 하나요?', a: '이자와 배당을 합친 금융소득이 연 2,000만원을 넘으면 다른 소득과 합산해 종합과세됩니다. 예금 금리 3.5% 기준으로 약 5억 7천만원의 예치금에서 발생하는 수준이라, 일반적인 적금 규모에서는 해당되지 않습니다.' },
          { q: '예금자보호는 얼마까지 되나요?', a: '금융회사별로 원금과 이자를 합쳐 1인당 보호 한도까지 보호됩니다. 한 은행에 몰아넣기보다 여러 금융기관에 나누어 예치하면 한도 문제를 피할 수 있습니다. 보호 한도는 예금자보호법 개정에 따라 달라질 수 있으니 예금보험공사 공지를 확인하세요.' },
        ]}
      />

      <HubGuides guides={GUIDES} />
    </PageLayout>
  );
}
