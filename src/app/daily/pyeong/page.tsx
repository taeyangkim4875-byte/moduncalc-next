import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import PyeongCalc from "./PyeongCalc";
export const metadata: Metadata = { title: "평수 계산기 - 평↔㎡(제곱미터) 변환 · 부동산 면적 환산", description: "33평은 몇 제곱미터? 평↔㎡ 바로 변환. 아파트 전용면적·공급면적 차이도 설명.", alternates: { canonical: "https://moduncalc.com/daily/pyeong" } };
export default function Page() { return <PageLayout eyebrow="부동산" title="평수 계산기" description="평수와 제곱미터(㎡)를 실시간으로 상호 변환합니다."><CalculatorJsonLd name="평수 계산기" description="평수와 제곱미터(㎡)를 상호 변환합니다. 1평 = 3.3058㎡. 전용면적, 공급면적, 계약면적 차이도 설명." url="https://moduncalc.com/daily/pyeong" /><FaqJsonLd items={[{q:"전용면적과 공급면적의 차이는?",a:"전용면적은 실제 거주 공간이고, 공급면적은 전용면적에 복도·계단 등 공용면적을 더한 것입니다. 전용면적은 공급면적의 약 70~80%입니다."},{q:"1평은 몇 제곱미터인가요?",a:"1평은 정확히 3.3058㎡입니다. 간편하게 3.3㎡로 계산하기도 합니다."},{q:"24평 아파트의 실제 크기는?",a:"24평형은 공급면적 79㎡, 전용면적 약 59㎡입니다. 방 2~3개, 화장실 1~2개 규모입니다."}]} /><PyeongCalc /></PageLayout>; }
