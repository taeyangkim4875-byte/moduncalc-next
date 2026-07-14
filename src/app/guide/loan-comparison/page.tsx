import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "원리금균등 vs 원금균등 상환 - 어떤 게 유리할까?",
  description: "대출 상환 방식의 차이와 각각의 장단점을 비교합니다.",
  alternates: { canonical: "https://moduncalc.com/guide/loan-comparison" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="원리금균등 vs 원금균등 상환"
      description="대출 상환 방식별 차이점과 총 이자 비교, 나에게 맞는 방식을 찾아보세요."
    >
      <FaqJsonLd
        items={[
          { q: "원리금균등과 원금균등 중 어떤 게 이자를 덜 내나요?", a: "총 이자 부담은 원금균등 상환이 더 적습니다. 원금을 빨리 갚아 이자 계산 기준이 되는 잔액이 빠르게 줄어들기 때문입니다. 3억원, 연 3.5%, 30년 기준 약 1,400만원 차이가 납니다." },
          { q: "거치기간이란 무엇인가요?", a: "거치기간은 원금 상환 없이 이자만 납부하는 기간입니다. 초기 상환 부담을 줄일 수 있지만, 총 이자 부담이 늘어나는 단점이 있습니다." },
          { q: "고정금리와 변동금리 중 어떤 것을 선택해야 하나요?", a: "금리 상승이 예상되면 고정금리, 금리 하락이 예상되면 변동금리가 유리합니다. 장기 대출일수록 고정금리가 안정적이며, 변동금리는 초기 금리가 낮은 대신 금리 변동 리스크가 있습니다." },
        ]}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">원리금균등 상환이란?</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          원리금균등 상환은 대출 기간 동안 <strong>매달 동일한 금액</strong>을 납부하는 방식입니다.
          월 납부금 안에 원금과 이자가 함께 포함되어 있으며, 초기에는 이자 비중이 크고 후반으로 갈수록
          원금 비중이 커집니다. 매달 같은 금액을 내기 때문에 생활비 계획을 세우기 쉽다는 장점이 있어
          주택담보대출에서 가장 많이 선택되는 상환 방식입니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">원금균등 상환이란?</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          원금균등 상환은 <strong>매달 동일한 원금</strong>에 남은 잔액에 대한 이자를 더해 납부하는 방식입니다.
          원금이 일정하게 줄어들기 때문에 이자도 점차 감소하여 월 납부금이 갈수록 줄어듭니다.
          초기 부담이 크지만 총 이자 부담이 원리금균등보다 적어, 초기 상환 여력이 충분한 분에게 적합합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">총 이자 비교 (구체적 예시)</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          대출금 <strong>3억원</strong>, 연이율 <strong>3.5%</strong>, 상환기간 <strong>30년</strong> 기준으로 비교해 보겠습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-2 font-bold">구분</th>
                <th className="text-right py-2 font-bold">원리금균등</th>
                <th className="text-right py-2 font-bold">원금균등</th>
              </tr>
            </thead>
            <tbody className="text-[var(--sub)]">
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">첫 달 납부금</td>
                <td className="text-right py-2">약 134.7만원</td>
                <td className="text-right py-2">약 170.8만원</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">마지막 달 납부금</td>
                <td className="text-right py-2">약 134.7만원</td>
                <td className="text-right py-2">약 83.6만원</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">총 이자</td>
                <td className="text-right py-2">약 1억 8,500만원</td>
                <td className="text-right py-2">약 1억 5,790만원</td>
              </tr>
              <tr>
                <td className="py-2 font-bold">이자 차이</td>
                <td colSpan={2} className="text-right py-2 font-bold text-[var(--primary)]">약 2,710만원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          원금균등 상환이 총 이자에서 약 2,710만원 유리하지만, 초기 월 납부금이 약 36만원 더 높습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">장단점 비교</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-2 font-bold">항목</th>
                <th className="text-left py-2 font-bold">원리금균등</th>
                <th className="text-left py-2 font-bold">원금균등</th>
              </tr>
            </thead>
            <tbody className="text-[var(--sub)]">
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">월 납부 안정성</td>
                <td className="py-2">매달 동일 (높음)</td>
                <td className="py-2">점차 감소 (중간)</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">초기 부담</td>
                <td className="py-2">낮음</td>
                <td className="py-2">높음</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">총 이자 부담</td>
                <td className="py-2">많음</td>
                <td className="py-2">적음</td>
              </tr>
              <tr>
                <td className="py-2">추천 대상</td>
                <td className="py-2">일정한 지출 선호</td>
                <td className="py-2">초기 여유 자금 있음</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">거치기간이란?</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          거치기간은 대출 초기에 <strong>원금 상환 없이 이자만 납부</strong>하는 기간입니다. 예를 들어
          &quot;거치 1년, 상환 29년&quot;이라면 처음 1년은 이자만 내고, 이후 29년간 원리금 또는 원금 균등으로
          상환합니다. 초기 상환 부담을 크게 줄일 수 있지만, 거치기간 동안 원금이 줄어들지 않으므로
          총 이자 부담이 늘어나는 단점이 있습니다. 소득이 점차 증가할 것으로 예상되는 사회초년생이나
          전세자금 대출에서 주로 활용됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">상황별 추천 상환 방식</h2>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>매달 일정한 지출을 원한다면</strong>: 원리금균등 상환이 적합합니다. 가계부 관리가 편리합니다.</li>
          <li><strong>총 이자를 최소화하고 싶다면</strong>: 원금균등 상환을 선택하세요. 초기 부담을 감당할 수 있다면 장기적으로 유리합니다.</li>
          <li><strong>당장 여유가 없지만 소득 증가가 예상된다면</strong>: 거치기간을 활용한 원리금균등 상환을 고려해 보세요.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">중도상환수수료 주의사항</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          대출을 조기에 상환하면 <strong>중도상환수수료</strong>가 부과될 수 있습니다. 일반적으로 대출 후
          3년 이내에 상환할 경우 잔여 원금의 0.5~1.5%가 수수료로 부과됩니다. 다만 3년이 경과한 후에는
          대부분 면제되며, 일부 은행은 연간 대출 잔액의 일정 비율까지는 수수료 없이 상환을 허용합니다.
          여유 자금이 생겼을 때 중도상환을 계획하고 있다면 대출 시 수수료 조건을 꼼꼼히 확인하세요.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">고정금리 vs 변동금리</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          <strong>고정금리</strong>는 대출 기간 내내 동일한 금리가 적용되어 이자 부담을 예측하기 쉽습니다.
          금리 상승기에 유리하며, 장기 대출에서 안정성을 제공합니다.
          <strong> 변동금리</strong>는 기준금리(COFIX, MOR 등)에 연동되어 주기적으로 금리가 변경됩니다.
          초기 금리가 고정금리보다 낮은 경우가 많지만, 금리 상승 시 이자 부담이 급증할 수 있습니다.
          최근에는 고정-변동 혼합형(5년 고정 후 변동)도 많이 활용됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">대출 상환 계산기로 확인하기</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-4">
          대출금액, 금리, 상환기간을 입력하면 상환 방식별 월 납부금과 총 이자를 비교해 드립니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/loan"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline"
          >
            대출 이자 계산기 &rarr;
          </Link>
          <Link
            href="/loan/car"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline"
          >
            자동차 할부 계산기 &rarr;
          </Link>
        </div>
      </Card>
    </PageLayout>
  );
}
