import type { Metadata } from "next";
import { KO_OPEN_GRAPH } from "@/app/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoLink } from "@/components/SeoContent";
import { SeoBarChart } from "@/components/SeoChart";

export const metadata: Metadata = {
  title: "전기차 충전 요금 완전 정리 - 완속·공용·급속 단가와 100km당 비용",
  description: "전기차 충전비는 어디서 충전하느냐로 결정됩니다. 완속·공용·급속 단가, 100km당 실제 비용, 집 충전 시 전기요금 누진 구간까지 계산해 정리했습니다.",
  alternates: { canonical: "https://moduncalc.com/guide/ev-charging-cost" },
  openGraph: {
    ...KO_OPEN_GRAPH,
    title: "전기차 충전 요금 완전 정리 - 100km당 얼마인가",
    description: "완속·공용·급속 단가별 100km 비용과, 집 충전이 누진 구간에 미치는 영향.",
    url: "https://moduncalc.com/guide/ev-charging-cost",
  },
};

const P = "text-sm text-[#4E5968] leading-relaxed";
const H = "text-base font-extrabold mb-3";
const BOX = "bg-[var(--bg)] rounded-xl p-3.5 flex flex-col gap-1 text-[13px] text-[var(--ink)] leading-relaxed my-3";
const UL = "pl-5 my-2 list-disc text-sm text-[#4E5968] leading-relaxed flex flex-col gap-1.5";

export default function Page() {
  return (
    <PageLayout
      eyebrow="전기차 · 2026 기준"
      title="전기차 충전 요금 완전 정리"
      description="충전비는 차가 아니라 충전 장소가 결정합니다."
    >
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "가이드", href: "/guide" }, { name: "전기차 충전 요금", href: "/guide/ev-charging-cost" }]} />
      <FaqJsonLd items={[
        { q: "전기차 충전비는 100km당 얼마인가요?", a: "전비 5.5km/kWh 차량 기준으로 집 완속(350원/kWh)은 약 6,364원, 공용 완속(400원)은 약 7,273원, 급속(500원)은 약 9,091원입니다. 같은 거리를 연비 12km/L 내연차로 가면 1,650원/L 기준 약 13,750원입니다." },
        { q: "집에서 충전하면 전기요금이 많이 오르나요?", a: "주택용 전기요금은 누진제라 기존 사용량에 따라 다릅니다. 월 1,500km를 주행하면 약 273kWh가 추가되는데, 기존 사용량이 150kWh인 집은 대부분 2구간 안에서 처리되고 350kWh인 집은 3구간으로 넘어가 단가가 크게 올라갑니다." },
        { q: "급속 충전만 써도 전기차가 이득인가요?", a: "이득은 줄어들지만 남습니다. 급속(500원/kWh)으로만 충전하면 100km당 약 9,091원으로, 내연차 13,750원보다는 저렴합니다. 다만 집 완속 대비 100km당 2,727원을 더 쓰게 됩니다." },
      ]} />

      <Card>
        <h2 className={H}>충전비를 결정하는 건 차가 아닙니다</h2>
        <p className={P}>
          전기차 연료비를 물어보면 대개 차종을 먼저 말합니다. 그런데 실제로 비용을 가르는 건
          차의 전비보다 <b>어디서 충전하느냐</b>입니다. 같은 차로 같은 거리를 달려도 집에서
          완속으로 채우는 사람과 고속도로 급속만 쓰는 사람의 연간 비용은 수십만원 차이가 납니다.
        </p>
        <p className={P + " mt-3"}>
          이 글은 충전 방식별 단가를 100km 주행 비용으로 환산하고, 집에서 충전할 때 가정용
          전기요금 누진 구간에 어떤 영향이 생기는지까지 정리합니다. 내 차의 실제 전비로
          계산해 보려면 <SeoLink href="/daily/ev">전기차 전비 계산기</SeoLink>를 함께 쓰세요.
        </p>
      </Card>

      <SeoBarChart
        title="100km 주행 비용 비교"
        caption="전비 5.5km/kWh 기준. 내연차는 연비 12km/L·유가 1,650원/L 기준입니다."
        unit="원"
        items={[
          { label: "집 완속 350원", value: 6364, highlight: true },
          { label: "공용 완속 400원", value: 7273 },
          { label: "급속 500원", value: 9091 },
          { label: "내연차 (휘발유)", value: 13750 },
        ]}
      />

      <Card>
        <h2 className={H}>충전 방식 세 가지</h2>
        <ul className={UL}>
          <li>
            <b>집 완속 (약 350원/kWh)</b> — 가장 저렴합니다. 7kW급이 일반적이라 완충에 여러 시간이
            걸리지만, 야간에 걸어두면 시간이 문제가 되지 않습니다. 아파트라면 세대 배정 충전기
            설치 여부가 관건입니다.
          </li>
          <li>
            <b>공용 완속 (약 400원/kWh)</b> — 아파트 공동 주차장, 공영주차장, 마트에 설치된
            충전기입니다. 집 완속보다 조금 비싸고 자리 경쟁이 있습니다. 완속이라 주차 시간이
            긴 곳에서만 실용적입니다.
          </li>
          <li>
            <b>급속 (약 500원/kWh)</b> — 50kW~350kW급으로 20~40분에 80%까지 채웁니다. 장거리
            이동 중 보충용이고, 단가가 가장 높습니다.
          </li>
        </ul>
        <p className={P + " mt-3"}>
          단가는 충전 사업자와 시간대에 따라 달라집니다. 위 숫자는 계산의 기준이고, 정확한
          금액은 충전 앱의 이용 내역이나 고지서에 표시된 실제 단가를 쓰셔야 합니다.
        </p>
      </Card>

      <Card>
        <h2 className={H}>집 완속이 가능한지가 가장 큰 변수입니다</h2>
        <p className={P}>
          100km당 집 완속과 급속의 차이가 2,727원입니다. 작아 보이지만 주행거리를 곱하면
          달라집니다.
        </p>
        <div className={BOX}>
          <div>연 15,000km 주행, 전비 5.5km/kWh 기준</div>
          <div>집 완속(350원) → 연 954,545원</div>
          <div>급속만(500원) → 연 1,363,636원</div>
          <div>연 409,091원 차이 · 5년이면 약 205만원</div>
        </div>
        <p className={P + " mt-3"}>
          그래서 전기차 구매를 검토할 때 <b>차종 비교보다 먼저 확인해야 하는 것이 충전 환경</b>입니다.
          집에 완속 충전기를 둘 수 없고 주변 공용 충전기도 마땅치 않다면, 위에서 계산한 연료비
          절감액의 상당 부분이 사라집니다.
        </p>
        <p className={P + " mt-3"}>
          아파트라면 관리사무소에 세대 충전기 설치 가능 여부와 대기 상황을 먼저 물어보세요.
          주차 면수 대비 충전기 수가 적으면 실제로는 공용 충전기를 돌려 쓰게 되고, 그때는
          공용 완속 단가로 계산하는 쪽이 현실에 가깝습니다.
        </p>
      </Card>

      <Card>
        <h2 className={H}>집 충전은 전기요금 누진과 묶입니다</h2>
        <p className={P}>
          집에서 충전하면 그 전력이 <b>가정용 전기요금에 그대로 더해집니다.</b> 주택용은
          누진제라, 충전량이 구간을 넘기면 단가가 올라갑니다. 이때 올라간 단가는 충전분에만
          적용되는 게 아니라 그 구간의 기본요금까지 함께 바꿉니다.
        </p>
        <div className={BOX}>
          <div>월 1,500km 주행 → 약 273kWh 추가 충전</div>
          <div>기존 사용량 150kWh인 집 → 합계 423kWh (3구간 진입)</div>
          <div>기존 사용량 300kWh인 집 → 합계 573kWh (3구간 깊숙이)</div>
        </div>
        <p className={P + " mt-3"}>
          주택용 누진 단가는 1구간 kWh당 120원, 2구간 214.6원, 3구간 307.3원입니다. 기본요금도
          910원 / 1,600원 / 7,300원으로 올라갑니다. 즉 <b>같은 273kWh를 충전해도 기존 사용량이
          많은 집이 훨씬 비싸게 냅니다.</b>
        </p>
        <p className={P + " mt-3"}>
          내 집의 기존 사용량에 충전량을 더하면 어느 구간에 들어가는지{" "}
          <SeoLink href="/daily/electric">전기요금 계산기</SeoLink>에서 확인할 수 있습니다.
          구간을 넘길 것 같으면 공용 완속을 섞어 쓰는 쪽이 오히려 싸지는 경우도 있습니다.
          이것이 &ldquo;집 충전이 항상 가장 저렴하다&rdquo;는 말에 붙는 예외입니다.
        </p>
      </Card>

      <Card>
        <h2 className={H}>충전 시간은 출력으로 나눕니다</h2>
        <p className={P}>
          충전 시간은 간단한 나눗셈입니다. <b>필요한 전력량(kWh)을 충전기 출력(kW)으로 나누면
          대략의 시간</b>이 나옵니다. 72.6kWh 배터리를 비운 상태에서 완충한다고 하면 이렇습니다.
        </p>
        <div className={BOX}>
          <div>72.6kWh 배터리 기준 (0% → 100%)</div>
          <div>가정용 3.5kW → 약 21시간</div>
          <div>완속 7kW → 약 10시간</div>
          <div>급속 50kW, 10~80% 구간(50.8kWh) → 약 1시간</div>
          <div>급속 100kW, 10~80% 구간 → 약 30분</div>
        </div>
        <p className={P}>
          실제로는 이보다 조금 더 걸립니다. 충전 손실이 있고, 배터리 보호를 위해 80%를 넘기면
          차량이 전류를 크게 줄이기 때문입니다. 그래서 <b>급속 충전은 80%에서 끊는 것이
          효율적</b>입니다. 80%에서 100%까지 채우는 데 걸리는 시간이 10%에서 80%까지
          채우는 시간과 비슷해지는 구간이 생깁니다.
        </p>
        <p className={P + " mt-3"}>
          반대로 완속은 끝까지 채워도 시간 손해가 거의 없습니다. 밤에 걸어두는 용도라면
          출력이 낮은 것이 문제가 되지 않고, 배터리에도 완속이 더 부드럽습니다.
        </p>
      </Card>

      <Card>
        <h2 className={H}>아파트 공용 충전기는 요금이 어디로 나오나</h2>
        <p className={P}>
          아파트 공용 충전기를 쓸 때 주의할 점은 <b>요금이 누구에게 청구되는지</b>입니다.
          충전 사업자가 운영하는 충전기라면 앱으로 개별 결제되지만, 단지 자체 설비로 설치된
          경우에는 사용량이 관리비에 반영되는 방식도 있습니다.
        </p>
        <p className={P + " mt-3"}>
          이 구분이 중요한 이유는 <b>단가가 다르기 때문</b>입니다. 개별 결제는 충전 사업자
          요금제를, 관리비 반영은 단지의 전기요금 체계를 따릅니다. 어느 쪽인지 모르면 월
          충전비를 계산해도 실제 청구액과 맞지 않습니다. 관리사무소에 과금 방식과 단가를 한 번
          확인해 두면 그 뒤로는 계산이 정확해집니다.
        </p>
      </Card>

      <Card>
        <h2 className={H}>계산할 때 흔히 빠뜨리는 것</h2>
        <ul className={UL}>
          <li>
            <b>충전 손실</b> — 충전기에서 나간 전력과 배터리에 실제로 들어간 전력은 같지 않습니다.
            고지서나 충전기 기준 사용량이 차량 표시보다 많게 나오는 것이 정상입니다. 비용은
            충전기 기준으로 계산해야 맞습니다.
          </li>
          <li>
            <b>계절</b> — 겨울에는 전비가 떨어져 같은 거리에 더 많은 전력이 듭니다. 연간 비용을
            볼 때는 여름 전비로만 계산하면 과소평가됩니다.
          </li>
          <li>
            <b>충전기 설치비</b> — 집에 충전기를 새로 설치한다면 초기 비용이 듭니다. 연료비
            절감액에서 이 금액을 회수하는 기간을 따로 계산해야 합니다.
          </li>
          <li>
            <b>회원 할인과 제휴</b> — 충전 사업자별 멤버십이나 카드 제휴로 단가가 달라집니다.
            주로 쓰는 충전소의 실제 결제 단가를 기준으로 삼으세요.
          </li>
        </ul>
      </Card>

      <Card>
        <h2 className={H}>함께 보면 좋은 계산기</h2>
        <p className={P}>
          내 차의 실제 전비와 충전비는{" "}
          <SeoLink href="/daily/ev">전기차 전비 계산기</SeoLink>에서 주행거리와 충전량을 넣어
          직접 재볼 수 있습니다. 집 충전으로 전기요금 구간이 바뀌는지는{" "}
          <SeoLink href="/daily/electric">전기요금 계산기</SeoLink>에서,
          내연차와의 연료비 비교는{" "}
          <SeoLink href="/daily/fuel">자동차 연비 계산기</SeoLink>에서 확인하세요.
          보유 비용까지 보려면 <SeoLink href="/daily/cartax">자동차세 계산기</SeoLink>를
          함께 쓰시면 됩니다.
        </p>
      </Card>
    </PageLayout>
  );
}
