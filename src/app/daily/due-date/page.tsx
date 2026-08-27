import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import DueDateCalc from "./DueDateCalc";
export const metadata: Metadata = { title: "출산 예정일 계산기 - 임신 주수 · 예정일 자동 계산", description: "마지막 생리 시작일로 출산 예정일과 현재 임신 주수를 계산하세요. 주요 검진 일정도 안내합니다.", alternates: { canonical: "https://moduncalc.com/daily/due-date" },
  openGraph: {
    title: "출산 예정일 계산기 - 임신 주수 · 예정일 자동 계산",
    description: "마지막 생리 시작일로 출산 예정일과 현재 임신 주수를 계산하세요. 주요 검진 일정도 안내합니다.",
    url: "https://moduncalc.com/daily/due-date",
  },};
export default function Page() { return <PageLayout eyebrow="출산 계산" title="출산 예정일 계산기" description="마지막 생리일 또는 배란일로 출산 예정일과 현재 임신 주수를 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '출산 예정일', href: '/daily/due-date' }]} /><CalculatorJsonLd name="출산 예정일 계산기" description="마지막 생리 시작일로 출산 예정일과 현재 임신 주수를 계산하세요. 주요 검진 일정도 안내합니다." url="https://moduncalc.com/daily/due-date" /><FaqJsonLd items={[{q:"출산 예정일은 정확한가요?",a:"출산 예정일은 네겔레 공식에 의한 추정일입니다. 실제 출산일은 예정일 전후 2주 이내가 정상 범위이며, 정확히 예정일에 출산하는 비율은 약 5%입니다."},{q:"배란일 기준과 생리일 기준 중 어느 것이 더 정확한가요?",a:"배란일을 정확히 알고 있다면 배란일 기준이 더 정확할 수 있습니다. 하지만 대부분 배란일을 정확히 알기 어려워 마지막 생리 시작일 기준을 많이 사용합니다."},{q:"임신 주수는 어떻게 계산하나요?",a:"마지막 생리 시작일부터 오늘까지의 일수를 7로 나누어 계산합니다. 생리일 기준이므로 실제 수정은 약 2주 후에 이루어진 것으로 봅니다."}]} /><DueDateCalc />

      <SeoSection title="임신 주수별 꼭 해야 할 검진 일정">
        <p>
          출산 예정일 알았으면 그다음은 검진 스케줄입니다.
          놓치면 안 되는 핵심 검진만 정리했어요.
        </p>
        <SeoList>
          <li><strong>8~12주</strong> — 초음파로 심박 확인 + 임신 확인서 발급 (직장인은 이걸로 출산휴가 신청)</li>
          <li><strong>11~13주</strong> — 1차 기형아 검사 (NT 검사 + 혈액). 이 시기 놓치면 정확도 떨어짐</li>
          <li><strong>16~18주</strong> — 2차 기형아 검사 (쿼드 검사)</li>
          <li><strong>20~24주</strong> — 정밀 초음파 (태아 구조 검사). 성별 확인 가능</li>
          <li><strong>24~28주</strong> — 임신성 당뇨 검사 (50g 포도당 부하)</li>
          <li><strong>36주 이후</strong> — 주 1회 NST(태아 안녕 검사)</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="임산부 혜택, 모르면 손해입니다">
        <SeoList>
          <li><strong>국민행복카드</strong> — 임신 확인 시 100만원 바우처 지급 (2026년 기준). 병원비·약국비 결제 가능</li>
          <li><strong>임산부 교통비 지원</strong> — 서울시 기준 월 7만원 교통카드 충전 (지자체마다 다름)</li>
          <li><strong>출산 전 육아용품 지원</strong> — 첫만남 이용권 200만원 (출생 후 바로 지급)</li>
          <li><strong>산후조리원 할인</strong> — 건강보험 부양자 등록 시 일부 할인 적용되는 곳 있음</li>
        </SeoList>
        <p>
          출산 후 육아휴직 급여가 궁금하면 <SeoLink href="/salary/parental">육아휴직 급여 계산기</SeoLink>에서 미리 확인하세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="출산 예정일 관련 궁금증"
        items={[
          { q: '예정일보다 빨리 또는 늦게 태어나는 경우가 많나요?', a: '정확히 예정일에 태어나는 비율은 약 5%에 불과합니다. 예정일 전후 2주(38~42주)가 정상 분만 범위이고, 초산은 예정일보다 약간 늦는 경향이 있습니다.' },
          { q: '생리 주기가 불규칙해도 정확한가요?', a: '네겔레 공식은 28일 주기를 기준으로 하므로, 주기가 길거나 짧으면 오차가 생깁니다. 초음파 측정이 가장 정확하고, 특히 8~12주 초음파로 측정한 예정일이 가장 신뢰도 높습니다.' },
          { q: '쌍둥이는 예정일이 다른가요?', a: '쌍둥이는 보통 37~38주에 출산하는 경우가 많아, 단태아 예정일(40주)보다 2~3주 이르게 계획합니다. 담당 의사와 개별 상담이 필요합니다.' },
        ]}
      />
    </PageLayout>; }
