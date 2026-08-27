import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import CharCountCalc from "./CharCountCalc";

export const metadata: Metadata = {
  title: "글자수 세기 - 공백 포함·제외 · 바이트 · 키워드 분석 · 플랫폼별 체크",
  description: "자소서 글자수 제한 초과? 붙여넣기만 하면 글자수·바이트·단어수 + 플랫폼별 제한 체크 + 키워드 분석까지 무료.",
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
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '글자수', href: '/daily/charcount' }]} />
      <CalculatorJsonLd name="글자수 세기" description="글자수, 바이트(UTF-8/EUC-KR), 단어수, 문장수 실시간 카운터. 자소서·SNS 플랫폼별 제한 초과 확인, 키워드 빈도 분석." url="https://moduncalc.com/daily/charcount" />
      <FaqJsonLd items={[
        {q:"한글은 몇 바이트인가요?",a:"UTF-8 기준 한글 1자 = 3바이트, EUC-KR 기준 2바이트입니다. 영문/숫자는 두 인코딩 모두 1바이트입니다."},
        {q:"자기소개서는 공백 포함인가요?",a:"대부분 공백 포함 기준입니다. 삼성 700자, LG 500자, 현대차 800자 등 기업마다 다르므로 채용 공고를 반드시 확인하세요."},
        {q:"키워드 밀도는 어떻게 활용하나요?",a:"블로그 SEO에서 핵심 키워드가 전체 텍스트의 1~3% 정도 나타나면 적정합니다. 자주 사용된 키워드 분석을 활용해 최적화하세요."},
        {q:"읽기 시간은 어떻게 계산하나요?",a:"한국어 평균 읽기 속도 분당 500자 기준으로 추정합니다. A4 1장은 약 500~600자 분량입니다."},
      ]} />
      <CharCountCalc />

      <SeoSection title="자소서 글자수, 기업마다 기준이 다릅니다">
        <p>
          취준생이라면 한 번쯤 경험했을 거예요 — 열심히 쓴 자소서가 글자수 초과로 잘리는 거.
          문제는 <strong>&quot;공백 포함&quot;인지 &quot;공백 제외&quot;인지</strong>가 기업마다 다르다는 겁니다.
        </p>
        <SeoList>
          <li><strong>삼성</strong> — 항목당 700자 (공백 포함)</li>
          <li><strong>LG</strong> — 항목당 500자 (공백 포함)</li>
          <li><strong>현대차</strong> — 항목당 800자 (공백 포함)</li>
          <li><strong>SK</strong> — 항목당 500~700자 (공백 포함)</li>
          <li><strong>공기업·공사</strong> — 대부분 바이트 기준 (EUC-KR 2,000바이트 = 한글 약 1,000자)</li>
        </SeoList>
        <p>
          특히 공기업은 &quot;바이트&quot; 기준인 경우가 많아서, 한글(2바이트)과 영문(1바이트)이 다르게 카운트됩니다.
          제출 전에 반드시 확인하세요.
        </p>
      </SeoSection>

      <SeoSection title="SNS·블로그 글자수 제한 총정리">
        <SeoList>
          <li><strong>인스타그램 캡션</strong> — 2,200자 (해시태그 30개까지)</li>
          <li><strong>트위터(X)</strong> — 280자 (유료 구독자는 25,000자)</li>
          <li><strong>네이버 블로그 제목</strong> — 100자 (검색 노출은 약 35자까지)</li>
          <li><strong>유튜브 제목</strong> — 100자 (모바일 표시는 약 50자)</li>
          <li><strong>카카오톡 프로필 상태메시지</strong> — 60자</li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="글자수 관련 궁금증"
        items={[
          { q: '한글 1자는 몇 바이트인가요?', a: 'UTF-8 인코딩에서 한글 1자는 3바이트, EUC-KR에서는 2바이트입니다. 영문·숫자·공백은 두 인코딩 모두 1바이트입니다. 공기업 자소서에서 "2,000바이트"라고 하면 한글 기준 약 1,000자입니다.' },
          { q: '글자수를 줄이는 팁이 있나요?', a: '불필요한 조사·접속사 줄이기, "~하는 것"을 명사형으로 바꾸기, 중복 표현 삭제하기. "~라고 생각합니다"를 "~입니다"로만 바꿔도 4~5자씩 줄어듭니다.' },
          { q: '키워드 밀도가 SEO에 중요한가요?', a: '핵심 키워드가 전체 텍스트의 1~3% 정도면 적정합니다. 너무 많으면 오히려 구글이 "키워드 스터핑"으로 판단해 순위가 내려갈 수 있어요.' },
        ]}
      />
    </PageLayout>
  );
}
