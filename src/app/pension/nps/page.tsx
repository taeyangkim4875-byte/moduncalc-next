import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { ogImageUrl } from "@/utils/og";
import { won } from "@/utils/format";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import PensionCalculator from "./PensionCalculator";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const income = sp.income ? +sp.income : 0;
  const years = sp.years ? +sp.years : 0;

  const base: Metadata = {
    title: "2026 국민연금 계산기 - 예상 월 수령액",
    description: "내 국민연금 월 얼마 받을까? 소득·가입기간 입력하면 예상 수령액 바로 계산. 2026 연금개혁 반영.",
    alternates: { canonical: "https://moduncalc.com/pension/nps" },
    openGraph: {
      title: "2026 국민연금 계산기 - 예상 월 수령액 조회",
      description: "현재 소득과 가입기간으로 노후 국민연금 예상 수령액을 계산. 2026 연금개혁 보험료율 9.5% 반영.",
      url: "https://moduncalc.com/pension/nps",
    },
  };

  if (income > 0 && years >= 10) {
    const NPS_CONST = 1.29, NPS_A = 3193511, NPS_CAP = 6370000, NPS_FLOOR = 400000;
    const B = Math.min(Math.max(income * 10000, NPS_FLOOR), NPS_CAP);
    const n = Math.max(0, (years - 20)) * 12;
    const baseRatio = Math.min(years, 20) / 20;
    const basicYear = NPS_CONST * (NPS_A + B) * baseRatio * (1 + 0.05 * n / 12);
    const monthly = basicYear / 12;

    base.openGraph = {
      ...base.openGraph,
      images: [{ url: ogImageUrl({ title: '국민연금 계산기', result: `월 ${won(monthly)}`, inputs: `월 소득 ${income}만원 · ${years}년 가입` }), width: 1200, height: 630 }],
    };
  }

  return base;
}

export default function Page() {
  return (
    <PageLayout eyebrow="2026 국민연금 개혁 반영" title="국민연금 계산기" description="지금 소득·가입기간으로 노후에 매월 받을 예상 연금액을 알려드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연금', href: '/pension' }, { name: '국민연금', href: '/pension/nps' }]} />
      <CalculatorJsonLd name="국민연금 계산기" description="지금 소득과 가입기간으로 노후에 매달 받을 국민연금 예상액을 계산하세요." url="https://moduncalc.com/pension/nps" />
      <FaqJsonLd items={[{q:"10년 미만 가입하면 연금을 못 받나요?",a:"10년 미만이면 노령연금 대신 반환일시금으로 받게 됩니다."},{q:"연금을 조기에 받을 수 있나요?",a:"가입기간 10년 이상이면 최대 5년 앞당겨 받을 수 있지만, 연 6%씩 감액됩니다."},{q:"가입기간이 길수록 유리한가요?",a:"네, 가입기간이 길수록 연금액이 비례하여 증가합니다."}]} />
      <PensionCalculator />

      <SeoSection title="국민연금, 내가 받을 수 있는 금액의 현실">
        <p>
          2026년부터 국민연금 보험료율이 9%에서 9.5%로 올랐습니다. 근로자 부담 4.75%, 사업주 부담 4.75%.
          월급 300만원이면 매달 142,500원이 빠지는 건데, 솔직히 체감이 되긴 합니다.
          근데 이게 나중에 돌려받을 수 있는 돈이니까 그냥 세금이랑은 다르죠.
        </p>
        <p>
          연금 수령액 계산에서 핵심은 A값(전체 가입자 평균소득월액)과 B값(본인 기준소득월액)입니다.
          2026년 A값은 약 319만원이에요. 소득이 이보다 낮으면 소득재분배 효과로 납부 대비 수령이 유리하고,
          높으면 상대적으로 불리합니다.
        </p>
        <p>
          연기수령을 하면 1년 늦출 때마다 7.2%씩 연금이 늘어납니다. 5년 미루면 36% 증가.
          반대로 조기수령은 1년당 6%씩 감액돼서 5년 앞당기면 30% 깎입니다.
          건강 상태랑 다른 소득원이 있는지에 따라 판단이 달라지는 부분이에요.
        </p>
      </SeoSection>

      <SeoFaq
        title="국민연금 실전 Q&A"
        items={[
          { q: '10년 못 채우면 낸 돈은 어떻게 되나요?', a: '60세 도달 시 가입기간이 10년 미만이면 반환일시금으로 원금+이자를 돌려받습니다. 다만 임의계속가입으로 60세 이후에도 납부를 이어가서 10년을 채울 수도 있어요.' },
          { q: '기준소득월액 상한이 뭔가요?', a: '2026년 7월부터 기준소득월액 상한은 659만원입니다. 월급이 700만원이든 1,000만원이든 659만원 기준으로만 보험료가 산정돼요.' },
          { q: '국민연금도 세금을 내야 하나요?', a: '네. 연금소득도 종합소득세 과세 대상입니다. 다만 연간 연금소득이 일정 금액 이하면 분리과세를 선택할 수 있고, 실효세율은 크지 않은 편이에요.' },
        ]}
      />
    </PageLayout>
  );
}
