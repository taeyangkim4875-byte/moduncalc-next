import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import BmrCalculator from "./BmrCalculator";
export const metadata: Metadata = { title: "기초대사량 계산기 - 일일 권장 칼로리", description: "성별, 나이, 키, 체중으로 기초대사량(BMR)과 일일 권장 칼로리를 계산하세요.", alternates: { canonical: "https://moduncalc.com/health/bmr" } };
export default function Page() { return <PageLayout eyebrow="Mifflin-St Jeor 공식" title="기초대사량 계산기" description="기초대사량(BMR)과 일일 권장 칼로리(TDEE)를 계산해요."><CalculatorJsonLd name="기초대사량 계산기" description="성별, 나이, 키, 체중으로 기초대사량(BMR)과 일일 권장 칼로리를 계산하세요." url="https://moduncalc.com/health/bmr" /><FaqJsonLd items={[{q:"기초대사량을 높이려면 어떻게 해야 하나요?",a:"근력 운동으로 근육량을 늘리는 것이 가장 효과적입니다."},{q:"TDEE란 무엇인가요?",a:"Total Daily Energy Expenditure의 약자로, 기초대사량에 활동량을 곱한 하루 총 소모 칼로리입니다."},{q:"다이어트 시 얼마나 줄여야 하나요?",a:"TDEE에서 300~500kcal 정도 줄이는 것이 건강한 감량 속도입니다."}]} /><BmrCalculator /></PageLayout>; }
