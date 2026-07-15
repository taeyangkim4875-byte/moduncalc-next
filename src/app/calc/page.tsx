import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SmartCalc from "./SmartCalc";

export const metadata: Metadata = {
  title: "스마트 계산기 - 공학용 계산기 · 수식 입력 · 삼각함수 (무료)",
  description: "cos, sin, sqrt, log 등 공학 함수를 텍스트로 입력하면 실시간으로 계산. 한국어 입력 지원. 버튼 계산기 + 수식 입력 모두 가능.",
  alternates: { canonical: "https://moduncalc.com/calc" },
  openGraph: {
    title: "스마트 계산기 - 무료 온라인 공학용 계산기",
    description: "삼각함수, 로그, 제곱근 등 공학 계산을 브라우저에서. 한국어 입력도 지원.",
    url: "https://moduncalc.com/calc",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="공학 · 일반 계산"
      title="스마트 계산기"
      description="수식을 입력하면 실시간으로 계산해 드려요. 한국어도 지원!"
    >
      <CalculatorJsonLd name="스마트 계산기" description="공학용 계산기. cos, sin, sqrt, log 등 수식을 텍스트로 입력하면 실시간 계산. 한국어 지원." url="https://moduncalc.com/calc" />
      <FaqJsonLd items={[
        {q:"어떤 함수를 지원하나요?",a:"삼각함수(sin, cos, tan), 제곱근(sqrt), 로그(log, ln), 절대값(abs), 반올림(round), 올림(ceil), 내림(floor), 거듭제곱(pow, ^), 원주율(π) 등을 지원합니다."},
        {q:"한국어로도 입력할 수 있나요?",a:"네, '루트 16', '코사인 45', '사인 30', '파이' 등 한국어로 입력하면 자동으로 수식으로 변환됩니다."},
        {q:"삼각함수는 도(degree) 기준인가요?",a:"네, 이 계산기는 도(degree) 기준입니다. cos(45)는 45도의 코사인 값을 계산합니다."},
      ]} />
      <SmartCalc />
    </PageLayout>
  );
}
