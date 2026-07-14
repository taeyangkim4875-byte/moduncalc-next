import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CharCountCalc from "./CharCountCalc";
export const metadata: Metadata = { title: "글자수 세기 - 공백 포함·제외 · 바이트 · 단어수 실시간 카운터", description: "텍스트를 붙여넣으면 글자수, 공백 제외 글자수, 바이트, 단어수, 문장수를 실시간으로 세어줍니다.", alternates: { canonical: "https://moduncalc.com/daily/charcount" } };
export default function Page() { return <PageLayout eyebrow="텍스트 도구" title="글자수 세기" description="텍스트를 붙여넣으면 글자수, 바이트, 단어수를 실시간으로 세어줍니다."><CalculatorJsonLd name="글자수 세기" description="텍스트를 붙여넣으면 글자수, 공백 제외 글자수, 바이트, 단어수, 문장수를 실시간으로 세어줍니다." url="https://moduncalc.com/daily/charcount" /><FaqJsonLd items={[{q:"한글은 몇 바이트인가요?",a:"UTF-8 인코딩 기준으로 한글 한 글자는 3바이트입니다. EUC-KR 기준으로는 2바이트입니다."},{q:"공백 포함과 공백 제외의 차이는?",a:"공백 포함은 띄어쓰기, 줄바꿈 등 모든 공백 문자를 글자수에 포함합니다. 공백 제외는 순수 문자만 셉니다."},{q:"자기소개서 글자수 기준은?",a:"기업마다 다르지만 일반적으로 500자~1,000자(공백 포함)가 많습니다. 채용 공고를 반드시 확인하세요."}]} /><CharCountCalc /></PageLayout>; }
