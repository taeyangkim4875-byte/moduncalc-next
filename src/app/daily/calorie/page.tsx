import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CalorieCalc from "./CalorieCalc";
export const metadata: Metadata = { title: "칼로리 계산기 - 일일 권장 칼로리 · 다이어트 목표 (2026)", description: "성별, 나이, 키, 체중, 활동량으로 일일 권장 칼로리(TDEE)를 계산. 감량·유지·증량 목표별 칼로리 안내.", alternates: { canonical: "https://moduncalc.com/daily/calorie" } };
export default function Page() { return <PageLayout eyebrow="건강" title="칼로리 계산기" description="성별, 나이, 키, 체중, 활동량으로 일일 권장 칼로리(TDEE)를 실시간 계산합니다."><CalculatorJsonLd name="칼로리 계산기" description="성별, 나이, 키, 체중, 활동량으로 일일 권장 칼로리(TDEE)를 계산. 감량·유지·증량 목표별 칼로리 안내." url="https://moduncalc.com/daily/calorie" /><FaqJsonLd items={[{q:"하루 1,200kcal만 먹어도 괜찮나요?",a:"성인 여성의 최소 권장 섭취량이 1,200kcal이며, 남성은 1,500kcal입니다. 이보다 적게 먹으면 영양 결핍이 발생할 수 있습니다."},{q:"운동 없이 식단만으로 감량 가능한가요?",a:"가능하지만 근손실이 동반될 수 있습니다. 근력 운동을 병행하면 효과적입니다."},{q:"BMR 계산 공식은 정확한가요?",a:"Mifflin-St Jeor 공식은 가장 널리 인정받는 추정식이지만, 개인 차이로 10~15% 오차가 있을 수 있습니다."},{q:"활동량 선택 기준은?",a:"사무직으로 따로 운동하지 않으면 비활동적, 주 1~3회 가벼운 운동은 가벼운 활동, 주 3~5회 중강도 운동은 보통 활동을 선택하세요."}]} /><CalorieCalc /></PageLayout>; }
