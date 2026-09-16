import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import { ogImageUrl } from "@/utils/og";
import { won } from "@/utils/format";
import InsuranceCalc from "./InsuranceCalc";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const salary = sp.salary ? +sp.salary : 0;

  const base: Metadata = {
    title: "4대보험 계산기 - 국민연금·건강보험·고용보험 보험료 계산 (2026)",
    description: "월 급여를 입력하면 국민연금, 건강보험, 장기요양, 고용보험 4대보험료를 근로자·사업주 부담분으로 나눠 계산합니다. 2026년 최신 요율 반영.",
    alternates: { canonical: "https://moduncalc.com/salary/insurance" },
    openGraph: {
      title: "4대보험 계산기 - 국민연금·건강보험·고용보험 보험료 (2026)",
      description: "월급 입력하면 4대보험료 상세 내역을 근로자·사업주 부담분으로 계산. 2026년 요율 적용.",
      url: "https://moduncalc.com/salary/insurance",
    },
  };

  if (salary > 0) {
    const s = salary * 10000;
    const npBase = Math.min(s, 6590000);
    const np = Math.round(npBase * 0.0475);
    const hi = Math.round(s * 0.03595);
    const ltc = Math.round(hi * 0.1314);
    const ei = Math.round(s * 0.009);
    const total = np + hi + ltc + ei;
    const resultText = `월 ${won(total)}`;
    const inputsText = `월 급여 ${salary.toLocaleString()}만원`;
    base.openGraph = {
      ...base.openGraph,
      images: [{ url: ogImageUrl({ title: '4대보험 계산기', result: resultText, inputs: inputsText, desc: '근로자 부담 보험료' }), width: 1200, height: 630 }],
    };
  }

  return base;
}

export default function Page() {
  return (
    <PageLayout eyebrow="2026 요율 기준" title="4대보험 계산기" description="국민연금·건강보험·장기요양·고용보험 보험료를 근로자·사업주로 나눠 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '연봉', href: '/salary' }, { name: '4대보험', href: '/salary/insurance' }]} />
      <CalculatorJsonLd name="4대보험 계산기" description="월 급여 입력 시 국민연금, 건강보험, 장기요양, 고용보험 4대보험료를 근로자·사업주 부담분으로 상세 계산합니다." url="https://moduncalc.com/salary/insurance" />
      <FaqJsonLd items={[
        { q: "4대보험 요율은 얼마인가요?", a: "2026년 기준 근로자 부담분은 국민연금 4.75%, 건강보험 3.595%, 장기요양 건강보험료의 13.14%, 고용보험 0.9%입니다. 사업주도 비슷한 비율을 부담합니다." },
        { q: "국민연금 상한액은 얼마인가요?", a: "2026년 7월부터 기준소득월액 상한은 659만원입니다. 월 급여가 659만원을 넘어도 국민연금은 659만원 기준으로 계산됩니다." },
        { q: "4대보험은 누가 내나요?", a: "근로자와 사업주가 절반씩 부담합니다. 다만 고용보험은 사업주가 근로자보다 약간 더 부담합니다 (150인 미만 기준 사업주 1.35%)." },
      ]} />
      <InsuranceCalc />

      <SeoSection title="4대보험이란?">
        <p>
          4대보험은 <strong>국민연금, 건강보험, 고용보험, 산업재해보상보험</strong> 네 가지 사회보험을 말합니다.
          이 중 근로자가 급여에서 직접 공제되는 것은 국민연금, 건강보험(+장기요양), 고용보험 세 가지이며,
          산재보험은 사업주가 전액 부담합니다.
        </p>
        <SeoList>
          <li><strong>국민연금</strong> — 노후 소득을 보장하는 공적 연금. 근로자·사업주 각각 4.75%씩 부담.</li>
          <li><strong>건강보험</strong> — 의료비를 보장하는 공적 보험. 근로자·사업주 각각 3.595%씩 부담.</li>
          <li><strong>장기요양보험</strong> — 노인 요양 서비스를 위한 보험. 건강보험료의 13.14%를 추가 부담.</li>
          <li><strong>고용보험</strong> — 실업급여와 직업훈련을 위한 보험. 근로자 0.9%, 사업주 1.35%(150인 미만).</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="2026년 4대보험 요율 정리">
        <SeoFormula>
          <div><strong>국민연금</strong> 근로자 4.75% + 사업주 4.75% = 9.5%</div>
          <div><strong>건강보험</strong> 근로자 3.595% + 사업주 3.595% = 7.19%</div>
          <div><strong>장기요양</strong> 건강보험료 × 13.14% (근로자·사업주 절반씩)</div>
          <div><strong>고용보험</strong> 근로자 0.9% + 사업주 1.35% = 2.25%</div>
        </SeoFormula>
        <p>
          국민연금은 <strong>기준소득월액 상한 659만원</strong>이 적용됩니다.
          월 급여가 659만원을 넘어도 보험료는 659만원 기준으로 동결됩니다.
          반대로 하한은 41만원이며, 이 이하 소득이면 41만원 기준으로 계산됩니다.
        </p>
        <p>
          건강보험과 고용보험에는 상한이 없으므로, 급여가 높을수록 보험료가 비례하여 증가합니다.
          고소득 근로자의 경우 건강보험료가 국민연금보다 많아지는 역전 현상이 나타납니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="4대보험, 이런 점도 궁금하실 거예요"
        items={[
          { q: '수습기간에도 4대보험에 가입해야 하나요?', a: '네. 1개월 이상 근무하는 근로자는 수습 여부와 관계없이 4대보험 가입 대상입니다. 사업주가 가입을 미루거나 거부하면 과태료 대상입니다.' },
          { q: '프리랜서(3.3%)도 4대보험을 내나요?', a: '프리랜서는 사업소득자로 분류되어 국민연금(지역가입자)과 건강보험(지역가입자)을 직접 납부해야 합니다. 고용보험은 가입 대상이 아니지만, 자영업자 고용보험에 자발적으로 가입할 수 있습니다.' },
          { q: '비과세 수당은 4대보험 계산에서 빠지나요?', a: '식대(월 20만원 이하), 자가운전보조금 등 비과세 항목은 소득세 계산에서는 제외되지만, 4대보험료 계산에서는 포함 여부가 보험별로 다릅니다. 국민연금과 건강보험은 비과세 포함, 고용보험은 비과세 제외가 일반적입니다.' },
          { q: '4대보험료가 매년 바뀌나요?', a: '건강보험료율과 장기요양보험료율은 매년 1월에 고시되며, 국민연금 기준소득월액 상한은 매년 7월에 변경됩니다. 고용보험률은 법 개정 시 변경됩니다. 2026년은 건강보험 7.19%, 국민연금 9.5%입니다.' },
        ]}
      />

      <SeoSection title="함께 확인하면 좋은 계산기">
        <p>
          4대보험 공제 후 실제로 손에 쥐는 금액이 궁금하다면{' '}
          <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>를 이용하세요.
          국민연금을 얼마나 받게 될지는 <SeoLink href="/pension/nps">국민연금 수령액 계산기</SeoLink>,
          퇴사 후 받을 수 있는 금액은 <SeoLink href="/pension/jobless">실업급여 계산기</SeoLink>에서 확인할 수 있습니다.
        </p>
      </SeoSection>

      <SeoSection title="2026년 4대보험 요율표">
        <p>
          근로자가 급여에서 공제당하는 항목은 국민연금, 건강보험(+장기요양), 고용보험 세 가지입니다.
          산재보험은 <strong>전액 사업주 부담</strong>이라 급여에서 빠지지 않습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">항목</th>
                <th className="text-right p-2 font-bold">총 요율</th>
                <th className="text-right p-2 font-bold">근로자</th>
                <th className="text-right p-2 font-bold">사업주</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--line)]"><td className="p-2">국민연금</td><td className="p-2 text-right">9.5%</td><td className="p-2 text-right font-bold">4.75%</td><td className="p-2 text-right">4.75%</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">건강보험</td><td className="p-2 text-right">7.19%</td><td className="p-2 text-right font-bold">3.595%</td><td className="p-2 text-right">3.595%</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">장기요양보험</td><td className="p-2 text-right">건강보험료의 13.14%</td><td className="p-2 text-right font-bold">절반</td><td className="p-2 text-right">절반</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">고용보험(실업급여)</td><td className="p-2 text-right">1.8%</td><td className="p-2 text-right font-bold">0.9%</td><td className="p-2 text-right">0.9%</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">산재보험</td><td className="p-2 text-right">업종별 상이</td><td className="p-2 text-right font-bold">없음</td><td className="p-2 text-right">전액</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          월 급여 300만원이면 근로자 부담은 국민연금 142,500원, 건강보험 107,850원,
          장기요양 약 14,170원, 고용보험 27,000원으로 <strong>합계 약 291,520원</strong>입니다.
          여기에 소득세와 지방소득세가 더 빠집니다.
        </p>
      </SeoSection>

      <SeoSection title="국민연금에만 상·하한이 있습니다">
        <p>
          건강보험과 고용보험은 소득에 정률로 붙지만,
          국민연금은 <strong>기준소득월액에 상한과 하한</strong>이 있습니다.
          2026년 7월부터 2027년 6월까지 적용되는 금액은 <strong>상한 659만원, 하한 41만원</strong>입니다.
        </p>
        <p>
          월 소득이 800만원이어도 659만원까지만 보험료를 부과하므로,
          근로자 부담 국민연금은 659만원 × 4.75% = <strong>313,025원</strong>이 최대입니다.
          반대로 월 소득이 30만원이어도 41만원을 기준으로 계산합니다.
          이 상·하한액은 전체 가입자의 평균소득 변동률에 따라 매년 7월에 조정됩니다.
        </p>
        <p>
          2026년에는 국민연금 보험료율이 9%에서 9.5%로 올랐습니다.
          연금개혁에 따라 <strong>2033년까지 매년 0.5%p씩 인상</strong>되어 13%에 도달할 예정이므로,
          앞으로 몇 년간 실수령액이 매년 조금씩 줄어드는 효과가 있습니다.
        </p>
      </SeoSection>

      <SeoSection title="건강보험료 정산이 4월에 몰리는 이유">
        <p>
          직장가입자의 건강보험료는 <strong>전년도 보수를 기준으로 임시 부과</strong>했다가,
          다음 해에 실제 보수총액을 신고받아 정산합니다. 정산 결과는 보통 <strong>4월 급여</strong>에 반영됩니다.
        </p>
        <p>
          그래서 전년도에 연봉이 올랐거나 성과급을 많이 받은 해에는
          4월에 추가 보험료가 한꺼번에 빠져 실수령액이 확 줄어듭니다.
          반대로 연봉이 줄었다면 환급받습니다. 금액이 크면 분할 납부를 신청할 수도 있습니다.
        </p>
        <p>
          공제 후 실제 입금액이 궁금하다면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>,
          내야 할 국민연금이 나중에 얼마로 돌아오는지는 <SeoLink href="/pension/nps">국민연금 계산기</SeoLink>에서 확인해 보세요.
          제도 전반은 <SeoLink href="/guide/4-insurance">4대보험 완전 정리</SeoLink>에 자세히 적어두었습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
