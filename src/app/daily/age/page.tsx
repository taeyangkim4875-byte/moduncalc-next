import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import AgeCalc from "./AgeCalc";
export const metadata: Metadata = { title: "나이 계산기 - 만 나이·한국 나이·띠·별자리", description: "생년월일로 만 나이, 한국 나이, 띠, 별자리를 알려드려요.", alternates: { canonical: "https://moduncalc.com/daily/age" } };
export default function Page() { return <PageLayout eyebrow="나이 계산" title="나이 계산기" description="만 나이, 한국 나이, 띠, 별자리를 알려드려요."><CalculatorJsonLd name="나이 계산기" description="생년월일로 만 나이, 한국 나이, 띠, 별자리를 알려드려요." url="https://moduncalc.com/daily/age" /><FaqJsonLd items={[{q:"만 나이가 법적 기준인가요?",a:"2023년 6월부터 한국도 만 나이를 법적 기준으로 통일했습니다."},{q:"띠(십이지)는 어떻게 정해지나요?",a:"태어난 해를 12로 나눈 나머지로 정해집니다. 자(쥐)부터 해(돼지)까지 12년 주기입니다."}]} /><AgeCalc /></PageLayout>; }
