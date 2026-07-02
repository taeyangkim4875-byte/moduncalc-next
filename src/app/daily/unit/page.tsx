import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import UnitCalc from "./UnitCalc";
export const metadata: Metadata = { title: "단위 변환기 - 길이·무게·온도·면적", description: "길이, 무게, 온도, 면적을 한 번에 변환하세요.", alternates: { canonical: "https://moduncalc.com/daily/unit" } };
export default function Page() { return <PageLayout eyebrow="단위 변환" title="단위 변환기" description="길이, 무게, 온도, 면적을 한 번에 변환해요."><UnitCalc /></PageLayout>; }
