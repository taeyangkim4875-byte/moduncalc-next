import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import TimeCalc from "./TimeCalc";

export const metadata: Metadata = {
  title: "시간 계산기 - 시간 더하기 빼기 · 근무시간 · 시간 차이",
  description: "출근부터 퇴근까지 실 근무시간은? 시간 차이·더하기·빼기 + 시급 환산까지.",
  alternates: { canonical: "https://moduncalc.com/daily/time" },
  openGraph: {
    title: "시간 계산기 - 시간 더하기 빼기 · 근무시간 · 시간 차이",
    description: "두 시간 사이의 차이를 계산하거나, 시간을 더하고 빼세요. 근무시간, 알바 시간 계산에 활용.",
    url: "https://moduncalc.com/daily/time",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="일상 도구" title="시간 계산기" description="시간 차이, 시간 더하기/빼기, 근무시간 계산을 한번에.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '시간 계산기', href: '/daily/time' }]} />
      <CalculatorJsonLd name="시간 계산기" description="두 시간 사이의 차이를 계산하거나, 시간을 더하고 빼세요. 근무시간, 알바 시간 계산에 활용." url="https://moduncalc.com/daily/time" />
      <FaqJsonLd items={[
        {q:"야간수당은 어떻게 계산하나요?",a:"근로기준법상 22시~06시 사이의 근로에 대해 통상임금의 50%를 가산하여 지급합니다. 시급 10,000원이면 야간 시간대는 15,000원이 됩니다."},
        {q:"주 52시간제란 무엇인가요?",a:"주 52시간제는 1주 법정근로시간 40시간 + 연장근로 12시간으로 최대 주 52시간까지 근무할 수 있는 제도입니다. 5인 이상 사업장에 적용됩니다."},
        {q:"휴게시간은 법적으로 어떻게 되나요?",a:"근로기준법상 4시간 근무 시 30분 이상, 8시간 근무 시 1시간 이상의 휴게시간을 부여해야 합니다. 휴게시간은 근로시간에 포함되지 않습니다."},
      ]} />
      <TimeCalc />

      <SeoSection title="알바 시급 제대로 받고 있는지 확인하는 법">
        <p>편의점에서 오후 6시부터 밤 12시까지 일했는데, 사장님이 6시간분만 주면 안 되거든요. 22시 이후 2시간은 야간수당이 붙어서 시급의 1.5배를 받아야 합니다. 2026년 최저시급 10,470원 기준으로 22시~24시는 시간당 15,705원이에요.</p>
        <p>근데 휴게시간도 꼭 확인하세요. 4시간 일하면 30분, 8시간 일하면 1시간 쉬어야 하는데 이건 근무시간에 안 들어갑니다. 사실 편의점이나 카페에서는 손님 없을 때 잠깐 쉬는 걸 휴게로 치는 경우가 많은데, 자유롭게 이용할 수 없으면 그건 대기 시간이라 근무시간입니다.</p>
      </SeoSection>

      <SeoFaq
        title="근무시간 관련 궁금한 점"
        items={[
          { q: '주휴수당은 시간 계산에 포함되나요?', a: '주 15시간 이상 근무하면 1일분 주휴수당이 생깁니다. 시급에 포함되지 않고 별도로 계산하는 거라서 시간 계산기와는 별개예요.' },
          { q: '야간·연장·휴일근무가 겹치면 어떻게 되나요?', a: '가산율이 각각 적용돼서 최대 시급의 2배까지 올라갑니다. 예를 들어 휴일 야간 연장근무는 통상임금의 200%예요.' },
          { q: '점심시간도 근무시간인가요?', a: '아닙니다. 자유롭게 이용할 수 있는 휴게시간은 근무시간에서 제외됩니다. 다만 업무 대기 상태면 근무시간으로 봅니다.' },
        ]}
      />
    </PageLayout>
  );
}
