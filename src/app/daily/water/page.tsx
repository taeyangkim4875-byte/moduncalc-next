import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import WaterCalc from "./WaterCalc";

export const metadata: Metadata = {
  title: "수도요금 계산기 - 2026 가정용 수도요금 자동 계산",
  description: "월 사용량으로 수도요금을 계산하세요. 상수도 + 하수도 + 물이용부담금 포함. 서울 기준 누진제 반영.",
  alternates: { canonical: "https://moduncalc.com/daily/water" },
  openGraph: {
    title: "수도요금 계산기 - 2026 가정용 수도요금 자동 계산",
    description: "월 사용량으로 수도요금을 계산하세요. 상수도 + 하수도 + 물이용부담금 포함. 서울 기준 누진제 반영.",
    url: "https://moduncalc.com/daily/water",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="생활" title="수도요금 계산기" description="월 사용량을 입력하면 상수도·하수도·물이용부담금을 자동 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '수도요금', href: '/daily/water' }]} />
      <CalculatorJsonLd name="수도요금 계산기" description="월 사용량으로 수도요금을 계산하세요. 상수도 + 하수도 + 물이용부담금 포함." url="https://moduncalc.com/daily/water" />
      <FaqJsonLd items={[{q:"수도요금은 지역마다 다른가요?",a:"네, 지방자치단체마다 상수도 및 하수도 요금 체계가 다릅니다. 이 계산기는 서울 기준이며, 지방은 5~20% 차이가 날 수 있습니다."},{q:"4인 가구 평균 수도 사용량은?",a:"4인 가구 기준 월 평균 약 18~22㎥ 정도 사용합니다. 1인당 약 5㎥ 수준입니다."}]} />
      <WaterCalc />

      <SeoSection title="수도요금의 구성">
        <p>수도요금은 단순히 물값만이 아닙니다. 고지서를 뜯어보면 크게 세 항목으로 나뉩니다.</p>
        <SeoList>
          <li><strong>상수도 요금</strong> — 정수장에서 깨끗한 물을 공급하는 비용. 기본료 + 사용량 단가로 구성.</li>
          <li><strong>하수도 요금</strong> — 사용한 물을 하수처리장에서 정화하는 비용. 상수도 사용량과 동일하게 부과.</li>
          <li><strong>물이용부담금</strong> — 수원지 상류 지역의 수질 보전을 위해 부과되는 금액. ㎥당 약 170원.</li>
        </SeoList>
        <p>
          서울 기준 가정용 수도요금은 <strong>누진제</strong>가 적용됩니다.
          1~30㎥ 구간은 ㎥당 약 360원이지만, 51㎥을 넘으면 ㎥당 약 2,000원 이상으로 뛰어,
          사용량이 많을수록 단가가 급격히 올라갑니다.
        </p>
      </SeoSection>

      <SeoSection title="가구별 평균 수도 사용량">
        <SeoList>
          <li><strong>1인 가구</strong> — 월 5~7㎥ (수도요금 약 3,000~5,000원)</li>
          <li><strong>2인 가구</strong> — 월 10~14㎥ (수도요금 약 6,000~10,000원)</li>
          <li><strong>3인 가구</strong> — 월 14~18㎥ (수도요금 약 9,000~15,000원)</li>
          <li><strong>4인 가구</strong> — 월 18~22㎥ (수도요금 약 12,000~20,000원)</li>
        </SeoList>
        <p>
          평균보다 많이 나온다면 누수를 의심해 볼 수 있습니다.
          수도 계량기를 모든 수도꼭지를 잠근 상태에서 확인해,
          바늘이 돌아간다면 배관 누수일 가능성이 높습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="수도요금, 이런 점도 궁금하실 거예요"
        items={[
          { q: '수도요금 고지서의 사용량과 실제 사용량이 다른 이유는?', a: '수도 계량기는 2개월 단위로 검침하는 지역이 많습니다. 고지서 금액은 검침 기간 사용량을 월 단위로 환산한 금액이므로, 실제 사용 패턴과 차이가 있을 수 있습니다.' },
          { q: '수도요금을 줄이는 방법이 있나요?', a: '절수형 샤워헤드 교체(최대 40% 절감), 변기 절수 부속 설치, 세탁기 모아빨기가 효과적입니다. 양치질 시 컵 사용만으로도 월 1~2㎥을 절약할 수 있습니다.' },
          { q: '서울과 지방의 수도요금 차이가 큰가요?', a: '지자체마다 5~20% 정도 차이가 납니다. 대체로 대도시가 저렴한 편이고, 상수도 인프라가 부족한 지역은 단가가 높을 수 있습니다. 정확한 요금은 관할 수도사업소에서 확인하세요.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          전기요금이 궁금하면 <SeoLink href="/daily/electric">전기요금 계산기</SeoLink>,
          난방비가 걱정되면 <SeoLink href="/daily/gas">도시가스 요금 계산기</SeoLink>를 이용하세요.
          여름 에어컨 전기요금은 <SeoLink href="/daily/aircon">에어컨 전기요금 계산기</SeoLink>에서 따로 계산할 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
