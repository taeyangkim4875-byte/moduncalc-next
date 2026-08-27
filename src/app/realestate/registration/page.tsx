import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
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
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '부동산', href: '/realestate' }, { name: '등기비용', href: '/realestate/registration' }]} />
      <CalculatorJsonLd name="등기비용 계산기" description="부동산 매매 시 등기에 필요한 총비용을 계산. 취득세, 지방교육세, 인지세, 증지대, 법무사비 포함." url="https://moduncalc.com/realestate/registration" />
      <FaqJsonLd items={[
        { q: "등기비용에는 어떤 항목이 포함되나요?", a: "취득세, 지방교육세, 농어촌특별세, 인지세, 증지대, 법무사 수수료가 포함됩니다. 매매가와 주택 수에 따라 세율이 달라집니다." },
        { q: "셀프등기와 법무사 등기의 차이는 무엇인가요?", a: "셀프등기는 법무사비(50~80만원)를 절약할 수 있지만, 서류 준비와 등기소 방문을 직접 해야 합니다. 실수 시 보정 절차가 필요하므로 첫 등기는 법무사를 추천합니다." },
        { q: "취득세 감면 혜택이 있나요?", a: "생애 첫 주택 구입 시 취득세 감면(200만원 한도), 신혼부부 감면, 다자녀 감면 등이 있습니다. 지자체별 추가 감면도 확인하세요." },
      ]} />
      <RegistrationCalc />

      <SeoSection title="등기비용, 예상보다 많이 나와서 당황했던 경험">
        <p>
          첫 집 살 때 매매가만 생각하고 잔금일에 등기비용 청구서 받고 깜짝 놀랐습니다.
          아파트 3억짜리 사면서 등기비용만 500만원 가까이 나왔거든요.
          취득세가 제일 큰데, 6억 이하 1주택은 1.1%(취득세 1% + 지방교육세 0.1%)로 그나마 낮은 편이에요.
        </p>
        <p>
          인지세는 잘 모르는 분이 많은데, 매매가 1억 초과~10억 이하면 15만원, 10억 초과면 35만원입니다.
          법무사 비용은 매매가에 따라 50~80만원 선인데, 셀프등기를 하면 이 부분을 아낄 수 있어요.
          다만 첫 등기에서 서류를 잘못 작성하면 보정에 시간이 더 걸리니까 신중하게 판단하세요.
        </p>
        <p>
          생애 첫 주택이면 취득세 감면(200만원 한도)을 꼭 챙기세요.
          1.5억 이하는 취득세 면제, 1.5~3억은 50% 감면이라 수십에서 수백만원 차이가 납니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="등기비용 실전 Q&A"
        items={[
          { q: '셀프등기 하면 실제로 얼마나 절약되나요?', a: '법무사 수수료 50~80만원을 아낄 수 있습니다. 인터넷등기소에서 서류를 작성하고, 등기소에 직접 방문 제출하면 돼요. 단, 대출이 있으면 은행 측 법무사와 별도 협의가 필요합니다.' },
          { q: '다주택자 취득세는 얼마나 높아지나요?', a: '2주택은 8%, 3주택 이상은 12%입니다. 조정대상지역 여부에 따라 달라질 수 있으니 반드시 매매 전에 확인하세요. 5억짜리 3주택이면 취득세만 6,000만원입니다.' },
          { q: '등기비용을 대출로 충당할 수 있나요?', a: '주택담보대출 한도에는 등기비용이 포함되지 않습니다. 잔금 외에 등기비용은 별도 현금으로 준비해야 해요. 매매 계약 전에 총 필요 자금을 미리 계산해두는 게 중요합니다.' },
        ]}
      />
    </PageLayout>
  );
}
