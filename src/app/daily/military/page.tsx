import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import MilitaryCalc from "./MilitaryCalc";
export const metadata: Metadata = { title: "전역일 계산기 - 육군·해군·공군·해병대·사회복무", description: "입대일만 입력하면 전역일과 남은 복무일수를 자동 계산. 육군 18개월, 해군 20개월, 공군 21개월 기준.", alternates: { canonical: "https://moduncalc.com/daily/military" } };
export default function Page() { return <PageLayout eyebrow="병무청 기준" title="전역일 계산기" description="입대일과 군별을 선택하면 전역일을 알려드려요."><MilitaryCalc /></PageLayout>; }
