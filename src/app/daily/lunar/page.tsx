import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import LunarCalc from "./LunarCalc";
export const metadata: Metadata = { title: "음력 양력 변환기 - 음력 양력 날짜 변환 (2026)", description: "음력 날짜를 양력으로, 양력 날짜를 음력으로 변환하세요. 설날, 추석, 음력 생일 양력 날짜 확인.", alternates: { canonical: "https://moduncalc.com/daily/lunar" } };
export default function Page() { return <PageLayout eyebrow="2026년 음력 양력 대조" title="음력 양력 변환기" description="설날, 추석 등 주요 음력 명절 날짜와 음력 생일의 양력 변환을 확인하세요."><CalculatorJsonLd name="음력 양력 변환기" description="음력 날짜를 양력으로, 양력 날짜를 음력으로 변환하세요. 설날, 추석, 음력 생일 양력 날짜 확인." url="https://moduncalc.com/daily/lunar" /><FaqJsonLd items={[{q:"윤달이 있는 해에 음력 생일은 어떻게 되나요?",a:"원래 달(정달)의 날짜를 생일로 보며, 윤달의 같은 날은 윤달 생일이라고 합니다."},{q:"음력 30일생인데 29일까지만 있는 달이면?",a:"관례적으로 그 달의 마지막 날인 29일을 생일로 봅니다."},{q:"이 변환기는 얼마나 정확한가요?",a:"2026년 음력 데이터를 기반으로 한 조회 서비스로, 2026년 날짜에 대해 정확합니다."}]} /><LunarCalc /></PageLayout>; }
