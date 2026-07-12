import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import FireCalc from "./FireCalc";
export const metadata: Metadata = { title: "FIRE 계산기 - 조기 은퇴 시뮬레이션", description: "현재 소득·지출·자산으로 몇 살에 경제적 자유(FIRE)를 달성할 수 있는지 계산하세요. 저축률·투자 수익률 반영.", alternates: { canonical: "https://moduncalc.com/daily/fire" } };
export default function Page() { return <PageLayout eyebrow="경제적 자유" title="FIRE 계산기" description="현재 속도라면 몇 살에 조기 은퇴가 가능할까요?"><CalculatorJsonLd name="FIRE 계산기" description="현재 소득·지출·자산으로 몇 살에 경제적 자유를 달성할 수 있는지 계산하세요." url="https://moduncalc.com/daily/fire" /><FaqJsonLd items={[{q:"4% 룰이란?",a:"은퇴 자산의 4%를 매년 인출하면 30년 이상 자산이 유지된다는 연구 결과입니다. 필요 자산 = 연 지출 × 25."},{q:"인플레이션은 반영되나요?",a:"실질 수익률(명목 수익률 - 인플레이션)로 계산하면 자동 반영됩니다."},{q:"국민연금은 포함되나요?",a:"이 계산기에서는 별도로 포함하지 않습니다. 국민연금 수령 시 필요 자산이 줄어드는 효과가 있습니다."}]} /><FireCalc /></PageLayout>; }
