import type { Metadata } from "next";
import { KO_OPEN_GRAPH } from "@/app/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoLink } from "@/components/SeoContent";
import { SeoBarChart, SeoSampleIO } from "@/components/SeoChart";

export const metadata: Metadata = {
  title: "전기차 5년 유지비 - 내연차와 비교하면 실제로 얼마 차이 나나",
  description: "연 15,000km를 5년 타는 기준으로 전기차와 휘발유차의 연료비·자동차세·정비비를 항목별로 계산했습니다. 차값 차이를 회수하는 데 걸리는 기간까지 정리합니다.",
  alternates: { canonical: "https://moduncalc.com/guide/ev-running-cost" },
  openGraph: {
    ...KO_OPEN_GRAPH,
    title: "전기차 5년 유지비 - 내연차와 실제 차이",
    description: "연료비·자동차세·정비비를 항목별로 계산한 5년 비교.",
    url: "https://moduncalc.com/guide/ev-running-cost",
  },
};

const P = "text-sm text-[#4E5968] leading-relaxed";
const H = "text-base font-extrabold mb-3";
const BOX = "bg-[var(--bg)] rounded-xl p-3.5 flex flex-col gap-1 text-[13px] text-[var(--ink)] leading-relaxed my-3";
const UL = "pl-5 my-2 list-disc text-sm text-[#4E5968] leading-relaxed flex flex-col gap-1.5";

export default function Page() {
  return (
    <PageLayout
      eyebrow="전기차 · 보유 비용"
      title="전기차 5년 유지비"
      description="연료비만 보면 과대평가하고, 차값만 보면 과소평가합니다."
    >
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "가이드", href: "/guide" }, { name: "전기차 5년 유지비", href: "/guide/ev-running-cost" }]} />
      <FaqJsonLd items={[
        { q: "전기차와 내연차의 5년 유지비 차이는 얼마인가요?", a: "연 15,000km 주행 기준으로 연료비와 자동차세만 더하면 전기차 약 542만원, 2,000cc 휘발유차 약 1,291만원으로 5년간 약 749만원 차이가 납니다. 다만 급속 충전에 의존하면 전기차 쪽이 747만원까지 올라가 차이가 544만원으로 줄어듭니다." },
        { q: "차값이 더 비싼 건 언제 회수되나요?", a: "보조금을 반영한 뒤에도 전기차가 500만원 비싸다면, 연간 약 150만원을 절감하므로 3년 4개월쯤에 회수됩니다. 급속에만 의존하는 환경이라면 연 109만원 절감이라 4년 7개월로 늘어납니다." },
        { q: "전기차는 정비비가 더 싼가요?", a: "소모품 항목이 적습니다. 엔진오일, 미션오일, 점화플러그, 타이밍벨트, 배기 계통 정비가 없습니다. 반대로 차체가 무거워 타이어 교체 주기가 짧고, 차량 가액이 높아 자동차 보험료는 더 나올 수 있습니다." },
      ]} />

      <Card>
        <h2 className={H}>어느 쪽도 한 항목으로는 결론이 나지 않습니다</h2>
        <p className={P}>
          전기차가 유리하다는 쪽은 연료비만 말하고, 불리하다는 쪽은 차값만 말합니다. 둘 다 맞고
          둘 다 불완전합니다. <b>5년을 기준으로 항목을 모두 올려놓고 더해야</b> 비교가 됩니다.
        </p>
        <p className={P + " mt-3"}>
          이 글은 연 15,000km를 5년 타는 조건으로 연료비, 자동차세, 정비비를 각각 계산하고,
          마지막에 차값 차이를 회수하는 기간을 구합니다. 기준값은 모두 이 사이트의 계산기가
          쓰는 값과 같습니다 — 전비 5.5km/kWh, 완속 350원/kWh, 급속 500원/kWh, 내연차 연비
          12km/L, 유가 1,650원/L입니다.
        </p>
      </Card>

      <Card>
        <h2 className={H}>1. 연료비 — 차이가 가장 큰 항목</h2>
        <div className={BOX}>
          <div>연 15,000km 기준</div>
          <div>전기차 (완속 350원) → 2,727kWh · 연 954,545원</div>
          <div>전기차 (급속 500원) → 2,727kWh · 연 1,363,636원</div>
          <div>휘발유차 (12km/L) → 1,250L · 연 2,062,500원</div>
        </div>
        <p className={P}>
          완속 기준 연 1,107,955원 차이이고, <b>5년이면 5,539,773원</b>입니다. 급속에만
          의존하면 연 698,864원 차이로 줄어 5년 3,494,318원이 됩니다. 같은 차를 타도 충전
          환경에 따라 5년 절감액이 200만원 넘게 달라집니다.
        </p>
        <p className={P + " mt-3"}>
          여기에 겨울 전비 하락을 반영하면 전기차 쪽이 연 10만원 정도 더 듭니다. 자세한 계산은{" "}
          <SeoLink href="/guide/ev-winter">전기차 겨울 전비</SeoLink>에 정리해 두었습니다.
        </p>
      </Card>

      <Card>
        <h2 className={H}>2. 자동차세 — 전기차는 정액입니다</h2>
        <p className={P}>
          내연차 자동차세는 배기량에 비례합니다. 비영업용 승용은 1,000cc 이하 cc당 80원,
          1,600cc 이하 140원, 초과 200원이고 여기에 지방교육세 30%가 붙습니다. 전기차는
          배기량이 없어 <b>연 10만원 + 지방교육세 3만원 = 13만원 정액</b>입니다.
        </p>
        <div className={BOX}>
          <div>전기차 → 연 130,000원 · 5년 650,000원</div>
          <div>2,000cc 휘발유차 → 연 520,000원 · 5년 2,600,000원</div>
          <div>5년 차이 1,950,000원</div>
        </div>
        <p className={P}>
          단 <b>경형차와 비교하면 전기차가 더 비쌉니다.</b> 1,000cc 차량은 연 104,000원으로
          전기차 13만원보다 적습니다. 내 차 배기량으로 직접 보려면{" "}
          <SeoLink href="/daily/cartax">자동차세 계산기</SeoLink>를 쓰세요.
        </p>
      </Card>

      <SeoBarChart
        title="5년 보유 비용 (연료비 + 자동차세)"
        caption="연 15,000km · 5년. 전기차는 전비 5.5km/kWh와 자동차세 13만원, 내연차는 연비 12km/L·1,650원/L와 2,000cc 자동차세 52만원 기준입니다. 보험료·정비비·차값은 제외했습니다."
        unit="원"
        items={[
          { label: "전기차 (완속)", value: 5422727, highlight: true },
          { label: "전기차 (급속)", value: 7468182 },
          { label: "휘발유차 2,000cc", value: 12912500 },
        ]}
      />

      <Card>
        <h2 className={H}>3. 정비비 — 항목 수가 다릅니다</h2>
        <p className={P}>
          정비비는 운전 습관과 차종에 따라 편차가 커서 금액으로 단정하기 어렵습니다. 대신
          <b> 어떤 항목이 사라지고 어떤 항목이 늘어나는지</b>는 분명합니다.
        </p>
        <ul className={UL}>
          <li>
            <b>없어지는 것</b> — 엔진오일과 오일필터, 미션오일, 점화플러그, 타이밍벨트,
            연료필터, 배기 계통(머플러·촉매) 정비가 전기차에는 아예 없습니다. 정기 점검에서
            빠지는 항목이 그만큼 많습니다.
          </li>
          <li>
            <b>덜 쓰는 것</b> — 회생제동이 감속의 상당 부분을 담당하기 때문에 브레이크 패드와
            디스크 마모가 느립니다. 내연차보다 교체 주기가 길어지는 것이 일반적입니다.
          </li>
          <li>
            <b>더 쓰는 것</b> — 배터리 무게 때문에 공차중량이 무겁고 토크가 즉시 걸리므로
            <b> 타이어 마모가 빠릅니다.</b> 전기차 전용 타이어는 가격대도 높은 편입니다.
            타이어 교체 주기를 짧게 잡아야 현실에 맞습니다.
          </li>
          <li>
            <b>보험료</b> — 자동차 보험료는 차량 가액을 기준으로 산정되므로, 같은 급에서는
            전기차가 더 나올 수 있습니다. 보조금은 보험료 산정의 차량 가액을 낮춰주지
            않습니다.
          </li>
        </ul>
        <p className={P + " mt-3"}>
          정리하면 정비비는 전기차가 유리하지만 <b>타이어와 보험에서 일부 상쇄</b>됩니다. 위
          그래프에 정비비를 넣지 않은 이유도 이것입니다. 금액을 추정해 넣으면 결론이
          추정값에 좌우되기 때문에, 확정 계산이 가능한 연료비와 세금만으로 비교했습니다.
        </p>
      </Card>

      <SeoSampleIO
        title="차값 차이는 언제 회수되나"
        inputs={[
          { label: "보조금 반영 후 차값 차이", value: "500만원" },
          { label: "연간 연료비 절감 (완속)", value: "1,107,955원" },
          { label: "연간 자동차세 절감", value: "390,000원" },
        ]}
        outputs={[
          { label: "연간 절감액 합계", value: "1,497,955원" },
          { label: "회수 기간", value: "약 3년 4개월" },
          { label: "급속만 쓸 경우", value: "약 4년 7개월" },
        ]}
        note="차값 차이는 차종과 보조금 금액에 따라 달라집니다. 내 조건의 차값 차이를 연간 절감액으로 나누면 회수 기간이 나옵니다. 정비비와 보험료는 제외한 계산입니다."
      />

      <Card>
        <h2 className={H}>위 계산에 넣지 않은 것</h2>
        <p className={P}>
          비교를 깔끔하게 보이려고 항목을 빼면 결론이 왜곡됩니다. 그래서 <b>무엇을 넣지 않았고
          그게 어느 방향으로 작용하는지</b> 적어둡니다.
        </p>
        <ul className={UL}>
          <li>
            <b>충전기 설치비 (전기차에 불리)</b> — 집에 완속 충전기를 새로 설치하면 공사비가
            듭니다. 아파트는 단지 상황에 따라 분담 구조가 달라 금액 편차가 큽니다. 위 계산의
            연 95만원짜리 완속 요금은 <b>충전기가 이미 있다는 가정</b>입니다.
          </li>
          <li>
            <b>잔존가치 (전기차에 불리)</b> — 5년 뒤 차를 팔 때 받는 금액입니다. 중고
            전기차는 신차 보조금 때문에 시세가 눌리는 구조라 하락폭이 큰 편입니다. 보유
            비용만 보면 전기차가 유리하지만, 팔 때 손실을 더하면 격차가 줄어듭니다.
          </li>
          <li>
            <b>보험료 (전기차에 불리)</b> — 차량 가액 기준이라 같은 급에서 전기차가 더 나올 수
            있습니다. 보조금은 보험 가액을 낮춰주지 않습니다.
          </li>
          <li>
            <b>통행료·주차 할인 (전기차에 유리)</b> — 고속도로 통행료와 공영주차장 요금에
            친환경차 감면이 적용되는 경우가 있습니다. 적용 범위와 할인율이 운영 주체마다
            다르고 기한이 정해진 제도가 섞여 있어, 금액으로 환산하지 않았습니다.
          </li>
          <li>
            <b>정비비 (전기차에 유리)</b> — 위에서 본 것처럼 소모품 항목이 적습니다. 다만
            타이어에서 일부 상쇄됩니다.
          </li>
        </ul>
        <p className={P + " mt-3"}>
          빠진 항목은 전기차에 불리한 쪽이 세 개, 유리한 쪽이 두 개입니다. 즉 위 그래프의
          749만원은 <b>연료비와 세금만 놓고 본 상한선</b>이고, 실제 총 비용 격차는 그보다
          작다고 보는 쪽이 안전합니다.
        </p>
      </Card>

      <Card>
        <h2 className={H}>결론을 바꾸는 세 가지 조건</h2>
        <ul className={UL}>
          <li>
            <b>주행거리</b> — 절감액은 전부 주행거리에 비례합니다. 연 5,000km만 타는 사람은
            연료비 절감이 연 37만원 수준으로 떨어져 회수 기간이 7년 가까이 걸립니다. 반대로 연
            30,000km를 타면 2년 안에 회수됩니다. <b>많이 타는 사람일수록 전기차가 유리합니다.</b>
          </li>
          <li>
            <b>충전 환경</b> — 집 완속이 가능한지가 연 41만원을 가릅니다. 이 조건이 없으면
            위의 모든 숫자가 급속 기준으로 바뀝니다.
          </li>
          <li>
            <b>보유 기간</b> — 5년 미만으로 팔 계획이면 유지비 절감보다 중고 가격 하락폭이
            결과를 좌우합니다. 그리고 보조금을 받은 차는 의무운행기간이 있어 단기 매도 자체가
            제약됩니다. <SeoLink href="/guide/ev-resale">전기차 중고 가격과 배터리 보증</SeoLink>에
            따로 정리했습니다.
          </li>
        </ul>
      </Card>

      <Card>
        <h2 className={H}>함께 보면 좋은 계산기</h2>
        <p className={P}>
          내 주행거리와 전비로 직접 계산하려면{" "}
          <SeoLink href="/daily/ev">전기차 전비 계산기</SeoLink>와{" "}
          <SeoLink href="/daily/fuel">자동차 연비 계산기</SeoLink>를 나란히 쓰면 됩니다.
          연간 세금은 <SeoLink href="/daily/cartax">자동차세 계산기</SeoLink>에서 cc만 넣으면
          나오고, 집 충전이 전기요금 구간을 바꾸는지는{" "}
          <SeoLink href="/daily/electric">전기요금 계산기</SeoLink>에서 확인하세요.
          충전 단가 구조는{" "}
          <SeoLink href="/guide/ev-charging-cost">전기차 충전 요금 정리</SeoLink>에 있습니다.
        </p>
      </Card>
    </PageLayout>
  );
}
