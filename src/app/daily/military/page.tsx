import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import MilitaryCalc from "./MilitaryCalc";

export const metadata: Metadata = {
  title: "전역일 계산기 - 육군·해군·공군·해병대·사회복무 (2026)",
  description: "입대일만 입력하면 전역일과 남은 복무일수를 자동 계산. 육군 18개월, 해군 20개월, 공군 21개월, 해병대 18개월 기준.",
  alternates: { canonical: "https://moduncalc.com/daily/military" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="병무청 기준" title="전역일 계산기" description="입대일과 군별을 선택하면 전역일을 알려드려요.">
      <CalculatorJsonLd name="전역일 계산기" description="입대일만 입력하면 전역일과 남은 복무일수를 자동 계산. 군별 복무기간 반영." url="https://moduncalc.com/daily/military" />
      <FaqJsonLd items={[{q:"전역일은 정확한가요?",a:"입대일 기준 군별 복무기간으로 계산합니다. 실제로는 훈련소 입소일 등에 따라 1~2일 차이가 날 수 있습니다."},{q:"복무 단축이 적용되나요?",a:"현재 기준 복무기간으로 계산하며, 추가 단축 제도는 별도 반영하지 않습니다."}]} />
      <MilitaryCalc />

      <SeoSection title="군별 복무기간 기준 (2026년)">
        <p>현행 병역법 기준 의무복무 기간은 다음과 같습니다.</p>
        <SeoList>
          <li><strong>육군 / 해병대</strong> — 18개월</li>
          <li><strong>해군</strong> — 20개월</li>
          <li><strong>공군</strong> — 21개월</li>
          <li><strong>사회복무요원</strong> — 21개월</li>
          <li><strong>의경 / 해양의무경찰</strong> — 18개월 (2023년 폐지, 기존 복무자 해당)</li>
        </SeoList>
        <p>
          전역일은 <strong>입대일 포함</strong>하여 복무기간을 계산한 날짜의 전날입니다.
          예를 들어 2026년 1월 2일 육군 입대 시, 18개월 후인 2027년 7월 1일이 전역일입니다.
        </p>
      </SeoSection>

      <SeoSection title="전역일 계산 방식">
        <SeoFormula>
          <div>전역일 = 입대일 + 복무개월 수 − 1일</div>
          <div>남은 일수 = 전역일 − 오늘 날짜</div>
          <div>복무 진행률 = (입대 후 경과일 ÷ 전체 복무일) × 100</div>
        </SeoFormula>
        <p>
          병무청 기준으로 복무기간은 <strong>월 단위</strong>로 계산합니다.
          1월 15일 입대에 18개월 복무면 7월 14일 전역이며,
          월말 입대(1월 31일)의 경우 해당 월에 31일이 없으면 그 달의 마지막 날로 계산합니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="전역일 계산, 이런 점도 궁금하실 거예요"
        items={[
          { q: '훈련소 입소일과 자대 배치일 중 어느 걸 넣어야 하나요?', a: '입대일(훈련소 입소일)을 넣으세요. 복무기간은 훈련소 입소일부터 시작됩니다. 자대 배치일은 복무기간에 영향을 주지 않습니다.' },
          { q: '휴가를 많이 쓰면 전역일이 밀리나요?', a: '정상 휴가(연가, 포상휴가 등)는 복무기간에 포함되므로 전역일에 영향이 없습니다. 다만 탈영이나 영창 등 복무이탈 기간은 복무기간에서 제외되어 전역일이 늦어질 수 있습니다.' },
          { q: '군 복무 중 복무기간이 변경되면 어떻게 되나요?', a: '복무기간 변경 법률이 시행되면 시행일 기준 복무 중인 장병에게도 적용됩니다. 과거 복무기간 단축 시에도 이미 복무 중인 병사들에게 소급 적용된 사례가 있습니다.' },
          { q: '말년 휴가(잔여 연가)는 전역일 전에 쓸 수 있나요?', a: '네, 전역 전 남은 연가를 몰아서 사용하는 것이 가능합니다. 부대 사정에 따라 다르지만, 보통 전역 2~4주 전부터 잔여 연가를 소진합니다. 실질적인 마지막 출근일은 전역일보다 앞당겨집니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          전역 후 취업까지 남은 날짜를 세려면 <SeoLink href="/daily/dday">D-day 계산기</SeoLink>가 편하고,
          첫 직장 연봉의 실수령액이 궁금하면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>를 확인해 보세요.
          만 나이 기준이 헷갈릴 때는 <SeoLink href="/daily/age">나이 계산기</SeoLink>를 이용하세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
