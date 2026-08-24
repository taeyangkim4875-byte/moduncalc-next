import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import DutchCalc from "./DutchCalc";
export const metadata: Metadata = { title: "더치페이 계산기 - N분의1·팁 계산", description: "N분의1 금액과 팁을 빠르게 계산하세요.", alternates: { canonical: "https://moduncalc.com/daily/dutch" } };
export default function Page() { return <PageLayout eyebrow="모임 계산" title="더치페이 계산기" description="N분의1 금액과 팁을 계산해요."><CalculatorJsonLd name="더치페이 계산기" description="N분의1 금액과 팁을 빠르게 계산하세요." url="https://moduncalc.com/daily/dutch" /><FaqJsonLd items={[{q:"나누어떨어지지 않으면 어떻게 하나요?",a:"보통 첫 번째 사람이 나머지를 부담하거나, 10원 단위로 올림합니다."},{q:"해외에서 팁은 꼭 줘야 하나요?",a:"미국은 15~20% 팁이 관례이고, 유럽은 5~10% 정도가 일반적입니다. 한국·일본은 팁 문화가 없습니다."}]} /><DutchCalc /></PageLayout>; }
