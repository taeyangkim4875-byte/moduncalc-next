import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import DdayCalc from "./DdayCalc";
export const metadata: Metadata = { title: "D-day 계산기 - 날짜 차이·날짜 더하기", description: "그날까지 며칠 남았을까? 두 날짜 사이 일수 + 날짜 더하기/빼기 바로 계산.", alternates: { canonical: "https://moduncalc.com/daily/dday" } };
export default function Page() { return <PageLayout eyebrow="날짜 계산" title="D-day 계산기" description="두 날짜 사이 일수를 계산해요."><CalculatorJsonLd name="D-day 계산기" description="두 날짜 사이 일수와 날짜 더하기를 계산해요." url="https://moduncalc.com/daily/dday" /><FaqJsonLd items={[{q:"D-day와 D+day의 차이는?",a:"D-day는 목표일까지 남은 날, D+day는 기준일로부터 지난 날을 의미합니다."},{q:"음수 일수를 입력하면?",a:"과거 날짜를 계산할 수 있습니다. 과거 기념일이 며칠 전이었는지 확인할 때 유용합니다."}]} /><DdayCalc /></PageLayout>; }
