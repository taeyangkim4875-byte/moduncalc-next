import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import BmrCalculator from "./BmrCalculator";
export const metadata: Metadata = { title: "기초대사량 계산기 - 일일 권장 칼로리", description: "성별, 나이, 키, 체중으로 기초대사량(BMR)과 일일 권장 칼로리를 계산하세요.", alternates: { canonical: "https://moduncalc.com/health/bmr" } };
export default function Page() { return <PageLayout eyebrow="Mifflin-St Jeor 공식" title="기초대사량 계산기" description="기초대사량(BMR)과 일일 권장 칼로리(TDEE)를 계산해요."><BmrCalculator /></PageLayout>; }
