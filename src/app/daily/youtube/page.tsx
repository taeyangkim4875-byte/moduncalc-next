import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import YouTubeCalc from "./YouTubeCalc";

export const metadata: Metadata = {
  title: "유튜브 수익 계산기 - 조회수별 예상 수익",
  description: "유튜브 조회수와 CPM으로 예상 광고 수익을 계산하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/youtube" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="크리에이터 수익"
      title="유튜브 수익 계산기"
      description="조회수와 CPM으로 유튜브 예상 광고 수익을 시뮬레이션하세요."
    >
      <CalculatorJsonLd name="유튜브 수익 계산기" description="유튜브 조회수와 CPM으로 예상 광고 수익을 계산하세요." url="https://moduncalc.com/daily/youtube" />
      <FaqJsonLd items={[
        { q: "유튜브 수익은 언제 지급되나요?", a: "매월 21~26일 사이에 애드센스를 통해 전월 수익이 지급됩니다. 최소 지급 기준액은 100달러입니다." },
        { q: "조회수 100만 회면 얼마를 벌 수 있나요?", a: "CPM 3,000원, 광고 노출 50% 기준으로 약 150만원입니다. 하지만 채널 주제와 시청자층에 따라 크게 달라집니다." },
        { q: "쇼츠도 수익이 발생하나요?", a: "네, 2023년부터 쇼츠에도 광고 수익이 배분됩니다. 다만 일반 영상보다 CPM이 낮은 편입니다." },
      ]} />
      <YouTubeCalc />
    </PageLayout>
  );
}
