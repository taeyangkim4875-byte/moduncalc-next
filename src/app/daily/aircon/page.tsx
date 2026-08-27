import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import AirconCalc from "./AirconCalc";

export const metadata: Metadata = {
  title: "에어컨 전기요금 계산기 - 하루 몇 시간 틀면 얼마? (2026 여름)",
  description:
    "에어컨 하루 8시간 틀면 전기세 얼마? 인버터·정속형 비교, 여름 누진 완화 반영. 사용시간별 요금표까지.",
  alternates: { canonical: "https://moduncalc.com/daily/aircon" },
  openGraph: {
    title: "에어컨 전기요금 계산기 - 2026 여름 누진 완화 반영",
    description:
      "에어컨 하루 사용 시간과 소비전력으로 월 전기요금을 계산하세요. 인버터·정속형 비교, 여름 누진 완화 구간 반영.",
    url: "https://moduncalc.com/daily/aircon",
    type: "website",
    siteName: "모든 계산기",
  },
  keywords: [
    "에어컨 전기요금",
    "에어컨 전기세",
    "에어컨 전기요금 계산기",
    "여름 전기요금",
    "누진제",
    "인버터 에어컨",
    "2026 여름 전기요금",
  ],
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="2026 여름 전기요금 기준"
      title="에어컨 전기요금 계산기"
      description="에어컨 사용 시간과 소비전력을 입력하면 월 추가 전기요금을 바로 계산해 드려요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '에어컨 전기요금', href: '/daily/aircon' }]} />
      <CalculatorJsonLd
        name="에어컨 전기요금 계산기"
        description="에어컨 하루 사용 시간과 소비전력으로 월 전기요금을 계산합니다. 2026년 여름 누진 완화 구간 반영, 인버터·정속형 비교."
        url="https://moduncalc.com/daily/aircon"
      />
      <FaqJsonLd
        items={[
          {
            q: "에어컨 하루 10시간 틀면 전기요금이 얼마나 나오나요?",
            a: "인버터형 에어컨(800W 표기) 기준, 하루 10시간 사용 시 월 약 120kWh가 추가됩니다. 기존 사용량 200kWh에 더하면 총 320kWh로, 하계 기준 약 4만~5만원 수준의 전기요금이 예상됩니다.",
          },
          {
            q: "인버터 에어컨이 정말 전기세 절약이 되나요?",
            a: "네. 인버터 에어컨은 설정 온도에 도달하면 컴프레서 속도를 줄여 실제 소비전력이 표기의 40~60% 수준입니다. 같은 냉방 능력의 정속형 대비 전기요금이 30~50% 절약됩니다.",
          },
          {
            q: "여름 누진 완화는 자동으로 적용되나요?",
            a: "네. 7~8월 사용분(8~9월 청구)에 자동 적용됩니다. 별도 신청이 필요 없으며, 1구간이 200kWh에서 300kWh로, 2구간이 400kWh에서 450kWh로 확대됩니다.",
          },
          {
            q: "제습 모드가 냉방보다 전기세가 절약되나요?",
            a: "제습 모드는 컴프레서를 간헐적으로 가동하므로 냉방 모드 대비 30~40% 전력을 절약할 수 있습니다. 습도가 높고 온도가 크게 높지 않은 날에는 제습 모드가 효과적입니다.",
          },
        ]}
      />
      <AirconCalc />

      <SeoSection title="에어컨 전기세, 생각보다 덜 나올 수 있습니다">
        <p>
          솔직히 여름마다 &quot;에어컨 틀면 전기세 폭탄&quot;이라는 말에 겁먹고 더위 참는 분들 많죠.
          근데 요즘 인버터 에어컨 기준으로 계산하면, <strong>하루 8시간 돌려도 월 2~3만원 추가</strong>되는 수준입니다.
        </p>
        <SeoFormula>
          <div>월 추가 전기요금 = 소비전력(kW) × 가동률 × 하루 사용시간 × 30일 × kWh당 단가</div>
          <div>인버터형 가동률: 약 40~60% (정속형은 100%)</div>
        </SeoFormula>
        <p>
          핵심은 <strong>가동률</strong>입니다. 인버터 에어컨은 설정 온도에 도달하면 컴프레서가 천천히 돌아서,
          실제 전력 소비가 표기 전력의 절반도 안 됩니다. 선풍기 끼고 참는 것보다 인버터 에어컨 하나 트는 게 건강에도 지갑에도 나을 수 있어요.
        </p>
      </SeoSection>

      <SeoSection title="여름 전기요금 아끼는 진짜 꿀팁">
        <SeoList>
          <li><strong>26도 설정 + 선풍기 병행</strong> — 24도와 26도의 전기요금 차이가 월 1만원 이상입니다</li>
          <li><strong>에어컨 필터 2주마다 청소</strong> — 필터 막히면 같은 냉방에 전력 15~20% 더 씀</li>
          <li><strong>자주 끄지 말 것</strong> — 인버터 에어컨은 켜놓는 게 오히려 절전. 30분 이내 외출이면 끄지 마세요</li>
          <li><strong>7~8월 누진 완화 활용</strong> — 1구간이 300kWh까지 올라가서, 일반 가정은 누진 걱정 거의 없음</li>
        </SeoList>
        <p>
          전체 전기요금이 궁금하면 <SeoLink href="/daily/electric">전기요금 계산기</SeoLink>에서 기본사용량까지 포함해서 확인하세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="에어컨 전기요금, 이것도 궁금하시죠?"
        items={[
          { q: '에어컨 소비전력은 어디서 확인하나요?', a: '에어컨 본체 옆면이나 아래쪽 스티커에 "소비전력" 또는 "정격소비전력"이 W(와트) 단위로 적혀 있습니다. 보통 인버터형은 600~1,200W, 정속형은 1,000~2,000W 정도입니다.' },
          { q: '에어컨 1등급과 3등급 전기세 차이가 크나요?', a: '같은 냉방 능력 기준으로 1등급이 3등급보다 연간 약 3~5만원 절약됩니다. 10년 쓰면 30~50만원 차이이니 구매 시 참고하세요.' },
          { q: '창문형 에어컨도 이 계산기로 계산 가능한가요?', a: '네. 창문형은 대부분 정속형이라 가동률 100%로 계산하시면 됩니다. 소비전력은 보통 900~1,200W 수준입니다.' },
        ]}
      />
    </PageLayout>
  );
}
