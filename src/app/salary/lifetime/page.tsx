import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import LifetimeCalc from "./LifetimeCalc";
export const metadata: Metadata = { title: "평생 근로소득 계산기 - 나는 평생 얼마를 벌까?", description: "현재 월급과 임금 상승률로 은퇴까지 총 얼마를 벌 수 있는지 계산하세요. 세전·세후 평생 근로소득 시뮬레이션.", alternates: { canonical: "https://moduncalc.com/salary/lifetime" } };
export default function Page() { return <PageLayout eyebrow="평생 소득 시뮬레이션" title="평생 근로소득 계산기" description="나는 은퇴까지 총 얼마를 벌 수 있을까요?"><LifetimeCalc /></PageLayout>; }
