import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import SalaryCalendar from "./SalaryCalendar";
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: "월급 달력 - 월급날 D-day & 오늘까지 번 돈",
  description: "월급날까지 D-몇일? 이번 달 지금까지 번 돈은? 월급 달력으로 매일 확인하세요.",
  alternates: { canonical: "https://moduncalc.com/salary/calendar" },
  openGraph: {
    title: "월급 달력 - 월급날 D-day & 오늘까지 번 돈",
    description: "월급날까지 D-몇일? 이번 달 지금까지 번 돈은? 월급 달력으로 매일 확인하세요.",
    url: "https://moduncalc.com/salary/calendar",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="연봉"
      title="월급 달력"
      description="월급날까지 D-day와 오늘까지 번 돈을 확인하세요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }, { name: '월급 달력', href: '/salary/calendar' }]} />
      <CalculatorJsonLd name="월급 달력" description="월급날까지 며칠 남았는지, 이번 달 지금까지 얼마를 벌었는지 확인하세요." url="https://moduncalc.com/salary/calendar" />
      <FaqJsonLd items={[{q:"근무일은 어떻게 계산하나요?",a:"해당 월의 주말(토·일)을 제외한 평일 수를 기준으로 합니다. 공휴일은 포함하지 않습니다."},{q:"데이터는 어디에 저장되나요?",a:"브라우저의 로컬 스토리지에만 저장되며, 서버로 전송되지 않습니다."}]} />
      <SalaryCalendar />
      <ShareButtons title="월급 달력" />

      <SeoSection title="월급날까지 며칠, 생각보다 위로가 됩니다">
        <p>월초에 카드값 빠져나가고 나면 월급날이 기다려지잖아요. 25일 월급이면 매달 1일부터 카운트다운 시작인 거예요. 근데 진짜 재밌는 건, 오늘까지 내가 얼마를 벌었는지 보는 겁니다. 월급 300만원이면 근무일 22일 기준 하루에 약 13.6만원을 벌고 있거든요.</p>
        <p>월급날이 주말이나 공휴일이면 전 영업일에 지급되는 게 일반적입니다. 2026년에는 25일이 일요일인 달이 1번, 토요일인 달이 2번 있어요. 10월은 25일이 일요일이라 23일 금요일에 들어올 겁니다.</p>
      </SeoSection>

      <SeoSection title="25일 vs 15일 vs 말일 — 월급날이 왜 다를까">
        <p>한국 직장인 대다수는 매월 25일에 월급을 받습니다. 근데 회사마다 15일, 20일, 말일인 곳도 있어요. 왜 이렇게 다를까요?</p>
        <SeoList>
          <li><strong>25일</strong> — 가장 흔한 급여일. 월말 카드 결제일(보통 1~5일)에 맞춰 자금 계획이 가능해서 선호됩니다</li>
          <li><strong>15일</strong> — 공무원, 공기업에 많음. 한 달을 반으로 나눠서 중간 정산 느낌이에요</li>
          <li><strong>말일</strong> — 해당 월 근무를 완전히 마감한 뒤 지급. 회계 정리가 깔끔하지만 직원 입장에선 기다리기 좀 길어요</li>
        </SeoList>
        <p>근로기준법 제43조에 따르면 임금은 &quot;매월 1회 이상 일정한 날짜를 정하여 지급&quot;해야 합니다. 월급날이 공휴일이면 법적으로는 다음 영업일에 줘도 되지만, 대부분 회사가 전 영업일에 앞당겨서 지급합니다. 참고로 연봉 협상은 12~2월이 가장 많아요. 성과 평가 직후니까요. 협상 전에 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>로 희망 연봉의 실수령액을 꼭 확인하세요.</p>
      </SeoSection>

      <SeoFaq
        title="월급 관련 궁금한 점"
        items={[
          { q: '월급이 늦게 들어오면 어떻게 하나요?', a: '근로기준법상 임금은 정해진 날짜에 지급해야 합니다. 반복적으로 지연되면 노동청(1350)에 신고할 수 있어요.' },
          { q: '주말에 입금되는 경우도 있나요?', a: '은행 영업일 기준이라 주말이나 공휴일에는 입금 처리가 안 됩니다. 보통 전 영업일에 지급하지만, 회사 정책에 따라 다를 수 있어요.' },
          { q: '인턴이나 수습 기간에도 월급날이 같나요?', a: '네, 수습 기간이라도 급여 지급일은 동일합니다. 다만 수습 중 급여가 최저임금의 90%까지 감액될 수 있어요.' },
          { q: '입사 첫 달 월급은 어떻게 나오나요?', a: '일할 계산됩니다. 월 15일 입사면 15/30 또는 해당 월 근무일 비율로 계산해요. 보통 첫 달 월급이 절반 정도 들어와서 당황하는 분들이 많습니다.' },
          { q: '월급날 확인용으로 매달 들어와도 되나요?', a: '그래서 만든 거예요. 즐겨찾기 해두시면 매달 1일에 자동으로 이번 달 근무일, D-day, 오늘까지 번 돈이 갱신됩니다.' },
        ]}
      />

      <SeoSection title="월급날이 주말이면 언제 들어올까">
        <p>
          근로기준법은 임금을 <strong>매월 1회 이상 일정한 날짜를 정해 지급</strong>하도록 정하고 있습니다.
          정해진 지급일이 토요일·일요일·공휴일이면 실무상 <strong>직전 영업일에 앞당겨 지급</strong>하는 것이 일반적입니다.
          급여일을 뒤로 미루면 지급일을 넘긴 것이 되어 임금 체불 문제가 생길 수 있기 때문입니다.
        </p>
        <p>
          회사마다 25일, 10일, 말일 등으로 다른데, 어느 날이든 &ldquo;임금 지급일&rdquo;로 정해져 있으면
          그날을 넘겨 지급하는 것은 원칙적으로 체불입니다. 다만 근로자 동의가 있거나
          천재지변 등 부득이한 사유가 인정되는 경우는 예외입니다.
        </p>
      </SeoSection>

      <SeoSection title="첫 월급과 마지막 월급은 계산이 다릅니다">
        <p>
          입사한 달과 퇴사한 달의 급여는 근무한 날짜만큼 <strong>일할 계산</strong>하는 것이 보통입니다.
          문제는 나누는 기준일이 회사마다 다르다는 점입니다.
        </p>
        <SeoList>
          <li><strong>역일수 기준</strong> — 월 급여 ÷ 그달의 총 일수 × 근무일수. 31일인 달과 28일인 달의 일당이 달라집니다.</li>
          <li><strong>고정 30일 기준</strong> — 월 급여 ÷ 30 × 근무일수. 달마다 일당이 같습니다.</li>
          <li><strong>소정근로일 기준</strong> — 월 급여 ÷ 그달의 근무일수 × 실제 근무일수. 주말을 빼고 계산합니다.</li>
        </SeoList>
        <p>
          어느 방식을 쓰는지는 취업규칙이나 근로계약서에 명시되어 있어야 합니다.
          첫 달 급여가 예상보다 적다면 이 기준부터 확인해 보세요.
        </p>
        <p>
          한 가지 더. 4대보험료는 <strong>입사일이 속한 달부터</strong> 부과되는데,
          국민연금은 초일 입사 여부에 따라 해당 월 보험료 부과가 달라집니다.
          그래서 월 중간에 입사하면 첫 달 공제액이 다음 달과 다를 수 있습니다.
          공제 항목별 금액은 <SeoLink href="/salary/insurance">4대보험 계산기</SeoLink>에서 확인해 보세요.
        </p>
      </SeoSection>

      <SeoSection title="오늘까지 번 돈을 보면 달라지는 것">
        <p>
          연봉 3,600만원이면 월 300만원, 월 근무일 22일 기준으로 하루 약 13만 6천원입니다.
          8시간 근무라면 시간당 약 1만 7천원이고, 1분에 약 284원을 버는 셈입니다.
        </p>
        <p>
          이 숫자를 알고 나면 소비 판단이 조금 달라집니다.
          5만원짜리 결정을 앞두고 &ldquo;이게 내 3시간 노동과 바꿀 만한가&rdquo;라고 물어보게 되거든요.
          실시간으로 쌓이는 금액을 보고 싶다면 <SeoLink href="/salary/live">월급 카운터</SeoLink>를,
          세금을 뺀 실제 입금액이 궁금하다면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>를 이용해 보세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
