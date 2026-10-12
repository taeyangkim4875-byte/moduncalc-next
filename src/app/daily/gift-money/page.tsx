import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { SeoSection, SeoFaq, SeoList, SeoLink } from '@/components/SeoContent';
import GiftMoneyCalc from './GiftMoneyCalc';

export const metadata: Metadata = {
  title: '축의금 계산기 - 관계·식대로 적정 범위 확인',
  description:
    '친구 결혼식 축의금 얼마 내야 할까? 관계와 참석 여부, 예식장 식대를 넣으면 근거와 함께 범위를 알려드려요. 인크루트 설문과 한국소비자원 식대 조사 기준.',
  alternates: { canonical: 'https://moduncalc.com/daily/gift-money' },
  openGraph: {
    title: '축의금 계산기 - 관계·식대로 적정 범위 확인',
    description: '설문 데이터와 예식장 식대를 근거로 축의금 범위를 판단해 드려요.',
    url: 'https://moduncalc.com/daily/gift-money',
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="경조사"
      title="축의금 계산기"
      description="관계와 식대를 넣으면 근거와 함께 범위를 알려드려요."
    >
      <BreadcrumbJsonLd
        items={[
          { name: '홈', href: '/' },
          { name: '일상', href: '/daily' },
          { name: '축의금', href: '/daily/gift-money' },
        ]}
      />
      <CalculatorJsonLd
        name="축의금 계산기"
        description="관계와 참석 여부, 예식장 식대를 기준으로 축의금 참고 범위를 계산합니다."
        url="https://moduncalc.com/daily/gift-money"
      />
      <FaqJsonLd
        items={[
          {
            q: '직장 동료 축의금은 얼마가 적당한가요?',
            a: '인크루트가 2025년 5월 직장인 844명에게 물은 결과 10만원이 61.8%로 가장 많았고 5만원이 32.8%였습니다. 사적으로 친한 동료는 10만원 59.7%, 일로만 엮인 동료도 10만원 60.1%로 큰 차이가 없었습니다. 2023년 같은 조사에서는 덜 친한 동료의 경우 5만원이 65.1%로 1위였는데 2년 만에 역전됐습니다.',
          },
          {
            q: '5만원 내고 식사하면 민폐인가요?',
            a: '예식장 1인당 식대에 달려 있습니다. 한국소비자원 조사 기준 전국 1인당 식대 중간값은 59,000원이라, 참석해서 식사까지 하면서 5만원을 내면 받는 쪽이 적자가 됩니다. 서울 강남권은 85,000원이라 차이가 더 큽니다. 반대로 경상권은 44,000원 수준이라 5만원으로도 식대를 넘습니다. 지역과 예식장에 따라 답이 달라집니다.',
          },
          {
            q: '참석하지 않으면 얼마를 내나요?',
            a: '식대가 들지 않으므로 같은 관계라도 낮게 내는 것이 일반적입니다. 얼굴만 아는 사이라면 5만원, 친한 사이라면 참석할 때의 절반 안팎을 기준으로 잡는 경우가 많습니다. 금액보다 연락을 먼저 하는 쪽이 관계에는 더 중요합니다.',
          },
          {
            q: '배우자나 아이와 함께 가면 어떻게 하나요?',
            a: '식사 인원만큼 식대가 늘어나므로 그만큼 올려 내는 것이 일반적입니다. 1인당 식대가 59,000원인 예식장에 둘이 가면 식대만 118,000원이라, 10만원을 내면 식대에도 못 미칩니다. 아이가 어려 식사를 하지 않는다면 인원에서 빼고 계산하세요.',
          },
          {
            q: '축의금은 홀수로 내야 하나요?',
            a: '예로부터 홀수를 길한 수로 보아 3·5·7만원처럼 홀수로 내는 관행이 있습니다. 10만원처럼 10으로 떨어지는 금액은 예외로 통용됩니다. 4만원은 숫자 4를 꺼리는 정서 때문에, 8만원은 어중간해서 잘 쓰지 않습니다. 다만 요즘은 크게 따지지 않는 분위기이고 금액 자체가 더 중요합니다.',
          },
          {
            q: '내가 받은 만큼 돌려줘야 하나요?',
            a: '상대가 내 결혼식에 낸 금액이 있다면 그 금액을 기준으로 삼는 것이 가장 무난합니다. 다만 그 사이 물가가 올랐다면 같은 금액이 실질적으로는 적어진 셈이라, 몇 년이 지났다면 한 단계 올리는 경우도 많습니다. 기록을 남겨두면 이런 판단이 쉬워집니다.',
          },
        ]}
      />

      <GiftMoneyCalc />

      <SeoSection title="축의금에는 정답이 없습니다">
        <p>
          먼저 분명히 해둘 것이 있습니다. 축의금에는 <strong>법으로 정해진 기준도, 공식도 없습니다.</strong>
          &ldquo;적정 금액은 얼마&rdquo;라고 단정하는 글이 많지만 그 숫자의 출처를 밝히는 경우는 드뭅니다.
        </p>
        <p>
          그래서 이 계산기는 금액 하나를 내놓지 않고, 판단에 쓸 수 있는 <strong>근거 두 가지</strong>를 보여줍니다.
          하나는 참석했을 때의 하한선인 <strong>식대</strong>, 다른 하나는 같은 관계에서 사람들이 실제로
          얼마를 내는지에 대한 <strong>설문 분포</strong>입니다. 최종 금액은 두 사람의 관계와 본인 형편을 보고
          직접 정하시면 됩니다.
        </p>
      </SeoSection>

      <SeoSection title="기준선은 식대입니다">
        <p>
          참석해서 식사까지 한다면, <strong>식대보다 적게 내는 순간 축하를 받는 쪽이 적자</strong>가 됩니다.
          그래서 &ldquo;얼마가 적당한가&rdquo;라는 질문은 사실 &ldquo;그 예식장 식대가 얼마인가&rdquo;로 바꿔 묻는 편이 빠릅니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">구분</th>
                <th className="text-right p-2 font-bold">1인당 식대</th>
                <th className="text-right p-2 font-bold">2명이 가면</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[var(--line)]">
                <td className="p-2">서울 강남권</td>
                <td className="p-2 text-right font-bold">85,000원</td>
                <td className="p-2 text-right">170,000원</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2">전국 중간값</td>
                <td className="p-2 text-right font-bold">59,000원</td>
                <td className="p-2 text-right">118,000원</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2">경상권</td>
                <td className="p-2 text-right font-bold">44,000원</td>
                <td className="p-2 text-right">88,000원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--sub)]">
          한국소비자원 참가격 결혼서비스 가격조사 기준. 같은 전국 조사에서 예식장 대관료 중간값은 350만원,
          최소 보증인원은 200명이었습니다.
        </p>
        <p>
          이 표를 보면 &ldquo;5만원이면 충분한가&rdquo;라는 질문의 답이 <strong>지역에 따라 갈린다</strong>는 것이 드러납니다.
          경상권 예식장이라면 5만원으로 식대를 넘지만, 강남에서 둘이 가면 17만원이 식대입니다.
          전국 평균으로도 혼자 가서 5만원을 내면 9,000원이 모자랍니다.
        </p>
      </SeoSection>

      <SeoSection title="직장 동료는 10만원이 기준이 됐습니다">
        <p>
          축의금 중에서 가장 자주 마주치면서도 가장 애매한 것이 직장 동료입니다.
          여기는 비교적 최근 설문이 있습니다.
        </p>
        <SeoList>
          <li><strong>10만원 — 61.8%</strong> 로 1위</li>
          <li><strong>5만원 — 32.8%</strong></li>
          <li>5만원 미만 3.2%, 15만원 1.4%</li>
          <li>사적으로 친한 동료도 10만원(59.7%), 일로만 엮인 동료도 10만원(60.1%)으로 차이가 작았습니다</li>
        </SeoList>
        <p className="text-xs text-[var(--sub)]">
          인크루트 「2025년 직장 동료 결혼 축의금」 설문 · 2025년 5월 · 직장인 844명
        </p>
        <p>
          눈에 띄는 건 <strong>2년 사이의 변화</strong>입니다. 2023년 같은 조사에서는 덜 친한 동료의 적정
          축의금으로 5만원이 65.1%를 차지해 1위였습니다. 그런데 2025년에는 같은 관계에서도 10만원이
          1위가 됐습니다. 식대가 오르면서 5만원으로는 식대를 못 맞추게 된 것이 큰 이유로 보입니다.
        </p>
        <p>
          반대로 말하면 <strong>친밀도보다 참석 여부와 식대가 금액을 더 좌우한다</strong>는 뜻이기도 합니다.
          친한 동료와 일로만 엮인 동료의 응답 차이가 0.4%p에 불과했으니까요.
        </p>
      </SeoSection>

      <SeoSection title="친구·친척은 설문이 없습니다">
        <p>
          솔직하게 말씀드리면, 친구나 친척 구간은 직장 동료만큼 신뢰할 만한 설문을 찾지 못했습니다.
          이 계산기에서 해당 관계를 고르면 <strong>&lsquo;통용 관행 기반&rsquo;</strong>이라고 표시되는 이유입니다.
          설문 결과처럼 보이게 포장하지 않으려고 구분해 두었습니다.
        </p>
        <p>
          특히 친척은 <strong>집안마다 정해진 기준이 있는 경우</strong>가 많습니다.
          사촌 결혼식에 얼마를 내는지는 인터넷 평균보다 부모님께 여쭤보는 쪽이 훨씬 정확합니다.
          형제자매는 사실상 집안 사정에 따라 결정되는 영역이라 범위를 참고로만 보세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="자주 묻는 질문"
        items={[
          {
            q: '부조금과 축의금은 다른 건가요?',
            a: '부조는 경사와 조사를 아울러 돕는다는 뜻이고, 결혼처럼 경사에 내는 돈을 축의금, 장례에 내는 돈을 조의금(부의금)이라고 구분해 부릅니다. 일상에서는 부조금을 둘 다 가리키는 말로 쓰기도 합니다. 금액 기준은 서로 다르니 장례의 경우 이 계산기를 그대로 적용하지는 마세요.',
          },
          {
            q: '계좌이체로 보내도 되나요?',
            a: '참석하지 못할 때는 계좌이체가 일반적입니다. 보낼 때 이름만 찍히면 누군지 모를 수 있으니 축하 메시지를 함께 보내는 편이 좋습니다. 참석한다면 봉투로 전달하는 것이 아직은 보편적입니다. 봉투 앞면에는 축결혼·축화혼 같은 문구를, 뒷면 왼쪽 아래에 이름을 적습니다.',
          },
          {
            q: '청첩장을 받았는데 갈지 말지 애매해요.',
            a: '금액보다 연락이 먼저입니다. 참석 여부를 미리 알려주는 것 자체가 도움이 됩니다. 예식장은 최소 보증인원 단위로 식대를 내기 때문에, 온다고 하고 안 오면 그 자리 식대가 그대로 비용이 됩니다. 한국소비자원 조사에서 최소 보증인원 중간값이 200명이었습니다.',
          },
          {
            q: '회사에서 단체로 걷는 경우는요?',
            a: '부서나 팀 단위로 모아서 내는 경우에는 개인이 따로 낼 필요가 없는 것이 보통입니다. 다만 친분이 있어 따로 더 내고 싶다면 단체 축의와 별개로 전달해도 됩니다. 회사마다 관행이 다르니 먼저 확인하는 편이 안전합니다.',
          },
          {
            q: '예전에 받은 금액을 모르겠어요.',
            a: '기억나지 않는다면 지금 기준으로 관계에 맞춰 내는 수밖에 없습니다. 앞으로를 위해서는 받은 축의금 명단을 남겨두시길 권합니다. 몇 년 뒤 돌려줄 때 기준이 되고, 물가 상승분을 얼마나 반영할지 판단하기도 쉬워집니다.',
          },
        ]}
      />

      <SeoSection title="함께 보면 좋은 계산기">
        <p>
          여러 명이 나눠 내야 한다면 <SeoLink href="/daily/dutch">더치페이 계산기</SeoLink>나
          <SeoLink href="/daily/tip-split"> 모임 정산 계산기</SeoLink>가 편합니다.
          결혼 준비 자금을 모으는 중이라면 <SeoLink href="/savings/interest">적금 이자 계산기</SeoLink>와
          <SeoLink href="/savings/doyak"> 청년도약계좌 계산기</SeoLink>를 확인해 보세요.
          신혼집을 알아보고 있다면 <SeoLink href="/realestate/convert">전월세 전환 계산기</SeoLink>와
          <SeoLink href="/loan/dsr"> DSR 계산기</SeoLink>가 도움이 됩니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
