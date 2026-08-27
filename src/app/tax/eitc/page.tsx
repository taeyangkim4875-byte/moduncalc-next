import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import { ogImageUrl } from "@/utils/og";
import { won } from "@/utils/format";
import EitcCalc from "./EitcCalc";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const income = sp.income ? +sp.income : 0;
  const type = sp.type ? String(sp.type) : '';

  const base: Metadata = {
    title: "근로장려금 계산기 - 자녀장려금 포함 예상 수령액 (2026)",
    description: "2026년 근로장려금·자녀장려금 얼마 받을까? 총급여와 가구 유형만 입력하면 예상 지급액 바로 확인. 재산 감액까지 반영.",
    alternates: { canonical: "https://moduncalc.com/tax/eitc" },
    openGraph: {
      title: "근로장려금 계산기 - 자녀장려금 포함 예상 수령액 (2026)",
      description: "총급여·가구 유형·재산을 입력하면 근로장려금과 자녀장려금 예상액을 바로 계산. 2026년 기준.",
      url: "https://moduncalc.com/tax/eitc",
    },
  };

  if (income > 0 && type) {
    const typeLabel = type === 'single' ? '단독가구' : type === 'one-earner' ? '홑벌이' : '맞벌이';
    base.openGraph = {
      ...base.openGraph,
      images: [{ url: ogImageUrl({ title: '근로장려금 계산기', result: `총급여 ${income.toLocaleString()}만원`, inputs: typeLabel, desc: '예상 장려금 확인' }), width: 1200, height: 630 }],
    };
  }

  return base;
}

export default function Page() {
  return (
    <PageLayout eyebrow="2026 신청 기준" title="근로장려금 계산기" description="총급여와 가구 유형을 입력하면 근로장려금·자녀장려금 예상 수령액을 계산해 드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '세금', href: '/tax/income' }, { name: '근로장려금', href: '/tax/eitc' }]} />
      <CalculatorJsonLd name="근로장려금 계산기" description="2026년 근로장려금·자녀장려금 예상 수령액을 총급여, 가구 유형, 재산 기준으로 계산합니다." url="https://moduncalc.com/tax/eitc" />
      <FaqJsonLd items={[
        { q: "근로장려금은 누가 받을 수 있나요?", a: "근로소득이 있는 가구로, 단독가구 총급여 2,200만원 이하, 홑벌이 3,200만원 이하, 맞벌이 4,400만원 이하이며 가구 재산이 3억원 미만이면 신청할 수 있습니다." },
        { q: "자녀장려금은 근로장려금과 별개인가요?", a: "네, 별도입니다. 18세 미만 부양자녀가 있는 홑벌이·맞벌이 가구는 자녀 1인당 최대 100만원까지 추가로 받을 수 있습니다." },
        { q: "언제 신청하나요?", a: "정기 신청은 매년 5월 1일~31일이며, 반기 신청은 상반기분 9월, 하반기분 3월에 합니다. 기한 후 신청(6~11월)도 가능하지만 10% 감액됩니다." },
      ]} />
      <EitcCalc />

      <SeoSection title="근로장려금이란?">
        <p>
          근로장려금(EITC)은 <strong>일은 하지만 소득이 적은 근로자·사업자</strong>에게 정부가 현금으로 지원하는 제도입니다.
          2024년 귀속 기준 약 470만 가구가 수급했으며, 한 가구당 평균 100만원 이상을 받았습니다.
          소득이 일정 구간까지는 장려금이 늘어나고(점증), 최대 구간을 지나면 점차 줄어드는(점감) 구조입니다.
        </p>
        <p>
          자녀장려금은 18세 미만 부양자녀가 있는 가구에 추가로 지급되며,
          근로장려금과 별도로 자녀 1인당 최대 <strong>100만원</strong>(최소 50만원)을 받을 수 있습니다.
        </p>
      </SeoSection>

      <SeoSection title="2026년 소득 기준과 최대 지급액">
        <SeoFormula>
          <div><strong>단독가구</strong> — 총급여 2,200만원 이하, 최대 165만원</div>
          <div><strong>홑벌이가구</strong> — 총급여 3,200만원 이하, 최대 285만원</div>
          <div><strong>맞벌이가구</strong> — 총급여 4,400만원 이하, 최대 330만원</div>
          <div><strong>자녀장려금</strong> — 총급여 7,000만원 이하, 자녀 1인당 최대 100만원</div>
        </SeoFormula>
        <p>
          가구 재산(주택·토지·건물·예금·자동차 등 합산)이 <strong>2억원 초과 3억원 이하</strong>이면 산정액의 50%만 지급되고,
          <strong>3억원을 초과</strong>하면 지급 대상에서 제외됩니다.
        </p>
      </SeoSection>

      <SeoSection title="신청 방법과 일정">
        <SeoList>
          <li><strong>정기 신청 (5월)</strong> — 매년 5월 1일~31일에 신청하면 9월에 지급됩니다. 가장 일반적인 방법입니다.</li>
          <li><strong>반기 신청 (3월·9월)</strong> — 근로소득만 있는 경우 상반기분은 9월에, 하반기분은 3월에 신청할 수 있습니다. 각각 12월·6월에 지급됩니다.</li>
          <li><strong>기한 후 신청 (6~11월)</strong> — 정기 신청을 놓쳤다면 6월 1일부터 11월 30일까지 신청 가능하지만, 산정액의 <strong>10%가 감액</strong>됩니다.</li>
        </SeoList>
        <p>
          신청은 <strong>홈택스(PC/모바일)</strong>, <strong>ARS(☎ 1544-9944)</strong>, 또는 세무서 방문으로 할 수 있습니다.
          국세청에서 신청 안내문을 받은 경우 ARS로 간편하게 신청할 수 있습니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="근로장려금, 이런 점도 궁금하실 거예요"
        items={[
          { q: '프리랜서(3.3% 원천징수)도 신청할 수 있나요?', a: '네. 사업소득(프리랜서 소득 포함)이 있는 경우에도 근로장려금을 신청할 수 있습니다. 총소득이 가구 유형별 기준 이하이고 재산 요건을 충족하면 됩니다. 다만 반기 신청은 근로소득만 있는 경우에만 가능합니다.' },
          { q: '재산에 전세 보증금도 포함되나요?', a: '네, 주택 전세금(임차보증금)은 재산 합계에 포함됩니다. 다만 주택 시가가 아닌 공시가격 기준이고, 부채는 차감하지 않습니다. 자동차는 시가 기준입니다.' },
          { q: '장려금을 받으면 세금 신고를 추가로 해야 하나요?', a: '아니요. 근로장려금과 자녀장려금은 비과세 소득이므로 종합소득세 신고 시 포함하지 않습니다. 다른 정부 지원금(기초생활수급 등)의 소득 산정에도 포함되지 않습니다.' },
          { q: '맞벌이 판단 기준이 정확히 뭔가요?', a: '배우자의 총급여(또는 총소득)가 300만원 이상이면 맞벌이가구, 300만원 미만이면 홑벌이가구로 분류됩니다. 배우자가 없으면 단독가구입니다.' },
        ]}
      />

      <SeoSection title="함께 확인하면 좋은 계산기">
        <p>
          근로장려금 수급 대상이라면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>로 4대보험 공제 후 실수령액을 확인하고,
          프리랜서라면 <SeoLink href="/tax/income">종합소득세 계산기</SeoLink>로 5월 신고 세액을 미리 계산해 보세요.
          실직 상태라면 <SeoLink href="/pension/jobless">실업급여 계산기</SeoLink>도 참고하세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
