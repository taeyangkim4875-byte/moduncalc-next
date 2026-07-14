import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import RegistrationCalc from "./RegistrationCalc";

export const metadata: Metadata = {
  title: "등기비용 계산기 - 취득세·인지세·법무사비 포함 총비용 (2026)",
  description: "부동산 매매 시 등기에 필요한 총비용을 계산. 취득세, 지방교육세, 인지세, 증지대, 법무사비 포함.",
  alternates: { canonical: "https://moduncalc.com/realestate/registration" },
  openGraph: {
    title: "등기비용 계산기 - 취득세·인지세·법무사비 포함 총비용 (2026)",
    description: "부동산 매매 시 등기에 필요한 총비용을 계산. 취득세, 지방교육세, 인지세, 증지대, 법무사비 포함.",
    url: "https://moduncalc.com/realestate/registration",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="부동산" title="등기비용 계산기" description="매매가·전용면적·주택수를 입력하면 취득세부터 법무사비까지 총 등기비용을 계산합니다.">
      <CalculatorJsonLd name="등기비용 계산기" description="부동산 매매 시 등기에 필요한 총비용을 계산. 취득세, 지방교육세, 인지세, 증지대, 법무사비 포함." url="https://moduncalc.com/realestate/registration" />
      <FaqJsonLd items={[
        { q: "등기비용에는 어떤 항목이 포함되나요?", a: "취득세, 지방교육세, 농어촌특별세, 인지세, 증지대, 법무사 수수료가 포함됩니다. 매매가와 주택 수에 따라 세율이 달라집니다." },
        { q: "셀프등기와 법무사 등기의 차이는 무엇인가요?", a: "셀프등기는 법무사비(50~80만원)를 절약할 수 있지만, 서류 준비와 등기소 방문을 직접 해야 합니다. 실수 시 보정 절차가 필요하므로 첫 등기는 법무사를 추천합니다." },
        { q: "취득세 감면 혜택이 있나요?", a: "생애 첫 주택 구입 시 취득세 감면(200만원 한도), 신혼부부 감면, 다자녀 감면 등이 있습니다. 지자체별 추가 감면도 확인하세요." },
      ]} />
      <RegistrationCalc />
    </PageLayout>
  );
}
