import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "주식·ETF 세금 총정리 - 양도세·배당세·금투세 (2026)",
  description: "주식 투자 시 발생하는 각종 세금을 초보자도 이해하기 쉽게 정리합니다.",
  alternates: { canonical: "https://moduncalc.com/guide/investment-tax" },
  openGraph: {
    title: "주식·ETF 세금 총정리 - 양도세·배당세·금투세 (2026)",
    description: "주식 투자 시 발생하는 각종 세금을 초보자도 이해하기 쉽게 정리합니다.",
    url: "https://moduncalc.com/guide/investment-tax",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="주식·ETF 세금 총정리 (2026)"
      description="양도소득세, 배당소득세, 증권거래세까지 투자 세금의 모든 것을 알려드립니다."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '가이드', href: '/guide' }, { name: 'investment-tax', href: '/guide/investment-tax' }]} />
      <FaqJsonLd
        items={[
          { q: "국내 주식 매매 시 세금은 얼마나 내나요?", a: "일반 개인투자자는 매도할 때 증권거래세만 부담합니다. 2026년 1월 1일부터 세율이 올라 코스피는 증권거래세 0.05%에 농어촌특별세 0.15%를 더해 0.20%, 코스닥과 K-OTC는 0.20%, 코넥스는 0.10%입니다. 대주주에 해당하면 양도소득세 22~27.5%가 추가로 과세됩니다." },
          { q: "해외주식 양도소득세는 어떻게 계산하나요?", a: "해외주식은 연간 양도차익에서 250만원을 공제한 후 22%(지방세 포함)의 세율로 과세됩니다. 매년 5월에 확정신고·납부해야 합니다." },
          { q: "배당소득세는 어떻게 부과되나요?", a: "배당소득에 대해 14%의 소득세와 1.4%의 지방소득세, 총 15.4%가 원천징수됩니다. 금융소득이 연간 2,000만원을 초과하면 종합과세 대상이 됩니다." },
        ]}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">증권거래세 (2026년 기준)</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          증권거래세는 주식을 <strong>매도(팔 때)</strong>할 때 부과되는 세금입니다.
          매수(살 때)에는 부과되지 않습니다. 2026년 1월 1일부터 탄력세율이 일부 환원되어 세율이 올랐습니다.
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
                <td className="text-right py-2">0.05%</td>
                <td className="text-right py-2">0.15%</td>
                <td className="text-right py-2">0.20%</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">코스닥</td>
                <td className="text-right py-2">0.20%</td>
                <td className="text-right py-2">-</td>
                <td className="text-right py-2">0.20%</td>
              </tr>
              <tr>
                <td className="py-2">K-OTC</td>
                <td className="text-right py-2">0.20%</td>
                <td className="text-right py-2">-</td>
                <td className="text-right py-2">0.20%</td>
              </tr>
              <tr>
                <td className="py-2">코넥스</td>
                <td className="text-right py-2">0.10%</td>
                <td className="text-right py-2">-</td>
                <td className="text-right py-2">0.10%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          금융투자소득세 도입을 전제로 단계적으로 내려가 2025년에는 코스피 실효세율이 농어촌특별세 0.15%뿐이었지만, 금투세가 폐지되면서 2026년부터 순수 증권거래세가 다시 붙었습니다. 코스피는 0.15%에서 0.20%로, 코스닥은 0.15%에서 0.20%로 각각 0.05%p 올랐습니다. 1,000만원어치를 매도하면 2만원이 거래세로 빠지는 셈입니다.
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
          합산 시 세부담이 얼마나 늘어나는지는{" "}
          <Link href="/tax/income" className="text-[var(--primary)] font-bold hover:underline">종합소득세 계산기</Link>에
          근로소득과 금융소득을 합한 금액을 넣어 미리 확인해 볼 수 있습니다.
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
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          예금·적금 이자에도 같은 15.4%가 적용되므로, 세금우대나 비과세 상품을 활용하면 체감 수익률이 달라집니다.{" "}
          <Link href="/savings/interest" className="text-[var(--primary)] font-bold hover:underline">적금 이자 계산기</Link>에서
          과세 유형별 세후 수령액을 비교해 보고, 부동산 매각 차익이 있다면{" "}
          <Link href="/realestate/transfer" className="text-[var(--primary)] font-bold hover:underline">양도소득세 계산기</Link>도 함께 확인하세요.
        </p>
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

      <Card>
        <h2 className="text-base font-extrabold mb-3">국내주식과 해외주식, 세금이 이렇게 다릅니다</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-2 font-bold">구분</th>
                <th className="text-left py-2 font-bold">국내 상장주식</th>
                <th className="text-left py-2 font-bold">해외주식</th>
              </tr>
            </thead>
            <tbody className="text-[var(--sub)]">
              <tr className="border-b border-[var(--border)]"><td className="py-2">매매차익</td><td className="py-2">비과세 (대주주 제외)</td><td className="py-2">22% 양도소득세</td></tr>
              <tr className="border-b border-[var(--border)]"><td className="py-2">기본공제</td><td className="py-2">해당 없음</td><td className="py-2">연 250만원</td></tr>
              <tr className="border-b border-[var(--border)]"><td className="py-2">손익통산</td><td className="py-2">해당 없음</td><td className="py-2">같은 해 손실과 상계 가능</td></tr>
              <tr className="border-b border-[var(--border)]"><td className="py-2">거래세</td><td className="py-2">매도 시 0.20%</td><td className="py-2">없음 (현지 수수료 별도)</td></tr>
              <tr className="border-b border-[var(--border)]"><td className="py-2">배당</td><td className="py-2">15.4% 원천징수</td><td className="py-2">현지 원천징수 후 차액 정산</td></tr>
              <tr><td className="py-2">신고</td><td className="py-2">불필요</td><td className="py-2">매년 5월 확정신고</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          핵심 차이는 <strong>국내주식은 신고가 필요 없고, 해외주식은 본인이 직접 신고해야 한다</strong>는 점입니다.
          증권사가 대행 신고 서비스를 제공하는 경우가 많지만, 여러 증권사를 쓴다면
          <strong> 전체를 합산해 본인이 신고</strong>해야 합니다. 신고를 빠뜨리면 무신고가산세 20%가 붙습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">해외주식 절세: 손익통산과 250만원 공제</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          해외주식 양도세는 <strong>같은 해에 실현한 손익을 모두 합산</strong>해서 계산합니다.
          이 점을 이용하면 세금을 합법적으로 줄일 수 있습니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li>
            <strong>손실 종목을 연내에 정리하세요.</strong> A종목에서 1,000만원 이익, B종목에서 400만원 평가손실이 있다면,
            B를 그해에 매도해 손실을 확정하면 과세 대상이 600만원으로 줄어듭니다.
            여기서 250만원을 공제하면 350만원에만 22%가 붙습니다. 손실을 확정하지 않았다면 (1,000만원 − 250만원) × 22% = 165만원을 냈을 텐데, 77만원으로 줄어듭니다.
          </li>
          <li>
            <strong>250만원 공제는 해마다 리셋됩니다.</strong> 이월되지 않으므로,
            큰 차익을 한 해에 몰아 실현하는 것보다 여러 해에 나눠 실현하면 매년 250만원씩 공제를 받습니다.
          </li>
          <li>
            <strong>기준은 결제일입니다.</strong> 해외주식은 매도 후 결제까지 영업일이 걸리므로,
            12월 말에 파는 경우 결제가 다음 해로 넘어가 의도한 연도에 반영되지 않을 수 있습니다.
            연말 절세 매도는 12월 중순까지 끝내는 것이 안전합니다.
          </li>
          <li>
            <strong>환율도 손익에 들어갑니다.</strong> 양도차익은 매도일 환율로 원화 환산한 금액에서
            매수일 환율로 환산한 금액을 뺀 값입니다. 달러 기준으로 손해를 봤어도
            환율이 크게 올랐다면 원화 기준으로는 이익이 나 세금이 발생할 수 있습니다.
          </li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">ISA 계좌를 먼저 쓰는 이유</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          ISA(개인종합자산관리계좌)는 <strong>계좌 안에서 발생한 이자·배당과 손익을 통산</strong>한 뒤
          일정 금액까지 비과세하고, 초과분은 <strong>9.9%로 분리과세</strong>하는 절세 계좌입니다.
          일반 계좌의 15.4%와 비교하면 차이가 큽니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>비과세 한도</strong> — 일반형 200만원, 서민형·농어민형 400만원. 의무가입기간 3년을 채워야 혜택이 유지됩니다.</li>
          <li><strong>분리과세</strong> — 한도 초과분은 9.9%로 끝나고 금융소득종합과세에 합산되지 않습니다. 금융소득이 연 2,000만원에 가까운 분에게 특히 유리합니다.</li>
          <li><strong>손익통산</strong> — 일반 계좌에서는 A상품 이익에 세금을 내고 B상품 손실은 그냥 손실이지만, ISA 안에서는 서로 상계됩니다.</li>
          <li><strong>만기 자금의 연금 전환</strong> — 만기 자금을 연금계좌로 옮기면 추가 세액공제를 받을 수 있습니다.</li>
        </ul>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          다만 ISA에서는 해외 상장주식을 직접 매매할 수 없고, 국내 상장된 해외형 ETF 등으로 담아야 합니다.
          국내주식 매매차익은 어차피 비과세이므로,
          <strong> ISA는 이자·배당이 나오는 상품과 과세되는 ETF를 담을 때 효과가 큽니다.</strong>
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">금융소득종합과세 2,000만원 선</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          이자와 배당을 합친 금융소득이 한 해 <strong>2,000만원</strong>을 넘으면,
          초과분이 다른 소득과 합산되어 종합소득세율(6~45%)로 과세됩니다.
          15.4% 원천징수로 끝나던 것이 최고 49.5%(지방세 포함)까지 올라갈 수 있습니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>해외주식 양도차익은 포함되지 않습니다.</strong> 양도소득으로 분류되어 따로 과세되기 때문입니다.</li>
          <li><strong>배당 지급 시기를 조절</strong>하거나, 부부가 자산을 나눠 각자 2,000만원 한도를 쓰는 방법이 있습니다.</li>
          <li>건강보험 지역가입자라면 금융소득이 보험료 산정에도 반영되므로, 세금 외의 부담도 함께 따져야 합니다.</li>
        </ul>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          예금 금리 3.5% 기준으로 약 5억 7천만원을 예치했을 때 나오는 수준이라
          대부분의 개인 투자자에게는 해당되지 않지만, 퇴직금을 한꺼번에 예치한 경우 등에서는 넘길 수 있습니다.
        </p>
      </Card>
    </PageLayout>
  );
}
