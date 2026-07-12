import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import LiveCounter from "./LiveCounter";
export const metadata: Metadata = { title: "월급 카운터 - 지금 이 순간 벌고 있는 돈", description: "연봉을 입력하면 초 단위로 돈이 올라갑니다. 지금 이 순간에도 얼마를 벌고 있는지 실시간으로 확인하세요.", alternates: { canonical: "https://moduncalc.com/salary/live" } };
export default function Page() { return <PageLayout eyebrow="연봉" title="월급 카운터" description="지금 이 순간에도 얼마를 벌고 있는지 확인해 보세요."><CalculatorJsonLd name="월급 카운터" description="연봉을 입력하면 초 단위로 돈이 올라갑니다." url="https://moduncalc.com/salary/live" /><FaqJsonLd items={[{q:"세전 기준인가요?",a:"네, 세전 연봉 기준입니다. 실수령 기준으로 보려면 연봉 실수령액 계산기를 먼저 이용하세요."},{q:"근무일수 252일은 어떻게 나온 건가요?",a:"연 365일에서 주말(104일)과 공휴일(약 15일)을 제외한 일반적인 근무일수입니다."}]} /><LiveCounter /></PageLayout>; }
