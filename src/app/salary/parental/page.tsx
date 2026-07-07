import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ParentalCalc from "./ParentalCalc";
export const metadata: Metadata = { title: "육아휴직 급여 계산기 - 6+6 부모육아휴직제 반영", description: "2026년 육아휴직 급여를 계산하세요. 6+6 부모육아휴직제, 통상임금 기준 상한·하한 자동 반영.", alternates: { canonical: "https://moduncalc.com/salary/parental" } };
export default function Page() { return <PageLayout eyebrow="2026 육아휴직 기준" title="육아휴직 급여 계산기" description="월 급여와 휴직 기간으로 예상 급여를 계산해 드려요."><ParentalCalc /></PageLayout>; }
