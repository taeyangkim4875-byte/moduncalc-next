import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import AgeCalc from "./AgeCalc";

export const metadata: Metadata = {
  title: "나이 계산기 - 만 나이·한국 나이·띠·별자리",
  description: "나는 만 몇 살? 생년월일 입력하면 만 나이·한국 나이·띠·별자리 한번에 확인.",
  alternates: { canonical: "https://moduncalc.com/daily/age" },
  openGraph: {
    title: "나이 계산기 - 만 나이·한국 나이·띠·별자리",
    description: "나는 만 몇 살? 생년월일 입력하면 만 나이·한국 나이·띠·별자리 한번에 확인.",
    url: "https://moduncalc.com/daily/age",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="나이 계산" title="나이 계산기" description="만 나이, 한국 나이, 띠, 별자리를 알려드려요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '나이', href: '/daily/age' }]} />
      <CalculatorJsonLd name="나이 계산기" description="생년월일로 만 나이, 한국 나이, 띠, 별자리를 알려드려요." url="https://moduncalc.com/daily/age" />
      <FaqJsonLd items={[{q:"만 나이가 법적 기준인가요?",a:"네. 2023년 6월 28일 시행된 이른바 만 나이 통일법에 따라 민법과 행정기본법상 나이는 별도 규정이 없으면 모두 만 나이로 해석합니다."},{q:"띠(십이지)는 어떻게 정해지나요?",a:"태어난 해를 12로 나눈 나머지로 정해집니다. 자(쥐)부터 해(돼지)까지 12년 주기입니다."},{q:"세는 나이와 연 나이는 어떻게 다른가요?",a:"세는 나이는 태어나자마자 1세로 시작해 해가 바뀔 때마다 한 살을 더하고, 연 나이는 현재 연도에서 출생 연도를 뺀 값입니다. 같은 사람이라도 세는 나이가 연 나이보다 항상 한 살 많습니다."}]} />
      <AgeCalc />

      <SeoSection title="한국에서 쓰는 세 가지 나이 셈법">
        <p>
          한국에는 오랫동안 나이를 세는 방식이 세 가지 공존해 왔습니다.
          2023년 6월 28일 <strong>만 나이 통일법</strong>이 시행되면서 법령상 나이는 만 나이로 정리됐지만,
          일부 법률과 일상 대화에서는 여전히 다른 방식이 쓰입니다.
        </p>
        <SeoList>
          <li><strong>만 나이</strong> — 태어난 날 0세에서 시작해 생일마다 한 살씩 더합니다. 민법·행정기본법의 기본 기준이며, 국제적으로 통용되는 방식입니다.</li>
          <li><strong>세는 나이(한국 나이)</strong> — 태어나자마자 1세, 이후 매년 1월 1일에 한 살씩 더합니다. 법적 효력은 없지만 일상 대화에서 가장 널리 쓰입니다.</li>
          <li><strong>연 나이</strong> — 현재 연도에서 출생 연도만 뺀 값입니다. 생일과 무관하게 같은 해에 태어난 사람은 모두 같은 나이가 됩니다.</li>
        </SeoList>
        <p>
          연 나이는 폐지된 것이 아니라 <strong>병역법, 청소년보호법, 초·중등교육법</strong> 등에 그대로 남아 있습니다.
          그래서 술·담배 구매 가능 여부나 병역 판정검사 시기는 생일이 지나지 않았어도
          그해 1월 1일부터 기준이 적용됩니다.
        </p>
      </SeoSection>

      <SeoSection title="나이 계산 공식">
        <SeoFormula>
          <div>만 나이 = 올해 − 출생연도 (생일이 지나지 않았으면 −1)</div>
          <div>세는 나이 = 올해 − 출생연도 + 1</div>
          <div>연 나이 = 올해 − 출생연도</div>
          <div>띠 = 출생연도를 12로 나눈 나머지 (자·축·인··· 12년 주기)</div>
        </SeoFormula>
        <p>
          1995년 5월 20일생을 2026년 3월 기준으로 계산하면, 생일이 아직 지나지 않았으므로
          만 나이는 <strong>30세</strong>, 세는 나이는 <strong>32세</strong>, 연 나이는 <strong>31세</strong>가 됩니다.
          같은 사람인데 표기가 세 가지로 갈리는 셈이라, 서류를 작성할 때는
          어떤 기준을 묻는지 확인하는 편이 안전합니다.
        </p>
        <p>
          별자리는 태어난 <strong>월과 일</strong>로 정해지며 매년 경계일이 하루 정도 움직입니다.
          이 계산기는 통용되는 표준 경계일을 기준으로 판정합니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="나이 계산, 이런 점도 궁금하실 거예요"
        items={[
          { q: '만 나이 통일법 이후 실제로 무엇이 바뀌었나요?', a: '법령·계약서·공문서에 나이가 특별한 설명 없이 적혀 있으면 모두 만 나이로 해석하도록 정리됐습니다. 다만 취학 연령, 병역 의무, 주류·담배 구매 기준처럼 개별 법률이 연 나이를 따로 정한 경우는 예외로 남았습니다. 정년, 국민연금 수급 개시 연령, 각종 복지 혜택 기준은 원래부터 만 나이였으므로 실질적인 변화는 없습니다.' },
          { q: '이른바 빠른 년생은 지금 어떻게 되나요?', a: '1~2월생을 한 해 일찍 입학시키던 조기입학 제도는 2009년에 사실상 폐지됐습니다. 그 이전 출생자는 학년과 나이가 어긋나는 경우가 있지만, 법적 나이 계산에는 아무 영향이 없습니다. 만 나이든 연 나이든 실제 출생 연월일만으로 계산합니다.' },
          { q: '띠는 1월 1일 기준인가요, 입춘 기준인가요?', a: '두 가지 관점이 모두 쓰입니다. 일반적으로는 양력 1월 1일을 기준으로 띠를 구분하고, 이 계산기도 그 방식을 따릅니다. 반면 사주명리에서는 절기상 한 해의 시작인 입춘(양력 2월 4일 무렵)을 기준으로 삼습니다. 그래서 1월이나 2월 초 출생자는 보는 관점에 따라 띠가 달라질 수 있습니다.' },
          { q: '만 나이로 챙겨야 할 주요 시점은 언제인가요?', a: '만 19세에 성년이 되어 단독으로 계약할 수 있고, 만 60세부터 국민연금 임의계속가입이 가능해집니다. 노령연금 수급 개시 연령은 출생 연도에 따라 만 62세에서 65세까지 단계적으로 올라갑니다. 만 65세부터는 기초연금과 지하철 경로 우대 대상이 됩니다.' },
        ]}
      />

      <SeoSection title="날짜와 관련된 다른 계산기">
        <p>
          다음 생일이나 기념일까지 남은 일수를 세어보려면{' '}
          <SeoLink href="/daily/dday">D-day 계산기</SeoLink>가 편리합니다.
          노후 준비를 점검 중이라면 <SeoLink href="/pension/nps">국민연금 예상 수령액 계산기</SeoLink>로
          만 나이 기준 수급 개시 시점과 금액을 확인해 보세요.
          은퇴 시점을 역산해 보고 싶다면 <SeoLink href="/guide/fire-retirement">FIRE 조기 은퇴 가이드</SeoLink>,
          연령대별 급여 수준이 궁금하다면 <SeoLink href="/salary">연봉 실수령액·백분위 계산기</SeoLink>를 참고하세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
