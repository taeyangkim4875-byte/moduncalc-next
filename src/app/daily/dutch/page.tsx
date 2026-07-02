import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import DutchCalc from "./DutchCalc";
export const metadata: Metadata = { title: "더치페이 계산기 - N분의1·팁 계산", description: "N분의1 금액과 팁을 빠르게 계산하세요.", alternates: { canonical: "https://moduncalc.com/daily/dutch" } };
export default function Page() { return <PageLayout eyebrow="모임 계산" title="더치페이 계산기" description="N분의1 금액과 팁을 계산해요."><DutchCalc /></PageLayout>; }
