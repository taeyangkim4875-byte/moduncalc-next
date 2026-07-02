import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ConvertCalc from "./ConvertCalc";
export const metadata: Metadata = { title: "전월세 전환 계산기 - 전세↔월세 변환", description: "전세와 월세를 법정전환율 기준으로 전환해 드려요.", alternates: { canonical: "https://moduncalc.com/realestate/convert" } };
export default function Page() { return <PageLayout eyebrow="2026 법정전환율 기준" title="전월세 전환 계산기" description="전세와 월세를 법정전환율 기준으로 전환해 드려요."><ConvertCalc /></PageLayout>; }
