import type { Metadata } from "next";
import { KO_OPEN_GRAPH } from "@/app/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import ElectricCalc from "./ElectricCalc";
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: "전기요금 계산기 - 2026 누진제 요금 계산",
  description: "2026년 전기요금 누진제 기준으로 월 전기요금을 계산합니다. 사용량과 시기를 입력하면 구간별 요금과 총 납부액을 확인하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/electric" },
  openGraph: {
    ...KO_OPEN_GRAPH,
    title: "전기요금 계산기 - 2026 누진제 요금 계산",
    description: "2026년 전기요금 누진제 기준으로 월 전기요금을 계산합니다. 사용량과 시기를 입력하면 구간별 요금과 총 납부액을 확인하세요.",
    url: "https://moduncalc.com/daily/electric",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 전기요금 기준" title="전기요금 계산기" description="월 사용량을 입력하면 누진제 적용 전기요금을 바로 계산해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '전기요금', href: '/daily/electric' }]} />
      <CalculatorJsonLd name="전기요금 계산기" description="2026년 전기요금 누진제 기준으로 월 전기요금을 계산합니다." url="https://moduncalc.com/daily/electric" />
      <FaqJsonLd items={[{q:"하계 요금이 완화되는 이유는 무엇인가요?",a:"여름철 냉방으로 전력 사용량이 급증하므로, 정부가 가계 부담 완화를 위해 하계 구간을 완화합니다."},{q:"전기요금을 절약하는 방법은?",a:"대기전력 차단, 에어컨 적정 온도(26도) 설정, LED 조명 교체, 에너지 효율 1등급 가전 사용이 효과적입니다."},{q:"누진제는 모든 가정에 적용되나요?",a:"주거용(주택용) 전력에만 적용됩니다. 상업·산업용은 별도 요금체계입니다."}]} />
      <ElectricCalc />
      <ShareButtons title="전기요금 계산 결과" />

      <SeoSection title="2026년 전기요금 누진제, 구간별로 이렇게 다릅니다">
        <p>
          많은 분이 전기요금이 &quot;쓴 만큼&quot; 나온다고 생각하는데, 실제로는 <strong>많이 쓸수록 단가가 올라가는 누진제</strong>입니다.
          200kWh까지는 kWh당 120원인데, 400kWh를 넘으면 kWh당 307.3원까지 뜁니다.
        </p>
        <SeoFormula>
          <div>전기요금 = 기본요금 + (구간별 사용량 × 구간별 단가) + 기후환경요금 + 연료비조정액</div>
          <div>최종 납부액 = 전기요금 + 부가세(10%) + 전력기금(3.7%)</div>
        </SeoFormula>
        <p>
          사실 1~2인 가구라면 200kWh 안에서 충분히 생활 가능하고, 이 경우 월 전기요금이 3만원 안팎입니다.
          문제는 여름 에어컨과 겨울 난방기 시즌인데, 이때는 <SeoLink href="/daily/aircon">에어컨 전기요금 계산기</SeoLink>로 추가 요금을 미리 확인하세요.
        </p>
      </SeoSection>

      <SeoSection title="전기요금 줄이는 현실적인 방법">
        <SeoList>
          <li><strong>대기전력 차단</strong> — TV, 컴퓨터 등 대기전력만 월 5~10kWh. 멀티탭 스위치 끄기</li>
          <li><strong>에너지 효율 1등급 가전</strong> — 냉장고만 바꿔도 연간 수만원 절약</li>
          <li><strong>LED 조명 교체</strong> — 형광등 대비 전력 60~70% 절약</li>
          <li><strong>에어컨 26도 + 선풍기</strong> — 24도에서 26도로만 올려도 월 1만원 차이</li>
          <li><strong>한전 에너지캐시백</strong> — 전년 동월 대비 절감하면 최대 5,000원 캐시백</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="1kWh 더 썼는데 요금이 6,830원 뛰는 구간이 있습니다">
        <p>
          누진제에서 바뀌는 건 전력량 단가만이 아닙니다. <strong>기본요금도 함께 점프</strong>합니다.
          구간이 올라가면 그 구간의 기본요금이 사용량 전체에 새로 적용되기 때문입니다.
        </p>
        <SeoFormula>
          <div>1구간 기본요금 910원 / 2구간 1,600원 / 3구간 7,300원</div>
          <div>400kWh → 최종 77,907원</div>
          <div>401kWh → 최종 84,737원 (1kWh 차이로 6,830원 증가)</div>
        </SeoFormula>
        <p>
          3구간에 들어서는 순간 기본요금이 1,600원에서 7,300원으로 <strong>5,700원</strong> 올라가고,
          거기에 부가세 10%와 전력산업기반기금 3.7%까지 얹히면서 1kWh에 6,830원이 붙는 것입니다.
          200kWh 경계에서도 같은 일이 작게 일어나 1kWh에 1,029원이 추가됩니다.
        </p>
        <p>
          그래서 전기요금 관리의 핵심은 평균 사용량을 조금씩 줄이는 것보다
          <strong>구간 경계를 넘지 않는 것</strong>입니다. 월 사용량이 390kWh 근처라면
          10kWh만 줄여도 효과가 다른 어떤 절약보다 큽니다. 7~8월에는 1구간이 300kWh,
          2구간이 450kWh로 완화되므로 경계 자체가 올라갑니다.
        </p>
      </SeoSection>

      <SeoSection title="청구서의 항목이 각각 무엇인지">
        <p>
          고지서 금액은 한 덩어리가 아니라 여러 항목의 합입니다. 어디를 줄일 수 있고
          어디는 손댈 수 없는지가 항목별로 다릅니다.
        </p>
        <SeoList>
          <li>
            <strong>기본요금</strong> — 사용량이 속한 누진 구간에 따라 정해지는 고정액입니다.
            위에서 본 것처럼 구간이 바뀌면 통째로 바뀝니다.
          </li>
          <li>
            <strong>전력량요금</strong> — 구간별 단가 × 그 구간에서 쓴 양을 더한 금액입니다.
            300kWh를 썼다면 처음 200kWh는 120원, 나머지 100kWh는 214.6원으로 계산됩니다.
            전체에 높은 단가가 적용되는 것이 아닙니다.
          </li>
          <li>
            <strong>기후환경요금·연료비조정액</strong> — 온실가스 감축 비용과 연료 가격 변동을
            반영하는 항목입니다. 사용량에 비례하지만 단가는 분기마다 고시로 바뀝니다.
          </li>
          <li>
            <strong>부가가치세 10%와 전력산업기반기금 3.7%</strong> — 위 금액의 합계에 붙습니다.
            즉 전기요금을 1,000원 줄이면 실제 납부액은 약 1,137원 줄어듭니다.
          </li>
        </SeoList>
        <p>
          복지 할인이나 에너지캐시백은 이 합계에서 차감되는 방식이라, 할인 대상이라면
          절약보다 신청이 먼저입니다. 냉방 비중이 큰 달의 추가분만 따로 보려면{' '}
          <SeoLink href="/daily/aircon">에어컨 전기요금 계산기</SeoLink>를 쓰세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="전기요금 궁금증"
        items={[
          { q: '하계 누진 완화는 언제 적용되나요?', a: '7~8월 사용분(8~9월 청구분)에 자동 적용됩니다. 1구간이 200kWh → 300kWh, 2구간이 400kWh → 450kWh로 확대됩니다. 별도 신청이 필요 없어요.' },
          { q: '복지 할인은 어떤 게 있나요?', a: '기초생활수급자 월 16,000원 한도, 차상위계층 월 10,000원 한도, 장애인·유공자 할인, 다자녀(3자녀 이상) 월 16,000원 한도 등이 있습니다. 한전 고객센터(123)에서 신청 가능합니다.' },
          { q: '오피스텔도 주택용 요금이 적용되나요?', a: '주거용 오피스텔은 입주자가 한전에 주거용 신청을 하면 주택용 요금이 적용됩니다. 미신청 시 일반용(상업용) 요금이 부과되어 훨씬 비쌉니다.' },
        ]}
      />
    </PageLayout>
  );
}
