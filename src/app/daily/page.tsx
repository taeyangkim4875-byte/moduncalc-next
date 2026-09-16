import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { HubGroups } from '@/components/CategoryHub';
import { SeoSection, SeoFaq, SeoLink } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: '일상 계산기 모음 - 전기요금·글자수·D-day·퍼센트·연비',
  description: '에어컨 전기요금, 글자수 세기, D-day, 퍼센트, 연비, 자동차세, 더치페이까지. 매일 쓰는 생활 계산기 40여 종을 한 곳에서 무료로.',
  alternates: { canonical: 'https://moduncalc.com/daily' },
  openGraph: {
    title: '일상 계산기 모음',
    description: '전기요금·글자수·D-day·퍼센트·연비 등 생활 계산기 40여 종.',
    url: 'https://moduncalc.com/daily',
  },
};

const GROUPS = [
  {
    title: '🔧 자주 쓰는 도구',
    note: '자소서 글자수, 비밀번호 생성처럼 하루에도 몇 번씩 필요한 것들입니다.',
    items: ['/daily/charcount', '/daily/password', '/daily/random', '/daily/time', '/daily/percent', '/daily/discount', '/daily/unit', '/daily/pyeong', '/calc'],
  },
  {
    title: '📅 날짜·기념일',
    note: '며칠 남았는지, 며칠 지났는지 세는 계산기입니다.',
    items: ['/daily/dday', '/daily/age', '/daily/anniversary', '/daily/baby100', '/daily/due-date', '/daily/lunar', '/daily/military'],
  },
  {
    title: '💡 공과금·생활비',
    note: '누진 구간 때문에 직접 계산하기 까다로운 항목들입니다. 사용량만 넣으면 됩니다.',
    items: ['/daily/aircon', '/daily/electric', '/daily/gas', '/daily/water', '/daily/airfryer', '/daily/paint'],
  },
  {
    title: '🚗 자동차·이동',
    note: '기름값, 자동차세, 여행 경비처럼 이동에 드는 돈을 계산합니다.',
    items: ['/daily/fuel', '/daily/cartax', '/daily/travel', '/daily/speed'],
  },
  {
    title: '💹 투자·부업 수익',
    note: '수익률과 예상 수입을 계산해 볼 때 씁니다.',
    items: ['/daily/stock', '/daily/crypto', '/daily/gold', '/daily/compound', '/daily/fire', '/daily/coupang', '/daily/youtube', '/daily/adsense'],
  },
  {
    title: '🍽️ 모임·기타',
    note: '사람이 여럿일 때 돈을 나누거나, 숫자를 빨리 정해야 할 때 씁니다.',
    items: ['/daily/dutch', '/daily/tip-split', '/daily/gpa', '/daily/calorie'],
  },
];

export default function Page() {
  return (
    <PageLayout
      eyebrow="일상"
      title="일상 계산기 모음"
      description="전기요금부터 글자수 세기까지, 매일 필요한 계산을 모았어요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }]} />
      <FaqJsonLd items={[
        { q: '에어컨을 하루 8시간 켜면 전기요금이 얼마나 나오나요?', a: '주택용 전기요금은 누진 3단계 구조라 기존 사용량에 따라 크게 달라집니다. 같은 에어컨을 써도 월 200kWh를 쓰던 집과 400kWh를 쓰던 집의 추가 요금이 두 배 이상 차이 납니다. 에어컨 전기요금 계산기에서 기존 사용량을 함께 입력해 보세요.' },
        { q: '글자수 세기는 공백 포함인가요?', a: '공백 포함과 공백 제외를 동시에 보여줍니다. 자기소개서는 대부분 공백 포함 기준이고, 보고서나 원고지 환산은 공백 제외를 쓰는 경우가 많습니다. 바이트 수도 함께 확인할 수 있습니다.' },
        { q: '계산 결과가 저장되나요?', a: '입력값과 결과는 브라우저 안에서만 처리되며 서버로 전송되지 않습니다. 계산 기록도 사용 중인 기기에만 임시로 남습니다.' },
      ]} />

      <SeoSection title="누진 구간이 있는 요금은 직접 계산하기 어렵습니다">
        <p>
          전기·가스·수도 요금이 헷갈리는 이유는 <strong>단가가 사용량에 따라 달라지기 때문</strong>입니다.
          주택용 전기는 3단계 누진 구조라, 1단계 구간의 단가와 3단계 구간의 단가가 두 배 이상 차이 납니다.
          여기에 기후환경요금과 연료비조정요금, 부가세 10%와 전력산업기반기금 3.7%가 더 붙습니다.
        </p>
        <p>
          그래서 &ldquo;에어컨 1시간에 몇 원&rdquo;이라는 답은 원래 존재하지 않습니다.
          <strong>기존에 얼마나 쓰고 있었는지</strong>에 따라 같은 에어컨의 추가 요금이 달라지기 때문입니다.
          월 200kWh를 쓰던 집이 100kWh를 더 쓰는 것과, 이미 400kWh를 쓰던 집이 100kWh를 더 쓰는 것은
          요금 증가폭이 완전히 다릅니다.
          <SeoLink href="/daily/aircon">에어컨 전기요금 계산기</SeoLink>가 기존 사용량을 함께 묻는 이유입니다.
        </p>
      </SeoSection>

      <HubGroups groups={GROUPS} />

      <SeoFaq
        title="일상 계산, 자주 묻는 질문"
        items={[
          { q: '이중 할인은 어떻게 계산하나요?', a: '20% 할인 후 추가 10% 할인은 30% 할인이 아닙니다. 1 × 0.8 × 0.9 = 0.72, 즉 총 28% 할인입니다. 두 번째 할인이 이미 깎인 가격에 적용되기 때문입니다. 순서를 바꿔도 결과는 같습니다.' },
          { q: '한국 나이와 만 나이가 헷갈립니다.', a: '2023년 6월부터 법령·행정상 나이는 만 나이로 통일됐습니다. 생일이 지났으면 현재연도 − 출생연도, 안 지났으면 거기서 1을 뺍니다. 다만 술·담배 구입은 여전히 연 나이(현재연도 − 출생연도) 기준이라 따로 봐야 합니다.' },
          { q: '연비 계산은 주행거리 ÷ 주유량인가요?', a: '맞습니다. 다만 정확하게 재려면 주유구가 자동으로 멈출 때까지 가득 채우고, 트립미터를 0으로 맞춘 뒤 다음 주유 때 같은 방식으로 가득 채워 그 사이 주행거리를 넣어야 합니다. 한 번 넣고 계기판 표시 연비를 보는 것보다 훨씬 정확합니다.' },
          { q: '자동차세는 왜 연초에 내면 싼가요?', a: '1월에 1년치를 한 번에 선납하면 약 5%를 공제해 줍니다. 3월·6월·9월 선납도 각각 남은 기간에 비례해 공제됩니다. 배기량 기준으로 부과되며, 차령 3년차부터 매년 5%씩 최대 50%까지 경감됩니다.' },
        ]}
      />

      <SeoSection title="다른 분야 계산기도 찾아보세요">
        <p>
          연봉과 월급 관련은 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>,
          세금은 <SeoLink href="/tax">세금 계산기 모음</SeoLink>,
          집 관련은 <SeoLink href="/realestate">부동산 계산기 모음</SeoLink>,
          체중·칼로리는 <SeoLink href="/health">건강 계산기 모음</SeoLink>에 모아두었습니다.
          적금과 예금은 <SeoLink href="/savings">적금 계산기 모음</SeoLink>에서 확인할 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
