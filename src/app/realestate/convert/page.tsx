import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import ConvertCalc from "./ConvertCalc";
export const metadata: Metadata = { title: "전월세 전환 계산기 - 전세↔월세 변환", description: "전세 3억이면 월세로 얼마? 전세↔월세 변환, 법정전환율 기준 바로 계산.", alternates: { canonical: "https://moduncalc.com/realestate/convert" },
  openGraph: {
    title: "전월세 전환 계산기 - 전세↔월세 변환",
    description: "전세 3억이면 월세로 얼마? 전세↔월세 변환, 법정전환율 기준 바로 계산.",
    url: "https://moduncalc.com/realestate/convert",
  },};
export default function Page() { return (<PageLayout eyebrow="2026 법정전환율 기준" title="전월세 전환 계산기" description="전세와 월세를 법정전환율 기준으로 전환해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '부동산', href: '/realestate' }, { name: '전월세 전환', href: '/realestate/convert' }]} /><CalculatorJsonLd name="전월세 전환 계산기" description="전세와 월세를 법정전환율 기준으로 전환해 드려요." url="https://moduncalc.com/realestate/convert" /><FaqJsonLd items={[{q:"법정전환율이란 무엇인가요?",a:"전세를 월세로 전환할 때 적용하는 법정 상한 이율입니다. 기준금리+2%와 연 10% 중 낮은 값."},{q:"임대인이 마음대로 전환율을 올릴 수 있나요?",a:"법정전환율을 초과할 수 없습니다."},{q:"전세와 월세 중 어느 쪽이 유리한가요?",a:"금리가 높을수록 월세가, 낮을수록 전세가 유리합니다. 목돈 운용 능력에 따라 다릅니다."}]} /><ConvertCalc />

      <SeoSection title="전월세 전환, 계산 한 번 잘못하면 수십만원 차이">
        <p>
          작년에 전세 계약 갱신하면서 집주인이 &quot;보증금 5천만원 올리는 대신 월세 20만원 깎아줄게&quot;라고 했는데,
          이게 유리한 건지 바로 판단이 안 되더라고요.
          법정전환율로 계산해보니 실제로는 월세 17만원만 깎아주는 게 맞는 금액이었습니다.
        </p>
        <p>
          2026년 법정전월세전환율 상한은 기준금리(3.5%) + 2%p = 5.5%입니다.
          임대인이 이 비율을 초과해서 전환하면 임차인이 초과분을 거부할 수 있어요.
          근데 현실에서는 이 비율을 아는 세입자가 많지 않아서, 집주인 말대로 따라가는 경우가 태반이에요.
        </p>
        <p>
          보증금을 올리고 월세를 내리면 매월 지출은 줄지만 목돈이 묶이고,
          반대로 보증금을 낮추고 월세를 올리면 목돈을 굴릴 수 있는 대신 고정 지출이 늘어납니다.
          금리가 높을 때는 보증금을 낮추는 쪽이, 낮을 때는 전세가 유리한 편입니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="전월세 전환 실전 Q&A"
        items={[
          { q: '법정전환율을 집주인이 안 지켜도 되나요?', a: '주택임대차보호법상 법정전환율을 초과하는 전환은 무효입니다. 초과분에 대해 반환을 청구할 수 있고, 분쟁 시 주택임대차분쟁조정위원회에 신청하세요.' },
          { q: '반전세가 전세보다 유리한 경우가 있나요?', a: '금리가 높을 때는 보증금을 줄이고 월세를 내는 반전세가 유리할 수 있습니다. 줄인 보증금으로 예금 이자를 받으면 월세 부담을 상쇄할 수 있거든요.' },
          { q: '계약갱신 시에도 전환율이 적용되나요?', a: '네. 계약갱신청구권 행사 시 보증금·월세 인상은 직전 금액의 5% 이내로 제한되고, 전월세 전환 시에도 법정전환율 상한이 적용됩니다.' },
        ]}
      />
    </PageLayout>
  );
}
