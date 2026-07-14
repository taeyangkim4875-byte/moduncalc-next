import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { CalculatorJsonLd, FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "연말정산 초보 가이드 - 환급 많이 받는 법 (2026년 귀속)",
  description:
    "연말정산 절차와 공제 항목을 초보자도 이해하기 쉽게 정리합니다. 소득공제, 세액공제, 신용카드, 의료비, 월세 공제까지.",
  alternates: { canonical: "https://moduncalc.com/guide/year-end-tax" },
  openGraph: {
    title: "연말정산 초보 가이드 (2026년 귀속)",
    description:
      "환급 많이 받는 법을 초보자도 이해하기 쉽게 정리합니다.",
    url: "https://moduncalc.com/guide/year-end-tax",
  },
};

const faqItems = [
  {
    q: "연말정산에서 환급을 받으려면 어떻게 해야 하나요?",
    a: "매월 원천징수된 세금이 실제 부담해야 할 세금보다 많으면 차액을 환급받습니다. 공제 항목을 빠짐없이 신고하는 것이 핵심입니다. 특히 신용카드, 의료비, 교육비, 연금저축 등의 공제를 놓치지 마세요.",
  },
  {
    q: "신용카드와 체크카드, 어떻게 쓰는 게 유리한가요?",
    a: "총급여의 25%까지는 어차피 공제되지 않으므로 혜택이 좋은 신용카드로, 25% 초과분은 공제율이 높은(30%) 체크카드나 현금영수증으로 사용하는 것이 유리합니다.",
  },
  {
    q: "월세 세액공제 조건은 무엇인가요?",
    a: "총급여 7,000만원 이하(종합소득 6,000만원 이하) 무주택 세대주로, 전용면적 85㎡ 이하 또는 기준시가 4억원 이하 주택에 거주해야 합니다. 월세의 17%(총급여 5,500만원 이하) 또는 15%를 세액공제 받을 수 있습니다.",
  },
];

export default function YearEndTaxGuidePage() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="연말정산 초보 가이드"
      description="13월의 월급, 환급 많이 받는 법을 초보자 눈높이에서 정리합니다."
    >
      <CalculatorJsonLd
        name="연말정산 가이드"
        description="연말정산 절차와 공제 항목을 초보자도 이해하기 쉽게 정리합니다."
        url="https://moduncalc.com/guide/year-end-tax"
      />
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "연말정산 초보 가이드 - 환급 많이 받는 법 (2026년 귀속)",
            description:
              "연말정산 절차와 공제 항목을 초보자도 이해하기 쉽게 정리합니다.",
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
        <h2 className="text-base font-extrabold mb-3">연말정산이란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          연말정산은 <b>&quot;13월의 월급&quot;</b>이라고도 불리는 제도로, 1년간 매월 원천징수된 근로소득세를 연말에 정산하여 실제 부담해야 할 세금과의 차액을 환급받거나 추가 납부하는 절차입니다. 회사가 매월 급여에서 소득세를 미리 떼어 납부하는데, 이때 적용하는 세율은 간이세액표 기준이라 실제 세금과 차이가 발생합니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          다양한 공제 항목을 적극 활용하면 원천징수된 세금보다 실제 부담 세금이 적어져 환급을 받을 수 있습니다. 반대로 공제 항목이 적으면 추가 납부가 발생할 수도 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">연말정산 일정 (2026년 귀속)</h2>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">1월 중순</span>
            <span className="text-sm text-[#4E5968]">국세청 홈택스에서 &quot;연말정산 간소화 서비스&quot; 오픈</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">1월 말</span>
            <span className="text-sm text-[#4E5968]">간소화 자료 다운로드 후 회사에 제출</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">2월 급여</span>
            <span className="text-sm text-[#4E5968]">환급 또는 추가 납부 반영</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">3월 10일</span>
            <span className="text-sm text-[#4E5968]">회사가 원천세 신고·납부 마감</span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">소득공제 vs 세액공제, 뭐가 다를까?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          연말정산에서 가장 헷갈리는 개념이 <b>소득공제</b>와 <b>세액공제</b>의 차이입니다.
        </p>
        <div className="grid grid-cols-1 gap-3 mb-3">
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">소득공제</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              과세표준(세금을 매기는 기준 금액)을 줄여주는 것입니다. 소득이 높아 높은 세율 구간에 있는 사람일수록 효과가 큽니다. 대표적으로 <b>신용카드 사용액, 인적공제, 국민연금</b> 등이 있습니다.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">세액공제</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              산출된 세금에서 직접 차감해주는 것입니다. 소득 수준에 관계없이 공제 금액 자체가 절세 효과입니다. 대표적으로 <b>의료비, 교육비, 연금저축, 월세</b> 등이 있습니다.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">주요 공제 항목 총정리</h2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">공제 항목</th>
                <th className="text-left p-2 font-bold">유형</th>
                <th className="text-left p-2 font-bold">한도/조건</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">신용카드</td>
                <td className="p-2">소득공제</td>
                <td className="p-2">총급여 25% 초과분의 15%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">체크카드·현금영수증</td>
                <td className="p-2">소득공제</td>
                <td className="p-2">총급여 25% 초과분의 30%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">의료비</td>
                <td className="p-2">세액공제</td>
                <td className="p-2">총급여 3% 초과분의 15%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">교육비</td>
                <td className="p-2">세액공제</td>
                <td className="p-2">15% (대학 등록금 연 900만원)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">연금저축</td>
                <td className="p-2">세액공제</td>
                <td className="p-2">연 600만원 한도, 13.2~16.5%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">IRP</td>
                <td className="p-2">세액공제</td>
                <td className="p-2">연금저축 포함 연 900만원</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">주택자금</td>
                <td className="p-2">소득공제</td>
                <td className="p-2">주택청약 연 300만원 등</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">월세</td>
                <td className="p-2">세액공제</td>
                <td className="p-2">연 1,000만원 한도, 15~17%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">신용카드 공제 전략</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          신용카드 소득공제는 <b>총급여의 25%를 초과하는 사용액</b>부터 적용됩니다. 즉, 총급여 5,000만원인 경우 연간 1,250만원까지의 카드 사용액은 공제되지 않고, 이를 초과한 금액부터 공제가 시작됩니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          공제율은 결제 수단에 따라 다릅니다. 신용카드 15%, <b>체크카드·현금영수증 30%</b>, 전통시장·대중교통 40%입니다. 따라서 총급여의 25%까지는 포인트 등 혜택이 좋은 신용카드로 사용하고, 초과분은 공제율이 높은 체크카드나 현금영수증을 활용하는 것이 가장 효율적인 전략입니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          공제 한도는 총급여 7,000만원 이하 시 연 300만원, 7,000만원 초과 시 250만원입니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">의료비·월세 세액공제</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>의료비 세액공제</b>는 총급여의 3%를 초과하는 의료비에 대해 15%를 세액공제합니다. 본인·65세 이상·장애인 의료비는 한도가 없고, 그 외 부양가족은 연 700만원 한도입니다. 안경·콘택트렌즈 구입비(1인당 50만원), 산후조리원비(200만원 한도)도 포함됩니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>월세 세액공제</b>는 총급여 7,000만원 이하(종합소득 6,000만원 이하) 무주택 세대주가 받을 수 있습니다. 총급여 5,500만원 이하는 월세의 <b>17%</b>, 5,500~7,000만원은 <b>15%</b>를 세액공제합니다. 연간 한도는 1,000만원이며, 임대차계약서와 주민등록등본, 이체 내역이 필요합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">놓치기 쉬운 공제 항목</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>중고생 교복 구입비:</b> 자녀 1인당 연 50만원까지 교육비 세액공제 대상입니다. 영수증을 챙겨두세요.</li>
          <li><b>기부금:</b> 정치자금기부금(10만원까지 100% 세액공제), 종교단체 기부금, 법정기부금 등이 모두 공제 대상입니다.</li>
          <li><b>안경·렌즈 구입비:</b> 시력 교정용 안경·콘택트렌즈는 의료비 공제 대상입니다(1인당 50만원 한도).</li>
          <li><b>대중교통 사용액:</b> 대중교통 결제액은 40%의 높은 공제율이 적용됩니다.</li>
          <li><b>주택청약종합저축:</b> 총급여 7,000만원 이하 무주택 세대주라면 연 300만원 한도로 소득공제(40%)를 받을 수 있습니다.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">실수하기 쉬운 점</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>맞벌이 부부 공제 분배:</b> 부양가족 공제를 부부 중 소득이 높은 쪽에서 받는 것이 유리하지만, 의료비 등은 소득이 낮은 쪽이 유리할 수 있습니다.</li>
          <li><b>중복 공제 주의:</b> 부양가족을 부부가 동시에 공제받으면 가산세가 부과될 수 있습니다.</li>
          <li><b>간소화 자료 미반영 항목:</b> 일부 기부금, 안경비, 교복비 등은 간소화 서비스에 자동 반영되지 않으므로 별도 영수증을 제출해야 합니다.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          내 연봉 기준으로 공제 전후 세금 차이가 궁금하다면{" "}
          <Link href="/salary" className="text-[var(--primary)] font-bold hover:underline">연봉 실수령액 계산기</Link>를 활용하세요. 프리랜서나 사업소득이 있다면{" "}
          <Link href="/tax/income" className="text-[var(--primary)] font-bold hover:underline">종합소득세 계산기</Link>도 함께 확인해보세요.
        </p>
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
