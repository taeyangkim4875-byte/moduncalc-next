import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import PaintCalc from "./PaintCalc";
export const metadata: Metadata = { title: "페인트 벽지 계산기 - 방 면적에 필요한 자재량 계산", description: "방 크기를 입력하면 필요한 페인트량(L)과 벽지 롤 수를 자동 계산. 셀프 인테리어 필수 도구.", alternates: { canonical: "https://moduncalc.com/daily/paint" } };
export default function Page() { return <PageLayout eyebrow="셀프 인테리어 필수 도구" title="페인트 벽지 계산기" description="방 크기를 입력하면 필요한 페인트량과 벽지 롤 수를 자동으로 계산해요."><CalculatorJsonLd name="페인트 벽지 계산기" description="방 크기를 입력하면 필요한 페인트량(L)과 벽지 롤 수를 자동 계산. 셀프 인테리어 필수 도구." url="https://moduncalc.com/daily/paint" /><FaqJsonLd items={[{q:"페인트 1L로 몇 m2를 칠할 수 있나요?",a:"일반적으로 1L당 약 8~12m2를 도포할 수 있으며, 평균 10m2/L 기준으로 계산합니다."},{q:"2회 도포가 필요한 이유는?",a:"1회만 도포하면 기존 색이 비치거나 얼룩이 생길 수 있어 2회 이상 도포를 권장합니다."},{q:"셀프 페인팅 vs 업체 시공 비용 차이는?",a:"셀프는 재료비만 10~30만원, 업체는 인건비 포함 평당 3~5만원 수준입니다."}]} /><PaintCalc /></PageLayout>; }
