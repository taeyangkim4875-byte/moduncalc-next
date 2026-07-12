import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import ParentalCalc from "./ParentalCalc";
export const metadata: Metadata = { title: "육아휴직 급여 계산기 - 6+6 부모육아휴직제 반영", description: "2026년 육아휴직 급여를 계산하세요. 6+6 부모육아휴직제, 통상임금 기준 상한·하한 자동 반영.", alternates: { canonical: "https://moduncalc.com/salary/parental" } };
export default function Page() { return <PageLayout eyebrow="2026 육아휴직 기준" title="육아휴직 급여 계산기" description="월 급여와 휴직 기간으로 예상 급여를 계산해 드려요."><CalculatorJsonLd name="육아휴직 급여 계산기" description="2026년 육아휴직 급여를 계산. 6+6 부모육아휴직제, 통상임금 기준." url="https://moduncalc.com/salary/parental" /><FaqJsonLd items={[{q:"6+6 부모육아휴직제란?",a:"부모 모두 육아휴직 사용 시 처음 6개월간 통상임금 100%(상한 월 450만원)를 지급하는 제도입니다."},{q:"사후지급금이 없어졌나요?",a:"2025년부터 사후지급금(25%) 제도가 폐지되어 매월 전액 수령합니다."},{q:"최대 몇 개월까지 가능한가요?",a:"자녀 1명당 부모 각각 최대 1년(12개월)까지 가능합니다."}]} /><ParentalCalc /></PageLayout>; }
