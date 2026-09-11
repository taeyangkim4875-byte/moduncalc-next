import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import LiveCounter from "./LiveCounter";
export const metadata: Metadata = { title: "월급 카운터 - 지금 이 순간 벌고 있는 돈", description: "지금 이 순간에도 돈을 벌고 있다! 연봉 입력하면 초당 버는 돈을 실시간으로 보여드려요.", alternates: { canonical: "https://moduncalc.com/salary/live" },
  openGraph: {
    title: "월급 카운터 - 지금 이 순간 벌고 있는 돈",
    description: "지금 이 순간에도 돈을 벌고 있다! 연봉 입력하면 초당 버는 돈을 실시간으로 보여드려요.",
    url: "https://moduncalc.com/salary/live",
  },};
export default function Page() {
  return (
    <PageLayout eyebrow="연봉" title="월급 카운터" description="지금 이 순간에도 얼마를 벌고 있는지 확인해 보세요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }, { name: '월급 카운터', href: '/salary/live' }]} />
      <CalculatorJsonLd name="월급 카운터" description="연봉을 입력하면 초 단위로 돈이 올라갑니다." url="https://moduncalc.com/salary/live" />
      <FaqJsonLd items={[{q:"세전 기준인가요?",a:"네, 세전 연봉 기준입니다. 실수령 기준으로 보려면 연봉 실수령액 계산기를 먼저 이용하세요."},{q:"근무일수 252일은 어떻게 나온 건가요?",a:"연 365일에서 주말(104일)과 공휴일(약 15일)을 제외한 일반적인 근무일수입니다."}]} />
      <LiveCounter />

      <SeoSection title="화장실 가는 동안에도 돈을 벌고 있어요">
        <p>연봉 4,000만원이면 초당 약 5.5원을 벌고 있습니다. 화장실 다녀오는 5분 동안 1,650원, 점심시간 1시간이면 19,800원이에요. 솔직히 이렇게 보면 야근할 때 위로가 좀 됩니다.</p>
        <p>재밌는 건, 회의 시간을 돈으로 환산해보면 생각이 달라져요. 5명이 1시간 회의하면 인건비만 최소 10만원 이상입니다. 그 회의가 이메일 하나로 대체됐으면 10만원을 아낀 거예요. 회사 입장에서 회의를 줄이려는 이유가 있습니다.</p>
      </SeoSection>

      <SeoSection title="연봉별 초당 금액, 얼마나 차이 날까?">
        <p>연봉에 따라 초당 버는 돈이 꽤 다릅니다. 근무일 252일, 하루 8시간 기준으로 환산하면 이렇습니다.</p>
        <SeoList>
          <li><strong>연봉 3,000만원</strong> — 시급 14,880원, 분당 248원, 초당 4.1원</li>
          <li><strong>연봉 4,000만원</strong> — 시급 19,840원, 분당 331원, 초당 5.5원</li>
          <li><strong>연봉 5,000만원</strong> — 시급 24,800원, 분당 413원, 초당 6.9원</li>
          <li><strong>연봉 7,000만원</strong> — 시급 34,720원, 분당 579원, 초당 9.6원</li>
          <li><strong>연봉 1억원</strong> — 시급 49,600원, 분당 827원, 초당 13.8원</li>
        </SeoList>
        <p>근데 여기서 충격적인 게 하나 있어요. 2026년 최저시급이 10,470원이거든요. 연봉 3,000만원이면 시급이 14,880원인데, 주 52시간 꽉 채워 일하면 실질 시급이 11,000원대까지 내려갑니다. 야근 많이 하는 분들은 사실상 편의점 알바 시급이랑 비슷해지는 셈이에요. <SeoLink href="/salary/minimum">최저시급 계산기</SeoLink>에서 본인 실질 시급을 확인해 보세요.</p>
      </SeoSection>

      <SeoSection title="회의 비용, 생각보다 비쌉니다">
        <p>회의를 돈으로 환산하면 생각이 달라집니다. 연봉 5,000만원인 직원 기준으로 시급이 약 25,000원이에요.</p>
        <SeoList>
          <li><strong>3명 × 30분 회의</strong> = 37,500원</li>
          <li><strong>5명 × 1시간 회의</strong> = 125,000원</li>
          <li><strong>10명 × 1시간 회의</strong> = 250,000원</li>
        </SeoList>
        <p>매주 10명짜리 회의를 한 번씩 하면 한 달에 100만원, 1년이면 1,200만원입니다. 사실 여기에 회의 준비 시간, 집중력 끊기는 비용까지 합하면 실제 손실은 더 큽니다. 슬랙 메시지로 끝날 일을 회의로 잡는 건, 말 그대로 돈을 태우는 거예요.</p>
        <p>본인 연봉의 실수령액이 궁금하면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>를, 연봉을 물건값으로 환산하고 싶으면 <SeoLink href="/salary/convert">연봉 환산기</SeoLink>를 써보세요.</p>
      </SeoSection>

      <SeoFaq
        title="월급 카운터 관련 궁금한 점"
        items={[
          { q: '근무시간 외에도 돈이 올라가나요?', a: '이 카운터는 연봉을 365일 24시간으로 나눈 개념이에요. 실제로는 근무일 기준이지만, 재미로 보는 용도라 24시간 돌아갑니다.' },
          { q: '연봉 1억이면 초당 얼마인가요?', a: '초당 약 13.7원입니다. 1분에 822원, 1시간에 49,300원이에요. 커피 한 잔(5,000원)을 벌려면 약 6분이 걸립니다.' },
          { q: '이거 보면서 뭐 하나요?', a: '월급날까지 카운터 틀어놓는 분들이 많아요. 숫자가 올라가는 걸 보면 나름 동기부여가 된다는 후기가 있습니다. 연봉 협상 전에 현실 체감용으로도 써보세요.' },
          { q: '세후 기준으로 보고 싶은데 어떻게 하나요?', a: '이 카운터는 세전 연봉 기준이에요. 세후 금액으로 보려면 연봉 실수령액 계산기에서 실수령액을 먼저 확인한 뒤, 그 금액을 여기에 입력하면 됩니다.' },
          { q: '야근해도 초당 금액이 같나요?', a: '연봉제 직원은 야근해도 총 연봉이 같으니까 근무시간이 늘수록 실질 시급은 떨어집니다. 주 52시간 꽉 채우면 주 40시간 대비 시급이 23% 낮아져요. 야근 수당 없는 포괄임금제라면 더 심합니다.' },
        ]}
      />
    </PageLayout>
  );
}
