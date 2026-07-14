import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import PasswordGen from "./PasswordGen";

export const metadata: Metadata = {
  title: "비밀번호 생성기 - 안전한 랜덤 비밀번호 만들기",
  description: "강력한 랜덤 비밀번호를 즉시 생성. 길이, 대소문자, 숫자, 특수문자 옵션 설정 가능. 비밀번호 강도 표시.",
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
      <CalculatorJsonLd name="비밀번호 생성기" description="강력한 랜덤 비밀번호를 즉시 생성. 길이, 대소문자, 숫자, 특수문자 옵션 설정 가능. 비밀번호 강도 표시." url="https://moduncalc.com/daily/password" />
      <FaqJsonLd items={[
        {q:"안전한 비밀번호 길이는 최소 몇 자인가요?",a:"최소 12자 이상이 권장됩니다. 16자 이상이면 브루트포스 공격에 대한 안전성이 크게 높아집니다. 대소문자, 숫자, 특수문자를 모두 포함하는 것이 중요합니다."},
        {q:"비밀번호를 사이트마다 다르게 써야 하나요?",a:"반드시 다르게 사용해야 합니다. 하나의 사이트가 해킹되면 같은 비밀번호를 쓰는 다른 모든 계정이 위험해집니다. 비밀번호 관리자를 사용하면 편리합니다."},
        {q:"생성된 비밀번호는 안전한가요?",a:"이 생성기는 브라우저의 crypto.getRandomValues()를 사용하여 암호학적으로 안전한 난수를 생성합니다. 비밀번호는 서버로 전송되지 않으며 브라우저에서만 처리됩니다."},
      ]} />
      <PasswordGen />
    </PageLayout>
  );
}
