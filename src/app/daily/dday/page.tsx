import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import DdayCalc from "./DdayCalc";
export const metadata: Metadata = { title: "D-day 계산기 - 날짜 차이·날짜 더하기", description: "두 날짜 사이 일수와 날짜 더하기를 계산해요.", alternates: { canonical: "https://moduncalc.com/daily/dday" } };
export default function Page() { return <PageLayout eyebrow="날짜 계산" title="D-day 계산기" description="두 날짜 사이 일수를 계산해요."><DdayCalc /></PageLayout>; }
