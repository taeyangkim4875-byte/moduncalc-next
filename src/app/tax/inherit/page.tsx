import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import InheritTaxCalc from "./InheritTaxCalc";
export const metadata: Metadata = { title: "상속세 계산기 - 2026 상속세율 · 공제 자동 계산", description: "상속세 얼마 나올까? 상속재산 입력하면 배우자·일괄공제 자동 적용. 실효세율까지 확인.", alternates: { canonical: "https://moduncalc.com/tax/inherit" },
  openGraph: {
    title: "상속세 계산기 - 2026 상속세율 · 공제 자동 계산",
    description: "상속세 얼마 나올까? 상속재산 입력하면 배우자·일괄공제 자동 적용. 실효세율까지 확인.",
    url: "https://moduncalc.com/tax/inherit",
  },};
export default function Page() { return (<PageLayout eyebrow="세금" title="상속세 계산기" description="상속재산과 상속인 정보를 입력하면 상속세를 실시간으로 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '세금', href: '/tax' }, { name: '상속세', href: '/tax/inherit' }]} /><CalculatorJsonLd name="상속세 계산기" description="상속재산가액을 입력하면 상속세를 자동 계산합니다. 기초공제, 배우자공제, 일괄공제, 누진세율 반영." url="https://moduncalc.com/tax/inherit" /><FaqJsonLd items={[{q:"상속세 신고 기한은?",a:"상속 개시일(사망일)이 속하는 달의 말일부터 6개월 이내입니다. 기한 내 신고 시 3% 세액공제를 받을 수 있습니다."},{q:"상속세를 분할 납부할 수 있나요?",a:"납부할 세액이 1,000만원 초과 시 2개월 이내 분납 가능하며, 2,000만원 초과 시 연부연납(최대 5년)도 가능합니다."},{q:"일괄공제와 기초+인적공제 중 어떤 것을 선택해야 하나요?",a:"기초공제(2억)+인적공제 합계와 일괄공제(5억) 중 큰 금액을 선택할 수 있습니다."},{q:"부동산도 상속세 과세 대상인가요?",a:"네. 부동산, 금융재산, 보험금 등 피상속인의 모든 재산이 과세 대상입니다."}]} /><InheritTaxCalc />

      <SeoSection title="상속세, 미리 준비 안 하면 진짜 큰일 납니다">
        <p>
          부모님이 갑자기 돌아가시고 나서 상속세 고지서 받고 멘붕 오는 경우가 많습니다.
          상속재산이 10억이면 배우자 있을 때 일괄공제 5억 + 배우자공제(최소 5억)를 빼면
          과세표준이 0원이 될 수도 있지만, 배우자가 없으면 5억 공제 후 5억에 대해 세금이 나와요.
        </p>
        <p>
          상속세율은 1억 이하 10%에서 시작해서 30억 초과 50%까지 올라갑니다.
          과세표준 5억이면 세율 30%가 적용돼서 산출세액이 9,000만원.
          여기서 신고기한 내 신고하면 3% 세액공제를 받아 약 8,730만원이 됩니다.
          이걸 6개월 안에 현금으로 내야 하니까 부동산 비중이 높은 가정은 납부가 정말 힘들어요.
        </p>
        <p>
          그래서 사전증여를 활용하는 겁니다. 자녀에게 10년간 5,000만원까지 증여세 면제인데,
          미리미리 증여해두면 상속재산 자체를 줄일 수 있어요.
          다만 상속 개시일 전 10년 이내 증여분은 상속재산에 합산되니까 타이밍이 중요합니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="상속세 실전 Q&A"
        items={[
          { q: '배우자공제 30억이 정말 가능한가요?', a: '법정상속분 한도 내에서 최대 30억까지 공제됩니다. 다만 실제 상속받은 금액 기준이라, 배우자가 많이 상속받을수록 공제도 커지지만 배우자 본인의 향후 상속세 부담도 고려해야 해요.' },
          { q: '상속세를 분할 납부할 수 있나요?', a: '납부세액이 2,000만원 초과면 연부연납(최대 5년간 분할)이 가능합니다. 부동산 비중이 높으면 물납(부동산으로 납부)도 신청할 수 있어요.' },
          { q: '사전증여와 상속 중 어느 쪽이 유리한가요?', a: '재산 규모가 클수록 사전증여가 유리한 경우가 많습니다. 상속세는 전체 재산에 누진세율이 적용되지만, 증여는 수증자별로 분산해서 낮은 세율 구간을 활용할 수 있거든요.' },
          { q: '보험금도 상속세 과세 대상인가요?', a: '피상속인이 보험료를 납부한 생명보험 사망보험금은 상속재산에 포함됩니다. 단, 상속인이 보험료를 납부한 경우는 제외돼요.' },
        ]}
      />
    </PageLayout>
  );
}
