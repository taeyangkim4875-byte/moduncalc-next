import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import LifetimeCalc from "./LifetimeCalc";
export const metadata: Metadata = { title: "평생 근로소득 계산기 - 나는 평생 얼마를 벌까?", description: "현재 월급과 임금 상승률로 은퇴까지 총 얼마를 벌 수 있는지 계산하세요. 세전·세후 평생 근로소득 시뮬레이션.", alternates: { canonical: "https://moduncalc.com/salary/lifetime" } };
export default function Page() { return <PageLayout eyebrow="평생 소득 시뮬레이션" title="평생 근로소득 계산기" description="나는 은퇴까지 총 얼마를 벌 수 있을까요?"><CalculatorJsonLd name="평생 근로소득 계산기" description="현재 월급과 임금 상승률로 은퇴까지 총 얼마를 벌 수 있는지 계산하세요." url="https://moduncalc.com/salary/lifetime" /><FaqJsonLd items={[{q:"임금 상승률은 어느 정도가 현실적인가요?",a:"한국 평균 임금상승률은 연 3~5% 수준입니다. 보수적으로 3%를 추천합니다."},{q:"세후 실수령은 정확한가요?",a:"간이세율 기반 추정치입니다. 정확한 세후 금액은 매년 소득에 따라 달라집니다."},{q:"이직하면 어떻게 되나요?",a:"이직 시 연봉 상승을 반영하려면 현재 연봉을 이직 후 기준으로 입력하세요."}]} /><LifetimeCalc /></PageLayout>; }
