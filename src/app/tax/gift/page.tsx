import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import GiftTaxCalc from "./GiftTaxCalc";

export const metadata: Metadata = {
  title: "증여세 계산기 - 가족 간 증여세 자동 계산",
  description: "자녀에게 증여하면 세금 얼마? 금액·관계 입력하면 증여세 바로 계산. 혼인출산공제 반영.",
  alternates: { canonical: "https://moduncalc.com/tax/gift" },
  openGraph: { title: "증여세 계산기 - 가족 간 증여세 자동 계산 (2026)", description: "증여재산가액과 관계를 입력하면 증여세를 자동 계산. 배우자·자녀 공제, 혼인출산공제, 신고세액공제 반영.", url: "https://moduncalc.com/tax/gift" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 증여세 기준" title="증여세 계산기" description="증여 재산가액과 관계를 입력하면 납부할 증여세를 계산해 드려요.">
      <CalculatorJsonLd name="증여세 계산기" description="증여재산가액과 증여자 관계를 입력하면 증여세를 자동 계산합니다." url="https://moduncalc.com/tax/gift" />
      <FaqJsonLd items={[{q:"10년 합산이란 무엇인가요?",a:"같은 사람에게 10년간 받은 증여를 합산하여 세금을 계산합니다. 10년이 지나면 공제 한도가 리셋됩니다."},{q:"혼인·출산 공제는 어떤 경우에 적용되나요?",a:"혼인신고일 또는 출생일 전후 2년 이내 증여 시 1억원을 추가 공제받을 수 있습니다."},{q:"증여세 신고기한은 언제인가요?",a:"증여받은 달의 말일부터 3개월 이내에 신고해야 합니다."}]} />
      <GiftTaxCalc />

      <SeoSection title="증여재산공제 한도 (10년 합산 기준)">
        <p>
          증여세는 무상으로 재산을 받은 <strong>수증자</strong>가 내는 세금입니다.
          다만 가족 간 증여에는 공제 한도가 있어, 그 금액까지는 세금이 없습니다.
          중요한 것은 이 한도가 <strong>10년 동안 합산해서 적용</strong>된다는 점입니다.
        </p>
        <SeoList>
          <li><strong>배우자 → 6억원</strong></li>
          <li><strong>직계존비속(성인 자녀·부모) → 5,000만원</strong></li>
          <li><strong>직계존비속(미성년 자녀) → 2,000만원</strong></li>
          <li><strong>기타 친족(형제자매·며느리·사위 등) → 1,000만원</strong></li>
          <li><strong>혼인·출산 공제 → 1억원 추가</strong> (혼인신고일 전후 2년 또는 출생·입양일부터 2년 이내)</li>
        </SeoList>
        <p>
          혼인·출산 공제를 활용하면 성인 자녀가 부모로부터 <strong>1억 5,000만원</strong>까지 세금 없이 받을 수 있고,
          부부가 각각 양가에서 받으면 신혼부부 기준 최대 3억원까지 비과세 증여가 가능합니다.
        </p>
      </SeoSection>

      <SeoSection title="증여세 계산 공식과 세율">
        <SeoFormula>
          <div>① 과세표준 = 증여재산가액 − 증여재산공제</div>
          <div>② 산출세액 = (과세표준 × 세율) − 누진공제</div>
          <div>③ 신고세액공제 = 산출세액 × 3% (기한 내 신고 시)</div>
          <div>④ 납부세액 = 산출세액 − 신고세액공제</div>
        </SeoFormula>
        <p>세율은 상속세와 동일한 5단계 누진 구조입니다.</p>
        <SeoList>
          <li>1억원 이하 → <strong>10%</strong></li>
          <li>1억~5억원 → <strong>20%</strong> (누진공제 1,000만원)</li>
          <li>5억~10억원 → <strong>30%</strong> (누진공제 6,000만원)</li>
          <li>10억~30억원 → <strong>40%</strong> (누진공제 1억 6,000만원)</li>
          <li>30억원 초과 → <strong>50%</strong> (누진공제 4억 6,000만원)</li>
        </SeoList>
        <p>
          성인 자녀에게 3억원을 증여하는 경우, 공제 5,000만원을 뺀 과세표준은 2억 5,000만원입니다.
          산출세액은 2억 5,000만 × 20% − 1,000만 = 4,000만원, 여기서 신고세액공제 3%(120만원)를 빼면
          최종 납부세액은 <strong>3,880만원</strong>이 됩니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="증여세, 이런 점도 확인하세요"
        items={[
          { q: '10년 합산은 정확히 어떻게 계산하나요?', a: '증여일로부터 소급해 10년 이내에 같은 증여자에게서 받은 증여재산을 모두 합산해 세율을 적용합니다. 부모는 한 사람으로 보므로 아버지와 어머니에게 각각 5,000만원씩 받아도 합산 5,000만원까지만 공제됩니다. 반대로 10년이 지나면 공제 한도가 다시 살아나므로, 자녀가 어릴 때부터 10년 주기로 나누어 증여하는 방식이 절세 전략으로 쓰입니다.' },
          { q: '자녀에게 빌려준 돈도 증여로 보나요?', a: '가족 간 금전 거래는 원칙적으로 증여로 추정됩니다. 대여로 인정받으려면 차용증을 작성하고 확정일자를 받아두는 한편, 실제로 이자와 원금을 계좌이체로 주고받은 기록을 남겨야 합니다. 세법상 적정 이자율은 연 4.6%이며, 이보다 낮은 이자를 받았을 때 그 차액이 연 1,000만원을 넘으면 그 금액을 증여로 보아 과세합니다.' },
          { q: '신고를 안 하면 어떻게 되나요?', a: '증여받은 달의 말일부터 3개월 이내에 신고해야 합니다. 기한을 넘기면 신고세액공제 3%를 못 받는 것은 물론, 무신고가산세 20%(부정행위는 40%)와 납부지연가산세(1일 0.022%)가 추가됩니다. 부동산 취득이나 전세 계약처럼 자금 출처 조사가 따르는 거래에서 적발되는 경우가 많으니 기한 내 신고가 안전합니다.' },
          { q: '증여와 상속 중 어느 쪽이 유리한가요?', a: '자산 규모와 시점에 따라 다릅니다. 상속세에는 일괄공제 5억원, 배우자상속공제 최소 5억원 등 공제 폭이 크므로 자산이 10억원 안팎이면 상속이 유리할 수 있습니다. 반면 자산 가치가 계속 오를 것으로 예상된다면 낮은 가격일 때 미리 증여하는 편이 유리합니다. 다만 상속개시일 전 10년 이내에 상속인에게 증여한 재산은 상속재산에 합산되므로, 증여 시점이 이를수록 효과가 큽니다.' },
        ]}
      />

      <SeoSection title="함께 확인하면 좋은 계산기">
        <p>
          상속과 비교 검토 중이라면 <SeoLink href="/tax/inherit">상속세 계산기</SeoLink>로
          두 경우의 세액을 나란히 비교해 보세요. 부동산을 증여할 계획이라면 증여세 외에{' '}
          <SeoLink href="/realestate/acqtax">취득세</SeoLink>(무상취득 3.5%, 조정대상지역 고가주택은 최대 12%)가
          별도로 발생한다는 점을 잊지 마세요. 증여 대신 매도를 고려한다면{' '}
          <SeoLink href="/realestate/transfer">양도소득세 계산기</SeoLink>로 세후 실수익을 확인할 수 있고,
          전반적인 세금 일정은 <SeoLink href="/guide/year-end-tax">연말정산 가이드</SeoLink>에서 정리해 두었습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
