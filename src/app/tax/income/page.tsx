import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import IncomeTaxCalc from "./IncomeTaxCalc";
export const metadata: Metadata = { title: "종합소득세 계산기 - 2026 누진세율", description: "종합소득세 누진세율을 적용한 예상 세액을 계산하세요.", alternates: { canonical: "https://moduncalc.com/tax/income" } };
export default function Page() { return <PageLayout eyebrow="2026 세율 기준" title="종합소득세 계산기" description="누진세율을 적용한 예상 세액을 계산해요."><IncomeTaxCalc /></PageLayout>; }
