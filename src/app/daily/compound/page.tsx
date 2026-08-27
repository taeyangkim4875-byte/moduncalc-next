import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import CompoundCalc from "./CompoundCalc";
export const metadata: Metadata = { title: "복리 계산기 - 원금 · 이자 · 투자 기간별 수익 시뮬레이션", description: "1,000만원을 10년 투자하면 얼마 될까? 복리 수익 시뮬레이션 + 72의 법칙. 월 적립도 가능.", alternates: { canonical: "https://moduncalc.com/daily/compound" },
  openGraph: {
    title: "복리 계산기 - 원금 · 이자 · 투자 기간별 수익 시뮬레이션",
    description: "1,000만원을 10년 투자하면 얼마 될까? 복리 수익 시뮬레이션 + 72의 법칙. 월 적립도 가능.",
    url: "https://moduncalc.com/daily/compound",
  },};
export default function Page() { return <PageLayout eyebrow="투자 계산" title="복리 계산기" description="원금, 연이율, 투자 기간을 입력하면 복리 수익과 72의 법칙 결과를 보여드립니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '복리 계산기', href: '/daily/compound' }]} /><CalculatorJsonLd name="복리 계산기" description="원금, 연이율, 투자 기간으로 복리 수익을 계산하세요. 월 적립식도 지원. 72의 법칙으로 원금 2배 기간도 확인." url="https://moduncalc.com/daily/compound" /><FaqJsonLd items={[{q:"72의 법칙이란 무엇인가요?",a:"72의 법칙은 투자 원금이 2배가 되는 데 걸리는 시간을 간단히 구하는 방법입니다. 72를 연이율(%)로 나누면 됩니다. 예를 들어 연 8% 수익률이면 72 / 8 = 약 9년이 걸립니다."},{q:"단리와 복리의 차이는 무엇인가요?",a:"단리는 원금에만 이자가 붙고, 복리는 원금 + 이전 이자에도 이자가 붙습니다. 기간이 길어질수록 복리의 효과가 기하급수적으로 커집니다."},{q:"월 적립식 투자는 어떻게 계산되나요?",a:"매월 일정 금액을 추가 투자하는 방식입니다. 각 월 적립금에도 복리가 적용되어, 초기 목돈 없이도 장기적으로 큰 자산을 만들 수 있습니다."}]} /><CompoundCalc />

      <SeoSection title="복리의 마법, 숫자로 보면 실감납니다">
        <p>
          매달 30만원을 연 7% 수익률로 20년 투자하면 총 납입액은 7,200만원인데,
          <strong>최종 금액은 약 1억 5,600만원</strong>입니다. 이자가 원금보다 많아지는 거죠.
          30년이면? 3억 6,000만원을 넘깁니다. 시작이 빠를수록 차이가 기하급수적으로 벌어집니다.
        </p>
        <SeoFormula>
          <div>복리 원리금 = 원금 × (1 + 이율)^기간</div>
          <div>72의 법칙: 72 ÷ 연이율(%) = 원금 2배 되는 햇수</div>
          <div>예) 연 6%이면 72 ÷ 6 = 12년 만에 원금 2배</div>
        </SeoFormula>
      </SeoSection>

      <SeoSection title="복리를 활용할 수 있는 한국 금융 상품">
        <SeoList>
          <li><strong>청년도약계좌</strong> — 정부 기여금 + 비과세. 5년 만기 시 최대 5,000만원. <SeoLink href="/savings/doyak">시뮬레이션 해보기</SeoLink></li>
          <li><strong>ISA(개인종합자산관리계좌)</strong> — 이자·배당 200~400만원까지 비과세, 초과분 9.9% 분리과세</li>
          <li><strong>연금저축펀드</strong> — 세액공제 + 과세이연. 30년 넘게 복리 효과 누릴 수 있음</li>
          <li><strong>S&P 500 ETF</strong> — 최근 10년 연평균 수익률 약 12%. 장기 적립식에 적합</li>
        </SeoList>
        <p>
          적금 이자 계산은 <SeoLink href="/savings/interest">적금 이자 계산기</SeoLink>에서,
          경제적 자유(FIRE) 시뮬레이션은 <SeoLink href="/daily/fire">FIRE 계산기</SeoLink>에서 확인하세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="복리 관련 궁금증"
        items={[
          { q: '단리와 복리 차이가 실제로 얼마나 나나요?', a: '1,000만원을 연 5%로 20년 투자하면 — 단리: 2,000만원, 복리: 2,653만원. 차이 653만원. 30년이면 단리 2,500만원 vs 복리 4,322만원으로 격차가 훨씬 벌어집니다.' },
          { q: '72의 법칙이 정확한가요?', a: '연이율 6~10% 범위에서 꽤 정확합니다. 이율이 너무 높거나 낮으면 오차가 생기지만, 투자 감을 잡기엔 충분해요.' },
          { q: '복리 효과를 극대화하려면 어떻게 해야 하나요?', a: '첫째, 빨리 시작할 것. 25세 vs 35세에 시작하면 은퇴 시점 차이가 2배 이상입니다. 둘째, 수익을 재투자할 것. 셋째, 수수료를 낮출 것 — ETF 운용보수 0.1%와 1%의 30년 차이가 수백만원입니다.' },
        ]}
      />
    </PageLayout>; }
