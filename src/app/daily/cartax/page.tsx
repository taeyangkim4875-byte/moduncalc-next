import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CarTaxCalc from "./CarTaxCalc";
export const metadata: Metadata = { title: "자동차세 계산기 - 2026 배기량·연식별 자동차세 계산", description: "내 차 자동차세 얼마? 배기량·연식 입력하면 연간 세금 바로 계산. 연납 할인까지.", alternates: { canonical: "https://moduncalc.com/daily/cartax" } };
export default function Page() { return <PageLayout eyebrow="생활" title="자동차세 계산기" description="배기량과 연식을 입력하면 연간 자동차세를 실시간으로 계산합니다."><CalculatorJsonLd name="자동차세 계산기" description="차량 배기량과 연식으로 연간 자동차세를 자동 계산합니다. 비영업용 승용차 기준. 경감률 반영." url="https://moduncalc.com/daily/cartax" /><FaqJsonLd items={[{q:"자동차세 연납 신청은 어떻게 하나요?",a:"위택스(wetax.go.kr) 또는 관할 구청 세무과에서 신청할 수 있습니다. 1월에 신청하면 약 4.58% 할인됩니다."},{q:"차량을 중간에 팔면 자동차세는?",a:"이전등록일 기준으로 소유 기간에 따라 일할 계산됩니다. 연납 시 남은 기간 세액이 환급됩니다."},{q:"전기차 자동차세는 얼마인가요?",a:"비영업용 전기차의 자동차세는 연 10만원(지방교육세 3만원 별도)으로 고정되어 있습니다."}]} /><CarTaxCalc /></PageLayout>; }
