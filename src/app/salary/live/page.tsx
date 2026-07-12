import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import LiveCounter from "./LiveCounter";
export const metadata: Metadata = { title: "월급 카운터 - 지금 이 순간 벌고 있는 돈", description: "연봉을 입력하면 초 단위로 돈이 올라갑니다. 지금 이 순간에도 얼마를 벌고 있는지 실시간으로 확인하세요.", alternates: { canonical: "https://moduncalc.com/salary/live" } };
export default function Page() { return <PageLayout eyebrow="연봉" title="월급 카운터" description="지금 이 순간에도 얼마를 벌고 있는지 확인해 보세요."><LiveCounter /></PageLayout>; }
