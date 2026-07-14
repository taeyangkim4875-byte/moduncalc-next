import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import BodyFatCalc from "./BodyFatCalc";
export const metadata: Metadata = { title: "체지방률 계산기 - 미 해군 공식 기반 체지방 측정", description: "키, 허리둘레, 목둘레로 체지방률을 추정합니다. 미 해군(US Navy) 공식 기반. BMI보다 정확한 비만도 판정.", alternates: { canonical: "https://moduncalc.com/health/bodyfat" } };
export default function Page() { return <PageLayout eyebrow="US Navy 공식 기반" title="체지방률 계산기" description="키, 허리둘레, 목둘레로 체지방률을 추정합니다. BMI보다 정확한 비만도 판정."><CalculatorJsonLd name="체지방률 계산기" description="키, 허리둘레, 목둘레로 체지방률을 추정합니다. 미 해군(US Navy) 공식 기반. BMI보다 정확한 비만도 판정." url="https://moduncalc.com/health/bodyfat" /><FaqJsonLd items={[{q:"체지방률과 BMI 중 어떤 것이 더 정확한가요?",a:"체지방률이 실제 비만도를 더 정확하게 반영합니다. BMI는 근육량과 체지방을 구분하지 못합니다."},{q:"허리둘레는 어디서 재야 하나요?",a:"배꼽 높이에서 줄자를 수평으로 돌려, 숨을 편하게 내쉰 상태에서 측정합니다."},{q:"체지방률을 얼마나 빨리 줄일 수 있나요?",a:"건강한 감량 속도는 주당 0.5~1%입니다. 3~6개월에 걸쳐 꾸준히 관리하는 것이 효과적입니다."}]} /><BodyFatCalc /></PageLayout>; }
