import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import DdayCalc from "./DdayCalc";

export const metadata: Metadata = {
  title: "D-day 계산기 - 날짜 차이·날짜 더하기",
  description: "그날까지 며칠 남았을까? 두 날짜 사이 일수 + 날짜 더하기/빼기 바로 계산.",
  alternates: { canonical: "https://moduncalc.com/daily/dday" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="날짜 계산" title="D-day 계산기" description="두 날짜 사이 일수를 계산해요.">
      <CalculatorJsonLd name="D-day 계산기" description="두 날짜 사이 일수와 날짜 더하기를 계산해요." url="https://moduncalc.com/daily/dday" />
      <FaqJsonLd items={[{q:"D-day와 D+day의 차이는?",a:"D-day는 목표일까지 남은 날, D+day는 기준일로부터 지난 날을 의미합니다."},{q:"음수 일수를 입력하면?",a:"과거 날짜를 계산할 수 있습니다. 과거 기념일이 며칠 전이었는지 확인할 때 유용합니다."},{q:"연애 100일은 왜 사귄 날부터 99일 뒤인가요?",a:"기념일은 사귄 첫날을 1일째로 세기 때문입니다. 따라서 100일째는 시작일에 99를 더한 날짜입니다."}]} />
      <DdayCalc />

      <SeoSection title="D-day 표기법 이해하기">
        <p>
          D-day의 D는 <strong>Day</strong>의 약자로, 원래 군사 작전에서 개시일이 확정되지 않았을 때
          쓰던 표현입니다. 지금은 시험, 전역, 결혼, 프로젝트 마감처럼
          기다리는 날을 세는 표기로 널리 쓰입니다.
        </p>
        <SeoList>
          <li><strong>D-30</strong> — 목표일까지 30일 남았다는 뜻입니다.</li>
          <li><strong>D-Day</strong> — 목표일 당일입니다. D-0으로 쓰지 않는 것이 관례입니다.</li>
          <li><strong>D+100</strong> — 기준일로부터 100일이 지났다는 뜻입니다.</li>
        </SeoList>
        <p>
          많이 헷갈리는 지점이 <strong>기념일 계산</strong>입니다.
          D-day 방식은 시작일을 0일째로 보지만, 연애 100일이나 아기 백일 같은 기념일은
          <strong> 첫날을 1일째</strong>로 셉니다. 그래서 100일 기념일은 시작일에 100이 아니라
          <strong> 99를 더한 날짜</strong>가 됩니다. 위 &lsquo;날짜 더하기&rsquo;에 99를 입력하면 정확한 날짜가 나옵니다.
        </p>
      </SeoSection>

      <SeoSection title="날짜 계산 공식">
        <SeoFormula>
          <div>남은 일수 = 목표 날짜 − 기준 날짜 (양수면 D−, 음수면 D+)</div>
          <div>주 단위 환산 = 전체 일수 ÷ 7 (몫이 주, 나머지가 일)</div>
          <div>N일째 기념일 = 시작일 + (N − 1)</div>
          <div>N일 후 날짜 = 시작일 + N</div>
        </SeoFormula>
        <p>
          이 계산기는 두 날짜를 자정 기준으로 맞춘 뒤 밀리초 차이를 하루(86,400,000ms)로 나눠 계산합니다.
          덕분에 <strong>윤년과 월별 일수 차이가 자동으로 반영</strong>되며,
          2월 29일이 끼어 있어도 별도 보정이 필요 없습니다.
          서머타임을 쓰지 않는 한국 표준시 환경에서는 오차가 발생하지 않습니다.
        </p>
        <p>
          자주 쓰이는 기준으로는 연애 기념일(100일·200일·1000일),
          아기 백일과 돌, 임신 40주(280일), 수능·자격시험 D-day,
          그리고 계약 만료일 역산 등이 있습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="날짜 계산, 이런 점도 궁금하실 거예요"
        items={[
          { q: '계약이나 법정 기한도 이 방식으로 세면 되나요?', a: '주의가 필요합니다. 민법 제157조는 기간을 일 단위로 정한 경우 첫날을 산입하지 않는 초일불산입을 원칙으로 합니다. 다만 오전 0시부터 시작하는 경우나 연령 계산에는 첫날을 포함합니다. 또 기간의 말일이 토요일이나 공휴일이면 그다음 영업일로 만료일이 밀립니다. 중요한 법정 기한은 이 계산기 결과를 참고용으로만 쓰고 반드시 별도 확인하세요.' },
          { q: '주말과 공휴일을 뺀 근무일수도 계산되나요?', a: '이 계산기는 달력상 전체 일수를 계산합니다. 근무일 기준이 필요하다면 전체 일수를 7로 나눈 주 수에 2를 곱해 주말을 빼고, 그 기간에 걸친 공휴일 수를 추가로 빼면 근사치를 얻을 수 있습니다. 예를 들어 100일은 약 14주 2일이므로 주말 28~29일을 제외하면 대략 71일 안팎이 근무일입니다.' },
          { q: '만 나이나 근속연수도 같은 방식으로 계산하나요?', a: '아닙니다. 나이와 근속연수는 일수가 아니라 연 단위 기준일로 계산합니다. 예컨대 입사 1년은 365일이 아니라 다음 해 같은 날짜를 기준으로 판단하며, 윤년이 끼면 실제 일수가 366일이 될 수 있습니다. 퇴직금이나 연차 계산에는 전용 계산기를 쓰는 편이 정확합니다.' },
          { q: '과거 날짜도 계산할 수 있나요?', a: '가능합니다. 목표 날짜를 기준 날짜보다 앞으로 두면 D+ 형태로 지난 일수가 표시됩니다. 날짜 더하기 칸에 음수를 넣으면 그만큼 이전 날짜를 구할 수 있어, 마감일에서 역산해 착수일을 정할 때 유용합니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          생년월일 기준 만 나이와 다음 생일까지 남은 일수는{' '}
          <SeoLink href="/daily/age">나이 계산기</SeoLink>에서 한 번에 확인할 수 있습니다.
          급여일까지 며칠 남았는지 세고 있다면 <SeoLink href="/salary/calendar">월급날 계산기</SeoLink>가 편하고,
          입사일 기준 연차 발생일이 궁금하다면 <SeoLink href="/salary/annual">연차 계산기</SeoLink>를,
          퇴사를 앞두고 재직일수를 세는 중이라면 <SeoLink href="/salary/severance">퇴직금 계산기</SeoLink>를 이용해 보세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
