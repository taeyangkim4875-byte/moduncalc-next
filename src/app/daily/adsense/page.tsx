import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import AdSenseCalc from "./AdSenseCalc";

export const metadata: Metadata = {
  title: "애드센스 수익 계산기 - 블로그 예상 수익 시뮬레이션",
  description: "일일 방문자 수와 페이지 RPM, CTR, CPC로 블로그 애드센스 예상 수익을 시뮬레이션하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/adsense" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="블로그 수익" title="애드센스 수익 계산기" description="일일 방문자 수와 RPM으로 블로그 예상 수익을 시뮬레이션하세요.">
      <CalculatorJsonLd name="애드센스 수익 계산기" description="일일 방문자 수와 페이지 RPM으로 블로그 애드센스 예상 수익을 계산하세요." url="https://moduncalc.com/daily/adsense" />
      <FaqJsonLd items={[
        { q: "RPM과 CPC 중 어떤 기준이 정확한가요?", a: "RPM은 전체적인 수익 효율을, CPC는 개별 클릭 수익을 나타냅니다. 두 지표를 함께 보면 더 정확한 예상이 가능합니다." },
        { q: "애드센스 수익은 언제 지급되나요?", a: "매월 21~26일 사이에 전월 수익이 지급됩니다. 최소 지급 기준액은 100달러(약 13만원)입니다." },
      ]} />
      <AdSenseCalc />

      <SeoSection title="애드센스 수익 구조 이해하기">
        <p>구글 애드센스 수익은 크게 두 가지 방식으로 발생합니다.</p>
        <SeoFormula>
          <div>RPM 기준: 일일 수익 = 일일 페이지뷰 ÷ 1,000 × RPM</div>
          <div>CPC 기준: 일일 수익 = 일일 페이지뷰 × CTR × CPC</div>
          <div>월 수익 = 일일 수익 × 30</div>
        </SeoFormula>
        <SeoList>
          <li><strong>RPM (Revenue Per Mille)</strong> — 1,000 페이지뷰당 수익. 한국 블로그 평균 1,000~5,000원.</li>
          <li><strong>CTR (Click-Through Rate)</strong> — 광고 클릭률. 보통 1~3% 수준.</li>
          <li><strong>CPC (Cost Per Click)</strong> — 클릭당 수익. 한국 평균 200~800원.</li>
        </SeoList>
        <p>
          같은 방문자 수라도 <strong>주제(니치)에 따라 CPC가 크게 다릅니다</strong>.
          금융·보험·법률 관련 블로그는 CPC가 높고(500~2,000원),
          일상·취미 블로그는 상대적으로 낮은 편(100~300원)입니다.
        </p>
      </SeoSection>

      <SeoSection title="블로그 수익을 높이는 방법">
        <SeoList>
          <li><strong>고 CPC 키워드 공략</strong> — 대출, 보험, 부동산, 세금 등 금융 키워드가 CPC가 높습니다.</li>
          <li><strong>광고 배치 최적화</strong> — 본문 중간, 첫 번째 소제목 아래에 광고를 넣으면 CTR이 올라갑니다.</li>
          <li><strong>페이지뷰 늘리기</strong> — 내부 링크와 관련 글 추천으로 세션당 페이지뷰를 높이세요.</li>
          <li><strong>모바일 최적화</strong> — 방문자의 70% 이상이 모바일입니다. 모바일 광고 크기를 최적화하세요.</li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="애드센스 수익, 이런 점도 궁금하실 거예요"
        items={[
          { q: '애드센스 승인 기준은 어떻게 되나요?', a: '명확한 기준은 공개되지 않지만, 양질의 원본 콘텐츠 20~30개 이상, 개인정보처리방침·문의 페이지 구비, 충분한 텍스트 콘텐츠, 6개월 이상의 도메인 연령 등이 중요합니다. 자동 생성 콘텐츠나 복사 콘텐츠는 거절 사유가 됩니다.' },
          { q: '월 100만원 벌려면 방문자가 얼마나 필요한가요?', a: 'RPM 3,000원 기준으로 일일 약 11,000 페이지뷰, 월 33만 페이지뷰가 필요합니다. CPC가 높은 금융 주제라면 이보다 적은 방문자로도 가능하고, 일상 주제라면 더 많은 방문자가 필요합니다.' },
          { q: '애드센스 수익에 세금이 붙나요?', a: '네, 사업소득으로 종합소득세 신고 대상입니다. 연 수익이 적으면 세금이 거의 없지만, 연 2,400만원을 넘으면 부가세 신고도 필요합니다. 경비(호스팅비, 도메인비 등)를 공제할 수 있으니 증빙을 챙기세요.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          유튜브 수익이 궁금하면 <SeoLink href="/daily/youtube">유튜브 수익 계산기</SeoLink>,
          쿠팡 파트너스 수익은 <SeoLink href="/daily/coupang">쿠팡 파트너스 계산기</SeoLink>를 이용하세요.
          부업 소득의 종합소득세는 <SeoLink href="/tax/income">종합소득세 계산기</SeoLink>에서 확인할 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
