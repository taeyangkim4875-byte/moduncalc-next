import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CharCountCalc from "./CharCountCalc";

export const metadata: Metadata = {
  title: "글자수 세기 - 공백 포함·제외 · 바이트 · 키워드 분석 · 플랫폼별 체크",
  description: "글자수, 바이트(UTF-8/EUC-KR), 단어수, 문장수를 실시간으로 세고, 자소서·트위터·인스타 등 플랫폼별 제한 초과 여부를 한눈에 확인. 키워드 빈도 분석까지.",
  alternates: { canonical: "https://moduncalc.com/daily/charcount" },
  openGraph: {
    title: "글자수 세기 - 자소서·블로그·SNS 글자수 실시간 카운터",
    description: "글자수(공백 포함/제외), 바이트, 단어수, 키워드 빈도까지. 플랫폼별 제한 초과 체크 + 읽기 시간 + 원고지 환산.",
    url: "https://moduncalc.com/daily/charcount",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="텍스트 도구" title="글자수 세기" description="글자수·바이트·키워드 분석·플랫폼별 제한 체크를 한번에.">
      <CalculatorJsonLd name="글자수 세기" description="글자수, 바이트(UTF-8/EUC-KR), 단어수, 문장수 실시간 카운터. 자소서·SNS 플랫폼별 제한 초과 확인, 키워드 빈도 분석." url="https://moduncalc.com/daily/charcount" />
      <FaqJsonLd items={[
        {q:"한글은 몇 바이트인가요?",a:"UTF-8 기준 한글 1자 = 3바이트, EUC-KR 기준 2바이트입니다. 영문/숫자는 두 인코딩 모두 1바이트입니다."},
        {q:"자기소개서는 공백 포함인가요?",a:"대부분 공백 포함 기준입니다. 삼성 700자, LG 500자, 현대차 800자 등 기업마다 다르므로 채용 공고를 반드시 확인하세요."},
        {q:"키워드 밀도는 어떻게 활용하나요?",a:"블로그 SEO에서 핵심 키워드가 전체 텍스트의 1~3% 정도 나타나면 적정합니다. 자주 사용된 키워드 분석을 활용해 최적화하세요."},
        {q:"읽기 시간은 어떻게 계산하나요?",a:"한국어 평균 읽기 속도 분당 500자 기준으로 추정합니다. A4 1장은 약 500~600자 분량입니다."},
      ]} />
      <CharCountCalc />
    </PageLayout>
  );
}
