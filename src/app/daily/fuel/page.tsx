import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import FuelCalc from "./FuelCalc";
export const metadata: Metadata = { title: "연비 계산기 - 자동차 연비·주유비", description: "실제 연비와 여행 유류비를 계산하세요.", alternates: { canonical: "https://moduncalc.com/daily/fuel" } };
export default function Page() { return <PageLayout eyebrow="자동차" title="연비 계산기" description="실제 연비와 여행 유류비를 계산해요."><FuelCalc /></PageLayout>; }
