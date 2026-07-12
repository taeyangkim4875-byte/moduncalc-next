import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import PercentCalc from "./PercentCalc";
export const metadata: Metadata = { title: "퍼센트 계산기 - 비율·변화율 계산", description: "비율, 변화율, 할인율을 빠르게 계산해요.", alternates: { canonical: "https://moduncalc.com/daily/percent" } };
export default function Page() { return <PageLayout eyebrow="간편 계산" title="퍼센트 계산기" description="비율, 변화율을 빠르게 계산해요."><CalculatorJsonLd name="퍼센트 계산기" description="비율, 변화율, 할인율을 빠르게 계산해요." url="https://moduncalc.com/daily/percent" /><FaqJsonLd items={[{q:"퍼센트포인트(%p)와 퍼센트(%)의 차이는?",a:"퍼센트포인트는 두 비율의 절대적 차이, 퍼센트는 상대적 변화율입니다. 예: 3%→5%는 2%p 증가, 약 66.7% 증가."},{q:"할인된 가격에서 원래 가격을 구하려면?",a:"할인된 가격 ÷ (1 - 할인율)로 역산합니다."}]} /><PercentCalc /></PageLayout>; }
