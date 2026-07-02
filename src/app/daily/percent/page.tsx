import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PercentCalc from "./PercentCalc";
export const metadata: Metadata = { title: "퍼센트 계산기 - 비율·변화율 계산", description: "비율, 변화율, 할인율을 빠르게 계산해요.", alternates: { canonical: "https://moduncalc.com/daily/percent" } };
export default function Page() { return <PageLayout eyebrow="간편 계산" title="퍼센트 계산기" description="비율, 변화율을 빠르게 계산해요."><PercentCalc /></PageLayout>; }
