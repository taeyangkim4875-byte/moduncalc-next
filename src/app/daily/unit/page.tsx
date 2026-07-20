import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import UnitCalc from "./UnitCalc";
export const metadata: Metadata = { title: "단위 변환기 - 길이·무게·온도·면적", description: "1인치는 몇 cm? 1파운드는 몇 kg? 길이·무게·온도·면적 단위 변환 한번에.", alternates: { canonical: "https://moduncalc.com/daily/unit" } };
export default function Page() { return <PageLayout eyebrow="단위 변환" title="단위 변환기" description="길이, 무게, 온도, 면적을 한 번에 변환해요."><CalculatorJsonLd name="단위 변환기" description="길이, 무게, 온도, 면적을 한 번에 변환하세요." url="https://moduncalc.com/daily/unit" /><FaqJsonLd items={[{q:"1평은 몇 ㎡인가요?",a:"1평은 약 3.3058㎡입니다."},{q:"화씨를 섭씨로 빠르게 환산하려면?",a:"(화씨 - 32) × 5/9 = 섭씨입니다. 간단히 (화씨-30)÷2로 근사할 수 있습니다."}]} /><UnitCalc /></PageLayout>; }
