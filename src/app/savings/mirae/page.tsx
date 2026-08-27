import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import MiraeCalculator from "./MiraeCalculator";

export const metadata: Metadata = {
  title: "청년미래적금 계산기 - 지금까지 모은 돈 · 은행별 우대금리 비교 · 만기 수령액",
  description: "내 미래적금에 지금 얼마 쌓였을까? 7개 은행 우대금리 한눈에 비교 + 정부기여금 포함 만기 수령액 계산.",
  alternates: { canonical: "https://moduncalc.com/savings/mirae" },
  openGraph: { title: "청년미래적금 계산기 - 은행별 우대금리 비교 · 지금까지 모은 돈", description: "KB·NH·신한·하나·우리·기업·우체국 우대금리 비교 + 만기 수령액 바로 계산.", url: "https://moduncalc.com/savings/mirae" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="도약계좌에서 환승한 가입자의 계산기" title="청년미래적금 계산기" description="환승 후기 + 은행별 우대금리 비교 + 만기 수령액 계산">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '적금', href: '/savings' }, { name: '청년미래적금', href: '/savings/mirae' }]} />
      <CalculatorJsonLd name="청년미래적금 계산기" description="2026 청년미래적금 은행별 우대금리 비교와 3년 만기 실수령액 시뮬레이션." url="https://moduncalc.com/savings/mirae" />
      <FaqJsonLd items={[{q:"우대금리를 중간에 못 채우면?",a:"충족하지 못한 항목의 우대금리만 빠지고, 기본금리 5%와 나머지 우대금리는 유지됩니다."},{q:"도약계좌에서 환승할 수 있나요?",a:"환승은 최초 신청 기간(2026.6.22~7.3)에 단 한 번만 가능했습니다. 미래적금 가입 신청 → 계좌 개설 후 도약계좌를 특별중도해지하는 순서입니다."},{q:"어떤 은행이 가장 유리한가요?",a:"금리 자체는 1그룹 은행이 동일(최대 8%)이지만, 우대 조건 달성 난이도가 다릅니다. 주거래 은행을 선택하는 것이 가장 현실적입니다."}]} />
      <MiraeCalculator />

      <SeoSection title="미래적금 우대금리, 은행별로 진짜 다 다릅니다">
        <p>
          기본금리 5%에 우대금리 최대 3%를 합하면 연 8%까지 가능하다고 하는데,
          솔직히 우대금리 3%를 다 받는 건 쉽지 않습니다.
          급여이체, 카드 실적, 자동이체, 앱 로그인 같은 조건을 매달 빠짐없이 채워야 하거든요.
        </p>
        <p>
          은행별로 우대 조건의 난이도가 꽤 달라요.
          KB국민은행은 급여이체 + KB카드 30만원 실적이 핵심이고,
          NH농협은 농협카드 30만원 + 올원뱅크 로그인이 주요 조건입니다.
          이미 주거래 은행이 있다면 그 은행에서 가입하는 게 우대금리 충족이 가장 현실적이에요.
        </p>
        <p>
          카드 실적 조건이 가장 까다로운데, 이미 쓰는 카드가 해당 은행 카드가 아니면
          새로 발급받아서 소비 패턴을 바꿔야 합니다.
          월 30만원 실적이면 어렵지 않다고 생각할 수 있는데,
          공과금이나 보험료 같은 자동결제는 실적에서 빠지는 은행도 있으니 약관을 확인하세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="청년미래적금 실전 Q&A"
        items={[
          { q: '우대금리 조건을 한두 달 못 채우면 어떻게 되나요?', a: '해당 월의 우대금리만 빠지고 나머지 달은 유지됩니다. 기본금리 5%는 무조건 적용되니까 한두 달 놓쳤다고 크게 손해 보진 않아요.' },
          { q: '도약계좌 환승은 아직 가능한가요?', a: '환승 신청 기간은 2026년 6월 22일~7월 3일이었고, 이미 종료되었습니다. 추가 환승 기회가 있을지는 아직 미정이에요.' },
          { q: '3년 만기 전에 해지하면 금리가 어떻게 되나요?', a: '중도해지 시 기본금리의 일부만 적용되고 우대금리는 전부 사라집니다. 가입 후 1년 미만이면 연 1% 수준의 해지이율이 적용돼서 일반 적금보다도 불리해요.' },
          { q: '총급여 5,000만원 기준, 세전인가요 세후인가요?', a: '세전 총급여(연봉) 기준입니다. 근로소득원천징수영수증의 총급여란 금액이 5,000만원 이하여야 가입 자격이 있어요.' },
        ]}
      />
    </PageLayout>
  );
}
