import type { Metadata } from "next";
import { KO_OPEN_GRAPH } from "@/app/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoLink } from "@/components/SeoContent";
import { SeoBarChart, SeoSampleIO } from "@/components/SeoChart";

export const metadata: Metadata = {
  title: "전기차 겨울 전비 - 왜 20~30% 떨어지고 비용은 얼마나 늘어나나",
  description: "겨울에 전기차 전비가 떨어지는 두 가지 이유, 100km당 충전비가 얼마나 올라가는지, 그리고 주행거리 손실을 줄이는 실제 방법을 계산과 함께 정리했습니다.",
  alternates: { canonical: "https://moduncalc.com/guide/ev-winter" },
  openGraph: {
    ...KO_OPEN_GRAPH,
    title: "전기차 겨울 전비 - 떨어지는 이유와 비용 차이",
    description: "전비 20~30% 하락이 100km당 비용과 주행거리에 미치는 영향.",
    url: "https://moduncalc.com/guide/ev-winter",
  },
};

const P = "text-sm text-[#4E5968] leading-relaxed";
const H = "text-base font-extrabold mb-3";
const BOX = "bg-[var(--bg)] rounded-xl p-3.5 flex flex-col gap-1 text-[13px] text-[var(--ink)] leading-relaxed my-3";
const UL = "pl-5 my-2 list-disc text-sm text-[#4E5968] leading-relaxed flex flex-col gap-1.5";

export default function Page() {
  return (
    <PageLayout
      eyebrow="전기차 · 겨울 운행"
      title="전기차 겨울 전비"
      description="떨어지는 건 배터리 용량이 아니라 효율입니다."
    >
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "가이드", href: "/guide" }, { name: "전기차 겨울 전비", href: "/guide/ev-winter" }]} />
      <FaqJsonLd items={[
        { q: "겨울에 전기차 전비는 얼마나 떨어지나요?", a: "일반적으로 여름 대비 20~30% 떨어집니다. 여름에 5.5km/kWh가 나오는 차라면 겨울에는 대략 4.4~3.85km/kWh 수준이 됩니다. 저온 자체의 영향과 실내 난방 전력 소비가 겹쳐서 생기는 현상입니다." },
        { q: "겨울에 충전비는 얼마나 더 드나요?", a: "완속 350원/kWh 기준으로 100km당 여름 약 6,364원에서 겨울 7,955~9,091원이 됩니다. 급속 500원/kWh로만 충전하면 겨울 100km당 11,364~12,987원까지 올라가, 휘발유차 13,750원과 큰 차이가 없어집니다." },
        { q: "배터리가 영구적으로 손상되는 건가요?", a: "아닙니다. 저온에서 전비가 떨어지는 것은 일시적인 효율 저하이고, 기온이 올라가면 원래 수준으로 돌아옵니다. 다만 저온에서 급속 충전을 반복하는 것은 배터리에 부담이 되므로, 가능하면 예열 후 충전하는 쪽이 좋습니다." },
      ]} />

      <Card>
        <h2 className={H}>겨울에 줄어드는 건 용량이 아닙니다</h2>
        <p className={P}>
          첫 겨울을 맞은 전기차 운전자가 가장 당황하는 순간은 완충했는데 표시 주행거리가
          여름보다 100km 가까이 짧게 나올 때입니다. 배터리가 망가진 건가 싶지만 그렇지 않습니다.
          <b> 배터리에 저장된 전력량은 거의 같고, 같은 전력으로 갈 수 있는 거리가 줄어든 것</b>입니다.
          즉 전비(km/kWh)가 떨어진 것이고, 기온이 오르면 되돌아옵니다.
        </p>
        <p className={P + " mt-3"}>
          일반적으로 여름 대비 20~30% 하락합니다. 이 글은 그 하락이 실제 비용과 주행 계획에
          얼마만큼의 차이를 만드는지 숫자로 보여주고, 손실을 줄이는 방법을 정리합니다.
        </p>
      </Card>

      <Card>
        <h2 className={H}>이유는 두 가지가 겹칩니다</h2>
        <ul className={UL}>
          <li>
            <b>저온에서 배터리 효율이 떨어집니다.</b> 리튬이온 배터리는 내부 화학 반응 속도가
            온도에 민감합니다. 추우면 내부 저항이 커져 같은 전력을 꺼내 쓰는 데 손실이 더
            생깁니다. 차량은 배터리를 적정 온도로 유지하려고 전력을 따로 쓰기도 합니다.
          </li>
          <li>
            <b>난방에 전기를 씁니다.</b> 내연차는 엔진이 버리는 열로 실내를 데우니까 난방이
            사실상 공짜입니다. 전기차는 엔진이 없으니 <b>난방 전력을 배터리에서 꺼내 씁니다.</b>
            그래서 히터를 세게 틀면 주행거리가 눈에 보일 만큼 줄어듭니다.
          </li>
        </ul>
        <p className={P + " mt-3"}>
          두 번째 요인이 더 큽니다. 그래서 같은 추위라도 <b>짧은 거리를 자주 다니는 사람이 더
          불리합니다.</b> 출발 직후 실내와 배터리를 데우는 데 전력이 집중적으로 들어가는데,
          10분 타고 내리면 그 비용만 내고 효율이 좋아진 구간은 거의 쓰지 못합니다.
        </p>
      </Card>

      <SeoBarChart
        title="100km 주행 충전비 — 계절별"
        caption="여름 전비 5.5km/kWh 기준. 겨울은 20% 하락 시 4.40km/kWh, 30% 하락 시 3.85km/kWh로 계산했습니다. 내연차는 연비 12km/L·1,650원/L."
        unit="원"
        items={[
          { label: "여름 완속", value: 6364 },
          { label: "겨울 완속 -20%", value: 7955 },
          { label: "겨울 완속 -30%", value: 9091, highlight: true },
          { label: "겨울 급속 -30%", value: 12987 },
          { label: "내연차 (휘발유)", value: 13750 },
        ]}
      />

      <Card>
        <h2 className={H}>겨울에 급속만 쓰면 이점이 거의 사라집니다</h2>
        <p className={P}>
          위 그래프에서 가장 중요한 줄은 네 번째입니다. <b>겨울에 전비가 30% 떨어진 상태로
          급속(500원/kWh)만 쓰면 100km당 12,987원</b>이 됩니다. 같은 거리를 휘발유차로 가면
          13,750원이니, 차이가 763원밖에 안 됩니다.
        </p>
        <p className={P + " mt-3"}>
          전기차의 연료비 이점은 &ldquo;전기차라서&rdquo; 생기는 게 아니라 <b>싼 단가로 충전할 수
          있어서</b> 생깁니다. 집 완속을 쓸 수 없는 환경에서 겨울을 보내면 그 이점이 거의 사라진다는
          뜻입니다. 구매를 검토 중이라면 이 조건을 먼저 확인하는 쪽이 낫습니다. 단가별 비용
          구조는 <SeoLink href="/guide/ev-charging-cost">전기차 충전 요금 정리</SeoLink>에
          따로 정리해 두었습니다.
        </p>
      </Card>

      <SeoSampleIO
        title="겨울 주행거리는 이렇게 줄어듭니다"
        inputs={[
          { label: "배터리 용량", value: "72.6 kWh" },
          { label: "여름 전비", value: "5.5 km/kWh" },
          { label: "겨울 전비 하락", value: "25%" },
        ]}
        outputs={[
          { label: "여름 1회 충전 주행거리", value: "약 399 km" },
          { label: "겨울 전비", value: "4.13 km/kWh" },
          { label: "겨울 1회 충전 주행거리", value: "약 300 km" },
        ]}
        note="용량과 전비를 내 차 값으로 바꿔 계산하려면 전기차 전비 계산기를 쓰세요. 실제 주행거리는 속도, 지형, 난방 설정에 따라 더 달라집니다."
      />

      <Card>
        <h2 className={H}>손실을 줄이는 방법</h2>
        <ul className={UL}>
          <li>
            <b>충전기에 꽂은 상태로 예약 공조를 돌립니다.</b> 가장 효과가 큽니다. 출발 전 실내와
            배터리를 데우는 전력을 <b>배터리가 아니라 충전기에서 끌어오기</b> 때문에, 주행
            가능 거리를 깎지 않고 따뜻한 차로 출발할 수 있습니다. 집 완속이 있다면 겨울에
            이 기능을 쓰는 것만으로 체감이 달라집니다.
          </li>
          <li>
            <b>실내 난방보다 열선을 먼저 씁니다.</b> 공기 전체를 데우는 히터보다 시트 열선과
            스티어링 휠 열선이 전력을 훨씬 적게 씁니다. 몸에 직접 닿는 쪽을 먼저 켜고 실내
            온도는 조금 낮게 두는 조합이 효율적입니다.
          </li>
          <li>
            <b>히트펌프 옵션이 있으면 켜둡니다.</b> 전기 저항으로 열을 만드는 방식(PTC)보다
            히트펌프가 같은 난방에 전력을 덜 씁니다. 차에 히트펌프가 들어 있는지는 옵션표에서
            확인할 수 있고, 겨울 전비 차이의 상당 부분이 여기서 갈립니다.
          </li>
          <li>
            <b>급속 충전은 주행 후에 합니다.</b> 저온에서 배터리가 차가울 때 급속을 걸면 충전
            속도가 크게 느려집니다. 차량이 배터리를 보호하려고 전류를 제한하기 때문입니다.
            어느 정도 달려서 배터리가 데워진 상태에서 충전하는 쪽이 빠르고 배터리에도
            낫습니다.
          </li>
          <li>
            <b>겨울 주행 계획은 표시 거리의 80%로 잡습니다.</b> 장거리를 갈 때 계기판 숫자를
            그대로 믿으면 중간에 쫓기게 됩니다. 특히 고속 주행은 전비가 더 떨어지므로, 충전소
            간격을 여유 있게 잡아두는 쪽이 안전합니다.
          </li>
        </ul>
      </Card>

      <Card>
        <h2 className={H}>전비가 떨어지는 건 겨울만이 아닙니다</h2>
        <p className={P}>
          겨울이 가장 크지만, 전비를 깎는 요인은 계절 말고도 있습니다. 같은 차로 같은 날
          달려도 아래 조건에서 전비가 달라집니다.
        </p>
        <ul className={UL}>
          <li>
            <b>고속 주행</b> — 공기 저항은 속도의 제곱에 비례해 커집니다. 내연차도 마찬가지지만
            전기차는 엔진 효율 곡선이 없어 <b>저속 구간에서 특히 유리하고 고속에서 상대적으로
            불리합니다.</b> 그래서 전기차는 시내 주행 전비가 고속도로 전비보다 좋게 나오는 것이
            보통이고, 내연차와 정반대입니다.
          </li>
          <li>
            <b>여름 에어컨</b> — 냉방도 전력을 씁니다. 다만 히터만큼 많이 쓰지는 않아서, 겨울
            하락폭보다는 작습니다.
          </li>
          <li>
            <b>탑승 인원과 적재</b> — 무게가 늘면 전비가 떨어집니다. 가족 여행처럼 사람과 짐이
            꽉 찬 상태의 전비는 혼자 탈 때보다 눈에 보이게 낮습니다.
          </li>
          <li>
            <b>타이어 공기압</b> — 압력이 낮으면 구름 저항이 커집니다. 기온이 내려가면 공기압도
            함께 떨어지므로, 겨울에는 이 요인이 저온 효율 저하와 겹쳐서 작용합니다. 겨울철
            공기압 점검이 전비에 도움이 되는 이유입니다.
          </li>
        </ul>
        <p className={P + " mt-3"}>
          이 요인들이 겹치기 때문에 <b>표시 전비나 카탈로그 수치로 비용을 계산하면 거의 항상
          과소평가</b>가 됩니다. 실제 충전량과 주행거리로 직접 재는 쪽이 정확합니다.
        </p>
      </Card>

      <Card>
        <h2 className={H}>연간 비용으로 보면 얼마인가</h2>
        <p className={P}>
          한 해 중 추운 기간이 넉 달이라고 보고, 연 15,000km를 균등하게 나눠 달린다고
          가정하겠습니다.
        </p>
        <div className={BOX}>
          <div>겨울 4개월 주행 5,000km · 나머지 8개월 10,000km</div>
          <div>여름 전비 5.5 / 겨울 전비 4.13 (25% 하락) · 완속 350원</div>
          <div>여름분 10,000km → 636,364원</div>
          <div>겨울분 5,000km → 423,729원</div>
          <div>합계 연 1,060,093원 (전 기간 여름 전비였다면 954,545원)</div>
          <div>겨울로 인한 추가 비용 약 연 105,548원</div>
        </div>
        <p className={P}>
          연 10만원 남짓입니다. 충전 환경이 갖춰져 있다면 겨울 전비 하락은 <b>불편의 문제이고
          비용의 문제는 아닙니다.</b> 반대로 급속에 의존하는 환경이면 같은 하락이 훨씬 크게
          체감됩니다.
        </p>
      </Card>

      <Card>
        <h2 className={H}>함께 보면 좋은 계산기</h2>
        <p className={P}>
          내 차의 겨울 전비는 추측하지 말고 직접 재는 쪽이 정확합니다.{" "}
          <SeoLink href="/daily/ev">전기차 전비 계산기</SeoLink>에서 주행거리와 충전량을 넣으면
          실측 전비와 100km당 비용이 나옵니다. 집 충전으로 전기요금 구간이 바뀌는지는{" "}
          <SeoLink href="/daily/electric">전기요금 계산기</SeoLink>에서,
          내연차와의 비교는 <SeoLink href="/daily/fuel">자동차 연비 계산기</SeoLink>에서
          확인하세요. 5년 보유 비용 전체는{" "}
          <SeoLink href="/guide/ev-running-cost">전기차 5년 유지비 비교</SeoLink>에 있습니다.
        </p>
      </Card>
    </PageLayout>
  );
}
