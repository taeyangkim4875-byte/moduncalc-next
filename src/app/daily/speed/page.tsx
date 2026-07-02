import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import SpeedCalc from "./SpeedCalc";
export const metadata: Metadata = { title: "속도·시간 계산기 - 소요시간·속도변환", description: "거리와 속도로 소요 시간을 계산하세요.", alternates: { canonical: "https://moduncalc.com/daily/speed" } };
export default function Page() { return <PageLayout eyebrow="이동 계산" title="속도·시간 계산기" description="거리와 속도로 소요 시간을 계산해요."><SpeedCalc /></PageLayout>; }
