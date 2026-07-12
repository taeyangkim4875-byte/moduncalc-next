import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import ConvertCalc from "./ConvertCalc";
export const metadata: Metadata = { title: "전월세 전환 계산기 - 전세↔월세 변환", description: "전세와 월세를 법정전환율 기준으로 전환해 드려요.", alternates: { canonical: "https://moduncalc.com/realestate/convert" } };
export default function Page() { return <PageLayout eyebrow="2026 법정전환율 기준" title="전월세 전환 계산기" description="전세와 월세를 법정전환율 기준으로 전환해 드려요."><CalculatorJsonLd name="전월세 전환 계산기" description="전세와 월세를 법정전환율 기준으로 전환해 드려요." url="https://moduncalc.com/realestate/convert" /><FaqJsonLd items={[{q:"법정전환율이란 무엇인가요?",a:"전세를 월세로 전환할 때 적용하는 법정 상한 이율입니다. 기준금리+2%와 연 10% 중 낮은 값."},{q:"임대인이 마음대로 전환율을 올릴 수 있나요?",a:"법정전환율을 초과할 수 없습니다."},{q:"전세와 월세 중 어느 쪽이 유리한가요?",a:"금리가 높을수록 월세가, 낮을수록 전세가 유리합니다. 목돈 운용 능력에 따라 다릅니다."}]} /><ConvertCalc /></PageLayout>; }
