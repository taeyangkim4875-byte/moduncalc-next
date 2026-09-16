import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink, SeoFormula } from "@/components/SeoContent";
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

      <SeoSection title="네겔레 공식과 그 한계">
        <p>
          출산 예정일은 <strong>네겔레 공식(Naegele&rsquo;s rule)</strong>으로 계산합니다.
          마지막 생리 시작일에 280일(40주)을 더하는 방식으로, 계산을 편하게 하려면
          마지막 생리 시작일에서 3개월을 빼고 1년과 7일을 더하면 같은 날짜가 나옵니다.
        </p>
        <SeoFormula>
          <div>출산 예정일 = 마지막 생리 시작일 + 280일</div>
          <div>배란일 기준 = 배란일 + 266일</div>
          <div>현재 임신 주수 = (오늘 − 마지막 생리 시작일) ÷ 7</div>
        </SeoFormula>
        <p>
          이 공식은 <strong>생리 주기가 28일로 규칙적이고, 배란이 14일째 일어난다</strong>는 가정을 씁니다.
          주기가 35일인 분이라면 배란이 21일째쯤 일어나므로 실제 예정일은 계산값보다 약 일주일 늦습니다.
          주기가 불규칙하거나 25일 미만, 32일 초과라면 병원에서 초음파로 교정한 예정일을 따르는 편이 정확합니다.
        </p>
      </SeoSection>

      <SeoSection title="예정일에 정확히 낳는 경우는 드뭅니다">
        <p>
          예정일 당일에 출산하는 비율은 <strong>5% 안팎</strong>입니다.
          예정일은 &ldquo;이날 태어난다&rdquo;가 아니라 분포의 중심값에 가깝습니다.
          의학적으로는 임신 37주 0일부터 41주 6일 사이를 정상 범위로 봅니다.
        </p>
        <SeoList>
          <li><strong>조기진통</strong> — 37주 미만. 신생아 집중치료가 필요할 수 있어 주의가 필요합니다.</li>
          <li><strong>만삭</strong> — 37주 0일 ~ 41주 6일. 이 구간 출산은 모두 정상 범위입니다.</li>
          <li><strong>과숙임신</strong> — 42주 이상. 태반 기능 저하 위험이 있어 유도분만을 고려합니다.</li>
        </SeoList>
        <p>
          초음파로 태아 크기를 재서 예정일을 조정하는 일도 흔합니다.
          특히 임신 초기(8~13주)의 머리엉덩길이(CRL) 측정이 가장 정확하다고 알려져 있어,
          이때 나온 예정일과 생리일 기준 예정일이 일주일 이상 차이 나면 초음파 기준으로 바꿉니다.
        </p>
        <p>
          출산 후 육아휴직 급여가 궁금하다면 <SeoLink href="/salary/parental">육아휴직 급여 계산기</SeoLink>를,
          아기 백일과 돌 날짜는 <SeoLink href="/daily/baby100">아기 100일 계산기</SeoLink>에서 확인하실 수 있습니다.
        </p>
      </SeoSection>

      <SeoSection title="⚠️ 참고해 주세요">
        <p>
          이 계산기는 일반적으로 쓰이는 공식을 적용한 <strong>참고용 추정치</strong>이며 의학적 판단을 대신하지 않습니다.
          정확한 예정일과 임신 주수는 반드시 산부인과 진료를 통해 확인하세요.
        </p>
      </SeoSection>
    </PageLayout>; }
