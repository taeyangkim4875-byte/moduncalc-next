import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import AirconCalc from "./AirconCalc";

export const metadata: Metadata = {
  title: "에어컨 전기요금 계산기 - 하루 몇 시간 틀면 얼마? (2026 여름)",
  description:
    "에어컨 하루 사용 시간과 소비전력으로 월 전기요금을 계산하세요. 2026년 여름 누진 완화 구간 반영. 인버터·정속형 비교.",
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
    </PageLayout>
  );
}
