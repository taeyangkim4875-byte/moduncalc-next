import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FIRE 조기 은퇴 가이드 - 경제적 자유 달성 전략",
  description: "FIRE(Financial Independence, Retire Early) 개념과 실현 방법을 단계별로 설명합니다.",
  alternates: { canonical: "https://moduncalc.com/guide/fire-retirement" },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="가이드"
      title="FIRE 조기 은퇴 가이드"
      description="경제적 자유를 달성하고 조기 은퇴하기 위한 전략을 단계별로 알려드립니다."
    >
      <FaqJsonLd
        items={[
          { q: "FIRE를 달성하려면 얼마가 필요한가요?", a: "4% 룰에 따르면 연간 지출의 25배에 해당하는 자산이 필요합니다. 예를 들어 월 지출이 300만원(연 3,600만원)이라면 약 9억원의 자산이 필요합니다." },
          { q: "한국에서 FIRE가 현실적으로 가능한가요?", a: "높은 주거비와 교육비로 인해 쉽지 않지만, 저축률을 50% 이상 유지하고 투자 수익률을 확보한다면 15~20년 내 달성 가능합니다. Barista FIRE처럼 부분적 은퇴도 현실적인 대안입니다." },
          { q: "국민연금은 FIRE 계획에 어떻게 반영하나요?", a: "국민연금은 만 63~65세부터 수령 가능하므로, 조기 은퇴 후 연금 수령 시점까지의 생활비는 별도로 준비해야 합니다. 연금 수령 이후에는 필요 인출액이 줄어드는 효과가 있습니다." },
        ]}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">FIRE란?</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          FIRE는 <strong>Financial Independence, Retire Early</strong>의 약자로, 경제적 자유를 달성하여
          직장에 의존하지 않고도 생활할 수 있는 상태를 만들어 조기 은퇴하는 것을 목표로 하는
          재무 전략이자 라이프스타일 운동입니다. 핵심은 높은 저축률과 현명한 투자를 통해
          근로소득 없이도 생활비를 충당할 수 있는 수준의 자산을 빠르게 축적하는 것입니다.
          2010년대 미국에서 시작된 이 운동은 한국에서도 많은 관심을 받고 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">4% 룰 (Trinity Study)</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          4% 룰은 FIRE의 핵심 원칙으로, 미국 트리니티 대학의 연구에서 유래했습니다.
          은퇴 자산에서 매년 <strong>4%</strong>씩 인출하면 주식·채권 포트폴리오 기준으로
          <strong>30년 이상 자산이 유지</strong>될 확률이 95% 이상이라는 연구 결과입니다.
        </p>
        <div className="bg-[var(--bg-alt)] rounded-lg p-4 mb-3">
          <p className="text-sm font-bold text-center">필요 자산 = 연간 지출 x 25</p>
          <p className="text-xs text-[var(--sub)] text-center mt-1">예: 월 300만원 지출 → 연 3,600만원 → 필요 자산 9억원</p>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          다만 4% 룰은 미국 시장 데이터에 기반한 것으로, 한국 시장이나 현재 저금리 환경에서는
          3~3.5% 인출률이 더 안전하다는 의견도 있습니다. 보수적으로 계획하려면
          연간 지출의 30~33배를 목표로 하는 것이 좋습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">FIRE의 종류</h2>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-2">
          <li>
            <strong>Fat FIRE</strong>: 현재 생활 수준을 유지하거나 더 풍족하게 은퇴하는 방식입니다.
            필요 자산이 가장 크지만 삶의 질을 타협하지 않습니다. 월 지출 500만원 이상을 기준으로
            약 15억원 이상의 자산이 필요합니다.
          </li>
          <li>
            <strong>Lean FIRE</strong>: 최소한의 지출로 생활하며 빠르게 은퇴하는 방식입니다.
            극단적인 절약이 필요하지만 목표 달성 시기가 빠릅니다. 월 지출 150만원 기준
            약 4.5억원이면 가능합니다.
          </li>
          <li>
            <strong>Barista FIRE</strong>: 완전한 은퇴가 아닌 파트타임 또는 좋아하는 일로 일부 소득을
            보전하는 방식입니다. 필요 자산이 적고 사회적 연결도 유지할 수 있어 한국 상황에서
            가장 현실적인 대안입니다.
          </li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">저축률과 은퇴 시기</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          FIRE 달성까지 걸리는 시간은 소득이 아닌 <strong>저축률</strong>에 의해 결정됩니다.
          연 투자 수익률 5%(실질 수익률) 기준으로 저축률에 따른 은퇴 시기는 다음과 같습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-2 font-bold">저축률</th>
                <th className="text-right py-2 font-bold">은퇴까지 소요 기간</th>
              </tr>
            </thead>
            <tbody className="text-[var(--sub)]">
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">20%</td>
                <td className="text-right py-2">약 37년</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">30%</td>
                <td className="text-right py-2">약 28년</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">50%</td>
                <td className="text-right py-2">약 17년</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">70%</td>
                <td className="text-right py-2">약 8.5년</td>
              </tr>
              <tr>
                <td className="py-2">80%</td>
                <td className="text-right py-2">약 5.5년</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-[var(--sub)] mt-3">
          저축률 50%를 유지하면 약 17년 만에 경제적 자유에 도달할 수 있습니다.
          30세에 시작하면 47세 전후로 조기 은퇴가 가능한 셈입니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">한국에서 FIRE가 어려운 이유</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-3">
          FIRE 개념은 미국에서 시작되었기 때문에 한국 상황에 그대로 적용하기 어려운 부분이 있습니다.
        </p>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>높은 주거비</strong>: 서울 아파트 가격이 소득 대비 매우 높아 자산 축적에 큰 부담이 됩니다. 전세 제도로 인해 주거 안정에도 상당한 자금이 필요합니다.</li>
          <li><strong>자녀 교육비</strong>: 사교육비가 가계 지출에서 큰 비중을 차지하여 저축률을 높이기 어렵습니다.</li>
          <li><strong>건강보험</strong>: 은퇴 후 직장 건강보험 자격을 상실하면 지역 건강보험료를 별도로 부담해야 합니다.</li>
          <li><strong>사회적 인식</strong>: 이른 나이에 회사를 그만두는 것에 대한 사회적 시선이 부담될 수 있습니다.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">현실적인 FIRE 전략</h2>
        <ul className="text-sm leading-relaxed text-[var(--sub)] list-disc pl-5 space-y-1.5">
          <li><strong>저축률 높이기</strong>: 고정비(주거비, 보험료, 구독료)를 줄이고, 변동비(외식, 쇼핑)를 관리하여 소득의 50% 이상을 저축·투자에 할당합니다.</li>
          <li><strong>투자 수익률 확보</strong>: 장기 분산투자(글로벌 주식 ETF, 채권 등)를 통해 연 5~7%의 실질 수익률을 목표로 합니다. 개별 종목 투자보다 인덱스 펀드가 FIRE에 적합합니다.</li>
          <li><strong>소득 늘리기</strong>: 본업의 연봉 협상, 이직과 함께 부업(프리랜싱, 블로그, 유튜브 등)으로 추가 수입원을 만듭니다. 늘어난 소득은 지출을 늘리지 않고 전액 투자합니다.</li>
          <li><strong>세금 최적화</strong>: 연금저축, IRP, ISA 등 절세 계좌를 최대한 활용하여 세후 수익률을 높입니다.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">국민연금과 FIRE</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)]">
          국민연금은 현재 <strong>만 63세</strong>(1969년 이후 출생자는 만 65세)부터 수령할 수 있습니다.
          조기 은퇴 후 국민연금 수령 시점까지는 자체 자산으로 생활비를 충당해야 하므로,
          FIRE 계획 시 이 기간의 생활비를 별도로 산정해야 합니다. 국민연금 수령이 시작되면
          매달 인출해야 하는 금액이 줄어들어 자산 유지에 유리해집니다. 다만 조기 은퇴로 인해
          국민연금 납부 기간이 짧아지면 수령액도 감소하므로 임의가입을 통해 납부를 지속하는 것도
          고려할 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">FIRE 계획 세우기 - 단계별 가이드</h2>
        <ol className="text-sm leading-relaxed text-[var(--sub)] list-decimal pl-5 space-y-2">
          <li>
            <strong>현재 재무 상태 파악</strong>: 순자산(자산 - 부채), 월 소득, 월 지출을 정확히 파악합니다.
            최소 3개월간 가계부를 작성하여 지출 패턴을 분석하세요.
          </li>
          <li>
            <strong>목표 은퇴 지출 설정</strong>: 은퇴 후 월 생활비를 현실적으로 산정합니다.
            주거비, 건강보험, 여가비, 비상금 등을 포함하세요.
          </li>
          <li>
            <strong>필요 자산 계산</strong>: 연간 지출 x 25(4% 룰) 또는 x 30(보수적)으로 목표 자산을 산출합니다.
          </li>
          <li>
            <strong>저축·투자 계획 수립</strong>: 목표 자산과 현재 자산의 차이를 분석하고,
            월별 저축·투자 금액과 기대 수익률을 설정합니다.
          </li>
          <li>
            <strong>실행 및 모니터링</strong>: 매월 투자를 실행하고, 반기 또는 연 단위로 진행 상황을 점검합니다.
            시장 상황이나 생활 변화에 따라 계획을 유연하게 조정하세요.
          </li>
        </ol>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">FIRE 시뮬레이션 해보기</h2>
        <p className="text-sm leading-relaxed text-[var(--sub)] mb-4">
          현재 소득, 지출, 자산 정보를 입력하면 경제적 자유 달성 시기를 시뮬레이션할 수 있습니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/daily/fire"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline"
          >
            FIRE 계산기 바로가기 &rarr;
          </Link>
          <Link
            href="/pension/nps"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline"
          >
            국민연금 계산기 &rarr;
          </Link>
        </div>
      </Card>
    </PageLayout>
  );
}
