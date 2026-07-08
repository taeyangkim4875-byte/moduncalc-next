import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import FireCalc from "./FireCalc";
export const metadata: Metadata = { title: "FIRE 계산기 - 조기 은퇴 시뮬레이션", description: "현재 소득·지출·자산으로 몇 살에 경제적 자유(FIRE)를 달성할 수 있는지 계산하세요. 저축률·투자 수익률 반영.", alternates: { canonical: "https://moduncalc.com/daily/fire" } };
export default function Page() { return <PageLayout eyebrow="경제적 자유" title="FIRE 계산기" description="현재 속도라면 몇 살에 조기 은퇴가 가능할까요?"><FireCalc /></PageLayout>; }
