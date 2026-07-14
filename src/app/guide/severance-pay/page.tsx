import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "퇴직금 계산법 완전 정리 - 지급 기준·세금·청구 방법",
  description: "퇴직금 지급 조건, 계산법, 세금, 미지급 시 대처법을 상세 설명합니다.",
  alternates: { canonical: "https://moduncalc.com/guide/severance-pay" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="퇴직금 계산법 완전 정리"
      description="지급 기준부터 세금, 청구 방법까지 퇴직금의 모든 것을 알려드립니다."
    >
      <FaqJsonLd
        items={[
          { q: "퇴직금은 언제 받을 수 있나요?", a: "1년 이상 근무하고 주 15시간 이상 일한 근로자라면 퇴직 시 퇴직금을 받을 수 있습니다. 사용자는 퇴직일로부터 14일 이내에 지급해야 합니다." },
          { q: "퇴직금에 세금이 얼마나 붙나요?", a: "퇴직소득세가 부과되며, 근속연수공제와 환산급여를 기반으로 세율이 결정됩니다. 근속연수가 길수록 세금 부담이 줄어듭니다." },
          { q: "퇴직금을 안 주면 어떻게 하나요?", a: "고용노동부에 진정(신고)을 접수할 수 있습니다. 사업주가 퇴직금을 미지급하면 3년 이하 징역 또는 3천만원 이하 벌금에 처해질 수 있습니다." },
        ]}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">퇴직금이란?</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          퇴직금은 근로자가 일정 기간 이상 근무한 뒤 퇴직할 때 사용자가 지급해야 하는 금전적 보상입니다.
          <strong>근로기준법 제34조</strong>와 <strong>근로자퇴직급여 보장법</strong>에 법적 근거를 두고 있으며,
          근로자의 노후 생활 보장을 위한 중요한 제도입니다. 정규직뿐 아니라 계약직, 아르바이트생도 요건을
          충족하면 퇴직금을 받을 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">퇴직금 지급 조건</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          퇴직금을 받으려면 다음 두 가지 조건을 모두 충족해야 합니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>1년 이상 계속 근무</strong>: 입사일부터 퇴사일까지 1년 이상 근무한 경우에 해당합니다. 수습기간도 근속연수에 포함됩니다.</li>
          <li><strong>주 15시간 이상 근무</strong>: 4주간을 평균하여 1주간의 소정근로시간이 15시간 이상이어야 합니다. 주 15시간 미만 초단시간 근로자는 퇴직금 대상에서 제외됩니다.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">퇴직금 계산 공식</h2>
        <div className="bg-[var(--bg-alt)] rounded-lg p-4 mb-3">
          <p className="text-sm font-bold text-center">퇴직금 = 1일 평균임금 x 30일 x (총 재직일수 / 365)</p>
        </div>
        <h3 className="text-sm font-bold mt-4 mb-2">평균임금 산정 방법</h3>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          평균임금은 퇴직일 이전 <strong>3개월간 지급받은 총 급여</strong>를 해당 기간의 <strong>총 일수</strong>로 나누어
          계산합니다. 예를 들어 최근 3개월 총급여가 900만원이고 총 일수가 92일이라면, 1일 평균임금은
          약 97,826원이 됩니다.
        </p>
        <h3 className="text-sm font-bold mt-4 mb-2">상여금, 연차수당 포함 여부</h3>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          정기적·일률적으로 지급되는 <strong>상여금</strong>은 평균임금 산정에 포함됩니다. 다만 3개월을 초과하는
          기간에 걸쳐 지급되는 상여금은 3개월분으로 환산하여 포함합니다. <strong>미사용 연차수당</strong>도
          퇴직일 전 1년 이내에 발생한 것이라면 평균임금에 포함됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">퇴직소득세 계산</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          퇴직금에는 퇴직소득세가 부과됩니다. 일반 근로소득세와는 다른 별도의 세율 체계를 적용받으며,
          근속연수가 길수록 세금 부담이 줄어드는 구조입니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>근속연수공제</strong>: 근속연수에 따라 일정 금액을 퇴직금에서 공제합니다. 5년 이하는 연 100만원, 10년 이하는 연 200만원 등으로 단계적으로 증가합니다.</li>
          <li><strong>환산급여</strong>: 공제 후 금액을 근속연수로 나눈 뒤 12를 곱해 연간 환산급여를 구하고, 이에 세율을 적용합니다.</li>
          <li>최종 퇴직소득세는 환산 세율을 적용한 금액에 근속연수를 다시 곱하여 산출합니다.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">퇴직금 중간정산</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          퇴직금 중간정산은 원칙적으로 금지되어 있으나, <strong>주택 구입·전세금 마련, 6개월 이상 요양,
          파산 선고</strong> 등 법정 사유에 해당하면 예외적으로 가능합니다. 중간정산을 받으면 해당 시점까지의
          근속연수가 초기화되므로 퇴직소득세 측면에서 불리해질 수 있어 신중한 판단이 필요합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">DC형 vs DB형 퇴직연금</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          퇴직연금은 크게 <strong>확정급여형(DB)</strong>과 <strong>확정기여형(DC)</strong>으로 나뉩니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>DB형</strong>: 퇴직 시 받을 급여가 사전에 정해져 있습니다. 퇴직 직전 3개월 평균임금 기준으로 산정하므로 임금 상승이 꾸준한 근로자에게 유리합니다.</li>
          <li><strong>DC형</strong>: 매년 연간 임금 총액의 1/12 이상을 사용자가 근로자 계좌에 납입합니다. 근로자가 직접 운용하므로 투자 수익에 따라 퇴직금이 달라집니다.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">퇴직금 미지급 시 대처법</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          사용자는 퇴직일로부터 <strong>14일 이내</strong>에 퇴직금을 지급해야 합니다. 특별한 사유 없이
          기한 내 지급하지 않으면 지연 이자(연 20%)가 발생합니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>1단계</strong>: 사업주에게 퇴직금 지급을 서면으로 요청합니다.</li>
          <li><strong>2단계</strong>: 관할 고용노동부(지방고용노동청)에 <strong>진정(신고)</strong>을 접수합니다. 온라인 민원 접수도 가능합니다.</li>
          <li><strong>3단계</strong>: 노동부 조사 후에도 미지급 시 민사소송을 통해 청구할 수 있습니다.</li>
        </ul>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          퇴직금 미지급은 근로기준법 위반으로 <strong>3년 이하 징역 또는 3천만원 이하 벌금</strong>에
          처해질 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">퇴직금 계산기로 바로 확인하기</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-4">
          입사일, 퇴사일, 월급 정보만 입력하면 예상 퇴직금을 자동으로 계산해 드립니다.
        </p>
        <Link
          href="/salary/severance"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline"
        >
          퇴직금 계산기 바로가기 &rarr;
        </Link>
      </Card>
    </PageLayout>
  );
}
