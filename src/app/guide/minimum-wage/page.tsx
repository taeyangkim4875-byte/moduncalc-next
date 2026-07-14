import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "2026 최저시급 완전 정리 - 주휴수당·월급·연봉 환산",
  description: "2026년 최저시급과 주휴수당, 월급 계산법을 상세히 알려드립니다.",
  alternates: { canonical: "https://moduncalc.com/guide/minimum-wage" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="2026 최저시급 완전 정리"
      description="주휴수당, 월급, 연봉 환산까지 최저임금의 모든 것을 알려드립니다."
    >
      <FaqJsonLd
        items={[
          { q: "2026년 최저시급은 얼마인가요?", a: "2026년 최저시급은 10,030원입니다. 전년 대비 약 1.7% 인상되었습니다." },
          { q: "주휴수당 포함하면 실질 시급은 얼마인가요?", a: "주 40시간 근무 기준, 주휴수당을 포함한 실질 시급은 약 12,036원입니다. 주휴 8시간분이 추가로 지급되기 때문입니다." },
          { q: "수습기간에도 최저시급을 받나요?", a: "1년 이상 근로계약을 체결한 경우, 수습 시작일부터 3개월간 최저임금의 90%(9,027원)를 적용할 수 있습니다. 단순노무직은 감액 적용이 불가합니다." },
        ]}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">2026년 최저시급</h2>
        <div className="bg-[var(--bg-alt)] rounded-lg p-4 mb-3 text-center">
          <p className="text-2xl font-extrabold text-[var(--primary)]">10,030원</p>
          <p className="text-xs text-[var(--sub)] mt-1">2026년 1월 1일부터 12월 31일까지 적용</p>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          최저임금위원회의 심의를 거쳐 결정된 2026년 최저시급은 <strong>10,030원</strong>입니다.
          전년도 9,860원 대비 170원(약 1.7%) 인상되었습니다. 최저임금은 업종이나 지역에 관계없이
          모든 사업장에 동일하게 적용되며, 정규직, 비정규직, 아르바이트 등 고용 형태와 무관하게
          모든 근로자에게 적용됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">주휴수당이란?</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          주휴수당은 <strong>1주 동안 소정근로일을 모두 출근</strong>한 근로자에게 지급하는 유급 휴일 수당입니다.
          근로기준법 제55조에 따라 사용자는 1주에 평균 1회 이상의 유급 휴일을 보장해야 합니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>지급 조건</strong>: 1주 소정근로시간이 15시간 이상이어야 합니다.</li>
          <li><strong>계산 방식</strong>: 1일 소정근로시간 x 시급으로 산정합니다. 주 40시간(일 8시간) 근무자는 8시간분의 주휴수당을 받습니다.</li>
          <li>아르바이트생도 주 15시간 이상 근무하고 개근했다면 반드시 주휴수당을 받아야 합니다.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">주휴수당 포함 시급 계산</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          주 40시간(주 5일, 일 8시간) 근무 기준으로 주휴수당을 포함한 실질 시급을 계산해 보겠습니다.
        </p>
        <div className="bg-[var(--bg-alt)] rounded-lg p-4 mb-3">
          <p className="text-sm"><strong>주당 총 유급시간</strong> = 근로 40시간 + 주휴 8시간 = 48시간</p>
          <p className="text-sm mt-1"><strong>주당 총 급여</strong> = 10,030원 x 48시간 = 481,440원</p>
          <p className="text-sm mt-1"><strong>실질 시급(주휴 포함)</strong> = 481,440원 / 40시간 = <strong>약 12,036원</strong></p>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          즉, 사용자 입장에서 실제 지출하는 시간당 인건비는 약 12,036원이며,
          근로자 입장에서도 주휴수당을 포함하면 실질적으로 이 금액을 수령하는 셈입니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">최저시급 월급·연봉 환산</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          주 40시간(주 5일) 근무 기준으로 최저시급을 월급과 연봉으로 환산하면 다음과 같습니다.
        </p>
        <div className="bg-[var(--bg-alt)] rounded-lg p-4 mb-3">
          <p className="text-sm"><strong>월 소정근로시간</strong> = (40시간 + 주휴 8시간) x 4.345주 = 약 209시간</p>
          <p className="text-sm mt-1"><strong>월급</strong> = 10,030원 x 209시간 = <strong>약 2,096,270원</strong></p>
          <p className="text-sm mt-1"><strong>연봉</strong> = 2,096,270원 x 12개월 = <strong>약 25,155,240원</strong></p>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          위 금액은 세전 기준이며, 4대 보험료와 소득세를 공제하면 실수령액은 이보다 적어집니다.
          최저시급 기준 월 실수령액은 약 190만원 내외입니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">수습기간 급여 감액</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          <strong>1년 이상의 근로계약</strong>을 체결한 경우, 수습 시작일로부터 <strong>3개월간</strong> 최저임금의
          <strong>90%</strong>를 적용할 수 있습니다. 2026년 기준 수습기간 시급은 <strong>9,027원</strong>입니다.
          다만, 단순노무업무(청소, 경비, 주유원 등)로 고용노동부장관이 고시한 직종은 감액 적용이
          불가능하며 처음부터 100% 최저시급을 지급해야 합니다. 또한 1년 미만의 기간제 근로계약인 경우에도
          수습 감액이 적용되지 않습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">최저임금 위반 시 처벌</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          최저임금법 제28조에 따라, 최저임금에 미달하는 임금을 지급한 사용자는 <strong>3년 이하의 징역 또는
          2,000만원 이하의 벌금</strong>에 처해질 수 있습니다. 이는 반의사불벌죄가 아니므로 근로자가
          처벌을 원하지 않더라도 형사 처벌이 가능합니다.
        </p>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          최저임금에 미달하는 근로계약은 해당 부분에 한해 무효가 되며, 무효가 된 부분은
          최저임금으로 정한 것과 같은 효력이 발생합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">알바생이 알아야 할 권리</h2>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>근로계약서 작성</strong>: 사업주는 반드시 서면 근로계약서를 작성하고 교부해야 합니다. 미작성 시 500만원 이하 벌금.</li>
          <li><strong>야간·휴일 가산수당</strong>: 밤 10시~아침 6시 근무(야간), 휴일 근무 시 통상시급의 50% 가산.</li>
          <li><strong>주휴수당</strong>: 주 15시간 이상 근무하고 개근 시 반드시 지급받아야 합니다.</li>
          <li><strong>해고 예고</strong>: 30일 전 해고 예고 또는 30일분 해고예고수당 지급 의무.</li>
          <li><strong>임금 체불 신고</strong>: 고용노동부 임금체불 신고(전화 1350) 또는 온라인 민원 접수 가능.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">최저시급 계산기로 확인하기</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-4">
          근무시간과 근무일수를 입력하면 주휴수당 포함 예상 급여를 자동으로 계산해 드립니다.
        </p>
        <Link
          href="/salary/minimum"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline"
        >
          최저시급 계산기 바로가기 &rarr;
        </Link>
      </Card>
    </PageLayout>
  );
}
