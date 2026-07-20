import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import IncomeTaxCalc from "./IncomeTaxCalc";
export const metadata: Metadata = { title: "종합소득세 계산기 - 2026 누진세율", description: "종합소득세 얼마 나올까? 소득 입력하면 8구간 누진세율 자동 적용. 실효세율·인적공제까지 바로 확인.", alternates: { canonical: "https://moduncalc.com/tax/income" }, openGraph: { title: "종합소득세 계산기 - 2026 누진세율 8구간 자동 계산", description: "과세표준 입력하면 소득세·지방소득세를 8구간 누진세율로 자동 계산. 인적공제, 실효세율 확인.", url: "https://moduncalc.com/tax/income" } };
export default function Page() { return <PageLayout eyebrow="2026 세율 기준" title="종합소득세 계산기" description="누진세율을 적용한 예상 세액을 계산해요."><CalculatorJsonLd name="종합소득세 계산기" description="종합소득세 누진세율을 적용한 예상 세액을 계산하세요." url="https://moduncalc.com/tax/income" /><FaqJsonLd items={[{q:"종합소득세 세율은 어떻게 되나요?",a:"6%~45%까지 8단계 누진세율이 적용됩니다. 과세표준 1,400만원 이하 6%, 5억 초과 45%."},{q:"인적공제란 무엇인가요?",a:"본인·배우자·부양가족 1인당 150만원씩 소득에서 공제해주는 제도입니다."}]} /><IncomeTaxCalc /></PageLayout>; }
