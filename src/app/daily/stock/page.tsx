import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import StockCalc from "./StockCalc";

export const metadata: Metadata = {
  title: "주식 수익률 계산기 - 손익·물타기 계산",
  description: "내 주식 수익률은 몇 %? 매수가·현재가 입력하면 손익 + 물타기 시뮬레이션까지 바로.",
  alternates: { canonical: "https://moduncalc.com/daily/stock" },
  openGraph: {
    title: "주식 수익률 계산기 - 손익·물타기 계산",
    description: "내 주식 수익률은 몇 %? 매수가·현재가 입력하면 손익 + 물타기 시뮬레이션까지 바로.",
    url: "https://moduncalc.com/daily/stock",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="주식 · 투자" title="주식 수익률 계산기" description="수익률 계산과 물타기 시뮬레이션을 한 번에.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '주식 수익률', href: '/daily/stock' }]} />
      <CalculatorJsonLd name="주식 수익률 계산기" description="주식 매수가와 현재가로 수익률을 계산하고 물타기 시뮬레이션까지." url="https://moduncalc.com/daily/stock" />
      <FaqJsonLd items={[{q:"물타기는 언제 하는 게 좋나요?",a:"기업 펀더멘털이 건전한데 일시적 하락일 때 유효합니다. 하락 추세에서 무작정 물타기는 손실을 키울 수 있습니다."},{q:"손익분기 단가란?",a:"투자 원금을 회수하기 위해 주가가 올라야 하는 최소 가격입니다."},{q:"세금과 수수료는 반영되나요?",a:"이 계산기는 세전 수익률 기준입니다. 실제로는 증권거래세 0.18%와 양도소득세(대주주)가 부과됩니다."}]} />
      <StockCalc />

      <SeoSection title="물타기, 할까 말까 고민될 때">
        <p>삼성전자 6만원에 100주 샀는데 5만원으로 떨어졌다고 해봐요. 물타기해서 평단을 5.5만원으로 낮출지, 그냥 버틸지 진짜 고민되잖아요. 사실 물타기가 효과 있으려면 그 회사가 다시 올라갈 근거가 있어야 합니다. 단순히 "많이 빠졌으니까"는 이유가 안 돼요.</p>
        <p>2026년 기준 증권거래세는 0.18%고, 대주주(종목당 10억 이상 보유)면 양도소득세도 붙습니다. 근데 대부분 개인 투자자는 거래세만 내면 되니까 수익률 계산할 때 0.18%만 빼면 거의 정확해요. 키움, 토스증권 같은 앱에서 평균단가 보는 것보다 물타기 전후를 비교해보는 게 도움이 됩니다.</p>
      </SeoSection>

      <SeoFaq
        title="주식 수익률 관련 팁"
        items={[
          { q: '수수료는 얼마나 빠지나요?', a: '온라인 거래 수수료는 대부분 증권사가 무료 이벤트를 하고 있어요. 매도 시 증권거래세 0.18%가 자동으로 빠집니다.' },
          { q: '물타기 횟수 제한이 있나요?', a: '제한은 없지만 2~3회 이상 물타기하면 이미 큰 손실 구간입니다. 근본적으로 종목 판단이 틀렸을 수 있으니 손절도 고려하세요.' },
          { q: '해외주식도 같은 방식으로 계산하나요?', a: '수익률 계산은 동일하지만, 해외주식은 연 250만원 초과 수익에 22% 양도소득세가 부과됩니다. 환율 변동도 수익률에 영향을 줘요.' },
        ]}
      />
    </PageLayout>
  );
}
