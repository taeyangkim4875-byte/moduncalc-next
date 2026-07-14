import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import RandomPicker from "./RandomPicker";

export const metadata: Metadata = {
  title: "랜덤 번호 뽑기 - 숫자 추첨 · 로또 번호 생성기",
  description: "랜덤 숫자 추첨, 로또 번호 생성, 순서 섞기. 제비뽑기, 당첨자 추첨, 팀 나누기에 활용.",
  alternates: { canonical: "https://moduncalc.com/daily/random" },
  openGraph: {
    title: "랜덤 번호 뽑기 - 숫자 추첨 · 로또 번호 생성기",
    description: "랜덤 숫자 추첨, 로또 번호 생성, 순서 섞기. 제비뽑기, 당첨자 추첨, 팀 나누기에 활용.",
    url: "https://moduncalc.com/daily/random",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="일상 도구" title="랜덤 번호 뽑기" description="숫자 추첨, 로또 번호 생성, 목록 섞기를 한번에.">
      <CalculatorJsonLd name="랜덤 번호 뽑기" description="랜덤 숫자 추첨, 로또 번호 생성, 순서 섞기. 제비뽑기, 당첨자 추첨, 팀 나누기에 활용." url="https://moduncalc.com/daily/random" />
      <FaqJsonLd items={[
        {q:"랜덤 추첨은 공정한가요?",a:"이 생성기는 crypto.getRandomValues()를 사용하여 암호학적으로 안전한 난수를 생성합니다. 모든 숫자가 동일한 확률로 선택되므로 공정한 추첨이 가능합니다."},
        {q:"로또 당첨 확률은 얼마인가요?",a:"로또 6/45의 1등 당첨 확률은 1/8,145,060(약 814만분의 1)입니다. 매주 1장씩 구매하면 평균 15만 6천 년에 한 번 당첨됩니다."},
        {q:"목록 섞기는 어떤 알고리즘을 사용하나요?",a:"Fisher-Yates 셔플 알고리즘을 사용합니다. 모든 순열이 동일한 확률로 나타나는 편향 없는 셔플 방법입니다."},
      ]} />
      <RandomPicker />
    </PageLayout>
  );
}
