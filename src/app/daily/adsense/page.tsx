import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import AdSenseCalc from "./AdSenseCalc";

export const metadata: Metadata = {
  title: "애드센스 수익 계산기 - 블로그 예상 수익 시뮬레이션",
  description: "일일 방문자 수와 페이지 RPM으로 블로그 애드센스 예상 수익을 계산하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/adsense" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="블로그 수익"
      title="애드센스 수익 계산기"
      description="일일 방문자 수와 RPM으로 블로그 예상 수익을 시뮬레이션하세요."
    >
      <CalculatorJsonLd name="애드센스 수익 계산기" description="일일 방문자 수와 페이지 RPM으로 블로그 애드센스 예상 수익을 계산하세요." url="https://moduncalc.com/daily/adsense" />
      <FaqJsonLd items={[
        { q: "RPM과 CPC 중 어떤 기준이 정확한가요?", a: "RPM은 전체적인 수익 효율을, CPC는 개별 클릭 수익을 나타냅니다. 두 지표를 함께 보면 더 정확한 예상이 가능합니다." },
        { q: "애드센스 수익은 언제 지급되나요?", a: "매월 21~26일 사이에 전월 수익이 지급됩니다. 최소 지급 기준액은 100달러(약 13만원)입니다." },
        { q: "블로그 초보도 애드센스 승인을 받을 수 있나요?", a: "양질의 원본 콘텐츠 20~30개 이상, 개인정보처리방침 페이지, 충분한 텍스트가 있으면 승인 가능성이 높습니다." },
      ]} />
      <AdSenseCalc />
    </PageLayout>
  );
}
