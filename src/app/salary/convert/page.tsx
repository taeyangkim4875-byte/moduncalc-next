import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import SalaryConverter from "./SalaryConverter";
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: "연봉 환산기 - 내 월급으로 ___까지 얼마나 일해야 할까?",
  description: "내 월급으로 아이폰 사려면 며칠? 테슬라는? 연봉 입력하면 물건별 근무 일수 바로 계산.",
  alternates: { canonical: "https://moduncalc.com/salary/convert" },
  openGraph: {
    title: "연봉 환산기 - 내 월급으로 ___까지 얼마나 일해야 할까?",
    description: "내 월급으로 아이폰 사려면 며칠? 테슬라는? 연봉 입력하면 물건별 근무 일수 바로 계산.",
    url: "https://moduncalc.com/salary/convert",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="연봉"
      title="연봉 환산기"
      description="내 연봉으로 각종 물건을 사려면 얼마나 일해야 할까?"
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }, { name: '연봉 환산기', href: '/salary/convert' }]} />
      <CalculatorJsonLd name="연봉 환산기" description="연봉을 입력하면 아이폰, 테슬라, 아파트 등을 사려면 며칠을 일해야 하는지 계산합니다." url="https://moduncalc.com/salary/convert" />
      <FaqJsonLd items={[{q:"세후 기준으로 볼 수 있나요?",a:"현재는 세전 기준입니다. 실수령액 기준으로 보려면 연봉 실수령액 계산기에서 실수령액을 확인한 후 그 금액을 입력하세요."},{q:"근무일 252일은 어떤 기준인가요?",a:"연 365일에서 주말 104일, 공휴일 약 15일을 제외한 평균 근무일수입니다."}]} />
      <SalaryConverter />
      <ShareButtons title="연봉 환산 결과" />

      <SeoSection title="내 월급으로 아이폰 사려면 며칠을 일해야 할까">
        <p>연봉 3,600만원이면 세후 월급이 약 260만원이에요. 하루 일당으로 환산하면 약 11.8만원입니다. 아이폰 16 Pro가 155만원이니까 약 13일을 일해야 살 수 있는 거죠. 테슬라 모델 3가 5,500만원이면? 약 466일, 거의 2년 치 월급입니다.</p>
        <p>사실 이렇게 환산해보면 소비 습관이 바뀌어요. 10만원짜리 옷이 하루 일당이라고 생각하면 좀 아깝잖아요. 반대로 연봉이 올라갈수록 같은 물건의 근무일수가 줄어드니까 동기 부여도 됩니다. 연봉 5,000만원이면 아이폰이 9.5일로 줄거든요.</p>
      </SeoSection>

      <SeoSection title="연봉별 체감 환산표 — 이걸 보면 소비 습관이 바뀝니다">
        <p>연봉 3,000만원, 4,000만원, 5,000만원 기준으로 세후 일당을 환산하면 이렇습니다. 세후는 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink> 기준이에요.</p>
        <SeoList>
          <li><strong>연봉 3,000만원</strong>(세후 일당 약 9.5만원) — 치킨 1마리(2만원) = 반나절, 스타벅스 아메리카노(4,500원) = 23분, 넷플릭스 1개월(17,000원) = 약 1시간 26분</li>
          <li><strong>연봉 4,000만원</strong>(세후 일당 약 12만원) — 아이폰 16 Pro(155만원) = 12.9일, 제주도 2박 여행(40만원) = 3.3일</li>
          <li><strong>연봉 5,000만원</strong>(세후 일당 약 14.5만원) — 아이폰 16 Pro = 10.7일, 테슬라 모델 3(5,500만원) = 379일, 서울 아파트 중위가격(9억) = 약 17년</li>
        </SeoList>
        <p>근데 세전이랑 세후 차이가 무시 못 할 수준이에요. 연봉 5,000만원 기준으로 세전 일당은 19.8만원인데 세후는 14.5만원이거든요. 세전으로 계산하면 &quot;나 이 정도면 금방 사겠네&quot; 싶지만, 세후로 보면 현실이 다릅니다. 그래서 이 환산기에 넣을 때 실수령액을 넣는 게 정확해요.</p>
      </SeoSection>

      <SeoFaq
        title="연봉 환산 관련 팁"
        items={[
          { q: '세후 기준으로 보는 게 맞지 않나요?', a: '맞습니다. 정확히 보려면 연봉 실수령액 계산기에서 세후 금액을 확인한 뒤 그 금액을 입력하세요. 세전 연봉 기준이면 실제보다 적게 일해야 하는 것처럼 보여요.' },
          { q: '시간당으로도 환산할 수 있나요?', a: '연봉을 2,016시간(252일 × 8시간)으로 나누면 됩니다. 연봉 4,000만원이면 시급 약 19,840원이에요.' },
          { q: '프리랜서는 어떻게 계산하나요?', a: '월 평균 수입을 12로 곱해서 연봉처럼 환산하면 됩니다. 다만 4대보험이나 퇴직금이 없으니 직장인 연봉과 단순 비교는 안 돼요.' },
          { q: '물건값이 변하면 근무일도 바뀌나요?', a: '당연히요. 2024년에 아이폰 15 Pro가 135만원이었는데 2025년 16 Pro가 155만원으로 올랐잖아요. 연봉이 그대로인데 물건값만 올라가면 일해야 하는 날이 늘어나는 거예요. 체감 구매력이 떨어지는 겁니다.' },
          { q: '커플이나 가족 단위로 환산도 되나요?', a: '맞벌이 부부라면 두 사람 연봉을 합쳐서 입력하면 가구 기준 환산이 됩니다. 서울 아파트 같은 큰 구매는 가구 소득 기준으로 보는 게 현실적이에요.' },
        ]}
      />
    </PageLayout>
  );
}
