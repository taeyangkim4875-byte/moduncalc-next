import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import FuelCalc from "./FuelCalc";

export const metadata: Metadata = {
  title: "자동차 연비 계산기 - 연비 측정 · 유류비 · 전기차 전비 비교 (2026)",
  description: "주행 거리와 주유량으로 실제 연비(km/L)를 측정하고 유류비를 계산. 전기차 전비(km/kWh) 충전비 계산, 내연차 vs 전기차 비용 비교까지.",
  alternates: { canonical: "https://moduncalc.com/daily/fuel" },
  openGraph: {
    title: "자동차 연비 계산기 - 연비·유류비·전기차 전비 비교 (2026)",
    description: "내연차 연비 측정, 유류비 계산, 전기차 전비·충전비 계산. 내연차 vs 전기차 연간 비용 비교까지.",
    url: "https://moduncalc.com/daily/fuel",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="자동차 · 전기차 전비 포함" title="자동차 연비 · 전비 계산기" description="내연차 연비 + 전기차 전비 + 비용 비교까지 한번에.">
      <CalculatorJsonLd name="자동차 연비·전비 계산기" description="내연차 연비(km/L) 측정, 유류비 계산, 전기차 전비(km/kWh) 충전비 계산, 내연차 vs 전기차 비용 비교." url="https://moduncalc.com/daily/fuel" />
      <FaqJsonLd items={[
        {q:"자동차 연비는 어떻게 계산하나요?",a:"연비(km/L) = 주행 거리(km) ÷ 사용 연료(L)입니다. 주유 후 트립미터를 0으로 초기화하고, 다음 주유 시 주행거리와 주유량을 기록하면 실제 연비를 측정할 수 있습니다."},
        {q:"실제 연비가 공인연비보다 낮은 이유는?",a:"공인연비는 표준 시험실 조건에서 측정됩니다. 실제 도로에서는 에어컨, 급가속, 도심 정체, 오르막길 등으로 공인연비의 70~85% 수준이 나옵니다."},
        {q:"연비를 높이는 방법은?",a:"경제속도(60~80km/h) 유지, 급가속·급제동 자제, 타이어 공기압 적정 유지(월 1회 점검), 불필요한 짐 줄이기, 에어컨 적정 사용이 효과적입니다. 이것만으로 연비가 10~20% 개선됩니다."},
        {q:"서울에서 부산까지 유류비는 얼마인가요?",a:"서울-부산 약 400km 기준, 연비 12km/L 차량에 리터당 1,650원이면 약 55,000원입니다. 고속도로 통행료(약 25,000원)는 별도입니다."},
        {q:"전기차 전비는 어떻게 계산하나요?",a:"전비(km/kWh) = 주행 거리 ÷ 사용 전력량입니다. 아이오닉5 기준 복합 전비 약 5.5~6.0km/kWh이며, 완속 충전(350원/kWh) 기준 100km당 약 6,000원입니다."},
        {q:"내연차와 전기차 연료비 차이는?",a:"월 1,500km 주행 기준 내연차는 약 20만원, 전기차는 약 9.5만원으로 월 약 11만원, 연간 약 130만원 절약됩니다."},
      ]} />
      <FuelCalc />
    </PageLayout>
  );
}
