import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import BmiCalculator from "./BmiCalculator";
export const metadata: Metadata = { title: "BMI 계산기 - 체질량지수·비만도 판정", description: "키와 체중으로 BMI를 계산하고 비만도를 확인하세요. WHO 아시아태평양 기준.", alternates: { canonical: "https://moduncalc.com/health/bmi" } };
export default function Page() { return <PageLayout eyebrow="WHO 아시아태평양 기준" title="BMI 계산기" description="키와 체중으로 체질량지수(BMI)와 비만도를 확인하세요."><CalculatorJsonLd name="BMI 계산기" description="키와 체중으로 BMI를 계산하고 비만도를 확인하세요. WHO 아시아태평양 기준." url="https://moduncalc.com/health/bmi" /><FaqJsonLd items={[{q:"정상 BMI 범위는?",a:"아시아태평양 기준 18.5~22.9가 정상 범위입니다."},{q:"BMI가 과체중이면 어떻게 해야 하나요?",a:"식이조절과 규칙적인 운동을 병행하되, BMI는 체지방률을 반영하지 않으므로 근육량이 많은 경우 높게 나올 수 있습니다."}]} /><BmiCalculator /></PageLayout>; }
