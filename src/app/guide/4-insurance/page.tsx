import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { CalculatorJsonLd, FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "4대보험 완전 정리 - 2026년 요율·계산 방법·혜택",
  description:
    "국민연금, 건강보험, 고용보험, 산재보험의 요율과 혜택을 총정리합니다. 2026년 변경사항과 절약 팁까지.",
  alternates: { canonical: "https://moduncalc.com/guide/4-insurance" },
  openGraph: {
    title: "4대보험 완전 정리 - 2026년 요율·계산 방법·혜택",
    description:
      "국민연금, 건강보험, 고용보험, 산재보험의 요율과 혜택을 총정리합니다.",
    url: "https://moduncalc.com/guide/4-insurance",
  },
};

const faqItems = [
  {
    q: "2026년 국민연금 요율이 인상되었나요?",
    a: "네, 국민연금 보험료율이 기존 9%에서 9.5%로 인상되었습니다. 근로자 본인 부담은 4.5%에서 4.75%로 0.25%p 증가했습니다.",
  },
  {
    q: "4대보험은 아르바이트생도 가입해야 하나요?",
    a: "월 60시간 이상(주 15시간 이상) 근무하는 경우 4대보험 가입 의무가 있습니다. 단, 1개월 미만 일용직은 고용·산재보험만 적용됩니다.",
  },
  {
    q: "건강보험 피부양자 등록 조건은 무엇인가요?",
    a: "직장가입자의 배우자, 직계존비속 등이 연 소득 2,000만원 이하이고 재산세 과세표준 5.4억원 이하인 경우 피부양자로 등록할 수 있습니다.",
  },
];

export default function FourInsuranceGuidePage() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="4대보험 완전 정리"
      description="2026년 요율·계산 방법·혜택을 항목별로 상세히 알아봅니다."
    >
      <CalculatorJsonLd
        name="4대보험 가이드"
        description="국민연금, 건강보험, 고용보험, 산재보험의 요율과 혜택을 총정리합니다."
        url="https://moduncalc.com/guide/4-insurance"
      />
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "4대보험 완전 정리 - 2026년 요율·계산 방법·혜택",
            description:
              "국민연금, 건강보험, 고용보험, 산재보험의 요율과 혜택을 총정리합니다.",
            datePublished: "2026-01-01",
            dateModified: "2026-07-12",
            author: {
              "@type": "Organization",
              name: "모든 계산기",
              url: "https://moduncalc.com",
            },
          }),
        }}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">4대보험이란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          4대보험은 대한민국의 <b>사회안전망</b>을 구성하는 4가지 사회보험 제도입니다. 국민연금, 건강보험, 고용보험, 산재보험으로 구성되며, 질병·노령·실업·산업재해 등의 사회적 위험으로부터 국민을 보호하는 것이 목적입니다. 근로자와 사업주가 보험료를 분담하며, 가입이 법적으로 의무화되어 있습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          매월 급여에서 자동으로 공제되기 때문에 &quot;세금&quot;처럼 느껴질 수 있지만, 실제로는 미래의 나를 위한 보험료이며 각 항목마다 고유한 혜택이 돌아옵니다. 아래에서 각 보험의 요율과 혜택을 자세히 살펴보겠습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">국민연금</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>보험료율:</b> 총 9.5% (근로자 4.75% + 사업주 4.75%)
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          국민연금은 노후 소득 보장을 위한 공적 연금 제도입니다. 만 18세 이상 60세 미만의 국민이 의무 가입 대상이며, 최소 10년(120개월) 이상 납부하면 만 65세부터 매월 연금을 수령할 수 있습니다. 기준소득월액의 상한은 637만원이므로, 월급이 이를 초과하더라도 637만원 기준으로만 보험료가 산정됩니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          예를 들어 월급 300만원인 경우 국민연금 본인 부담은 300만원 x 4.75% = 142,500원입니다. 납부 기간과 평균소득에 따라 수령액이 결정되며,{" "}
          <Link href="/pension/nps" className="text-[var(--primary)] font-bold hover:underline">국민연금 계산기</Link>에서 예상 수령액을 확인할 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">건강보험 · 장기요양보험</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>건강보험료율:</b> 총 7.19% (근로자 3.595% + 사업주 3.595%)<br />
          <b>장기요양보험료:</b> 건강보험료의 13.14%
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          건강보험은 질병·부상에 대한 의료비를 보장하는 제도입니다. 병원 진료 시 본인부담금만 내고 나머지를 건강보험이 부담합니다. 직장가입자의 경우 급여에 비례하여 보험료가 산정되며, 소득이 없는 배우자·부모님 등을 피부양자로 등록하면 추가 보험료 없이 의료 혜택을 받을 수 있습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          장기요양보험은 고령이나 노인성 질환으로 일상생활이 어려운 분들에게 요양 서비스를 제공하는 제도입니다. 건강보험료에 연동되어 별도 계산 없이 자동 부과됩니다. 월급 300만원 기준 건강보험료 약 107,850원, 장기요양 약 14,170원이 공제됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">고용보험</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>보험료율:</b> 근로자 0.9% (실업급여 분)
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          고용보험은 실업 시 생활 안정과 재취업을 지원하는 제도입니다. 비자발적으로 퇴사한 경우 <b>실업급여(구직급여)</b>를 받을 수 있으며, 수급 조건은 이직 전 18개월 중 180일 이상 피보험 단위기간을 충족해야 합니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          실업급여는 퇴직 전 평균임금의 60%를 지급하며, 상한액은 1일 66,000원입니다. 지급 기간은 피보험기간과 나이에 따라 120~270일입니다.{" "}
          <Link href="/pension/jobless" className="text-[var(--primary)] font-bold hover:underline">실업급여 계산기</Link>에서 예상 수급액을 확인해보세요.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          사업주는 실업급여 분 외에 고용안정·직업능력개발 사업 보험료를 추가로 부담합니다(사업 규모에 따라 0.25~0.85%).
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">산재보험</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>보험료:</b> 전액 사업주 부담 (업종별 상이)
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          산업재해보상보험(산재보험)은 업무상 재해를 입은 근로자에게 치료비, 휴업급여, 장해급여 등을 지급하는 제도입니다. 보험료는 전액 사업주가 부담하므로 근로자의 급여에서 공제되지 않습니다. 업종별로 위험도에 따라 보험료율이 다르며, 사무직은 0.7% 내외, 건설업은 3~4% 수준입니다. 출퇴근 중 사고도 산재로 인정됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">2025년 대비 2026년 변경사항</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>국민연금 보험료율 인상:</b> 9% → 9.5% (근로자 부담 4.5% → 4.75%). 연금 재정 안정화를 위한 단계적 인상의 일환입니다.</li>
          <li><b>건강보험료율:</b> 7.09% → 7.19%로 소폭 인상되었습니다.</li>
          <li><b>장기요양보험료율:</b> 12.95% → 13.14%로 조정되었습니다.</li>
          <li><b>고용보험료율:</b> 0.9%로 동결되었습니다.</li>
          <li><b>국민연금 기준소득월액 상한:</b> 617만원 → 637만원으로 상향 조정되었습니다.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          이러한 변경사항이 반영된 정확한 실수령액은{" "}
          <Link href="/salary" className="text-[var(--primary)] font-bold hover:underline">연봉 실수령액 계산기</Link>에서 확인할 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">4대보험 절약 팁</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>비과세 항목 활용:</b> 식대, 자가운전보조금 등 비과세 항목은 4대보험 산정 기준에서 제외되므로 보험료를 줄일 수 있습니다.</li>
          <li><b>건강보험 피부양자 등록:</b> 소득이 없는 가족을 피부양자로 등록하면 별도 보험료 없이 의료 혜택을 받을 수 있습니다.</li>
          <li><b>국민연금 임의계속가입:</b> 60세 이후에도 가입을 유지하면 연금 수령액을 높일 수 있습니다.</li>
          <li><b>실업급여 수급 조건 확인:</b> 퇴사 전 피보험기간(180일)을 반드시 충족하는지 확인하세요.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div key={i}>
              <h3 className="text-sm font-bold mb-1">Q. {item.q}</h3>
              <p className="text-sm text-[#4E5968] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </Card>
    </PageLayout>
  );
}
