import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Card from '@/components/Card';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { SeoSection, SeoLink } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: '가이드 - 연봉·4대보험·전세·연말정산·퇴직금 완전 정리',
  description: '연봉 실수령액, 4대보험, 전세 계약, 연말정산, 퇴직금, 최저시급, 대출 상환, 주식 세금까지. 계산기만으로는 알기 어려운 배경을 정리한 가이드 10편.',
  alternates: { canonical: 'https://moduncalc.com/guide' },
  openGraph: {
    title: '모든 계산기 가이드',
    description: '연봉·4대보험·전세·연말정산·퇴직금을 제대로 이해하는 가이드 모음.',
    url: 'https://moduncalc.com/guide',
  },
};

interface GuideItem {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  reads: string;
}

const SECTIONS: { title: string; note: string; items: GuideItem[] }[] = [
  {
    title: '💰 일하고 받는 돈',
    note: '월급명세서에서 빠져나가는 항목들이 왜, 얼마나 빠지는지 정리했습니다.',
    items: [
      { href: '/guide/salary-net-pay', emoji: '💰', title: '연봉 실수령액 완전 정리', desc: '세전 연봉에서 통장에 꽂히는 금액까지, 공제 항목을 하나씩 따라가며 설명합니다.', reads: '연봉 협상 전' },
      { href: '/guide/4-insurance', emoji: '🛡️', title: '4대보험 완전 정리', desc: '국민연금·건강보험·고용보험·산재보험의 2026년 요율과 계산 방식, 회사와 나의 부담 비율.', reads: '월급명세서가 이해 안 될 때' },
      { href: '/guide/minimum-wage', emoji: '⏱️', title: '2026 최저시급 완전 정리', desc: '시급 10,320원 기준 월급, 주휴수당 조건, 수습 감액, 위반 시 대응까지.', reads: '알바·시급 계약 전' },
      { href: '/guide/severance-pay', emoji: '💼', title: '퇴직금 계산법 정리', desc: '평균임금 산정 기준, 1년 미만 퇴사, 퇴직소득세, 퇴직연금(DB·DC) 차이.', reads: '퇴사를 앞두고' },
    ],
  },
  {
    title: '🧾 세금과 환급',
    note: '해마다 돌아오는 신고와 정산을 놓치지 않기 위한 내용입니다.',
    items: [
      { href: '/guide/year-end-tax', emoji: '🧾', title: '연말정산 초보 가이드', desc: '소득공제와 세액공제의 차이, 놓치기 쉬운 항목, 맞벌이 부부의 공제 배분 전략.', reads: '매년 1~2월' },
      { href: '/guide/investment-tax', emoji: '📈', title: '주식·투자 세금 총정리', desc: '국내주식 양도세, 해외주식 22%, 배당소득세, 금융소득종합과세 기준선.', reads: '투자 수익이 생겼을 때' },
    ],
  },
  {
    title: '🏠 집과 대출',
    note: '금액이 큰 만큼 한 번의 실수가 오래 남는 분야입니다.',
    items: [
      { href: '/guide/jeonse', emoji: '🔑', title: '전세 계약 안전하게 하는 법', desc: '등기부등본 보는 법, 근저당 확인, 확정일자와 전입신고, 전세보증보험 가입 조건.', reads: '전세 계약 전' },
      { href: '/guide/loan-comparison', emoji: '🏦', title: '대출 상환 방식 비교', desc: '원리금균등·원금균등·만기일시의 총이자 차이와, 어떤 상황에 무엇이 유리한지.', reads: '대출 실행 전' },
    ],
  },
  {
    title: '🏦 저축과 은퇴',
    note: '지금 모으는 돈이 나중에 어떤 모양이 되는지 계산해 본 글들입니다.',
    items: [
      { href: '/guide/doyak-vs-mirae', emoji: '🏦', title: '청년도약계좌 vs 청년미래적금', desc: '두 상품의 정부기여금·금리·만기 구조를 비교하고, 환승이 유리한 경우를 따져봅니다.', reads: '청년 적금 가입 전' },
      { href: '/guide/fire-retirement', emoji: '🔥', title: 'FIRE 조기 은퇴 가이드', desc: '4% 법칙, 필요 자산 규모, 국민연금 개시 전까지의 공백을 메우는 방법.', reads: '은퇴를 계획할 때' },
    ],
  },
];

export default function Page() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="가이드"
      description="계산기 숫자 뒤에 있는 제도와 배경을 정리했어요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '가이드', href: '/guide' }]} />

      <SeoSection title="계산기만으로는 부족할 때">
        <p>
          계산기는 &ldquo;얼마인가&rdquo;에 답합니다. 하지만 실제로 결정을 내리려면
          <strong> &ldquo;왜 그 금액인가&rdquo;</strong>와 <strong>&ldquo;내 경우엔 어떤 조건이 붙는가&rdquo;</strong>를 알아야 합니다.
          퇴직금이 얼마인지 아는 것과, 퇴사 시점을 언제로 잡아야 퇴직금이 늘어나는지 아는 것은 다른 문제입니다.
        </p>
        <p>
          아래 가이드는 각 계산기와 짝을 이루는 글입니다.
          계산 결과를 먼저 보고 숫자가 이해되지 않을 때 읽어도 좋고,
          결정을 앞두고 미리 읽어도 좋습니다. 모든 내용은 법령과 정부 기관 고시를 확인해 작성했으며,
          기준이 바뀌면 함께 갱신합니다.
        </p>
      </SeoSection>

      {SECTIONS.map(section => (
        <Card key={section.title}>
          <h2 className="text-base font-extrabold mb-1">{section.title}</h2>
          <p className="text-sm text-[var(--sub)] leading-relaxed mb-3">{section.note}</p>
          <div className="flex flex-col gap-2">
            {section.items.map(g => (
              <Link
                key={g.href}
                href={g.href}
                className="block px-3.5 py-3 rounded-xl no-underline text-[var(--ink)] bg-[var(--bg)] hover:bg-[var(--primary-weak)] transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{g.emoji}</span>
                  <span className="text-sm font-bold">{g.title}</span>
                </span>
                <span className="block text-xs text-[var(--sub)] mt-1 leading-relaxed">{g.desc}</span>
                <span className="inline-block text-[11px] font-bold text-[var(--primary)] mt-1.5">📌 {g.reads}</span>
              </Link>
            ))}
          </div>
        </Card>
      ))}

      <SeoSection title="영어 가이드도 있습니다">
        <p>
          한국에 사는 외국인을 위한 영어 가이드 28편을 별도로 운영하고 있습니다.
          비자, 외국인등록증(ARC), 건강보험 가입, 연금 반환일시금, 전세·월세 계약, 운전면허 전환 등
          한국 거주 초기에 필요한 내용을 다룹니다.
          <SeoLink href="/en/guide">영문 가이드 목록</SeoLink>에서 전체를 훑어보거나,
          <SeoLink href="/en"> English 페이지</SeoLink>에서 전체 목록을 확인하세요.
        </p>
      </SeoSection>

      <SeoSection title="가이드는 이렇게 만듭니다">
        <p>
          모든 수치는 법령·정부 고시·공공기관 발표 자료에서 직접 확인합니다.
          예를 들어 최저임금은 고용노동부 고시, 4대보험 요율은 국민연금공단·국민건강보험공단 고시,
          세율은 소득세법과 상속세및증여세법 조문을 근거로 합니다.
          기준이 바뀌면 해당 가이드와 계산기를 함께 수정하며, 한쪽만 갱신되는 일이 없도록 수치를 한 곳에서 관리합니다.
        </p>
        <p>
          가이드 내용은 <strong>일반적인 정보 제공</strong>이 목적이며 개별 사안에 대한 법률·세무 자문이 아닙니다.
          금액이 크거나 조건이 복잡한 경우에는 세무사·노무사·변호사 등 전문가나
          관할 기관(국세청 ☎ 126, 고용노동부 ☎ 1350)에 확인하시기 바랍니다.
          자세한 내용은 <SeoLink href="/disclaimer">면책조항</SeoLink>에 정리해 두었습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
