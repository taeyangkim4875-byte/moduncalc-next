import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import GasCalc from "./GasCalc";

export const metadata: Metadata = {
  title: "도시가스 요금 계산기 - 난방비·가스비 자동 계산 (2026)",
  description: "월 도시가스 사용량으로 가스요금을 계산하세요. 난방용·취사용 구분, MJ 기준 요금 자동 계산. 겨울 난방비 미리 확인.",
  alternates: { canonical: "https://moduncalc.com/daily/gas" },
  openGraph: {
    title: "도시가스 요금 계산기 - 난방비·가스비 자동 계산 (2026)",
    description: "월 도시가스 사용량으로 가스요금을 계산하세요. 난방용·취사용 구분, MJ 기준 요금 자동 계산. 겨울 난방비 미리 확인.",
    url: "https://moduncalc.com/daily/gas",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="생활" title="도시가스 요금 계산기" description="월 사용량을 입력하면 난방비·가스비를 자동 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '가스요금', href: '/daily/gas' }]} />
      <CalculatorJsonLd name="도시가스 요금 계산기" description="월 도시가스 사용량으로 가스요금을 계산하세요. 난방용·취사용 구분, MJ 기준 요금 자동 계산." url="https://moduncalc.com/daily/gas" />
      <FaqJsonLd items={[{q:"열량환산계수란?",a:"가스 1㎥당 발생하는 열량(MJ)입니다. 지역·계절에 따라 42~44 MJ/㎥ 범위이며, 가스 고지서에서 확인할 수 있습니다."},{q:"난방용과 취사용 요금이 다른 이유는?",a:"용도별로 공급 원가와 기본료가 다르게 책정됩니다. 취사용이 소량 사용이지만 단가가 약간 높은 편입니다."}]} />
      <GasCalc />

      <SeoSection title="도시가스 요금 계산 구조">
        <p>도시가스 요금은 <strong>사용량(㎥)이 아니라 열량(MJ) 기준</strong>으로 부과됩니다.</p>
        <SeoFormula>
          <div>사용 열량(MJ) = 사용량(㎥) × 열량환산계수(MJ/㎥)</div>
          <div>가스요금 = 기본료 + 사용 열량 × 단가(원/MJ)</div>
          <div>최종 청구액 = 가스요금 + 부가세(10%)</div>
        </SeoFormula>
        <SeoList>
          <li><strong>열량환산계수</strong> — 지역·계절마다 다릅니다. 서울 기준 약 42~44 MJ/㎥.</li>
          <li><strong>기본료</strong> — 난방용과 취사용이 다르고, 사용량 구간에 따라 달라짐.</li>
          <li><strong>단가</strong> — 난방용 약 16~19원/MJ, 취사용 약 20원/MJ 수준.</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="계절별 평균 가스 사용량과 요금">
        <p>같은 가구라도 계절에 따라 가스 사용량은 5~10배 차이가 납니다.</p>
        <SeoList>
          <li><strong>여름 (6~9월)</strong> — 취사·온수만 사용. 월 3~8㎥, 약 3,000~8,000원.</li>
          <li><strong>봄·가을</strong> — 간헐적 난방. 월 15~30㎥, 약 15,000~35,000원.</li>
          <li><strong>겨울 (12~2월)</strong> — 본격 난방. 월 40~80㎥, 약 50,000~120,000원.</li>
        </SeoList>
        <p>
          겨울 난방비가 예상보다 많이 나오는 이유는 사용량 증가뿐 아니라
          <strong>열량환산계수가 겨울에 높아지는 경향</strong>이 있어서입니다.
          또한 보일러 배관 노후로 열효율이 떨어지면 요금이 더 올라갈 수 있습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="가스요금, 이런 점도 궁금하실 거예요"
        items={[
          { q: '난방비를 줄이는 효과적인 방법은?', a: '실내 적정 온도는 18~20°C로 설정하고, 외출 시에는 끄지 말고 외출 모드(10~15°C)로 두는 게 더 경제적입니다. 창문 단열 필름이나 문풍지를 붙이면 열 손실을 20~30% 줄일 수 있습니다.' },
          { q: '보일러 교체 시기는 언제인가요?', a: '일반적으로 10~15년이 교체 주기입니다. 10년 이상 된 보일러는 열효율이 70% 이하로 떨어질 수 있어, 콘덴싱 보일러로 교체하면 난방비를 15~25% 절감할 수 있습니다.' },
          { q: '가스 고지서의 MJ가 뭔가요?', a: '메가줄(MJ)은 열량 단위입니다. 가스요금은 부피(㎥)가 아닌 실제 발생 열량으로 부과됩니다. 같은 1㎥라도 가스 성분에 따라 열량이 달라지기 때문에, 열량환산계수를 곱해 표준화합니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          전기요금도 함께 확인하려면 <SeoLink href="/daily/electric">전기요금 계산기</SeoLink>,
          수도요금은 <SeoLink href="/daily/water">수도요금 계산기</SeoLink>를 이용하세요.
          에어컨 전기요금이 궁금하면 <SeoLink href="/daily/aircon">에어컨 전기요금 계산기</SeoLink>도 유용합니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
