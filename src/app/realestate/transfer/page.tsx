import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import TransferTaxCalc from "./TransferTaxCalc";

export const metadata: Metadata = {
  title: "양도소득세 계산기 - 부동산 양도세",
  description: "양도소득세 얼마 나올까? 매수가·매도가 입력하면 장기보유공제·비과세 자동 적용.",
  alternates: { canonical: "https://moduncalc.com/realestate/transfer" },
  openGraph: {
    title: "양도소득세 계산기 - 부동산 양도세",
    description: "양도소득세 얼마 나올까? 매수가·매도가 입력하면 장기보유공제·비과세 자동 적용.",
    url: "https://moduncalc.com/realestate/transfer",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 세법 기준" title="양도소득세 계산기" description="부동산 매도 시 예상 양도소득세를 간편하게 계산해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '부동산', href: '/realestate' }, { name: '양도소득세', href: '/realestate/transfer' }]} />
      <CalculatorJsonLd name="양도소득세 계산기" description="부동산 양도소득세를 간편 계산. 1세대1주택 비과세, 장기보유특별공제 자동 적용." url="https://moduncalc.com/realestate/transfer" />
      <FaqJsonLd items={[{q:"1세대1주택 비과세 조건은 무엇인가요?",a:"2년 이상 보유(취득 당시 조정대상지역이었다면 2년 거주 포함)하고 양도가액이 12억원 이하이면 비과세입니다. 12억원을 넘으면 초과분에 해당하는 양도차익에만 과세됩니다."},{q:"장기보유특별공제는 어떻게 적용되나요?",a:"3년 이상 보유 시 연 2%씩 최대 30%까지 공제됩니다. 1세대1주택은 보유기간 연 4%와 거주기간 연 4%를 합산해 최대 80%까지 공제받을 수 있습니다."},{q:"2년 미만 보유 시 세율이 높아지나요?",a:"주택과 조합원입주권은 1년 미만 보유 시 70%, 1~2년 보유 시 60%의 단일세율이 적용됩니다. 토지·상가 등 그 밖의 부동산은 1년 미만 50%, 1~2년 40%입니다. 본 계산기는 자산 종류를 구분하지 않는 간편 계산이라 1년 미만에 45% 단일세율을 적용하므로, 주택 단기 양도라면 실제 세액이 계산 결과보다 큽니다."}]} />
      <TransferTaxCalc />

      <SeoSection title="양도소득세는 어떻게 결정되나요">
        <p>
          양도소득세는 부동산을 팔아 생긴 <strong>차익</strong>에 매기는 세금입니다.
          매도가격이 아니라 <strong>남긴 이익</strong>이 과세 대상이므로, 손해를 보고 팔았다면 세금이 없습니다.
          세액을 좌우하는 변수는 크게 네 가지입니다.
        </p>
        <SeoList>
          <li><strong>보유기간</strong> — 짧을수록 세율이 급격히 높아집니다. 주택은 1년 미만 70%, 1~2년 60%의 단일세율이 적용됩니다.</li>
          <li><strong>1세대1주택 여부</strong> — 2년 이상 보유(취득 당시 조정대상지역이면 2년 거주)하고 양도가 12억원 이하면 전액 비과세입니다.</li>
          <li><strong>장기보유특별공제</strong> — 3년 이상 보유 시 일반 부동산은 연 2%씩 최대 30%, 1세대1주택은 보유·거주 각 연 4%씩 최대 80%까지 공제됩니다.</li>
          <li><strong>필요경비</strong> — 취득세, 중개보수, 법무사 비용, 자본적 지출(확장·새시 교체 등)은 차익에서 뺄 수 있습니다.</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="양도세 계산 공식">
        <SeoFormula>
          <div>① 양도차익 = 양도가액 − 취득가액 − 필요경비</div>
          <div>② 과세대상 차익(1세대1주택 12억 초과) = 양도차익 × (양도가액 − 12억) ÷ 양도가액</div>
          <div>③ 양도소득금액 = 과세대상 차익 − 장기보유특별공제</div>
          <div>④ 과세표준 = 양도소득금액 − 기본공제 250만원(연 1회)</div>
          <div>⑤ 산출세액 = 과세표준 × 세율(6~45% 누진 또는 단기 단일세율)</div>
          <div>⑥ 총 납부세액 = 산출세액 + 지방소득세(산출세액의 10%)</div>
        </SeoFormula>
        <p>
          1세대1주택이 12억원을 넘겨 팔린 경우, 차익 전체가 아니라 <strong>12억 초과분에 대응하는 비율</strong>만
          과세됩니다. 예를 들어 15억원에 팔아 5억원의 차익이 났다면 과세 대상은
          5억 × (3억 ÷ 15억) = <strong>1억원</strong>입니다. 여기에 장기보유특별공제까지 적용하면
          실제 세액은 크게 줄어듭니다. 주식·ETF 등 다른 자산의 양도세 기준은{' '}
          <SeoLink href="/guide/investment-tax">주식·부동산 세금 정리</SeoLink>에서 함께 확인할 수 있습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="양도세, 이런 점도 확인하세요"
        items={[
          { q: '양도세 신고는 언제 해야 하나요?', a: '양도일(잔금 지급일과 등기접수일 중 빠른 날)이 속한 달의 말일부터 2개월 이내에 예정신고와 납부를 해야 합니다. 같은 해에 두 건 이상 양도했다면 다음 해 5월에 확정신고로 합산 정산합니다. 기한을 넘기면 무신고가산세 20%와 납부지연가산세가 부과됩니다.' },
          { q: '필요경비로 인정되는 항목은 무엇인가요?', a: '취득 시 낸 취득세와 법무사 비용, 중개보수, 그리고 자산 가치를 높이는 자본적 지출이 인정됩니다. 발코니 확장, 새시 교체, 난방시설 교체, 방 구조 변경 등이 여기 해당합니다. 반면 도배·장판, 싱크대 교체, 보일러 수리 같은 수익적 지출은 인정되지 않습니다. 반드시 세금계산서나 카드 영수증 등 적격증빙을 보관해야 합니다.' },
          { q: '일시적 2주택도 비과세를 받을 수 있나요?', a: '가능합니다. 종전 주택 취득 후 1년이 지나 새 주택을 취득하고, 새 주택 취득일로부터 3년 이내에 종전 주택을 양도하면 1세대1주택 비과세를 적용받습니다. 종전 주택은 2년 이상 보유(필요 시 2년 거주) 요건도 충족해야 합니다. 상속·혼인·동거봉양으로 인한 일시적 2주택에는 별도의 기한 특례가 있습니다.' },
          { q: '부부 공동명의면 세금이 줄어드나요?', a: '줄어드는 경우가 많습니다. 양도소득 기본공제 250만원이 각자에게 적용되고, 무엇보다 차익이 절반씩 나뉘어 각자의 과세표준이 낮아지므로 누진세율 구간이 내려갑니다. 차익 2억원을 단독명의로 신고하면 38% 구간이지만, 공동명의로 1억원씩 나누면 각각 35% 구간에 들어가 총 세액이 줄어듭니다. 다만 명의를 나누는 과정에서 증여세와 취득세가 발생할 수 있으니 사전에 비교해야 합니다.' },
        ]}
      />

      <SeoSection title="매도 전후로 확인할 것들">
        <p>
          이 계산기는 필요경비를 반영하지 않는 간편 계산이라, 실제 신고 세액과는 차이가 납니다.
          중개보수 규모는 <SeoLink href="/realestate/commission">복비 계산기</SeoLink>로 확인해 필요경비에 반영해 보고,
          새 집을 살 계획이라면 <SeoLink href="/realestate/acqtax">취득세 계산기</SeoLink>로 다음 취득 비용도 함께 잡아두세요.
          매도 대금으로 대출을 상환할 계획이라면 <SeoLink href="/loan">대출 이자 계산기</SeoLink>에서
          중도상환 시 절감되는 이자를 확인할 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
