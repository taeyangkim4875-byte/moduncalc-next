import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import BmiCalculator from "./BmiCalculator";
export const metadata: Metadata = { title: "BMI 계산기 - 체질량지수·비만도 판정", description: "키와 체중으로 BMI를 계산하고 비만도를 확인하세요. WHO 아시아태평양 기준.", alternates: { canonical: "https://moduncalc.com/health/bmi" } };
export default function Page() { return <PageLayout eyebrow="WHO 아시아태평양 기준" title="BMI 계산기" description="키와 체중으로 체질량지수(BMI)와 비만도를 확인하세요."><BmiCalculator /></PageLayout>; }
