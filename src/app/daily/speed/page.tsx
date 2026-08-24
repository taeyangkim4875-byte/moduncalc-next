import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SpeedCalc from "./SpeedCalc";
export const metadata: Metadata = { title: "속도·시간 계산기 - 소요시간·속도변환", description: "거리와 속도로 소요 시간을 계산하세요.", alternates: { canonical: "https://moduncalc.com/daily/speed" } };
export default function Page() { return <PageLayout eyebrow="이동 계산" title="속도·시간 계산기" description="거리와 속도로 소요 시간을 계산해요."><CalculatorJsonLd name="속도·시간 계산기" description="거리와 속도로 소요 시간을 계산하세요." url="https://moduncalc.com/daily/speed" /><FaqJsonLd items={[{q:"고속도로에서 평균 속도가 왜 낮게 나오나요?",a:"정체, 휴게소 정차, 톨게이트 대기 시간이 포함되면 평균 속도가 크게 낮아집니다."},{q:"km/h를 m/s로 빠르게 환산하려면?",a:"km/h ÷ 3.6 = m/s입니다. 예: 72km/h = 20m/s."}]} /><SpeedCalc /></PageLayout>; }
