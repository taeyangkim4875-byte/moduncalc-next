import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "2026 최저시급 완전 정리 - 주휴수당·월급·연봉 환산",
  description: "2026년 최저시급과 주휴수당, 월급 계산법을 상세히 알려드립니다.",
  alternates: { canonical: "https://moduncalc.com/guide/minimum-wage" },
  openGraph: {
    title: "2026 최저시급 완전 정리 - 주휴수당·월급·연봉 환산",
    description: "2026년 최저시급과 주휴수당, 월급 계산법을 상세히 알려드립니다.",
    url: "https://moduncalc.com/guide/minimum-wage",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="2026 최저시급 완전 정리"
      description="주휴수당, 월급, 연봉 환산까지 최저임금의 모든 것을 알려드립니다."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '가이드', href: '/guide' }, { name: 'minimum-wage', href: '/guide/minimum-wage' }]} />
      <FaqJsonLd
        items={[
          { q: "2026년 최저시급은 얼마인가요?", a: "2026년 최저시급은 10,320원입니다. 2025년 10,030원 대비 290원(약 2.9%) 인상되었습니다." },
          { q: "주휴수당 포함하면 실질 시급은 얼마인가요?", a: "주 40시간 근무 기준, 주휴수당을 포함한 실질 시급은 약 12,384원입니다. 주휴 8시간분이 추가로 지급되기 때문입니다." },
          { q: "수습기간에도 최저시급을 받나요?", a: "1년 이상 근로계약을 체결한 경우, 수습 시작일부터 3개월간 최저임금의 90%(9,288원)를 적용할 수 있습니다. 단순노무직은 감액 적용이 불가합니다." },
        ]}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">2026년 최저시급</h2>
        <div className="bg-[var(--bg-alt)] rounded-lg p-4 mb-3 text-center">
          <p className="text-2xl font-extrabold text-[var(--primary)]">10,320원</p>
          <p className="text-xs text-[var(--sub)] mt-1">2026년 1월 1일부터 12월 31일까지 적용</p>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          최저임금위원회의 심의를 거쳐 결정된 2026년 최저시급은 <strong>10,320원</strong>입니다.
          전년도 10,030원 대비 290원(약 2.9%) 인상되었습니다. 최저임금은 업종이나 지역에 관계없이
          모든 사업장에 동일하게 적용되며, 정규직, 비정규직, 아르바이트 등 고용 형태와 무관하게
          모든 근로자에게 적용됩니다.
        </p>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          참고로 <strong>2027년 최저시급은 10,700원</strong>으로 이미 확정되었습니다. 2026년 대비 380원(약 3.7%) 인상된
          금액으로 2027년 1월 1일부터 적용됩니다. 두 연도를 나란히 비교하려면{" "}
          <Link href="/salary/minimum" className="text-[var(--primary)] font-bold hover:underline">최저시급 계산기</Link>에서
          연도별 월급·연봉 환산표를 확인할 수 있습니다.
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
          <p className="text-sm mt-1"><strong>주당 총 급여</strong> = 10,320원 x 48시간 = 495,360원</p>
          <p className="text-sm mt-1"><strong>실질 시급(주휴 포함)</strong> = 495,360원 / 40시간 = <strong>약 12,384원</strong></p>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          즉, 사용자 입장에서 실제 지출하는 시간당 인건비는 약 12,384원이며,
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
          <p className="text-sm mt-1"><strong>월급</strong> = 10,320원 x 209시간 = <strong>약 2,156,880원</strong></p>
          <p className="text-sm mt-1"><strong>연봉</strong> = 2,156,880원 x 12개월 = <strong>약 25,882,560원</strong></p>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          위 금액은 세전 기준이며, 4대 보험료와 소득세를 공제하면 실수령액은 이보다 적어집니다.
          최저시급 기준 월 실수령액은 약 196만원 내외입니다. 공제 내역을 항목별로 뜯어보려면{" "}
          <Link href="/salary" className="text-[var(--primary)] font-bold hover:underline">연봉 실수령액 계산기</Link>에,
          공제의 근거가 되는 요율은 <Link href="/guide/4-insurance" className="text-[var(--primary)] font-bold hover:underline">4대보험 완전 정리</Link>에 자세히 정리되어 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">수습기간 급여 감액</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          <strong>1년 이상의 근로계약</strong>을 체결한 경우, 수습 시작일로부터 <strong>3개월간</strong> 최저임금의
          <strong>90%</strong>를 적용할 수 있습니다. 2026년 기준 수습기간 시급은 <strong>9,288원</strong>(2027년은 9,630원)입니다.
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

      <Card>
        <h2 className="text-base font-extrabold mb-3">주휴수당, 요건과 계산법</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          최저임금 이야기에서 가장 많이 빠뜨리는 것이 <strong>주휴수당</strong>입니다.
          주 15시간 이상 일하고 그 주의 소정근로일을 모두 개근하면,
          일하지 않은 하루치 임금을 추가로 받습니다. 법정 수당이라 주지 않으면 임금 체불입니다.
        </p>
        <div className="bg-[var(--bg-alt)] rounded-lg p-4 mb-3">
          <p className="text-sm font-bold text-center">주휴수당 = (1주 소정근로시간 ÷ 40) × 8 × 시급</p>
        </div>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>주 40시간 근무</strong> — 8시간분이 추가됩니다. 2026년 최저시급 10,320원 기준 82,560원.</li>
          <li><strong>주 20시간 근무</strong> — (20 ÷ 40) × 8 = 4시간분, 41,280원이 추가됩니다.</li>
          <li><strong>주 15시간 미만</strong> — 주휴수당이 발생하지 않습니다. 사업주가 주 14시간으로 계약을 쪼개는 이유가 여기 있습니다.</li>
        </ul>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          주휴수당을 포함하면 주 40시간 근로자의 <strong>실질 시급은 약 12,384원</strong>입니다.
          48시간분(40시간 + 주휴 8시간)을 받으면서 실제로는 40시간만 일하기 때문입니다.
          아르바이트 공고에 &ldquo;주휴수당 포함 시급&rdquo;이라고 적혀 있다면 이 금액과 비교해 보세요.
          월 209시간 기준 월급 2,156,880원에도 주휴시간이 이미 포함되어 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">수습 감액, 아무에게나 적용되지 않습니다</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          수습기간에 최저임금의 90%까지 감액할 수 있다는 규정은 조건이 꽤 까다롭습니다.
          아래를 <strong>모두</strong> 충족해야 합니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>근로계약 기간이 1년 이상</strong>이어야 합니다. 6개월 계약직에는 적용할 수 없습니다.</li>
          <li><strong>수습 시작일부터 3개월 이내</strong>에만 가능합니다. 4개월째부터는 전액 지급해야 합니다.</li>
          <li><strong>단순노무업무 종사자는 제외</strong>됩니다. 고용노동부가 고시한 단순노무 직종(배달원, 청소원, 주방보조 등)은 수습이라도 감액할 수 없습니다.</li>
        </ul>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          2026년 기준 감액 적용 시 시급은 <strong>9,288원</strong>(10,320원의 90%)입니다.
          편의점·카페 아르바이트 상당수가 단순노무에 해당해 감액 대상이 아닌데도
          &ldquo;수습이라 90%&rdquo;라고 하는 경우가 있으니, 본인 직무가 고시 목록에 있는지 확인해 보세요.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">내 시급이 최저임금 위반인지 보는 법</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          시급제라면 단순 비교로 끝나지만, 월급제는 <strong>최저임금에 산입되는 항목만 추려서</strong>
          월 소정근로시간으로 나눠야 합니다. 2024년부터 상여금과 복리후생비는 전액 산입됩니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>산입되는 것</strong> — 기본급, 매월 지급되는 정기상여금 전액, 식대·교통비 등 복리후생비 전액.</li>
          <li><strong>산입되지 않는 것</strong> — 연장·야간·휴일근로수당, 연차수당, 매월 지급되지 않는 상여금.</li>
        </ul>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          예를 들어 월 220만원을 받지만 그중 40만원이 고정 연장근로수당이라면,
          최저임금 판단에 쓰이는 금액은 180만원입니다.
          209시간으로 나누면 시급 약 8,612원이 되어 2026년 최저시급에 미달합니다.
          <strong>총액이 아니라 구성</strong>을 봐야 하는 이유입니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">위반이 확인됐을 때</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          최저임금법 위반은 <strong>3년 이하 징역 또는 2,000만원 이하 벌금</strong> 대상입니다.
          최저임금에 못 미치는 금액으로 정한 근로계약은 그 부분이 무효가 되고,
          최저임금과 같은 금액으로 지급한 것으로 봅니다. 즉 차액을 청구할 수 있습니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>증거부터 모으세요.</strong> 근로계약서, 급여명세서, 출퇴근 기록(앱 기록·메신저 대화도 유효), 입금 내역을 남겨두세요.</li>
          <li><strong>고용노동부에 진정</strong>을 넣습니다. 고용노동부 홈페이지나 노동포털에서 온라인으로 접수할 수 있고, 관할 지청 방문도 가능합니다.</li>
          <li><strong>소멸시효는 3년</strong>입니다. 이미 퇴사했더라도 3년 이내의 임금 차액은 청구할 수 있습니다.</li>
          <li>상담이 필요하면 <strong>고용노동부 고객상담센터(☎ 1350)</strong>를 이용하세요. 익명 상담도 가능합니다.</li>
        </ul>
      </Card>
    </PageLayout>
  );
}
