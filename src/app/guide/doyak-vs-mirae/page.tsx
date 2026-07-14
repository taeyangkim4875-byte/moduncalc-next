import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { CalculatorJsonLd, FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "청년도약계좌 vs 청년미래적금 비교 - 어떤 게 유리할까? (2026)",
  description:
    "두 상품의 금리, 정부지원, 가입조건을 상세 비교합니다. 청년도약계좌와 청년미래적금 중 나에게 유리한 상품을 찾아보세요.",
  alternates: { canonical: "https://moduncalc.com/guide/doyak-vs-mirae" },
  openGraph: {
    title: "청년도약계좌 vs 청년미래적금 비교 (2026)",
    description:
      "금리, 정부지원, 가입조건을 한눈에 비교합니다.",
    url: "https://moduncalc.com/guide/doyak-vs-mirae",
  },
};

const faqItems = [
  {
    q: "청년도약계좌와 청년미래적금을 동시에 가입할 수 있나요?",
    a: "두 상품의 동시 가입은 가능합니다. 다만 환승 제도를 통해 청년미래적금 만기 후 도약계좌로 이전하는 전략도 고려해볼 수 있습니다.",
  },
  {
    q: "소득이 낮을수록 어떤 상품이 유리한가요?",
    a: "총급여 2,400만원 이하라면 청년도약계좌의 정부기여금이 월 최대 3.3만원으로 가장 높아, 도약계좌가 상대적으로 유리합니다.",
  },
  {
    q: "환승 제도란 무엇인가요?",
    a: "청년미래적금 만기 자금을 청년도약계좌로 일시 납입할 수 있는 제도입니다. 미래적금 3년 + 도약계좌 5년으로 장기 자산을 형성하는 전략이 가능합니다.",
  },
];

export default function DoyakVsMiraeGuidePage() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="청년도약계좌 vs 청년미래적금"
      description="2026년 기준 두 상품의 금리·정부지원·가입조건을 상세 비교합니다."
    >
      <CalculatorJsonLd
        name="청년도약계좌 vs 청년미래적금 비교 가이드"
        description="두 상품의 금리, 정부지원, 가입조건을 상세 비교합니다."
        url="https://moduncalc.com/guide/doyak-vs-mirae"
      />
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "청년도약계좌 vs 청년미래적금 비교 - 어떤 게 유리할까? (2026)",
            description:
              "두 상품의 금리, 정부지원, 가입조건을 상세 비교합니다.",
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
        <h2 className="text-base font-extrabold mb-3">두 상품 개요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>청년도약계좌</b>와 <b>청년미래적금</b>은 모두 정부가 청년의 자산 형성을 지원하기 위해 만든 금융 상품입니다. 두 상품 모두 일반 적금보다 높은 수익률을 제공하지만, 만기·지원 방식·가입 조건이 크게 다릅니다. 어떤 상품이 나에게 유리한지 꼼꼼히 비교해보겠습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>청년도약계좌</b>는 5년(60개월) 만기의 장기 적금으로, 정부가 소득 구간에 따라 매월 기여금을 지원하고 이자소득이 비과세됩니다. <b>청년미래적금</b>은 3년(36개월) 만기의 중기 적금으로, 기본금리 5%에 우대금리 최대 3%를 더해 높은 금리를 제공하며, 이자소득이 비과세됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">가입 조건 비교</h2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">구분</th>
                <th className="text-left p-2 font-bold">청년도약계좌</th>
                <th className="text-left p-2 font-bold">청년미래적금</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">나이</td>
                <td className="p-2">만 19~34세</td>
                <td className="p-2">만 19~34세</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">개인소득</td>
                <td className="p-2">총급여 7,500만원 이하</td>
                <td className="p-2">총급여 5,000만원 이하</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">가구소득</td>
                <td className="p-2">중위 250% 이하</td>
                <td className="p-2">중위 180% 이하</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">만기</td>
                <td className="p-2">5년 (60개월)</td>
                <td className="p-2">3년 (36개월)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">월 납입한도</td>
                <td className="p-2">최대 70만원</td>
                <td className="p-2">최대 50만원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          도약계좌는 소득 조건이 더 넓지만 5년의 장기 유지가 필요합니다. 미래적금은 가입 문턱이 다소 높지만 3년으로 비교적 빠르게 만기를 맞을 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">금리 및 정부 지원 비교</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>청년도약계좌</b>의 기본금리는 은행별로 연 3.5~4.5% 수준이며, 여기에 정부기여금이 추가됩니다. 정부기여금은 소득 구간에 따라 월 최대 3.3만원(총급여 2,400만원 이하)에서 최소 2.1만원(총급여 4,800~7,500만원)까지 지급됩니다. 이자소득은 전액 비과세됩니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>청년미래적금</b>은 기본금리 연 5%에 우대금리 최대 3%를 더해 최대 연 8%의 금리를 제공합니다. 우대금리 조건은 급여이체, 카드 실적, 자동이체 등 은행별로 다릅니다. 이자소득 역시 비과세 혜택이 적용됩니다.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">항목</th>
                <th className="text-left p-2 font-bold">청년도약계좌</th>
                <th className="text-left p-2 font-bold">청년미래적금</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">기본금리</td>
                <td className="p-2">연 3.5~4.5%</td>
                <td className="p-2">연 5%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">우대금리</td>
                <td className="p-2">은행별 상이</td>
                <td className="p-2">최대 +3%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">정부지원</td>
                <td className="p-2">정부기여금 (월 2.1~3.3만원)</td>
                <td className="p-2">이자소득 비과세</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">비과세</td>
                <td className="p-2">이자소득 전액</td>
                <td className="p-2">이자소득 전액</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">환승 제도 활용 전략</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>환승 제도</b>란 청년미래적금 만기 수령액을 청년도약계좌로 일시 납입할 수 있는 제도입니다. 미래적금 3년 만기 후 도약계좌로 이전하면, 총 8년간(3년 + 5년) 정부 지원을 받으며 자산을 형성할 수 있습니다. 이 방식으로 단순히 한 상품만 유지하는 것보다 더 높은 총 수익을 기대할 수 있습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          다만 환승 시에도 도약계좌의 가입 조건(나이, 소득)을 충족해야 하며, 환승 가능 금액은 미래적금 만기 수령액 범위 내에서 도약계좌 납입한도를 초과하지 않아야 합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">만기 수령액 시뮬레이션 비교</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          월 50만원을 납입한다고 가정했을 때의 만기 수령액을 비교해보겠습니다.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">구분</th>
                <th className="text-right p-2 font-bold">청년도약계좌 (5년)</th>
                <th className="text-right p-2 font-bold">청년미래적금 (3년)</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">총 납입액</td>
                <td className="p-2 text-right">3,000만원</td>
                <td className="p-2 text-right">1,800만원</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">이자 수익</td>
                <td className="p-2 text-right">약 460만원</td>
                <td className="p-2 text-right">약 280만원</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">정부기여금</td>
                <td className="p-2 text-right">약 150만원</td>
                <td className="p-2 text-right">-</td>
              </tr>
              <tr className="border-t border-[#eee] font-bold">
                <td className="p-2">예상 수령액</td>
                <td className="p-2 text-right">약 3,610만원</td>
                <td className="p-2 text-right">약 2,080만원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          정확한 만기 수령액은 금리와 개인 소득 조건에 따라 달라집니다.{" "}
          <Link href="/savings/doyak" className="text-[var(--primary)] font-bold hover:underline">청년도약계좌 계산기</Link>와{" "}
          <Link href="/savings/mirae" className="text-[var(--primary)] font-bold hover:underline">청년미래적금 계산기</Link>에서 본인의 조건에 맞는 정확한 수령액을 확인해보세요.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">어떤 상품이 나에게 유리할까?</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>5년 이상 장기 저축 가능 + 총급여 4,800만원 이하:</b> 청년도약계좌가 유리합니다. 정부기여금과 비과세 혜택을 모두 받을 수 있습니다.</li>
          <li><b>3년 내 자금이 필요 + 높은 금리 선호:</b> 청년미래적금이 유리합니다. 우대금리 충족 시 최대 연 8%의 높은 금리를 받을 수 있습니다.</li>
          <li><b>두 상품 모두 조건 충족:</b> 미래적금 3년 납입 후 환승 제도를 활용해 도약계좌로 이전하는 &quot;릴레이 전략&quot;이 가장 효과적입니다.</li>
          <li><b>총급여 5,000만원 초과:</b> 미래적금 가입이 불가하므로 도약계좌만 선택할 수 있습니다.</li>
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
