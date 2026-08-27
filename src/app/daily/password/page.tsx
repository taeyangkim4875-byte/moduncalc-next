import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import PasswordGen from "./PasswordGen";

export const metadata: Metadata = {
  title: "비밀번호 생성기 - 안전한 랜덤 비밀번호 만들기",
  description: "해킹 걱정 없는 안전한 비밀번호를 1초 만에 생성. 길이·특수문자 설정 + 강도 표시.",
  alternates: { canonical: "https://moduncalc.com/daily/password" },
  openGraph: {
    title: "비밀번호 생성기 - 안전한 랜덤 비밀번호 만들기",
    description: "강력한 랜덤 비밀번호를 즉시 생성. 길이, 대소문자, 숫자, 특수문자 옵션 설정. 비밀번호 강도 표시.",
    url: "https://moduncalc.com/daily/password",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="일상 도구" title="비밀번호 생성기" description="강력한 랜덤 비밀번호를 즉시 생성하세요. 길이와 문자 조합을 설정하고 강도를 확인합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '비밀번호', href: '/daily/password' }]} />
      <CalculatorJsonLd name="비밀번호 생성기" description="강력한 랜덤 비밀번호를 즉시 생성. 길이, 대소문자, 숫자, 특수문자 옵션 설정 가능. 비밀번호 강도 표시." url="https://moduncalc.com/daily/password" />
      <FaqJsonLd items={[
        {q:"안전한 비밀번호 길이는 최소 몇 자인가요?",a:"최소 12자 이상이 권장됩니다. 16자 이상이면 브루트포스 공격에 대한 안전성이 크게 높아집니다. 대소문자, 숫자, 특수문자를 모두 포함하는 것이 중요합니다."},
        {q:"비밀번호를 사이트마다 다르게 써야 하나요?",a:"반드시 다르게 사용해야 합니다. 하나의 사이트가 해킹되면 같은 비밀번호를 쓰는 다른 모든 계정이 위험해집니다. 비밀번호 관리자를 사용하면 편리합니다."},
        {q:"생성된 비밀번호는 안전한가요?",a:"이 생성기는 브라우저의 crypto.getRandomValues()를 사용하여 암호학적으로 안전한 난수를 생성합니다. 비밀번호는 서버로 전송되지 않으며 브라우저에서만 처리됩니다."},
      ]} />
      <PasswordGen />

      <SeoSection title="비밀번호, 진짜 바꿔야 할 때">
        <p>솔직히 비밀번호 바꾸라는 팝업 뜨면 대부분 뒤에 숫자 1 붙이고 끝내잖아요. 근데 2024년 한국인터넷진흥원(KISA) 발표 보면 개인정보 유출 사고의 68%가 비밀번호 재사용 때문이었습니다. 네이버 비번이랑 은행 비번이 같다? 사실 그거 하나만 뚫려도 전부 위험해요.</p>
        <p>요즘은 비밀번호 관리 앱을 쓰는 게 현실적입니다. 삼성 패스, 아이폰 키체인, 1Password 같은 도구로 사이트마다 다른 비밀번호를 저장해두면 외울 필요가 없어요. 이 생성기로 16자 이상 랜덤 비밀번호를 만들고 관리 앱에 저장하면 끝입니다.</p>
      </SeoSection>

      <SeoFaq
        title="비밀번호 관련 자주 묻는 질문"
        items={[
          { q: '특수문자 꼭 넣어야 하나요?', a: '사실 길이가 더 중요합니다. 8자 + 특수문자보다 16자 영숫자 조합이 브루트포스에 훨씬 강해요. 근데 대부분 사이트가 특수문자를 요구하니 넣는 게 편합니다.' },
          { q: '비밀번호 저장해도 안전한가요?', a: '브라우저 기본 저장보다 전용 관리 앱이 낫습니다. 삼성 패스나 1Password는 마스터 비밀번호 하나로 나머지를 암호화해서 보관해요.' },
          { q: '해킹됐는지 어떻게 확인하나요?', a: '구글에서 "비밀번호 진단" 검색하면 구글 계정에 저장된 비밀번호 중 유출된 것을 알려줍니다. 네이버도 보안 설정에서 2단계 인증을 켜두세요.' },
        ]}
      />
    </PageLayout>
  );
}
