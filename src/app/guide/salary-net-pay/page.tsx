import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { CalculatorJsonLd, FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "2026 연봉 실수령액 완전 정리 - 4대보험·소득세 공제 후 실수령액",
  description:
    "연봉별 실수령액과 공제 항목을 상세히 설명합니다. 4대보험 요율, 소득세 누진세율, 비과세 식대, 부양가족 공제까지 한눈에 정리.",
  alternates: { canonical: "https://moduncalc.com/guide/salary-net-pay" },
  openGraph: {
    title: "2026 연봉 실수령액 완전 정리",
    description:
      "4대보험·소득세 공제 후 실수령액을 연봉 구간별로 상세히 비교합니다.",
    url: "https://moduncalc.com/guide/salary-net-pay",
  },
};

const faqItems = [
  {
    q: "연봉 3000만원의 월 실수령액은 얼마인가요?",
    a: "연봉 3,000만원의 경우 4대보험과 소득세를 공제하면 월 실수령액은 약 223만원 내외입니다. 부양가족 수에 따라 소득세가 달라질 수 있습니다.",
  },
  {
    q: "비과세 식대를 받으면 실수령액이 얼마나 늘어나나요?",
    a: "월 20만원의 비과세 식대를 받으면 해당 금액에 대한 4대보험료와 소득세가 부과되지 않아 연간 약 30~50만원의 실수령액 증가 효과가 있습니다.",
  },
  {
    q: "부양가족을 등록하면 세금이 줄어드나요?",
    a: "네, 부양가족 1인당 연 150만원의 기본공제가 적용되어 과세표준이 낮아지고, 그에 따라 소득세가 줄어들어 실수령액이 증가합니다.",
  },
];

export default function SalaryNetPayGuidePage() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="2026 연봉 실수령액 완전 정리"
      description="4대보험·소득세 공제 후 내 손에 실제로 들어오는 금액을 꼼꼼히 알아봅니다."
    >
      <CalculatorJsonLd
        name="연봉 실수령액 가이드"
        description="2026년 연봉별 실수령액과 공제 항목을 상세히 설명합니다."
        url="https://moduncalc.com/guide/salary-net-pay"
      />
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "2026 연봉 실수령액 완전 정리 - 4대보험·소득세 공제 후 실수령액",
            description:
              "연봉별 실수령액과 공제 항목을 상세히 설명합니다.",
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
        <h2 className="text-base font-extrabold mb-3">연봉 실수령액이란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          연봉 실수령액이란 <b>세전 연봉에서 4대보험료와 소득세·지방소득세를 공제한 뒤 실제로 통장에 입금되는 금액</b>을 말합니다. 흔히 &quot;세후 월급&quot;이라고도 부릅니다. 예를 들어 연봉 4,000만원이라고 하면 매월 약 333만원이 지급될 것 같지만, 실제로는 4대보험과 세금 공제 후 약 283만원 정도만 받게 됩니다. 이 차이를 정확히 이해해야 생활비 계획이나 재무 설계를 올바르게 할 수 있습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>세전 연봉</b>은 근로계약서에 명시된 총 급여액이고, <b>세후 연봉</b>(실수령액)은 여기서 법정 공제 항목을 뺀 금액입니다. 공제 항목은 크게 4대보험료와 근로소득세로 나뉩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">4대보험 공제 항목 (2026년 요율)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          4대보험은 국민연금, 건강보험, 장기요양보험, 고용보험으로 구성되며, 근로자와 사업주가 각각 일정 비율을 부담합니다. 2026년 기준 근로자 본인 부담 요율은 다음과 같습니다.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">항목</th>
                <th className="text-right p-2 font-bold">근로자 부담률</th>
                <th className="text-right p-2 font-bold">비고</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">국민연금</td>
                <td className="p-2 text-right">4.75%</td>
                <td className="p-2 text-right">총 9.5% 중 절반</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">건강보험</td>
                <td className="p-2 text-right">3.595%</td>
                <td className="p-2 text-right">총 7.19% 중 절반</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">장기요양보험</td>
                <td className="p-2 text-right">건강보험의 13.14%</td>
                <td className="p-2 text-right">건강보험료 기반</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">고용보험</td>
                <td className="p-2 text-right">0.9%</td>
                <td className="p-2 text-right">실업급여 분</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          산재보험은 전액 사업주 부담이므로 근로자 급여에서 공제되지 않습니다. 4대보험 합계는 대략 월 급여의 9.4% 내외가 공제됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">소득세 누진세율 (8구간)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          근로소득세는 과세표준에 따라 6%부터 45%까지 8구간 누진세율이 적용됩니다. 여기에 지방소득세(소득세의 10%)가 추가로 부과됩니다.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">과세표준</th>
                <th className="text-right p-2 font-bold">세율</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]"><td className="p-2">1,400만원 이하</td><td className="p-2 text-right">6%</td></tr>
              <tr className="border-t border-[#eee]"><td className="p-2">1,400~5,000만원</td><td className="p-2 text-right">15%</td></tr>
              <tr className="border-t border-[#eee]"><td className="p-2">5,000~8,800만원</td><td className="p-2 text-right">24%</td></tr>
              <tr className="border-t border-[#eee]"><td className="p-2">8,800만원~1.5억</td><td className="p-2 text-right">35%</td></tr>
              <tr className="border-t border-[#eee]"><td className="p-2">1.5억~3억</td><td className="p-2 text-right">38%</td></tr>
              <tr className="border-t border-[#eee]"><td className="p-2">3억~5억</td><td className="p-2 text-right">40%</td></tr>
              <tr className="border-t border-[#eee]"><td className="p-2">5억~10억</td><td className="p-2 text-right">42%</td></tr>
              <tr className="border-t border-[#eee]"><td className="p-2">10억 초과</td><td className="p-2 text-right">45%</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>근로소득공제</b>는 총급여에서 일정 금액을 자동으로 차감해주는 제도로, 급여가 높을수록 공제율이 낮아집니다. <b>근로소득세액공제</b>는 산출세액에서 직접 차감되며, 산출세액 130만원 이하는 55%, 초과분은 30%를 공제받습니다(한도 74만원).
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">비과세 식대와 부양가족 공제</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>비과세 식대</b>는 월 20만원까지 소득세와 4대보험이 부과되지 않는 항목입니다. 연봉 협상 시 식대를 비과세로 분리하면 연간 수십만원의 절세 효과가 있습니다. 예를 들어 연봉 4,000만원 중 월 20만원(연 240만원)을 비과세 식대로 설정하면, 과세 대상 급여가 3,760만원으로 줄어듭니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>부양가족 인적공제</b>는 1인당 연 150만원의 기본공제가 적용됩니다. 배우자, 자녀, 부모님(만 60세 이상) 등을 부양가족으로 등록하면 과세표준이 낮아져 소득세가 줄어듭니다. 본인 포함이므로, 독신자도 기본 1인 공제(150만원)가 적용됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">연봉 구간별 실수령액 예시 (2026년, 독신 기준)</h2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">연봉</th>
                <th className="text-right p-2 font-bold">월 공제액</th>
                <th className="text-right p-2 font-bold">월 실수령액</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]"><td className="p-2">3,000만원</td><td className="p-2 text-right">약 27만원</td><td className="p-2 text-right">약 223만원</td></tr>
              <tr className="border-t border-[#eee]"><td className="p-2">4,000만원</td><td className="p-2 text-right">약 50만원</td><td className="p-2 text-right">약 283만원</td></tr>
              <tr className="border-t border-[#eee]"><td className="p-2">5,000만원</td><td className="p-2 text-right">약 72만원</td><td className="p-2 text-right">약 345만원</td></tr>
              <tr className="border-t border-[#eee]"><td className="p-2">7,000만원</td><td className="p-2 text-right">약 120만원</td><td className="p-2 text-right">약 463만원</td></tr>
              <tr className="border-t border-[#eee]"><td className="p-2">1억원</td><td className="p-2 text-right">약 210만원</td><td className="p-2 text-right">약 623만원</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          위 금액은 독신(부양가족 1인) 기준 추정치입니다. 정확한 실수령액은{" "}
          <Link href="/salary" className="text-[var(--primary)] font-bold hover:underline">연봉 실수령액 계산기</Link>에서 확인하세요. 연봉 구간별 상세 비교는{" "}
          <Link href="/salary/table" className="text-[var(--primary)] font-bold hover:underline">연봉 실수령액표</Link>에서 한눈에 볼 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">실수령액을 늘리는 방법</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>비과세 항목 활용:</b> 식대(월 20만원), 자가운전보조금(월 20만원), 출산·보육수당(월 20만원) 등을 비과세로 설정하면 과세 대상 급여가 줄어듭니다.</li>
          <li><b>부양가족 등록:</b> 배우자, 자녀, 부모님(소득 기준 충족 시)을 부양가족으로 등록하면 인적공제로 소득세를 절감할 수 있습니다.</li>
          <li><b>연금저축·IRP 활용:</b> 연금저축(연 600만원)과 IRP(연 900만원 한도)에 납입하면 연말정산 시 세액공제를 받아 실질적인 소득이 늘어납니다.</li>
          <li><b>신용카드·체크카드 사용 전략:</b> 총급여의 25%까지는 신용카드로, 초과분은 체크카드나 현금영수증으로 사용하면 공제 혜택이 극대화됩니다.</li>
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
