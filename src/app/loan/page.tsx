import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import LoanCalculator from "./LoanCalculator";
export const metadata: Metadata = { title: "대출 이자 계산기 - 원리금균등·원금균등 상환", description: "대출 월 납입액 얼마? 원리금균등 vs 원금균등 비교, 총 이자 차이까지 한눈에. 거치기간 포함.", alternates: { canonical: "https://moduncalc.com/loan" }, openGraph: { title: "대출 이자 계산기 - 원리금균등 vs 원금균등 비교 (2026)", description: "대출 금액·금리·기간 입력하면 월 납입액과 총 이자를 원리금균등·원금균등으로 비교. 거치기간 포함.", url: "https://moduncalc.com/loan" } };
export default function Page() { return <PageLayout eyebrow="2026 금리 기준" title="대출 이자 계산기" description="원리금균등·원금균등 상환 방식별 월 납입액과 총 이자를 비교해 드려요."><CalculatorJsonLd name="대출 이자 계산기" description="대출 금액, 금리, 기간으로 원리금균등·원금균등 상환 방식별 월 납입액과 총 이자를 비교하세요." url="https://moduncalc.com/loan" /><FaqJsonLd items={[{q:"어떤 상환 방식이 유리한가요?",a:"총 이자를 줄이려면 원금균등, 초기 부담을 낮추려면 원리금균등이 유리합니다."},{q:"거치기간이란 무엇인가요?",a:"원금 상환을 유예하고 이자만 납부하는 기간입니다. 거치기간이 길수록 총 이자가 늘어납니다."}]} /><LoanCalculator /></PageLayout>; }
