import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { CalculatorJsonLd, FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "전세 계약 완전 가이드 - 보증금 보호·계약 체크리스트 (2026)",
  description:
    "전세 계약 전 꼭 알아야 할 보증금 보호 방법과 체크리스트. 전세사기 예방법, 전월세 전환율, 계약갱신청구권까지 총정리.",
  alternates: { canonical: "https://moduncalc.com/guide/jeonse" },
  openGraph: {
    title: "전세 계약 완전 가이드 (2026)",
    description:
      "보증금 보호 방법, 계약 체크리스트, 전세사기 예방법을 총정리합니다.",
    url: "https://moduncalc.com/guide/jeonse",
  },
};

const faqItems = [
  {
    q: "전입신고와 확정일자는 언제 해야 하나요?",
    a: "잔금 지급일(이사 당일)에 전입신고와 확정일자를 동시에 받는 것이 가장 안전합니다. 전입신고는 주민센터 또는 정부24 온라인으로, 확정일자는 주민센터나 등기소에서 받을 수 있습니다.",
  },
  {
    q: "전세보증보험은 반드시 가입해야 하나요?",
    a: "법적 의무는 아니지만, 임대인의 보증금 반환 불이행에 대비하기 위해 강력히 권장됩니다. HUG, SGI서울보증, 주택도시보증공사 등에서 가입할 수 있습니다.",
  },
  {
    q: "계약갱신청구권은 몇 번까지 사용할 수 있나요?",
    a: "임차인은 계약 기간 중 1회에 한해 계약갱신청구권을 행사할 수 있습니다. 갱신 시 보증금 인상은 기존 보증금의 5% 이내로 제한됩니다.",
  },
];

export default function JeonseGuidePage() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="전세 계약 완전 가이드"
      description="보증금 보호부터 전세사기 예방까지, 전세 계약의 모든 것을 정리합니다."
    >
      <CalculatorJsonLd
        name="전세 계약 가이드"
        description="전세 계약 전 꼭 알아야 할 보증금 보호 방법과 체크리스트."
        url="https://moduncalc.com/guide/jeonse"
      />
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "전세 계약 완전 가이드 - 보증금 보호·계약 체크리스트 (2026)",
            description:
              "전세 계약 전 꼭 알아야 할 보증금 보호 방법과 체크리스트.",
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
        <h2 className="text-base font-extrabold mb-3">전세 제도란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          전세는 <b>한국 고유의 임대 방식</b>으로, 임차인이 임대인에게 고액의 보증금(전세금)을 맡기고 월세 없이 거주하는 제도입니다. 계약 만료 시 보증금을 전액 돌려받는 구조입니다. 주거비 부담을 줄이면서 목돈을 보전할 수 있다는 장점이 있지만, 보증금 반환 위험이 존재하므로 계약 전 철저한 확인이 필요합니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          최근 전세사기 피해가 사회 문제로 대두되면서 보증금 보호의 중요성이 어느 때보다 강조되고 있습니다. 이 가이드에서는 안전한 전세 계약을 위해 반드시 알아야 할 사항들을 정리했습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">전세 vs 월세 vs 반전세</h2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">구분</th>
                <th className="text-left p-2 font-bold">전세</th>
                <th className="text-left p-2 font-bold">월세</th>
                <th className="text-left p-2 font-bold">반전세</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">보증금</td>
                <td className="p-2">고액</td>
                <td className="p-2">소액</td>
                <td className="p-2">중간</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">월세</td>
                <td className="p-2">없음</td>
                <td className="p-2">있음</td>
                <td className="p-2">있음 (소액)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">장점</td>
                <td className="p-2">월 주거비 없음</td>
                <td className="p-2">초기 자금 적음</td>
                <td className="p-2">절충형</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">리스크</td>
                <td className="p-2">보증금 미반환</td>
                <td className="p-2">월세 부담 지속</td>
                <td className="p-2">보증금+월세 이중 부담</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          전세와 월세 사이의 전환은 전월세 전환율로 계산할 수 있습니다.{" "}
          <Link href="/realestate/convert" className="text-[var(--primary)] font-bold hover:underline">전월세 전환 계산기</Link>에서 보증금과 월세의 최적 비율을 확인해보세요.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">보증금 보호 3대 장치</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          전세 보증금을 안전하게 지키기 위해서는 다음 3가지를 반드시 갖추어야 합니다.
        </p>
        <div className="space-y-3">
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">1. 전입신고</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              이사 당일 주민센터에서 전입신고를 하면 다음날 0시부터 <b>대항력</b>(제3자에게도 임차권을 주장할 수 있는 힘)이 발생합니다. 집이 경매에 넘어가더라도 보증금을 우선적으로 배당받을 수 있는 기초 요건입니다.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">2. 확정일자</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              주민센터나 등기소에서 임대차계약서에 확정일자 도장을 받으면 <b>우선변제권</b>이 생깁니다. 경매 시 확정일자 기준으로 배당 순위가 정해지므로, 전입신고와 함께 같은 날 받는 것이 중요합니다.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">3. 전세보증보험</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              HUG(주택도시보증공사), SGI서울보증 등에서 가입할 수 있으며, 임대인이 보증금을 반환하지 않을 때 보증기관이 대신 지급해줍니다. 보증료는 보증금의 0.1~0.4% 수준으로, 가장 확실한 보증금 보호 수단입니다.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">계약 전 체크리스트</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>등기부등본 확인:</b> 계약 당일 발급받아 소유자, 근저당, 가압류, 전세권 설정 여부를 확인합니다. 근저당 설정액 + 전세보증금이 시세의 70%를 초과하면 위험 신호입니다.</li>
          <li><b>건축물대장 확인:</b> 불법 건축물이나 용도 변경 여부를 확인합니다. 위반 건축물은 전세보증보험 가입이 불가할 수 있습니다.</li>
          <li><b>임대인 신원 확인:</b> 등기부등본상 소유자와 계약 당사자가 동일인인지 반드시 확인합니다. 대리인 계약 시 위임장과 인감증명서를 요구하세요.</li>
          <li><b>국세·지방세 완납증명:</b> 임대인의 세금 체납 여부를 확인합니다. 체납이 있으면 보증금보다 세금이 우선 변제될 수 있습니다.</li>
          <li><b>시세 대비 전세가율:</b> 전세가율(전세가/매매가)이 80%를 초과하면 깡통전세 위험이 높습니다. 주변 시세와 비교하여 비정상적으로 높은 전세가는 피하세요.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">전세사기 예방법</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          최근 전세사기 수법이 갈수록 교묘해지고 있습니다. 다음 사항을 유의하세요.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li>시세보다 현저히 낮은 전세가를 제시하는 매물은 의심하세요.</li>
          <li>임대인이 전세보증보험 가입을 거부하면 계약을 재고하세요.</li>
          <li>다세대·빌라는 건물 전체의 근저당 총액을 확인하세요.</li>
          <li>계약 전 해당 주소로 &quot;안심전세&quot; 앱에서 위험도를 조회하세요.</li>
          <li>잔금은 반드시 임대인 본인 명의 계좌로 송금하고, 영수증을 보관하세요.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">전월세 전환율과 계약갱신청구권</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>전월세 전환율</b>은 전세 보증금을 월세로 전환하거나, 반대로 월세를 전세로 환산할 때 적용하는 비율입니다. 법정 전환율 상한은 &quot;기준금리 + 3.5%&quot;이며, 2026년 기준 약 7.0% 수준입니다. 전월세 전환 시{" "}
          <Link href="/realestate/convert" className="text-[var(--primary)] font-bold hover:underline">전월세 전환 계산기</Link>를 활용하면 적정 금액을 쉽게 계산할 수 있습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>계약갱신청구권</b>은 2020년 주택임대차보호법 개정으로 도입되었으며, 임차인이 1회에 한해 계약 갱신을 요구할 수 있는 권리입니다. 갱신 시 보증금·월세 인상은 직전 금액의 <b>5% 이내</b>로 제한됩니다. 중개수수료가 궁금하다면{" "}
          <Link href="/realestate/commission" className="text-[var(--primary)] font-bold hover:underline">복비 계산기</Link>에서 확인하세요.
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
