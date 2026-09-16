import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { HubGroups, HubGuides } from '@/components/CategoryHub';
import { SeoSection, SeoFaq, SeoList, SeoLink } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: '연금·보험 계산기 모음 - 국민연금 예상수령액·실업급여·4대보험',
  description: '국민연금 예상 수령액, 실업급여(구직급여) 예상액, 4대보험료까지. 2026년 보험료율 9.5%와 기준소득월액 상한 659만원을 반영한 무료 계산기.',
  alternates: { canonical: 'https://moduncalc.com/pension' },
  openGraph: {
    title: '연금·보험 계산기 모음 (2026년 기준)',
    description: '국민연금 예상수령액, 실업급여, 4대보험료를 한 곳에서 계산하세요.',
    url: 'https://moduncalc.com/pension',
  },
};

const GROUPS = [
  {
    title: '👵 노후 연금',
    note: '지금 소득과 가입 기간으로 나중에 매달 얼마를 받게 되는지 계산합니다.',
    items: ['/pension/nps', '/pension/nps/reverse', '/salary/lifetime'],
  },
  {
    title: '💼 퇴사·실직할 때',
    note: '퇴직금과 실업급여는 계산 기준이 다릅니다. 둘 다 미리 확인해 두면 퇴사 시점을 정하는 데 도움이 됩니다.',
    items: ['/pension/jobless', '/salary/severance', '/salary/annual'],
  },
  {
    title: '🛡️ 매달 떼이는 보험료',
    note: '4대보험은 연봉의 약 9%를 차지합니다. 항목별로 얼마인지 확인해 보세요.',
    items: ['/salary/insurance', '/salary'],
  },
];

const GUIDES = [
  { href: '/guide/4-insurance', title: '4대보험 완전 정리', desc: '국민연금·건강보험·고용보험·산재보험 요율과 계산법' },
  { href: '/guide/severance-pay', title: '퇴직금 계산법 정리', desc: '평균임금 산정부터 퇴직소득세까지' },
  { href: '/guide/fire-retirement', title: 'FIRE 조기 은퇴 가이드', desc: '국민연금 개시 전까지 버틸 돈은 얼마일까' },
];

export default function Page() {
  return (
    <PageLayout
      eyebrow="연금 / 보험"
      title="연금·보험 계산기 모음"
      description="국민연금, 실업급여, 4대보험료를 2026년 기준으로 계산해 드려요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연금', href: '/pension' }]} />
      <FaqJsonLd items={[
        { q: '2026년 국민연금 보험료율은 얼마인가요?', a: '총 9.5%이며 근로자와 사업주가 각각 4.75%씩 부담합니다. 2025년 9%에서 0.5%p 올랐고, 2033년까지 매년 0.5%p씩 인상되어 13%가 됩니다.' },
        { q: '국민연금 기준소득월액 상한은 얼마인가요?', a: '2026년 7월부터 2027년 6월까지 상한 659만원, 하한 41만원입니다. 상한 소득자의 월 보험료는 본인 부담 313,025원입니다. 이 상·하한액은 매년 7월에 조정됩니다.' },
        { q: '실업급여 하한액은 얼마인가요?', a: '2026년 1일 하한액은 66,048원입니다. 최저시급 10,320원 × 8시간 × 80%로 계산됩니다. 1일 상한액은 68,100원입니다.' },
        { q: '국민연금을 10년 미만 냈으면 어떻게 되나요?', a: '노령연금 수급 요건인 최소 가입기간 10년을 채우지 못하면 매달 받는 연금 대신, 낸 보험료에 이자를 더해 반환일시금으로 받게 됩니다.' },
      ]} />

      <SeoSection title="2026년, 연금·보험료가 달라졌습니다">
        <SeoList>
          <li><strong>국민연금 보험료율 9% → 9.5%</strong> — 1998년 이후 처음 9%를 넘었습니다. 근로자 부담은 4.5%에서 4.75%가 됐습니다. 2033년까지 매년 0.5%p씩 올라 13%에 도달할 예정입니다.</li>
          <li><strong>기준소득월액 상한 637만원 → 659만원</strong> — 2026년 7월부터 적용됩니다. 하한은 41만원입니다. 상한 소득자라면 월 보험료 본인 부담이 302,575원에서 313,025원으로 약 1만원 올랐습니다.</li>
          <li><strong>건강보험료율 7.09% → 7.19%</strong> — 근로자 부담은 3.595%입니다. 장기요양보험료는 건강보험료의 13.14%(2025년 12.95%에서 인상)입니다.</li>
          <li><strong>소득대체율 43%</strong> — 2026년부터 적용되는 소득대체율입니다. 40년 가입을 기준으로 생애 평균소득의 43%를 연금으로 받는다는 의미입니다.</li>
        </SeoList>
      </SeoSection>

      <HubGroups groups={GROUPS} />

      <SeoSection title="국민연금, 얼마나 받게 될까">
        <p>
          국민연금 수령액은 <strong>내 소득</strong>과 <strong>전체 가입자 평균소득(A값)</strong>을 반씩 반영해 계산합니다.
          그래서 소득이 두 배라고 연금이 두 배가 되지 않습니다. 소득재분배 기능이 들어 있기 때문입니다.
        </p>
        <p>
          월 소득 300만원으로 30년을 가입하면 월 약 99만원, 40년이면 약 133만원 수준입니다.
          같은 30년을 가입해도 월 소득이 500만원이면 약 132만원으로, 소득이 67% 높은데 연금은 33%만 많습니다.
          반대로 말하면 <strong>소득이 낮을수록 낸 돈 대비 받는 연금의 비율이 높습니다.</strong>
        </p>
        <p>
          연금액을 늘리는 가장 확실한 방법은 소득을 올리는 것보다 <strong>가입 기간을 늘리는 것</strong>입니다.
          20년을 넘는 기간은 1년마다 5%씩 가산되기 때문입니다.
          경력 단절 기간이 있다면 추납(추후납부)이나 임의가입을 검토해 볼 만합니다.
          <SeoLink href="/pension/nps">국민연금 계산기</SeoLink>에서 가입 기간을 바꿔가며 비교해 보세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="연금·실업급여, 자주 묻는 질문"
        items={[
          { q: '실업급여는 월급이 많으면 더 받나요?', a: '이론상 퇴직 전 평균임금의 60%지만, 상한액(1일 68,100원)과 하한액(1일 66,048원)의 차이가 하루 2,052원밖에 되지 않습니다. 그래서 월급 200만원인 사람이나 500만원인 사람이나 실제 받는 금액이 거의 같습니다. 월 단위로 봐도 6만원 남짓 차이입니다.' },
          { q: '자발적 퇴사면 실업급여를 못 받나요?', a: '원칙적으로 받을 수 없습니다. 다만 임금 체불, 직장 내 괴롭힘, 통근 시간 왕복 3시간 이상, 질병, 가족 간병 등 법에서 정한 정당한 사유가 인정되면 자발적 퇴사도 수급이 가능합니다. 고용센터에서 개별 판단합니다.' },
          { q: '국민연금을 미리 받거나 늦게 받을 수 있나요?', a: '최대 5년 앞당겨 받는 조기노령연금은 1년당 6%씩 감액되어 5년이면 30%가 깎입니다. 반대로 최대 5년 미루는 연기연금은 1년당 7.2%씩 늘어 5년이면 36%가 더해집니다. 건강과 다른 소득원을 함께 고려해 결정하세요.' },
          { q: '4대보험료는 회사와 정확히 반반인가요?', a: '국민연금과 건강보험은 정확히 반반입니다. 고용보험은 실업급여분만 반반(각 0.9%)이고, 고용안정·직업능력개발 사업분은 사업주가 전액 부담합니다. 산재보험은 사업주가 100% 부담해 근로자 급여에서 공제되지 않습니다.' },
        ]}
      />

      <HubGuides guides={GUIDES} />
    </PageLayout>
  );
}
