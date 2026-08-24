import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import GpaCalc from "./GpaCalc";

export const metadata: Metadata = {
  title: "학점 계산기 - GPA 평점 계산 (4.5 만점)",
  description: "과목별 학점과 성적을 입력하면 4.5 만점 기준 평균 평점(GPA)을 자동 계산합니다. 전공/교양 구분 가능.",
  alternates: { canonical: "https://moduncalc.com/daily/gpa" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="4.5 만점 기준" title="학점 계산기" description="과목별 성적을 입력하면 평균 평점(GPA)을 바로 계산해 드려요.">
      <CalculatorJsonLd name="학점 계산기" description="과목별 학점과 성적을 입력하면 4.5 만점 기준 평균 평점을 자동 계산합니다." url="https://moduncalc.com/daily/gpa" />
      <FaqJsonLd items={[{q:"4.5 만점과 4.3 만점의 차이는?",a:"A+를 4.5로 보느냐 4.3으로 보느냐의 차이입니다. 대부분의 한국 대학은 4.5 만점제를 사용합니다."},{q:"재수강하면 성적이 어떻게 반영되나요?",a:"학교마다 다르지만, 대부분 새 성적으로 대체됩니다. 일부 학교는 평균 처리합니다."}]} />
      <GpaCalc />

      <SeoSection title="GPA 계산 공식">
        <p>평균 평점(GPA)은 <strong>과목별 학점 × 성적 점수의 합</strong>을 <strong>총 학점 수</strong>로 나눈 값입니다.</p>
        <SeoFormula>
          <div>GPA = Σ(과목 학점 × 성적 점수) ÷ Σ(과목 학점)</div>
          <div>예: 3학점 A+(4.5) + 2학점 B+(3.5) = (13.5+7) ÷ 5 = 4.1</div>
        </SeoFormula>
        <p>4.5 만점 기준 성적별 점수:</p>
        <SeoList>
          <li><strong>A+</strong> = 4.5 / <strong>A0</strong> = 4.0 / <strong>A-</strong> = 3.5</li>
          <li><strong>B+</strong> = 3.5 / <strong>B0</strong> = 3.0 / <strong>B-</strong> = 2.5</li>
          <li><strong>C+</strong> = 2.5 / <strong>C0</strong> = 2.0 / <strong>C-</strong> = 1.5</li>
          <li><strong>D+</strong> = 1.5 / <strong>D0</strong> = 1.0 / <strong>F</strong> = 0.0</li>
        </SeoList>
        <p>P/F(Pass/Fail) 과목은 평점 계산에서 제외됩니다.</p>
      </SeoSection>

      <SeoSection title="학점 관리가 중요한 이유">
        <SeoList>
          <li><strong>취업</strong> — 대기업 서류 전형에서 학점 커트라인이 있는 경우가 많습니다. 보통 3.0~3.5 이상.</li>
          <li><strong>대학원 진학</strong> — 국내 대학원은 3.0 이상, 해외는 3.3~3.5 이상을 요구하는 곳이 많습니다.</li>
          <li><strong>장학금</strong> — 성적 장학금은 보통 3.5~4.0 이상 기준입니다.</li>
          <li><strong>졸업 요건</strong> — 대부분 2.0 이상이며, 학과에 따라 더 높을 수 있습니다.</li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="학점 계산, 이런 점도 궁금하실 거예요"
        items={[
          { q: '재수강하면 원래 성적은 어떻게 되나요?', a: '대부분의 대학에서 재수강 시 새 성적으로 대체됩니다. 다만 성적표에 원래 성적이 남는 학교도 있고, 재수강 최고 성적을 A0으로 제한하는 곳도 있습니다. 학칙을 확인하세요.' },
          { q: '4.5 만점을 4.0 만점으로 환산하려면?', a: '정확한 공식은 없지만, 일반적으로 (4.5 만점 GPA ÷ 4.5) × 4.0으로 근사합니다. 예: 4.0/4.5 → 약 3.56/4.0. 해외 대학은 자체 환산표를 사용하므로 대학에 직접 문의하는 게 정확합니다.' },
          { q: '전공 평점과 전체 평점이 다른데 어떤 걸 써야 하나요?', a: '취업 지원 시 회사마다 기준이 다릅니다. 전공 평점만 요구하는 곳, 전체 평점을 보는 곳, 둘 다 기재하라는 곳이 있습니다. 일반적으로 전공 평점이 더 높으면 전공 평점을 강조하는 게 유리합니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          첫 직장 연봉의 실수령액이 궁금하면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>,
          비율 계산이 필요하면 <SeoLink href="/daily/percent">퍼센트 계산기</SeoLink>를 이용하세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
