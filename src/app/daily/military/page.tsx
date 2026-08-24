import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import MilitaryCalc from "./MilitaryCalc";
export const metadata: Metadata = { title: "전역일 계산기 - 육군·해군·공군·해병대·사회복무", description: "입대일만 입력하면 전역일과 남은 복무일수를 자동 계산. 육군 18개월, 해군 20개월, 공군 21개월 기준.", alternates: { canonical: "https://moduncalc.com/daily/military" } };
export default function Page() { return <PageLayout eyebrow="병무청 기준" title="전역일 계산기" description="입대일과 군별을 선택하면 전역일을 알려드려요."><CalculatorJsonLd name="전역일 계산기" description="입대일만 입력하면 전역일과 남은 복무일수를 자동 계산. 군별 복무기간 반영." url="https://moduncalc.com/daily/military" /><FaqJsonLd items={[{q:"전역일은 정확한가요?",a:"입대일 기준 군별 복무기간으로 계산합니다. 실제로는 훈련소 입소일 등에 따라 1~2일 차이가 날 수 있습니다."},{q:"복무 단축이 적용되나요?",a:"현재 기준 복무기간으로 계산하며, 추가 단축 제도는 별도 반영하지 않습니다."}]} /><MilitaryCalc /></PageLayout>; }
