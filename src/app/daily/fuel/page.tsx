import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import FuelCalc from "./FuelCalc";
export const metadata: Metadata = { title: "연비 계산기 - 자동차 연비·주유비", description: "실제 연비와 여행 유류비를 계산하세요.", alternates: { canonical: "https://moduncalc.com/daily/fuel" } };
export default function Page() { return <PageLayout eyebrow="자동차" title="연비 계산기" description="실제 연비와 여행 유류비를 계산해요."><CalculatorJsonLd name="연비 계산기" description="실제 연비와 여행 유류비를 계산하세요." url="https://moduncalc.com/daily/fuel" /><FaqJsonLd items={[{q:"실제 연비가 공인연비보다 낮은 이유는?",a:"공인연비는 표준 시험 조건에서 측정됩니다. 실제 운전은 에어컨, 급가속, 정체 등으로 연비가 낮아집니다."},{q:"연비를 높이는 방법은?",a:"정속 주행, 급가속·급제동 자제, 적정 타이어 공기압 유지, 불필요한 짐 줄이기가 효과적입니다."}]} /><FuelCalc /></PageLayout>; }
