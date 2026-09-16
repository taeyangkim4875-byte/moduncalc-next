import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink, SeoFormula } from "@/components/SeoContent";
import Baby100Calc from "./Baby100Calc";

export const metadata: Metadata = {
  title: "아기 100일 계산기 - 백일·돌·개월 수 자동 계산",
  description: "아기 생년월일을 입력하면 백일, 200일, 돌, 주요 기념일과 현재 개월 수를 자동 계산합니다.",
  alternates: { canonical: "https://moduncalc.com/daily/baby100" },
  openGraph: {
    title: "아기 100일 계산기 - 백일·돌·개월 수 자동 계산",
    description: "아기 생년월일을 입력하면 백일, 200일, 돌, 주요 기념일과 현재 개월 수를 자동 계산합니다.",
    url: "https://moduncalc.com/daily/baby100",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="생활" title="아기 100일 계산기" description="아기 생년월일을 입력하면 백일, 돌 등 주요 기념일을 자동 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '아기 100일', href: '/daily/baby100' }]} />
      <CalculatorJsonLd name="아기 100일 계산기" description="아기 생년월일을 입력하면 100일, 200일, 돌, 주요 기념일을 자동 계산합니다." url="https://moduncalc.com/daily/baby100" />
      <FaqJsonLd items={[{q:"백일은 어떻게 세나요?",a:"태어난 날을 1일로 세어 100번째 되는 날입니다. 예를 들어 1월 1일생이면 4월 10일이 백일입니다."},{q:"돌과 첫 번째 생일은 같은 건가요?",a:"보통 같은 날이지만, 엄밀히 돌은 태어난 지 365일째 되는 날이고 생일은 같은 월일입니다. 윤년 등에 의해 하루 차이가 날 수 있습니다."}]} />
      <Baby100Calc />

      <SeoSection title="아기 백일과 돌의 의미">
        <p>
          <strong>백일(100일)</strong>은 아기가 태어난 날을 1일로 세어 100번째 되는 날입니다.
          옛날에는 영아 사망률이 높아 100일을 무사히 넘기면 축하하는 풍습이 생겼고,
          지금도 백일잔치로 이어지고 있습니다.
        </p>
        <SeoList>
          <li><strong>백일 (100일)</strong> — 태어난 날 + 99일. 백설기, 수수팥떡 등을 준비.</li>
          <li><strong>돌 (첫 번째 생일)</strong> — 태어난 날로부터 만 1년. 돌잡이·돌잔치 진행.</li>
          <li><strong>200일, 300일</strong> — 성장 기록용으로 사진 촬영하는 부모가 많음.</li>
        </SeoList>
        <p>
          백일 계산에서 가장 헷갈리는 부분은 <strong>태어난 날을 0일로 보느냐 1일로 보느냐</strong>입니다.
          한국 전통 방식은 태어난 날을 1일로 세므로, 이 계산기도 그 기준을 따릅니다.
        </p>
      </SeoSection>

      <SeoSection title="아기 개월 수 세는 법">
        <p>
          병원·육아 커뮤니티에서 말하는 개월 수는 <strong>만 나이 기준</strong>입니다.
          3월 15일생 아기는 4월 15일이 되어야 만 1개월이고,
          4월 14일까지는 아직 0개월입니다.
        </p>
        <p>
          육아 수당, 예방접종 일정, 이유식 시작 시기 등이 모두 개월 수 기준이므로
          정확한 개월 수를 아는 것이 중요합니다.
          만 나이가 헷갈릴 때는 <SeoLink href="/daily/age">나이 계산기</SeoLink>를 함께 이용해 보세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="아기 기념일, 이런 점도 궁금하실 거예요"
        items={[
          { q: '백일잔치는 꼭 100일 당일에 해야 하나요?', a: '꼭 당일이 아니어도 됩니다. 요일이나 가족 일정에 맞춰 전후 주말에 하는 경우가 많습니다. 중요한 건 날짜보다 가족이 함께 축하하는 마음입니다.' },
          { q: '돌잡이 물건에는 어떤 의미가 있나요?', a: '전통적으로 실(장수), 쌀(부유), 책/연필(학문), 돈(재물) 등을 놓습니다. 요즘은 청진기(의사), 마이크(연예인), 공(운동선수) 등 현대적 물건도 추가합니다. 재미로 하는 이벤트이니 부담 없이 즐기세요.' },
          { q: '쌍둥이의 백일·돌은 어떻게 계산하나요?', a: '같은 날 태어났으면 백일·돌도 같은 날입니다. 출생 시각이 다르더라도 날짜 단위로 계산하므로 동일합니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          연애 기념일은 <SeoLink href="/daily/anniversary">기념일 계산기</SeoLink>에서 100일·200일·1000일을 한번에 확인하고,
          출산 예정일을 역산하려면 <SeoLink href="/daily/due-date">출산 예정일 계산기</SeoLink>를 이용하세요.
          아이의 성장 지표가 궁금하면 <SeoLink href="/daily/bmi-child">어린이 BMI 계산기</SeoLink>도 유용합니다.
        </p>
      </SeoSection>

      <SeoSection title="백일·돌을 세는 방식">
        <p>
          아기 기념일은 <strong>태어난 날을 1일</strong>로 셉니다.
          1월 1일에 태어났다면 그날이 1일이고, 100일째는 4월 10일입니다.
          커플 기념일과 같은 방식이라 &ldquo;생일 + 100일&rdquo;로 계산하면 하루가 밀립니다.
        </p>
        <SeoFormula>
          <div>백일 = 생년월일 + 99일</div>
          <div>돌(첫 생일) = 생년월일 + 1년 (만 1세가 되는 날)</div>
        </SeoFormula>
        <p>
          <strong>돌은 백일과 세는 방식이 다릅니다.</strong>
          돌은 태어난 날로부터 만 1년이 되는 날, 즉 이듬해 같은 날짜입니다.
          365일째가 아니라 366일째가 돌이 되는 셈인데,
          &ldquo;만 1세가 되는 날&rdquo;이라고 생각하면 헷갈리지 않습니다.
        </p>
      </SeoSection>

      <SeoSection title="백일 전후로 챙기는 날들">
        <SeoList>
          <li><strong>삼칠일(21일)</strong> — 예로부터 산모와 아기가 외부 접촉을 피하고 몸을 회복하던 기간입니다. 요즘도 이 무렵까지는 방문을 자제하는 집이 많습니다.</li>
          <li><strong>50일</strong> — 백일 전에 가볍게 사진을 남기는 시점으로 자리 잡았습니다.</li>
          <li><strong>백일(100일)</strong> — 영아 사망률이 높던 시절, 100일을 넘기면 한숨 돌린다는 의미에서 크게 축하하던 데서 유래했습니다.</li>
          <li><strong>돌(1년)</strong> — 돌잡이를 하는 날. 만 1세 생일입니다.</li>
        </SeoList>
        <p>
          백일과 돌 사진 촬영은 예약이 몰리는 편이라 보통 <strong>한 달 전쯤 예약</strong>합니다.
          날짜를 먼저 확정해 두면 스튜디오와 가족 일정을 잡기 수월합니다.
        </p>
        <p>
          출산 전이라면 <SeoLink href="/daily/due-date">출산 예정일 계산기</SeoLink>로 주수를 확인하고,
          육아휴직 급여는 <SeoLink href="/salary/parental">육아휴직 계산기</SeoLink>에서 미리 계산해 보세요.
          아이 성장 상태는 <SeoLink href="/daily/bmi-child">어린이 BMI 계산기</SeoLink>로 확인할 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
