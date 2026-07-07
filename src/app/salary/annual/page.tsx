import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import AnnualCalc from "./AnnualCalc";
export const metadata: Metadata = { title: "연차 계산기 - 입사일 기준 연차 일수 자동 계산", description: "입사일만 입력하면 현재 발생 연차 일수를 자동 계산. 근로기준법 기준, 1년 미만 월차, 3년 이상 가산 반영.", alternates: { canonical: "https://moduncalc.com/salary/annual" } };
export default function Page() { return <PageLayout eyebrow="근로기준법 기준" title="연차 계산기" description="입사일을 입력하면 발생 연차 일수를 알려드려요."><AnnualCalc /></PageLayout>; }
