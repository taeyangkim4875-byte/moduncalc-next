import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import AnnualCalc from "./AnnualCalc";
export const metadata: Metadata = { title: "연차 계산기 - 입사일 기준 연차 일수 자동 계산", description: "입사일만 입력하면 현재 발생 연차 일수를 자동 계산. 근로기준법 기준, 1년 미만 월차, 3년 이상 가산 반영.", alternates: { canonical: "https://moduncalc.com/salary/annual" } };
export default function Page() { return <PageLayout eyebrow="근로기준법 기준" title="연차 계산기" description="입사일을 입력하면 발생 연차 일수를 알려드려요."><CalculatorJsonLd name="연차 계산기" description="입사일만 입력하면 현재 발생 연차 일수를 자동 계산. 근로기준법 기준." url="https://moduncalc.com/salary/annual" /><FaqJsonLd items={[{q:"1년 미만인데 연차가 있나요?",a:"네, 1개월 개근 시 1일의 유급휴가(월차)가 발생합니다. 최대 11일."},{q:"연차는 언제 소멸하나요?",a:"발생일로부터 1년 이내에 사용하지 않으면 소멸됩니다."},{q:"연차수당은 어떻게 계산하나요?",a:"미사용 연차 × 1일 통상임금으로 계산됩니다."}]} /><AnnualCalc /></PageLayout>; }
