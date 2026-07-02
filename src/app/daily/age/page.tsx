import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import AgeCalc from "./AgeCalc";
export const metadata: Metadata = { title: "나이 계산기 - 만 나이·한국 나이·띠·별자리", description: "생년월일로 만 나이, 한국 나이, 띠, 별자리를 알려드려요.", alternates: { canonical: "https://moduncalc.com/daily/age" } };
export default function Page() { return <PageLayout eyebrow="나이 계산" title="나이 계산기" description="만 나이, 한국 나이, 띠, 별자리를 알려드려요."><AgeCalc /></PageLayout>; }
