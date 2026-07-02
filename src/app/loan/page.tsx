import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import LoanCalculator from "./LoanCalculator";
export const metadata: Metadata = { title: "대출 이자 계산기 - 원리금균등·원금균등 상환", description: "대출 금액, 금리, 기간으로 원리금균등·원금균등 상환 방식별 월 납입액과 총 이자를 비교하세요.", alternates: { canonical: "https://moduncalc.com/loan" } };
export default function Page() { return <PageLayout eyebrow="2026 금리 기준" title="대출 이자 계산기" description="원리금균등·원금균등 상환 방식별 월 납입액과 총 이자를 비교해 드려요."><LoanCalculator /></PageLayout>; }
