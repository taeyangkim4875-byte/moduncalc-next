import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "주식·ETF 세금 총정리 - 양도세·배당세·금투세 (2026)",
  description: "주식 투자 시 발생하는 각종 세금을 초보자도 이해하기 쉽게 정리합니다.",
  alternates: { canonical: "https://moduncalc.com/guide/investment-tax" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="주식·ETF 세금 총정리 (2026)"
      description="양도소득세, 배당소득세, 증권거래세까지 투자 세금의 모든 것을 알려드립니다."
    >
      <FaqJsonLd
        items={[
          { q: "국내 주식 매매 시 세금은 얼마나 내나요?", a: "일반 개인투자자는 증권거래세(코스피 0%, 코스닥 0.15%)만 부담합니다. 대주주에 해당하면 양도소득세 22~27.5%가 추가로 과세됩니다." },
          { q: "해외주식 양도소득세는 어떻게 계산하나요?", a: "해외주식은 연간 양도차익에서 250만원을 공제한 후 22%(지방세 포함)의 세율로 과세됩니다. 매년 5월에 확정신고·납부해야 합니다." },
          { q: "배당소득세는 어떻게 부과되나요?", a: "배당소득에 대해 14%의 소득세와 1.4%의 지방소득세, 총 15.4%가 원천징수됩니다. 금융소득이 연간 2,000만원을 초과하면 종합과세 대상이 됩니다." },
        ]}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">증권거래세 (2026년 기준)</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          증권거래세는 주식을 <strong>매도(팔 때)</strong>할 때 부과되는 세금입니다.
          매수(살 때)에는 부과되지 않습니다. 2026년 현재 적용되는 세율은 다음과 같습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-2 font-bold">시장</th>
                <th className="text-right py-2 font-bold">증권거래세</th>
                <th className="text-right py-2 font-bold">농어촌특별세</th>
                <th className="text-right py-2 font-bold">합계</th>
              </tr>
            </thead>
            <tbody className="text-[var(--sub)]">
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">코스피</td>
                <td className="text-right py-2">0%</td>
                <td className="text-right py-2">0.15%</td>
                <td className="text-right py-2">0.15%</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">코스닥</td>
                <td className="text-right py-2">0.15%</td>
                <td className="text-right py-2">-</td>
                <td className="text-right py-2">0.15%</td>
              </tr>
              <tr>
                <td className="py-2">K-OTC</td>
                <td className="text-right py-2">0.35%</td>
                <td className="text-right py-2">-</td>
                <td className="text-right py-2">0.35%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          코스피 시장은 증권거래세가 0%로 인하되었으나 농어촌특별세 0.15%는 유지되어 실질 세율은 0.15%입니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">배당소득세</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          주식 보유 시 받는 배당금에 대해서는 <strong>배당소득세 14%</strong>와 <strong>지방소득세 1.4%</strong>,
          합계 <strong>15.4%</strong>가 원천징수됩니다. 예를 들어 배당금이 100만원이라면 실제 수령액은 846,000원입니다.
        </p>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          다만 배당소득을 포함한 연간 금융소득(이자 + 배당)이 <strong>2,000만원을 초과</strong>하면
          금융소득종합과세 대상이 되어 다른 소득과 합산하여 6.6~49.5%의 누진세율이 적용될 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">양도소득세 (국내 주식)</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          현재 국내 주식의 양도소득세는 <strong>대주주</strong>에 한해 과세됩니다.
          대주주 기준은 종목별 보유액 <strong>10억원 이상</strong> 또는 일정 지분율 이상(코스피 1%, 코스닥 2% 등)입니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li>과세표준 3억원 이하: 22% (지방세 포함)</li>
          <li>과세표준 3억원 초과: 27.5% (지방세 포함)</li>
        </ul>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          일반 소액 개인투자자는 국내 상장주식 매매차익에 대해 양도소득세가 면제됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">해외주식 양도소득세</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          해외주식(미국주식, 중국주식 등)은 대주주 여부와 관계없이 모든 투자자에게 양도소득세가 과세됩니다.
        </p>
        <div className="bg-[var(--bg-alt)] rounded-lg p-4 mb-3">
          <p className="text-sm"><strong>양도소득세</strong> = (연간 양도차익 - 250만원 기본공제) x 22%</p>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          예를 들어 미국 주식으로 연간 1,000만원의 매매차익을 얻었다면, (1,000만 - 250만) x 22% = <strong>165만원</strong>의
          세금을 납부해야 합니다. 해외주식 양도소득세는 매년 <strong>5월 1일~31일</strong>에 확정신고·납부하며,
          증권사에서 제공하는 양도소득 내역서를 기반으로 신고합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">금융투자소득세(금투세) 현황</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          금융투자소득세는 국내 주식, 채권, 펀드 등 금융투자 상품에서 발생한 소득에 대해 포괄적으로
          과세하는 제도입니다. 당초 2023년 시행 예정이었으나 두 차례 유예된 바 있습니다.
          2026년 현재 금투세의 시행 여부는 정치적·경제적 상황에 따라 유동적이며, 시행 시
          국내 주식 양도차익 <strong>5,000만원 초과분</strong>에 대해 22~27.5%의 세율이 적용될 예정입니다.
          투자자는 관련 법안 동향을 지속적으로 확인할 필요가 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">ETF vs 개별주식 세금 차이</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          ETF(상장지수펀드)는 개별주식과 세금 처리 방식이 다릅니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>국내 주식형 ETF</strong>: 매매차익 비과세, 배당소득세 15.4% (개별주식과 동일)</li>
          <li><strong>국내 기타 ETF (채권형, 해외형 등)</strong>: 매매차익에 배당소득세 15.4% 과세. 보유기간 과세 방식 적용.</li>
          <li><strong>해외 상장 ETF</strong>: 해외주식과 동일하게 양도소득세 22% 과세 (250만원 공제)</li>
        </ul>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          세금 효율을 고려하면 국내 주식형 ETF가 매매차익 비과세로 가장 유리하며,
          해외 투자는 국내 상장 해외형 ETF와 해외 직접투자의 세금 차이를 비교해 볼 필요가 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">절세 전략</h2>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>손익통산</strong>: 해외주식은 같은 연도 내 수익과 손실을 상계할 수 있습니다. 연말에 손실 종목을 매도 후 재매수하여 세금을 줄이는 전략(Tax-Loss Harvesting)이 가능합니다.</li>
          <li><strong>ISA 계좌</strong>: 개인종합자산관리계좌(ISA)를 활용하면 200~400만원까지 비과세, 초과분은 9.9% 분리과세 혜택을 받을 수 있습니다.</li>
          <li><strong>연금저축·IRP</strong>: 연금저축과 IRP(개인형 퇴직연금)에서 ETF에 투자하면 연간 최대 900만원까지 세액공제(13.2~16.5%)를 받을 수 있으며, 운용 수익에 대한 과세가 인출 시까지 이연됩니다.</li>
          <li><strong>기본공제 활용</strong>: 해외주식 250만원 공제를 매년 활용하기 위해 매년 일부 차익을 실현하는 방법도 고려해 볼 수 있습니다.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">주식 수익률 계산기로 확인하기</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-4">
          매수·매도 가격을 입력하면 수수료와 세금을 반영한 실제 수익률을 계산해 드립니다.
        </p>
        <Link
          href="/daily/stock"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline"
        >
          주식 수익률 계산기 바로가기 &rarr;
        </Link>
      </Card>
    </PageLayout>
  );
}
