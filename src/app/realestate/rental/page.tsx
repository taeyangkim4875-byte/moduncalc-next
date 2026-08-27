import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import RentalCalc from "./RentalCalc";

export const metadata: Metadata = {
  title: "임대수익률 계산기 - 부동산 투자 수익률",
  description: "매매가, 보증금, 월세, 대출 조건을 입력하면 총수익률·순수익률·투자금 회수기간을 자동 계산합니다.",
  alternates: { canonical: "https://moduncalc.com/realestate/rental" },
  openGraph: {
    title: "임대수익률 계산기 - 부동산 투자 수익률",
    description: "매매가, 보증금, 월세, 대출 조건을 입력하면 총수익률·순수익률·투자금 회수기간을 자동 계산합니다.",
    url: "https://moduncalc.com/realestate/rental",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="부동산 투자 분석" title="임대수익률 계산기" description="매매가와 월세를 입력하면 총수익률·순수익률을 바로 계산해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '부동산', href: '/realestate' }, { name: '임대수익률', href: '/realestate/rental' }]} />
      <CalculatorJsonLd name="임대수익률 계산기" description="매매가, 보증금, 월세, 대출 조건으로 총수익률·순수익률·회수기간을 계산합니다." url="https://moduncalc.com/realestate/rental" />
      <FaqJsonLd items={[{q:"총수익률과 순수익률의 차이는?",a:"총수익률은 연 임대료÷매매가, 순수익률은 경비·대출이자를 뺀 실질 수익률입니다."},{q:"적정 임대수익률은 어느 정도인가요?",a:"일반적으로 연 4~6%면 양호, 3% 미만은 은행 금리 대비 메리트가 낮습니다."},{q:"공실 리스크는 어떻게 대비하나요?",a:"연 1~2개월 공실을 감안하여 수익률을 산정하는 것이 현실적입니다."}]} />
      <RentalCalc />

      <SeoSection title="임대수익률, 광고 수익률과 실제 수익률은 다릅니다">
        <p>
          부동산 투자 상담 가면 &quot;수익률 5%&quot; 이런 말을 쉽게 하는데,
          이게 총수익률인지 순수익률인지 꼭 따져봐야 합니다.
          총수익률은 단순히 연 임대료를 매매가로 나눈 건데, 여기서 빠지는 비용이 꽤 많거든요.
        </p>
        <p>
          실제로 계산하면 재산세, 종합소득세, 건물 관리비, 수선비, 공실 기간 등을 다 빼야 합니다.
          오피스텔 같은 경우 관리비가 월 10~20만원씩 나가고, 공실이 연 1~2개월은 생기는 게 보통이에요.
          표면 수익률 5%가 실제로는 3% 아래로 떨어지는 경우가 허다합니다.
        </p>
        <p>
          대출 끼고 투자하면 레버리지 효과가 있지만, 금리가 올라가면 이자 부담에 역전세까지 겹쳐서
          수익률이 마이너스가 되는 상황도 현실적으로 존재합니다.
          투자 전에 보수적으로 계산해보는 게 나중에 후회를 줄여요.
        </p>
      </SeoSection>

      <SeoFaq
        title="임대수익률 실전 Q&A"
        items={[
          { q: '공실률은 얼마로 잡는 게 현실적인가요?', a: '입지에 따라 다르지만, 보수적으로 연 1~2개월(8~17%)을 공실로 잡는 게 안전합니다. 역세권 오피스텔은 낮고, 외곽 빌라는 공실 리스크가 더 높아요.' },
          { q: '임대소득세는 어떻게 계산하나요?', a: '주택 임대소득은 연 2,000만원 이하면 분리과세(14%)를 선택할 수 있고, 초과하면 종합소득세로 합산 과세됩니다. 필요경비율은 등록임대사업자 60%, 미등록 50%예요.' },
          { q: '적정 임대수익률 기준이 있나요?', a: '일반적으로 순수익률 4% 이상이면 투자 가치가 있다고 봅니다. 3% 미만이면 은행 정기예금 금리와 비교했을 때 위험 대비 메리트가 낮은 편이에요.' },
        ]}
      />
    </PageLayout>
  );
}
