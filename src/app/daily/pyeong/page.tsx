import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import PyeongCalc from "./PyeongCalc";

export const metadata: Metadata = {
  title: "평수 계산기 - 평↔㎡(제곱미터) 변환 · 부동산 면적 환산",
  description: "33평은 몇 제곱미터? 평↔㎡ 바로 변환. 아파트 전용면적·공급면적 차이도 설명.",
  alternates: { canonical: "https://moduncalc.com/daily/pyeong" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="부동산" title="평수 계산기" description="평수와 제곱미터(㎡)를 실시간으로 상호 변환합니다.">
      <CalculatorJsonLd name="평수 계산기" description="평수와 제곱미터(㎡)를 상호 변환합니다. 1평 = 3.3058㎡. 전용면적, 공급면적, 계약면적 차이도 설명." url="https://moduncalc.com/daily/pyeong" />
      <FaqJsonLd items={[{q:"전용면적과 공급면적의 차이는?",a:"전용면적은 실제 거주 공간이고, 공급면적은 전용면적에 복도·계단 등 주거공용면적을 더한 것입니다. 전용면적은 공급면적의 약 70~80%입니다."},{q:"1평은 몇 제곱미터인가요?",a:"1평은 정확히 3.3058㎡입니다. 간편하게 3.3㎡로 계산하기도 합니다."},{q:"24평 아파트의 실제 크기는?",a:"24평형은 공급면적 79㎡, 전용면적 약 59㎡입니다. 방 2~3개, 화장실 1~2개 규모입니다."}]} />
      <PyeongCalc />

      <SeoSection title="평과 제곱미터, 왜 두 단위를 함께 쓸까">
        <p>
          평(坪)은 법정 계량 단위가 아닙니다. 2007년 7월부터 부동산 거래와 광고에는
          <strong> 제곱미터(㎡)</strong> 표기가 의무화됐고, 평 단위만 쓰면 과태료 대상이 됩니다.
          그럼에도 현장에서는 여전히 &lsquo;24평&rsquo;, &lsquo;33평&rsquo; 같은 표현이 통용됩니다.
          한 평이 대략 성인 두 사람이 누울 수 있는 크기라 체감이 쉽기 때문입니다.
        </p>
        <SeoList>
          <li><strong>1평 = 3.3058㎡</strong> (정확히는 400/121㎡)</li>
          <li><strong>1㎡ = 0.3025평</strong></li>
          <li>흔히 쓰는 <strong>3.3</strong>은 근삿값이라, 큰 면적에서는 오차가 벌어집니다.</li>
        </SeoList>
        <p>
          주의할 점은 부동산에서 말하는 &lsquo;33평&rsquo;이 <strong>전용면적이 아니라 공급면적</strong> 기준이라는 것입니다.
          33평형 아파트의 실제 거주 공간은 전용 84㎡, 즉 약 25.4평입니다.
        </p>
      </SeoSection>

      <SeoSection title="전용·공급·계약면적의 차이와 전용률">
        <p>
          아파트 면적은 세 가지로 나뉩니다. 어느 기준으로 말하느냐에 따라
          같은 집이 25평이 되기도 하고 40평이 되기도 합니다.
        </p>
        <SeoFormula>
          <div>전용면적 = 현관문 안쪽의 실제 거주 공간 (방·거실·주방·화장실)</div>
          <div>공급면적 = 전용면적 + 주거공용면적 (계단·복도·엘리베이터)</div>
          <div>계약면적 = 공급면적 + 기타공용면적 (지하주차장·관리사무소·경로당)</div>
          <div>전용률(%) = 전용면적 ÷ 공급면적 × 100</div>
        </SeoFormula>
        <p>
          <strong>전용률</strong>이 같은 평형끼리 비교할 때 가장 중요한 지표입니다.
          일반적으로 계단식 아파트는 75~80%, 복도식은 70~75% 수준이고,
          오피스텔은 50~60%까지 떨어지기도 합니다.
          공급면적이 같은 33평형이라도 전용률이 5%p 차이 나면 실사용 공간이 약 1.5평 달라집니다.
        </p>
        <p>
          한편 <strong>발코니 확장 면적은 전용면적에 포함되지 않는</strong> 서비스 면적입니다.
          그래서 같은 전용 84㎡라도 확장 여부에 따라 체감 넓이가 크게 달라집니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="면적, 이런 점도 궁금하실 거예요"
        items={[
          { q: '국민주택 규모 85㎡는 왜 중요한가요?', a: '전용면적 85㎡(약 25.7평) 이하는 주택법상 국민주택 규모로 분류되어 세제 혜택이 붙습니다. 대표적으로 주택 취득 시 농어촌특별세 0.2%가 면제되고, 청약에서도 별도의 공급 물량과 가점 기준이 적용됩니다. 다만 수도권을 제외한 읍·면 지역은 100㎡ 이하까지 국민주택으로 봅니다.' },
          { q: '등기부등본의 면적과 분양 면적이 다른 이유는?', a: '등기부등본에 기재되는 것은 전용면적입니다. 분양 광고에서 말하는 평형은 공급면적 기준이라 항상 더 크게 표시됩니다. 계약 전에는 반드시 건축물대장이나 등기부등본에서 전용면적을 직접 확인하고, 공급면적과 나란히 놓고 전용률을 계산해 보세요.' },
          { q: '오피스텔은 왜 같은 평수인데 좁게 느껴지나요?', a: '오피스텔은 업무시설로 분류되어 계약면적 기준으로 분양하는 경우가 많습니다. 지하주차장과 기타공용면적까지 포함된 숫자라 전용률이 아파트보다 훨씬 낮게 나옵니다. 같은 33평이라도 아파트는 전용 84㎡, 오피스텔은 전용 50~60㎡에 그치는 일이 흔합니다.' },
          { q: '토지 면적에도 평을 쓰나요?', a: '네, 토지는 여전히 평 단위 거래 관행이 강합니다. 다만 공부상 표기는 ㎡이며, 넓은 토지에는 정보(町步)나 헥타르(ha)도 쓰입니다. 1ha는 10,000㎡로 약 3,025평, 1정보는 약 3,000평입니다. 면적이 커질수록 3.3과 3.3058의 차이가 벌어지므로 정확한 환산이 중요합니다.' },
        ]}
      />

      <SeoSection title="집을 구할 때 함께 계산해 보세요">
        <p>
          평형을 정했다면 다음은 비용입니다. 매수라면{' '}
          <SeoLink href="/realestate/acqtax">취득세 계산기</SeoLink>에서
          전용 85㎡ 초과 여부에 따른 농특세 차이까지 확인할 수 있고,{' '}
          <SeoLink href="/realestate/commission">복비 계산기</SeoLink>로 중개보수를 미리 잡아둘 수 있습니다.
          전월세를 비교 중이라면 <SeoLink href="/realestate/convert">전월세 전환율 계산기</SeoLink>와{' '}
          <SeoLink href="/guide/jeonse">전세 계약 완전 가이드</SeoLink>가 도움이 되고,
          대출 한도는 <SeoLink href="/loan/dsr">DSR 계산기</SeoLink>에서 확인하세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
