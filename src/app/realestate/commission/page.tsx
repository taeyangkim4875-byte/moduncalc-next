import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import CommissionCalc from "./CommissionCalc";

export const metadata: Metadata = {
  title: "복비 계산기 - 부동산 중개수수료",
  description: "복비(중개수수료) 얼마 내야 하나? 매매가·전세가 입력하면 수수료 바로 계산. 부가세 포함.",
  alternates: { canonical: "https://moduncalc.com/realestate/commission" },
  openGraph: {
    title: "복비 계산기 - 부동산 중개수수료",
    description: "복비(중개수수료) 얼마 내야 하나? 매매가·전세가 입력하면 수수료 바로 계산. 부가세 포함.",
    url: "https://moduncalc.com/realestate/commission",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 요율 기준" title="복비 계산기" description="매매·전세·월세 거래 시 부동산 중개수수료를 계산해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '부동산', href: '/realestate' }, { name: '복비', href: '/realestate/commission' }]} />
      <CalculatorJsonLd name="복비 계산기" description="부동산 매매·전세·월세 중개수수료를 자동 계산하세요." url="https://moduncalc.com/realestate/commission" />
      <FaqJsonLd items={[{q:"복비(중개수수료)를 깎을 수 있나요?",a:"요율 상한 내에서 협의 가능합니다. 법정 상한은 최대치이지, 반드시 그만큼 내야 하는 것은 아닙니다."},{q:"부가세는 별도인가요?",a:"일반과세 중개사는 부가세 10%가 별도이고, 간이과세자는 포함입니다."},{q:"요율 상한은 법적 기준인가요?",a:"네, 공인중개사법 시행규칙에서 정한 법정 상한입니다."}]} />
      <CommissionCalc />

      <SeoSection title="2026년 부동산 중개보수 요율표">
        <p>
          흔히 &lsquo;복비&rsquo;라 부르는 중개보수는 <strong>공인중개사법 시행규칙</strong>과
          각 시·도 조례가 정한 <strong>상한 요율</strong> 안에서 결정됩니다.
          상한이지 정가가 아니므로, 그 범위 안에서 협의할 수 있습니다.
        </p>
        <SeoList>
          <li><strong>매매·교환</strong> — 5천만원 미만 0.6%(상한 25만원) · 5천만~2억 0.5%(상한 80만원) · 2억~6억 0.4% · 6억~9억 0.5% · 9억~12억 0.5% · 12억~15억 0.6% · 15억 이상 0.7%</li>
          <li><strong>임대차(전세·월세)</strong> — 5천만원 미만 0.5%(상한 20만원) · 5천만~1억 0.4%(상한 30만원) · 1억~6억 0.3% · 6억~12억 0.4% · 12억~15억 0.5% · 15억 이상 0.6%</li>
        </SeoList>
        <p>
          중개보수는 <strong>매도인과 매수인이 각각</strong> 부담합니다.
          한 건의 거래에서 중개사가 양쪽에서 따로 받는 구조라는 뜻입니다.
          임대차도 마찬가지로 임대인과 임차인이 각각 지급합니다.
        </p>
      </SeoSection>

      <SeoSection title="중개보수 계산 공식과 월세 환산">
        <SeoFormula>
          <div>중개보수 = 거래금액 × 상한요율 (구간별 한도액이 있으면 그 금액을 초과할 수 없음)</div>
          <div>월세 거래금액 = 보증금 + (월차임 × 100)</div>
          <div>최종 지급액 = 중개보수 + 부가가치세(일반과세자 10%)</div>
        </SeoFormula>
        <p>
          월세 계약은 보증금과 월세를 하나의 금액으로 환산해 요율을 적용합니다.
          보증금 1,000만원에 월세 50만원이라면 환산 거래금액은 1,000만원 + 5,000만원 = <strong>6,000만원</strong>이 됩니다.
          다만 이렇게 환산한 금액이 5,000만원 미만이면 월차임에 100 대신 70을 곱해 다시 계산하는 예외가 있습니다.
        </p>
        <p>
          매매가 5억원 아파트라면 요율 0.4%가 적용돼 중개보수는 200만원,
          부가세 10%를 더하면 <strong>220만원</strong>을 지급하게 됩니다.
          간이과세자인 중개사무소는 부가세를 별도로 받을 수 없으니 사업자 유형을 확인하세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="복비, 이런 점도 확인하세요"
        items={[
          { q: '중개보수를 깎아달라고 해도 되나요?', a: '됩니다. 법이 정한 것은 상한 요율일 뿐 정해진 금액이 아니므로 협의 대상입니다. 다만 계약서 작성 이후보다 물건을 처음 보러 가기 전, 즉 중개 의뢰 단계에서 미리 이야기하는 편이 훨씬 수월합니다. 합의한 금액은 중개보수 요율표나 확인설명서에 기재해 두는 것이 안전합니다.' },
          { q: '계약이 파기되면 복비를 내야 하나요?', a: '중개사의 잘못 없이 거래 당사자의 사정으로 계약이 해제된 경우에는 중개사가 보수를 청구할 수 있다는 것이 판례의 태도입니다. 반대로 중개사의 중개 행위가 완성되지 않았거나 중개사에게 귀책사유가 있다면 지급 의무가 없습니다. 가계약금 단계에서 무산된 경우에는 통상 청구하지 않습니다.' },
          { q: '부가세는 무조건 내야 하나요?', a: '중개사무소가 일반과세자라면 중개보수의 10%를 부가세로 별도 부담합니다. 연 매출 8,000만원 미만인 간이과세자는 세금계산서 발급 의무가 없어 부가세를 별도 청구할 수 없습니다. 사업자등록증에서 과세 유형을 확인하고, 현금영수증이나 세금계산서를 반드시 받아두세요.' },
          { q: '분양권이나 오피스텔도 요율이 같나요?', a: '분양권은 이미 납부한 금액(계약금·중도금)과 프리미엄을 합한 금액을 거래금액으로 보고 주택 매매 요율을 적용합니다. 반면 오피스텔은 전용 85㎡ 이하이면서 전용 입식 부엌·화장실 등 주거 설비를 갖춘 경우 주택에 준하는 요율(매매 0.5%, 임대차 0.4%)이, 그 외에는 0.9% 이내에서 협의한 요율이 적용됩니다.' },
        ]}
      />

      <SeoSection title="거래 전후로 함께 확인할 비용">
        <p>
          중개보수는 거래 비용의 일부일 뿐입니다. 매수라면{' '}
          <SeoLink href="/realestate/acqtax">취득세 계산기</SeoLink>와{' '}
          <SeoLink href="/realestate/registration">등기비용 계산기</SeoLink>로 세금과 등기 비용을 함께 잡아보세요.
          매도라면 <SeoLink href="/realestate/transfer">양도소득세 계산기</SeoLink>로 세후 실수익을 미리 확인하는 것이 좋습니다.
          전월세 계약이라면 <SeoLink href="/realestate/convert">전월세 전환율 계산기</SeoLink>로 조건을 비교하고,{' '}
          <SeoLink href="/guide/jeonse">전세 계약 완전 가이드</SeoLink>에서 보증금 보호 절차를 확인하세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
